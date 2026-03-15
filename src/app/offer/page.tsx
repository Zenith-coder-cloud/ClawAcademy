export const metadata = {
  title: "Публичная оферта — ClawAcademy",
  description: "Публичная оферта на оказание образовательных услуг ClawAcademy",
};

export default function OfferPage() {
  return (
    <div className="min-h-screen bg-[#0D0D0D] text-zinc-300">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <a href="/" className="text-zinc-500 hover:text-white text-sm mb-8 inline-block transition-colors">← На главную</a>

        <h1 className="text-3xl font-bold text-white mb-2">Публичная оферта</h1>
        <p className="text-zinc-500 text-sm mb-10">Редакция от 16 марта 2026 г.</p>

        <div className="space-y-8 text-sm leading-relaxed">

          <section>
            <h2 className="text-white font-semibold text-base mb-3">1. Общие положения</h2>
            <p className="text-zinc-400 mb-3">
              Настоящий документ является публичной офертой ClawAcademy (clawacademy.io) на оказание
              образовательных услуг в дистанционном формате. Акцептом оферты считается факт оплаты
              выбранного тарифного плана.
            </p>
            <p className="text-zinc-400">
              Акцептируя оферту, пользователь подтверждает, что ознакомился с её условиями, политикой
              конфиденциальности и согласен с ними в полном объёме.
            </p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-base mb-3">2. Предмет договора</h2>
            <p className="text-zinc-400 mb-3">
              Исполнитель обязуется предоставить Пользователю доступ к образовательным материалам
              платформы ClawAcademy в рамках оплаченного тарифного плана:
            </p>
            <ul className="text-zinc-400 space-y-2 list-disc list-inside">
              <li><strong className="text-zinc-300">Genesis</strong> — доступ к Блокам 0–2 бессрочно.</li>
              <li><strong className="text-zinc-300">Pro</strong> — доступ ко всем блокам курса бессрочно.</li>
              <li><strong className="text-zinc-300">Elite</strong> — доступ ко всем блокам, персональное сопровождение, кастомный агент.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-white font-semibold text-base mb-3">3. Стоимость и порядок оплаты</h2>
            <p className="text-zinc-400 mb-3">
              Стоимость тарифных планов указана на сайте clawacademy.io в момент оформления заказа.
              Оплата производится в криптовалюте (USDT, ETH, BNB и другие поддерживаемые токены)
              через встроенный платёжный модуль.
            </p>
            <p className="text-zinc-400">
              Доступ активируется автоматически после подтверждения транзакции в блокчейне.
              Моментом оплаты считается время подтверждения транзакции.
            </p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-base mb-3">4. Права и обязанности сторон</h2>
            <p className="text-zinc-400 mb-2 font-medium text-zinc-300">Исполнитель обязуется:</p>
            <ul className="text-zinc-400 space-y-2 list-disc list-inside mb-4">
              <li>Предоставить доступ к оплаченным материалам в течение 24 часов с момента подтверждения оплаты.</li>
              <li>Обеспечить доступность платформы не менее 95% времени в месяц.</li>
              <li>Своевременно уведомлять о плановых технических работах.</li>
            </ul>
            <p className="text-zinc-400 mb-2 font-medium text-zinc-300">Пользователь обязуется:</p>
            <ul className="text-zinc-400 space-y-2 list-disc list-inside">
              <li>Не передавать доступ к аккаунту третьим лицам.</li>
              <li>Не копировать, не распространять и не публиковать материалы курса без письменного согласия Исполнителя.</li>
              <li>Использовать полученные знания и инструменты в рамках действующего законодательства.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-white font-semibold text-base mb-3">5. Возврат средств</h2>
            <p className="text-zinc-400 mb-3">
              В связи с природой криптовалютных транзакций (необратимость) и мгновенным предоставлением
              цифрового доступа к материалам — возврат средств не предусмотрен после активации доступа.
            </p>
            <p className="text-zinc-400">
              В случае технической ошибки (доступ не предоставлен после подтверждённой оплаты) —
              обратитесь в поддержку в течение 72 часов с доказательствами транзакции.
              Исполнитель обязуется рассмотреть обращение в течение 5 рабочих дней.
            </p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-base mb-3">6. Ограничение ответственности</h2>
            <p className="text-zinc-400 mb-3">
              Образовательные материалы носят информационный характер. Исполнитель не гарантирует
              конкретных финансовых результатов от применения полученных знаний.
            </p>
            <p className="text-zinc-400">
              Исполнитель не несёт ответственности за убытки, возникшие вследствие использования
              или невозможности использования материалов платформы, а также за действия третьих лиц.
            </p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-base mb-3">7. Интеллектуальная собственность</h2>
            <p className="text-zinc-400">
              Все материалы курса (тексты, изображения, видео, код, структура) являются интеллектуальной
              собственностью ClawAcademy. Любое воспроизведение, копирование или распространение
              без письменного разрешения запрещено и влечёт ответственность согласно действующему
              законодательству.
            </p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-base mb-3">8. Изменение условий</h2>
            <p className="text-zinc-400">
              Исполнитель вправе изменять условия настоящей оферты в одностороннем порядке путём
              публикации новой редакции на сайте clawacademy.io. Изменения вступают в силу с момента
              публикации и не распространяются на уже активированные доступы.
            </p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-base mb-3">9. Контакты</h2>
            <p className="text-zinc-400">
              По вопросам, связанным с исполнением настоящей оферты, обращайтесь через Telegram:
              <a href="https://t.me/clawacademybot" className="text-[#FF4422] hover:underline ml-1" target="_blank" rel="noopener noreferrer">@clawacademybot</a>
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}
