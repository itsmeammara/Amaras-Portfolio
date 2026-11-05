import { useRef } from 'react'
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
  useInView,
} from 'motion/react'
import useExperienceMode, {
  usePageVisible,
} from '../hooks/useExperienceMode.js'
export default function OrbitalScene({ small = false }) {
  const ref = useRef(null)
  const reduced = useReducedMotion()
  const mode = useExperienceMode()
  const inView = useInView(ref, { amount: 0.05 })
  const pageVisible = usePageVisible()
  const x = useMotionValue(0),
    y = useMotionValue(0)
  const rotateX = useSpring(x, { stiffness: 70, damping: 20 }),
    rotateY = useSpring(y, { stiffness: 70, damping: 20 })
  function move(e) {
    if (mode !== 'full' || reduced || e.pointerType !== 'mouse') return
    const box = ref.current.getBoundingClientRect()
    x.set(((e.clientY - box.top) / box.height - 0.5) * -14)
    y.set(((e.clientX - box.left) / box.width - 0.5) * 18)
  }
  return (
    <div
      ref={ref}
      className={`orbital-scene ${small ? 'scene-small' : ''}`}
      data-animate={inView && pageVisible && !reduced && mode !== 'static'}
      onPointerMove={move}
      onPointerLeave={() => {
        x.set(0)
        y.set(0)
      }}
      role="img"
      aria-label="Abstract metallic sphere surrounded by luminous orbital rings"
    >
      <div className="scene-grid" />
      <div className="orb-glow" />
      <div className="orbital-dust" aria-hidden="true">
        <i />
        <i />
        <i />
        <i />
        <i />
        <i />
      </div>
      <motion.div
        className="orbital-object"
        style={{
          rotateX: mode === 'full' ? rotateX : 0,
          rotateY: mode === 'full' ? rotateY : 0,
        }}
      >
        <div className="orbit-ring ring-one" />
        <div className="orbit-ring ring-two" />
        <div className="orbit-ring ring-three" />
        <div className="chrome-orb">
          <div className="orb-line" />
          <span className="orb-core" />
        </div>
        <div className="satellite satellite-one" />
        <div className="satellite satellite-two" />
      </motion.div>
      {!small && (
        <>
          <span className="scene-label label-top">
            <i /> IMAGINATION, MATERIALIZED
          </span>
          <span className="scene-label label-bottom">
            CREATIVE STUDY 001
            <br />
            <span>BOUNDLESS BY DESIGN</span>
          </span>
          <span className="scene-cross">+</span>
        </>
      )}
    </div>
  )
}
