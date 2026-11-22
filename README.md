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

## Design decisions

**Calm over loud.** Job hunting is stressful, so the interface should feel the opposite. The base is a warm off-white paper colour with soft charcoal text instead of pure black and white.

**Colour has a job.** Pastels are only used to show the status of an application (to apply, applied, interview, offer, rejected). Lavender is only used for the main action on a screen. That way colour always means something.

**Warmth in the details.** A soft serif (Fraunces) for headings with italic accents, small hand-drawn squiggles, organic background shapes and friendly empty states make the app feel personal instead of generic.

**One source of truth.** Every status is defined once in `src/lib/statuses.js`, and all colours, fonts and shapes live as tokens in `src/index.css`. Components only use those tokens.
