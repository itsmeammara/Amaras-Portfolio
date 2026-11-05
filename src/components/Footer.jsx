import { ArrowUp } from 'lucide-react'
import Reveal from './Reveal.jsx'
import BrandMark from './BrandMark.jsx'
export default function Footer() {
  return (
    <footer className="site-footer page-container">
      <Reveal className="footer-top" stagger>
        <div>
          <a className="wordmark" href="#home">
            <BrandMark />
          </a>
          <p>
            Front-end development.
            <br />
            Mobile application design.
          </p>
        </div>
        <div className="footer-links">
          <span>EXPLORE</span>
          <a href="#about">About me</a>
          <a href="#projects">My projects</a>
          <a href="#technologies">My skills</a>
          <a href="#contact">Let’s connect</a>
        </div>
        <div className="footer-links">
          <span>MY JOURNEY</span>
          <a href="#process">Education &amp; internship</a>
          <a href="#process">Certifications</a>
          <a href="#services">Creative interests</a>
        </div>
        <a href="#home" className="back-top" aria-label="Back to top">
          <ArrowUp size={22} />
        </a>
      </Reveal>
      <Reveal className="footer-bottom" variant="fade" delay={0.1}>
        <span>© {new Date().getFullYear()} Umme Amara</span>
        <span>FRONT-END &amp; MOBILE APPLICATION DEVELOPMENT</span>
        <span>ALWAYS LEARNING.</span>
      </Reveal>
    </footer>
  )
}
