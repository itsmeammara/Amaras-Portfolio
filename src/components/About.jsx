import { ArrowUpRight } from 'lucide-react'
import Reveal, { SectionTitle } from './Reveal.jsx'
import PersonalPortrait from './PersonalPortrait.jsx'
export default function About() {
  return (
    <section
      id="about"
      className="section-space page-container about-section personal-about"
    >
      <SectionTitle number="01" label="About me">
        Creative
        <br />
        <span className="gradient-text">Perspective.</span>
      </SectionTitle>
      <div className="about-cards">
        <Reveal className="about-story glass-panel" variant="left" stagger>
          <div className="story-heading">
            <h3>About Me</h3>
          </div>
          <p className="about-copy">
            Hi, I'm Umme Ammara! I bring together technology, creativity, and problem-solving to build digital experiences that are both functional and visually engaging.
          </p>
          <p className="about-copy">
            With an interest in modern web and mobile development, I explore new
            tools, refine ideas, and develop practical solutions through
            hands-on projects.
          </p>
          <p>
            <a className="text-link" href="mailto:umeammara291@gmail.com">
              umeammara291@gmail.com
            </a>
          </p>
          <a className="text-link" href="#contact">
            Start a conversation <ArrowUpRight size={17} />
          </a>
        </Reveal>
        <PersonalPortrait />
      </div>
    </section>
  )
}
