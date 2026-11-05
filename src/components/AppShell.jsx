import { MotionConfig } from 'motion/react'
import CinematicEnvironment from './CinematicEnvironment.jsx'
import AmbientControls from './AmbientControls.jsx'
import useExperienceMode, {
  usePageVisible,
} from '../hooks/useExperienceMode.js'

export default function AppShell({ children }) {
  const mode = useExperienceMode()
  const visible = usePageVisible()
  return (
    <MotionConfig reducedMotion={mode === 'static' ? 'always' : 'user'}>
      <div
        className={`app-shell experience-${mode} ${visible ? '' : 'page-hidden'}`}
      >
        <CinematicEnvironment />
        {children}
        <AmbientControls />
      </div>
    </MotionConfig>
  )
}
