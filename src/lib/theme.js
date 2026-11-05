export const THEME_STORAGE_KEY = 'digital-dimension-theme'
export const normalizeTheme = (value) => (value === 'light' ? 'light' : 'dark')
export function readStoredTheme(storage) {
  try {
    return normalizeTheme(storage.getItem(THEME_STORAGE_KEY))
  } catch {
    return 'dark'
  }
}
export function saveTheme(storage, theme) {
  try {
    storage.setItem(THEME_STORAGE_KEY, normalizeTheme(theme))
  } catch {
    /* The current tab still switches when storage is blocked. */
  }
}
export function applyTheme(document, theme) {
  const selected = normalizeTheme(theme)
  document.documentElement.dataset.theme = selected
  document.documentElement.style.colorScheme = selected
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute('content', selected === 'light' ? '#fffaf4' : '#050510')
}
