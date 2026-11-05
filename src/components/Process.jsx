import { GraduationCap, BriefcaseBusiness, BadgeCheck } from 'lucide-react'
import Reveal, { SectionTitle } from './Reveal.jsx'
export default function Process() {
  return (
    <section id="process" className="section-space page-container">
      <SectionTitle number="05" label="My journey">
        Experience &
        <br />
        <span className="gradient-text">continued learning.</span>
      </SectionTitle>
      <div className="journey-grid">
        <Reveal className="journey-card" variant="left">
          <GraduationCap size={25} aria-hidden="true" />
          <p className="eyebrow">EDUCATION</p>
          <h3>Bachelor’s in Computer Science</h3>
          <p>COMSATS University Islamabad, Attock Campus</p>
          <p className="journey-note">
            A foundation for my work in software, interfaces, and application
            development.
          </p>
        </Reveal>
        <Reveal className="journey-card" delay={0.06}>
          <BriefcaseBusiness size={25} aria-hidden="true" />
          <p className="eyebrow">INTERNSHIP</p>
          <h3>Rapido Solutions Co.</h3>
          <p>
            At Rapido Solutions Co., my internship involved front-end and
            application development, WordPress, and collaborative development
            workflows.
          </p>
        </Reveal>
        <Reveal className="journey-card" variant="right" delay={0.12}>
          <BadgeCheck size={25} aria-hidden="true" />
          <p className="eyebrow">CERTIFICATIONS</p>
          <h3>Continuing to learn</h3>
          <ul>
            <li>
              <strong>Gemini Certified Student</strong>
              <span>Google for Education</span>
            </li>
            <li>
              <strong>CIP</strong>
              <span>OPSWAT Academy</span>
            </li>
            <li>
              <strong>Introduction to Generative AI</strong>
              <span>Google Cloud / Simplilearn SkillUp</span>
            </li>
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
