import { useLanguage } from '../../utils/language.js'
import { useNavigate } from 'react-router-dom'
import SearchForm from '../../components/SearchForm/SearchForm.jsx'
import About from '../../components/About/About.jsx'
import './Home.css'

function Home() {
  const { t } = useLanguage()
  const navigate = useNavigate()

  function handleSearch(query) {
    navigate(`/search?${new URLSearchParams({ q: query })}`)
  }

  return (
    <div className="home">
      <section className="home__hero" aria-labelledby="home-title">
        <div className="home__intro">
          <p className="home__eyebrow">{t.eyebrow}</p>
          <h1 className="home__title" id="home-title">{t.heroStart}<br />{t.heroEnd} <em>{t.heroEmphasis}</em></h1>
          <p className="home__description">{t.intro}</p>
          <SearchForm onSearch={handleSearch} />
        </div>
        <div className="home__illustration" aria-hidden="true">
          <span className="home__orbit" />
          <div className="home__book home__book--back" />
          <div className="home__book home__book--front">
            <span className="home__book-label">ENTRE<br />PÁGINAS</span>
            <span className="home__book-rule" />
            <span className="home__book-caption">{t.bookCaption}</span>
            <span className="home__book-number">01</span>
          </div>
          <span className="home__illustration-caption">{t.illustrationCaption}</span>
        </div>
      </section>
      <About />
    </div>
  )
}

export default Home
