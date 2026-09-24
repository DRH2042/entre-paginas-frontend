import { useLanguage } from '../../utils/language.js'
import { useId, useState } from 'react'
import './SearchForm.css'

function SearchForm({ onSearch, initialQuery = '' }) {
  const { t } = useLanguage()
  const inputId = useId()
  const [query, setQuery] = useState(initialQuery)
  const [error, setError] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    const trimmedQuery = query.trim()
    if (!trimmedQuery) {
      setError('validation')
      return
    }
    setError('')
    onSearch(trimmedQuery)
  }

  return (
    <form className="search-form" role="search" noValidate onSubmit={handleSubmit}>
      <label className="search-form__label" htmlFor={inputId}>{t.searchLabel}</label>
      <div className="search-form__controls">
        <input
          className="search-form__input"
          id={inputId}
          name="q"
          type="search"
          placeholder={t.placeholder}
          value={query}
          onChange={(event) => { setQuery(event.target.value); setError('') }}
          required
          aria-invalid={Boolean(error)}
          aria-describedby={`${inputId}-hint${error ? ` ${inputId}-error` : ''}`}
        />
        <button className="search-form__button" type="submit">{t.searchButton} <span aria-hidden="true">↗</span></button>
      </div>
      <p className="search-form__hint" id={`${inputId}-hint`}>{t.searchHint}</p>
      {error && <p className="search-form__error" id={`${inputId}-error`} role="alert">{t[error]}</p>}
    </form>
  )
}

export default SearchForm
