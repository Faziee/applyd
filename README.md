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

## Design decisions

**Calm over loud.** Job hunting is stressful, so the interface should feel the opposite. The base is a warm off-white paper colour with soft charcoal text instead of pure black and white.

**Colour has a job.** Pastels are only used to show the status of an application (to apply, applied, interview, offer, rejected). Lavender is only used for the main action on a screen. That way colour always means something.

**Warmth in the details.** A soft serif (Fraunces) for headings with italic accents, small hand-drawn squiggles, organic background shapes and friendly empty states make the app feel personal instead of generic.

**AI suggests, you decide.** Pasting a posting pre-fills the form, but nothing is saved until you've seen it. Filled-in fields get a small sparkle next to the label that disappears as soon as you edit them, so you always know what came from the app and what you typed yourself. The AI is told to never guess: anything not in the posting stays empty.

**One source of truth.** Every status is defined once in `src/lib/statuses.js`, and all colours, fonts and shapes live as tokens in `src/index.css`. Components only use those tokens.
