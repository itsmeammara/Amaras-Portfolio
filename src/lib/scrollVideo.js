export function scrollVideoTime(
  scrollTop,
  scrollHeight,
  viewportHeight,
  duration,
) {
  if (!Number.isFinite(duration) || duration <= 0) return 0
  const range = Math.max(0, scrollHeight - viewportHeight)
  const progress = range ? Math.min(1, Math.max(0, scrollTop / range)) : 0
  return progress * Math.max(0, duration - 1 / 24)
}
