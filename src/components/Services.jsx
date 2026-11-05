import {
  Code2,
  Smartphone,
  BrainCircuit,
  Box,
  PenTool,
  Sparkles,
  ArrowUpRight,
  Plus,
} from 'lucide-react'
import Reveal, { SectionTitle } from './Reveal.jsx'
import TiltSurface from './TiltSurface.jsx'

const services = [
  [
    Code2,
    'Web Development',
    'I’m interested in building responsive websites and expressive interfaces.',
    ['Modern websites', 'Responsive interfaces', 'Interactive web experiences'],
  ],
  [
    Smartphone,
    'Mobile App Development',
    'I explore mobile application development with React Native.',
    [
      'Mobile application concepts',
      'Modern mobile interfaces',
      'Smooth user experiences',
    ],
  ],
  [
    BrainCircuit,
    'Artificial Intelligence',
    'I’m interested in AI-powered applications and useful intelligent interactions.',
    [
      'AI-powered applications',
      'AI application concepts',
      'AI integration & conversations',
    ],
  ],
  [
    Box,
    '3D Design & Visualization',
    'I explore depth and motion as part of creative digital experiences.',
    ['3D environments', 'Digital objects', 'Interactive visual experiences'],
  ],
  [
    PenTool,
    'UI/UX & Creative Design',
    'I care about readable, thoughtful interfaces and the people using them.',
    [
      'User-centered design',
      'Interface consistency',
      'Modern digital interfaces',
    ],
  ],
  [
    Sparkles,
    'Digital Innovation',
    'I enjoy experimenting with ideas and learning through creative technology.',
    [
      'Creative technology concepts',
      'Interactive experiences',
      'Experimental digital solutions',
    ],
  ],
]
function ServiceCard({ service, index, compact = false }) {
  const [Icon, title, description, items] = service
  return (
    <Reveal
      className={`visual-service ${compact ? 'compact-service' : ''}`}
      delay={(index % 2) * 0.06}
      variant={index % 2 ? 'right' : 'left'}
    >
      <TiltSurface
        className={`service-card visual-service-card accent-${index}`}
      >
        <div className="capability-object" aria-hidden="true">
          <div className="capability-orbit" />
          <div className="capability-orbit orbit-alt" />
          <div className="capability-gem">
            <Icon size={68} strokeWidth={1.1} />
          </div>
          <span>0{index + 1}</span>
        </div>
        <h3>{title}</h3>
        <details className="capability-details">
          <summary>
            <span>Explore this interest</span>
            <Plus size={17} aria-hidden="true" />
          </summary>
          <div className="capability-content">
            <p>{description}</p>
            <ul>
              {items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <a
              className="service-link"
              href="#contact"
              aria-label={`Discuss ${title}`}
            >
              Let’s connect <ArrowUpRight size={18} />
            </a>
          </div>
        </details>
      </TiltSurface>
    </Reveal>
  )
}
export default function Services() {
  return (
    <section id="services" className="section-space services-section">
      <div className="page-container">
        <SectionTitle
          number="02"
          label="My interests"
          description="My project interests span interface engineering, mobile applications, and creative technology."
        >
          Areas of focus.
          <br />
          <span className="gradient-text">Developed through practice.</span>
        </SectionTitle>
        <div className="visual-services-grid">
          {services.slice(0, 4).map((service, index) => (
            <ServiceCard key={service[1]} service={service} index={index} />
          ))}
        </div>
        <div className="supporting-services">
          {services.slice(4).map((service, index) => (
            <ServiceCard
              key={service[1]}
              service={service}
              index={index + 4}
              compact
            />
          ))}
        </div>
      </div>
    </section>
  )
}
