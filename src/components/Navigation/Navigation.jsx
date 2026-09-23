import { NavLink } from 'react-router-dom'
import './Navigation.css'

function Navigation() {
  return (
    <nav className="navigation" aria-label="Main navigation">
      <NavLink className="navigation__link" to="/" end>Home</NavLink>
      <NavLink className="navigation__link" to="/search">Search</NavLink>
    </nav>
  )
}

export default Navigation
