---
name: react-admin-boilerplate
description: React + TypeScript + Vite + Ant Design + React-Query asosidagi admin/dashboard SPA uchun to'liq andoza — texnologiyalar, fayl strukturasi, API/service qatlami, context, routing, i18n, theme, CSS, test yozish va yangi feature qo'shish tartibi. Yangi React SPA boshlaganda yoki mavjud loyihaga shu konvensiyalar asosida feature/sahifa/service/test qo'shganda ishlat.
---

# React Admin SPA — Arxitektura Andozasi

Bu skill React + TypeScript SPA (admin panel, dashboard, CRM, ichki tool) qurish uchun tekshirilgan
arxitektura andozasi. Hech qanday biznes-logika yo'q — faqat struktura, konvensiya va patternlar.

Andoza ichida `Item` / `items` deb nomlangan joylar — o'zingizning entity nomingiz bilan almashtiriladigan
joy (masalan `Product`, `Customer`, `Invoice`).

---

## 1. Texnologiyalar steki

| Qatlam       | Tanlov                                                             | Izoh                                            |
| ------------ | ------------------------------------------------------------------ | ----------------------------------------------- |
| Build        | **Vite 6** + `@vitejs/plugin-react`                                | dev port 5173, preview port 4173                |
| Til          | **TypeScript 5** (`strict: true`)                                  | `noUnusedLocals`, `noUnusedParameters` yoqilgan |
| UI           | **React 18** + **Ant Design 5**                                    | Componentlar antd'dan, custom theme bilan       |
| Server state | **React-Query** (`react-query` v3 yoki `@tanstack/react-query` v5) | Redux YO'Q                                      |
| Client state | **React Context**                                                  | Auth, Theme, Language, QueryClient              |
| HTTP         | **Axios**                                                          | Bitta markazlashgan instance + interceptorlar   |
| Routing      | **react-router-dom v6**                                            | Lazy + Suspense                                 |
| Ikonkalar    | **lucide-react** (+ `@ant-design/icons` kerak bo'lsa)              |                                                 |
| Sana         | **dayjs**                                                          | `Date` obyektidan foydalanma                    |
| Test         | **Vitest** + **@testing-library/react** + **jsdom**                |                                                 |
| Lint         | **ESLint 8** (`--max-warnings 0`) + Prettier                       |                                                 |

**Opsional (kerak bo'lsagina qo'sh):** `@ant-design/charts` (grafiklar), `exceljs` + `file-saver`
(export), `@react-pdf/renderer` / `jspdf` (PDF), `socket.io-client` (realtime), `@dnd-kit/*`
(drag-drop), `react-imask` (input mask), `uuid`, `lodash.debounce`.

> **Qoida:** har bir dependency uchun "buni haqiqatan ishlatyapmanmi?" deb so'ra. Ishlatilmagan
> paket = build og'irligi.

---

## 2. package.json

```json
{
    "name": "app-name",
    "private": true,
    "version": "0.1.0",
    "type": "module",
    "scripts": {
        "dev": "vite",
        "build": "tsc && vite build",
        "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
        "preview": "vite preview",
        "test": "vitest",
        "test:run": "vitest run"
    }
}
```

**Muhim:** `build` skripti `tsc &&` bilan boshlanadi — TypeScript xatosi build'ni to'xtatadi.
Bu qasddan qilingan, olib tashlama.

---

## 3. Konfiguratsiya fayllari

### `vite.config.ts`

```ts
/// <reference types="vitest/config" />
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
    plugins: [react()],
    test: {
        environment: "jsdom",
        globals: true,
        setupFiles: ["./src/setupTests.ts"],
    },
    server: { open: true, port: 5173 },
    preview: { host: "0.0.0.0", port: 4173, strictPort: true, cors: true },
    resolve: {
        alias: {
            "~api": path.resolve(__dirname, "src/api"),
            "~assets": path.resolve(__dirname, "src/assets"),
            "~components": path.resolve(__dirname, "src/components"),
            "~constants": path.resolve(__dirname, "src/constants"),
            "~context": path.resolve(__dirname, "src/context"),
            "~hooks": path.resolve(__dirname, "src/hooks"),
            "~i18n": path.resolve(__dirname, "src/i18n"),
            "~pages": path.resolve(__dirname, "src/pages"),
            "~services": path.resolve(__dirname, "src/services"),
            "~styles": path.resolve(__dirname, "src/styles"),
            "~theme": path.resolve(__dirname, "src/theme"),
            "~types": path.resolve(__dirname, "src/types"),
            "~utils": path.resolve(__dirname, "src/utils"),
        },
    },
});
```

### `tsconfig.json`

```json
{
    "compilerOptions": {
        "target": "ES2020",
        "useDefineForClassFields": true,
        "lib": ["ES2020", "DOM", "DOM.Iterable"],
        "module": "ESNext",
        "moduleResolution": "bundler",
        "skipLibCheck": true,
        "allowImportingTsExtensions": true,
        "resolveJsonModule": true,
        "isolatedModules": true,
        "noEmit": true,
        "jsx": "react-jsx",
        "strict": true,
        "noUnusedLocals": true,
        "noUnusedParameters": true,
        "noFallthroughCasesInSwitch": true,
        "esModuleInterop": true,
        "allowSyntheticDefaultImports": true,
        "forceConsistentCasingInFileNames": true,
        "paths": {
            "~api/*": ["./src/api/*"],
            "~assets/*": ["./src/assets/*"],
            "~components/*": ["./src/components/*"],
            "~constants/*": ["./src/constants/*"],
            "~context/*": ["./src/context/*"],
            "~hooks/*": ["./src/hooks/*"],
            "~i18n/*": ["./src/i18n/*"],
            "~pages/*": ["./src/pages/*"],
            "~services/*": ["./src/services/*"],
            "~styles/*": ["./src/styles/*"],
            "~theme/*": ["./src/theme/*"],
            "~types/*": ["./src/types/*"],
            "~utils/*": ["./src/utils/*"]
        }
    },
    "include": ["src"],
    "exclude": [
        "src/**/*.test.ts",
        "src/**/*.test.tsx",
        "src/**/*.spec.ts",
        "src/**/*.spec.tsx"
    ],
    "references": [{ "path": "./tsconfig.node.json" }]
}
```

> ⚠️ **Alias'lar ikki joyda:** `vite.config.ts` va `tsconfig.json`. Yangi alias qo'shganda
> IKKALASINI ham yangila, aks holda dev ishlaydi-yu, `tsc` yiqiladi (yoki teskarisi).

> ⚠️ **Test fayllari `tsconfig.include` dan chiqarilgan** — ular `tsc` bilan tekshirilmaydi,
> faqat Vitest ishga tushiradi. Bu build'ni test tiplaridan himoya qiladi.

### `.eslintrc.cjs` + `.prettierrc` (BOSHIDAN QO'SH)

Ko'p loyihalarda bu unutiladi va keyin butun kodbaza aralash formatga aylanadi.
Birinchi kundan qo'y:

```js
// .eslintrc.cjs
module.exports = {
    root: true,
    env: { browser: true, es2020: true },
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:react-hooks/recommended",
        "prettier",
    ],
    ignorePatterns: ["dist", ".eslintrc.cjs"],
    parser: "@typescript-eslint/parser",
    plugins: ["react-refresh"],
    rules: {
        "react-refresh/only-export-components": [
            "warn",
            { allowConstantExport: true },
        ],
        "@typescript-eslint/no-explicit-any": "warn",
        "@typescript-eslint/no-unused-vars": [
            "error",
            { argsIgnorePattern: "^_" },
        ],
    },
};
```

```json
// .prettierrc
{
    "useTabs": true,
    "tabWidth": 2,
    "semi": true,
    "singleQuote": true,
    "jsxSingleQuote": true,
    "trailingComma": "all",
    "printWidth": 100,
    "arrowParens": "avoid"
}
```

Kerakli devDeps: `eslint`, `@typescript-eslint/parser`, `@typescript-eslint/eslint-plugin`,
`eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`, `eslint-config-prettier`, `prettier`.

---

## 4. Fayl strukturasi

```
src/
├── api/                    # HTTP qatlami (faqat shu yerda axios ishlatiladi)
│   ├── axios.ts            # Api instance + interceptor ulanishi
│   ├── index.ts            # Generic react-query hooklar (useGetList, useCreate, ...)
│   ├── ResponseInterceptor.ts
│   ├── ErrorInterceptor.ts
│   ├── tokenManager.ts     # JWT lifecycle
│   └── types.ts
├── app/
│   ├── index.tsx           # isAuthenticated → AppRoutes | AuthRoutes
│   ├── AppRoutes/          # Himoyalangan layout (Sider + Header + Content)
│   │   ├── index.tsx
│   │   ├── AppRoutesLayout.module.css
│   │   └── components/
│   └── AuthRoutes/         # Login route'lari
├── assets/
│   ├── icons/              # SVG React komponentlari, barrel index.tsx bilan
│   ├── images/
│   └── fonts/
├── components/             # Butun app bo'ylab qayta ishlatiladigan UI
│   ├── index.ts            # Barrel export
│   ├── NotificationProvider.tsx
│   ├── PageHeader.tsx
│   ├── Form/               # Input, SearchInput, ImageUpload, FormHeader
│   ├── Table/              # EmptyTable va h.k.
│   ├── ui/                 # PageTitle, StatusBadge, TextClamp, SegmentedTabs
│   └── <Component>.module.css
├── constants/
│   ├── urls.ts             # baseURL + BARCHA endpointlar
│   ├── routes.tsx          # Route massivi (lazy import bilan)
│   ├── MenuSider.tsx       # Sidebar menyu strukturasi
│   └── data.tsx            # Statik ma'lumot (statuslar, ranglar, optionlar)
├── context/
│   ├── AuthProvider/       # index.tsx + types.ts (+ .module.css)
│   ├── ThemeProvider/
│   ├── LanguageProvider/
│   └── QueryProvider/
├── hooks/                  # Global custom hooklar
│   ├── useLanguage.tsx
│   ├── useWindowSize.tsx
│   ├── useModalState.tsx
│   └── useDebounce.tsx
├── i18n/
│   └── index.tsx           # { key: { uz, ru, en } } tarjima obyekti
├── pages/                  # Har bir sahifa — bitta papka
│   └── Items/
│       ├── index.tsx       # Sahifa konteyneri (orkestratsiya)
│       ├── sections/       # yoki components/ — sahifaga xos bo'laklar
│       │   ├── ItemTable.tsx
│       │   └── ItemFormModal.tsx
│       └── Items.module.css
├── services/               # Feature bo'yicha API hooklar
│   └── items/
│       ├── index.tsx       # useItems(), useItemDetail() ...
│       └── type.ts         # ItemType, CreateItemBody, ...
├── styles/globals/
│   ├── index.css           # Boshqalarini import qiladi
│   ├── reset.css
│   ├── tokens.css          # CSS custom properties (:root + [data-theme='dark'])
│   ├── base.css
│   ├── utilities.css
│   └── antd-overrides.css
├── theme/
│   ├── index.tsx           # antd ThemeConfig (appTheme, darkTheme) + statusColors
│   └── Colors.ts           # Rang palitrasi (JS obyekt)
├── types/
│   └── index.tsx           # Global generic tiplar
├── utils/
│   ├── helpers.ts          # localStorage, format*, parse*
│   ├── cn.ts               # className birlashtiruvchi
│   └── helpers.test.ts
├── main.tsx                # Provider zanjiri
├── setupTests.ts
└── vite-env.d.ts
```

### Nomlash qoidalari

| Nima            | Format                                                          | Misol                   |
| --------------- | --------------------------------------------------------------- | ----------------------- |
| Komponent fayli | `PascalCase.tsx`                                                | `ItemTable.tsx`         |
| Sahifa papkasi  | `PascalCase/` + ichida `index.tsx`                              | `pages/Items/index.tsx` |
| Service papkasi | `camelCase/`                                                    | `services/items/`       |
| Hook fayli      | `useXxx.tsx`                                                    | `useWindowSize.tsx`     |
| Util fayli      | `camelCase.ts`                                                  | `helpers.ts`            |
| CSS modul       | `<Nom>.module.css`                                              | `Items.module.css`      |
| Test            | `<manba>.test.ts(x)` — manba yonida                             | `helpers.test.ts`       |
| Tip             | `PascalCase`, `Type` suffiks yoki `I` prefiks (bittasini tanla) | `ItemType`              |

---

## 5. API qatlami (`src/api/`)

**Qoida: butun loyihada `axios` faqat `src/api/` ichida import qilinadi.** Komponent hech qachon
to'g'ridan-to'g'ri HTTP chaqirmaydi.

### `constants/urls.ts`

```ts
export let baseURL = "";
if (import.meta.env.VITE_APP_MODE === "development") {
    baseURL = import.meta.env.VITE_API_DEVELOPMENT_URL;
} else {
    baseURL = import.meta.env.VITE_API_PRODUCTION_URL;
}

export const urls = {
    auth: {
        login: "/auth/login",
        refresh: "/auth/refresh",
        logout: "/auth/logout",
    },
    items: {
        get: "/items",
        create: "/items",
        update: (id: string) => `/items/${id}`,
        getById: (id: string) => `/items/${id}`,
    },
};
```

Dinamik segmentli URL — **funksiya**, statik URL — **string**. Endpoint yozuvi hech qachon
komponent yoki service ichida qattiq yozilmaydi.

### `api/axios.ts`

```ts
import axios from "axios";
import { baseURL } from "~constants/urls";
import { errorInterceptor } from "./ErrorInterceptor";
import { responseInterceptor } from "./ResponseInterceptor";
import { ensureValidAccessToken } from "./tokenManager";

export const Api = axios.create({ baseURL });

Api.interceptors.request.use(async (config) => {
    const token = await ensureValidAccessToken();
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

Api.interceptors.response.use(
    (response) => responseInterceptor(response),
    (error) => errorInterceptor(error),
);
```

### `api/ResponseInterceptor.ts`

```ts
import { AxiosResponse } from "axios";

// `response.data` ni qaytaradi — shuning uchun butun app'da `.data.data` yozilmaydi
export const responseInterceptor = async (response: AxiosResponse) =>
    response.data;
```

### `api/ErrorInterceptor.ts` — mas'uliyatlari

1. `Network Error` → foydalanuvchiga notification, reject.
2. `401` (yoki backend'ning token xatosi) → `_retry` flagi bilan **bir marta** refresh urin,
   muvaffaqiyatli bo'lsa asl so'rovni qayta yubor; bo'lmasa localStorage tozalab `/logout` ga yubor.
3. `403` → sessiya yaroqsiz bo'lsa credential'larni tozalab `/logout`, aks holda "forbidden" xabari.
4. Qolgani → `Promise.reject(error)`, service qatlami hal qiladi.

> ⚠️ **Muhim tuzoq:** 401/403 da redirect qilishdan oldin **albatta** `clearLocalStorage()` chaqir.
> Aks holda app hali ham "authenticated" ko'rinadi → himoyalangan route'ga tushadi → yana 403 →
> cheksiz reload sikli.

### `api/tokenManager.ts` — mas'uliyatlari

```ts
const TOKEN_REFRESH_BUFFER_SECONDS = 60;
let refreshPromise: Promise<string | null> | null = null; // parallel refresh'ni bloklaydi

const decodeJwtPayload = (token: string): { exp?: number } | null => {
    /* base64url decode */
};

export const isAccessTokenExpiringSoon = (
    token: string,
    buffer = TOKEN_REFRESH_BUFFER_SECONDS,
) => {
    const payload = decodeJwtPayload(token);
    if (!payload?.exp) return true;
    return payload.exp - Math.floor(Date.now() / 1000) <= buffer;
};

export const refreshAccessToken = async (): Promise<string | null> => {
    if (refreshPromise) return refreshPromise; // ← bir vaqtda 10 ta so'rov bo'lsa ham 1 ta refresh
    refreshPromise = (async () => {
        /* ... */
    })();
    return refreshPromise;
};

export const ensureValidAccessToken = async (): Promise<string | null> => {
    const token = getLocalstorage("accessToken");
    if (!token) return null;
    if (isAccessTokenExpiringSoon(token)) return refreshAccessToken();
    return token;
};
```

Refresh so'rovi **`Api` instance'idan emas, toza `axios`dan** yuboriladi — aks holda interceptor
o'zini o'zi chaqiradi (cheksiz rekursiya).

### `api/index.ts` — generic hooklar

```ts
import { AxiosError } from "axios";
import { useMutation, useQuery } from "react-query";
import { Api } from "./axios";

interface IEditData<T> {
    url: string;
    item: T;
}

// Sahifalangan / query-string'li GET. key массив bo'lsa key[1] URL'ga qo'shiladi.
const useGetList = <T>(
    key: string | string[],
    url: string,
    options?: { enabled?: boolean; refetchInterval?: number },
) => {
    const get = async () => {
        if (!url) return null;
        const urlQuery = Array.isArray(key) ? url + key[1] : url;
        const data: T = await Api.get(urlQuery);
        return data;
    };
    return useQuery(key, get, options);
};

const useCustomGetQuery = <T>(
    key: string | string[],
    url: string,
    options?: any,
) => useQuery(key, async () => (await Api.get<T>(url, options)) as T, options);

const useCreate = <T, U, V = Error>(url: string) =>
    useMutation<U, AxiosError<V>, T>(async (body) => await Api.post(url, body));

const useUpdate = <T, U>() =>
    useMutation(
        async ({ url, item }: IEditData<T>) =>
            (await Api.patch(url, item)) as U,
    );

const useUpdatePut = <T, U>() =>
    useMutation(
        async ({ url, item }: IEditData<T>) => (await Api.put(url, item)) as U,
    );

const useDeleteApi = <T>(url: string) =>
    useMutation(
        async (id: number | string) => (await Api.delete(`${url}/${id}`)) as T,
    );

const useCreateMedia = <T, U, V = Error>(url: string) =>
    useMutation<U, AxiosError<V>, T>(
        async (body) =>
            await Api.post(url, body, {
                headers: { "Content-Type": "multipart/form-data" },
            }),
    );

export {
    useCreate,
    useCreateMedia,
    useCustomGetQuery,
    useDeleteApi,
    useGetList,
    useUpdate,
    useUpdatePut,
};
```

---

## 6. Service qatlami (`src/services/`)

**Eng muhim qoida: komponent hech qachon `~api` generic hooklarini to'g'ridan chaqirmaydi.**
Har doim feature service hooki orqali.

Har bir feature = bitta papka: `index.tsx` (hooklar) + `type.ts` (tiplar).

Service hookining mas'uliyati:

- React-Query kalitini (`QUERY_KEY`) belgilash
- URL'ni `urls`dan olish
- Mutation `onSuccess` da `refetch()` + success notification
- Mutation `onError` da error notification
- Ixtiyoriy `callback` (modal yopish, formani tozalash) chaqirish
- Komponentga **toza, tayyor** qiymat qaytarish (`data ?? []`, birlashtirilgan `isLoading`)

### `services/items/type.ts`

```ts
export type ItemStatus = "active" | "inactive";

export type ItemType = {
    id: string;
    name: string;
    status: ItemStatus;
    order: number;
    createdAt: string;
    updatedAt: string;
};

export type CreateItemBody = {
    name: string;
    status: ItemStatus;
    order: number;
};

export type UpdateItemBody = Partial<CreateItemBody>;
```

### `services/items/index.tsx`

```tsx
import {
    useCreate,
    useCustomGetQuery,
    useDeleteApi,
    useUpdate,
} from "~api/index";
import { useNotify } from "~components/NotificationProvider";
import { urls } from "~constants/urls";
import useLanguage from "~hooks/useLanguage";
import { CallbackType } from "~types/index";
import { CreateItemBody, ItemType, UpdateItemBody } from "./type";

export const useItems = () => {
    const ITEMS_KEY = "items";
    const { t } = useLanguage();
    const notify = useNotify();

    const { data, isLoading, refetch, isRefetching } = useCustomGetQuery<
        ItemType[]
    >(ITEMS_KEY, urls.items.get);

    const { mutate: createMutate, isLoading: isCreating } = useCreate<
        CreateItemBody,
        ItemType
    >(urls.items.create);
    const { mutate: updateMutate, isLoading: isUpdating } = useUpdate<
        UpdateItemBody,
        ItemType
    >();
    const { mutate: deleteMutate, isLoading: isDeleting } = useDeleteApi<void>(
        urls.items.get,
    );

    const onError = (err: any) =>
        notify.error({
            type: "error",
            message: err?.response?.data?.message || t("error"),
        });

    const createItem = (body: CreateItemBody, callback?: CallbackType) => {
        createMutate(body, {
            onSuccess: () => {
                refetch();
                notify.success({ type: "success", message: t("item_created") });
                callback?.();
            },
            onError,
        });
    };

    const updateItem = (
        id: string,
        body: UpdateItemBody,
        callback?: CallbackType,
    ) => {
        updateMutate(
            { url: urls.items.update(id), item: body },
            {
                onSuccess: () => {
                    refetch();
                    notify.success({
                        type: "success",
                        message: t("item_updated"),
                    });
                    callback?.();
                },
                onError,
            },
        );
    };

    const deleteItem = (id: string, callback?: CallbackType) => {
        deleteMutate(id, {
            onSuccess: () => {
                refetch();
                notify.success({ type: "success", message: t("item_deleted") });
                callback?.();
            },
            onError,
        });
    };

    return {
        itemsData: data || [],
        isLoading: isLoading || isRefetching,
        refetchItems: refetch,
        createItem,
        updateItem,
        deleteItem,
        isCreating,
        isUpdating,
        isDeleting,
    };
};
```

### URL-driven pagination pattern

Sahifalash holati **URL query-string'da** saqlanadi (React state'da emas) — shunda sahifani
yangilash, link ulashish, orqaga qaytish to'g'ri ishlaydi.

```tsx
// service
export const useItemsList = () => {
    const ITEMS_KEY = "items";
    const { search } = useLocation(); // "?page=2&limit=20&status=active"
    const { data, isLoading, refetch, isRefetching } = useGetList<
        TResponse<ItemType, true>
    >(
        [ITEMS_KEY, search], // key o'zgarganda react-query avtomatik qayta so'raydi
        urls.items.get,
    );

    return {
        itemsData: data?.data,
        pagination: {
            total: data?.total || 0,
            limit: data?.limit || 0,
            page: data?.page || 0,
        },
        isLoading: isLoading || isRefetching,
        refetchItems: refetch,
    };
};
```

```tsx
// sahifa
const [, setSearchParams] = useSearchParams();

const handleTableChange = (p: TablePaginationConfig) => {
    setSearchParams((prev) => ({
        ...Object.fromEntries(prev),
        page: String(p.current),
        limit: String(p.pageSize),
    }));
};
```

### Detail so'rovi — `enabled` bilan

```tsx
export const useItemDetail = (id?: string) => {
    const { data, isLoading } = useCustomGetQuery<ItemType>(
        ["item", id || ""],
        urls.items.getById(id!),
        { enabled: Boolean(id) }, // ← id yo'q bo'lsa so'rov yuborilmaydi
    );
    return { item: data, isLoading };
};
```

---

## 7. Global tiplar (`src/types/index.tsx`)

```ts
import React from "react";

/** Ko'ptilli matn — backend shu shaklda qaytarsa */
export type TValue = { uz: string; ru: string; en: string };

export interface ITranslateData {
    [key: string]: TValue;
}

export type TDataResponse<T> = {
    success: boolean;
    data: T;
    error: string | null;
};

export type PaginationType = {
    limit?: number;
    page?: number | null;
    total?: number;
};

export type TResponseWithPagination<T> = PaginationType & { data: T[] };

/** TResponse<Item> → Item | TResponse<Item, true> → sahifalangan ro'yxat */
export type TResponse<T, U extends boolean = false> = U extends true
    ? TResponseWithPagination<T>
    : T;

export type Option = { value: number | string; label: string };
export type CallbackType = () => void;
export type DispatchType<T> = React.Dispatch<React.SetStateAction<T>>;
```

---

## 8. Context provayderlar va `main.tsx`

Provider tartibi **muhim** — pastdagilar yuqoridagilarga tayanadi:

```tsx
// src/main.tsx
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { NotificationProvider } from "~components/NotificationProvider";
import { AuthProvider } from "~context/AuthProvider";
import QueryContextProvider from "~context/QueryProvider";
import LanguageProvider from "~context/LanguageProvider";
import App from "./app";
import "./styles/globals/index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <AuthProvider>
        <QueryContextProvider>
            <BrowserRouter>
                <NotificationProvider>
                    <LanguageProvider>
                        <App />
                    </LanguageProvider>
                </NotificationProvider>
            </BrowserRouter>
        </QueryContextProvider>
    </AuthProvider>,
);
```

`ThemeProvider` esa `App` ichida — chunki u antd `ConfigProvider`ni o'raydi:

```tsx
// src/app/index.tsx
function App() {
    const { isAuthenticated } = useAuthContext();
    return (
        <ThemeProvider>
            {isAuthenticated ? <AppRoutes /> : <AuthRoutes />}
        </ThemeProvider>
    );
}
```

### QueryProvider

```tsx
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false, // avtomatik qayta urinish yo'q — xato darhol ko'rinsin
            refetchOnWindowFocus: false, // admin panelda keraksiz so'rovlarni oldini oladi
        },
    },
});
```

### AuthProvider — mas'uliyatlari

- Boshlang'ich token'ni `localStorage`dan o'qish
- Mount'da `ensureValidAccessToken()` bilan tekshirish; `isChecking` bo'lganda spinner ko'rsatish
  (aks holda app bir zumda login sahifasini "chaqnatib" yuboradi)
- `isAuthenticated`, `login`, `logout`, `role` ni `useMemo`/`useCallback` bilan berish
- `useAuthContext()` hookini eksport qilish

```tsx
const AuthContext = createContext({} as IAuthContextData);
export const useAuthContext = () => useContext(AuthContext);
```

> Har bir context papkasi: `index.tsx` + `types.ts`. Provider tiplari alohida faylda.

### NotificationProvider — antd notification ustidan qobiq

```tsx
export const useNotify = () => {
    const ctx = useContext(NotificationContext);
    if (!ctx)
        throw new Error("useNotify must be used within a NotificationProvider");
    return ctx.notify;
};

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
    const [api, contextHolder] = notification.useNotification();
    const defaults = {
        placement: "bottomRight",
        duration: 4,
        showProgress: true,
        pauseOnHover: true,
    };

    const notify = {
        success: (args: ArgsProps) => api.success({ ...defaults, ...args }),
        error: (args: ArgsProps) => api.error({ ...defaults, ...args }),
        info: (args: ArgsProps) => api.info({ ...defaults, ...args }),
        warning: (args: ArgsProps) => api.warning({ ...defaults, ...args }),
    };

    return (
        <NotificationContext.Provider value={{ notify }}>
            {contextHolder}
            {children}
        </NotificationContext.Provider>
    );
};
```

> ⚠️ **Hech qachon antd'ning `message` / `notification` ni to'g'ridan import qilma** (interceptor
> ichidan tashqari — u React tree'dan tashqarida). Sabab: statik chaqiruv `ConfigProvider` theme'ini
> ko'rmaydi, dark mode'da noto'g'ri ko'rinadi.

---

## 9. Routing

Route'lar `constants/routes.tsx` da **ma'lumot massivi** sifatida, hammasi `React.lazy` bilan:

```tsx
import { ReactNode, Suspense, lazy } from "react";

const ItemsPage = lazy(() => import("~pages/Items"));
const ItemDetailPage = lazy(() => import("~pages/Items/sections/ItemDetail"));

interface RoutesI {
    id: number;
    path?: string;
    index?: boolean;
    component: ReactNode;
    children?: RoutesI[];
}

const LoadingComponent = ({ children }: { children: ReactNode }) => (
    <Suspense fallback={<Spin />}>{children}</Suspense>
);

export const routes: RoutesI[] = [
    {
        id: 1,
        path: "/items",
        component: (
            <LoadingComponent>
                <ItemsPage />
            </LoadingComponent>
        ),
    },
    {
        id: 2,
        path: "/items/:id",
        component: (
            <LoadingComponent>
                <ItemDetailPage />
            </LoadingComponent>
        ),
    },
];
```

Layout esa shu massivni aylanib chiqadi:

```tsx
<Routes>
    <Route path='/' element={<AppLayout />}>
        {routes.map(({ id, path, component, children }) => (
            <Route key={id} path={path} element={component}>
                {children?.map((child) => (
                    <Route
                        key={child.id}
                        {...(child.index
                            ? { index: true }
                            : { path: child.path })}
                        element={child.component}
                    />
                ))}
            </Route>
        ))}
    </Route>
    <Route path='*' element={<NotFound />} />
</Routes>
```

`AppLayout` — antd `Layout`: yig'iluvchi `Sider` (desktop) / `Drawer` (mobile), `Header` (theme
toggle, til tanlash, profil), `Content` ichida `<Outlet />`.

---

## 10. i18n

`react-i18next` runtime'i emas — oddiy statik obyekt. Kichik/o'rta admin panel uchun yetarli,
bundle'ga og'irlik qo'shmaydi.

```tsx
// src/i18n/index.tsx
import { ITranslateData } from "~types/index";

export const translateData: ITranslateData = {
    items: { uz: "Elementlar", ru: "Элементы", en: "Items" },
    item_created: {
        uz: "Element qo'shildi",
        ru: "Элемент добавлен",
        en: "Item created",
    },
    save: { uz: "Saqlash", ru: "Сохранить", en: "Save" },
    cancel: { uz: "Bekor qilish", ru: "Отмена", en: "Cancel" },
    // ...
};
```

```tsx
// src/hooks/useLanguage.tsx
function useLanguage() {
    const { lang } = useContext(LanguageContext);

    const t = (key: string) => translateData[key]?.[lang] ?? key; // topilmasa kalitni qaytaradi

    const translate = (obj: Record<string, any>, name: string) =>
        obj?.[name]?.[lang] ?? "";

    return { t, translate, lang };
}
```

Ishlatilishi: `const { t } = useLanguage();` → `t('items')`.

Konvensiyalar:

- Kalitlar `snake_case`, feature prefiksi bilan: `item_created`, `item_delete_confirm`
- Fayl ichida feature bo'yicha `// ===== Bo'lim =====` kommentlari bilan guruhla
- `t()` topilmagan kalitni o'zini qaytaradi — UI hech qachon bo'sh qolmaydi
- Backend'dan kelgan ko'ptilli obyekt uchun `translate(obj, 'fieldName')`

> Agar loyiha 3+ tilli va 1000+ kalitli bo'lsa — `i18next` + JSON fayllar + lazy namespace'ga o't.

---

## 11. Theme va CSS

### Uch qatlamli tizim

1. **`styles/globals/tokens.css`** — CSS custom properties (yagona haqiqat manbai)
2. **`theme/Colors.ts` + `theme/index.tsx`** — o'sha ranglarning JS/antd ko'rinishi
3. **`*.module.css`** — komponentga xos, scoped stillar

```css
/* tokens.css */
:root {
    --primary: #4f46e5;
    --main-bg-color: #f9f9f9;
    --gray-50: #f0f1f3;
    --gray-500: #667085;
    --black-500: #1d1f2c;
    --radius-md: 8px;
    --space-4: 16px;
}

[data-theme="dark"] {
    --main-bg-color: #141414;
    --black-500: #e6e6e6;
}
```

```ts
// theme/index.tsx
import type { ThemeConfig } from "antd/es/config-provider/context";

export const appTheme: ThemeConfig = {
    token: {
        colorPrimary: Colors.primary,
        borderRadius: 8,
        fontFamily: "Inter, sans-serif",
    },
    components: { Table: { headerBg: Colors.gray[25] } },
};

export const darkTheme: ThemeConfig = { ...appTheme /* dark override'lar */ };

/** Status → { backgroundColor, color }. Badge/Tag'larda bir xil ko'rinish uchun. */
export const statusColors = {
    active: { backgroundColor: "#e5f7ed", color: "#01ab56" },
    inactive: { backgroundColor: "#fef1ea", color: "#eb3d4d" },
    pending: { backgroundColor: "#d5f0ff", color: "#2086bf" },
};
export const statusColorsDark = {
    /* dark variantlari */
};
```

### ThemeProvider

```tsx
export const ThemeProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [mode, setMode] = useState<"light" | "dark">(() => {
        const stored = localStorage.getItem("theme");
        if (stored === "dark" || stored === "light") return stored;
        return window.matchMedia?.("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light";
    });

    useEffect(() => {
        localStorage.setItem("theme", mode);
        document.body.setAttribute("data-theme", mode); // ← CSS shu atributga tayanadi
    }, [mode]);

    return (
        <ThemeContext.Provider
            value={{
                mode,
                setMode,
                toggle: () => setMode((m) => (m === "dark" ? "light" : "dark")),
            }}
        >
            <ConfigProvider
                theme={{
                    ...(mode === "dark" ? darkTheme : appTheme),
                    algorithm:
                        mode === "dark"
                            ? antdTheme.darkAlgorithm
                            : antdTheme.defaultAlgorithm,
                }}
            >
                {children}
            </ConfigProvider>
        </ThemeContext.Provider>
    );
};
```

### CSS qoidalari

- Komponentga xos stil → `Component.module.css`, `import styles from './Component.module.css'`
- Bir nechta class → `cn()` helper:
    ```ts
    type ClassInput = string | false | null | undefined;
    export const cn = (...classes: ClassInput[]) =>
        classes.filter(Boolean).join(" ");
    ```
- Inline `style` — faqat dinamik qiymat uchun (`style={{ marginTop: 24 }}` kabi bir martalik
  bo'shliqlar ham qabul qilinadi, lekin takrorlansa CSS modulga ko'chir)
- Media query: `@media (width < 768px)` (modern sintaksis)
- Breakpointlar: **576** (mobile), **768** (tablet), **992** (desktop) — `useWindowSize` bilan
  mos bo'lsin

---

## 12. Komponent konvensiyalari

### Sahifa (compound pattern)

`pages/Items/index.tsx` — **orkestrator**: service hookini chaqiradi, holat va handlerlarni
boshqaradi, bo'laklarni prop bilan yig'adi. UI detallari `sections/` ichida.

```tsx
const ItemsPage = () => {
    const { t } = useLanguage();
    const { open, onOpen, onClose } = useModalState();
    const [editingItem, setEditingItem] = useState<ItemType | null>(null);

    const {
        itemsData,
        isLoading,
        refetchItems,
        createItem,
        updateItem,
        deleteItem,
        isCreating,
        isUpdating,
    } = useItems();

    const handleOpenCreate = () => {
        setEditingItem(null);
        onOpen();
    };

    const handleEdit = (item: ItemType) => {
        setEditingItem(item);
        onOpen();
    };

    const handleSubmit = (values: CreateItemBody) => {
        if (editingItem) {
            updateItem(editingItem.id, values, () => {
                onClose();
                setEditingItem(null);
            });
        } else {
            createItem(values, onClose);
        }
    };

    const handleDelete = (item: ItemType) => {
        Modal.confirm({
            title: t("item_delete_confirm"),
            content: item.name,
            okText: t("delete"),
            okType: "danger",
            cancelText: t("cancel"),
            centered: true,
            onOk: () => deleteItem(item.id),
        });
    };

    return (
        <div>
            <PageHeader
                title={t("items")}
                refreshButton
                onRefresh={refetchItems}
                isRefreshing={isLoading}
                isBtnIsVisible
                handleClick={handleOpenCreate}
                buttonText={t("item_add")}
            />

            <ItemTable
                data={itemsData}
                loading={isLoading}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

            <ItemFormModal
                open={open}
                onCancel={() => {
                    onClose();
                    setEditingItem(null);
                }}
                onSubmit={handleSubmit}
                loading={isCreating || isUpdating}
                editingItem={editingItem}
            />
        </div>
    );
};

export default ItemsPage;
```

### Jadval bo'lagi

```tsx
interface ItemTableProps {
    data: ItemType[];
    loading: boolean;
    onEdit: (item: ItemType) => void;
    onDelete: (item: ItemType) => void;
}

const ItemTable = ({ data, loading, onEdit, onDelete }: ItemTableProps) => {
    const { t } = useLanguage();

    const columns: ColumnsType<ItemType> = [
        { title: t("name"), dataIndex: "name", key: "name" },
        {
            title: t("status"),
            key: "status",
            width: 120,
            render: (_, record) => (
                <Badge
                    status={record.status === "active" ? "success" : "error"}
                    text={t(record.status)}
                />
            ),
        },
        {
            title: "",
            key: "actions",
            width: 60,
            render: (_, record) => (
                <Dropdown
                    menu={{
                        items: [
                            {
                                key: "edit",
                                label: t("edit"),
                                icon: <Pencil size={14} />,
                                onClick: () => onEdit(record),
                            },
                            {
                                key: "delete",
                                label: t("delete"),
                                icon: <Trash2 size={14} />,
                                danger: true,
                                onClick: () => onDelete(record),
                            },
                        ],
                    }}
                    trigger={["click"]}
                >
                    <Button type='text' icon={<MoreHorizontal size={16} />} />
                </Dropdown>
            ),
        },
    ];

    return (
        <Table
            columns={columns}
            dataSource={data}
            rowKey='id'
            loading={loading}
            pagination={false}
        />
    );
};
```

### Modal + Form bo'lagi

```tsx
const ItemFormModal = ({
    open,
    onCancel,
    onSubmit,
    loading,
    editingItem,
}: Props) => {
    const [form] = Form.useForm();
    const { t } = useLanguage();
    const isEditing = Boolean(editingItem);

    useEffect(() => {
        if (open && editingItem)
            form.setFieldsValue({
                name: editingItem.name,
                status: editingItem.status,
            });
        else if (open) form.setFieldsValue({ status: "active" }); // create uchun default
    }, [open, editingItem, form]);

    const handleCancel = () => {
        form.resetFields();
        onCancel();
    };

    return (
        <Modal
            title={isEditing ? t("item_edit") : t("item_add")}
            open={open}
            onCancel={handleCancel}
            footer={null} // ← footer'ni Form ichida o'zimiz chizamiz
            centered
            destroyOnHidden // ← eski qiymatlar qolib ketmasin
            width={480}
        >
            <Form
                form={form}
                layout='vertical'
                onFinish={onSubmit}
                autoComplete='off'
            >
                <Form.Item
                    name='name'
                    label={t("name")}
                    rules={[{ required: true, message: t("required") }]}
                >
                    <Input />
                </Form.Item>

                <Flex gap={8} justify='end'>
                    <Button onClick={handleCancel}>{t("cancel")}</Button>
                    <Button type='primary' htmlType='submit' loading={loading}>
                        {isEditing ? t("save") : t("add")}
                    </Button>
                </Flex>
            </Form>
        </Modal>
    );
};
```

### Umumiy komponent qoidalari

- **Props interfeysi har doim `Props` yoki `<Nom>Props` deb nomlanadi va fayl boshida turadi**
- `React.FC<Props>` yoki oddiy `({ a, b }: Props) =>` — loyihada bittasini tanlab, doim shunda qol
- Default eksport — sahifa/komponent uchun; named eksport — hook/util uchun
- `components/index.ts` barrel orqali qayta eksport (import'lar qisqaradi)
- Bir komponent 250 qatordan oshsa — bo'lakka ajrat

---

## 13. Global hooklar

```tsx
// useModalState — modal ochish/yopish boilerplate'ini yo'q qiladi
function useModalState() {
    const [open, setOpen] = useState(false);
    return { open, onOpen: () => setOpen(true), onClose: () => setOpen(false) };
}

// useWindowSize — responsive branching uchun
const useWindowSize = () => {
    const [size, setSize] = useState({
        width: 0,
        height: 0,
        isMobile: false,
        isTablet: false,
    });

    useLayoutEffect(() => {
        const handleSize = () =>
            setSize({
                width: window.innerWidth,
                height: window.innerHeight,
                isMobile: window.innerWidth <= 768,
                isTablet: window.innerWidth > 768 && window.innerWidth <= 992,
            });
        handleSize();
        window.addEventListener("resize", handleSize);
        return () => window.removeEventListener("resize", handleSize);
    }, []);

    return size;
};

// useDebounce — qidiruv inputlari uchun
function useDebounce<T>(value: T, delay = 400): T {
    const [debounced, setDebounced] = useState(value);
    useEffect(() => {
        const id = setTimeout(() => setDebounced(value), delay);
        return () => clearTimeout(id);
    }, [value, delay]);
    return debounced;
}
```

`useLayoutEffect` (`useEffect` emas) — birinchi paint'da noto'g'ri layout ko'rinmasligi uchun.

---

## 14. Test yozish

### Sozlash

```ts
// src/setupTests.ts
import "@testing-library/jest-dom/vitest";
```

devDeps: `vitest`, `jsdom`, `@testing-library/react`, `@testing-library/jest-dom`,
`@testing-library/user-event`.

Ishga tushirish:

```bash
npm run test                       # watch rejimi
npx vitest run                     # bir marta
npx vitest run src/utils/helpers.test.ts   # bitta fayl
```

### Nimani test qilish (ustuvorlik tartibida)

1. **Sof funksiyalar** (`utils/helpers.ts`) — formatlash, konvertatsiya, parsing. Eng arzon,
   eng foydali testlar.
2. **Umumiy komponentlar** (`components/`) — prop → render, click → callback, responsive branching.
3. **Custom hooklar** — `renderHook` bilan.
4. Sahifalar — faqat murakkab shart-sharoit mantiqi bo'lsa.

Test fayl manba yonida turadi: `helpers.ts` → `helpers.test.ts`.

### Sof funksiya testi

```ts
import { describe, expect, it } from "vitest";
import { formatPhoneNumber, formatRating } from "./helpers";

describe("formatPhoneNumber", () => {
    it("to'liq raqamni formatlaydi", () => {
        expect(formatPhoneNumber("998901234567")).toBe("(90) 123-45-67");
    });

    it("bo'sh string uchun bo'sh string qaytaradi", () => {
        expect(formatPhoneNumber("")).toBe("");
    });

    it("raqam ichidagi belgilarni tozalaydi", () => {
        expect(formatPhoneNumber("+998 (90) 123-45-67")).toBe("(90) 123-45-67");
    });
});

describe("formatRating", () => {
    // Backend numeric ustunni string qaytaradi — crash bo'lmasligi kerak
    it("string qiymatni ham formatlaydi", () => {
        expect(formatRating("4.80")).toBe("4.8");
    });

    it("null/undefined uchun tire qaytaradi", () => {
        expect(formatRating(null)).toBe("—");
        expect(formatRating(undefined)).toBe("—");
    });
});
```

**Har bir `describe` bloki uchun majburiy holatlar:** happy path, chegaraviy qiymat,
bo'sh/`null`/`undefined`, noto'g'ri tipdagi kirish.

### Komponent testi (mock bilan)

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import useWindowSize from "~hooks/useWindowSize";
import AddingButton from "./AddingButton";

type WindowSizeState = { width: number; height: number; isMobile: boolean };

// Hook mock — real window o'lchamiga bog'lanib qolmaslik uchun
vi.mock("~hooks/useWindowSize", () => ({
    default: vi.fn<() => WindowSizeState>(() => ({
        width: 1024,
        height: 768,
        isMobile: false,
    })),
}));

// Og'ir UI kutubxonani yengil stub bilan almashtirish — test tez va barqaror bo'ladi
vi.mock("antd", () => ({
    Button: ({ children, onClick, size, disabled }: any) => (
        <button onClick={onClick} data-size={size} disabled={disabled}>
            {children}
        </button>
    ),
}));

describe("AddingButton", () => {
    beforeEach(() => {
        const mock = vi.mocked(useWindowSize);
        mock.mockReset();
        mock.mockReturnValue({ width: 1024, height: 768, isMobile: false });
    });

    it("bosilganda onClick chaqiriladi", async () => {
        const user = userEvent.setup();
        const onClick = vi.fn();

        render(<AddingButton title='Add' onClick={onClick} />);
        await user.click(screen.getByRole("button", { name: /add/i }));

        expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('mobile holatda size="small" yuboradi', () => {
        vi.mocked(useWindowSize).mockReturnValue({
            width: 375,
            height: 812,
            isMobile: true,
        });

        render(<AddingButton title='Add' onClick={vi.fn()} />);

        expect(screen.getByRole("button", { name: /add/i })).toHaveAttribute(
            "data-size",
            "small",
        );
    });

    it("disabled bo'lsa onClick chaqirilmaydi", async () => {
        const user = userEvent.setup();
        const onClick = vi.fn();

        render(<AddingButton title='Add' onClick={onClick} disabled />);
        await user.click(screen.getByRole("button", { name: /add/i }));

        expect(onClick).not.toHaveBeenCalled();
    });
});
```

### Test qoidalari

- **Query ustuvorligi:** `getByRole` > `getByLabelText` > `getByText` > `getByTestId` (oxirgi chora)
- **`userEvent`, `fireEvent` emas** — real foydalanuvchi harakatiga yaqin
- Har `describe` da `beforeEach` ichida mocklarni `mockReset()` qil — testlar bir-biriga ta'sir qilmasin
- Test nomi — nima kutilishini tasvirlasin, funksiya nomini takrorlamasin
- Nostandart holat testiga sabab kommenti yoz (`// Backend ... qaytaradi`)
- Implementatsiyani emas, **xulq-atvorni** test qil (`useState` chaqirilganini emas, ekranda
  nima o'zgarganini)

### React-Query'ga bog'liq komponent testi

```tsx
const createWrapper = () => {
    const queryClient = new QueryClient({
        defaultOptions: { queries: { retry: false, cacheTime: 0 } },
    });
    return ({ children }: { children: ReactNode }) => (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
};

it("ma'lumotni yuklaydi", async () => {
    const { result } = renderHook(() => useItems(), {
        wrapper: createWrapper(),
    });
    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.itemsData).toHaveLength(2);
});
```

---

## 15. Muhit o'zgaruvchilari

```bash
# .env (git'ga qo'shilmaydi; .env.example ni commit qil)
VITE_APP_MODE=development            # development | production
VITE_API_DEVELOPMENT_URL=https://api.dev.example.com/
VITE_API_PRODUCTION_URL=https://api.example.com/
```

- Faqat `VITE_` prefiksli o'zgaruvchilar klientga yetadi
- **Hech qachon maxfiy kalitni `VITE_` ga qo'yma** — u bundle ichida ochiq ko'rinadi
- `src/vite-env.d.ts` da tiplash:
    ```ts
    /// <reference types="vite/client" />
    interface ImportMetaEnv {
        readonly VITE_APP_MODE: "development" | "production";
        readonly VITE_API_DEVELOPMENT_URL: string;
        readonly VITE_API_PRODUCTION_URL: string;
    }
    interface ImportMeta {
        readonly env: ImportMetaEnv;
    }
    ```

---

## 16. Deploy (Docker)

Ikki bosqichli build, `vite preview` orqali xizmat:

```dockerfile
######### Build #########
FROM node:lts-alpine AS build
WORKDIR /home/app/
ARG VITE_APP_MODE
ENV VITE_APP_MODE=$VITE_APP_MODE
COPY . .
RUN echo "VITE_API_DEVELOPMENT_URL=https://api.dev.example.com/" >> .env && \
    echo "VITE_API_PRODUCTION_URL=https://api.example.com/" >> .env && \
    echo "VITE_APP_MODE=${VITE_APP_MODE}" >> .env
RUN npm ci
RUN npm run build

######### Production #########
FROM node:lts-alpine
COPY --from=build /home/app/dist ./dist
COPY --from=build /home/app/node_modules node_modules
COPY --from=build /home/app/package.json package.json
COPY --from=build /home/app/index.html index.html
COPY --from=build /home/app/vite.config.ts vite.config.ts
COPY --from=build /home/app/.env .env
EXPOSE 4173
CMD ["npm", "run", "preview", "--", "--host"]
```

Env build vaqtida "pishib qoladi" — shuning uchun dev/prod uchun alohida image kerak
(`--build-arg VITE_APP_MODE=production`).

> Statik hosting (nginx / Vercel / Netlify) ishlatsangiz `dist/` ni to'g'ridan tarqating va
> SPA fallback (`/* → /index.html`) sozlang.

CI (GitHub Actions) minimal: branch → `npm ci` → `npm run lint` → `npm run test -- --run` →
`npm run build` → docker build & push.

---

## 17. Yangi feature qo'shish tartibi (checklist)

Ketma-ketlikni buzma — har bir qadam oldingisiga tayanadi:

1. **Endpointlar** → `constants/urls.ts` ga `items: { ... }` bloki qo'sh
2. **Tiplar** → `services/items/type.ts`: `ItemType`, `CreateItemBody`, `UpdateItemBody`
3. **Service hook** → `services/items/index.tsx`: `useItems()` (query + mutationlar + notification)
4. **Tarjimalar** → `i18n/index.tsx` ga kalitlar qo'sh (`item_created`, `item_delete_confirm`, ...)
5. **Sahifa** → `pages/Items/index.tsx` (orkestrator) + `sections/ItemTable.tsx`,
   `sections/ItemFormModal.tsx`
6. **Route** → `constants/routes.tsx` ga `lazy` import + massivga element
7. **Menyu** → `constants/MenuSider.tsx` ga yozuv (kerak bo'lsa)
8. **Test** → yangi util funksiya bo'lsa `*.test.ts`, yangi umumiy komponent bo'lsa `*.test.tsx`
9. **Tekshirish** → `npm run lint && npx tsc --noEmit && npx vitest run && npm run build`

---

## 18. Anti-patternlar (qilma)

| ❌ Qilma                                                  | ✅ Qil                                            |
| --------------------------------------------------------- | ------------------------------------------------- |
| Komponentda `axios` yoki `Api` ni to'g'ridan chaqirish    | Service hooki orqali                              |
| Komponentda `useQuery`/`useMutation` ni to'g'ridan yozish | `~api` generic hooki → service                    |
| URL'ni komponent ichida qattiq yozish                     | `urls` obyektidan                                 |
| antd `message`/`notification` ni statik import            | `useNotify()`                                     |
| Sahifalash/filtrni `useState` da saqlash                  | `useSearchParams` (URL'da)                        |
| `../../../components/Button`                              | `~components/Button`                              |
| Alias'ni faqat `vite.config.ts` ga qo'shish               | `tsconfig.json` ga ham                            |
| `any` bilan tez yechim                                    | Aniq tip; iloji yo'q bo'lsa `unknown` + narrowing |
| `Date` obyekti bilan sana ishlash                         | `dayjs`                                           |
| Global CSS'ga komponent stilini yozish                    | `*.module.css`                                    |
| 500 qatorli komponent                                     | `sections/` ga ajratish                           |
| Redux qo'shish                                            | Context + React-Query yetarli                     |
| Interceptor'da `clearLocalStorage()` siz redirect         | Avval tozalash, keyin redirect                    |
| Refresh so'rovini `Api` instance orqali                   | Toza `axios` bilan (rekursiyadan qochish)         |

---

## 19. Loyihani noldan boshlash

```bash
npm create vite@latest my-app -- --template react-ts
cd my-app

npm i antd @ant-design/icons axios react-query react-router-dom dayjs lucide-react
npm i -D @types/node vitest jsdom @testing-library/react @testing-library/jest-dom \
  @testing-library/user-event eslint @typescript-eslint/parser \
  @typescript-eslint/eslint-plugin eslint-plugin-react-hooks eslint-plugin-react-refresh \
  eslint-config-prettier prettier
```

Keyin shu tartibda yarat:

1. `vite.config.ts` + `tsconfig.json` (alias + vitest) — §3
2. `.eslintrc.cjs` + `.prettierrc` — §3
3. `src/` skeletini — §4
4. `styles/globals/` + `theme/` — §11
5. `api/` (axios, interceptorlar, tokenManager, generic hooklar) — §5
6. `context/` (Auth, Query, Theme, Language) + `main.tsx` — §8
7. `components/NotificationProvider.tsx`, `PageHeader.tsx`, `ui/` — §8, §12
8. `app/` (AppRoutes layout + AuthRoutes) va `constants/routes.tsx` — §9
9. Birinchi feature'ni §17 checklisti bo'yicha
