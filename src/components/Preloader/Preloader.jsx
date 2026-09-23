import './Preloader.css'

function Preloader({ message = 'Loading…', headingRef }) {
  return (
    <div className="preloader" role="status">
      <span className="preloader__spinner" aria-hidden="true" />
      {headingRef ? <h1 className="preloader__title" ref={headingRef} tabIndex={-1}>{message}</h1> : <p className="preloader__message">{message}</p>}
    </div>
  )
}

export default Preloader
