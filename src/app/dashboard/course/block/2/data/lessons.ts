export type TrackId =
  | "freelancer"
  | "content"
  | "business"
  | "student"
  | "investor"
  | "seller"
  | "developer"
  | "marketer"
  | "hr"
  | "life";

export interface AccordionItem {
  title: string;
  content: string;
  hint?: string;
}

export interface LessonData {
  id: number;
  title: string;
  subtitle: string;
  timerText: string;
  track?: TrackId;
  whyNeeded: string;
  caseTitle: string;
  caseItems: string[];
  capabilities?: string[];
  capabilitiesTitle?: string;
  promptInstruction?: string;
  prompt: string;
  steps: string[];
  checklist: string[];
  accordionItems?: AccordionItem[];
  accordionTitle?: string;
  troubleshoot: string[];
  prevLesson: string;
  nextLesson: string;
  nextLessonLabel?: string;
  completionTrackLabel?: string;
}

export const TOTAL_LESSONS = 26;

export const lessons: LessonData[] = [
  // ─── LESSON 1 ──────────────────────────────────────────────
  {
    id: 1,
    title: "Агент-автоответчик",
    subtitle: "Научи агента отвечать за тебя пока ты занят",
    timerText: "⏱ 35 минут",
    whyNeeded:
      "Ты получаешь десятки однотипных вопросов каждый день.\n«Сколько стоит?» «Ты свободен?» «Когда будет готово?»\n\nВместо того чтобы отвечать вручную — один раз настраиваешь агента-автоответчика.\nОн работает 24/7, отвечает в твоём стиле, не забывает ни одного сообщения.",
    caseTitle: "📦 Кейс: Фрилансер-разработчик Антон",
    caseItems: [
      "Проблема: 40+ входящих сообщений в день, 80% — одни и те же вопросы",
      "Решение: Агент-автоответчик настроен за 12 минут",
      "Результат: 2 часа в день вернул себе. Ответы приходят мгновенно.",
      "Настройка: 1 раз ✅",
    ],
    capabilities: [
      "Агент читает каждое входящее сообщение.",
      "Сравнивает с правилами которые ты задал.",
      "Отвечает — мгновенно, в твоём стиле.",
      "Ты видишь все диалоги. Можешь вмешаться в любой момент.",
    ],
    capabilitiesTitle: "Как это работает",
    promptInstruction:
      'Скопируй этот промпт и вставь прямо в чат с агентом.\nПосле этого агент запомнит правила и будет отвечать по ним.',
    prompt: `You are my personal auto-responder in Telegram.\n\nResponse rules:\n— When asked about pricing: "The cost depends on the task. Describe what you need — I'll personally reply within an hour"\n— When asked about deadlines: "Deadlines are discussed individually. Tell me more about the task"\n— When greeted or messaged "hi": "Hi! I'm busy right now but will reply later. If it's urgent — describe the task"\n— For everything else: "Got your message. I'll reply within [time]. If it's urgent — call me"\n\nImportant:\n— Reply politely, briefly, in a business-like manner\n— Don't make promises I can't keep\n— If the question is clearly urgent (words like "urgent", "ASAP", "right now") — add: "Got it, this is urgent. I'll try to respond faster"\n— Don't respond to system service commands`,
    steps: [
      "Шаг 1 — Открой чат с агентом в Telegram",
      'Шаг 2 — Нажми "Скопировать промпт" выше',
      "Шаг 3 — Вставь промпт и отправь",
      'Шаг 4 — Замени [время] на своё (например: "2 часа" или "до вечера")',
      'Шаг 5 — Отправь тестовое сообщение: "Сколько стоит разработка сайта?"',
      "Шаг 6 — Убедись что агент ответил правильно",
    ],
    checklist: [
      "Открыл чат с агентом",
      "Скопировал и вставил промпт",
      "Настроил время ответа под себя",
      "Протестировал — агент ответил правильно",
      "✅ Агент-автоответчик активен",
    ],
    accordionTitle: "Как улучшить",
    accordionItems: [
      {
        title: "Добавь свои FAQ",
        content:
          "Допиши в промпт конкретные вопросы которые тебе часто задают. Чем точнее — тем лучше ответы.",
      },
      {
        title: "Настрой под нишу",
        content:
          'Замени "разработка сайта" на свой продукт/услугу. Агент станет ещё более точным.',
      },
      {
        title: "Подключи к нескольким каналам",
        content:
          "Тот же промпт работает в Telegram, WhatsApp, Discord — везде где подключён агент.",
      },
    ],
    troubleshoot: [
      "Агент отвечает не по шаблону\n→ Промпт слишком общий. Добавь конкретные примеры вопросов и ответов.",
      "Агент игнорирует некоторые сообщения\n→ Добавь в конце промпта: \"На любое сообщение которое не попало в правила — отвечай: 'Получил, отвечу позже'\"",
      "Агент отвечает слишком длинно\n→ Добавь в промпт: \"Ответы не длиннее 2 предложений. Никаких лишних слов.\"",
      "Хочу чтобы агент не отвечал ночью\n→ Добавь правило: \"Если время ответа с 23:00 до 08:00 — добавь: 'Сейчас ночь, отвечу утром'\"",
    ],
    prevLesson: "/dashboard/course/block/2",
    nextLesson: "/dashboard/course/block/2/lesson/2",
    nextLessonLabel: "Урок 2: Агент-ресёрчер →",
  },

  // ─── LESSON 2 ──────────────────────────────────────────────
  {
    id: 2,
    title: "Агент-ресёрчер",
    subtitle: "Получай аналитические отчёты за 5 минут вместо 2 часов",
    timerText: "⏱ 45 минут",
    whyNeeded:
      "Хочешь знать что происходит на рынке? Следить за конкурентами? Исследовать тему?\nРаньше это занимало часы. Открыть 20 вкладок, прочитать, структурировать, записать.\n\nАгент-ресёрчер делает это за тебя. Ты задаёшь вопрос — получаешь готовый структурированный отчёт.",
    caseTitle: "📦 Кейс: Маркетолог Дарья",
    caseItems: [
      "Задача: ежедневный мониторинг конкурентов + новости рынка",
      "Раньше: 1.5 часа каждое утро вручную",
      "После: 1 сообщение агенту → отчёт через 3 минуты",
      "Время настройки: 18 минут",
      "Экономия: 7.5 часов в неделю ✅",
    ],
    capabilities: [
      "Найдёт последние новости по теме с источниками и датами",
      "Соберёт данные о конкурентах: цены, позиции, активность",
      "Сравнит несколько продуктов или компаний",
      "Напишет краткое резюме и выделит главное",
      "Предложит углубиться в интересный аспект",
    ],
    capabilitiesTitle: "Что умеет агент-ресёрчер",
    prompt: `You are my personal research analyst.\n\nWhen you receive a research request:\n1. Find 5–7 current sources via web search\n2. Highlight key facts, data, and figures\n3. Structure the report in this format:\n   📋 Summary (3–4 sentences)\n   🔑 Key facts (list with figures and dates)\n   📈 Trends and conclusions\n   🔗 Sources (names and URLs)\n4. At the end ask: \"Want to dive deeper into any aspect?\"\n\nReport requirements:\n— Facts only, no assumptions without sources\n— Numbers and dates wherever possible\n— Language: clear, no fluff\n— Length: sufficient for understanding, nothing extra`,
    steps: [
      "Шаг 1 — Скопируй промпт выше",
      "Шаг 2 — Вставь в чат агенту и отправь",
      'Шаг 3 — Напиши запрос: "Исследуй рынок AI-инструментов для фрилансеров"',
      "Шаг 4 — Дождись отчёта (обычно 1–3 минуты)",
      'Шаг 5 — Уточни: "Углубись в раздел о ценах"',
      "Шаг 6 — Сохрани промпт в заметки — он будет нужен регулярно",
    ],
    checklist: [
      "Скопировал промпт и отправил агенту",
      "Сделал первый запрос на исследование",
      "Получил структурированный отчёт",
      "Попросил углубиться в один аспект",
      "✅ Агент-ресёрчер работает",
    ],
    troubleshoot: [
      "Агент даёт устаревшие данные\n→ Добавь в запрос: \"только данные за последние 30 дней\" или \"актуально на [текущий год]\"",
      "Отчёт слишком длинный / слишком короткий\n→ Добавь в промпт: \"Объём резюме: не более 200 слов. Список фактов: не более 7 пунктов\"",
      "Агент придумывает источники\n→ Добавь: \"ВАЖНО: никогда не придумывай URL. Если не нашёл — так и напиши: 'источник не найден'\"",
      "Нужен отчёт каждое утро автоматически\n→ Это блок 3 — автоматизация по расписанию. Там настроим cron для ресёрчера.",
    ],
    prevLesson: "/dashboard/course/block/2/lesson/1",
    nextLesson: "",
  },

  // ─── LESSON 3 ──────────────────────────────────────────────
  {
    id: 3,
    title: "Email-агент",
    subtitle: "Разбирай inbox за 10 минут вместо часа",
    timerText: "⏱ 55 минут",
    track: "freelancer",
    whyNeeded:
      "50 писем в день. Запросы, вопросы, задачи, уведомления, спам.\nКаждое утро — час просто чтобы разобраться что важно.\n\nEmail-агент читает всё за тебя. Классифицирует. Готовит черновики.\nТы видишь только то что требует твоего внимания.",
    caseTitle: "📦 Кейс: Веб-разработчик Иван",
    caseItems: [
      "Ситуация: 60+ писем в день, важное тонет среди спама",
      "До: 1 час каждое утро на разбор inbox",
      "После: 10 минут — читаешь только классифицированный дайджест",
      "Время настройки: 22 минуты",
      "Требуется: подключённый email (урок 3, блок 1) ✅",
    ],
    prompt: `You are my email assistant.\n\nWhen I write "sort my mail" or "what's in email":\n1. Get the last 20 incoming emails\n2. Classify each one:\n   🔴 Urgent (requires a reply today)\n   🟡 Important (needs to be handled in the next few days)\n   🟢 Normal (not urgent)\n   📌 For later (informational, no action needed)\n\n3. Output the list in this format:\n   [CATEGORY] From: [sender] | Subject: [subject] | Summary: [1 sentence] | Action: [what to do]\n\n4. For each 🔴 email — prepare a draft reply\n\n5. At the end: summary — how many emails in each category\n\nDraft style: business-like, polite, specific. No fluff.`,
    steps: [
      "Шаг 1 — Убедись что email подключён (Google/Outlook через openclaw configure)",
      "Шаг 2 — Скопируй промпт и отправь агенту",
      'Шаг 3 — Напиши: "разбери почту"',
      "Шаг 4 — Дождись классифицированного дайджеста",
      "Шаг 5 — Просмотри черновики для срочных писем",
      'Шаг 6 — Попроси: "Отправь черновик ответа на письмо от [имя]" (или редактируй сам)',
    ],
    checklist: [
      "Email подключён к агенту",
      "Промпт скопирован и отправлен",
      'Написал "разбери почту"',
      "Получил классифицированный дайджест",
      "Проверил черновики для срочных писем",
      "✅ Email-агент работает",
    ],
    troubleshoot: [
      "Агент не видит входящие письма\n→ Email не подключён. Запусти: openclaw configure → раздел Integrations → Google/Outlook",
      "Агент видит письма но не читает тело\n→ Нужны расширенные права. При подключении Google разреши \"Read mail content\"",
      "Агент помечает всё как срочное\n→ Уточни промпт: \"🔴 Срочное — только если дедлайн сегодня или завтра, или прямой вопрос требующий ответа\"",
      "Не хочу чтобы агент отправлял письма\n→ Это нормально. По умолчанию агент только готовит черновики. Отправка — всегда по твоей команде.",
    ],
    completionTrackLabel: "Фрилансер — Email, КП, Трекер",
    prevLesson: "/dashboard/course/block/2/lesson/2",
    nextLesson: "",
  },

  // ─── LESSON 4 ──────────────────────────────────────────────
  {
    id: 4,
    title: "Контент-агент",
    subtitle: "Контент-план на неделю и готовые посты — за 20 минут",
    timerText: "⏱ 45 минут",
    track: "content",
    whyNeeded:
      "Идеи заканчиваются. Времени не хватает. Посты надо публиковать каждый день.\nА ещё нужно придумать хук, написать текст, подобрать хэштеги.\n\nКонтент-агент не заменит тебя — но умножит твою скорость в 4 раза.\nТы даёшь тему. Он даёт структуру, черновик, варианты.",
    caseTitle: "📦 Кейс: Блогер Алина, канал об инвестициях",
    caseItems: [
      "Ситуация: канал 8 000 подписчиков, нужно 2 поста в день",
      "До: 3 часа на контент ежедневно",
      "После: 40 минут — агент даёт план, Алина редактирует под себя",
      "Скорость создания: ×4",
      "Время настройки: 17 минут ✅",
    ],
    capabilities: [
      "Генерирует контент-план на неделю (7 идей с описанием)",
      "Пишет готовый пост под Telegram (800–1200 символов)",
      "Пишет готовый пост под Instagram (300–500 символов + хэштеги)",
      "Придумывает хуки (первая строка которая зацепит)",
      "Предлагает 2 варианта заголовка на выбор",
      "Подбирает форматы: текст, карусель, опрос, личная история",
    ],
    capabilitiesTitle: "Что умеет агент",
    promptInstruction:
      'Перед копированием — замени 3 поля в квадратных скобках:\n[тема канала], [твой стиль], [твоя аудитория]\nЧем точнее опишешь — тем лучше будут посты.',
    prompt: `You are my content manager.\n\nMy topic: [replace with your own — e.g.: "crypto and investing for beginners"]\nMy style: [replace with your own — e.g.: "simple and friendly, no complex terms, with real-life examples"]\nMy audience: [replace with your own — e.g.: "25–40 years old, want to learn investing from scratch"]\n\nWhen I ask for "weekly content plan":\n1. Come up with 7 post ideas on the topic\n2. For each: topic, main thesis, hook (first line), format\n3. Distribute by days: 2 informational, 2 personal/stories, 2 engagement (poll/question), 1 with call to action\n\nWhen I ask "write a post about [topic]":\n1. Write in my style for my audience\n2. For Telegram: 800–1200 characters, no hashtags\n3. For Instagram: 300–500 characters + 5 hashtags at the end\n4. Suggest 2 variants for the first line (hook)\n5. At the end add a short version for Stories (1–2 sentences)`,
    steps: [
      "Шаг 1 — Заполни 3 поля в промпте: тема, стиль, аудитория",
      "Шаг 2 — Скопируй и отправь агенту",
      'Шаг 3 — Напиши: "контент-план на неделю"',
      "Шаг 4 — Получи 7 идей — выбери 1-2 которые нравятся",
      'Шаг 5 — Попроси: "напиши пост про [одна из идей]"',
      "Шаг 6 — Отредактируй под себя — добавь личный опыт, свои примеры",
    ],
    checklist: [
      "Заполнил поля в промпте под свою нишу",
      "Отправил агенту",
      "Получил контент-план на неделю",
      "Попросил написать один пост",
      "Пост читается в твоём стиле",
      "✅ Контент-агент настроен",
    ],
    accordionTitle: "Советы по редактуре",
    accordionItems: [
      {
        title: "Добавь личный опыт",
        content:
          "Агент пишет хорошо, но твой личный пример делает пост в 3 раза интереснее. 1–2 предложения от себя — и пост живой.",
      },
      {
        title: "Используй вариант хука",
        content:
          "Агент предлагает 2 хука. Выбери тот который зацепил бы тебя самого. Первая строка решает всё.",
      },
      {
        title: "Не публикуй без редактуры",
        content:
          'Черновик агента — основа, не финал. Прочти вслух. Если звучит не как ты — правь.',
      },
    ],
    troubleshoot: [
      'Посты звучат роботизированно\n→ В поле "стиль" добавь конкретные примеры: "пишу как разговариваю с другом, использую \'я\', \'ты\', иногда матерюсь"',
      'Агент пишет слишком длинно\n→ Добавь в промпт: "Строго: Telegram — не более 1000 символов. Убирай воду безжалостно."',
      'Идеи повторяются\n→ Добавь: "Не повторяй темы которые мы уже обсуждали в этой сессии. Каждая идея — уникальный угол зрения."',
      'Нужны посты на другом языке\n→ Добавь в промпт: "Пиши на [язык]" или переключи язык запроса.',
    ],
    completionTrackLabel: "Контент — TG/IG, YouTube, Тренды",
    prevLesson: "/dashboard/course/block/2/lesson/2",
    nextLesson: "",
  },

  // ─── LESSON 5 ──────────────────────────────────────────────
  {
    id: 5,
    title: "Агент-парсер рынка",
    subtitle: "Мониторинг конкурентов и рынка — автоматически",
    timerText: "⏱ 60 минут",
    track: "business",
    whyNeeded:
      "Рынок меняется. Конкуренты меняют цены. Появляются новые игроки.\nДержать руку на пульсе вручную — нереально.\n\nАгент-парсер собирает данные, сравнивает, выдаёт структурированный отчёт.\nТы принимаешь решения на основе данных а не ощущений.",
    caseTitle: '📦 Кейс: Интернет-магазин электроники "Voltex"',
    caseItems: [
      "Ситуация: 200+ позиций, 5 конкурентов, ценовая война",
      "До: менеджер 4 часа в неделю на мониторинг цен вручную",
      "После: еженедельный отчёт по конкурентам приходит автоматически",
      "Время настройки: 28 минут",
      "Экономия: 16 часов в месяц ✅",
    ],
    capabilities: [
      "Собирает цены конкурентов по заданным продуктам",
      "Сравнивает с твоими ценами: где ты дороже, где дешевле",
      "Находит позиции которые есть у конкурентов но нет у тебя",
      "Отслеживает акции и спецпредложения",
      "Выдаёт готовую таблицу + краткий вывод с рекомендациями",
    ],
    capabilitiesTitle: "Что умеет агент-парсер",
    promptInstruction:
      "Замени поля в промпте на своих реальных конкурентов и свои продукты.\nПервый запрос займёт 2–5 минут — агент обходит несколько сайтов.",
    prompt: `You are a market and competitor monitoring agent.\n\nMy competitors (replace with your own):\n1. [competitor name 1] — [URL]\n2. [competitor name 2] — [URL]\n3. [competitor name 3] — [URL]\n\nMy key products (replace with your own):\n1. [product 1] — my price: [price]\n2. [product 2] — my price: [price]\n3. [product 3] — my price: [price]\n\nWhen I write "check competitors":\n1. Find current prices for my products at each competitor\n2. Find promotions and special offers\n3. Create a comparison table: | Product | My Price | Competitor 1 | Competitor 2 | Competitor 3 |\n4. Highlight:\n   🔴 Where I'm significantly more expensive than competitors (>15%)\n   🟡 Where I'm roughly on par (±10%)\n   🟢 Where I'm cheaper\n   ➕ What competitors have that I don't\n5. Recommendations: 3–5 specific actions\n\nFormat: Markdown table + text summary.`,
    steps: [
      "Шаг 1 — Заполни список конкурентов (3–5 штук) и своих продуктов (3–7 штук)",
      "Шаг 2 — Скопируй промпт и отправь агенту",
      'Шаг 3 — Напиши: "проверь конкурентов"',
      "Шаг 4 — Дождись отчёта (2–5 минут — агент обходит сайты)",
      "Шаг 5 — Изучи таблицу и рекомендации",
      'Шаг 6 — Попроси: "Углубись по [конкурент 1] — что именно у них популярно?"',
    ],
    checklist: [
      "Заполнил конкурентов и свои продукты в промпте",
      "Отправил агенту",
      'Написал "проверь конкурентов"',
      "Получил сравнительную таблицу",
      "Изучил рекомендации",
      "✅ Агент-парсер настроен",
    ],
    accordionTitle: "Как масштабировать",
    accordionItems: [
      {
        title: "Автоматический мониторинг каждую неделю",
        content:
          "Блок 3 — там настроим cron: агент сам запускает мониторинг по расписанию и присылает отчёт.",
      },
      {
        title: "Расширить список конкурентов",
        content:
          "Добавь больше URL в промпт. Агент обработает всех — просто займёт немного дольше.",
      },
      {
        title: "Мониторинг не только цен",
        content:
          'Измени задачу: "следи за новыми продуктами конкурентов", "отслеживай их контент", "анализируй отзывы клиентов"',
      },
    ],
    troubleshoot: [
      "Агент не может зайти на сайт конкурента\n→ Сайт защищён или требует авторизацию. Попробуй другой источник: Google Merchant, Яндекс.Маркет, price.ua — агент найдёт данные там.",
      'Данные устаревшие\n→ Добавь в запрос: "убедись что данные актуальные, проверь дату публикации"',
      'Слишком много продуктов — агент путается\n→ Разбей на группы: "проверь конкурентов только по категории [категория]"',
      "Конкурент меняет цены часто\n→ Настрой мониторинг ежедневно — инструкция в Блоке 3.",
    ],
    completionTrackLabel: "Бизнес — Поддержка, Парсер, Лиды",
    prevLesson: "/dashboard/course/block/2/lesson/2",
    nextLesson: "",
  },

  // ─── LESSON 6 ──────────────────────────────────────────────
  {
    id: 6,
    title: "Агент для КП и офферов",
    subtitle: "Пиши коммерческие предложения за 10 минут вместо 2 часов",
    timerText: "⏱ 45 минут",
    track: "freelancer",
    whyNeeded:
      "Каждый клиент — уникальный. Каждое КП надо адаптировать. Копипаст не работает. Писать с нуля — долго.\n\nАгент берёт бриф клиента, твои условия и собирает КП которое попадает в точку. Ты редактируешь финальный вариант — 10 минут вместо 2 часов.",
    caseTitle: "📦 Кейс: SMM-специалист Марина",
    caseItems: [
      "Ситуация: 15+ запросов в неделю, на каждое КП уходило 1.5 часа",
      "До: 22 часа в неделю только на переговоры и КП",
      "После: агент делает черновик за 3 минуты, Марина редактирует 15 минут",
      "Конверсия КП в продажу: выросла с 18% до 31% (более точное попадание)",
      "Время настройки: 20 минут ✅",
    ],
    prompt: `You are my sales assistant and proposal writer.

When I say "write a proposal" and provide client information:
1. Proposal structure:
   — Headline (client's pain point + my solution)
   — Understanding the task (show that you hear the client)
   — My solution (specifically what I do, how, and in what timeframe)
   — Result (what the client gets — numbers and specifics)
   — Terms (price, deadlines, what's included, what's not)
   — Next step (one clear call to action)

2. Tone: confident, business-like, no fluff or self-praise
3. Length: 300–500 words — no more
4. Don't use words like: "unique", "professional", "top-quality", "comprehensive"

My services and rates (replace with your own):
— [service 1]: [price], [timeframe]
— [service 2]: [price], [timeframe]

Before writing — clarify if there's not enough information about the client's task.`,
    steps: [
      "Шаг 1 — Заполни свои услуги и тарифы в промпте",
      "Шаг 2 — Отправь агенту",
      'Шаг 3 — Напиши: "напиши КП. Клиент: [описание]. Задача: [что просит]. Бюджет: [если знаешь]"',
      "Шаг 4 — Получи черновик КП",
      "Шаг 5 — Добавь личные детали и отправь клиенту",
      "Шаг 6 — Сохрани лучшие КП как шаблоны — агент улучшится с опытом",
    ],
    checklist: [
      "□ Заполнил услуги и тарифы",
      "□ Отправил агенту и протестировал первый запрос",
      "□ Черновик КП читается убедительно",
      "□ Адаптировал под реального клиента",
      "✅ Агент для КП настроен",
    ],
    troubleshoot: [
      "КП звучит слишком шаблонно\n→ Добавь в запрос больше деталей о клиенте: его боли, бизнес, что пробовал раньше",
      'Агент не знает мои реальные кейсы\n→ Добавь в промпт: "Мои кейсы: [клиент 1 — результат], [клиент 2 — результат]"',
      'КП слишком длинное\n→ Добавь в промпт: "Максимум 400 слов. Убирай всё что не помогает продаже."',
      'Клиент не отвечает на КП\n→ Попроси агента: "Напиши follow-up письмо через 3 дня после отправки КП"',
    ],
    prevLesson: "/dashboard/course/block/2/lesson/3",
    nextLesson: "/dashboard/course/block/2/lesson/7",
    nextLessonLabel: "Урок 7: Агент-трекер задач →",
  },

  // ─── LESSON 7 ──────────────────────────────────────────────
  {
    id: 7,
    title: "Агент-трекер задач",
    subtitle: "Держи все проекты под контролем без Jira и Notion",
    timerText: "⏱ 35 минут",
    track: "freelancer",
    whyNeeded:
      "5 клиентов. 20 задач. Разные дедлайны. Разные статусы. Держать это в голове — неработает. Открывать Notion по каждому вопросу — медленно.\n\nАгент-трекер знает все твои проекты. Ты спрашиваешь — он отвечает мгновенно. Обновляешь статус одним сообщением. Никаких таблиц и досок.",
    caseTitle: "📦 Кейс: Разработчик Дмитрий (4 клиента одновременно)",
    caseItems: [
      'Проблема: постоянно путался в дедлайнах, забывал что на паузе',
      'До: 30+ минут в день на "а где мы с этим проектом?"',
      "После: 1 вопрос агенту → полная картина по всем проектам",
      "Пропущенных дедлайнов с агентом: 0",
      "Время настройки: 12 минут ✅",
    ],
    prompt: `You are my project manager and task tracker.

My current projects (replace with your own):
1. [Project name] — Client: [name] — Deadline: [date] — Status: [what I'm currently doing]
2. [Project name] — Client: [name] — Deadline: [date] — Status: [what I'm currently doing]

Commands I use:
— "status" → list all projects: name, client, deadline, status, what to do next
— "update [project]: [new status]" → record the change
— "urgent" → show what needs to be done today and tomorrow
— "add project: [details]" → add a new project to the list
— "what's next?" → tell me what to start with right now

Status format: 🟢 In progress | 🟡 Waiting (client/materials) | 🔴 Urgent | ✅ Done | ⏸ Paused`,
    steps: [
      "Шаг 1 — Заполни список своих текущих проектов в промпте",
      "Шаг 2 — Отправь агенту",
      'Шаг 3 — Напиши "статус" — получи полную картину',
      'Шаг 4 — Напиши "горящие" — агент покажет приоритеты на сегодня',
      "Шаг 5 — Обновляй статусы в течение дня одним сообщением",
    ],
    checklist: [
      "□ Внёс все текущие проекты в промпт",
      "□ Отправил агенту",
      '□ Проверил команду "статус" — список актуальный',
      '□ Проверил команду "горящие" — приоритеты верные',
      "✅ Агент-трекер работает",
    ],
    troubleshoot: [
      'Агент путается в проектах\n→ Дай каждому проекту короткий уникальный код: "WEB-01", "SMM-02" — легче ссылаться',
      "Агент забывает обновления между сессиями\n→ В начале каждой сессии вставляй актуальный список. Или веди список в отдельном файле и прикладывай",
      "Хочу чтобы агент напоминал о дедлайнах\n→ Это блок 3 — там настроим автоматические напоминания по расписанию",
    ],
    completionTrackLabel: "Фрилансер — Email, КП, Трекер",
    prevLesson: "/dashboard/course/block/2/lesson/6",
    nextLesson: "",
  },

  // ─── LESSON 8 ──────────────────────────────────────────────
  {
    id: 8,
    title: "Агент для YouTube",
    subtitle: "Сценарии, описания, теги и шорты — за 20 минут",
    timerText: "⏱ 45 минут",
    track: "content",
    whyNeeded:
      "YouTube — это не просто видео. Это заголовок, описание, теги, тайм-коды, шорт, пост в сообществе. На каждое видео уходит 3–4 часа работы вокруг контента.\n\nАгент берёт твою тему или тезисы — и выдаёт всё остальное. Ты снимаешь, он упаковывает.",
    caseTitle: "📦 Кейс: Tech-блогер Артём, канал 45к подписчиков",
    caseItems: [
      'Ситуация: 2 видео в неделю, каждое требовало 3 часа "упаковки"',
      "До: 6 часов в неделю только на описания, теги, сценарии",
      "После: агент делает всё за 20 минут, Артём только правит",
      "Рост просмотров: +34% за 2 месяца (лучшие теги, точнее заголовки)",
      "Время настройки: 18 минут ✅",
    ],
    prompt: `You are my YouTube producer. You help package content for maximum reach.

My channel: [replace with your own — topic, style, audience]
My audience: [replace with your own — who watches, their pain points and interests]

When I give you a video topic or key points, do:

1. TITLE (3 variants):
   — SEO title (with keyword, up to 60 characters)
   — Clickbait title (intrigue, numbers)
   — Personal title (first person, story)

2. DESCRIPTION (for YouTube):
   — First 2 lines — hook (visible before "Show more")
   — Main description: what the video is about, what the viewer will learn (200–300 words)
   — Timestamps (if I provide structure)
   — Call to action: subscribe, comment, links

3. TAGS: 15–20 tags — from broad to narrow, in Russian and English

4. SHORT: video variant in 60-second format — main point + hook + conclusion

5. COMMUNITY POST: video announcement (100–150 words) + engagement question`,
    steps: [
      "Шаг 1 — Заполни описание канала и аудитории",
      "Шаг 2 — Отправь агенту",
      'Шаг 3 — Напиши: "Тема: [тема видео]. Главные мысли: [3-5 тезисов]"',
      "Шаг 4 — Получи всю упаковку: заголовки, описание, теги, шорт, пост",
      "Шаг 5 — Выбери лучший заголовок, скорректируй описание",
      "Шаг 6 — Скопируй теги прямо в YouTube Studio",
    ],
    checklist: [
      "□ Описал канал и аудиторию в промпте",
      "□ Получил 3 варианта заголовка",
      "□ Получил описание с хуком и тайм-кодами",
      "□ Получил 15+ тегов",
      "□ Получил вариант для Шортс",
      "✅ Агент для YouTube настроен",
    ],
    troubleshoot: [
      "Заголовки не цепляют\n→ Добавь примеры заголовков с твоего канала которые дали много просмотров — агент поймёт твой стиль",
      'Описание слишком общее\n→ Давай агенту больше тезисов: не "про крипту", а "объясняю почему биткоин упал 15% за неделю — три причины с графиками"',
      'Теги нерелевантные\n→ Добавь в промпт: "Используй теги которые реально ищут на YouTube, не общие слова"',
      'Нужен сценарий а не только упаковка\n→ Добавь команду в промпт: "напиши сценарий" — структура по таймингу, переходы, призывы',
    ],
    prevLesson: "/dashboard/course/block/2/lesson/4",
    nextLesson: "/dashboard/course/block/2/lesson/9",
    nextLessonLabel: "Урок 9: Агент трендов →",
  },

  // ─── LESSON 9 ──────────────────────────────────────────────
  {
    id: 9,
    title: "Агент трендов",
    subtitle: "Знай что залетает в твоей нише — до всех остальных",
    timerText: "⏱ 35 минут",
    track: "content",
    whyNeeded:
      "Контент который попадает в тренд — получает в 10 раз больше охватов. Но тренды живут 3–7 дней. Опоздал — всё.\n\nАгент мониторит твою нишу каждый день и сообщает что горячее прямо сейчас. Ты первым делаешь контент на тренд — пока конкуренты ещё не проснулись.",
    caseTitle: "📦 Кейс: Крипто-блогер Никита",
    caseItems: [
      'Ситуация: пропускал тренды, публиковал когда тема уже "остыла"',
      "До: реагировал на тренды через 2–3 дня (поздно)",
      "После: агент даёт дайджест трендов каждое утро — Никита публикует первым",
      'Охваты "трендовых" постов: выросли в 4.7 раза',
      "Время настройки: 14 минут ✅",
    ],
    prompt: `You are my trend and content analyst.

My niche: [replace with your own — e.g.: "crypto and Web3", "personal finance", "neural networks and AI"]
My platforms: [replace with your own — TG, YouTube, Instagram, TikTok]
My competitors to monitor: [replace with your own — @channel1, @channel2, websites]

When I ask "what's trending" or "trend digest":
1. Find 5–7 hot topics in my niche from the last 48 hours
2. For each topic:
   — Trend summary (1–2 sentences)
   — Why it's taking off right now (reason)
   — Content idea for my audience (specific angle)
   — Urgency: 🔥 Today | ⚡ 2–3 days | 📅 Week
3. Top-1 trend: more detail — what competitors are doing, what I should do differently
4. Quick idea for Stories/Shorts for today (60 seconds)`,
    steps: [
      "Шаг 1 — Заполни нишу, платформы, конкурентов",
      "Шаг 2 — Отправь агенту",
      'Шаг 3 — Напиши "что в тренде" — получи дайджест',
      "Шаг 4 — Выбери 1–2 темы которые подходят твоей аудитории",
      'Шаг 5 — Попроси: "развёрни идею контента по теме [тема]"',
      'Шаг 6 — Настрой ежедневный запрос (в блоке 3 — через cron)',
    ],
    checklist: [
      "□ Заполнил нишу и конкурентов",
      "□ Получил первый дайджест трендов",
      "□ Понял формат — тренды релевантные и свежие",
      "□ Попросил развернуть одну идею",
      "✅ Агент трендов работает",
    ],
    troubleshoot: [
      'Тренды не по теме\n→ Уточни нишу конкретнее: не "бизнес" а "малый бизнес в России, e-commerce, WB и Ozon"',
      'Агент находит старые новости\n→ Добавь: "ТОЛЬКО данные за последние 48 часов. Если источник старше 2 дней — не включай"',
      "Идеи слишком общие\n→ Добавь примеры своих лучших постов — агент поймёт какой контент работает именно у тебя",
      "Хочу мониторинг каждое утро автоматически\n→ Блок 3: настроим cron — агент сам присылает дайджест в 8 утра",
    ],
    completionTrackLabel: "Контент — TG/IG, YouTube, Тренды",
    prevLesson: "/dashboard/course/block/2/lesson/8",
    nextLesson: "",
  },

  // ─── LESSON 10 ─────────────────────────────────────────────
  {
    id: 10,
    title: "Чат-бот поддержки клиентов",
    subtitle: "Отвечай клиентам 24/7 — без менеджера, без задержек",
    timerText: "⏱ 55 минут",
    track: "business",
    whyNeeded:
      "Клиент написал в 23:00. Конкурент ответил через минуту. Ты — утром. Сделка ушла.\n\nЧат-бот поддержки отвечает мгновенно в любое время. Закрывает 80% типовых вопросов. Менеджер подключается только к сложным случаям.",
    caseTitle: '📦 Кейс: Онлайн-школа английского "SpeakUp"',
    caseItems: [
      "Ситуация: 200+ сообщений в день в Telegram, 3 менеджера не справлялись",
      "До: среднее время ответа — 2.5 часа, 40% клиентов уходили",
      "После: бот отвечает за 5 секунд, менеджер видит только сложные запросы",
      "Конверсия в покупку: выросла с 12% до 28%",
      "Нагрузка на менеджеров: снизилась на 70%",
      "Время настройки: 24 минуты ✅",
    ],
    prompt: `You are the official assistant of [company name]. You respond to clients in Telegram.

About us:
[replace with your own] Brief description of the company, product, or service

Frequently asked questions (replace with your own):

Q: How much does it cost?
A: [your answer with specific prices or a link to the price list]

Q: How to sign up / buy?
A: [step-by-step instructions]

Q: How long to wait for delivery / results?
A: [specific answer]

Q: Is there a guarantee?
A: [guarantee terms]

Q: How to return / cancel?
A: [return policy]

Rules of engagement:
— Reply politely, specifically, no fluff
— If the question isn't in the FAQ — write: "Great question! Passing it to a manager, they'll reply within [time]"
— Never make up information — only what's written above
— If the client is upset — empathy, apology, hand off to manager
— Always suggest the next step at the end of your response`,
    steps: [
      "Шаг 1 — Заполни описание компании и FAQ (минимум 5 вопросов)",
      "Шаг 2 — Отправь агенту",
      "Шаг 3 — Протестируй: напиши типичный вопрос клиента",
      "Шаг 4 — Проверь ответ — точный? вежливый? не придумывает?",
      "Шаг 5 — Добавь ещё 5-10 вопросов из реальных обращений",
      "Шаг 6 — Протестируй сложный кейс: злой клиент, нестандартный вопрос",
    ],
    checklist: [
      "□ Заполнил описание компании",
      "□ Добавил минимум 5 вопросов в FAQ",
      "□ Протестировал типовые вопросы",
      "□ Проверил сложный кейс (жалоба, нестандарт)",
      "□ Бот не придумывает несуществующую информацию",
      "✅ Чат-бот поддержки настроен",
    ],
    troubleshoot: [
      'Бот придумывает информацию\n→ Добавь жёстко: "ЗАПРЕЩЕНО: давать любую информацию не из этого промпта. Лучше передать менеджеру."',
      'Ответы слишком длинные\n→ Добавь: "Каждый ответ — максимум 3 предложения. Чётко и по делу."',
      "Клиент не доволен ботом\n→ Добавь ранний эскалейшн: \"Если клиент написал 'хочу человека' или 'позовите менеджера' → сразу: 'Понял! Менеджер свяжется с вами в течение [время]'\"",
      "Нужно подключить к реальному боту в Telegram\n→ Это уже в уроке 2 блока 1 — у тебя уже есть Telegram агент. Этот промпт — инструкция для него.",
    ],
    prevLesson: "/dashboard/course/block/2/lesson/2",
    nextLesson: "/dashboard/course/block/2/lesson/5",
    nextLessonLabel: "Урок 5: Агент-парсер рынка →",
  },

  // ─── LESSON 11 ─────────────────────────────────────────────
  {
    id: 11,
    title: "Агент лидогенерации",
    subtitle: "Находи потенциальных клиентов и делай первый контакт",
    timerText: "⏱ 60 минут",
    track: "business",
    whyNeeded:
      "Новые клиенты не появляются сами. Холодный поиск — это часы ручной работы. Просмотреть 100 профилей, написать 50 сообщений, получить 5 ответов.\n\nАгент автоматизирует поиск и первый контакт. Ты общаешься только с теми кто уже заинтересован.",
    caseTitle: '📦 Кейс: B2B SaaS компания "Аналитика PRO"',
    caseItems: [
      "Ситуация: нужен постоянный поток лидов, SDR работал вручную",
      "До: 20 лидов в неделю, 40 часов работы SDR",
      "После: агент находит 80+ потенциальных клиентов, пишет персональные сообщения",
      "Время SDR на рутину: снизилось с 40 до 10 часов в неделю",
      "Время настройки: 28 минут ✅",
    ],
    prompt: `You are a lead generation and initial outreach agent.

My product / service: [replace with your own — what you sell]
Ideal client: [replace with your own — company size, role, niche, pain points]
Search channels: [replace with your own — LinkedIn, Telegram, VC.ru, professional communities]

When I say "find leads":
1. Find 10–15 potential clients matching the description
2. For each: name/company, role, why they're a fit, where found, contact
3. Write a personalized first message for each (not a template — account for their specifics)

First message rules:
— 3–5 sentences maximum
— Start with something specific about their company/work (not "I saw your profile")
— One specific pain point you solve
— Soft call to action: "If this is relevant — happy to tell you more in 15 minutes"
— No aggressive sales pitch, no links in the first message

When I say "write a follow-up":
— 5 days after the first message with no reply
— 2–3 sentences, different angle, no pressure`,
    steps: [
      "Шаг 1 — Опиши продукт и идеального клиента",
      "Шаг 2 — Укажи каналы поиска",
      'Шаг 3 — Напиши "найди лидов"',
      "Шаг 4 — Получи список с персональными сообщениями",
      "Шаг 5 — Проверь каждое сообщение — звучит естественно?",
      "Шаг 6 — Отправь первые 5 — замерь конверсию в ответ",
    ],
    checklist: [
      "□ Описал продукт и идеального клиента",
      "□ Получил первый список из 10+ лидов",
      "□ Проверил персональные сообщения — не шаблонные",
      "□ Отправил первые сообщения",
      "✅ Агент лидогенерации настроен",
    ],
    troubleshoot: [
      "Лиды нерелевантные\n→ Уточни портрет клиента: не \"малый бизнес\" а \"IT-компании 10-50 человек, Москва, есть CRM\"",
      "Сообщения звучат как спам\n→ Добавь: \"Каждое сообщение уникальное. Ссылайся на конкретику: их последний пост, проект, достижение\"",
      "Агент не находит контакты\n→ Укажи где искать конкретнее: \"ищи в Telegram-чатах [названия]\", \"ищи на LinkedIn по запросу [запрос]\"",
      "Нужен автоматический поиск лидов каждую неделю\n→ Блок 3: настроим cron — агент сам ищет и присылает список каждый понедельник",
    ],
    completionTrackLabel: "Бизнес — Поддержка, Парсер, Лиды",
    prevLesson: "/dashboard/course/block/2/lesson/10",
    nextLesson: "",
  },

  // ─── LESSON 12 ─────────────────────────────────────────────
  {
    id: 12,
    title: "Агент-конспектировщик",
    subtitle: "Структурированный конспект из любого материала за 5 минут",
    timerText: "⏱ 35 минут",
    track: "student",
    whyNeeded:
      "Читаешь статью на 40 минут — запоминаешь 20% и не знаешь как структурировать. Смотришь лекцию — записываешь всё подряд, потом не можешь найти главное.\n\nАгент-конспектировщик берёт любой текст или ссылку — и выдаёт структурированный конспект. Ключевые идеи, термины, примеры — всё по полочкам.",
    caseTitle: "📦 Кейс: Студент-медик Саша, 4 курс",
    caseItems: [
      "Ситуация: 6 предметов одновременно, каждый требует конспектов",
      "До: 3–4 часа на конспект одной лекции (вручную)",
      "После: агент делает структуру за 5 минут, Саша дополняет своими словами",
      "Оценки на экзаменах: выросли — материал лучше структурирован и запоминается",
      "Время настройки: 12 минут ✅",
    ],
    prompt: `You are my personal note-taker and study assistant.

When I give you text, an article, or a link:
1. BRIEF SUMMARY (3–5 sentences): the main idea of the material
2. KEY CONCEPTS: list of main terms with definitions
3. STRUCTURED NOTES:
   — Break into logical sections with headings
   — Under each heading — 3–5 main points
   — Important figures, dates, names — highlight separately
4. EXAMPLES AND ILLUSTRATIONS: specific examples from the text
5. SELF-CHECK QUESTIONS: 5 questions on the material

If I give a URL — read the page and summarize it.
If the material is in a foreign language — notes in Russian.

Additional commands:
— "explain simply [concept]" → explanation as if for a 10-year-old
— "come up with an analogy for [concept]" → real-life comparison
— "connect with [other topic]" → how this relates to what I already know`,
    steps: [
      "Шаг 1 — Отправь промпт агенту",
      "Шаг 2 — Вставь текст лекции или статьи (или ссылку)",
      "Шаг 3 — Получи структурированный конспект",
      'Шаг 4 — Попроси объяснить непонятные места: "объясни проще термин X"',
      "Шаг 5 — Проверь себя по вопросам в конце конспекта",
      "Шаг 6 — Сохрани конспект в Notion/Google Docs",
    ],
    checklist: [
      "□ Отправил промпт агенту",
      "□ Протестировал на реальном материале",
      "□ Конспект структурирован — блоки, тезисы, примеры",
      "□ Попросил объяснить одно непонятное место",
      "□ Ответил на вопросы самопроверки",
      "✅ Агент-конспектировщик работает",
    ],
    troubleshoot: [
      "Агент не может прочитать PDF\n→ Скопируй текст из PDF и вставь напрямую. Или используй онлайн-конвертер PDF→текст",
      'Конспект слишком длинный\n→ Добавь: "Конспект — максимум 500 слов. Только самое важное."',
      'Материал на специфическом языке (медицина, право, IT)\n→ Добавь в промпт: "Я изучаю [предмет]. Используй правильную терминологию, но объясняй понятно"',
      'Хочу карточки для запоминания\n→ Добавь команду: "сделай карточки — 10 пар вопрос/ответ по материалу"',
    ],
    prevLesson: "/dashboard/course/block/2",
    nextLesson: "/dashboard/course/block/2/lesson/13",
    nextLessonLabel: "Урок 13: Агент подготовки к экзамену →",
  },

  // ─── LESSON 13 ─────────────────────────────────────────────
  {
    id: 13,
    title: "Агент подготовки к экзамену",
    subtitle: "Персональный репетитор который знает твои пробелы",
    timerText: "⏱ 45 минут",
    track: "student",
    whyNeeded:
      "Прочитал учебник — не знаешь что реально спросят. Решаешь тесты — не понимаешь почему ошибся.\n\nАгент-репетитор генерирует вопросы именно по твоей теме, объясняет ошибки, адаптирует сложность и фокусируется на твоих слабых местах.",
    caseTitle: "📦 Кейс: Абитуриентка Лера, сдаёт ЕГЭ по химии",
    caseItems: [
      "Ситуация: слабые места в органической химии, не понимала что именно учить",
      "До: зубрила всё подряд — неэффективно",
      "После: агент выявил 3 темы где больше всего ошибок и сфокусировался на них",
      "Результат ЕГЭ: 89 баллов (было 72 на пробном)",
      "Время настройки: 16 минут ✅",
    ],
    prompt: `You are my personal tutor and exam prep coach.

Subject/exam: [replace with your own — SAT Math, Bar Exam, IELTS, etc.]
My level: [replace with your own — beginner/intermediate/advanced]
Weak areas (if known): [replace with your own — or write "don't know yet"]

Modes of operation:

TEST (command "test [topic]"):
— 10 questions of varying difficulty on the topic
— After each answer: correct/incorrect + explanation
— At the end: summary and what needs review

ERROR ANALYSIS (command "why [wrong answer]"):
— Explanation of why the answer is incorrect
— Correct answer with reasoning
— Similar question for reinforcement

WEAK SPOTS (command "my gaps"):
— Analysis of mistakes from our session
— Top-3 topics where I make errors
— Plan for what to study first

EXPLANATION (command "explain [topic]"):
— Simple explanation
— Real-life example
— Common mistakes on this topic`,
    steps: [
      "Шаг 1 — Заполни предмет и свой уровень",
      "Шаг 2 — Отправь агенту",
      'Шаг 3 — Напиши "тест [тема первого урока]"',
      "Шаг 4 — Пройди тест, получи разбор ошибок",
      'Шаг 5 — Напиши "мои пробелы" — агент покажет слабые места',
      "Шаг 6 — Занимайся каждый день по 30 минут с агентом",
    ],
    checklist: [
      "□ Указал предмет и уровень",
      "□ Прошёл первый тест",
      "□ Понял формат разбора ошибок",
      '□ Проверил команду "мои пробелы"',
      "✅ Агент-репетитор настроен",
    ],
    troubleshoot: [
      'Вопросы слишком лёгкие/сложные\n→ Напиши: "Сделай вопросы сложнее / проще" — агент откалибрует уровень',
      'Агент не знает специфику моего экзамена\n→ Добавь программу: "Темы экзамена: [список из программы курса]" — агент будет спрашивать только по ним',
      'Хочу симуляцию реального экзамена\n→ Напиши: "Симуляция: 40 вопросов, 2 часа, без подсказок" — агент войдёт в режим экзамена',
      "Нужно повторять карточки каждый день\n→ Блок 3: настроим ежедневную тренировку по расписанию",
    ],
    completionTrackLabel: "Студент — Конспекты и Экзамен",
    prevLesson: "/dashboard/course/block/2/lesson/12",
    nextLesson: "",
  },

  // ─── LESSON 14 ─────────────────────────────────────────────
  {
    id: 14,
    title: "Агент мониторинга рынка",
    subtitle: "Ежедневный дайджест по рынкам — прямо в Telegram",
    timerText: "⏱ 45 минут",
    track: "investor",
    whyNeeded:
      "Рынки не спят. Пока ты спишь — что-то происходит. Открывать 10 сайтов каждое утро и читать всё подряд — не масштабируется.\n\nАгент мониторит твой портфель и интересные активы, собирает важное — ты читаешь дайджест за 5 минут.",
    caseTitle: "📦 Кейс: Частный инвестор Михаил (портфель крипто + акции)",
    caseItems: [
      "Ситуация: следил за 15 активами, тратил 1.5 часа утром на мониторинг",
      "До: пропускал важные новости, не успевал реагировать",
      "После: агент присылает дайджест с ценами и важными новостями каждое утро",
      "Время на мониторинг: снизилось с 90 до 10 минут",
      "Время настройки: 18 минут ✅",
    ],
    prompt: `You are my personal financial analyst and market analyst.

My portfolio (replace with your own assets):
Crypto: BTC, ETH, SOL
Stocks: [if any]
Assets to monitor: [other coins/stocks]

When I write "digest" or "market":
1. PRICES: current prices and 24-hour change for each portfolio asset
2. MARKET SENTIMENT: overall market mood (greed/fear, BTC dominance)
3. TOP NEWS: 3–5 news items from the last 24 hours affecting my portfolio
4. ON THE RADAR: events in the next 3 days (listings, unlocks, earnings, FED)
5. SIGNAL OF THE DAY: one asset from my portfolio worth a closer look — and why

Format: compact, facts only, numbers and percentages.
No forecasts without solid grounds. No "possibly" or "probably".`,
    steps: [
      "Шаг 1 — Заполни свои активы",
      "Шаг 2 — Отправь агенту",
      'Шаг 3 — Напиши "дайджест"',
      "Шаг 4 — Проверь: цены актуальные? новости релевантные?",
      'Шаг 5 — Уточни формат под себя: "добавь Fear & Greed Index" или "убери акции"',
      "Шаг 6 — В блоке 3 настроим автоматическую доставку в 8:00",
    ],
    checklist: [
      "□ Заполнил свои активы",
      "□ Получил первый дайджест",
      "□ Цены и новости актуальные",
      "□ Формат удобный для чтения",
      "✅ Агент мониторинга настроен",
    ],
    troubleshoot: [
      "Цены неточные или устаревшие\n→ Агент использует веб-поиск — данные могут отставать на 15 минут. Для real-time: добавь источники CoinGecko, TradingView",
      'Новости нерелевантные\n→ Уточни: "Меня интересуют только новости прямо влияющие на цену, не общие обзоры"',
      'Агент делает прогнозы которых не просил\n→ Добавь в промпт: "ЗАПРЕЩЕНО: прогнозы цен, инвестиционные рекомендации. Только факты."',
      "Хочу алерты при сильном движении цены\n→ Блок 3: настроим мониторинг каждый час и алерт при изменении >5%",
    ],
    prevLesson: "/dashboard/course/block/2",
    nextLesson: "/dashboard/course/block/2/lesson/15",
    nextLessonLabel: "Урок 15: Агент анализа проекта →",
  },

  // ─── LESSON 15 ─────────────────────────────────────────────
  {
    id: 15,
    title: "Агент анализа проекта",
    subtitle: "Due diligence любого проекта за 20 минут вместо 2 дней",
    timerText: "⏱ 55 минут",
    track: "investor",
    whyNeeded:
      'Тебе скинули whitepaper. Или друг советует акцию. Или нашёл новый крипто-проект. Нужно разобраться быстро — реальный это проект или нет.\n\nАгент делает структурированный анализ по заданным критериям. Ты видишь красные флаги до того как вложил деньги.',
    caseTitle: "📦 Кейс: Крипто-инвестор Павел",
    caseItems: [
      "Ситуация: поступало 5–10 питчей в неделю, не успевал анализировать",
      'До: тратил 4–6 часов на анализ одного проекта или вкладывал "на удачу"',
      "После: агент делает базовый анализ за 20 минут — Павел решает стоит ли углубляться",
      "Избежанных rug pull / скамов: 4 за 3 месяца",
      "Время настройки: 22 минуты ✅",
    ],
    prompt: `You are my analyst for due diligence of investment projects.

When I give a project for analysis (name, website, whitepaper, or description):

1. BASIC INFORMATION
   — What it is: product, team, stage
   — When created, where registered

2. TEAM
   — Are there public founders? Their background?
   — Is the team anonymous? (red flag)

3. PRODUCT AND TECHNOLOGY
   — What does the product actually do?
   — Is there a working product or just an idea?
   — Is there open-source code (GitHub)?

4. TOKENOMICS / FINANCIALS (for crypto)
   — Token distribution — how much does the team hold?
   — Vesting schedule — when are unlocks?
   — Market cap vs FDV

5. RED FLAGS 🚩
   — Anonymous team with no track record
   — Promises of unrealistic APY
   — No working product, only a roadmap
   — Tokenomics favoring the team (>30%)
   — No smart contract audit

6. VERDICT
   — Interesting / Neutral / Red flags
   — What to verify additionally before making a decision

IMPORTANT: this is a fact-based analysis, not investment advice. The final decision is mine alone.`,
    steps: [
      "Шаг 1 — Отправь промпт агенту",
      'Шаг 2 — Напиши: "Проанализируй проект: [название]. Сайт: [URL]. Описание: [если есть]"',
      "Шаг 3 — Получи структурированный анализ",
      "Шаг 4 — Обрати внимание на красные флаги — если есть → серьёзно задумайся",
      'Шаг 5 — Попроси: "Углубись в раздел токеномики" если интересует',
      'Шаг 6 — Сравни: "Сравни этот проект с [конкурент]"',
    ],
    checklist: [
      "□ Протестировал на известном проекте (Bitcoin, Ethereum)",
      "□ Проверил на явном скаме — агент нашёл красные флаги?",
      "□ Понял формат анализа",
      "□ Готов применять к реальным проектам",
      "✅ Агент анализа проектов настроен",
    ],
    troubleshoot: [
      "Агент не находит информацию о проекте\n→ Дай больше данных: ссылку на whitepaper, CoinMarketCap, GitHub",
      'Анализ слишком поверхностный\n→ Попроси: "Углубись в [раздел]. Найди отзывы и обсуждения на Reddit и Twitter"',
      'Агент делает инвестиционные рекомендации\n→ Добавь: "Твоя задача — только факты и красные флаги. Никаких \'купи\' или \'продай\'."',
      'Нужно анализировать акции, не крипто\n→ Убери раздел "Токеномика", замени на "Финансовые показатели: P/E, выручка, долг, FCF"',
    ],
    completionTrackLabel: "Инвестор — Рынок и Анализ",
    prevLesson: "/dashboard/course/block/2/lesson/14",
    nextLesson: "",
  },

  // ─── LESSON 16 ─────────────────────────────────────────────
  {
    id: 16,
    title: "Агент описаний товаров",
    subtitle: "Продающие описания для любой платформы за 5 минут",
    timerText: "⏱ 35 минут",
    track: "seller",
    whyNeeded:
      "Плохое описание = товар не находят и не покупают. Хорошее описание = товар в топе поиска и конвертирует.\n\nУ тебя 200 позиций. Написать описание для каждой — месяц работы. Агент делает это за минуты и оптимизирует под конкретную платформу.",
    caseTitle: "📦 Кейс: Продавец на Wildberries Ольга (категория детская одежда)",
    caseItems: [
      "Ситуация: 300 SKU, половина с плохими описаниями не в топе поиска",
      "До: переписывала описания вручную — 20 минут на позицию = 100 часов работы",
      "После: агент делает описание за 2 минуты, Ольга проверяет",
      "Рост органического трафика: +67% за месяц",
      "Время настройки: 14 минут ✅",
    ],
    prompt: `You are my e-commerce copywriter. You write product descriptions that sell.

My platforms: [replace with your own — Amazon, Shopify, own website, Instagram, eBay]
My audience: [replace with your own — who buys]

When I give product specs, create:

1. TITLE / NAME (for marketplace):
   — Include keywords people search for
   — Main advantage
   — Maximum 100 characters

2. DESCRIPTION (for product listing):
   — First line: main benefit for the buyer
   — 3–5 key features emphasizing the benefit (not just facts)
   — Who this product is for / in what situations
   — Address the main objection
   — Call to action

3. FEATURE LIST (bullet points):
   — 5–7 points in the format "Feature: value — what this gives the buyer"

4. SEO KEYWORDS: 10–15 search queries the product should rank for

Style: specific, no fluff, focus on buyer benefit rather than specs.`,
    steps: [
      "Шаг 1 — Укажи платформы и аудиторию",
      "Шаг 2 — Отправь агенту",
      'Шаг 3 — Дай характеристики первого товара: "Товар: [название]. Характеристики: [список]"',
      "Шаг 4 — Получи полный комплект: заголовок, описание, bullet points, ключи",
      "Шаг 5 — Проверь — звучит убедительно? попадает в боль покупателя?",
      "Шаг 6 — Масштабируй: давай по 5–10 товаров подряд",
    ],
    checklist: [
      "□ Указал платформы и аудиторию",
      "□ Получил описание первого товара",
      "□ Описание включает пользу, не только характеристики",
      "□ Есть SEO-ключи для поиска",
      "✅ Агент описаний товаров настроен",
    ],
    troubleshoot: [
      "Описания слишком общие\n→ Дай больше деталей о товаре и главных болях покупателей этой категории",
      'Не попадает в ключевые слова платформы\n→ Добавь: "Используй ключевые слова специфичные для Wildberries/Ozon — как реально ищут этот товар"',
      "Стиль не подходит под мой бренд\n→ Добавь примеры своих лучших описаний — агент скопирует тональность",
      'Нужно массово переписать 100+ товаров\n→ Давай по 10 за раз: "Опиши эти товары: 1.[...] 2.[...] 3.[...]" — агент сделает все разом',
    ],
    prevLesson: "/dashboard/course/block/2",
    nextLesson: "/dashboard/course/block/2/lesson/17",
    nextLessonLabel: "Урок 17: Агент мониторинга отзывов →",
  },

  // ─── LESSON 17 ─────────────────────────────────────────────
  {
    id: 17,
    title: "Агент мониторинга отзывов",
    subtitle: "Знай что говорят покупатели — и реагируй первым",
    timerText: "⏱ 45 минут",
    track: "seller",
    whyNeeded:
      "Один негативный отзыв без ответа = минус 30% доверия у новых покупателей. Позитивные отзывы без реакции = упущенная возможность лояльности.\n\nАгент собирает все отзывы, классифицирует и помогает отвечать — быстро и по делу. Ты видишь проблемы раньше чем они становятся катастрофой.",
    caseTitle: '📦 Кейс: Магазин товаров для дома "Уют" (Ozon + собственный сайт)',
    caseItems: [
      "Ситуация: 50+ отзывов в день, большинство оставались без ответа",
      "До: отвечал на 10% отзывов, несколько скандалов переросли в публичные жалобы",
      "После: агент классифицирует все отзывы и готовит ответы за 15 минут в день",
      "Рейтинг магазина: вырос с 4.1 до 4.7 за 2 месяца",
      "Время настройки: 19 минут ✅",
    ],
    prompt: `You are my customer review manager.

My store / product: [replace with your own]
Platforms: [replace with your own — Amazon, Google Maps, Yelp, Trustpilot, website]

When I give you a list of reviews:

1. CLASSIFICATION of each review:
   ⭐⭐⭐⭐⭐ Positive — happy, praising
   😐 Neutral — has both pros and cons
   😤 Negative — unhappy, complaining
   🚨 Critical — demands a refund, threatens a complaint

2. SUMMARY: 1 sentence about what the review is about (what they liked / didn't like)

3. RESPONSE: ready-made reply for each review
   — Positive: gratitude + personal detail + invitation to come back
   — Neutral: acknowledgment + what we're improving + thanks for honesty
   — Negative: empathy + problem resolution + contact for help
   — Critical: quick apology + specific action + direct contact

4. INSIGHTS: patterns from all reviews
   — What gets praised most often?
   — What gets complained about most often?
   — What needs to be fixed first?

Response tone: lively, human, not a corporate template.`,
    steps: [
      "Шаг 1 — Опиши магазин и платформы",
      "Шаг 2 — Отправь агенту",
      "Шаг 3 — Вставь 5–10 последних отзывов",
      "Шаг 4 — Получи классификацию и готовые ответы",
      "Шаг 5 — Проверь ответы — звучат человечно?",
      "Шаг 6 — Скопируй ответы на платформу",
    ],
    checklist: [
      "□ Описал магазин и платформы",
      "□ Протестировал на реальных отзывах",
      "□ Ответы на негатив — решают проблему, не оправдываются",
      "□ Получил инсайты по паттернам",
      "✅ Агент мониторинга отзывов работает",
    ],
    troubleshoot: [
      'Ответы звучат шаблонно\n→ Добавь: "Каждый ответ уникальный. Ссылайся на конкретику из отзыва."',
      'Агент слишком мягко реагирует на критику\n→ Добавь: "На критические отзывы — конкретное решение в первом же предложении. Не начинай с извинений."',
      'Отзывов слишком много\n→ Давай по 20 за раз и добавь: "Фокус на 🚨 Критических сначала, потом остальные"',
      "Нужно мониторить отзывы автоматически\n→ Блок 3: настроим ежедневный парсинг новых отзывов и уведомление",
    ],
    completionTrackLabel: "Продавец — Описания и Отзывы",
    prevLesson: "/dashboard/course/block/2/lesson/16",
    nextLesson: "",
  },

  // ─── LESSON 18 ─────────────────────────────────────────────
  {
    id: 18,
    title: "Агент code review",
    subtitle: "Находи баги и проблемы до того как их найдут в продакшне",
    timerText: "⏱ 45 минут",
    track: "developer",
    whyNeeded:
      "Ревью кода занимает время. Джуны делают одни и те же ошибки снова и снова.\nБаги уходят в продакшн потому что ревьюер устал или торопился.\n\nАгент делает первый слой ревью мгновенно. Ловит типовые проблемы,\nпредлагает улучшения, объясняет почему. Ты смотришь только на нетривиальные вещи.",
    caseTitle: "📦 Кейс: Тимлид Максим, команда 6 разработчиков",
    caseItems: [
      "Ситуация: тратил 2–3 часа в день на ревью PR",
      "До: баги в типовых вещах (null checks, error handling) проходили к нему",
      "После: агент ловит 70% типовых проблем, Максим смотрит только логику",
      "Экономия: 1.5 часа в день",
      "Время настройки: 18 минут ✅",
    ],
    prompt: `You are an experienced senior developer doing code review.

Language/stack (replace with your own): [Python / JavaScript / TypeScript / Go / etc.]

When I paste code for review:

1. OVERALL ASSESSMENT: one line — what it does and how well it's written

2. ISSUES (by priority):
   🔴 Critical — bugs, security issues, memory leaks
   🟡 Important — principle violations, poor readability, performance
   🟢 Nitpicks — style, naming, minor improvements

3. FOR EACH ISSUE:
   - Where exactly (line/function)
   - What the problem is
   - How to fix it (show the correct code variant)

4. POSITIVES: what's done well — 1–2 points

5. FINAL VERDICT: Approve / Request Changes / Needs Discussion

My code standards (replace with your own or leave blank):
- [e.g.: we use async/await, not callbacks]
- [e.g.: all functions must have JSDoc]
- [e.g.: maximum function length 50 lines]`,
    steps: [
      "Шаг 1 — Укажи стек и свои стандарты кода",
      "Шаг 2 — Вставь первый кусок кода для ревью",
      "Шаг 3 — Получи ревью с приоритизированными замечаниями",
      'Шаг 4 — Попроси: "покажи как переписать функцию X правильно"',
      "Шаг 5 — Добавь в промпт паттерны которые важны в твоём проекте",
    ],
    checklist: [
      "□ Указал стек и стандарты",
      "□ Прогнал первый реальный PR через агента",
      "□ Нашёл хотя бы 1 реальную проблему",
      "□ Попросил показать правильный вариант",
      "✅ Агент code review настроен",
    ],
    troubleshoot: [
      'Агент не знает наш фреймворк\n→ Добавь: "Стек: Next.js 14, TypeScript strict mode, Prisma ORM" — чем конкретнее тем лучше',
      'Слишком много мелких замечаний, не видно важного\n→ Добавь: "Показывай максимум 3 критичных и 3 важных. Нюансы — только если время позволяет"',
      'Агент предлагает код который не компилируется\n→ Добавь: "Любой предложенный код должен быть синтаксически корректным. Проверяй перед показом"',
      'Нужно ревью целого PR (много файлов)\n→ Давай по файлу: "Это файл 1 из 5 PR — auth/middleware.ts" — агент будет накапливать контекст',
    ],
    prevLesson: "/dashboard/course/block/2/lesson/2",
    nextLesson: "/dashboard/course/block/2/lesson/19",
    nextLessonLabel: "Урок 19: Агент документации →",
  },

  // ─── LESSON 19 ─────────────────────────────────────────────
  {
    id: 19,
    title: "Агент документации",
    subtitle: "README, комментарии и API docs — из кода за минуты",
    timerText: "⏱ 35 минут",
    track: "developer",
    whyNeeded:
      "Документацию никто не любит писать. Она всегда устаревшая.\nНовый разработчик приходит в проект и теряет неделю на понимание.\n\nАгент генерирует документацию прямо из кода. Актуально, структурировано, понятно.",
    caseTitle: '📦 Кейс: Open source проект "DataFlow" (Python библиотека)',
    caseItems: [
      "Ситуация: 0 документации, новые контрибьюторы не понимали как использовать",
      "До: каждый новый разработчик — час объяснений",
      "После: агент сгенерировал README и API docs за 40 минут из существующего кода",
      "Первые звёзды на GitHub: появились через 3 дня после публикации доков",
      "Время настройки: 14 минут ✅",
    ],
    prompt: `You are a technical writer and code documentor.

Language/stack: [replace with your own]

Modes of operation:

README (command "readme [project]"):
- Name and one line describing what it does
- Why it's needed (the problem it solves)
- Quick start: installation + first example in 5 minutes
- Main features (5–7 points)
- Usage examples (2–3 code snippets)
- Configuration and parameters
- How to contribute

CODE COMMENTS (I paste code):
- Docstring/JSDoc for each function and class
- Explanation of non-obvious logic
- TODO/FIXME if there are problematic areas

API DOCS (command "api docs [code]"):
- For each public method: description, parameters, return value, example
- Types and interfaces with field descriptions
- Request/response examples for REST API

CHANGELOG (command "changelog [list of changes]"):
- Keep a Changelog format
- Grouping: Added / Changed / Fixed / Removed`,
    steps: [
      "Шаг 1 — Укажи стек",
      'Шаг 2 — Вставь код проекта и напиши "readme"',
      "Шаг 3 — Проверь — README понятен человеку не знакомому с проектом?",
      "Шаг 4 — Вставь функцию и попроси добавить docstrings",
      "Шаг 5 — Используй для всех новых модулей",
    ],
    checklist: [
      "□ Указал стек",
      "□ Сгенерировал README для реального проекта",
      "□ Добавил docstrings к 3+ функциям",
      "□ README читается без знания кода",
      "✅ Агент документации настроен",
    ],
    troubleshoot: [
      'README слишком технический, непонятный\n→ Добавь: "Пиши для разработчика который впервые видит этот проект. Никаких предположений о знаниях"',
      "Docstrings неточные\n→ Давай больше контекста: не только функцию, но и как она используется в проекте",
      'Нужна документация на английском\n→ Добавь: "Вся документация на английском, технические термины не переводить"',
    ],
    completionTrackLabel: "Разработчик — Code Review и Документация",
    prevLesson: "/dashboard/course/block/2/lesson/18",
    nextLesson: "",
  },

  // ─── LESSON 20 ─────────────────────────────────────────────
  {
    id: 20,
    title: "Агент аналитики кампаний",
    subtitle: "Превращай цифры в решения — за 10 минут",
    timerText: "⏱ 45 минут",
    track: "marketer",
    whyNeeded:
      "Данные есть. Понимания что с ними делать — нет.\nCTR вырос на 3% — это хорошо или плохо? Почему ROAS упал в пятницу?\n\nАгент-аналитик берёт твои цифры и отвечает на главный вопрос:\nчто происходит и что делать дальше.",
    caseTitle: "📦 Кейс: Performance-маркетолог Анна, e-commerce",
    caseItems: [
      "Ситуация: 12 кампаний в Meta + Google, ежедневный отчёт занимал 2 часа",
      "До: данные были, инсайтов не было — просто таблицы",
      "После: агент анализирует данные и выдаёт 3 главных инсайта + рекомендации",
      "Экономия на отчётности: 8 часов в неделю",
      "Рост ROAS: +22% за месяц (более точные решения по бюджету)",
      "Время настройки: 17 минут ✅",
    ],
    prompt: `You are a senior marketing analyst with expertise in performance marketing.

My business/product: [replace with your own]
Main KPIs: [replace with your own — ROAS, CPA, CTR, CAC, LTV, etc.]
Channels: [replace with your own — Meta Ads, Google Ads, TG Ads, email, SEO]

When I paste campaign data:

1. PERIOD SUMMARY: what happened — 3 sentences
2. TOP-3 INSIGHTS: most important findings (with numbers)
3. ANOMALIES: what stands out from the norm — up or down
4. CAUSES: hypotheses for why this is happening
5. ACTIONS: 3 specific steps to take right now
6. NEXT WEEK: what to watch closely

Data format — I will paste in this form:
[Campaign] | [Impressions] | [Clicks] | [CTR] | [Spend] | [Conversions] | [ROAS]

Important: give specific recommendations with numbers, not general advice.`,
    steps: [
      "Шаг 1 — Укажи бизнес, KPI и каналы",
      "Шаг 2 — Вставь данные прошлой недели в таблицу",
      "Шаг 3 — Получи анализ с инсайтами",
      'Шаг 4 — Проверь: рекомендации конкретные? не "оптимизируй", а "увеличь бюджет кампании X на 30%"',
      "Шаг 5 — Попроси сравнить с предыдущим периодом",
    ],
    checklist: [
      "□ Указал KPI и каналы",
      "□ Вставил реальные данные кампании",
      "□ Получил конкретные инсайты с цифрами",
      "□ Рекомендации применимы прямо сейчас",
      "✅ Агент аналитики настроен",
    ],
    troubleshoot: [
      'Рекомендации слишком общие\n→ Добавь: "Каждая рекомендация должна содержать конкретное число, процент или дату"',
      'Агент не понимает мои данные\n→ Опиши формат первый раз: "Это данные Meta Ads. Колонки: Campaign | Spend | Reach | CTR | Conversions | CPA"',
      "Нужен автоматический еженедельный отчёт\n→ Блок 3: cron каждый понедельник — агент сам запрашивает данные и присылает отчёт",
    ],
    prevLesson: "/dashboard/course/block/2/lesson/2",
    nextLesson: "/dashboard/course/block/2/lesson/21",
    nextLessonLabel: "Урок 21: Агент A/B тестов →",
  },

  // ─── LESSON 21 ─────────────────────────────────────────────
  {
    id: 21,
    title: "Агент A/B тестов",
    subtitle: "Формулируй правильные гипотезы и читай результаты точно",
    timerText: "⏱ 35 минут",
    track: "marketer",
    whyNeeded:
      'Большинство A/B тестов провалены ещё до запуска — неправильная гипотеза, мало трафика, неверная метрика.\nА результаты интерпретируются по принципу "нам кажется что вариант B лучше".\n\nАгент помогает правильно сформулировать тест, рассчитать нужный объём выборки\nи честно интерпретировать результат — без wishful thinking.',
    caseTitle: '📦 Кейс: Growth-менеджер Кирилл, SaaS продукт',
    caseItems: [
      'Ситуация: запускал тесты интуитивно, половина давала "неопределённые" результаты',
      "До: 6 из 10 тестов — мусорные данные",
      "После: агент помог структурировать: чёткая гипотеза, нужная выборка, правильная метрика",
      "Конверсия трипваера: +34% за квартал на основе валидных тестов",
      "Время настройки: 13 минут ✅",
    ],
    prompt: `You are an expert in A/B testing and experimentation.

My product/website: [replace with your own]
Main conversion goal: [replace with your own — registration, purchase, subscription]

Modes of operation:

CREATE TEST (command "create test"):
When I describe an idea, formulate:
- Hypothesis: "If we [change], then [metric] will increase by X% because [reason]"
- What we're testing (control vs variant)
- Primary metric (one main)
- Secondary metrics (3-5 additional)
- Required sample size (calculation: current CR, desired effect, 95% significance level)
- Minimum test duration

ANALYZE RESULTS (I paste data):
- Statistically significant? (p-value)
- Practically significant? (effect size)
- Verdict: Launch variant / Keep control / Need more data
- What the test reveals about user behavior
- Next test worth running

IMPORTANT: never say "launch the variant" if there's insufficient data.`,
    steps: [
      "Шаг 1 — Укажи продукт и главную цель",
      'Шаг 2 — Опиши идею теста: "хочу протестировать другой CTA на главной"',
      "Шаг 3 — Получи правильно сформулированную гипотезу и расчёт выборки",
      "Шаг 4 — Запусти тест, собери данные",
      "Шаг 5 — Вставь результаты — получи честную интерпретацию",
    ],
    checklist: [
      "□ Указал продукт и цель конверсии",
      "□ Сформулировал первую гипотезу с агентом",
      "□ Получил расчёт нужной выборки",
      "□ Понял как интерпретировать результаты",
      "✅ Агент A/B тестов настроен",
    ],
    troubleshoot: [
      'Выборка получается огромная — тест нереально провести\n→ Это честный результат: маленький эффект требует большой выборки. Спроси: "что если нам важно только изменение >15%?"',
      "Агент говорит \"нужно больше данных\" хотя тест уже 4 недели\n→ Добавь контекст: текущий объём трафика в день. Агент пересчитает реалистичные ожидания.",
      'Нужно тестировать email subject lines\n→ Укажи специфику: "тестируем email, метрика — open rate, список 5000 подписчиков"',
    ],
    completionTrackLabel: "Маркетолог — Аналитика и A/B тесты",
    prevLesson: "/dashboard/course/block/2/lesson/20",
    nextLesson: "",
  },

  // ─── LESSON 22 ─────────────────────────────────────────────
  {
    id: 22,
    title: "Агент скрининга резюме",
    subtitle: "Найди лучших кандидатов в стопке из 200 резюме за 20 минут",
    timerText: "⏱ 45 минут",
    track: "hr",
    whyNeeded:
      "200 откликов на вакансию. 4 часа на просмотр. В итоге берёшь того кто написал последним.\n\nАгент читает резюме по твоим критериям, ставит оценку, объясняет почему.\nТы смотришь только топ-10.",
    caseTitle: "📦 Кейс: HR-менеджер Светлана, IT компания",
    caseItems: [
      "Ситуация: открытая вакансия Python-разработчика — 180 откликов за 3 дня",
      "До: 5 часов скрининга, отобрала 12 кандидатов интуитивно",
      "После: агент обработал 180 резюме за 25 минут, выдал топ-15 с объяснениями",
      "Качество найма: первый нанятый через агента прошёл испытательный срок (раньше 40% не проходили)",
      "Время настройки: 19 минут ✅",
    ],
    prompt: `You are an experienced HR screener. You evaluate candidates strictly by criteria.

Position: [replace with your own — job title]
Must-have requirements:
- [criterion 1]
- [criterion 2]
- [criterion 3]

Nice-to-have requirements:
- [criterion 1]
- [criterion 2]

Red flags — immediate rejection:
- [e.g.: no experience in our niche]
- [e.g.: frequent job changes — less than 6 months per position]

When I paste resumes (one or several):

For each candidate:
1. Full name and current position
2. RATING: A (top, invite for interview) / B (interesting, worth a look) / C (not a fit)
3. MUST-HAVE match: ✅ / ❌ for each item
4. STRENGTHS: 2-3 points
5. INTERVIEW QUESTIONS: 2-3 questions specific to this candidate
6. RATING REASON: 1-2 sentences explaining the rating

At the end: summary table of all candidates with ratings.`,
    steps: [
      "Шаг 1 — Заполни вакансию с реальными требованиями",
      "Шаг 2 — Вставь 3-5 тестовых резюме (реальных или придуманных)",
      "Шаг 3 — Проверь: оценки совпадают с твоей интуицией?",
      "Шаг 4 — Скорректируй критерии если нужно",
      "Шаг 5 — Запусти на реальном потоке откликов",
    ],
    checklist: [
      "□ Заполнил требования вакансии",
      "□ Указал красные флаги",
      "□ Протестировал на 3+ резюме",
      "□ Оценки соответствуют твоим ожиданиям",
      "✅ Агент скрининга настроен",
    ],
    troubleshoot: [
      'Агент слишком мягко оценивает — все получают B\n→ Добавь: "Оценку A должны получать максимум 10-15% кандидатов. Будь строгим."',
      'Агент не понимает технические требования\n→ Расшифруй: не "опыт с облаками" а "AWS: EC2, S3, Lambda — минимум 2 года"',
      'Резюме на разных языках\n→ Добавь: "Резюме могут быть на русском или английском — оценивай одинаково"',
      "Нужно скринить в потоке каждый день\n→ Блок 3: настроим автоматический скрининг новых откликов",
    ],
    prevLesson: "/dashboard/course/block/2/lesson/2",
    nextLesson: "/dashboard/course/block/2/lesson/23",
    nextLessonLabel: "Урок 23: Агент вакансий →",
  },

  // ─── LESSON 23 ─────────────────────────────────────────────
  {
    id: 23,
    title: "Агент вакансий",
    subtitle: "Пиши job descriptions которые привлекают нужных людей",
    timerText: "⏱ 35 минут",
    track: "hr",
    whyNeeded:
      "Плохая вакансия — это 200 нерелевантных откликов и 0 подходящих.\nХорошая вакансия — это 30 откликов и 10 идеальных кандидатов.\n\nАгент пишет вакансии которые честно описывают работу и\nпривлекают именно тех кто нужен — не всех подряд.",
    caseTitle: '📦 Кейс: Стартап "Flowbase", поиск Product Manager',
    caseItems: [
      "Ситуация: написали вакансию сами — 3 недели, 0 подходящих откликов",
      "До: скучный список требований, никакой личности компании",
      "После: агент написал вакансию за 15 минут — с культурой, болями, реальными задачами",
      "Результат: 8 сильных откликов за первую неделю, наняли через 3 недели",
      "Время настройки: 13 минут ✅",
    ],
    prompt: `You are an expert in employer branding and writing job postings.

About the company (replace with your own):
- What we do: [1-2 sentences]
- Culture: [what it's like to work here]
- Stage: [startup/growth/enterprise]

When I describe a position, write:

1. TITLE: specific and honest (not "Ninja Developer" — but "Backend Python Developer, Remote, Fintech")

2. ABOUT THE ROLE (3-4 sentences):
   - Why this role exists
   - What problem this person solves
   - Who they work with

3. WHAT YOU'LL ACTUALLY DO (first 90 days):
   - Week 1-2: onboarding, specifics
   - Month 1: first tasks
   - Quarter 1: first results

4. REQUIREMENTS: separate must-have and nice-to-have (honestly — not a wishlist)

5. WHAT WE OFFER:
   - Salary (range — no "competitive")
   - Working conditions
   - Growth and development

6. WHY YOU SHOULDN'T APPLY (red flags for the candidate):
   - Honest about the challenges of the role
   - 1-2 points — this filters out the wrong fit

Tone: honest, human, no corporate BS.`,
    steps: [
      "Шаг 1 — Опиши компанию и культуру",
      "Шаг 2 — Опиши вакансию: роль, задачи, требования, условия",
      "Шаг 3 — Получи готовую вакансию",
      "Шаг 4 — Проверь — это честное описание? не wishlist?",
      "Шаг 5 — Опубликуй на HH, LinkedIn, Telegram",
    ],
    checklist: [
      "□ Описал компанию и культуру честно",
      "□ Получил вакансию с реальными задачами на 90 дней",
      '□ Есть диапазон зарплаты (не "обсуждается")',
      '□ Есть секция "почему не стоит откликаться"',
      "✅ Агент вакансий настроен",
    ],
    troubleshoot: [
      "Вакансия звучит как все остальные\n→ Добавь конкретику: реальный проект с которым будет работать человек, реальная проблема которую решает роль",
      'Слишком длинная вакансия\n→ Добавь: "Максимум 600 слов. Кандидаты не читают длинные вакансии."',
      'Нужна вакансия на английском\n→ Добавь: "Напиши на английском — международный поиск"',
    ],
    completionTrackLabel: "HR — Скрининг и Вакансии",
    prevLesson: "/dashboard/course/block/2/lesson/22",
    nextLesson: "",
  },

  // ─── LESSON 24 ─────────────────────────────────────────────
  {
    id: 24,
    title: "Агент планировщика дня",
    subtitle: "Начинай каждый день с ясностью — что важно и с чего начать",
    timerText: "⏱ 35 минут",
    track: "life",
    whyNeeded:
      "Открываешь телефон утром — 20 уведомлений, куча задач, непонятно с чего начать.\nК вечеру чувствуешь что был занят весь день, но ничего важного не сделал.\n\nАгент-планировщик даёт ясность: вот 3 главных задачи на сегодня.\nВот что перенести. Вот что выбросить.",
    caseTitle: "📦 Кейс: Предприниматель Роман (параллельно 3 проекта)",
    caseItems: [
      "Ситуация: постоянно перегружен, прыгал между задачами",
      'До: заканчивал день с ощущением "опять ничего не успел"',
      "После: 5 минут с агентом утром → ясный план дня → вечером 3/3 главных задачи сделаны",
      "Субъективное ощущение продуктивности: выросло в 2 раза",
      "Время настройки: 11 минут ✅",
    ],
    prompt: `You are my personal planner and productivity coach.

My main projects/roles: [replace with your own — e.g.: work, sports, family, studies]

Every morning when I write "planning my day" or send a task list:

1. TOP 3 TASKS: most important for today (principle: if you only do these — the day is well spent)

2. BLOCK SCHEDULE:
   - Morning (before 12): [task — type of work]
   - Afternoon (12-17): [task — type of work]
   - Evening (17+): [task or rest]

3. MOVE TO TOMORROW: what definitely won't fit and that's okay

4. DROP: tasks that aren't worth the time

5. QUESTION OF THE DAY: one question to help you focus

When I write "day summary" in the evening:
- What was done?
- What got in the way?
- One insight for tomorrow`,
    steps: [
      "Шаг 1 — Укажи свои основные роли и проекты",
      'Шаг 2 — Напиши список задач на завтра или "планирую день"',
      "Шаг 3 — Получи план: 3 главных + расписание",
      'Шаг 4 — Попробуй вечером написать "итог дня"',
      "Шаг 5 — Используй каждое утро — войдёт в привычку за 5 дней",
    ],
    checklist: [
      "□ Указал роли и проекты",
      "□ Получил первый план дня",
      "□ 3 главных задачи реалистичны на один день",
      "□ Написал итог вечером",
      "✅ Агент планировщика настроен",
    ],
    troubleshoot: [
      'Агент планирует слишком много\n→ Добавь: "ПРАВИЛО: в главные 3 задачи попадает только то что продвигает мои цели. Срочное ≠ важное"',
      'Агент не знает мои приоритеты\n→ Добавь иерархию: "Приоритет 1: работа/проект X. Приоритет 2: здоровье. Приоритет 3: остальное"',
      'Хочу автоматический план каждое утро\n→ Блок 3: cron в 7:00 — агент сам присылает вопрос "что планируешь сегодня?"',
    ],
    prevLesson: "/dashboard/course/block/2/lesson/2",
    nextLesson: "/dashboard/course/block/2/lesson/25",
    nextLessonLabel: "Урок 25: Агент личных финансов →",
  },

  // ─── LESSON 25 ─────────────────────────────────────────────
  {
    id: 25,
    title: "Агент личных финансов",
    subtitle: "Знай куда уходят деньги и куда они должны идти",
    timerText: "⏱ 45 минут",
    track: "life",
    whyNeeded:
      '"Непонятно куда деньги деваются" — самая частая финансовая проблема.\nБанковское приложение показывает транзакции. Смысла в них нет.\n\nАгент анализирует расходы, находит паттерны и даёт конкретный план.\nНе "трать меньше" — а "вот 3 конкретные категории где ты сливаешь деньги".',
    caseTitle: "📦 Кейс: Дизайнер Катя, Москва",
    caseItems: [
      'Ситуация: зарабатывала хорошо, но к концу месяца всегда "как-то кончилось"',
      "До: не понимала на что уходит 30-40% дохода",
      "После: агент нашёл 3 категории утечки — подписки, еда навынос, импульсивные покупки",
      "Сэкономила в первый месяц: 18 000 руб без изменения качества жизни",
      "Время настройки: 16 минут ✅",
    ],
    prompt: `You are my personal financial advisor. You help manage personal finances.

My situation (replace with your own):
- Monthly income (approximately): [amount]
- Fixed expenses: [rent, loans, etc.]
- Financial goal: [replace with your own — emergency fund, trip, purchase]

When I paste a list of expenses for the month:

1. BREAKDOWN BY CATEGORY: housing, food, transport, entertainment, subscriptions, health, clothing, other

2. ANALYSIS:
   - Percentage of income per category
   - Comparison with recommended (50/30/20 rule)
   - Top-3 categories where you can cut back

3. LEAKS: specific expenses worth reconsidering (with amounts)

4. PLAN FOR NEXT MONTH:
   - Budget by category
   - How much to save and where
   - One specific action for this week

IMPORTANT: don't moralize or judge spending. Facts and options only.`,
    steps: [
      "Шаг 1 — Укажи доход, обязательные расходы, цель",
      "Шаг 2 — Выгрузи расходы за прошлый месяц из банка (копируй список или суммы по категориям)",
      "Шаг 3 — Получи разбивку и анализ",
      'Шаг 4 — Обрати внимание на "утечки" — одну попробуй сократить на этой неделе',
      "Шаг 5 — Повторяй в конце каждого месяца",
    ],
    checklist: [
      "□ Указал доход и цель",
      "□ Вставил реальные расходы за месяц",
      "□ Нашёл топ-3 категории утечки",
      "□ Получил бюджет на следующий месяц",
      "✅ Агент личных финансов настроен",
    ],
    troubleshoot: [
      "Не хочу вводить точные суммы\n→ Используй приблизительные цифры или просто категории без сумм — агент всё равно найдёт паттерны",
      'Агент даёт стандартные советы типа "не пей кофе"\n→ Добавь: "Давай только конкретные рекомендации основанные на моих реальных данных. Без общих советов."',
      'Нужен учёт в иностранной валюте\n→ Просто укажи валюту: "Все суммы в EUR" — агент адаптируется',
    ],
    prevLesson: "/dashboard/course/block/2/lesson/24",
    nextLesson: "/dashboard/course/block/2/lesson/26",
    nextLessonLabel: "Урок 26: Агент путешественника →",
  },

  // ─── LESSON 26 ─────────────────────────────────────────────
  {
    id: 26,
    title: "Агент путешественника",
    subtitle: "Планируй идеальную поездку без часов в Google",
    timerText: "⏱ 35 минут",
    track: "life",
    whyNeeded:
      "Планирование поездки на 10 дней — это 6-8 часов в браузере.\nВкладки, форумы, блоги, Booking, Airbnb — голова кругом.\n\nАгент-путешественник собирает маршрут, список вещей, советы по локации\nи логистику — за 20 минут. Ты наслаждаешься поездкой, а не планированием.",
    caseTitle: "📦 Кейс: Семья Петровых, первая поездка в Японию (14 дней)",
    caseItems: [
      "Ситуация: никогда не были в Азии, не знали с чего начать",
      "До: 3 вечера в браузере — голова кругом, ничего не решено",
      "После: агент составил маршрут по дням, список вещей, транспортные советы за 25 минут",
      "Поездка: прошла без сюрпризов, использовали 90% рекомендаций агента",
      "Время настройки: 12 минут ✅",
    ],
    prompt: `You are my personal travel consultant with deep knowledge of destinations worldwide.

When I describe a trip, create:

1. DAY-BY-DAY ITINERARY:
   - Day N: city/location — what to do in the morning, afternoon, evening
   - Logistics between stops (transport, travel time)
   - Where to stay (type — hotel/hostel/apartment, area)

2. PRACTICAL INFO:
   - How to get there (airport → city → between cities)
   - Local transport (map, apps, taxis)
   - Money (need cash? which card works?)
   - Connectivity (local SIM, eSIM, roaming)

3. PACKING LIST: adapted to the climate and activities of the trip

4. MUST DO / MUST EAT: top-5 activities and top-5 dishes you can't miss

5. COMMON MISTAKES: what tourists do wrong and how to avoid them

6. BUDGET: approximate per person per day (budget / mid-range / comfort)

My preferences: [replace with your own — e.g.: love nature, dislike crowds, active lifestyle]`,
    steps: [
      "Шаг 1 — Укажи свои предпочтения в путешествиях",
      'Шаг 2 — Напиши: "Планирую поездку: [место], [даты], [кол-во человек], [бюджет]"',
      "Шаг 3 — Получи маршрут по дням + практику + список вещей",
      'Шаг 4 — Уточни детали: "Углубись по дню 3 в Токио — что конкретно посмотреть?"',
      "Шаг 5 — Сохрани план — агент сделает его в удобном формате",
    ],
    checklist: [
      "□ Указал предпочтения",
      "□ Получил маршрут по дням",
      "□ Проверил логистику — всё реалистично по времени?",
      "□ Получил список вещей под свой климат",
      "✅ Агент путешественника настроен",
    ],
    troubleshoot: [
      'Маршрут нереалистичный — слишком много за один день\n→ Добавь: "Мы не спеша путешествуем. Максимум 2 крупные достопримечательности в день."',
      'Советы устаревшие\n→ Добавь: "Уточни актуальность: визовый режим, работа транспорта, цены — на [текущий год]"',
      'Нужен маршрут с детьми\n→ Добавь: "Едем с детьми [возраст]. Учитывай: детское меню, безопасность, темп"',
      'Хочу бюджетную поездку\n→ Добавь: "Фокус на бюджет: хостелы, местная еда, бесплатные активности. Бюджет X в день"',
    ],
    completionTrackLabel: "Для жизни — Планирование, Финансы, Путешествия",
    prevLesson: "/dashboard/course/block/2/lesson/25",
    nextLesson: "",
  },
];

export function getLessonById(id: number): LessonData | undefined {
  return lessons.find((l) => l.id === id);
}