import { useEffect, useState } from 'react'
import { LanguageContext, LANGUAGE_STORAGE_KEY, readLanguage } from '../../utils/language.js'
import { translations } from '../../utils/translations.js'

function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(readLanguage)

  useEffect(() => { document.documentElement.lang = language }, [language])

  function changeLanguage(nextLanguage) {
    if (nextLanguage !== 'es' && nextLanguage !== 'en') return
    setLanguage(nextLanguage)
    try {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, nextLanguage)
    } catch {
      // Keep the control usable when browser storage is unavailable.
    }
  }

  return <LanguageContext.Provider value={{ language, changeLanguage, t: translations[language] }}>{children}</LanguageContext.Provider>
}

export default LanguageProvider
