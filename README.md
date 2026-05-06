# Level Up to Losing
### A multimodal research project on video game gambling and adolescents

## Tech Stack
- [Astro](https://astro.build/) — static site framework
- React — for interactive islands (roulette wheel, popup ads)
- Pure CSS animations — parallax, pixel art, transitions
- GitHub Pages — free hosting via GitHub Actions

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm

### Install & Run Locally
```bash
npm install
npm run dev
```
Open http://localhost:4321

### Build for Production
```bash
npm run build
npm run preview   # preview the built site locally
```

---

## Deploying to GitHub Pages

1. Create a new GitHub repo (e.g. `gambling-project`)
2. Update `astro.config.mjs` — change `base` to match your repo name:
   ```js
   base: '/your-repo-name',
   ```
3. Push to `main`
4. In your repo: **Settings → Pages → Source → GitHub Actions**
5. The workflow in `.github/workflows/deploy.yml` handles the rest automatically

Your site will be live at: `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME`

---

## Project Structure

```
src/
├── pages/
│   └── index.astro         ← main page (assembles chapters)
├── components/
│   ├── Hero.astro           ← full-screen title card
│   ├── Nav.astro            ← fixed chapter progress nav
│   ├── ChapterOne.astro     ← The Beginning (pixel game)
│   ├── ChapterTwo.astro     ← The Hook (loot boxes + parallax)
│   ├── ChapterThree.astro   ← The Blur (casino, roulette)
│   ├── ChapterFour.astro    ← The Research (essay + stats)
│   ├── ChapterFive.astro    ← The Reflection (conclusion)
│   ├── RouletteWheel.jsx    ← React island: spinning roulette
│   └── PopupAd.jsx          ← React island: fake casino popup
├── layouts/
│   └── BaseLayout.astro     ← shared HTML shell
└── styles/
    └── global.css           ← design tokens + fonts
```

## TODO Checklist
- [ ] Replace all `<!-- TODO -->` placeholder text with your actual essay content
- [ ] Update statistics and citations with your real sources
- [ ] Update the counter target in `ChapterFive.astro` with your actual stat
- [ ] Add your works cited entries in `ChapterFour.astro`
- [ ] Update `base` in `astro.config.mjs` with your repo name
- [ ] Enable GitHub Pages in repo settings (Settings → Pages → GitHub Actions)
