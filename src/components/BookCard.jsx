import { useState } from 'react'
import './BookCard.css'

function BookCard({ book }) {
  const [failedCover, setFailedCover] = useState(null)
  const title = (typeof book.title === 'string' && book.title.trim()) || 'Untitled book'
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
          <img className="book-card__image" src={cover} alt={`Cover of ${title}`} loading="lazy" onError={() => setFailedCover(cover)} />
        ) : (
          <div className="book-card__fallback">
            <span className="book-card__monogram" aria-hidden="true">ep.</span>
            <span>Cover unavailable</span>
          </div>
        )}
      </div>
      <h2 className="book-card__title">{title}</h2>
      <p className="book-card__author">{authors || 'Unknown author'}</p>
      <p className="book-card__year">First published: {book.first_publish_year || 'Year unknown'}</p>
    </article>
  )
}

export default BookCard
