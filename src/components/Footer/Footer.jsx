import { useLanguage } from '../../utils/language.js'
import './Footer.css'

function Footer() {
  const { t } = useLanguage()
  return (
    <footer className="footer">
      <div className="footer__inner">
        <p className="footer__credit">Entre Páginas · DanielRH</p>
        <a className="footer__link" href="https://openlibrary.org">{t.footer}</a>
      </div>
    </footer>
  )
}

export default Footer
