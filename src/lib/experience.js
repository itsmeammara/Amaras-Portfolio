export function experienceMode({
  reducedMotion = false,
  paused = false,
  coarsePointer = false,
  smallScreen = false,
  saveData = false,
  effectiveType = '',
  memory,
  cores,
} = {}) {
  if (reducedMotion || paused) return 'static'
  const constrained =
    saveData ||
    /(^|-)2g$/.test(effectiveType) ||
    (memory && memory < 4) ||
    (cores && cores <= 2)
  return constrained || coarsePointer || smallScreen ? 'light' : 'full'
}
