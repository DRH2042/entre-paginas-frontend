import { searchBooks } from './openLibrary.js'

export function getWorkId(key) {
  return typeof key === 'string' ? key.match(/^(?:\/works\/)?(OL\d+W)$/)?.[1] || null : null
}

export async function getBookDetails(id, signal) {
  if (!getWorkId(id)) throw new Error('Invalid work ID')
  const response = await fetch(`https://openlibrary.org/works/${id}.json`, { signal })
  if (!response.ok) throw new Error(`Details failed (${response.status})`)
  const work = await response.json()
  if (!work || typeof work !== 'object' || Array.isArray(work) || work.error) throw new Error('Invalid work response')
  // Search metadata supplies author names and the earliest publication year,
  // which are often absent from the work record. It is optional enrichment.
  let summary
  try {
    const books = await searchBooks(`key:/works/${id}`, signal)
    summary = books.find((book) => getWorkId(book.key) === id)
  } catch (error) {
    if (signal?.aborted) throw error
  }
  const text = (value) => typeof value === 'string' ? value.trim() : ''
  return {
    title: text(work.title) || text(summary?.title) || 'Untitled book',
    authors: Array.isArray(summary?.author_name) ? summary.author_name.filter((name) => text(name)).join(', ') : '',
    year: summary?.first_publish_year || text(work.first_publish_date).match(/\b\d{4}\b/)?.[0] || '',
    cover: (Array.isArray(work.covers) && work.covers.find((cover) => Number.isInteger(cover) && cover > 0)) || summary?.cover_i || null,
    description: text(work.description) || text(work.description?.value),
    subjects: Array.isArray(work.subjects) ? [...new Set(work.subjects.map(text).filter(Boolean))].slice(0, 12) : [],
  }
}
