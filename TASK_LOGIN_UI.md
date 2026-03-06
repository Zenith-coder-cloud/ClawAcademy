# TASK: ClawAcademy — Login Page UI Unification

## Проект
Репо: https://github.com/Zenith-coder-cloud/ClawAcademy.git
GitHub token: [REDACTED — использовать git credential из системы или env]
Деплой: Vercel (auto-deploy из main)
Файл для правки: `src/app/login/page.tsx` + `src/components/TelegramLoginButton.tsx`

## Проблема
Страница /login выглядит хаотично — три кнопки в разных стилях:
- Telegram Widget — синяя нативная кнопка Telegram (не контролируется)
- WalletConnect — красная обводка #FF4422
- Войти через бота — серая обводка #444

## Задача
Привести все кнопки к единому стилю. Убрать Telegram Widget совсем — заменить на кастомную кнопку.

## Новый дизайн /login

### Все 3 кнопки одинаковые:
```
Высота: py-4 (56px)
Фон: bg-[#1a1a1a]
Обводка: border border-[#333]
Текст: text-white font-semibold text-base
Hover: border-[#FF4422] bg-[#1a1a1a]
Радиус: rounded-xl
Иконка слева + текст по центру
```

### Кнопка 1 — Telegram (кастомная, вместо виджета):
```
Иконка: ✈️ (или SVG Telegram)
Текст: "Войти через Telegram"
onClick: открывает popup/redirect на Telegram OAuth
```
**Важно:** Telegram Login Widget нельзя стилизовать. Вместо него — кастомная кнопка, которая при клике программно вызывает Telegram OAuth через window.open или redirect. Виджет можно спрятать (hidden) и триггерить его click через JS.

### Кнопка 2 — Кошелёк:
```
Иконка: 🦊
Текст: "Подключить кошелёк"
onClick: открывает AppKit modal
```

### Кнопка 3 — Бот (код):
```
Иконка: 🤖
Текст: "Войти через @ClawAcademyBot"
onClick: раскрывает форму с кодом (логика уже есть)
```

### Разделитель между кнопками: нет (просто gap-3)

### Заголовок страницы:
- H1: "Добро пожаловать"
- Subtitle: "Выберите способ входа"
- Небольшой логотип/иконка сверху (🦅 или текст CLAW)

## Форма ввода кода (когда раскрыта):
Стиль карточки:
```
bg-[#1a1a1a] border border-[#FF4422] rounded-xl p-5
```
Поле ввода:
```
text-center text-3xl tracking-[0.5em] font-mono
bg-[#0d0d0d] border border-[#444] focus:border-[#FF4422]
```
Кнопка подтверждения: полная ширина, bg-[#FF4422]

## После правок:
1. `git add -A`
2. `git commit -m "feat: unified login UI — 3 consistent buttons"`
3. `git push origin main`

## Результат сохранить в:
`/Users/zenith/.openclaw/shared/results/dev-clawacademy-loginui-20260307.md`

When completely finished and pushed, run:
`openclaw system event --text "Done: ClawAcademy login UI unified and pushed" --mode now`
