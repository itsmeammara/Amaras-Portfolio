import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import vm from 'node:vm'
import {
  THEME_STORAGE_KEY,
  normalizeTheme,
  readStoredTheme,
  saveTheme,
  applyTheme,
} from '../src/lib/theme.js'
function mockDocument() {
  const meta = {}
  return {
    meta,
    documentElement: { dataset: { theme: 'dark' }, style: {} },
    querySelector: () => ({
      setAttribute: (name, value) => {
        meta[name] = value
      },
    }),
  }
}
test('new visitors and invalid stored preferences default to the restored dark theme', () => {
  for (const value of [null, undefined, '', 'system', 'invalid', 'DARK']) {
    assert.equal(normalizeTheme(value), 'dark')
    assert.equal(readStoredTheme({ getItem: () => value }), 'dark')
  }
  assert.equal(readStoredTheme({ getItem: () => 'light' }), 'light')
  assert.equal(
    readStoredTheme({
      getItem: () => {
        throw new Error('blocked')
      },
    }),
    'dark',
  )
})
test('theme selections persist and can be restored on the next visit', () => {
  const values = new Map()
  const storage = {
    getItem: (key) => values.get(key),
    setItem: (key, value) => values.set(key, value),
  }
  saveTheme(storage, 'light')
  assert.equal(values.get(THEME_STORAGE_KEY), 'light')
  assert.equal(readStoredTheme(storage), 'light')
  saveTheme(storage, 'dark')
  assert.equal(readStoredTheme(storage), 'dark')
  assert.doesNotThrow(() =>
    saveTheme(
      {
        setItem: () => {
          throw new Error('blocked')
        },
      },
      'light',
    ),
  )
})
test('switching updates root styling, native controls and browser chrome together', () => {
  const doc = mockDocument()
  applyTheme(doc, 'light')
  assert.equal(doc.documentElement.dataset.theme, 'light')
  assert.equal(doc.documentElement.style.colorScheme, 'light')
  assert.equal(doc.meta.content, '#fffaf4')
  applyTheme(doc, 'dark')
  assert.equal(doc.documentElement.dataset.theme, 'dark')
  assert.equal(doc.documentElement.style.colorScheme, 'dark')
  assert.equal(doc.meta.content, '#050510')
})
test('the before-paint HTML initializer restores saved light mode and tolerates unavailable storage', () => {
  const html = fs.readFileSync(
    new URL('../index.html', import.meta.url),
    'utf8',
  )
  const script = html.match(/<script>([\s\S]*?)<\/script>/)[1]
  for (const saved of ['light', 'dark', null, 'unknown']) {
    const document = mockDocument()
    vm.runInNewContext(script, {
      document,
      localStorage: {
        getItem: (key) => {
          assert.equal(key, THEME_STORAGE_KEY)
          return saved
        },
      },
    })
    assert.equal(document.documentElement.dataset.theme, normalizeTheme(saved))
  }
  const document = mockDocument()
  assert.doesNotThrow(() =>
    vm.runInNewContext(script, {
      document,
      localStorage: {
        getItem: () => {
          throw new Error('blocked')
        },
      },
    }),
  )
  assert.equal(document.documentElement.dataset.theme, 'dark')
})
