import './About.css'

function About() {
  return (
    <section className="about" aria-labelledby="about-title">
      <p className="about__label">About the project</p>
      <h2 className="about__title" id="about-title">One book can open a whole new world.</h2>
      <p className="about__text">Entre Páginas is a book discovery project by DanielRH, created for TripleTen using Open Library.</p>
    </section>
  )
}

export default About
