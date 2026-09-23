import { useLanguage } from '../../utils/language.js'
import { NavLink } from 'react-router-dom'
import Navigation from '../Navigation/Navigation.jsx'
import './Header.css'

function Header() {
  const { t } = useLanguage()
  return (
    <header className="header">
      <a className="header__skip-link" href="#main-content">{t.skip}</a>
      <div className="header__inner">
        <NavLink className="header__brand" to="/" aria-label={t.brandHome}>
          <span className="header__mark" aria-hidden="true">ep.</span>
          <span>Entre Páginas</span>
        </NavLink>
        <Navigation />
      </div>
    </header>
  )
}

export default Header
