import { useEffect, useRef } from 'react'
import './Reveal.css'

// One debounced recovery check for the whole page. Late font/image layout or
// anchor jumps can precede an observer delivery; visible content must recover.
const revealNodes = new Set()
let recoveryTimer
function scheduleRecovery() {
  window.clearTimeout(recoveryTimer)
  recoveryTimer = window.setTimeout(() => {
    for (const node of revealNodes) {
      const rect = node.getBoundingClientRect()
      if (
        rect.width &&
        rect.height &&
        rect.bottom > -48 &&
        rect.top < window.innerHeight + 48 &&
        rect.right > 0 &&
        rect.left < window.innerWidth
      ) {
        node.dataset.inView = 'true'
      }
    }
  }, 160)
}
function watchVisibility(node) {
  if (!revealNodes.size) {
    window.addEventListener('scroll', scheduleRecovery, {
      passive: true,
      capture: true,
    })
    window.addEventListener('resize', scheduleRecovery)
    window.addEventListener('load', scheduleRecovery)
  }
  revealNodes.add(node)
  scheduleRecovery()
  document.fonts?.ready.then(() => {
    if (revealNodes.size) scheduleRecovery()
  })
  return () => {
    revealNodes.delete(node)
    if (!revealNodes.size) {
      window.clearTimeout(recoveryTimer)
      window.removeEventListener('scroll', scheduleRecovery, true)
      window.removeEventListener('resize', scheduleRecovery)
      window.removeEventListener('load', scheduleRecovery)
    }
  }
}

// Observe meaningful containers, rather than individual words or decorative nodes.
// CSS individual transforms leave existing tilt, hover and positioning transforms intact.
export default function Reveal({
  children,
  className = '',
  delay = 0,
  style,
  variant = 'up',
  stagger = false,
  as: Tag = 'div',
  essential = false,
  ...props
}) {
  const target = useRef(null)
  useEffect(() => {
    const node = target.current
    if (!node || typeof IntersectionObserver === 'undefined') return
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Hide only after an observer has delivered a real measurement. Content
        // stays readable if enhancement is unavailable or initialization fails.
        const bounds = entry.boundingClientRect
        const root = entry.rootBounds
        node.dataset.revealExit =
          root && bounds.bottom <= root.top ? 'above' : 'below'
        node.dataset.inView = String(entry.isIntersecting)
        node.dataset.revealReady = 'true'
      },
      { rootMargin: '48px 0px', threshold: 0 },
    )
    observer.observe(node)
    const stopWatching = watchVisibility(node)
    return () => {
      stopWatching()
      observer.disconnect()
      delete node.dataset.revealReady
      node.dataset.inView = 'true'
    }
  }, [])
  return (
    <Tag
      {...props}
      ref={target}
      data-in-view="true"
      data-reveal-essential={essential || undefined}
      data-reveal={variant}
      className={`scroll-reveal ${stagger ? 'reveal-stagger' : ''} ${className}`}
      style={{
        '--reveal-delay': `${Math.min(Math.max(delay, 0), 0.24)}s`,
        ...style,
      }}
    >
      {children}
    </Tag>
  )
}
export function SectionTitle({ number, label, children, description }) {
  return (
    <Reveal className="section-heading" stagger>
      <p className="eyebrow">
        {number} / {label}
      </p>
      <h2>{children}</h2>
      {description && <p className="section-description">{description}</p>}
    </Reveal>
  )
}
