import { useLanguage } from '../../utils/language.js'
import { NavLink } from 'react-router-dom'
import './Navigation.css'

function Navigation() {
  const { t, language, changeLanguage } = useLanguage()
  return (
    <nav className="navigation" aria-label={t.navigation}>
      <NavLink className="navigation__link" to="/" end>{t.home}</NavLink>
      <NavLink className="navigation__link" to="/search">{t.search}</NavLink>
      <div className="navigation__languages" role="group" aria-label={t.language}>
        <button className="navigation__language" type="button" lang="es" aria-label="Español" aria-pressed={language === 'es'} onClick={() => changeLanguage('es')}>ES</button>
        <span aria-hidden="true">/</span>
        <button className="navigation__language" type="button" lang="en" aria-label="English" aria-pressed={language === 'en'} onClick={() => changeLanguage('en')}>EN</button>
      </div>
    </nav>
  )
}

export default Navigation
