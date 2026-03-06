# TASK: ClawAcademy — Telegram Auth (Code-based, no phone number)

## Проект
**ClawAcademy** — платформа курса по заработку с ИИ-агентами на OpenClaw.
Репо: https://github.com/Zenith-coder-cloud/ClawAcademy.git
GitHub token: [REDACTED]
Деплой: Vercel (auto-deploy из main ветки)
Домен: https://www.clawacademy.io

## Задача
Реализовать авторизацию через Telegram без запроса номера телефона.

## Как должно работать (UX)
1. Юзер нажимает "Войти через Telegram" на сайте
2. Сайт показывает инструкцию: "Напишите /start боту @ClawAcademyBot в Telegram"
3. Бот отвечает: "Ваш код входа: **4829**\nКод действителен 10 минут."
4. Юзер вводит 4-значный код на сайте
5. Сайт верифицирует код → создаёт сессию → редирект на /dashboard

## Технический стек
- Next.js 14 (App Router) — уже настроен
- Supabase — уже настроен (credentials ниже)
- Telegram Bot Token: 8663052035:AAHWO5vQVuB08ZPy8-4glJkPGypSW5wFYQk
- Bot username: @ClawAcademyBot

## Supabase credentials
- Project URL: https://yrhxaflvqxcvfhcbizlm.supabase.co
- Anon key: sb_publishable_G3YDHLwwa4fsaAGDbtQ08Q_hprnww4D
- Service role key: нужно получить из Supabase dashboard (Settings → API → service_role)

## Что нужно создать

### 1. Supabase таблица `auth_codes`
```sql
CREATE TABLE auth_codes (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  telegram_id bigint NOT NULL,
  telegram_username text,
  telegram_first_name text,
  telegram_photo_url text,
  code text NOT NULL,
  expires_at timestamptz NOT NULL,
  used boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);
-- Индекс для быстрого поиска по коду
CREATE INDEX idx_auth_codes_code ON auth_codes(code);
```

### 2. Supabase таблица `users` (если не существует)
```sql
CREATE TABLE IF NOT EXISTS users (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  telegram_id bigint UNIQUE,
  telegram_username text,
  first_name text,
  photo_url text,
  tier text DEFAULT 'free', -- 'free', 'genesis', 'pro', 'elite'
  wallet_address text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
```

### 3. API route: POST /api/bot/webhook
Принимает Telegram webhook updates.
При команде /start:
- Генерирует 4-значный код (например: "4829")
- Сохраняет в auth_codes с expires_at = now() + 10 минут
- Отправляет боту ответ: "Ваш код входа: **{code}**\nКод действителен 10 минут.\n\nВведите его на сайте: https://www.clawacademy.io/login"

### 4. API route: POST /api/auth/verify-code
Body: { code: "4829" }
Логика:
- Ищет код в auth_codes где used=false и expires_at > now()
- Если не найден → { error: "Неверный или устаревший код" }
- Если найден → помечает used=true, создаёт/обновляет запись в users
- Возвращает: { ok: true, user: { telegram_id, first_name, username, photo_url, tier } }

### 5. Обновить /src/app/login/page.tsx
**Оставить оба варианта входа на одной странице:**

Вариант А — Telegram Login Widget (быстро, 1 клик):
- Использовать компонент TelegramLoginButton.tsx (уже есть в репо)
- При успехе сохранить user в localStorage и редирект на /dashboard

Вариант Б — Войти через бота (без номера телефона):
- Кнопка "Войти через @ClawAcademyBot" → раскрывает форму
- Инструкция: "1. Напишите /start боту @ClawAcademyBot  2. Получите 4-значный код  3. Введите ниже"
- Ссылка-кнопка: "Открыть @ClawAcademyBot" → t.me/ClawAcademyBot
- Input: поле только для цифр (4 символа)
- Кнопка "Подтвердить код"
- При успехе → сохранить user в localStorage → редирект /dashboard

Разделитель между вариантами: "──── или ────"

Сохранить /src/components/TelegramLoginButton.tsx (не удалять).
Сохранить /src/app/api/auth/telegram/route.ts (не удалять).

### 8. Настроить webhook
После деплоя выполнить:
```
curl -X POST "https://api.telegram.org/bot8663052035:AAHWO5vQVuB08ZPy8-4glJkPGypSW5wFYQk/setWebhook" \
  -d "url=https://www.clawacademy.io/api/bot/webhook"
```

## ENV переменные для Vercel
Добавить в Vercel Settings → Environment Variables:
- TELEGRAM_BOT_TOKEN = 8663052035:AAHWO5vQVuB08ZPy8-4glJkPGypSW5wFYQk
- SUPABASE_SERVICE_ROLE_KEY = (нужно взять из Supabase Settings → API)
- NEXT_PUBLIC_SUPABASE_URL = https://yrhxaflvqxcvfhcbizlm.supabase.co
- NEXT_PUBLIC_SUPABASE_ANON_KEY = sb_publishable_G3YDHLwwa4fsaAGDbtQ08Q_hprnww4D

## После завершения
Сохрани результат в:
/Users/zenith/.openclaw/shared/results/dev-clawacademy-tgauth-YYYYMMDD.md

Формат отчёта:
- Что реализовано
- Какие файлы созданы/изменены
- Нужно ли что-то сделать вручную (Supabase SQL, Vercel env, webhook)
- Статус: ✅ / ⚠️ / ❌
