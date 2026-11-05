import { Pause, Play } from 'lucide-react'
import { useReducedMotion } from 'motion/react'
import useExperienceMode, {
  setAmbiencePaused,
} from '../hooks/useExperienceMode.js'
export default function AmbientControls() {
  const mode = useExperienceMode(),
    reduced = useReducedMotion()
  return (
    <button
      className="ambient-toggle"
      type="button"
      disabled={Boolean(reduced)}
      aria-pressed={mode === 'static'}
      onClick={() => setAmbiencePaused(mode !== 'static')}
      aria-label={
        reduced
          ? 'Ambient animation disabled by your system preference'
          : mode === 'static'
            ? 'Resume ambient animation'
            : 'Pause ambient animation'
      }
    >
      {mode === 'static' ? <Play size={12} /> : <Pause size={12} />}
      {reduced
        ? 'Reduced motion'
        : mode === 'static'
          ? 'Resume ambience'
          : 'Pause ambience'}
    </button>
  )
}
