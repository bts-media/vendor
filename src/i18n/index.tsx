import { ITranslateData } from '~types/index';

/**
 * Kalitlar snake_case, feature prefiksi bilan. Kalit topilmasa t() kalitning o'zini qaytaradi —
 * UI hech qachon bo'sh qolmaydi.
 */
export const translateData: ITranslateData = {
    // ===== Umumiy =====
    app_name: { uz: 'BTS Media', ru: 'BTS Media', en: 'BTS Media' },
    portal_name: { uz: 'Vendor kabineti', ru: 'Кабинет вендора', en: 'Vendor portal' },
    save: { uz: 'Saqlash', ru: 'Сохранить', en: 'Save' },
    add: { uz: "Qo'shish", ru: 'Добавить', en: 'Add' },
    edit: { uz: 'Tahrirlash', ru: 'Редактировать', en: 'Edit' },
    delete: { uz: "O'chirish", ru: 'Удалить', en: 'Delete' },
    cancel: { uz: 'Bekor qilish', ru: 'Отмена', en: 'Cancel' },
    back: { uz: 'Orqaga', ru: 'Назад', en: 'Back' },
    view: { uz: "Ko'rish", ru: 'Просмотр', en: 'View' },
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
    order: { uz: 'Tartibi', ru: 'Порядок', en: 'Order' },
    price: { uz: 'Narxi', ru: 'Цена', en: 'Price' },
    created_at: { uz: 'Yaratilgan', ru: 'Создан', en: 'Created at' },
    updated_at: { uz: 'Yangilangan', ru: 'Обновлён', en: 'Updated at' },

    // ===== Statuslar =====
    active: { uz: 'Faol', ru: 'Активный', en: 'Active' },
    inactive: { uz: 'Nofaol', ru: 'Неактивный', en: 'Inactive' },
    draft: { uz: 'Qoralama', ru: 'Черновик', en: 'Draft' },
    moderation: { uz: 'Moderatsiyada', ru: 'На модерации', en: 'In moderation' },

    // ===== Navigatsiya =====
    dashboard: { uz: 'Boshqaruv paneli', ru: 'Панель', en: 'Dashboard' },
    settings: { uz: 'Sozlamalar', ru: 'Настройки', en: 'Settings' },
    profile: { uz: 'Profil', ru: 'Профиль', en: 'Profile' },
    logout: { uz: 'Chiqish', ru: 'Выйти', en: 'Log out' },
    theme_light: { uz: 'Yorug‘ rejim', ru: 'Светлая тема', en: 'Light mode' },
    theme_dark: { uz: 'Qorong‘i rejim', ru: 'Тёмная тема', en: 'Dark mode' },
    not_found_title: { uz: 'Sahifa topilmadi', ru: 'Страница не найдена', en: 'Page not found' },
    not_found_subtitle: {
        uz: "Siz qidirgan sahifa mavjud emas yoki ko'chirilgan",
        ru: 'Запрошенная страница не существует или была перемещена',
        en: 'The page you are looking for does not exist or has been moved',
    },
    go_home: { uz: 'Bosh sahifaga', ru: 'На главную', en: 'Go home' },

    // ===== Auth =====
    login: { uz: 'Kirish', ru: 'Войти', en: 'Sign in' },
    login_title: { uz: 'Vendor kabinetiga kirish', ru: 'Вход в кабинет', en: 'Sign in' },
    login_subtitle: {
        uz: 'Davom etish uchun hisobingizga kiring',
        ru: 'Войдите в аккаунт, чтобы продолжить',
        en: 'Sign in to your account to continue',
    },
    username: { uz: 'Login', ru: 'Логин', en: 'Username' },
    password: { uz: 'Parol', ru: 'Пароль', en: 'Password' },
    login_success: { uz: 'Xush kelibsiz!', ru: 'Добро пожаловать!', en: 'Welcome!' },
    login_error: {
        uz: "Login yoki parol noto'g'ri",
        ru: 'Неверный логин или пароль',
        en: 'Invalid username or password',
    },

    // ===== Dashboard =====
    dashboard_subtitle: {
        uz: 'Kabinetingiz bo‘yicha qisqacha ko‘rsatkichlar',
        ru: 'Краткая сводка по вашему кабинету',
        en: 'A short overview of your account',
    },
    stat_items_total: { uz: 'Jami elementlar', ru: 'Всего элементов', en: 'Total items' },
    stat_items_active: { uz: 'Faol elementlar', ru: 'Активные элементы', en: 'Active items' },
    stat_views: { uz: 'Ko‘rishlar', ru: 'Просмотры', en: 'Views' },
    stat_revenue: { uz: 'Daromad', ru: 'Доход', en: 'Revenue' },
    dashboard_hint: {
        uz: 'Ko‘rsatkichlar namunaviy. Backend tayyor bo‘lgach `services/stats` hookiga ulang.',
        ru: 'Показатели демонстрационные. Подключите хук `services/stats`, когда будет API.',
        en: 'Placeholder metrics — wire them to the `services/stats` hook once the API is ready.',
    },

    // ===== Settings =====
    settings_subtitle: {
        uz: 'Interfeys va hisob sozlamalari',
        ru: 'Настройки интерфейса и аккаунта',
        en: 'Interface and account settings',
    },
    appearance: { uz: 'Ko‘rinish', ru: 'Внешний вид', en: 'Appearance' },
    theme: { uz: 'Mavzu', ru: 'Тема', en: 'Theme' },
    interface_language: { uz: 'Interfeys tili', ru: 'Язык интерфейса', en: 'Interface language' },
    account: { uz: 'Hisob', ru: 'Аккаунт', en: 'Account' },
    vendor_name: { uz: 'Vendor nomi', ru: 'Название вендора', en: 'Vendor name' },
    role: { uz: 'Rol', ru: 'Роль', en: 'Role' },

    // ===== Items (namunaviy feature — o'z entity'ngizga almashtiring) =====
    items: { uz: 'Elementlar', ru: 'Элементы', en: 'Items' },
    items_subtitle: {
        uz: 'Kabinetingizdagi elementlar ro‘yxati',
        ru: 'Список элементов вашего кабинета',
        en: 'Items in your account',
    },
    item_add: { uz: "Element qo'shish", ru: 'Добавить элемент', en: 'Add item' },
    item_edit: { uz: 'Elementni tahrirlash', ru: 'Редактировать элемент', en: 'Edit item' },
    item_detail: { uz: 'Element ma‘lumoti', ru: 'Информация об элементе', en: 'Item details' },
    item_created: { uz: "Element qo'shildi", ru: 'Элемент добавлен', en: 'Item created' },
    item_updated: { uz: 'Element yangilandi', ru: 'Элемент обновлён', en: 'Item updated' },
    item_deleted: { uz: "Element o'chirildi", ru: 'Элемент удалён', en: 'Item deleted' },
    item_delete_confirm: {
        uz: "Ushbu elementni o'chirmoqchimisiz?",
        ru: 'Удалить этот элемент?',
        en: 'Delete this item?',
    },
    item_not_found: { uz: 'Element topilmadi', ru: 'Элемент не найден', en: 'Item not found' },
    item_search_placeholder: {
        uz: 'Element nomi bo‘yicha qidirish',
        ru: 'Поиск по названию элемента',
        en: 'Search by item name',
    },
};

export default translateData;
