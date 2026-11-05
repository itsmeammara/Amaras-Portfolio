# Umme Amara - personal portfolio

React + Vite + JavaScript, Tailwind CSS v4 (`@tailwindcss/vite`), Motion, and Lucide React. No new dependencies were added for the personal portfolio update.

## Run

- `npm install` (only when dependencies are missing)
- `npm run dev`
- `npm run build`
- `npm run preview`

## Content

Existing components and section anchors are retained. Services presents personal creative interests; Technologies restores a circular orbital presentation with category switching: 11 accurately separated categories, with paging for larger groups and a compact mobile category selector. Skill data and classifications live in `src/data/skills.js`. Process presents the supplied degree, internship, and certifications. No dates, proficiency ratings, client claims, or invented employment responsibilities are included. Add verified dates, certificate links, and project technology stacks only when available.

The four project cards preserve their existing concept previews, descriptions, native dialogs, and unavailable-live-demo disclosures. No live project addresses are fabricated.

About has a compact professional text box beside a compact 4:5 floating portrait sticker. `src/assets/profile/portrait.jpg` is the exact original photograph; it is not recompressed or replaced. The source file is preserved; a face-focused 4:5 CSS crop is used for the sticker. The text and photo reveal from opposite directions with repeatable, reduced-motion-aware transitions.

## Contact

The contact form uses Formspree on GitHub/Vercel with no extra dependencies. It requires Name, Email, and Message, includes a hidden `_gotcha` spam field, prevents duplicate in-flight requests, and reports success only after service confirmation. Direct email remains visible as a fallback. No local brief or download workflow remains in the contact UI.

### Contact delivery configuration

1. The verified public endpoint `https://formspree.io/f/meaannep` is configured as the application default. No environment setup is required to use this form locally or on Vercel.
2. The recipient is `umeammara291@gmail.com`. Keep email notifications enabled in the Formspree dashboard.
3. To override the endpoint later, set `VITE_CONTACT_ENDPOINT` in `.env.local` or Vercel environment settings. Restart the local dev server or rebuild/redeploy after changing it. Never use a private API key here.
4. For Vercel, import the GitHub repository, select Vite, use build command `npm run build` and output `dist`.
5. For GitHub Pages, the same public endpoint is bundled into the build; GitHub itself does not process submissions.
6. Enable Formspree spam filtering and any dashboard domain restrictions for your deployed domain. If a CAPTCHA challenge is required, the form reports an error and offers direct email; choose compatible form settings and test them before launch.

All `VITE_` variables are embedded in the public frontend. Only the public submission URL and recipient email belong here; never put keys or secrets in them. If an override is invalid or delivery fails, the direct email link remains available.

### Pre-deployment contact test

- Run the contact regression tests and `npm run build`.
- On the deployed HTTPS site, check desktop/mobile layouts in both themes and click the visible email link.
- Submit blank fields and an invalid email: validation should focus the first invalid field and no network request should be sent.
- Submit a unique message using your own real email. Confirm the success notice, the submission in Formspree, and the notification in `umeammara291@gmail.com` (check Spam too). Service acceptance alone does not prove inbox delivery.
- Simulate offline mode in browser DevTools and submit: an error should appear, inputs should remain, and the direct email fallback should remain available. Restore the network before retrying.
- Confirm an empty honeypot is included in the request. Test spam handling through the service dashboard; do not expect a real delivery for a filled honeypot.

## Themes and motion

The minimal sun/moon toggle preserves its existing persistence key for returning visitors, defaults to dark, and synchronizes tabs. The before-paint initializer restores saved preferences. Experience modes and the ambient-motion pause control retain low-power, touch-device, visibility, and reduced-motion handling. Reveal is visible by default if observation is unavailable; essential contact content never disappears.

Local Space Grotesk and Funnel Display fonts retain their SIL Open Font Licenses in `public/fonts`. Original cinematic media, orbital CSS scene, pointer springs, project art, and native horizontal project scrolling remain in place.

## Verification

`node --test tests/theme.test.mjs tests/phase3.test.mjs tests/skills.test.mjs` runs theme, contact, video-mapping and device-mode regression tests. A production build validates the complete component graph and local assets.
