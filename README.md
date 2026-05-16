# Statistics Study Scheme Planner

Interactive planner for the CUHK-SZ Statistics major (2025–26 intake and thereafter).

## Use online (for students)

**https://kwtsang101016.github.io/sta2026_study_scheme_planner/**

### One-time setup (repo owner only)

The site returns 404 until GitHub Pages is turned on:

1. Open **[Repository Settings → Pages](https://github.com/kwtsang101016/sta2026_study_scheme_planner/settings/pages)**
2. Under **Build and deployment → Source**, choose **Deploy from a branch**
3. **Branch:** `gh-pages` · **Folder:** `/ (root)` · click **Save**
4. Wait 1–2 minutes, then open the link above

After each push to `main`, the [Deploy workflow](https://github.com/kwtsang101016/sta2026_study_scheme_planner/actions) updates the site automatically.

### Add an icon on your phone (recommended for students)

**iPhone (Safari):** open the link → tap **Share** → **Add to Home Screen** → **Add**.

**Android (Chrome):** open the link → menu **⋮** → **Install app** or **Add to Home screen**.

The app opens full-screen from the **STA Planner** icon. A short hint appears on first visit on mobile.

## Run locally

```bash
npm install
npm run dev
```

Open http://127.0.0.1:3000/

## Build

```bash
npm run build
npm run preview
```

## Stack

- React + TypeScript + Vite
