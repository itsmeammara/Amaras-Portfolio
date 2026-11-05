import { Sun, Moon } from 'lucide-react'
import useTheme from '../hooks/useTheme.js'

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const dark = theme === 'dark'
  const label = dark ? 'Switch to light mode' : 'Switch to dark mode'
  const Icon = dark ? Sun : Moon

  return (
    <button
      type="button"
      className="theme-toggle"
      aria-label={label}
      title={label}
      onClick={() => setTheme(dark ? 'light' : 'dark')}
    >
      <Icon key={theme} className="theme-toggle-icon" size={18} aria-hidden="true" />
    </button>
  )
}
