'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAccount, useSendTransaction, useWriteContract, useChainId, useSwitchChain } from 'wagmi';
import { parseUnits, encodeFunctionData } from 'viem';
import { TIERS, SUPPORTED_CHAINS, PAYMENT_ADDRESS, type TierKey } from '@/lib/paymentConfig';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTier?: TierKey;
}

const TIER_FEATURES: Record<TierKey, string[]> = {
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

export default function PaymentModal({ isOpen, onClose, initialTier }: PaymentModalProps) {
  const router = useRouter();
  const { address } = useAccount();
  const chainId = useChainId();
  const { switchChain } = useSwitchChain();
  const { sendTransactionAsync } = useSendTransaction();
  const { writeContractAsync } = useWriteContract();

  const [step, setStep] = useState(initialTier ? 2 : 1);
  const [selectedTier, setSelectedTier] = useState<TierKey | null>(initialTier ?? null);
  const [selectedChain, setSelectedChain] = useState(SUPPORTED_CHAINS[0]);
  const [selectedToken, setSelectedToken] = useState<'usdt' | 'native'>('usdt');
  const [txHash, setTxHash] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    if (initialTier) {
      setSelectedTier(initialTier);
      setStep(2);
    }
  }, [initialTier]);

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
    if (!selectedTier || !address) return;
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

  async function handleSendPayment() {
    if (!selectedTier || !address) return;
    setLoading(true);
    setError(null);
    try {
      let hash: string;
      if (selectedToken === 'usdt') {
        const result = await writeContractAsync({
          address: selectedChain.usdtAddress as `0x${string}`,
          abi: ERC20_TRANSFER_ABI,
          functionName: 'transfer',
          args: [PAYMENT_ADDRESS as `0x${string}`, parseUnits(tierPrice.toString(), 6)],
        });
        hash = result;
      } else {
        const result = await sendTransactionAsync({
          to: PAYMENT_ADDRESS as `0x${string}`,
          value: parseUnits(nativeAmount, 18),
        });
        hash = result;
      }
      setTxHash(hash);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Ошибка отправки транзакции');
    } finally {
      setLoading(false);
    }
  }

  async function handleVerify() {
    if (!txHash || !address) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/payment/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tx_hash: txHash, wallet_address: address }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Ошибка верификации');
      setVerified(true);
      setStep(4);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Ошибка верификации');
    } finally {
      setLoading(false);
    }
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
              {(Object.keys(TIERS) as TierKey[]).map((key) => {
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

        {/* STEP 2 — Chain & token */}
        {step === 2 && (
          <div>
            <h2 className="text-white text-xl font-bold mb-6">Выбор сети и токена</h2>

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

            <button
              onClick={handleInitiatePayment}
              disabled={loading}
              className="w-full py-3 rounded-xl text-sm font-semibold bg-[#e63329] text-white hover:bg-[#c92a22] transition-colors disabled:opacity-50"
            >
              {loading ? 'Загрузка...' : 'Далее'}
            </button>

            {error && <p className="text-red-500 text-sm mt-3">{error}</p>}

            <button
              onClick={() => { setStep(1); setError(null); }}
              className="w-full mt-3 py-2 text-zinc-500 hover:text-white text-sm transition-colors"
            >
              Назад
            </button>
          </div>
        )}

        {/* STEP 3 — Send payment */}
        {step === 3 && (
          <div>
            <h2 className="text-white text-xl font-bold mb-6">Отправка платежа</h2>

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

            {process.env.NEXT_PUBLIC_PAYMENT_TEST_MODE === 'true' && !txHash && (
              <button
                onClick={() => {
                  setTxHash('test');
                  setStep(4);
                  // Auto-verify after moving to step 4
                  setTimeout(async () => {
                    if (!address) return;
                    setLoading(true);
                    try {
                      const res = await fetch('/api/payment/verify', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ tx_hash: 'test', wallet_address: address }),
                      });
                      const data = await res.json();
                      if (!res.ok) throw new Error(data.error || 'Ошибка верификации');
                      setVerified(true);
                    } catch (err: unknown) {
                      setError(err instanceof Error ? err.message : 'Ошибка верификации');
                    } finally {
                      setLoading(false);
                    }
                  }, 500);
                }}
                className="w-full py-3 rounded-xl text-sm font-semibold bg-yellow-600 text-white hover:bg-yellow-700 transition-colors mb-3"
              >
                Тест: пропустить оплату
              </button>
            )}

            {needsChainSwitch ? (
              <button
                onClick={() => switchChain({ chainId: selectedChain.id })}
                className="w-full py-3 rounded-xl text-sm font-semibold bg-yellow-600 text-white hover:bg-yellow-700 transition-colors"
              >
                Переключить сеть
              </button>
            ) : !txHash ? (
              <button
                onClick={handleSendPayment}
                disabled={loading}
                className="w-full py-3 rounded-xl text-sm font-semibold bg-[#e63329] text-white hover:bg-[#c92a22] transition-colors disabled:opacity-50"
              >
                {loading ? 'Отправка...' : 'Отправить платеж'}
              </button>
            ) : (
              <div>
                <div className="bg-zinc-900 rounded-xl p-4 mb-4">
                  <p className="text-zinc-400 text-sm">Хеш транзакции:</p>
                  <p className="text-white text-sm font-mono">{shortenAddress(txHash)}</p>
                </div>
                <button
                  onClick={handleVerify}
                  disabled={loading}
                  className="w-full py-3 rounded-xl text-sm font-semibold bg-[#e63329] text-white hover:bg-[#c92a22] transition-colors disabled:opacity-50"
                >
                  {loading ? 'Проверка...' : 'Подтвердить оплату'}
                </button>
              </div>
            )}

            {error && <p className="text-red-500 text-sm mt-3">{error}</p>}

            <button
              onClick={() => { setStep(2); setTxHash(null); setError(null); }}
              className="w-full mt-3 py-2 text-zinc-500 hover:text-white text-sm transition-colors"
            >
              Назад
            </button>
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
                  onClick={() => {
                    onClose();
                    router.push('/dashboard');
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
                  onClick={handleVerify}
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
