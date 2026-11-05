import { useSyncExternalStore } from 'react'
import {
  applyTheme,
  normalizeTheme,
  saveTheme,
  THEME_STORAGE_KEY,
} from '../lib/theme.js'
const EVENT = 'portfolio-theme-change'
function snapshot() {
  return normalizeTheme(document.documentElement.dataset.theme)
}
function subscribe(callback) {
  function sync(event) {
    if (event.key !== THEME_STORAGE_KEY && event.key !== null) return
    applyTheme(document, event.key === null ? 'dark' : event.newValue)
    callback()
  }
  window.addEventListener(EVENT, callback)
  window.addEventListener('storage', sync)
  return () => {
    window.removeEventListener(EVENT, callback)
    window.removeEventListener('storage', sync)
  }
}
export function setTheme(theme) {
  applyTheme(document, theme)
  try {
    saveTheme(window.localStorage, theme)
  } catch {
    /* Storage access itself may be denied. */
  }
  window.dispatchEvent(new Event(EVENT))
}
export default function useTheme() {
  const theme = useSyncExternalStore(subscribe, snapshot, () => 'dark')
  return { theme, setTheme }
}
