import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import useExperienceMode from '../hooks/useExperienceMode.js'

// A decorative layer may drift; content and normal document scrolling never do.
export default function DepthLayer({ children, className = '' }) {
  const target = useRef(null),
    mode = useExperienceMode()
  const { scrollYProgress } = useScroll({
    target,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [20, -28])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.97, 1, 1.025])
  return (
    <motion.div
      ref={target}
      className={`depth-layer ${className}`}
      style={{ y: mode === 'full' ? y : 0, scale: mode === 'full' ? scale : 1 }}
    >
      {children}
    </motion.div>
  )
}
