const SEARCH_ENDPOINT = 'https://openlibrary.org/search.json'

export async function searchBooks(query, signal) {
  const params = new URLSearchParams({
    q: query,
    fields: 'key,title,author_name,first_publish_year,cover_i',
    limit: '24',
  })
  const response = await fetch(`${SEARCH_ENDPOINT}?${params}`, { signal })
  if (!response.ok) throw new Error(`Search failed (${response.status})`)
  const data = await response.json()
  if (!Array.isArray(data.docs)) throw new Error('Invalid search response')
  return data.docs.filter((book) => book && typeof book === 'object')
}
