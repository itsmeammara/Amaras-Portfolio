import { useEffect, useRef, useState } from 'react'
import useExperienceMode, {
  usePageVisible,
} from '../hooks/useExperienceMode.js'
import ScrollWorld from './ScrollWorld.jsx'
import useTheme from '../hooks/useTheme.js'
import { scrollVideoTime } from '../lib/scrollVideo.js'

const mediaRoot = `${import.meta.env.BASE_URL}media/`
export default function CinematicEnvironment() {
  const { theme } = useTheme()
  const mode = useExperienceMode()
  const visible = usePageVisible()
  const video = useRef(null),
    environment = useRef(null),
    canvas = useRef(null)
  const [videoState, setVideoState] = useState('loading')

  // Only seek on demand. While the decoder is seeking, retain the latest scroll
  // position and resume on seeked; never pile up competing decoder requests.
  useEffect(() => {
    const element = video.current
    if (mode !== 'full' || !element || !visible || videoState === 'error')
      return
    let frame = 0,
      requestedTime = -1
    function update() {
      frame = 0
      if (!element.duration || element.seeking || element.readyState < 2) return
      const target = scrollVideoTime(
        window.scrollY,
        document.documentElement.scrollHeight,
        window.innerHeight,
        element.duration,
      )
      if (
        Math.abs(element.currentTime - target) > 1 / 24 &&
        Math.abs(requestedTime - target) > 1 / 48
      ) {
        try {
          element.currentTime = target
          requestedTime = target
        } catch {
          /* Poster remains available if seeking is unsupported. */
        }
      }
    }
    function schedule() {
      if (!frame) frame = requestAnimationFrame(update)
    }
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    ;['loadedmetadata', 'loadeddata', 'canplay', 'seeked'].forEach((event) =>
      element.addEventListener(event, schedule),
    )
    const observer = new ResizeObserver(schedule)
    observer.observe(document.body)
    schedule()
    return () => {
      cancelAnimationFrame(frame)
      element.pause()
      observer.disconnect()
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      ;['loadedmetadata', 'loadeddata', 'canplay', 'seeked'].forEach((event) =>
        element.removeEventListener(event, schedule),
      )
    }
  }, [mode, visible, videoState])

  // Bounded canvas, capped DPR, 24 fps drawing, and no idle animation loop.
  useEffect(() => {
    if (mode !== 'full' || !visible) return
    const layer = environment.current,
      surface = canvas.current
    const ctx = surface.getContext('2d', { alpha: true })
    if (!ctx) return
    let width = 0,
      height = 0,
      frame = 0,
      last = 0,
      activeUntil = 0
    let mx = 0.65,
      my = 0.4,
      tx = 0.65,
      ty = 0.4
    const colors =
      theme === 'light'
        ? ['255,107,107', '53,214,192', '54,191,250', '255,159,67']
        : ['157,172,230', '139,92,246', '59,130,246', '34,211,238']
    const particles = Array.from({ length: 28 }, (_, i) => ({
      x: ((i * 73 + 19) % 997) / 997,
      y: ((i * 137 + 47) % 991) / 991,
      size: 0.6 + (i % 3) * 0.45,
      depth: 0.3 + (i % 5) * 0.15,
    }))
    function resize() {
      width = window.innerWidth
      height = window.innerHeight
      const dpr = Math.min(window.devicePixelRatio || 1, 1.25)
      surface.width = Math.round(width * dpr)
      surface.height = Math.round(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      wake()
    }
    function wake() {
      activeUntil = performance.now() + 1600
      if (!frame) frame = requestAnimationFrame(draw)
    }
    function pointer(event) {
      if (event.pointerType === 'mouse') {
        tx = event.clientX / width
        ty = event.clientY / height
        wake()
      }
    }
    function reset() {
      tx = 0.65
      ty = 0.4
      wake()
    }
    function draw(time) {
      frame = 0
      if (time - last < 1000 / 24) {
        if (time < activeUntil) frame = requestAnimationFrame(draw)
        return
      }
      const dt = Math.min(50, time - (last || time))
      last = time
      mx += (tx - mx) * 0.07
      my += (ty - my) * 0.07
      layer.style.setProperty('--pointer-x', `${mx * 100}%`)
      layer.style.setProperty('--pointer-y', `${my * 100}%`)
      layer.style.setProperty('--drift-x', `${(mx - 0.5) * 20}px`)
      layer.style.setProperty('--drift-y', `${(my - 0.5) * 15}px`)
      ctx.clearRect(0, 0, width, height)
      const points = particles.map((p) => {
        p.y = (p.y - dt * 0.000004 * p.depth + 1) % 1
        return {
          x: p.x * width + (mx - 0.5) * 22 * p.depth,
          y: p.y * height + (my - 0.5) * 18 * p.depth,
          size: p.size,
        }
      })
      points.forEach((p, i) => {
        ctx.fillStyle = `rgba(${colors[i % colors.length]},${0.2 + (i % 3) * 0.1})`
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()
        // A few short-lived connections, rather than an expensive all-pairs mesh.
        if (i % 4 !== 0) return
        const next = points[(i + 14) % points.length]
        const distance = Math.hypot(p.x - next.x, p.y - next.y)
        if (distance < 180 && Math.sin(time * 0.00035 + i) > 0.4) {
          ctx.strokeStyle = `rgba(${theme === 'light' ? '35,125,145' : '130,143,223'},${(1 - distance / 180) * 0.12})`
          ctx.beginPath()
          ctx.moveTo(p.x, p.y)
          ctx.lineTo(next.x, next.y)
          ctx.stroke()
        }
      })
      if (time < activeUntil) frame = requestAnimationFrame(draw)
    }
    resize()
    window.addEventListener('scroll', wake, { passive: true })
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', pointer, { passive: true })
    document.documentElement.addEventListener('pointerleave', reset)
    return () => {
      cancelAnimationFrame(frame)
      ctx.clearRect(0, 0, width, height)
      window.removeEventListener('resize', resize)
      window.removeEventListener('scroll', wake)
      window.removeEventListener('pointermove', pointer)
      document.documentElement.removeEventListener('pointerleave', reset)
    }
  }, [mode, visible, theme])

  return (
    <div
      ref={environment}
      className={`cinematic-environment mode-${mode} ${visible ? '' : 'is-paused'}`}
      aria-hidden="true"
    >
      <div className="environment-poster" />
      <div className="environment-fallback">
        <i />
        <i />
        <i />
      </div>
      {mode === 'full' && (
        <video
          ref={video}
          className={`environment-video ${videoState === 'ready' ? 'is-ready' : ''}`}
          src={`${mediaRoot}dimension-universe.mp4`}
          poster={`${mediaRoot}dimension-poster.jpg`}
          muted
          playsInline
          preload="metadata"
          disablePictureInPicture
          tabIndex={-1}
          onLoadedData={() => setVideoState('ready')}
          onError={() => setVideoState('error')}
        />
      )}
      <ScrollWorld />
      <div className="environment-shade" />
      <div className="environment-light" />
      <canvas ref={canvas} className="environment-particles" />
      <div className="environment-grain" />
    </div>
  )
}
