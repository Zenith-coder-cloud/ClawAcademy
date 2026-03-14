# ClawAcademy Frontend — Claude Code Context

## Project Overview
ClawAcademy — онлайн курс по ИИ-агентам на OpenClaw. Next.js 14 App Router, TypeScript, Tailwind CSS.
**Production:** https://www.clawacademy.io
**Repo:** https://github.com/Zenith-coder-cloud/ClawAcademy
**Deploy:** Vercel автодеплой из ветки `main`

---

## ⛔ АБСОЛЮТНЫЕ ПРАВИЛА (нарушение = критический инцидент)

### Git Policy
- **НИКОГДА** не пушить в `main` напрямую — только в `dev`
- **НИКОГДА** не мержить dev→main без явного "мержи/деплой" от Master
- Всегда работать в ветке `dev`: `git checkout dev`
- Stukach pre-push hook блокирует push в main — обходить только с явного разрешения Master (`--no-verify`)

### Scope Lock
- Делай ТОЛЬКО то что явно написано в задаче
- Трогаешь файл X — не трогай файл Y, Z (даже если "связанные")
- Заметил баг вне задачи → репортни, не фикси
- NO bonus fixes, no refactoring, no cleanup unless asked

### Content Lock
- Тексты уроков — копировать ДОСЛОВНО из spec файлов
- НИКОГДА не сокращать, перефразировать контент уроков

---

## Tech Stack

| Технология | Версия | Назначение |
|-----------|--------|-----------|
| Next.js | 15.x | App Router, SSR |
| TypeScript | 5.x | Типизация |
| Tailwind CSS | 3.x | Стили |
| Supabase | latest | Auth + DB |
| Wagmi + Viem | latest | Web3 / wallet connect |
| Reown AppKit | latest | WalletConnect UI |
| React Query | latest | Client state |

---

## Project Structure

```
src/
├── app/
│   ├── (wallet)/login/         ← Auth page
│   ├── dashboard/
│   │   ├── page.tsx            ← Dashboard (список блоков)
│   │   ├── chat/               ← AI чат
│   │   └── course/block/
│   │       ├── 0/              ← Block 0: Что такое ИИ-агент (4 уроков)
│   │       ├── 1/              ← Block 1: Установка (4 урока)
│   │       ├── 2/              ← Block 2: Агент на работе (26 уроков)
│   │       ├── 3/              ← Block 3: Мультиагент (20 уроков)
│   │       └── 4/              ← Block 4: Продай агента (12 уроков)
├── components/
│   ├── CourseProgram.tsx       ← Лендинг: программа курса с блоками
│   └── ...
public/
├── covers/                     ← block1.png, block2.png... (обложки блоков)
└── course/
    ├── block1/lesson{N}/       ← hero images: b1-l{N}-hero.png
    ├── block2/lesson{N}/       ← hero images: b2-l{N}-hero.png (26 уроков)
    ├── block3/lesson{N}/       ← hero images: b3-l{N}-hero.png (20 уроков)
    └── block4/lesson{N}/       ← hero images: b4-l{N}-hero.png (12 уроков)
docs/                           ← Reference docs (Supabase, Telegram, Next.js, etc.)
```

---

## Routing Map

| Route | Файл | Описание |
|-------|------|----------|
| `/` | `app/page.tsx` | Лендинг (CourseProgram) |
| `/(wallet)/login` | `login/page.tsx` | Авторизация |
| `/dashboard` | `dashboard/page.tsx` | Список блоков курса |
| `/dashboard/course/block/0` | `block/0/page.tsx` | Block 0 overview |
| `/dashboard/course/block/0/lesson/1-4` | `lesson/*/page.tsx` | Уроки Block 0 (manual) |
| `/dashboard/course/block/1` | `block/1/page.tsx` | Block 1 overview |
| `/dashboard/course/block/1/lesson/1-4` | `lesson/*/page.tsx` | Уроки Block 1 (manual) |
| `/dashboard/course/block/2` | `block/2/page.tsx` | Block 2 overview |
| `/dashboard/course/block/2/lesson/1-26` | via `LessonTemplate.tsx` | Уроки Block 2 |
| `/dashboard/course/block/3` | `block/3/page.tsx` | Block 3 overview |
| `/dashboard/course/block/3/lesson/1-20` | via `LessonTemplate.tsx` | Уроки Block 3 |
| `/dashboard/course/block/4` | `block/4/page.tsx` | Block 4 overview |
| `/dashboard/course/block/4/lesson/1-12` | via `LessonTemplate.tsx` | Уроки Block 4 |

⚠️ `/dashboard/course` — НЕ СУЩЕСТВУЕТ. Back links должны вести на `/dashboard`.
⚠️ `/dashboard/course/block/5` — НЕ СУЩЕСТВУЕТ (Block 5 в CourseProgram locked, страниц нет).

---

## Architecture: Как устроены уроки

### Block 2, 3, 4 — Data-driven через LessonTemplate
```
block/N/
├── LessonTemplate.tsx    ← Общий шаблон для всех уроков блока
├── components.tsx        ← UI компоненты (Checklist, PromptCopyBlock, etc.)
├── data/
│   └── lessons.ts        ← Данные всех уроков (title, content, sections)
└── lesson/
    └── {N}/page.tsx      ← Просто: <LessonTemplate lessonId={N} />
```

### Block 0, 1 — Manual pages
```
block/0-1/
└── lesson/
    └── {N}/page.tsx      ← Полный код урока в каждом файле (нет LessonTemplate)
```

---

## UI Components (общие для всех блоков)

| Компонент | Файл | Назначение |
|-----------|------|-----------|
| `Checklist` | components.tsx | Чеклист с localStorage |
| `PromptCopyBlock` | components.tsx | Блок с копированием промпта |
| `LessonSteps` | components.tsx | Пронумерованные шаги |
| `TrackBadge` | components.tsx | Бейдж трека (Фрилансер, Бизнес...) |
| `TimerBadge` | components.tsx | Бейдж времени урока |
| `BlockCompleteCard` | components.tsx | Карточка завершения блока |
| `SectionProgressBar` | block/4/components.tsx | Прогресс по секциям |
| `PathSelector` | block/4/components.tsx | Выбор пути монетизации |
| `RevenueCalculator` | block/4/components.tsx | Калькулятор дохода |
| `ClawHubCardPreview` | block/4/components.tsx | Превью карточки агента |

---

## Block Switcher — Стандарт

Все lesson pages и overview pages должны иметь блок-switcher вверху:
```tsx
<Link href="/dashboard" className="...">← Дашборд</Link>
{[1,2,3,4].map(n => (
  <Link href={`/dashboard/course/block/${n}/lesson/1`}
    className={n === CURRENT ? "border-[#FF4422] text-[#FF4422]" : "border-zinc-700 text-zinc-400..."}>
    Блок {n}
  </Link>
))}
```
- **Block 0**: требует добавления switcher (известный баг)
- **Block 1 overview + lessons**: уже добавлен (manual в каждом page.tsx)
- **Block 2, 3, 4 LessonTemplate**: уже добавлен
- **Block 2, 3, 4 overview pages**: уже добавлен

---

## Color Palette

| Переменная | Hex | Использование |
|-----------|-----|--------------|
| Accent | `#FF4422` | CTA buttons, active states, Block label |
| Background | `#0D0D0D` | Страница |
| Surface | `#18181B` (`zinc-900`) | Карточки |
| Surface Deep | `#09090B` (`zinc-950`) | Вложенные блоки |
| Border | `#27272A` (`zinc-800`) | Границы |
| Text Primary | `#F4F4F5` (`zinc-100`) | Заголовки |
| Text Secondary | `#A1A1AA` (`zinc-400`) | Подзаголовки |
| Text Muted | `#71717A` (`zinc-500`) | Метки |

---

## Hero Images Convention

```
public/course/block{N}/lesson{M}/b{N}-l{M}-hero.png
```
- Block 1: b1-l1-hero.png, b1-l2-wizard.png, b1-l3-skills.png, b1-l4-automation.png (нестандартно)
- Block 2: b2-l1-hero.png ... b2-l26-hero.png
- Block 3: b3-l1-hero.png ... b3-l20-hero.png
- Block 4: b4-l1-hero.png ... b4-l12-hero.png

Размер: 1280×720px PNG. Генерируются через Gemini CDP (скрипт: workspace/scripts/gemini_one_image.py)

---

## CourseProgram.tsx — Лендинг

Компонент отображает программу курса. Каждый блок содержит:
- `num`: номер блока
- `locked`: bool (блокирован ли)
- `title`: заголовок (должен совпадать с block/N/page.tsx!)
- `subtitle`: подзаголовок
- `desc`: описание
- `sections[]`: секции с топиками (должны совпадать с реальным контентом!)

⚠️ ВАЖНО: При изменении заголовка/описания блока — ОБЯЗАТЕЛЬНО обновить CourseProgram.tsx тоже.

---

## Known Issues (audit 2026-03-15)

| # | Severity | Проблема | Файл |
|---|---------|----------|------|
| 1 | 🔴 | Битая ссылка Block 5 (404) | block/4/components.tsx ~L198 |
| 2 | 🔴 | Block 0 называет себя "Блок 1" | block/0/page.tsx L105 |
| 3 | 🟠 | Block 0 без block switcher | block/0/page.tsx |
| 4 | 🟠 | Заголовок Block 4 расходится в CourseProgram vs page.tsx | CourseProgram.tsx |
| 5 | 🟠 | Block 1 hero images нестандартные имена | public/course/block1/ |

---

## External Docs (в папке /docs/)

- `docs/README.md` — индекс всей документации
- `docs/supabase/` — Supabase Auth + DB
- `docs/telegram-bot-api/` — Telegram Bot API
- `docs/nextjs/` — Next.js App Router
- `docs/reown-appkit/` — WalletConnect UI
- `docs/metamask/` — MetaMask SDK
- `docs/wagmi/` — Wagmi hooks
- `docs/viem/` — Viem (ethereum)
- `docs/cryptobot/` — CryptoBot payments
- `docs/openclaw/` — OpenClaw платформа

---

## Git Workflow

```bash
# Работать всегда в dev
git checkout dev

# После изменений
git add <files>
git commit -m "feat/fix: описание"
git push origin dev

# Деплой — ТОЛЬКО с разрешения Master
git checkout main
git merge dev --no-ff -m "Merge branch dev"
git push origin main --no-verify
```
