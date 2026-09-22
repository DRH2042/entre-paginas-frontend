# Entre Páginas

Entre Páginas is a responsive React application for discovering books by title, author, or subject using the Open Library API.

## Tech Stack
- React
- Vite
- React Router
- Open Library APIFront-end for the TripleTen final project, built with React and Vite.

  
The first UI layer includes a shared Header, responsive Home layout, and reusable SearchForm.
Open Library is the planned API; integration is not implemented yet.

## Run locally

Use Node.js 22.12+ (Vite also supports Node.js 20.19+).

```sh
npm install
npm run dev
```

## Commands

- `npm run dev`: start the development server.
- `npm run build`: create a production build in `dist/`.
- `npm run preview`: preview the production build.
- `npm run lint`: check source code with Oxlint.

## Routes

- `/`: Home page with a book search form.
- `/search`: SearchResults placeholder.

## Source structure

- `src/components/`: reusable Header and SearchForm components.
- `src/pages/`: route pages.
- `src/utils/`: utilities (empty for now).
- `src/styles/`: global styles.

The form trims and validates the query, then navigates to `/search?q=...`.
Search results remain a placeholder; no API calls are made.
