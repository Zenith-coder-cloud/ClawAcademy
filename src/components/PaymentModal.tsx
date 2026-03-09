'use client';

import { useState, useEffect, useCallback } from 'react';
import { QRCodeSVG } from 'qrcode.react';

import { useAccount, useSendTransaction, useWriteContract, useWaitForTransactionReceipt, useChainId, useSwitchChain } from 'wagmi';
import { parseUnits, parseEther } from 'viem';
import { TIERS, SUPPORTED_CHAINS, PAYMENT_ADDRESS, type TierKey } from '@/lib/paymentConfig';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTier?: TierKey;
}

const TIER_FEATURES: Record<TierKey, string[]> = {
  free: ['Блок 0', 'Бесплатно'],
  genesis: ['Блоки 0-2', 'Базовый доступ', 'Навсегда'],
  pro: ['Все 6 блоков', 'Zenith Junior AI', 'Навсегда'],
  elite: ['Все 6 блоков', 'Чат с создателем', 'Кастомный агент', 'Макс 50 мест'],
};

const ERC20_TRANSFER_ABI = [
  {
    name: 'transfer',
    type: 'function' as const,
    inputs: [
      { name: 'to', type: 'address' as const },
      { name: 'amount', type: 'uint256' as const },
    ],
    outputs: [{ name: '', type: 'bool' as const }],
    stateMutability: 'nonpayable' as const,
  },
] as const;

type PayStatus = 'idle' | 'sending' | 'waiting' | 'verifying' | 'success' | 'error';
type PaymentMethod = 'crypto' | 'cryptobot';

export default function PaymentModal({ isOpen, onClose, initialTier }: PaymentModalProps) {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const { switchChain } = useSwitchChain();
  const { sendTransactionAsync } = useSendTransaction();
  const { writeContractAsync } = useWriteContract();

  const [step, setStep] = useState(initialTier ? 2 : 1);
  const [selectedTier, setSelectedTier] = useState<TierKey | null>(initialTier ?? null);
  const [selectedChain, setSelectedChain] = useState<(typeof SUPPORTED_CHAINS)[number]>(SUPPORTED_CHAINS[0]);
  const [selectedToken, setSelectedToken] = useState<'usdt' | 'native'>('usdt');
  const [txHash, setTxHash] = useState<`0x${string}` | undefined>(undefined);
  const [manualTxHash, setManualTxHash] = useState('');
  const [payStatus, setPayStatus] = useState<PayStatus>('idle');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [verified, setVerified] = useState(false);
  const [copied, setCopied] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('crypto');
  const [cryptobotInvoiceUrl, setCryptobotInvoiceUrl] = useState<string | null>(null);
  const [cryptobotInvoiceId, setCryptobotInvoiceId] = useState<number | null>(null);
  const [cryptobotLoading, setCryptobotLoading] = useState(false);
  const [cryptobotPolling, setCryptobotPolling] = useState(false);

  const handleCopyAddress = useCallback(() => {
    navigator.clipboard.writeText(PAYMENT_ADDRESS);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);

  const { isSuccess: isTxConfirmed } = useWaitForTransactionReceipt({ hash: txHash });

  useEffect(() => {
    if (initialTier) {
      setSelectedTier(initialTier);
      setStep(2);
    }
  }, [initialTier]);

  // Auto-verify when on-chain tx is confirmed
  useEffect(() => {
    if (isTxConfirmed && txHash && payStatus === 'waiting') {
      handleAutoVerify(txHash);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTxConfirmed, txHash, payStatus]);

  if (!isOpen) return null;

  const tierPrice = selectedTier ? TIERS[selectedTier].price_usd : 0;

  const nativeAmount = selectedToken === 'native' && tierPrice > 0
    ? (tierPrice / selectedChain.nativeRate).toFixed(6)
    : '';

  const displayAmount = selectedToken === 'usdt'
    ? `${tierPrice} USDT`
    : `${nativeAmount} ${selectedChain.nativeCurrency}`;

  const needsChainSwitch = chainId !== selectedChain.id;

  function shortenAddress(addr: string) {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  }

  async function handleInitiatePayment() {
    if (!selectedTier) return;
    if (!address) {
      setError('Сначала подключи кошелёк — нажми кнопку подключения ниже');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/payment/initiate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tier: selectedTier,
          chain_id: selectedChain.id,
          token: selectedToken === 'usdt' ? 'USDT' : 'native',
          wallet_address: address,
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Ошибка инициализации платежа');
      }
      setStep(3);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Ошибка инициализации платежа');
    } finally {
      setLoading(false);
    }
  }

  async function handleAutoPay() {
    if (!selectedTier || !address) return;
    setPayStatus('sending');
    setError(null);
    try {
      let hash: `0x${string}`;
      if (selectedToken === 'usdt') {
        hash = await writeContractAsync({
          address: selectedChain.usdtAddress as `0x${string}`,
          abi: ERC20_TRANSFER_ABI,
          functionName: 'transfer',
          args: [PAYMENT_ADDRESS as `0x${string}`, parseUnits(tierPrice.toString(), 6)],
        });
      } else {
        hash = await sendTransactionAsync({
          to: PAYMENT_ADDRESS as `0x${string}`,
          value: parseEther(nativeAmount),
        });
      }
      setTxHash(hash);
      setPayStatus('waiting');
    } catch (err: unknown) {
      setPayStatus('error');
      setError(err instanceof Error ? err.message : 'Ошибка отправки транзакции');
    }
  }

  async function handleAutoVerify(hash: string) {
    if (!address) return;
    setPayStatus('verifying');
    setError(null);
    try {
      const res = await fetch('/api/payment/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tx_hash: hash, wallet_address: address }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Ошибка верификации');
      try { await fetch('/api/auth/refresh-session', { method: 'POST' }); } catch {}
      setPayStatus('success');
      setVerified(true);
      setStep(4);
    } catch (err: unknown) {
      setPayStatus('error');
      setError(err instanceof Error ? err.message : 'Ошибка верификации');
    }
  }

  async function handleManualVerify() {
    if (!manualTxHash.trim() || !address) return;
    setPayStatus('verifying');
    setError(null);
    try {
      const res = await fetch('/api/payment/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tx_hash: manualTxHash.trim(), wallet_address: address }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Ошибка верификации');
      try { await fetch('/api/auth/refresh-session', { method: 'POST' }); } catch {}
      setPayStatus('success');
      setVerified(true);
      setStep(4);
    } catch (err: unknown) {
      setPayStatus('error');
      setError(err instanceof Error ? err.message : 'Ошибка верификации');
    }
  }

  function resetPaymentState() {
    setPayStatus('idle');
    setTxHash(undefined);
    setManualTxHash('');
    setError(null);
    setCryptobotInvoiceUrl(null);
    setCryptobotInvoiceId(null);
    setCryptobotLoading(false);
    setCryptobotPolling(false);
  }

  async function handleCryptobotCreate() {
    if (!selectedTier) return;
    setCryptobotLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/payment/cryptobot-create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tier: selectedTier }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Ошибка создания инвойса');
      setCryptobotInvoiceUrl(data.invoice_url);
      setCryptobotInvoiceId(data.invoice_id);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Ошибка создания инвойса');
    } finally {
      setCryptobotLoading(false);
    }
  }

  async function handleCryptobotCheck() {
    if (!cryptobotInvoiceId) return;
    setCryptobotPolling(true);
    setError(null);
    let attempts = 0;
    const maxAttempts = 20; // 20 * 3s = 60s
    const poll = async () => {
      try {
        const res = await fetch(`/api/payment/cryptobot-status?invoice_id=${cryptobotInvoiceId}`);
        const data = await res.json();
        if (data.status === 'paid') {
          setCryptobotPolling(false);
          try { await fetch('/api/auth/refresh-session', { method: 'POST' }); } catch {}
          setVerified(true);
          setStep(4);
          return;
        }
        attempts++;
        if (attempts >= maxAttempts) {
          setCryptobotPolling(false);
          setError('Время ожидания истекло. Попробуйте проверить позже.');
          return;
        }
        setTimeout(poll, 3000);
      } catch {
        setCryptobotPolling(false);
        setError('Ошибка проверки статуса');
      }
    };
    poll();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-[#0d0d0d] border border-zinc-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors text-xl"
        >
          x
        </button>

        {/* STEP 1 — Tier selection */}
        {step === 1 && (
          <div>
            <h2 className="text-white text-xl font-bold mb-6">Выбор тарифа</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {(Object.keys(TIERS) as TierKey[]).filter((key) => key !== 'free').map((key) => {
                const tier = TIERS[key];
                const isSelected = selectedTier === key;
                return (
                  <div
                    key={key}
                    className={`border rounded-xl p-4 flex flex-col transition-colors ${
                      isSelected ? 'border-[#e63329]' : 'border-zinc-700 hover:border-zinc-500'
                    }`}
                  >
                    <h3 className="text-white font-bold text-lg">{tier.name}</h3>
                    <p className="text-[#e63329] font-bold text-2xl mt-2">${tier.price_usd}</p>
                    <ul className="mt-3 space-y-1 flex-1">
                      {TIER_FEATURES[key].map((f) => (
                        <li key={f} className="text-zinc-400 text-sm">
                          -- {f}
                        </li>
                      ))}
                    </ul>
                    {key === 'elite' && (
                      <p className="text-zinc-500 text-xs mt-2">50 мест</p>
                    )}
                    <button
                      onClick={() => {
                        setSelectedTier(key);
                        setStep(2);
                      }}
                      className="mt-4 w-full py-2 rounded-lg text-sm font-semibold transition-colors bg-[#e63329] text-white hover:bg-[#c92a22]"
                    >
                      Выбрать
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 2 — Payment method & details */}
        {step === 2 && (
          <div>
            <h2 className="text-white text-xl font-bold mb-6">Способ оплаты</h2>

            {/* Payment method selector */}
            <div className="flex gap-2 mb-6">
              <button
                onClick={() => { setPaymentMethod('crypto'); setError(null); resetPaymentState(); }}
                className={`flex-1 py-3 rounded-xl text-sm font-semibold transition-colors ${
                  paymentMethod === 'crypto'
                    ? 'bg-[#e63329] text-white'
                    : 'bg-zinc-800 text-zinc-400 hover:text-white'
                }`}
              >
                💎 Крипто-кошелёк
              </button>
              <button
                onClick={() => { setPaymentMethod('cryptobot'); setError(null); resetPaymentState(); }}
                className={`flex-1 py-3 rounded-xl text-sm font-semibold transition-colors ${
                  paymentMethod === 'cryptobot'
                    ? 'bg-[#e63329] text-white'
                    : 'bg-zinc-800 text-zinc-400 hover:text-white'
                }`}
              >
                ✈️ CryptoBot (USDT)
              </button>
            </div>

            {/* Crypto wallet flow */}
            {paymentMethod === 'crypto' && (
              <>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 mb-6">
                  {SUPPORTED_CHAINS.map((chain) => (
                    <button
                      key={chain.id}
                      onClick={() => setSelectedChain(chain)}
                      className={`py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                        selectedChain.id === chain.id
                          ? 'bg-[#e63329] text-white'
                          : 'bg-zinc-800 text-zinc-400 hover:text-white'
                      }`}
                    >
                      {chain.name}
                    </button>
                  ))}
                </div>

                <div className="flex gap-2 mb-6">
                  <button
                    onClick={() => setSelectedToken('usdt')}
                    className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedToken === 'usdt'
                        ? 'bg-[#e63329] text-white'
                        : 'bg-zinc-800 text-zinc-400 hover:text-white'
                    }`}
                  >
                    USDT
                  </button>
                  <button
                    onClick={() => setSelectedToken('native')}
                    className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedToken === 'native'
                        ? 'bg-[#e63329] text-white'
                        : 'bg-zinc-800 text-zinc-400 hover:text-white'
                    }`}
                  >
                    {selectedChain.nativeCurrency}
                  </button>
                </div>

                <div className="bg-zinc-900 rounded-xl p-4 mb-6">
                  <p className="text-zinc-400 text-sm">К оплате:</p>
                  <p className="text-white text-2xl font-bold">{displayAmount}</p>
                </div>

                {!isConnected ? (
                  <button
                    onClick={() => open()}
                    className="w-full py-3 rounded-xl text-sm font-semibold bg-zinc-700 text-white hover:bg-zinc-600 transition-colors"
                  >
                    🔗 Подключить кошелёк
                  </button>
                ) : (
                  <button
                    onClick={handleInitiatePayment}
                    disabled={loading}
                    className="w-full py-3 rounded-xl text-sm font-semibold bg-[#e63329] text-white hover:bg-[#c92a22] transition-colors disabled:opacity-50"
                  >
                    {loading ? 'Загрузка...' : 'Далее'}
                  </button>
                )}
              </>
            )}

            {/* CryptoBot flow */}
            {paymentMethod === 'cryptobot' && (
              <>
                <div className="bg-zinc-900 rounded-xl p-4 mb-6">
                  <p className="text-zinc-400 text-sm">К оплате через CryptoBot:</p>
                  <p className="text-white text-2xl font-bold">{tierPrice} USDT</p>
                </div>

                {!cryptobotInvoiceUrl ? (
                  <button
                    onClick={handleCryptobotCreate}
                    disabled={cryptobotLoading}
                    className="w-full py-3 rounded-xl text-sm font-semibold bg-[#e63329] text-white hover:bg-[#c92a22] transition-colors disabled:opacity-50"
                  >
                    {cryptobotLoading ? 'Создаём инвойс...' : 'Создать инвойс'}
                  </button>
                ) : (
                  <div className="space-y-3">
                    <button
                      onClick={() => window.open(cryptobotInvoiceUrl, '_blank')}
                      className="w-full py-4 rounded-xl text-base font-bold bg-[#0088cc] text-white hover:bg-[#006da8] transition-colors"
                    >
                      ✈️ Оплатить в @CryptoBot
                    </button>
                    <button
                      onClick={handleCryptobotCheck}
                      disabled={cryptobotPolling}
                      className="w-full py-3 rounded-xl text-sm font-semibold bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-white transition-colors disabled:opacity-50"
                    >
                      {cryptobotPolling ? (
                        <span className="flex items-center justify-center gap-2">
                          <span className="w-4 h-4 border-2 border-zinc-400 border-t-transparent rounded-full animate-spin" />
                          Проверяем оплату...
                        </span>
                      ) : 'Проверить оплату'}
                    </button>
                  </div>
                )}
              </>
            )}

            {error && <p className="text-red-500 text-sm mt-3">{error}</p>}

            <button
              onClick={() => { setStep(1); setError(null); resetPaymentState(); }}
              className="w-full mt-3 py-2 text-zinc-500 hover:text-white text-sm transition-colors"
            >
              Назад
            </button>
          </div>
        )}

        {/* STEP 3 — Payment: auto-pay + manual fallback */}
        {step === 3 && (
          <div>
            <h2 className="text-white text-xl font-bold mb-6">Отправка платежа</h2>

            {/* Payment summary */}
            <div className="bg-zinc-900 rounded-xl p-4 space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-zinc-400 text-sm">Адрес</span>
                <span className="text-white text-sm font-mono">{shortenAddress(PAYMENT_ADDRESS)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400 text-sm">Сумма</span>
                <span className="text-white text-sm">{displayAmount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400 text-sm">Сеть</span>
                <span className="text-white text-sm">{selectedChain.name}</span>
              </div>
            </div>

            {/* QR code + address */}
            <div className="flex flex-col items-center mb-6">
              <QRCodeSVG value={PAYMENT_ADDRESS} size={180} bgColor="#111" fgColor="#ffffff" />
              <div className="flex items-center gap-2 mt-3">
                <span className="text-zinc-400 text-xs font-mono break-all text-center">{PAYMENT_ADDRESS}</span>
                <button
                  onClick={handleCopyAddress}
                  className="shrink-0 px-2 py-1 rounded bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-white text-xs transition-colors"
                >
                  {copied ? 'Скопировано!' : 'Копировать'}
                </button>
              </div>
            </div>

            {/* Test mode button */}
            {process.env.NEXT_PUBLIC_PAYMENT_TEST_MODE === 'true' && payStatus === 'idle' && (
              <button
                onClick={() => {
                  setManualTxHash('test');
                  setPayStatus('verifying');
                  (async () => {
                    if (!address) return;
                    try {
                      const res = await fetch('/api/payment/verify', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ tx_hash: 'test', wallet_address: address, tier: selectedTier }),
                      });
                      const data = await res.json();
                      if (!res.ok) throw new Error(data.error || 'Ошибка верификации');
                      try { await fetch('/api/auth/refresh-session', { method: 'POST' }); } catch {}
                      setPayStatus('success');
                      setVerified(true);
                      setStep(4);
                    } catch (err: unknown) {
                      setPayStatus('error');
                      setError(err instanceof Error ? err.message : 'Ошибка верификации');
                    }
                  })();
                }}
                className="w-full py-3 rounded-xl text-sm font-semibold bg-yellow-600 text-white hover:bg-yellow-700 transition-colors mb-3"
              >
                Тест: пропустить оплату
              </button>
            )}

            {/* Status displays for in-progress states */}
            {payStatus === 'sending' && (
              <div className="text-center py-6">
                <div className="w-10 h-10 border-2 border-[#e63329] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-zinc-400">Подтверждайте в кошельке...</p>
              </div>
            )}

            {payStatus === 'waiting' && txHash && (
              <div className="text-center py-6">
                <div className="w-10 h-10 border-2 border-[#e63329] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-zinc-400 mb-2">Ожидаем подтверждения...</p>
                <p className="text-zinc-500 text-sm font-mono">{shortenAddress(txHash)}</p>
              </div>
            )}

            {payStatus === 'verifying' && (
              <div className="text-center py-6">
                <div className="w-10 h-10 border-2 border-[#e63329] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-zinc-400">Проверяем платёж...</p>
              </div>
            )}

            {/* Error state with retry */}
            {payStatus === 'error' && (
              <div className="text-center py-4">
                <p className="text-red-500 text-sm mb-4">{error}</p>
                <button
                  onClick={resetPaymentState}
                  className="py-2 px-6 rounded-xl text-sm font-semibold bg-[#e63329] text-white hover:bg-[#c92a22] transition-colors"
                >
                  Попробовать снова
                </button>
              </div>
            )}

            {/* Idle state: show both payment options */}
            {payStatus === 'idle' && (
              <>
                {/* Option 1 — Auto-pay via wallet */}
                {isConnected ? (
                  needsChainSwitch ? (
                    <button
                      onClick={() => switchChain({ chainId: selectedChain.id })}
                      className="w-full py-3 rounded-xl text-sm font-semibold bg-yellow-600 text-white hover:bg-yellow-700 transition-colors"
                    >
                      Переключить сеть на {selectedChain.name}
                    </button>
                  ) : (
                    <button
                      onClick={handleAutoPay}
                      className="w-full py-3 rounded-xl text-sm font-semibold bg-[#e63329] text-white hover:bg-[#c92a22] transition-colors"
                    >
                      Оплатить через кошелёк
                    </button>
                  )
                ) : (
                  <p className="text-zinc-500 text-sm text-center py-2">
                    Подключите кошелёк для авто-оплаты
                  </p>
                )}

                {/* Separator */}
                <div className="flex items-center gap-3 my-5">
                  <div className="flex-1 h-px bg-zinc-800" />
                  <span className="text-zinc-600 text-xs">или введите TX hash вручную</span>
                  <div className="flex-1 h-px bg-zinc-800" />
                </div>

                {/* Option 2 — Manual TX hash */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={manualTxHash}
                    onChange={(e) => setManualTxHash(e.target.value)}
                    placeholder="0x..."
                    className="flex-1 bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-white text-sm font-mono placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500"
                  />
                  <button
                    onClick={handleManualVerify}
                    disabled={!manualTxHash.trim()}
                    className="px-5 py-2 rounded-lg text-sm font-semibold bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Проверить
                  </button>
                </div>
              </>
            )}

            {/* Back button (hide during in-progress states) */}
            {(payStatus === 'idle' || payStatus === 'error') && (
              <button
                onClick={() => { setStep(2); resetPaymentState(); }}
                className="w-full mt-4 py-2 text-zinc-500 hover:text-white text-sm transition-colors"
              >
                Назад
              </button>
            )}
          </div>
        )}

        {/* STEP 4 — Verification result */}
        {step === 4 && (
          <div className="text-center">
            {loading && (
              <div>
                <div className="w-10 h-10 border-2 border-[#e63329] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-zinc-400">Проверка транзакции...</p>
              </div>
            )}
            {verified && !loading && (
              <div>
                <h2 className="text-white text-xl font-bold mb-4">Доступ активирован!</h2>
                <button
                  onClick={async () => {
                    try {
                      await fetch('/api/auth/refresh-session', { method: 'POST' });
                    } catch {}
                    onClose();
                    window.location.href = '/dashboard?tier_updated=' + Date.now();
                  }}
                  className="py-3 px-8 rounded-xl text-sm font-semibold bg-[#e63329] text-white hover:bg-[#c92a22] transition-colors"
                >
                  Перейти в кабинет
                </button>
              </div>
            )}
            {error && !loading && (
              <div>
                <p className="text-red-500 mb-4">{error}</p>
                <button
                  onClick={() => { setStep(3); resetPaymentState(); }}
                  className="py-3 px-8 rounded-xl text-sm font-semibold bg-[#e63329] text-white hover:bg-[#c92a22] transition-colors"
                >
                  Повторить
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
