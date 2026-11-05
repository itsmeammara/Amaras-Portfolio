export const projectTypes = [
  'Web Development',
  'Mobile App Development',
  'Artificial Intelligence',
  '3D Design & Visualization',
  'UI/UX & Creative Design',
  'Digital Innovation',
]
export function validateContact(values) {
  const errors = {}
  const name = values.name.trim(),
    email = values.email.trim(),
    message = values.message.trim()
  if (name.length < 2 || name.length > 100)
    errors.name = 'Please enter a name between 2 and 100 characters.'
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    errors.email = 'Please enter a valid email address.'
  if (values.type && !projectTypes.includes(values.type))
    errors.type = 'Please choose a project type.'
  if (message.length < 20 || message.length > 5000)
    errors.message = 'Please enter a message between 20 and 5,000 characters.'
  return errors
}
export function contactConfig(env) {
  // Formspree submission URLs are public; no API key is needed in the browser.
  const endpoint = (env.VITE_CONTACT_ENDPOINT || 'https://formspree.io/f/meaannep').trim()
  const email = (env.VITE_CONTACT_EMAIL || 'umeammara291@gmail.com').trim()
  let validEndpoint = !endpoint
  if (
    endpoint.startsWith('/') &&
    !endpoint.startsWith('//') &&
    !endpoint.includes('\\')
  )
    validEndpoint = true
  else if (endpoint) {
    try {
      const url = new URL(endpoint)
      validEndpoint =
        (url.protocol === 'https:' ||
          (url.protocol === 'http:' &&
            ['localhost', '127.0.0.1', '[::1]'].includes(url.hostname))) &&
        !url.username &&
        !url.password
    } catch {
      /* Report a configuration problem rather than submitting elsewhere. */
    }
  }
  const validEmail =
    email.length <= 254 &&
    /^[^\s@?&#\r\n]+@[^\s@?&#\r\n]+\.[^\s@?&#\r\n]+$/.test(email)
  return {
    endpoint: validEndpoint ? endpoint : '',
    email: validEmail ? email : '',
    error:
      !validEndpoint || (email && !validEmail)
        ? 'Please use the direct email link while online sending is unavailable.'
        : '',
  }
}
export function projectBrief(values) {
  return `UMME AMARA — PROJECT BRIEF\n\nName: ${values.name.trim()}\nEmail: ${values.email.trim()}\nProject type: ${values.type}\n\n${values.message.trim()}\n\nPrepared locally. This brief has not been sent.`
}
export function emailLink(email, values) {
  return `mailto:${email}?subject=${encodeURIComponent(`Project enquiry — ${values.type}`)}&body=${encodeURIComponent(projectBrief(values))}`
}
export async function submitContact(
  endpoint,
  values,
  { signal, fetcher = fetch } = {},
) {
  if (!endpoint)
    throw new Error('Please use the direct email link to get in touch.')
  const payload = {
    name: values.name.trim(),
    email: values.email.trim(),
    message: values.message.trim(),
    ...(values.type ? { type: values.type } : {}),
    _gotcha: values._gotcha || '',
  }
  const response = await fetcher(endpoint, {
    method: 'POST',
    credentials: 'omit',
    cache: 'no-store',
    signal,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(payload),
  })
  if (!response.ok)
    throw new Error(
      'The contact service could not accept your message. Please try again later or use email.',
    )
  const confirmation = await response.json().catch(() => null)
  if (confirmation?.ok !== true && confirmation?.success !== true)
    throw new Error(
      'The service did not confirm acceptance. Please check before trying again, or use email.',
    )
  return confirmation
}
