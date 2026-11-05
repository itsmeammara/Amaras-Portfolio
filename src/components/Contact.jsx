import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, Check, Mail, AlertCircle } from 'lucide-react'
import Reveal from './Reveal.jsx'
import {
  contactConfig,
  validateContact,
  submitContact,
} from '../lib/contact.js'
const config = contactConfig(import.meta.env)
const empty = { name: '', email: '', message: '', _gotcha: '' }

export default function Contact() {
  const [values, setValues] = useState(empty),
    [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle'),
    [notice, setNotice] = useState('')
  const form = useRef(null),
    request = useRef(null),
    inFlight = useRef(false)
  useEffect(() => () => request.current?.abort(), [])
  function change(event) {
    setValues((v) => ({ ...v, [event.target.name]: event.target.value }))
    setStatus('idle')
    setNotice('')
    setErrors((v) => ({ ...v, [event.target.name]: undefined }))
  }
  async function submit(event) {
    event.preventDefault()
    if (inFlight.current || status === 'success') return
    const next = validateContact(values)
    setErrors(next)
    if (Object.keys(next).length) {
      form.current.elements.namedItem(Object.keys(next)[0]).focus()
      return
    }
    if (!config.endpoint || config.error) {
      setStatus('error')
      setNotice(
        'Please email me directly using the address alongside this form. Online sending is temporarily unavailable.',
      )
      return
    }
    inFlight.current = true
    setStatus('submitting')
    setNotice('Submitting your message…')
    const controller = new AbortController()
    request.current = controller
    let timedOut = false
    const timeout = setTimeout(() => {
      timedOut = true
      controller.abort()
    }, 15000)
    try {
      await submitContact(config.endpoint, values, {
        signal: controller.signal,
      })
      if (controller.signal.aborted) return
      setStatus('success')
      setNotice('Thank you! Your message has been submitted successfully.')
    } catch (error) {
      if (controller.signal.aborted && !timedOut) return
      setStatus('error')
      setNotice(
        timedOut || error instanceof TypeError
          ? 'Submission could not be confirmed. It may have reached the service; please check before retrying. Please email me directly if you need help.'
          : error.message,
      )
    } finally {
      clearTimeout(timeout)
      inFlight.current = false
      if (request.current === controller) request.current = null
    }
  }
  const busy = status === 'submitting'
  const field = (name) => ({
    id: name,
    name,
    value: values[name],
    onChange: change,
    disabled: busy,
    required: true,
    'aria-invalid': Boolean(errors[name]),
    'aria-describedby': errors[name] ? `${name}-error` : undefined,
  })
  const error = (name) =>
    errors[name] && (
      <p className="field-error" id={`${name}-error`}>
        {errors[name]}
      </p>
    )
  return (
    <section id="contact" className="section-space contact-section">
      <div className="page-container contact-layout">
        <Reveal className="contact-copy" variant="left" stagger essential>
          <p className="eyebrow">06 / LET’S CONNECT</p>
          <h2>
            Let’s connect.
            <br />
            Ideas, projects,
            <br />
            <span className="gradient-text">opportunities.</span>
            <span className="cyan-period">↗</span>
          </h2>
          <p>
            For opportunities, collaboration, or a project discussion, share the
            context and what you have in mind.
          </p>
          <div className="contact-note">
            <Mail size={19} />
            <div>
              <span>DIRECT CONTACT</span>
              <p>
                <a href={`mailto:${config.email}`}>{config.email}</a>
              </p>
            </div>
          </div>
        </Reveal>
        <Reveal
          className="contact-form-wrap"
          variant="right"
          delay={0.08}
          essential
        >
          <div className="form-intro">
            <span className="status-dot" />
            <span>A CONVERSATION STARTS HERE</span>
          </div>
          <form
            ref={form}
            name="contact"
            method="POST"
            action={config.endpoint || undefined}
            noValidate
            onSubmit={submit}
            aria-busy={busy}
          >
            <div hidden aria-hidden="true">
              <label htmlFor="contact-website">Leave this field empty</label>
              <input
                id="contact-website"
                name="_gotcha"
                value={values._gotcha}
                onChange={change}
                tabIndex={-1}
                autoComplete="off"
              />
            </div>
            <div className="form-row">
              <div className="field">
                <label htmlFor="name">Your name</label>
                <input
                  {...field('name')}
                  autoComplete="name"
                  placeholder="Alex Morgan"
                  maxLength={100}
                />
                {error('name')}
              </div>
              <div className="field">
                <label htmlFor="email">Email address</label>
                <input
                  {...field('email')}
                  type="email"
                  autoComplete="email"
                  placeholder="alex@example.com"
                  maxLength={254}
                />
                {error('email')}
              </div>
            </div>
            <div className="field">
              <label htmlFor="message">Message</label>
              <textarea
                {...field('message')}
                rows={4}
                maxLength={5000}
                placeholder="How can I help?"
              />
              {error('message')}
            </div>
            <button
              className="button button-primary"
              disabled={busy || status === 'success'}
              type="submit"
            >
              {busy ? 'Sending...' : 'Send Message'}
              <ArrowUpRight size={17} />
            </button>
            <div aria-live="polite" aria-atomic="true">
              {notice && (
                <div className={`submission-notice status-${status}`}>
                  <p>
                    {status === 'success' ? (
                      <Check size={17} />
                    ) : status === 'error' ? (
                      <AlertCircle size={17} />
                    ) : (
                      <Mail size={17} />
                    )}
                    {notice}
                  </p>
                </div>
              )}
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  )
}
