import { useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'
import useExperienceMode from '../hooks/useExperienceMode.js'

export default function TiltSurface({ children, className = '' }) {
  const mode = useExperienceMode(),
    target = useRef(null)
  const x = useMotionValue(0),
    y = useMotionValue(0)
  const spotX = useMotionValue('50%'),
    spotY = useMotionValue('0%')
  const rotateX = useSpring(x, { stiffness: 130, damping: 20 })
  const rotateY = useSpring(y, { stiffness: 130, damping: 20 })
  function move(event) {
    if (mode !== 'full' || event.pointerType !== 'mouse') return
    const rect = target.current.getBoundingClientRect()
    const px = (event.clientX - rect.left) / rect.width
    const py = (event.clientY - rect.top) / rect.height
    x.set((py - 0.5) * -5)
    y.set((px - 0.5) * 5)
    spotX.set(`${px * 100}%`)
    spotY.set(`${py * 100}%`)
  }
  return (
    <motion.article
      ref={target}
      className={`tilt-surface ${className}`}
      onPointerMove={move}
      onPointerLeave={() => {
        x.set(0)
        y.set(0)
      }}
      style={{
        rotateX: mode === 'full' ? rotateX : 0,
        rotateY: mode === 'full' ? rotateY : 0,
        transformPerspective: 900,
        '--spot-x': spotX,
        '--spot-y': spotY,
      }}
    >
      {children}
    </motion.article>
  )
}
