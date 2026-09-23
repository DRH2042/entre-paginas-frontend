import { createContext, useContext } from 'react'

export const LanguageContext = createContext(null)
export const LANGUAGE_STORAGE_KEY = 'entre-paginas-language'

export function readLanguage() {
  try {
    return localStorage.getItem(LANGUAGE_STORAGE_KEY) === 'en' ? 'en' : 'es'
  } catch {
    return 'es'
  }
}

export function useLanguage() {
  return useContext(LanguageContext)
}
