import test from 'node:test'
import assert from 'node:assert/strict'
import { scrollVideoTime } from '../src/lib/scrollVideo.js'
import {
  contactConfig,
  validateContact,
  projectBrief,
  emailLink,
  submitContact,
} from '../src/lib/contact.js'
const valid = {
  name: ' Alex Morgan ',
  email: ' alex@example.com ',
  type: 'Web Development',
  message: ' A thoughtful interactive project for the web. ',
}

test('video scroll mapping clamps endpoints, permits reverse scrolling, and handles missing metadata', () => {
  assert.equal(scrollVideoTime(0, 2000, 1000, 8), 0)
  assert.equal(scrollVideoTime(-100, 2000, 1000, 8), 0)
  assert.equal(scrollVideoTime(2000, 2000, 1000, 8), 8 - 1 / 24)
  assert.ok(
    scrollVideoTime(700, 2000, 1000, 8) > scrollVideoTime(300, 2000, 1000, 8),
  )
  assert.equal(scrollVideoTime(100, 100, 100, 8), 0)
  assert.equal(scrollVideoTime(100, 2000, 1000, NaN), 0)
  assert.equal(scrollVideoTime(100, 2000, 1000, Infinity), 0)
})
test('validation covers blank input, invalid email, unrecognized project type and length limits', () => {
  assert.deepEqual(validateContact(valid), {})
  assert.equal(
    Object.keys(
      validateContact({
        name: '',
        email: 'invalid',
        type: 'invented',
        message: 'short',
      }),
    ).length,
    4,
  )
  assert.ok(validateContact({ ...valid, message: ' '.repeat(100) }).message)
  assert.ok(validateContact({ ...valid, message: 'x'.repeat(5001) }).message)
  assert.ok(validateContact({ ...valid, name: 'x'.repeat(101) }).name)
})
test('configuration accepts blank, HTTPS and same-origin paths but rejects insecure or credential-bearing destinations', () => {
  assert.equal(contactConfig({}).endpoint, 'https://formspree.io/f/meaannep')
  assert.equal(
    contactConfig({ VITE_CONTACT_ENDPOINT: '/api/contact' }).endpoint,
    '/api/contact',
  )
  assert.equal(
    contactConfig({ VITE_CONTACT_ENDPOINT: 'https://example.com/contact' })
      .endpoint,
    'https://example.com/contact',
  )
  for (const endpoint of [
    'javascript:alert(1)',
    '//example.com',
    'http://example.com/contact',
    'https://user:secret@example.com',
  ])
    assert.ok(contactConfig({ VITE_CONTACT_ENDPOINT: endpoint }).error)
  assert.equal(
    contactConfig({
      VITE_CONTACT_EMAIL: 'hello@example.com?bcc=other@example.com',
    }).email,
    '',
  )
})
test('mailto fallback encodes content and local brief does not claim submission', () => {
  const url = emailLink('hello@example.com', {
    ...valid,
    message: 'Text with & and ? and a newline\nMore details.',
  })
  const query = new URL(url).searchParams
  assert.ok(query.get('body').includes('Text with & and ?'))
  assert.ok(projectBrief(valid).endsWith('This brief has not been sent.'))
})
test('endpoint normalizes public fields, forwards honeypot and requires confirmation', async () => {
  let options
  const result = await submitContact('/api/contact', valid, {
    fetcher: async (url, init) => {
      assert.equal(url, '/api/contact')
      options = init
      return { ok: true, json: async () => ({ success: true }) }
    },
  })
  assert.equal(result.success, true)
  assert.equal(options.credentials, 'omit')
  assert.equal(options.headers['Content-Type'], 'application/json')
  assert.deepEqual(JSON.parse(options.body), {
    name: 'Alex Morgan',
    email: 'alex@example.com',
    type: valid.type,
    message: valid.message.trim(),
    _gotcha: '',
  })
  await assert.rejects(
    submitContact('/api/contact', valid, {
      fetcher: async () => ({ ok: false }),
    }),
    /could not accept/,
  )
  for (const response of [null, { success: false }, { status: 'maybe' }])
    await assert.rejects(
      submitContact('/api/contact', valid, {
        fetcher: async () => ({ ok: true, json: async () => response }),
      }),
      /did not confirm/,
    )
  await assert.rejects(
    submitContact('/api/contact', valid, {
      fetcher: async () => {
        throw new TypeError('offline')
      },
    }),
    /offline/,
  )
})
test('short form requires name, email and message without a project type', () => {
  assert.deepEqual(validateContact({ ...valid, type: undefined }), {})
  assert.equal(contactConfig({}).email, 'umeammara291@gmail.com')
})
test('Formspree confirmation and honeypot are supported without inventing success', async () => {
  let body
  const result = await submitContact(
    'https://formspree.io/f/test',
    { ...valid, type: undefined, _gotcha: 'bot entry' },
    {
      fetcher: async (_url, init) => {
        body = JSON.parse(init.body)
        return { ok: true, json: async () => ({ ok: true }) }
      },
    },
  )
  assert.equal(result.ok, true)
  assert.equal(body._gotcha, 'bot entry')
  assert.equal('type' in body, false)
  await assert.rejects(submitContact('', valid), /direct email/)
})

test('cancellation is passed through to the contact transport', async () => {
  const controller = new AbortController()
  controller.abort()
  await assert.rejects(
    submitContact('/api/contact', valid, {
      signal: controller.signal,
      fetcher: async (_url, options) => {
        assert.equal(options.signal, controller.signal)
        options.signal.throwIfAborted()
      },
    }),
    { name: 'AbortError' },
  )
})

test('device modes keep touch, mobile, data-saving and low-powered devices lightweight', async () => {
  const { experienceMode } = await import('../src/lib/experience.js')
  assert.equal(experienceMode(), 'full')
  assert.equal(experienceMode({ reducedMotion: true }), 'static')
  assert.equal(experienceMode({ paused: true }), 'static')
  for (const options of [
    { coarsePointer: true },
    { smallScreen: true },
    { saveData: true },
    { effectiveType: 'slow-2g' },
    { effectiveType: '2g' },
    { memory: 2 },
    { cores: 2 },
  ])
    assert.equal(experienceMode(options), 'light')
  assert.equal(
    experienceMode({ cores: 8, memory: 8, effectiveType: '4g' }),
    'full',
  )
})
