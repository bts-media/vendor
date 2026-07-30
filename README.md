# BTS Media — Reklama beruvchi portali

Mijozlarning o'z-o'ziga xizmat ko'rsatish kabineti: kampaniya yaratish, yetkazib berishni
kuzatish, kreativlar, tahlillar va moliya.

React + TypeScript + Vite + Ant Design + React-Query. Arxitektura `.claude/SKILL.md`
(react-admin-boilerplate) andozasiga, UI esa `../files/advertiser.html` mockupiga va
`../files/brand/DESIGN-SYSTEM.md` dizayn tizimiga mos.

## Boshlash

```bash
cp .env.example .env
npm install
npm run dev          # http://localhost:5174
```

> Portlar `admin` bilan to'qnashmasligi uchun: dev **5174**, preview **4174**.

**Demo rejim:** backend (`../backend`) hali yozilmagan — istalgan login va parol bilan kiriladi,
ma'lumot mock qatlamidan keladi.

## Skriptlar

| Buyruq             | Nima qiladi                                         |
| ------------------ | --------------------------------------------------- |
| `npm run dev`      | Dev server (5174)                                   |
| `npm run build`    | `tsc && vite build` — TS xatosi build'ni to'xtatadi |
| `npm run preview`  | `dist/` ni 4174 portda serve qiladi                 |
| `npm run lint`     | ESLint, `--max-warnings 0`                          |
| `npm run test`     | Vitest watch rejimida                               |
| `npm run test:run` | Vitest bir marta                                    |

To'liq tekshiruv (har feature'dan keyin):

```bash
npm run lint && npx tsc --noEmit && npx vitest run && npm run build
```

## Sahifalar

| Yo'l              | Sahifa                | Tarkibi                                                                    |
| ----------------- | --------------------- | -------------------------------------------------------------------------- |
| `/`               | Boshqaruv paneli      | 3 KPI + kampaniyalar jadvali                                               |
| `/campaigns/new`  | Yangi kampaniya       | 3 qadamli sehrgar: Kreativ → Maqsadlash va byudjet → Ko'rib chiqish        |
| `/campaigns`      | Mening kampaniyalarim | Qidiruv, holat filtri, sahifalash, pauza/davom ettirish                    |
| `/creatives`      | Kreativlar            | Kreativ kutubxonasi, moderatsiya holati, rad etish sababi                  |
| `/analytics`      | Tahlillar             | KPI, ko'rsatishlar dinamikasi, voronka, kanal/hudud/kreativ kesimlari      |
| `/finance`        | Balans va to'lovlar   | Prepaid balans, kredit limiti, to'ldirish, hisob-fakturalar (QQS), to'lovlar |
| `/settings`       | Sozlamalar            | Tema, til, hisob ma'lumoti (sidebar profil menyusidan ochiladi)            |

## Ma'lumot qatlami — mock rejim

Backend tayyor bo'lgunicha service hooklari `~api/mock` orqali ishlaydi. React-query holatlari
(`isLoading`, `refetch`, `onSuccess`) haqiqiydek ishlaydi, shuning uchun **sahifalarga tegmasdan**
API'ga o'tiladi:

```tsx
// hozir
const { data } = useMockQuery(CAMPAIGNS_KEY, mockCampaigns);
// backend tayyor bo'lganda — shu qator almashadi
const { data } = useGetList<TResponse<CampaignType, true>>([CAMPAIGNS_KEY, search], urls.campaigns.get);
```

Har bir service ichida almashtiriladigan chaqiruv izoh bilan belgilangan. Endpointlar allaqachon
`constants/urls.ts` da yozilgan. Mock ma'lumot `services/<feature>/mock.ts` fayllarida —
raqamlar o'zaro muvofiq (qarzdorlik = to'lanmagan hisob-fakturalar yig'indisi, hudud kesimi = KPI).

## Dizayn tizimi

`styles/globals/tokens.css` — yagona haqiqat manbai, ikki qatlam:

1. **Brend shkalalari** (`--or-*`, `--tl-*`, `--sk-*`, `--nv-*`, `--ink-*`) — temaga bog'liq emas.
2. **Semantik tokenlar** (`--surface`, `--text-strong`, `--border`, `--badge-*`) — light/dark da almashadi.

Komponent CSS'i faqat 2-qatlamdan foydalanadi. `theme/Colors.ts` va `theme/index.tsx` (antd
ThemeConfig) shu qiymatlar bilan sinxron turishi kerak.

Qoidalar (brendbukdan):

- Asosiy harakat — orange `#EC691F`; tasdiqlangan — teal; ma'lumot — sky; to'q sirtlar — navy
  (qora emas).
- Ochiq fonda kichik matn har doim `700` darajada (WCAG AA) — `.badge-*` shunga tayanadi.
- Logotip qayta ranglanmaydi, gradient/soya qo'shilmaydi: `public/brand/mark.png` va to'q fonda
  `mark-white.png`.
- Shrift: Proxima Nova → mavjud bo'lmasa Figtree (Google Fonts). `Inter` ishlatilmaydi.
- **Istisno:** reklama beruvchining kreativi va avatari uning o'z brend rangida qoladi
  (`BrandMark`, kreativ eskizi) — BTS palitrasi u yerga aralashmaydi.

### Grafik ranglari

Kanal seriyalari `--chart-parcel` / `--chart-screen` tokenlarida. Palitra
`validate_palette.js` bilan tekshirilgan: yorug' rejimda ikkalasi ham yorqinlik chizig'i,
xroma va CVD ajralishidan o'tadi (ΔE 25.6 protan / 32.5 normal). Sky rangining kontrasti 3:1 dan
past bo'lgani uchun **har bir grafikda qiymatlar matn bilan ham yoziladi** — rang yolg'iz ma'no
tashimaydi. Qorong'i rejimda orange yorqinlik chizig'idan chiqib ketadi, shuning uchun eng yaqin
o'tadigan qadamga (`#E36721`) surilgan. Palitra o'zgarsa — skriptni qayta ishga tushiring.

## Struktura

```
src/
├── api/          # HTTP qatlami (axios FAQAT shu yerda) + mock.ts
├── app/          # AppRoutes (sidebar + topbar) / AuthRoutes
├── components/   # UI kit: Card, StatCard, Badge, MiniBar, SelectableCard, RegionRow…
├── constants/    # urls, routes, MenuSider, data (to'lov usullari, statuslar, QQS)
├── context/      # Auth / Query / Theme / Language / HeaderSlot
├── hooks/        # useLanguage, useWindowSize, useModalState, useDebounce
├── i18n/         # { key: { uz, ru, en } }
├── pages/        # Har sahifa — papka, murakkablari `sections/` bilan
├── services/     # Feature bo'yicha hooklar + type.ts + mock.ts
├── styles/       # globals: reset, tokens, base, utilities, antd-overrides
├── theme/        # antd ThemeConfig + Colors + status → ton
└── utils/        # helpers (so'm/ko'rsatish formatlari), cn
```

`HeaderSlotProvider` — sahifa topbar'ga o'z elementini joylashi uchun (sehrgar qadamlari
mockupdagidek topbar ichida turadi).

## Muhim qoidalar

- Komponent **hech qachon** `axios`/`Api` yoki `~api` generic hookini to'g'ridan chaqirmaydi —
  faqat `~services/<feature>` orqali.
- antd `message`/`notification` statik import qilinmaydi — `useNotify()` (istisno:
  `api/ErrorInterceptor.ts`, u React tree'dan tashqarida).
- Sahifalash/filtr holati `useState` da emas, **URL query-string**'da (`useSearchParams`).
- Yangi alias — `vite.config.ts` VA `tsconfig.json` ikkalasiga.
- Sana bilan ishlash — faqat `dayjs`. Raqamlar — `utils/helpers` formatlari
  (`105 000 so'm`, `486 mln`, `680K`).

## Atamalar

`../files/brand/PRODUCT-SPEC.md` §1 lug'ati majburiy: ko'rsatish, **tasdiqlangan ko'rsatish**,
kreativ, sur'at, skanerlash darajasi, hisob-faktura, **QQS 12%**, qarzdorlik, muddati o'tgan.
i18n kalitlari shu atamalarga bog'langan.

## Yangi feature qo'shish (SKILL.md §17)

1. `constants/urls.ts` → endpoint bloki
2. `services/<feature>/type.ts` → tiplar
3. `services/<feature>/mock.ts` → vaqtinchalik ma'lumot
4. `services/<feature>/index.tsx` → hook (query + mutatsiyalar + notification)
5. `i18n/index.tsx` → uz/ru/en kalitlari
6. `pages/<Page>/index.tsx` (orkestrator) + `sections/*`
7. `constants/routes.tsx` va kerak bo'lsa `constants/MenuSider.tsx`
8. Test: util → `*.test.ts`, umumiy komponent → `*.test.tsx`
9. To'liq tekshiruvni ishga tushiring

## Deploy

```bash
docker build --build-arg VITE_APP_MODE=production -t bts-vendor .
docker run -p 4174:4174 bts-vendor
```

Env build vaqtida "pishib qoladi" — dev/prod uchun alohida image kerak.
