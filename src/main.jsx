import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import LanguageProvider from './components/LanguageProvider/LanguageProvider.jsx'
import App from './components/App/App.jsx'
import './styles/index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <LanguageProvider><App /></LanguageProvider>
    </BrowserRouter>
  </StrictMode>,
)
