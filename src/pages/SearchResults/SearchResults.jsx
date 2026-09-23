import { useLanguage } from '../../utils/language.js'
import { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import BookCard from '../../components/BookCard/BookCard.jsx'
import SearchForm from '../../components/SearchForm/SearchForm.jsx'
import { searchBooks } from '../../utils/openLibrary.js'
import Preloader from '../../components/Preloader/Preloader.jsx'
import './SearchResults.css'

function SearchRequest({ query, onRetry }) {
  const { t } = useLanguage()
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
    onRetry()
  }

  if (state.status === 'loading') {
    return <Preloader message={t.searchLoading} />
  }
  if (state.status === 'error') {
    return (
      <div className="search-results__state" role="alert">
        <h2 className="search-results__state-title">{t.searchError}</h2>
        <p>{t.connection}</p>
        <button className="search-results__retry" type="button" onClick={retry}>{t.retry}</button>
      </div>
    )
  }
  if (!state.books.length) {
    return <div className="search-results__state" role="status"><h2 className="search-results__state-title">{t.noResults}</h2><p>{t.noResultsHint}</p></div>
  }
  return (
    <>
      <p className="search-results__summary" role="status">{t.summary(state.books.length)}</p>
      <ul className="search-results__grid">
        {state.books.map((book, index) => <li className="search-results__item" key={book.key || index}><BookCard book={book} /></li>)}
      </ul>
    </>
  )
}

function SearchResults() {
  const { t } = useLanguage()
  const [searchParams, setSearchParams] = useSearchParams()
  const query = (searchParams.get('q') || '').trim()
  const heading = useRef(null)

  useEffect(() => { heading.current?.focus() }, [query])

  return (
    <div className="search-results">
      <header className="search-results__header">
        <p className="search-results__eyebrow">{t.resultsEyebrow}</p>
        <h1 className="search-results__title" ref={heading} tabIndex={-1}>{query ? t.resultsTitle(query) : t.searchTitle}</h1>
        <SearchForm key={query} initialQuery={query} onSearch={(value) => setSearchParams({ q: value })} />
      </header>
      {query ? <SearchRequest key={query} query={query} onRetry={() => heading.current?.focus()} /> : <p className="search-results__state">{t.searchPrompt}</p>}
    </div>
  )
}

export default SearchResults
