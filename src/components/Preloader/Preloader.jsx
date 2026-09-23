import { useLanguage } from '../../utils/language.js'
import './Preloader.css'

function Preloader({ message, headingRef }) {
  const { t } = useLanguage()
  return (
    <div className="preloader" role="status">
      <span className="preloader__spinner" aria-hidden="true" />
      {headingRef ? <h1 className="preloader__title" ref={headingRef} tabIndex={-1}>{message || t.loading}</h1> : <p className="preloader__message">{message || t.loading}</p>}
    </div>
  )
}

export default Preloader
