import { useState } from 'react'
import Reveal from './Reveal.jsx'
import TiltSurface from './TiltSurface.jsx'

// Only an explicitly supplied portrait is used. No stock/fabricated fallback.
const portraits = import.meta.glob(
  '../assets/profile/portrait.{webp,avif,jpg,jpeg,png}',
  {
    eager: true,
    query: '?url',
    import: 'default',
  },
)
const suppliedPortrait = Object.values(portraits)[0]

export default function PersonalPortrait({
  src = suppliedPortrait,
  alt = 'Portrait of Umme Amara',
}) {
  const [failedSource, setFailedSource] = useState(null)
  if (!src || failedSource === src) return null
  return (
    <Reveal as="figure" className="about-portrait" variant="right">
      <TiltSurface className="portrait-surface">
        <img
          src={src}
          alt={alt}
          width="720"
          height="1280"
          loading="lazy"
          decoding="async"
          onError={() => setFailedSource(src)}
        />
      </TiltSurface>
    </Reveal>
  )
}
