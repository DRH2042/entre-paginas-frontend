import { searchBooks } from './openLibrary.js'

export const SEARCH_CACHE_KEY = 'entre-paginas-last-search'
export const SEARCH_CACHE_MAX_AGE = 24 * 60 * 60 * 1000

function isBook(book) {
  return book && typeof book === 'object' && !Array.isArray(book)
    && typeof book.key === 'string' && /^(?:\/works\/)?OL\d+W$/.test(book.key)
    && (book.title == null || typeof book.title === 'string')
    && (book.author_name == null || (Array.isArray(book.author_name) && book.author_name.every((name) => typeof name === 'string')))
    && (book.first_publish_year == null || Number.isInteger(book.first_publish_year))
    && (book.cover_i == null || Number.isInteger(book.cover_i))
}

export function readSearchCache(query) {
  try {
    const entry = JSON.parse(localStorage.getItem(SEARCH_CACHE_KEY))
    const age = Date.now() - entry?.savedAt
    if (entry?.version !== 1 || entry.query !== query.trim()
      || !Number.isFinite(entry.savedAt) || age < 0 || age > SEARCH_CACHE_MAX_AGE
      || !Array.isArray(entry.books) || entry.books.length > 24
      || !entry.books.every(isBook)) return null
    return entry.books
  } catch {
    return null
  }
}

export function writeSearchCache(query, books) {
  if (!query.trim() || !Array.isArray(books) || books.length > 24 || !books.every(isBook)) return
  try {
    localStorage.setItem(SEARCH_CACHE_KEY, JSON.stringify({
      version: 1, query: query.trim(), books, savedAt: Date.now(),
    }))
  } catch {
    // Storage being full or disabled must not prevent a successful search.
  }
}

export async function getSearchResults(query, signal, forceRefresh = false) {
  const cached = forceRefresh ? null : readSearchCache(query)
  if (cached !== null) return cached
  const books = await searchBooks(query, signal)
  if (!signal?.aborted) writeSearchCache(query, books)
  return books
}
