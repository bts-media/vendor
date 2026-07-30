import { ITranslateData } from '~types/index';

/**
 * Kalitlar snake_case, feature prefiksi bilan. Kalit topilmasa t() kalitning o'zini qaytaradi —
 * UI hech qachon bo'sh qolmaydi.
 *
 * Atamalar PRODUCT-SPEC §1 lug'atiga qat'iy bo'ysunadi:
 * impression → ko'rsatish · verified impression → tasdiqlangan ko'rsatish · creative → kreativ ·
 * pace → sur'at · scan rate → skanerlash darajasi · invoice → hisob-faktura · VAT → QQS.
 */
export const translateData: ITranslateData = {
    // ===== Umumiy =====
    app_name: { uz: 'BTS Media', ru: 'BTS Media', en: 'BTS Media' },
    portal_name: { uz: 'Reklama beruvchi', ru: 'Рекламодатель', en: 'Advertiser' },
    save: { uz: 'Saqlash', ru: 'Сохранить', en: 'Save' },
    add: { uz: "Qo'shish", ru: 'Добавить', en: 'Add' },
    edit: { uz: 'Tahrirlash', ru: 'Редактировать', en: 'Edit' },
    delete: { uz: "O'chirish", ru: 'Удалить', en: 'Delete' },
    cancel: { uz: 'Bekor qilish', ru: 'Отмена', en: 'Cancel' },
    back: { uz: 'Orqaga', ru: 'Назад', en: 'Back' },
    next: { uz: 'Keyingi', ru: 'Далее', en: 'Next' },
    view: { uz: "Ko'rish", ru: 'Просмотр', en: 'View' },
    view_all: { uz: "Hammasini ko'rish", ru: 'Посмотреть все', en: 'View all' },
    search: { uz: 'Qidirish', ru: 'Поиск', en: 'Search' },
    refresh: { uz: 'Yangilash', ru: 'Обновить', en: 'Refresh' },
    required: { uz: 'Majburiy maydon', ru: 'Обязательное поле', en: 'Required field' },
    error: { uz: 'Xatolik yuz berdi', ru: 'Произошла ошибка', en: 'Something went wrong' },
    no_data: { uz: "Ma'lumot yo'q", ru: 'Нет данных', en: 'No data' },
    loading: { uz: 'Yuklanmoqda...', ru: 'Загрузка...', en: 'Loading...' },
    actions: { uz: 'Amallar', ru: 'Действия', en: 'Actions' },
    name: { uz: 'Nomi', ru: 'Название', en: 'Name' },
    description: { uz: 'Tavsifi', ru: 'Описание', en: 'Description' },
    status: { uz: 'Holati', ru: 'Статус', en: 'Status' },
    all: { uz: 'Barchasi', ru: 'Все', en: 'All' },
    total: { uz: 'Jami', ru: 'Итого', en: 'Total' },
    period: { uz: 'Davr', ru: 'Период', en: 'Period' },
    created_at: { uz: 'Yaratilgan', ru: 'Создан', en: 'Created' },
    updated_at: { uz: 'Yangilangan', ru: 'Обновлён', en: 'Updated' },
    date: { uz: 'Sana', ru: 'Дата', en: 'Date' },
    soon: { uz: 'Tez kunda', ru: 'Скоро', en: 'Soon' },
    download: { uz: 'Yuklab olish', ru: 'Скачать', en: 'Download' },
    days_short: { uz: 'kun', ru: 'дн.', en: 'days' },
    per_month: { uz: 'oy', ru: 'мес.', en: 'mo' },
    currency: { uz: "so'm", ru: 'сум', en: 'UZS' },

    // ===== Navigatsiya =====
    dashboard: { uz: 'Boshqaruv paneli', ru: 'Панель управления', en: 'Dashboard' },
    campaign_new: { uz: 'Yangi kampaniya', ru: 'Новая кампания', en: 'New campaign' },
    campaigns_mine: { uz: 'Mening kampaniyalarim', ru: 'Мои кампании', en: 'My campaigns' },
    creatives: { uz: 'Kreativlar', ru: 'Креативы', en: 'Creatives' },
    analytics: { uz: 'Tahlillar', ru: 'Аналитика', en: 'Analytics' },
    finance: { uz: "Balans va to'lovlar", ru: 'Баланс и платежи', en: 'Balance & payments' },
    campaigns: { uz: 'Kampaniyalar', ru: 'Кампании', en: 'Campaigns' },
    settings: { uz: 'Sozlamalar', ru: 'Настройки', en: 'Settings' },
    profile: { uz: 'Profil', ru: 'Профиль', en: 'Profile' },
    logout: { uz: 'Chiqish', ru: 'Выйти', en: 'Log out' },
    theme_light: { uz: "Yorug' rejim", ru: 'Светлая тема', en: 'Light mode' },
    theme_dark: { uz: "Qorong'i rejim", ru: 'Тёмная тема', en: 'Dark mode' },
    language: { uz: 'Til', ru: 'Язык', en: 'Language' },
    collapse_sidebar: { uz: 'Menyuni yig\'ish', ru: 'Свернуть меню', en: 'Collapse sidebar' },

    // ===== Domen atamalari =====
    impressions: { uz: "Ko'rsatishlar", ru: 'Показы', en: 'Impressions' },
    verified_impressions: {
        uz: 'tasdiqlangan ko\'rsatish',
        ru: 'подтверждённых показов',
        en: 'verified impressions',
    },
    kpi_verified_impressions: {
        uz: "Tasdiqlangan ko'rsatishlar",
        ru: 'Подтверждённые показы',
        en: 'Verified impressions',
    },
    impression_goal: { uz: "Ko'rsatishlar maqsadi", ru: 'Цель по показам', en: 'Impression goal' },
    goal: { uz: 'Maqsad', ru: 'Цель', en: 'Goal' },
    delivered: { uz: 'Yetkazilgan', ru: 'Доставлено', en: 'Delivered' },
    scans: { uz: 'Skanerlash', ru: 'Сканирования', en: 'Scans' },
    scan_rate: { uz: 'Skanerlash darajasi', ru: 'Доля сканирований', en: 'Scan rate' },
    pace: { uz: "Sur'at", ru: 'Темп', en: 'Pace' },
    pace_on_track: { uz: 'reja bo\'yicha', ru: 'по плану', en: 'on track' },
    pace_behind: { uz: 'rejadan orqada', ru: 'отстаёт от плана', en: 'behind plan' },
    channel: { uz: 'Kanal', ru: 'Канал', en: 'Channel' },
    channels: { uz: 'Kanallar', ru: 'Каналы', en: 'Channels' },
    region: { uz: 'Hudud', ru: 'Регион', en: 'Region' },
    regions: { uz: 'Hududlar', ru: 'Регионы', en: 'Regions' },
    target_regions: { uz: 'Maqsadli hududlar', ru: 'Целевые регионы', en: 'Target regions' },
    cpm: { uz: 'CPM', ru: 'CPM', en: 'CPM' },
    cpm_hint: {
        uz: '1000 ko\'rsatish narxi',
        ru: 'цена за 1000 показов',
        en: 'cost per 1000 impressions',
    },
    creative: { uz: 'Kreativ', ru: 'Креатив', en: 'Creative' },
    campaign: { uz: 'Kampaniya', ru: 'Кампания', en: 'Campaign' },
    campaign_name: { uz: 'Kampaniya nomi', ru: 'Название кампании', en: 'Campaign name' },
    duration: { uz: 'Davomiyligi', ru: 'Длительность', en: 'Duration' },
    audience: { uz: 'Auditoriya (footfall)', ru: 'Аудитория (footfall)', en: 'Audience (footfall)' },

    // ===== Statuslar =====
    status_active: { uz: 'Faol', ru: 'Активна', en: 'Active' },
    status_completed: { uz: 'Tugagan', ru: 'Завершена', en: 'Completed' },
    status_draft: { uz: 'Qoralama', ru: 'Черновик', en: 'Draft' },
    status_moderation: { uz: 'Moderatsiyada', ru: 'На модерации', en: 'In moderation' },
    status_paused: { uz: 'Pauzada', ru: 'На паузе', en: 'Paused' },
    status_rejected: { uz: 'Rad etilgan', ru: 'Отклонён', en: 'Rejected' },
    status_approved: { uz: 'Tasdiqlangan', ru: 'Одобрен', en: 'Approved' },
    status_pending: { uz: 'Kutilmoqda', ru: 'Ожидает', en: 'Pending' },
    status_new: { uz: 'Yangi', ru: 'Новый', en: 'New' },
    status_paid: { uz: "To'langan", ru: 'Оплачен', en: 'Paid' },
    status_partial: { uz: 'Qisman', ru: 'Частично', en: 'Partial' },
    status_overdue: { uz: "Muddati o'tgan", ru: 'Просрочен', en: 'Overdue' },
    status_succeeded: { uz: 'Yakunlangan', ru: 'Завершён', en: 'Completed' },
    status_processing: { uz: 'Kutilmoqda', ru: 'В обработке', en: 'Processing' },
    status_failed: { uz: 'Muvaffaqiyatsiz', ru: 'Не удался', en: 'Failed' },

    // ===== Kanallar =====
    channel_parcel: { uz: 'Posilkalar', ru: 'Посылки', en: 'Parcels' },
    channel_parcel_full: {
        uz: 'Posilka reklamalari',
        ru: 'Реклама на посылках',
        en: 'Parcel ads',
    },
    channel_parcel_desc: {
        uz: "Posilkalardagi chop etilgan QR, qabul qiluvchilarga beriladi",
        ru: 'Печатный QR на посылке, который получает адресат',
        en: 'Printed QR on parcels, handed to recipients',
    },
    channel_screen: { uz: 'Ekranlar', ru: 'Экраны', en: 'Screens' },
    channel_screen_full: {
        uz: 'Filial ekranlari',
        ru: 'Экраны в филиалах',
        en: 'Branch screens',
    },
    channel_screen_desc: {
        uz: 'Olib ketish vaqtida punktlardagi televizorlar',
        ru: 'Телевизоры в пунктах выдачи во время получения',
        en: 'TVs at pickup points during collection',
    },
    channel_sms: { uz: 'SMS kuzatuv', ru: 'SMS-догон', en: 'SMS follow-up' },
    channel_sms_desc: {
        uz: 'Skanerlagan mijozlarga eslatma yuborish',
        ru: 'Напоминание клиентам, отсканировавшим QR',
        en: 'Reminders to customers who scanned',
    },
    channel_both: { uz: 'Ikkalasi', ru: 'Оба', en: 'Both' },

    // ===== Auth =====
    login: { uz: 'Kirish', ru: 'Войти', en: 'Sign in' },
    login_title: {
        uz: 'Reklama beruvchi kabinetiga kirish',
        ru: 'Вход в кабинет рекламодателя',
        en: 'Sign in to the advertiser portal',
    },
    login_subtitle: {
        uz: 'Kampaniyalaringizni boshqarish uchun hisobingizga kiring',
        ru: 'Войдите в аккаунт, чтобы управлять кампаниями',
        en: 'Sign in to manage your campaigns',
    },
    username: { uz: 'Login', ru: 'Логин', en: 'Username' },
    password: { uz: 'Parol', ru: 'Пароль', en: 'Password' },
    login_success: { uz: 'Xush kelibsiz!', ru: 'Добро пожаловать!', en: 'Welcome!' },
    login_error: {
        uz: "Login yoki parol noto'g'ri",
        ru: 'Неверный логин или пароль',
        en: 'Invalid username or password',
    },
    login_demo_hint: {
        uz: 'Demo rejim: istalgan login va parol bilan kiring',
        ru: 'Демо-режим: войдите с любым логином и паролем',
        en: 'Demo mode: sign in with any username and password',
    },

    // ===== Dashboard =====
    dashboard_desc: {
        uz: 'Reklama hisobi · Yetkazib berish va xarajatlar',
        ru: 'Рекламный аккаунт · Доставка и расходы',
        en: 'Ad account · Delivery and spend',
    },
    kpi_active_campaigns: {
        uz: 'Faol kampaniyalar',
        ru: 'Активные кампании',
        en: 'Active campaigns',
    },
    kpi_active_campaigns_foot: {
        uz: "ko'rsatish yetkazilmoqda",
        ru: 'показов доставляется',
        en: 'impressions in delivery',
    },
    kpi_month_impressions: {
        uz: "Bu oygi ko'rsatishlar",
        ru: 'Показы за месяц',
        en: 'Impressions this month',
    },
    kpi_month_impressions_foot: {
        uz: 'tasdiqlangan',
        ru: 'подтверждено',
        en: 'verified',
    },
    kpi_scans: { uz: 'QR skanerlash', ru: 'QR-сканирования', en: 'QR scans' },
    kpi_scans_foot: {
        uz: 'skanerlash darajasi',
        ru: 'доля сканирований',
        en: 'scan rate',
    },

    // ===== Kampaniyalar =====
    campaigns_desc: {
        uz: 'Barcha kampaniyalar va ularning natijalari',
        ru: 'Все кампании и их результаты',
        en: 'All campaigns and their results',
    },
    campaign_search_ph: {
        uz: 'Kampaniya nomi bo\'yicha qidirish',
        ru: 'Поиск по названию кампании',
        en: 'Search by campaign name',
    },
    campaign_ends_at: { uz: 'gacha', ru: 'до', en: 'until' },
    campaign_pause: { uz: 'Pauza qilish', ru: 'Поставить на паузу', en: 'Pause' },
    campaign_resume: { uz: 'Davom ettirish', ru: 'Возобновить', en: 'Resume' },
    campaign_paused_msg: {
        uz: 'Kampaniya pauza qilindi',
        ru: 'Кампания поставлена на паузу',
        en: 'Campaign paused',
    },
    campaign_resumed_msg: {
        uz: 'Kampaniya davom ettirildi',
        ru: 'Кампания возобновлена',
        en: 'Campaign resumed',
    },
    campaign_created: {
        uz: 'Kampaniya ishga tushirildi',
        ru: 'Кампания запущена',
        en: 'Campaign launched',
    },
    campaign_draft_saved: {
        uz: 'Qoralama saqlandi',
        ru: 'Черновик сохранён',
        en: 'Draft saved',
    },

    // ===== Sehrgar (yangi kampaniya) =====
    builder_title: { uz: 'Kampaniya yaratish', ru: 'Создание кампании', en: 'Create campaign' },
    builder_desc: {
        uz: "BTS posilkalari va filial ekranlari orqali O'zbekiston bo'ylab mijozlarga yeting",
        ru: 'Достигайте клиентов по всему Узбекистану через посылки BTS и экраны в филиалах',
        en: 'Reach customers across Uzbekistan via BTS parcels and branch screens',
    },
    step_creative: { uz: 'Kreativ', ru: 'Креатив', en: 'Creative' },
    step_targeting: {
        uz: "Maqsadlash va byudjet",
        ru: 'Таргетинг и бюджет',
        en: 'Targeting & budget',
    },
    step_review: { uz: "Ko'rib chiqish", ru: 'Проверка', en: 'Review' },

    // 1-qadam
    creative_step_title: {
        uz: 'Qaysi kreativ ishga tushsin?',
        ru: 'Какой креатив запускаем?',
        en: 'Which creative are we running?',
    },
    creative_step_sub: {
        uz: 'Kutubxonadan tanlang yoki yangisini yuklang',
        ru: 'Выберите из библиотеки или загрузите новый',
        en: 'Pick one from your library or upload a new one',
    },
    creative_upload: { uz: 'Yangi kreativ yuklash', ru: 'Загрузить креатив', en: 'Upload creative' },
    creative_upload_hint: {
        uz: 'PNG yoki JPG · posilka yorlig\'i uchun 1:1, ekran uchun 16:9',
        ru: 'PNG или JPG · 1:1 для наклейки, 16:9 для экрана',
        en: 'PNG or JPG · 1:1 for parcel label, 16:9 for screen',
    },
    creative_name_field: { uz: 'Kreativ nomi', ru: 'Название креатива', en: 'Creative name' },
    creative_preview_label: {
        uz: 'Eskizdagi matn',
        ru: 'Текст на эскизе',
        en: 'Thumbnail text',
    },
    creative_required: {
        uz: 'Davom etish uchun kreativ tanlang',
        ru: 'Выберите креатив, чтобы продолжить',
        en: 'Select a creative to continue',
    },
    creative_selected: { uz: 'Tanlandi', ru: 'Выбран', en: 'Selected' },
    creative_moderation_note: {
        uz: 'Yangi kreativ moderatsiyadan o\'tadi — odatda 24 soat ichida',
        ru: 'Новый креатив проходит модерацию — обычно в течение 24 часов',
        en: 'New creatives go through moderation — usually within 24 hours',
    },

    // 2-qadam
    section_channels_title: {
        uz: 'Bu qayerda ishga tushsin?',
        ru: 'Где это будет показано?',
        en: 'Where should this run?',
    },
    section_channels_sub: {
        uz: 'Bir yoki bir nechta kanalni tanlang',
        ru: 'Выберите один или несколько каналов',
        en: 'Select one or more channels',
    },
    section_regions_sub: {
        uz: "Raqamlar oylik taxminiy posilka hajmini ko'rsatadi",
        ru: 'Цифры показывают примерный месячный объём посылок',
        en: 'Numbers show the estimated monthly parcel volume',
    },
    section_goal_sub: {
        uz: 'Kampaniya davomida teng taqsimlanadi',
        ru: 'Распределяется равномерно на весь срок кампании',
        en: 'Spread evenly across the campaign period',
    },
    chip_all_regions: { uz: 'Barcha hududlar', ru: 'Все регионы', en: 'All regions' },
    chip_cities_only: { uz: 'Faqat shaharlar', ru: 'Только города', en: 'Cities only' },
    chip_clear: { uz: 'Tozalash', ru: 'Очистить', en: 'Clear' },
    available: { uz: 'mavjud', ru: 'доступно', en: 'available' },
    channels_required: {
        uz: 'Kamida bitta kanal tanlang',
        ru: 'Выберите хотя бы один канал',
        en: 'Select at least one channel',
    },
    regions_required: {
        uz: 'Kamida bitta hudud tanlang',
        ru: 'Выберите хотя бы один регион',
        en: 'Select at least one region',
    },

    // Xulosa paneli
    summary_title: { uz: 'Kampaniya xulosasi', ru: 'Сводка кампании', en: 'Campaign summary' },
    sum_est_scans: {
        uz: 'Taxminiy QR skanerlash',
        ru: 'Ожидаемые QR-сканирования',
        en: 'Estimated QR scans',
    },
    est_banner: {
        uz: "Siz faqat biz tasdiqlagan ko'rsatishlar uchun to'laysiz.",
        ru: 'Вы платите только за показы, которые мы подтвердили.',
        en: 'You only pay for impressions we have verified.',
    },
    est_total: { uz: 'Taxminiy jami', ru: 'Ориентировочно итого', en: 'Estimated total' },
    est_note: {
        uz: 'yetkazilganda hisoblanadi',
        ru: 'начисляется по факту доставки',
        en: 'billed on delivery',
    },
    go_to_review: {
        uz: "Ko'rib chiqishga o'tish",
        ru: 'Перейти к проверке',
        en: 'Go to review',
    },
    save_draft: { uz: 'Qoralamani saqlash', ru: 'Сохранить черновик', en: 'Save draft' },

    // 3-qadam
    review_title: {
        uz: "Ko'rib chiqish va ishga tushirish",
        ru: 'Проверка и запуск',
        en: 'Review and launch',
    },
    review_desc: {
        uz: 'Kampaniyani tasdiqlang va ishga tushiring',
        ru: 'Подтвердите и запустите кампанию',
        en: 'Confirm and launch your campaign',
    },
    review_ready_title: {
        uz: 'Kampaniya ishga tushishga tayyor',
        ru: 'Кампания готова к запуску',
        en: 'Campaign is ready to launch',
    },
    review_ready_desc: {
        uz: "Hammasi tekshirildi. Tasdiqlangandan so'ng yetkazib berish 24 soat ichida boshlanadi.",
        ru: 'Всё проверено. После подтверждения доставка начнётся в течение 24 часов.',
        en: 'All checks passed. Delivery starts within 24 hours of approval.',
    },
    final_summary: { uz: 'Yakuniy xulosa', ru: 'Итоговая сводка', en: 'Final summary' },
    launch_campaign: {
        uz: 'Kampaniyani ishga tushirish',
        ru: 'Запустить кампанию',
        en: 'Launch campaign',
    },
    launched: { uz: 'Ishga tushirildi!', ru: 'Запущено!', en: 'Launched!' },

    // ===== Kreativlar =====
    creatives_desc: {
        uz: 'Kreativ kutubxonasi va moderatsiya holati',
        ru: 'Библиотека креативов и статус модерации',
        en: 'Creative library and moderation status',
    },
    creative_add: { uz: 'Kreativ qo\'shish', ru: 'Добавить креатив', en: 'Add creative' },
    creative_type: { uz: 'Turi', ru: 'Тип', en: 'Type' },
    creative_type_parcel: {
        uz: 'Posilka yorlig\'i',
        ru: 'Наклейка на посылку',
        en: 'Parcel label',
    },
    creative_type_screen: { uz: 'Ekran', ru: 'Экран', en: 'Screen' },
    creative_used_in: { uz: 'Kampaniya', ru: 'Кампания', en: 'Campaign' },
    creative_created: { uz: 'Kreativ qo\'shildi', ru: 'Креатив добавлен', en: 'Creative added' },
    creative_rejected_reason: {
        uz: 'Rad etish sababi',
        ru: 'Причина отклонения',
        en: 'Rejection reason',
    },
    creative_empty: {
        uz: 'Hali kreativ yo\'q — birinchisini yuklang',
        ru: 'Пока нет креативов — загрузите первый',
        en: 'No creatives yet — upload your first one',
    },

    // ===== Tahlillar =====
    analytics_desc: {
        uz: 'Yetkazib berish, konversiya va auditoriya kesimlari',
        ru: 'Доставка, конверсия и разрезы по аудитории',
        en: 'Delivery, conversion and audience breakdowns',
    },
    period_30d: { uz: '30 kun', ru: '30 дней', en: '30 days' },
    period_90d: { uz: '90 kun', ru: '90 дней', en: '90 days' },
    period_year: { uz: 'Yil', ru: 'Год', en: 'Year' },
    trend_title: {
        uz: "Ko'rsatishlar dinamikasi",
        ru: 'Динамика показов',
        en: 'Impressions over time',
    },
    trend_sub: {
        uz: 'Kanal bo\'yicha tasdiqlangan ko\'rsatishlar',
        ru: 'Подтверждённые показы по каналам',
        en: 'Verified impressions by channel',
    },
    funnel_title: { uz: 'Konversiya voronkasi', ru: 'Воронка конверсии', en: 'Conversion funnel' },
    funnel_delivered: {
        uz: "Yetkazilgan ko'rsatish",
        ru: 'Доставленные показы',
        en: 'Delivered impressions',
    },
    funnel_scans: { uz: 'QR skanerlash', ru: 'QR-сканирования', en: 'QR scans' },
    funnel_clicks: { uz: 'Saytga o\'tish', ru: 'Переходы на сайт', en: 'Site visits' },
    channel_perf_title: {
        uz: 'Kanal samaradorligi',
        ru: 'Эффективность каналов',
        en: 'Channel performance',
    },
    region_split_title: { uz: 'Hudud kesimi', ru: 'Разрез по регионам', en: 'Regional breakdown' },
    creative_perf_title: {
        uz: "Kreativ bo'yicha skanerlash",
        ru: 'Сканирования по креативам',
        en: 'Scans by creative',
    },
    audience_hint: {
        uz: "Filialda vaqt oynasida yig'ilgan posilkalardan baholangan jismoniy auditoriya.",
        ru: 'Оценка физической аудитории по посылкам, полученным в филиале за временное окно.',
        en: 'Physical audience estimated from parcels collected at a branch within a time window.',
    },
    spend: { uz: 'Xarajat', ru: 'Расход', en: 'Spend' },

    // ===== Moliya =====
    finance_desc: {
        uz: 'Balans, kredit limiti va hisob-fakturalar',
        ru: 'Баланс, кредитный лимит и счета-фактуры',
        en: 'Balance, credit limit and invoices',
    },
    balance_prepaid: { uz: 'Joriy balans', ru: 'Текущий баланс', en: 'Current balance' },
    prepaid: { uz: 'Prepaid', ru: 'Предоплата', en: 'Prepaid' },
    postpaid: { uz: 'Postpaid', ru: 'Постоплата', en: 'Postpaid' },
    credit_limit: { uz: 'Kredit limiti', ru: 'Кредитный лимит', en: 'Credit limit' },
    daily_burn: { uz: 'Kunlik sarf', ru: 'Расход в день', en: 'Daily spend' },
    est_depletion: { uz: 'taxminiy tugash', ru: 'хватит примерно на', en: 'runs out in about' },
    top_up: { uz: "Balansni to'ldirish", ru: 'Пополнить баланс', en: 'Top up balance' },
    top_up_title: {
        uz: "Balansni to'ldirish usuli",
        ru: 'Способ пополнения баланса',
        en: 'Top-up method',
    },
    top_up_sub: {
        uz: "To'lov usulini tanlang — bank o'tkazmasi yoki onlayn to'lov tizimi",
        ru: 'Выберите способ оплаты — банковский перевод или онлайн-платёж',
        en: 'Choose a payment method — bank transfer or an online provider',
    },
    top_up_amount: { uz: "To'ldirish summasi", ru: 'Сумма пополнения', en: 'Top-up amount' },
    top_up_success: {
        uz: "To'lov qabul qilindi — balans yangilanadi",
        ru: 'Платёж принят — баланс будет обновлён',
        en: 'Payment accepted — balance will update',
    },
    used: { uz: 'Ishlatilgan', ru: 'Использовано', en: 'Used' },
    remaining: { uz: 'qoldiq', ru: 'остаток', en: 'remaining' },
    limit_warning: {
        uz: "limitning katta qismi ishlatilgan — hisob-fakturalarni o'z vaqtida to'lang",
        ru: 'использована большая часть лимита — оплачивайте счета вовремя',
        en: 'most of the limit is used — pay invoices on time',
    },
    total_spend: { uz: 'Jami xarajat', ru: 'Всего расходов', en: 'Total spend' },
    total_spend_foot: { uz: 'sof summa · QQSsiz', ru: 'чистая сумма · без НДС', en: 'net · ex VAT' },
    outstanding: { uz: 'Qarzdorlik', ru: 'Задолженность', en: 'Outstanding' },
    outstanding_foot: {
        uz: "to'lanmagan hisob-faktura",
        ru: 'неоплаченных счёта',
        en: 'unpaid invoices',
    },
    overdue_amount: { uz: "Muddati o'tgan", ru: 'Просрочено', en: 'Overdue' },
    invoices: { uz: 'Hisob-fakturalar', ru: 'Счета-фактуры', en: 'Invoices' },
    invoice_no: { uz: '№', ru: '№', en: 'No.' },
    net_amount: { uz: 'Sof summa', ru: 'Сумма без НДС', en: 'Net amount' },
    vat: { uz: 'QQS 12%', ru: 'НДС 12%', en: 'VAT 12%' },
    gross_amount: { uz: 'Jami', ru: 'Итого', en: 'Gross' },
    due_date: { uz: 'Muddat', ru: 'Срок', en: 'Due' },
    payments_history: { uz: "To'lovlar tarixi", ru: 'История платежей', en: 'Payment history' },
    payment_method: { uz: 'Usul', ru: 'Способ', en: 'Method' },
    payment_amount: { uz: 'Summa', ru: 'Сумма', en: 'Amount' },
    payment_for_invoice: { uz: "to'lovi", ru: 'оплата', en: 'payment' },
    payment_top_up: { uz: "Balansni to'ldirish", ru: 'Пополнение баланса', en: 'Balance top-up' },
    download_invoices: {
        uz: 'Hisob-fakturalarni yuklab olish',
        ru: 'Скачать счета-фактуры',
        en: 'Download invoices',
    },
    vat_note: {
        uz: "Barcha hisob-fakturalarga Qo'shilgan qiymat solig'i (QQS) 12% qo'shiladi. Siz faqat biz tasdiqlagan ko'rsatishlar uchun to'laysiz — tasdiqlanmagan ko'rsatishlar hisob-fakturaga kiritilmaydi.",
        ru: 'Ко всем счетам-фактурам добавляется НДС 12%. Вы платите только за подтверждённые показы — неподтверждённые в счёт не включаются.',
        en: 'VAT of 12% is added to every invoice. You pay only for verified impressions — unverified ones are never invoiced.',
    },
    vat_included_note: {
        uz: "QQS 12% barcha hisob-fakturalarga qo'shilgan",
        ru: 'НДС 12% включён во все счета-фактуры',
        en: 'VAT 12% is included in all invoices',
    },
    method_payme: { uz: 'Payme', ru: 'Payme', en: 'Payme' },
    method_payme_desc: {
        uz: 'Karta yoki Payme hamyoni',
        ru: 'Карта или кошелёк Payme',
        en: 'Card or Payme wallet',
    },
    method_click: { uz: 'Click', ru: 'Click', en: 'Click' },
    method_click_desc: { uz: 'Click Evolution / USSD', ru: 'Click Evolution / USSD', en: 'Click Evolution / USSD' },
    method_uzum: { uz: 'Uzum', ru: 'Uzum', en: 'Uzum' },
    method_uzum_desc: {
        uz: 'Uzum Bank / Uzum Nasiya',
        ru: 'Uzum Bank / Uzum Nasiya',
        en: 'Uzum Bank / Uzum Nasiya',
    },
    method_bank: { uz: "Bank o'tkazmasi", ru: 'Банковский перевод', en: 'Bank transfer' },
    method_bank_desc: {
        uz: "To'g'ridan-to'g'ri bank o'tkazmasi",
        ru: 'Прямой банковский перевод',
        en: 'Direct bank transfer',
    },

    // ===== Sozlamalar =====
    settings_desc: {
        uz: 'Interfeys va hisob sozlamalari',
        ru: 'Настройки интерфейса и аккаунта',
        en: 'Interface and account settings',
    },
    appearance: { uz: "Ko'rinish", ru: 'Внешний вид', en: 'Appearance' },
    theme: { uz: 'Mavzu', ru: 'Тема', en: 'Theme' },
    interface_language: { uz: 'Interfeys tili', ru: 'Язык интерфейса', en: 'Interface language' },
    account: { uz: 'Hisob', ru: 'Аккаунт', en: 'Account' },
    advertiser_name: { uz: 'Reklama beruvchi', ru: 'Рекламодатель', en: 'Advertiser' },
    role: { uz: 'Rol', ru: 'Роль', en: 'Role' },
    billing_type: { uz: 'Billing turi', ru: 'Тип биллинга', en: 'Billing type' },

    // ===== 404 =====
    not_found_title: { uz: 'Sahifa topilmadi', ru: 'Страница не найдена', en: 'Page not found' },
    not_found_subtitle: {
        uz: "Siz qidirgan sahifa mavjud emas yoki ko'chirilgan",
        ru: 'Запрошенная страница не существует или была перемещена',
        en: 'The page you are looking for does not exist or has been moved',
    },
    go_home: { uz: 'Bosh sahifaga', ru: 'На главную', en: 'Go home' },
};

export default translateData;
