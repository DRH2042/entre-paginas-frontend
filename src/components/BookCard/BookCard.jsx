import { useLanguage } from '../../utils/language.js'
import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { getWorkId } from '../../utils/bookDetails.js'
import './BookCard.css'

function BookCard({ book }) {
  const { t } = useLanguage()
  const [searchParams] = useSearchParams()
  const workId = getWorkId(book.key)
  const query = searchParams.get('q') || ''
  const detailUrl = workId ? `/book/${workId}?${new URLSearchParams({ q: query })}` : null
  const [failedCover, setFailedCover] = useState(null)
  const title = (typeof book.title === 'string' && book.title.trim()) || t.untitled
  const authors = Array.isArray(book.author_name)
    ? book.author_name.filter((author) => typeof author === 'string' && author.trim()).join(', ')
    : ''
  const cover = book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg?default=false`
    : null

  return (
    <article className="book-card">
      <div className="book-card__cover">
        {cover && failedCover !== cover ? (
          <img className="book-card__image" src={cover} alt={t.coverAlt(title)} loading="lazy" onError={() => setFailedCover(cover)} />
        ) : (
          <div className="book-card__fallback">
            <span className="book-card__monogram" aria-hidden="true">ep.</span>
            <span>{t.coverUnavailable}</span>
          </div>
        )}
      </div>
      <h2 className="book-card__title">{detailUrl ? <Link className="book-card__link" to={detailUrl}>{title}</Link> : title}</h2>
      <p className="book-card__author">{authors || t.unknownAuthor}</p>
      <p className="book-card__year">{t.published} {book.first_publish_year || t.unknownYear}</p>
    </article>
  )
}

export default BookCard
