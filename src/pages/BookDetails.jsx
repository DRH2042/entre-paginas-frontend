import { useEffect, useRef, useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { getBookDetails } from '../utils/bookDetails.js'
import './BookDetails.css'

function DetailContent({ bookId }) {
  const [state, setState] = useState({ status: 'loading' })
  const [attempt, setAttempt] = useState(0)
  const [failedCover, setFailedCover] = useState(null)
  const heading = useRef(null)

  useEffect(() => {
    const controller = new AbortController()
    let active = true
    const timeout = setTimeout(() => controller.abort(), 15000)
    getBookDetails(bookId, controller.signal)
      .then((book) => { if (active) setState({ status: 'success', book }) })
      .catch(() => { if (active) setState({ status: 'error' }) })
      .finally(() => clearTimeout(timeout))
    return () => { active = false; clearTimeout(timeout); controller.abort() }
  }, [bookId, attempt])

  useEffect(() => { heading.current?.focus() }, [state.status])

  if (state.status === 'loading') {
    return <div className="book-details__state" role="status"><h1 className="book-details__state-title" tabIndex={-1} ref={heading}>Loading book details…</h1></div>
  }
  if (state.status === 'error') {
    return (
      <div className="book-details__state" role="alert">
        <h1 className="book-details__state-title" tabIndex={-1} ref={heading}>We couldn’t load this book.</h1>
        <p>The book may be unavailable. Check your connection or try again.</p>
        <button className="book-details__retry" onClick={() => { setState({ status: 'loading' }); setAttempt((value) => value + 1) }}>Try again</button>
      </div>
    )
  }
  const { book } = state
  const cover = book.cover ? `https://covers.openlibrary.org/b/id/${book.cover}-L.jpg?default=false` : null
  return (
    <article className="book-details__layout" aria-labelledby="book-title">
      <div className="book-details__cover">
        {cover && failedCover !== cover ? <img className="book-details__image" src={cover} alt={`Cover of ${book.title}`} onError={() => setFailedCover(cover)} /> : <p className="book-details__fallback">Cover unavailable</p>}
      </div>
      <div className="book-details__content">
        <h1 className="book-details__title" id="book-title" tabIndex={-1} ref={heading}>{book.title}</h1>
        <p className="book-details__author">{book.authors || 'Unknown author'}</p>
        <p className="book-details__year">First published: {book.year || 'Year unknown'}</p>
        <section className="book-details__section" aria-labelledby="description-title">
          <h2 className="book-details__subtitle" id="description-title">About this book</h2>
          <p className="book-details__description">{book.description || 'No description available.'}</p>
        </section>
        <section className="book-details__section" aria-labelledby="subjects-title">
          <h2 className="book-details__subtitle" id="subjects-title">Subjects</h2>
          {book.subjects.length ? <ul className="book-details__subjects">{book.subjects.map((subject) => <li className="book-details__subject" key={subject}>{subject}</li>)}</ul> : <p>No subjects available.</p>}
        </section>
      </div>
    </article>
  )
}

function BookDetails() {
  const { bookId } = useParams()
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q') || ''
  const backUrl = query ? `/search?${new URLSearchParams({ q: query })}` : '/search'
  return (
    <div className="book-details">
      <Link className="book-details__back" to={backUrl}>← Back to search results</Link>
      <DetailContent key={bookId} bookId={bookId} />
    </div>
  )
}

export default BookDetails
