import { useLanguage } from '../../utils/language.js'
import './About.css'

function About() {
  const { t } = useLanguage()
  return (
    <section className="about" aria-labelledby="about-title">
      <p className="about__label">{t.aboutLabel}</p>
      <h2 className="about__title" id="about-title">{t.aboutTitle}</h2>
      <p className="about__text">{t.aboutText}</p>
    </section>
  )
}

export default About
