# BTS Media — Vendor kabineti

React + TypeScript + Vite + Ant Design + React-Query asosidagi SPA.
Arxitektura `.claude/SKILL.md` (react-admin-boilerplate) andozasiga to'liq mos.

## Boshlash

```bash
cp .env.example .env
npm install
npm run dev          # http://localhost:5174
```

> Portlar `admin` bilan to'qnashmasligi uchun: dev **5174**, preview **4174**
> (`admin` — 5173 / 4173).

## Skriptlar

| Buyruq             | Nima qiladi                                       |
| ------------------ | ------------------------------------------------- |
| `npm run dev`      | Dev server (5174)                                 |
| `npm run build`    | `tsc && vite build` — TS xatosi build'ni to'xtatadi |
| `npm run preview`  | `dist/` ni 4174 portda serve qiladi               |
| `npm run lint`     | ESLint, `--max-warnings 0`                        |
| `npm run test`     | Vitest watch rejimida                             |
| `npm run test:run` | Vitest bir marta                                  |

To'liq tekshiruv (har feature'dan keyin):

```bash
npm run lint && npx tsc --noEmit && npx vitest run && npm run build
```

## Struktura

```
src/
├── api/          # HTTP qatlami — axios FAQAT shu yerda import qilinadi
├── app/          # AppRoutes (himoyalangan layout) / AuthRoutes
├── components/   # Umumiy UI (barrel: ~components/index)
├── constants/    # urls, routes, MenuSider, data
├── context/      # Auth / Query / Theme / Language
├── hooks/        # useLanguage, useWindowSize, useModalState, useDebounce
├── i18n/         # { key: { uz, ru, en } }
├── pages/        # Dashboard, Items, Settings, Login, NotFound
├── services/     # Feature bo'yicha API hooklar (auth, items)
├── styles/       # globals: reset, tokens, base, utilities, antd-overrides
├── theme/        # antd ThemeConfig + Colors + statusColors
├── types/        # Global generic tiplar
└── utils/        # helpers, cn (+ testlar yonida)
```

## Muhim qoidalar

- Komponent **hech qachon** `axios`/`Api` yoki `~api` generic hookini to'g'ridan chaqirmaydi —
  faqat `~services/<feature>` orqali.
- Endpointlar faqat `constants/urls.ts` da.
- antd `message`/`notification` statik import qilinmaydi — `useNotify()` (istisno:
  `api/ErrorInterceptor.ts`, u React tree'dan tashqarida).
- Sahifalash/filtr holati `useState` da emas, **URL query-string**'da (`useSearchParams`).
- Yangi alias qo'shsangiz — `vite.config.ts` VA `tsconfig.json` ikkalasiga ham.
- Sana bilan ishlash — faqat `dayjs`.

## Yangi feature qo'shish (SKILL.md §17)

1. `constants/urls.ts` → endpoint bloki
2. `services/<feature>/type.ts` → `XType`, `CreateXBody`, `UpdateXBody`
3. `services/<feature>/index.tsx` → query + mutatsiyalar + notification
4. `i18n/index.tsx` → tarjima kalitlari
5. `pages/<Page>/index.tsx` (orkestrator) + `sections/*`
6. `constants/routes.tsx` → `lazy` import + massivga element
7. `constants/MenuSider.tsx` → menyu yozuvi
8. Test: util → `*.test.ts`, umumiy komponent → `*.test.tsx`
9. Yuqoridagi to'liq tekshiruvni ishga tushiring

`items` — namunaviy feature. O'z entity'ngiz bilan almashtiring (`Item` → `Media`, `Order`, ...).

## Hali ulanmagan joylar

- `pages/Dashboard` — ko'rsatkichlar hozircha statik. Backend tayyor bo'lgach
  `urls.stats.overview` uchun `services/stats/` hookini yozing va shu massivni almashtiring.
- `urls.profile` — endpointlar tayyor, service hooki yozilmagan (`Settings` sahifasi hozircha
  faqat `AuthProvider` ma'lumotini ko'rsatadi).

## Deploy

```bash
docker build --build-arg VITE_APP_MODE=production -t bts-vendor .
docker run -p 4174:4174 bts-vendor
```

Env build vaqtida "pishib qoladi" — dev/prod uchun alohida image kerak.
