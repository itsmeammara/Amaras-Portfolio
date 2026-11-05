import { useSyncExternalStore } from 'react'
import { experienceMode } from '../lib/experience.js'

const queries = [
  '(prefers-reduced-motion: reduce)',
  '(pointer: coarse)',
  '(max-width: 767px)',
]
let pausedOverride = null
function subscribe(callback) {
  const media = queries.map((query) => window.matchMedia(query))
  media.forEach((query) => query.addEventListener('change', callback))
  navigator.connection?.addEventListener('change', callback)
  window.addEventListener('dd-motion-change', callback)
  return () => {
    media.forEach((query) => query.removeEventListener('change', callback))
    navigator.connection?.removeEventListener('change', callback)
    window.removeEventListener('dd-motion-change', callback)
  }
}
function snapshot() {
  let paused = pausedOverride === true
  try {
    if (pausedOverride === null)
      paused = sessionStorage.getItem('dd-motion-paused') === 'true'
  } catch {
    /* Storage is optional. */
  }
  return experienceMode({
    paused,
    reducedMotion: window.matchMedia(queries[0]).matches,
    coarsePointer: window.matchMedia(queries[1]).matches,
    smallScreen: window.matchMedia(queries[2]).matches,
    saveData: navigator.connection?.saveData,
    effectiveType: navigator.connection?.effectiveType,
    memory: navigator.deviceMemory,
    cores: navigator.hardwareConcurrency,
  })
}
export function setAmbiencePaused(paused) {
  pausedOverride = paused
  try {
    sessionStorage.setItem('dd-motion-paused', String(paused))
  } catch {
    /* The in-memory setting still works. */
  }
  window.dispatchEvent(new Event('dd-motion-change'))
}
export default function useExperienceMode() {
  return useSyncExternalStore(subscribe, snapshot, () => 'static')
}
function subscribeVisibility(callback) {
  document.addEventListener('visibilitychange', callback)
  return () => document.removeEventListener('visibilitychange', callback)
}
export function usePageVisible() {
  return useSyncExternalStore(
    subscribeVisibility,
    () => !document.hidden,
    () => true,
  )
}
