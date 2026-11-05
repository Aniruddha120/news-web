# বাজার দর — Bazar Dor

দৈনিক বাজারদরের দাম এক নজরে দেখার ওয়েব অ্যাপ। ৩৩টি নিত্যপ্রয়োজনীয় পণ্যের আজকের দাম, গতকালের সাথে পরিবর্তন, কোনটা বেড়েছে/কমেছে, আর কোন বাজারে কত — সব এক জায়গায় বাংলায়।

> Programming Hero — Assignment 7

## 🔗 Live Site

> 🚧 Vercel-এ deploy চলছে — URL deploy শেষ হলে এখানে যোগ হবে।

## ✨ Features

| ফিচার | বিবরণ |
|---|---|
| হোম পেজ | টিকার, দাম বাড়া/কমা পণ্যের তালিকা, সব পণ্যের গ্রিড |
| ক্যাটাগরি পেজ | ৮টি ক্যাটাগরি; দাম অনুযায়ী সাজানোর ড্রপডাউন (কম → বেশি / বেশি → কম) ✅ C1 |
| পণ্যের বিস্তারিত | সর্বনিম্ন, সর্বোচ্চ ও গড় দাম + বাজারভিত্তিক টেবিল |
| প্রোটেক্টেড রুট | সাইন ইন ছাড়া বিস্তারিত পেজে ঢোকা যায় না — toast + সাইন ইন পেজে রিডাইরেক্ট |
| অথেনটিকেশন | Better Auth — ইমেইল/পাসওয়ার্ড দিয়ে সাইন আপ ও সাইন ইন |
| প্রোফাইল | নিজের নাম আপডেট, ইমেইল দেখা ✅ C3 |
| বাংলা সংখ্যা | `Intl.NumberFormat("bn-BD")` — ১,২৩৪ / ৫.২% |
| UX | স্কেলেটন লোডিং, react-hot-toast নোটিফিকেশন, সম্পূর্ণ রেসপন্সিভ, কাস্টম ৪০৪ পেজ |
| পারফরম্যান্স | Next.js `use cache` + Partial Prerendering — পণ্যের দাম ঘণ্টায় একবার রিফ্রেশ হয় |

## 🧰 Tech Stack

- **Next.js 16** (App Router, Cache Components, Partial Prerendering)
- **React 19** + **TypeScript**
- **Tailwind CSS v4**
- **Better Auth** (ইমেইল/পাসওয়ার্ড) + **PostgreSQL** (Neon)
- **react-hot-toast**
- **Node.js built-in test runner** (`node --test`)

## 🚀 Local Setup

```bash
git clone https://github.com/Aniruddha120/news-web.git
cd news-web
npm install
```

প্রজেক্ট root-এ `.env.local` ফাইল তৈরি করো:

```env
BETTER_AUTH_SECRET=<openssl rand -base64 32>
BETTER_AUTH_URL=http://localhost:3001
DATABASE_URL=postgresql://user:password@host/db?sslmode=require
```

তারপর ডেটাবেসে টেবিল তৈরি করে ডেভ সার্ভার চালাও:

```bash
npx auth@latest migrate
npm run dev
```

খোলো — [http://localhost:3001](http://localhost:3001)

## 📜 Scripts

| কমান্ড | কাজ |
|---|---|
| `npm run dev` | ডেভ সার্ভার |
| `npm run build` | প্রোডাকশন বিল্ড |
| `npm start` | বিল্ড করা অ্যাপ চালানো |
| `npm test` | `src/**/*.test.mts` টেস্ট (node:test) |
| `npm run lint` | ESLint |

## 📁 Project Structure

```
src/
├── app/
│   ├── page.tsx                    # হোম — টিকার, রাইজার/ফ্যালার, সব পণ্য
│   ├── layout.tsx                  # Navbar, ফন্ট, Toaster
│   ├── loading.tsx                 # হোম স্কেলেটন
│   ├── not-found.tsx               # কাস্টম ৪০৪
│   ├── category/[slug]/            # ক্যাটাগরি + sort (C1)
│   ├── product/[slug]/             # প্রোটেক্টেড ডিটেইল পেজ
│   ├── profile/                    # প্রোফাইল + নাম আপডেট (C3)
│   ├── signin/ · signup/           # Better Auth ফর্ম
│   └── api/auth/[...all]/          # Better Auth handler
├── components/                     # Navbar, Ticker, ProductCard, Protected …
└── lib/
    ├── api.ts                      # ডেটা ফেচ + `use cache`
    ├── select.ts                   # risers / fallers / sortByPrice / priceStats
    ├── format.ts                   # বাংলা সংখ্যা, টাকা, শতাংশ
    └── auth.ts · auth-client.ts    # Better Auth সার্ভার/ক্লায়েন্ট
```

## 📡 ডেটা সোর্স

- `GET https://api.api-store.workers.dev/api/bazardor/products`
- `GET https://api.api-store.workers.dev/api/bazardor/categories`

পণ্যের সংখ্যা ও দাম API থেকে আসে; পেজগুলো `use cache` + `cacheLife("hours")` দিয়ে ঘণ্টায় একবার রিফ্রেশ হয়।

## 🔐 Authentication Notes

- সেশন ক্লায়েন্টে `authClient.useSession()` দিয়ে পড়া হয়, তাই পেজগুলো স্ট্যাটিক/প্রিরেন্ডার থাকতে পারে।
- `/product/[slug]` এবং `/profile` — `Protected` কম্পোনেন্ট দিয়ে ঘেরা; সেশন না থাকলে toast দেখিয়ে `/signin`-এ পাঠায়।
- পাসওয়ার্ড Better Auth নিজে হ্যাশ করে Postgres-এ রাখে (কমপক্ষে ৮ অক্ষর)।
- Deploy করার সময় Vercel-এ `DATABASE_URL`, `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL` — তিনটি env variable বসাতে হবে (`BETTER_AUTH_URL` = deployed URL)।
