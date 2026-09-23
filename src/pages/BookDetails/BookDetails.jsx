import { useLanguage } from '../../utils/language.js'
import { useEffect, useRef, useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { getBookDetails } from '../../utils/bookDetails.js'
import Preloader from '../../components/Preloader/Preloader.jsx'
import './BookDetails.css'

function DetailContent({ bookId }) {
  const { t } = useLanguage()
  const [state, setState] = useState({ status: 'loading' })
  const [attempt, setAttempt] = useState(0)
  const [failedCover, setFailedCover] = useState(null)
  const heading = useRef(null)
  const shouldFocusHeading = useRef(true)

  useEffect(() => {
    const controller = new AbortController()
    let active = true
    const timeout = setTimeout(() => controller.abort(), 15000)
    function finish(nextState) {
      if (!active) return
      shouldFocusHeading.current = document.activeElement === heading.current
      setState(nextState)
    }
    getBookDetails(bookId, controller.signal)
      .then((book) => finish({ status: 'success', book }))
      .catch(() => finish({ status: 'error' }))
      .finally(() => clearTimeout(timeout))
    return () => { active = false; clearTimeout(timeout); controller.abort() }
  }, [bookId, attempt])

  useEffect(() => {
    if (shouldFocusHeading.current) heading.current?.focus()
  }, [state.status])

  if (state.status === 'loading') {
    return <Preloader message={t.detailLoading} headingRef={heading} />
  }
  if (state.status === 'error') {
    return (
      <div className="book-details__state" role="alert">
        <h1 className="book-details__state-title" tabIndex={-1} ref={heading}>{t.detailError}</h1>
        <p>{t.detailErrorHint}</p>
        <button className="book-details__retry" onClick={() => { shouldFocusHeading.current = true; setState({ status: 'loading' }); setAttempt((value) => value + 1) }}>{t.retry}</button>
      </div>
    )
  }
  const { book } = state
  const cover = book.cover ? `https://covers.openlibrary.org/b/id/${book.cover}-L.jpg?default=false` : null
  return (
    <article className="book-details__layout" aria-labelledby="book-title">
      <div className="book-details__cover">
        {cover && failedCover !== cover ? <img className="book-details__image" src={cover} alt={t.coverAlt(book.title || t.untitled)} onError={() => setFailedCover(cover)} /> : <p className="book-details__fallback">{t.coverUnavailable}</p>}
      </div>
      <div className="book-details__content">
        <h1 className="book-details__title" id="book-title" tabIndex={-1} ref={heading}>{book.title || t.untitled}</h1>
        <p className="book-details__author">{book.authors || t.unknownAuthor}</p>
        <p className="book-details__year">{t.published} {book.year || t.unknownYear}</p>
        <section className="book-details__section" aria-labelledby="description-title">
          <h2 className="book-details__subtitle" id="description-title">{t.aboutBook}</h2>
          <p className="book-details__description">{book.description || t.noDescription}</p>
        </section>
        <section className="book-details__section" aria-labelledby="subjects-title">
          <h2 className="book-details__subtitle" id="subjects-title">{t.subjects}</h2>
          {book.subjects.length ? <ul className="book-details__subjects">{book.subjects.map((subject) => <li className="book-details__subject" key={subject}>{subject}</li>)}</ul> : <p>{t.noSubjects}</p>}
        </section>
      </div>
    </article>
  )
}

function BookDetails() {
  const { t } = useLanguage()
  const { bookId } = useParams()
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q') || ''
  const backUrl = query ? `/search?${new URLSearchParams({ q: query })}` : '/search'
  return (
    <div className="book-details">
      <Link className="book-details__back" to={backUrl}>{t.back}</Link>
      <DetailContent key={bookId} bookId={bookId} />
    </div>
  )
}

export default BookDetails
