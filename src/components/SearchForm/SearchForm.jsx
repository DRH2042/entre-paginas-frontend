import { useId, useState } from 'react'
import './SearchForm.css'

function SearchForm({ onSearch, initialQuery = '' }) {
  const inputId = useId()
  const [query, setQuery] = useState(initialQuery)
  const [error, setError] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    const trimmedQuery = query.trim()
    if (!trimmedQuery) {
      setError('Enter a book title or author to begin.')
      return
    }
    setError('')
    onSearch(trimmedQuery)
  }

  return (
    <form className="search-form" role="search" onSubmit={handleSubmit}>
      <label className="search-form__label" htmlFor={inputId}>Find your next read</label>
      <div className="search-form__controls">
        <input
          className="search-form__input"
          id={inputId}
          name="q"
          type="search"
          placeholder="Search by book title or author"
          value={query}
          onChange={(event) => { setQuery(event.target.value); setError('') }}
          required
          aria-invalid={Boolean(error)}
          aria-describedby={`${inputId}-hint${error ? ` ${inputId}-error` : ''}`}
        />
        <button className="search-form__button" type="submit">Search books <span aria-hidden="true">↗</span></button>
      </div>
      <p className="search-form__hint" id={`${inputId}-hint`}>A title you remember. An author you love. A place to start.</p>
      {error && <p className="search-form__error" id={`${inputId}-error`} role="alert">{error}</p>}
    </form>
  )
}

export default SearchForm
