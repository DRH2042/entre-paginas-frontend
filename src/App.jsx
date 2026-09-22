import { Link, Route, Routes } from 'react-router-dom'
import Home from './pages/Home.jsx'
import SearchResults from './pages/SearchResults.jsx'

function App() {
  return (
    <>
      <nav aria-label="Main navigation">
        <Link to="/">Home</Link>{' | '}
        <Link to="/search">Search results</Link>
      </nav>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchResults />} />
        </Routes>
      </main>
    </>
  )
}

export default App
