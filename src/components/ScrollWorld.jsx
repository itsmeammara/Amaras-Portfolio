import { useEffect, useRef } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useInView,
} from 'motion/react'
import OrbitalScene from './OrbitalScene.jsx'
import useExperienceMode, {
  usePageVisible,
} from '../hooks/useExperienceMode.js'

export default function ScrollWorld() {
  const mode = useExperienceMode()
  const target = useRef(null)
  const visible = usePageVisible()
  const inView = useInView(target, { amount: 0.01 })
  const active = mode === 'full' && visible && inView
  const pointerX = useMotionValue(0),
    pointerY = useMotionValue(0)
  const tiltX = useSpring(pointerX, { stiffness: 65, damping: 22 })
  const tiltY = useSpring(pointerY, { stiffness: 65, damping: 22 })
  useEffect(() => {
    if (!active) return
    function move(event) {
      if (event.pointerType !== 'mouse') return
      pointerX.set((event.clientY / window.innerHeight - 0.5) * -10)
      pointerY.set((event.clientX / window.innerWidth - 0.5) * 14)
    }
    function reset() {
      pointerX.set(0)
      pointerY.set(0)
    }
    window.addEventListener('pointermove', move, { passive: true })
    document.documentElement.addEventListener('pointerleave', reset)
    return () => {
      window.removeEventListener('pointermove', move)
      document.documentElement.removeEventListener('pointerleave', reset)
      reset()
    }
  }, [active, pointerX, pointerY])
  const { scrollYProgress } = useScroll()
  const x = useTransform(
    scrollYProgress,
    [0, 0.18, 0.36, 0.57, 0.78, 1],
    ['0vw', '-32vw', '4vw', '-24vw', '0vw', '-10vw'],
  )
  const y = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    ['0vh', '5vh', '-10vh', '5vh', '-5vh'],
  )
  const scale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.45, 0.7, 1],
    [1.15, 0.78, 1.08, 0.72, 1.15],
  )
  const rotate = useTransform(scrollYProgress, [0, 1], [-12, 65])
  return (
    <motion.div
      ref={target}
      data-world-active={active}
      className="scroll-world"
      style={{
        x: mode === 'full' ? x : 0,
        y: mode === 'full' ? y : 0,
        scale: mode === 'full' ? scale : 1,
        rotate: mode === 'full' ? rotate : -12,
      }}
    >
      <div className="world-depth">
        <motion.div
          className="world-tilt"
          style={{ rotateX: active ? tiltX : 0, rotateY: active ? tiltY : 0 }}
        >
          <div className="world-aura" />
          <OrbitalScene small />
          <svg
            className="world-letter-orbit"
            viewBox="0 0 800 800"
            aria-hidden="true"
          >
            <defs>
              <path id="dimension-orbit" d="M400,90 a310,310 0 1,1 -1,0" />
            </defs>
            <text>
              <textPath
                href="#dimension-orbit"
                textLength="1920"
                lengthAdjust="spacing"
              >
                DESIGN ✦ DEVELOPMENT ✦ INTELLIGENCE ✦ UMME AMARA ✦{' '}
              </textPath>
            </text>
          </svg>
          <div className="world-moon moon-one" />
          <div className="world-moon moon-two" />
          <div className="world-grid-sphere" />
          <div className="world-shards" aria-hidden="true">
            <i />
            <i />
            <i />
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
