# applyd.

A calm, warm tracker for your internship hunt. Paste a job posting, check the details, and keep every application organised in one place.

> Work in progress.

## Tech

- React + Vite
- Tailwind CSS (design tokens in `src/index.css`)
- Fonts: Fraunces and Inter

## Run it locally

```bash
npm install
npm run dev
```

Without an AI key the app runs in **demo mode**: pasted postings are read with simple rules (`src/lib/extract.js`).

## AI setup (optional)

Applyd uses Google Gemini to read job postings. The key stays on the server: the browser talks to a small serverless function (`api/extract.js`), and only that function knows the key.

1. Create a free key in Google AI Studio.
2. **On Vercel:** Project settings, Environment variables, add `GEMINI_API_KEY`.
3. **Locally:** copy `.env.example` to `.env`, paste your key there, and run `vercel dev` instead of `npm run dev`.

`.env` is in `.gitignore`, so the key never ends up on GitHub. If the AI is missing, slow or fails, the app quietly falls back to demo mode.
