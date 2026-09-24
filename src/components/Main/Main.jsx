import { Route, Routes } from 'react-router-dom'
import Home from '../../pages/Home/Home.jsx'
import SearchResults from '../../pages/SearchResults/SearchResults.jsx'
import BookDetails from '../../pages/BookDetails/BookDetails.jsx'
import './Main.css'

function Main() {
  return (
    <main className="main" id="main-content" tabIndex={-1}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/book/:bookId" element={<BookDetails />} />
      </Routes>
    </main>
  )
}

export default Main
