import { ArrowDown, ArrowUpRight } from 'lucide-react'
import Reveal from './Reveal.jsx'
export default function Hero() {
  return (
    <section id="home" className="hero-section reference-hero">
      <div className="page-container hero-grid">
        <Reveal className="hero-copy" stagger>
          <h1 className="dimension-headline" aria-label="Umme Amara">
            <span className="glitch-word" data-text="UMME" aria-hidden="true">
              UMME
            </span>
            <span
              className="glitch-word spectrum-word"
              data-text="AMARA"
              aria-hidden="true"
            >
              AMARA
            </span>
          </h1>
          <p className="hero-role">
            Creative Mind.
            <br />
            <span>Technical Vision.</span>
          </p>
          <details className="hero-story">
            <summary>
              My approach <ArrowUpRight size={14} />
            </summary>
            <p className="hero-description">
              Driven by curiosity, I turn ideas into responsive digital
              experiences through thoughtful design, modern development and
              emerging AI technologies.
            </p>
          </details>
        </Reveal>
      </div>
      <Reveal
        as="a"
        href="#about"
        className="hero-scroll-cue"
        variant="fade"
        delay={0.2}
      >
        <span>Scroll to discover</span>
        <ArrowDown size={17} />
        <i />
      </Reveal>
    </section>
  )
}
