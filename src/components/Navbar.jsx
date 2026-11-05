import { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import ThemeToggle from './ThemeToggle.jsx'
import Reveal from './Reveal.jsx'
const links = [
  ['home', 'Home'],
  ['about', 'About Me'],
  ['services', 'Interests'],
  ['projects', 'My Projects'],
  ['technologies', 'Skills'],
  ['process', 'Journey'],
  ['contact', 'Contact'],
]
export default function Navbar() {
  const navigation = useRef(null),
    menuButton = useRef(null)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('home')
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-15% 0px -55% 0px' },
    )
    links.forEach(([id]) => {
      const section = document.getElementById(id)
      if (section) observer.observe(section)
    })
    return () => observer.disconnect()
  }, [])
  useEffect(() => {
    if (!open) return
    const close = (e) => {
      if (e.key === 'Escape') {
        setOpen(false)
        menuButton.current?.focus()
      }
    }
    const outside = (e) => {
      if (!navigation.current?.contains(e.target)) setOpen(false)
    }
    window.addEventListener('pointerdown', outside)
    window.addEventListener('keydown', close)
    return () => {
      window.removeEventListener('keydown', close)
      window.removeEventListener('pointerdown', outside)
    }
  }, [open])
  return (
    <Reveal as="header" className="nav-wrap" variant="down">
      <nav ref={navigation} className="navbar" aria-label="Main navigation">
        <a
          className="wordmark"
          href="#home"
          aria-label="Umme Amara - Home"
          onClick={() => setOpen(false)}
        >
          <span className="navbar-monogram">UA</span>
        </a>
        <div
          id="navigation-links"
          className={`nav-links ${open ? 'is-open' : ''}`}
        >
          {links.map(([id, label]) => (
            <a
              key={id}
              href={`#${id}`}
              aria-current={active === id ? 'location' : undefined}
              onClick={() => setOpen(false)}
            >
              {label}
              {active === id && (
                <motion.span
                  layoutId="nav-indicator"
                  className="nav-indicator"
                />
              )}
            </a>
          ))}
        </div>
        <a className="nav-cta" href="#contact" onClick={() => setOpen(false)}>
          Let’s Connect <ArrowUpRight size={15} />
        </a>
        <ThemeToggle />
        <button
          ref={menuButton}
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="navigation-links"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </nav>
    </Reveal>
  )
}
