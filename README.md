# Entre Páginas

Entre Páginas is a responsive React application for discovering books by title, author, or subject using the Open Library API.

## Tech Stack
- React
- Vite
- React Router
- Open Library API

  
The app includes a shared Header, responsive Home layout, reusable SearchForm and BookCard, and live Open Library search results.

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
- `/search?q=...`: search results for the URL query.

## Source structure

- `src/components/`: reusable Header, SearchForm, and BookCard components.
- `src/pages/`: route pages.
- `src/utils/`: Open Library API helper.
- `src/styles/`: global styles.

The form trims and validates the query, then navigates to `/search?q=...`.
The search page reads the trimmed `q` parameter using React Router's `useSearchParams`.
An empty query shows a search prompt without requesting data.

## Book search

Requests use `https://openlibrary.org/search.json` with `q`, a limit of 24,
and the fields `key,title,author_name,first_publish_year,cover_i`.
See the [Open Library Search API documentation](https://openlibrary.org/dev/docs/api/search).
Covers use `https://covers.openlibrary.org/b/id/{cover_i}-M.jpg?default=false`.

- A loading indicator appears while a request is pending.
- Failed requests and the 15-second timeout show an error with a retry button.
- Empty results suggest trying another title, author, or spelling.
- Missing or failed covers show a placeholder; missing author/year show explicit fallbacks.
- Query changes cancel the old request and prevent stale results from appearing.
- The book grid adapts from four columns to three, two, and one on smaller screens.

No book detail view is implemented.
