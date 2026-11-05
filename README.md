# News-Web Bazar Dor (বাজার দর)

A small news site for daily market prices in Bangladesh. It lists 33 everyday products with today's price, the change from yesterday, and the price in each market. Everything is in Bangla.

**Link**

## To Run locally

```bash
npm install
```

Create `.env.local`:

```env
BETTER_AUTH_SECRET=<openssl rand -base64 32>
BETTER_AUTH_URL=http://localhost:3001
DATABASE_URL=<postgres connection string>
```

Create the auth tables and start the dev server:

```bash
npx auth@latest migrate
npm run dev
```

Open [http://localhost:3001](http://localhost:3001). Sign up to see the product detail pages.

## What's in it

- Home page with price risers, fallers and all products
- 8 categories, with a sort-by-price dropdown
- Product detail page: lowest, highest and average price plus a per-market table (requires sign in)
- Email/password sign up, sign in, and name editing on the profile page
- Bangla numerals, mobile-friendly layout, loading skeletons
- The data comes from the API, you don't need to worry how the pages are going to be developped. Prices come from [api.api-store.workers.dev](https://api.api-store.workers.dev/api/bazardor/products) and are cached for an hour.

## Stack

Next.js (App Router), Vercel, TypeScript, Tailwind CSS, Better Auth, PostgreSQL (Neon), react-hot-toast.

```bash
npm run dev     
npm run build   
npm test        
```

