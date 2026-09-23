import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import BookCard from '../components/BookCard.jsx'
import SearchForm from '../components/SearchForm.jsx'
import { searchBooks } from '../utils/openLibrary.js'
import './SearchResults.css'

function SearchRequest({ query }) {
  const [state, setState] = useState({ status: 'loading', books: [] })
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    const controller = new AbortController()
    let active = true
    const timeout = setTimeout(() => controller.abort(), 15000)

    searchBooks(query, controller.signal)
      .then((books) => {
        if (active) setState({ status: 'success', books })
      })
      .catch(() => {
        if (active) setState({ status: 'error', books: [] })
      })
      .finally(() => clearTimeout(timeout))

    return () => {
      active = false
      clearTimeout(timeout)
      controller.abort()
    }
  }, [query, attempt])

  function retry() {
    setState({ status: 'loading', books: [] })
    setAttempt((value) => value + 1)
  }

  if (state.status === 'loading') {
    return <div className="search-results__state" role="status"><span className="search-results__spinner" aria-hidden="true" /><p>Looking through the shelves…</p></div>
  }
  if (state.status === 'error') {
    return (
      <div className="search-results__state" role="alert">
        <h2 className="search-results__state-title">We couldn’t load the books.</h2>
        <p>Please check your connection and try again.</p>
        <button className="search-results__retry" type="button" onClick={retry}>Try again</button>
      </div>
    )
  }
  if (!state.books.length) {
    return <div className="search-results__state" role="status"><h2 className="search-results__state-title">No books found.</h2><p>Try another title, author, or a different spelling.</p></div>
  }
  return (
    <>
      <p className="search-results__summary" role="status">Showing {state.books.length} {state.books.length === 1 ? 'book' : 'books'} · Up to 24 relevant matches from Open Library</p>
      <ul className="search-results__grid">
        {state.books.map((book, index) => <li className="search-results__item" key={book.key || index}><BookCard book={book} /></li>)}
      </ul>
    </>
  )
}

function SearchResults() {
  const [searchParams, setSearchParams] = useSearchParams()
  const query = (searchParams.get('q') || '').trim()

  return (
    <div className="search-results">
      <header className="search-results__header">
        <p className="search-results__eyebrow">Between the pages</p>
        <h1 className="search-results__title">{query ? `Results for “${query}”` : 'Find your next story.'}</h1>
        <SearchForm key={query} initialQuery={query} onSearch={(value) => setSearchParams({ q: value })} />
      </header>
      {query ? <SearchRequest key={query} query={query} /> : <p className="search-results__state">Enter a book title or author to explore Open Library.</p>}
    </div>
  )
}

export default SearchResults
