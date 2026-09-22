import { NavLink } from 'react-router-dom'
import './Header.css'

function Header() {
  return (
    <header className="header">
      <a className="header__skip-link" href="#main-content">Skip to content</a>
      <div className="header__inner">
        <NavLink className="header__brand" to="/" aria-label="Entre Páginas home">
          <span className="header__mark" aria-hidden="true">ep.</span>
          <span>Entre Páginas</span>
        </NavLink>
        <nav className="header__nav" aria-label="Main navigation">
          <NavLink className="header__link" to="/" end>Home</NavLink>
          <NavLink className="header__link" to="/search">Search</NavLink>
        </nav>
      </div>
    </header>
  )
}

export default Header
