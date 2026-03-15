export const metadata = {
  title: "Политика конфиденциальности — ClawAcademy",
  description: "Политика конфиденциальности и обработки персональных данных ClawAcademy",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#0D0D0D] text-zinc-300">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <a href="/" className="text-zinc-500 hover:text-white text-sm mb-8 inline-block transition-colors">← На главную</a>

        <h1 className="text-3xl font-bold text-white mb-2">Политика конфиденциальности</h1>
        <p className="text-zinc-500 text-sm mb-10">Редакция от 16 марта 2025 г.</p>

        <div className="space-y-8 text-sm leading-relaxed">

          <section>
            <h2 className="text-white font-semibold text-base mb-3">1. Кто мы и что собираем</h2>
            <p className="text-zinc-400 mb-3">
              ClawAcademy (clawacademy.io) — образовательная платформа. При использовании сервиса мы можем обрабатывать следующие данные:
            </p>
            <ul className="text-zinc-400 space-y-2 list-disc list-inside">
              <li><strong className="text-zinc-300">Данные Telegram:</strong> числовой ID, имя, username (при авторизации через Telegram).</li>
              <li><strong className="text-zinc-300">Адрес кошелька:</strong> публичный адрес криптовалютного кошелька (при оплате или подключении кошелька).</li>
              <li><strong className="text-zinc-300">Данные прогресса:</strong> информация о пройденных уроках и выбранном треке (хранится локально в браузере, localStorage).</li>
              <li><strong className="text-zinc-300">Технические данные:</strong> IP-адрес, тип браузера, время запросов (в логах сервера, автоматически).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-white font-semibold text-base mb-3">2. Цели обработки данных</h2>
            <ul className="text-zinc-400 space-y-2 list-disc list-inside">
              <li>Идентификация пользователя и предоставление доступа к оплаченным материалам.</li>
              <li>Обработка платежей и верификация транзакций.</li>
              <li>Обеспечение работы сервиса и защита от мошенничества.</li>
              <li>Улучшение качества образовательных материалов.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-white font-semibold text-base mb-3">3. Хранение и защита данных</h2>
            <ul className="text-zinc-400 space-y-2 list-disc list-inside">
              <li>Данные хранятся на защищённых серверах с ограниченным доступом.</li>
              <li>Данные прогресса обучения хранятся исключительно в localStorage вашего браузера — мы к ним не имеем доступа.</li>
              <li>Сессионные токены шифруются (JWT, алгоритм HS256).</li>
              <li>Мы не продаём и не передаём ваши данные третьим лицам за исключением случаев, предусмотренных законодательством.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-white font-semibold text-base mb-3">4. Cookies и localStorage</h2>
            <ul className="text-zinc-400 space-y-2 list-disc list-inside">
              <li>Мы используем сессионный cookie <code className="bg-zinc-800 px-1 rounded text-zinc-300">ca_session</code> для поддержания вашей авторизации.</li>
              <li>localStorage используется для хранения прогресса обучения (выбранный трек, пройденные уроки). Эти данные не передаются на наши серверы.</li>
              <li>Аналитические или рекламные cookie не используются.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-white font-semibold text-base mb-3">5. Ваши права</h2>
            <ul className="text-zinc-400 space-y-2 list-disc list-inside">
              <li><strong className="text-zinc-300">Доступ:</strong> вы вправе запросить информацию о хранимых данных.</li>
              <li><strong className="text-zinc-300">Удаление:</strong> вы вправе потребовать удаления ваших данных. Запрос направляется в поддержку через Telegram.</li>
              <li><strong className="text-zinc-300">Прогресс:</strong> данные прогресса удаляются очисткой localStorage браузера в любой момент.</li>
              <li><strong className="text-zinc-300">Возражение:</strong> вы вправе возразить против обработки данных, прекратив использование Платформы.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-white font-semibold text-base mb-3">6. Дети</h2>
            <p className="text-zinc-400">
              Платформа предназначена для лиц старше 16 лет. Мы сознательно не собираем данные детей. Если вам стало известно, что ребёнок предоставил нам данные — свяжитесь с поддержкой.
            </p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-base mb-3">7. Изменения политики</h2>
            <p className="text-zinc-400">
              Актуальная версия политики всегда доступна по адресу clawacademy.io/privacy.
              Существенные изменения будут анонсированы в{" "}
              <a href="https://t.me/ClawAcademyChat" target="_blank" rel="noopener noreferrer" className="text-[#FF4422] hover:underline">
                Telegram-сообществе
              </a>.
            </p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-base mb-3">8. Контакты</h2>
            <p className="text-zinc-400">
              По вопросам обработки данных:{" "}
              <a href="https://t.me/ClawAcademyChat" target="_blank" rel="noopener noreferrer" className="text-[#FF4422] hover:underline">
                t.me/ClawAcademyChat
              </a>
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}
