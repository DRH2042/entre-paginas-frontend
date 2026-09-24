# Entre Páginas

Entre Páginas is a responsive book discovery application built as a TripleTen final project. Readers can search the Open Library catalog, explore book details, and return to their search results without losing their query.

## Live Demo

[Visit Entre Páginas](https://entre-paginas-frontend.vercel.app)

## Main Features

- Search for books by title, author, or keyword.
- Browse up to 24 results with covers, titles, authors, and first publication years.
- Open a dedicated book detail page with a description and up to 12 subjects when available.
- Share or revisit search and detail URLs; the search query is preserved when returning from a detail page.
- See loading indicators, helpful error messages with retry controls, and no-results guidance.
- View fallback text when metadata or cover images are unavailable.

## Technologies

- React and JavaScript (ES modules)
- Vite for local development and production builds
- React Router for client-side navigation
- Semantic HTML and CSS with BEM naming, Grid, Flexbox, and media queries
- Fetch API and AbortController for network requests
- Open Library for book data and covers
- Oxlint for linting

This is a front-end-only application. It has no custom backend, authentication, or database.

## Open Library API Usage

The app requests public Open Library data directly from the browser. No API key or environment variables are required.

| Purpose | Endpoint |
| --- | --- |
| Search and supplementary author/year metadata | `https://openlibrary.org/search.json` |
| Work details | `https://openlibrary.org/works/{workId}.json` |
| Cover images | `https://covers.openlibrary.org/b/id/{coverId}-{size}.jpg?default=false` |

Search requests send `q`, `limit=24`, and the fields `key,title,author_name,first_publish_year,cover_i`. Details use a validated work ID from the search result, such as `OL27482W`. Covers use medium images for cards and large images for details.

Requests have a 15-second timeout and are cancelled when no longer needed. Missing data and failed cover images have fallbacks. An internet connection and Open Library availability are required for live results.

API documentation: [Search](https://openlibrary.org/dev/docs/api/search), [Works](https://openlibrary.org/dev/docs/api/books), and [Covers](https://openlibrary.org/dev/docs/api/covers).

## Main Routes

| Route | Page |
| --- | --- |
| `/` | Home and search form |
| `/search?q=...` | Results for the search query; a search prompt appears when `q` is empty |
| `/book/:bookId` | Book details for an Open Library work ID |

Detail links include `?q=...` to preserve the originating search. Direct detail URLs also work without a search query.

## Installation

Prerequisites: Git, npm, and Node.js 22.12 or later.

```sh
git clone https://github.com/DRH2042/entre-paginas-frontend.git
cd entre-paginas-frontend
npm ci
```

## Run Locally

```sh
npm run dev
```

Open the local URL printed by Vite in the terminal.

## Production Build and Checks

```sh
npm run build
```

The production files are generated in `dist/`. To preview the build locally:

```sh
npm run preview
```

To lint the source code:

```sh
npm run lint
```

## Project Structure

```text
src/
├── components/    # App, Main, Header, Navigation, About, Footer, Preloader, and shared UI
├── images/        # Local SVG favicon
├── pages/         # Home, SearchResults, and BookDetails pages and styles
├── utils/         # Open Library requests and detail-data normalization
├── vendor/        # Local WOFF fonts, @font-face rules, and font licenses
├── styles/        # Global styles and design variables
└── main.jsx       # React entry point and router setup
```

Each component and page has its own directory containing JSX and CSS. Local Lora and Arimo WOFF fonts are bundled with their licenses; no remote font service is used.

## Responsive Design

The layout was reviewed at 1280px, 768px, 375px, and 320px. The results grid adapts from four columns to three, two, and one as space decreases. Search controls stack on mobile, and book details move from a two-column layout to a single column. Warm ivory, forest green, and serif headings give the interface a consistent literary style.

## Accessibility

- Semantic page landmarks, headings, and labeled form controls.
- Keyboard-accessible links and buttons with visible focus outlines.
- A skip-to-content link and focus handling for search navigation and detail updates.
- Descriptive cover-image alt text; decorative Home artwork is hidden from assistive technology.
- Status and alert roles for loading, empty results, validation, and errors.
- Reduced-motion support for the search loading indicator.

## Author

DanielRH — [DRH2042 on GitHub](https://github.com/DRH2042)
