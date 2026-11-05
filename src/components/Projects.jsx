import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'motion/react'
import {
  ArrowUpRight,
  ScanEye,
  Truck,
  Search,
  Star,
  X,
  ArrowRight,
  ArrowLeft,
} from 'lucide-react'
import Reveal, { SectionTitle } from './Reveal.jsx'
const projects = [
  {
    title: 'OcuMetrix',
    subtitle: 'AI Vision Analyzer',
    category: 'AI / HEALTH TECHNOLOGY',
    type: 'vision',
    description:
      'A vision-screening concept with guided checks and an eye-health overview.',
    detail:
      'A concept exploring how guided vision screening, clear visual feedback, and a personal eye-health overview could fit into one accessible interface. This portfolio study is not a diagnostic tool or a deployed medical service.',
    tags: ['Artificial intelligence', 'Interface design', 'Data visualization'],
  },
  {
    title: 'Glamour Shop',
    subtitle: 'A different kind of beautiful.',
    category: 'E-COMMERCE / DIGITAL DESIGN',
    type: 'glamour',
    description:
      'An editorial storefront concept for beauty and jewellery discovery.',
    detail:
      'An editorial storefront concept pairing sculptural product presentation with a simple product discovery and shopping journey. The visual shown here is an original interface study, not a live shop.',
    tags: ['E-commerce', 'Art direction', 'Responsive design'],
  },
  {
    title: 'Swift Cargo',
    subtitle: 'Moving possibilities.',
    category: 'LOGISTICS / WEB PLATFORM',
    type: 'cargo',
    description:
      'A logistics interface concept for shipment visibility and delivery information.',
    detail:
      'A logistics platform concept exploring shipment visibility, route information, and a focused delivery overview. Routes and shipment visuals in this composition are illustrative; no live tracking service is connected.',
    tags: ['Web application', 'Dashboard design', 'Logistics concept'],
  },
  {
    title: 'Recipe Website',
    subtitle: 'Good food. Great discoveries.',
    category: 'LIFESTYLE / WEB EXPERIENCE',
    type: 'recipe',
    description:
      'A recipe-browsing concept centered on clear content and inviting visual presentation.',
    detail:
      'A recipe discovery concept built around inviting food compositions, readable recipe information, and an easy browsing experience. This original portfolio mockup demonstrates the visual direction rather than a connected recipe database.',
    tags: ['Content experience', 'UI/UX', 'Web design'],
  },
]
function ProjectArt({ project }) {
  if (project.type === 'vision')
    return (
      <div className="mockup vision-art" aria-hidden="true">
        <div className="mock-top">
          <span>
            <ScanEye size={14} /> ocumetrix
          </span>
          <span>VISION, REIMAGINED</span>
        </div>
        <div className="vision-layout">
          <div>
            <small>YOUR VISION. A NEW PERSPECTIVE.</small>
            <strong>
              Clarity starts
              <br />
              with a closer look.
            </strong>
            <span className="mock-pill">
              A vision screening concept <ArrowRight size={12} />
            </span>
          </div>
          <div className="digital-eye">
            <span />
            <i />
          </div>
        </div>
        <div className="vision-bottom">
          <span>AI-ASSISTED EXPLORATION</span>
          <span>01 — VISION STUDY</span>
        </div>
      </div>
    )
  if (project.type === 'glamour')
    return (
      <div className="mockup glamour-art" aria-hidden="true">
        <div className="mock-top">
          <span className="glamour-logo">GLAMOUR</span>
          <span>BEAUTY, CONSIDERED.</span>
        </div>
        <div className="glamour-layout">
          <div>
            <small>THE EVERYDAY, ELEVATED</small>
            <strong>
              Beauty in
              <br />
              the details.
            </strong>
            <span className="mock-underline">Discover the collection ↗</span>
          </div>
          <div className="product-stage">
            <div className="jewel-ring" />
            <div className="cosmetic-bottle">
              <i />
              <span>
                G<br />
                <small>ESSENCE</small>
              </span>
            </div>
            <div className="product-plinth" />
          </div>
        </div>
        <div className="mock-bottom">A NEW PERSPECTIVE ON EVERYDAY LUXURY</div>
      </div>
    )
  if (project.type === 'cargo')
    return (
      <div className="mockup cargo-art" aria-hidden="true">
        <div className="mock-top">
          <span>
            <Truck size={16} /> SWIFT CARGO
          </span>
          <span>SHIP SMARTER.</span>
        </div>
        <div className="cargo-layout">
          <div className="cargo-sidebar">
            <span>Overview</span>
            <span>Shipments</span>
            <span>Routes</span>
            <span>Documents</span>
          </div>
          <div className="cargo-map">
            <div className="map-line line-a" />
            <div className="map-line line-b" />
            <i className="map-point point-a" />
            <i className="map-point point-b" />
            <i className="map-point point-c" />
            <div className="shipment-card">
              <Truck size={20} />
              <div>
                Connected journeys.<small>ROUTE VISUALIZATION / CONCEPT</small>
              </div>
            </div>
          </div>
        </div>
        <div className="mock-bottom">FROM HERE. TO WHAT'S NEXT.</div>
      </div>
    )
  return (
    <div className="mockup recipe-art" aria-hidden="true">
      <div className="mock-top">
        <span className="recipe-logo">
          the good plate<span>✳</span>
        </span>
        <Search size={14} />
      </div>
      <div className="recipe-layout">
        <div>
          <small>A LITTLE INSPIRATION, EVERY DAY</small>
          <strong>
            Something
            <br />
            delicious
            <br />
            <em>awaits.</em>
          </strong>
          <span className="mock-underline">Find your next favorite ↗</span>
        </div>
        <div className="food-plate">
          <div className="food-leaf leaf-a" />
          <div className="food-leaf leaf-b" />
          <div className="food-leaf leaf-c" />
          <div className="tomato tomato-a" />
          <div className="tomato tomato-b" />
          <div className="tomato tomato-c" />
          <div className="food-grain" />
        </div>
      </div>
      <div className="mock-bottom">
        <Star size={12} /> MADE FOR THE LOVE OF FOOD
      </div>
    </div>
  )
}
export default function Projects() {
  const [selected, setSelected] = useState(null)
  const dialog = useRef(null)
  const rail = useRef(null)
  const [activeProject, setActiveProject] = useState(0)
  const reduced = useReducedMotion()
  useEffect(() => {
    const cards = Array.from(rail.current.children)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.65)
            setActiveProject(cards.indexOf(entry.target))
        })
      },
      { root: rail.current, threshold: [0.65] },
    )
    cards.forEach((card) => observer.observe(card))
    return () => observer.disconnect()
  }, [])
  function moveProject(direction) {
    const next = Math.max(
      0,
      Math.min(projects.length - 1, activeProject + direction),
    )
    rail.current.scrollTo({
      left: rail.current.children[next].offsetLeft,
      behavior: reduced ? 'instant' : 'smooth',
    })
  }
  function show(project) {
    setSelected(project)
    dialog.current.showModal()
  }
  return (
    <section id="projects" className="section-space page-container">
      <div className="projects-heading">
        <SectionTitle
          number="03"
          label="My projects"
          description="Interface studies across health technology, commerce, logistics, and everyday discovery."
        >
          Selected work.
          <br />
          <span className="gradient-text">Explored in detail.</span>
        </SectionTitle>
        <span className="section-side-note">
          FOUR PERSPECTIVES.
          <br />
          MY CREATIVE EXPLORATIONS.
        </span>
      </div>
      <div className="project-gallery-controls">
        <p aria-live="polite">
          {String(activeProject + 1).padStart(2, '0')}{' '}
          <span>
            / {String(projects.length).padStart(2, '0')} —{' '}
            {projects[activeProject].title}
          </span>
        </p>
        <div>
          <button
            type="button"
            aria-label="Previous project"
            onClick={() => moveProject(-1)}
            disabled={activeProject === 0}
          >
            <ArrowLeft size={19} />
          </button>
          <button
            type="button"
            aria-label="Next project"
            onClick={() => moveProject(1)}
            disabled={activeProject === projects.length - 1}
          >
            <ArrowRight size={19} />
          </button>
        </div>
      </div>
      <div
        ref={rail}
        className="projects-grid interactive-project-rail"
        tabIndex={0}
        role="region"
        aria-label="Featured projects. Scroll horizontally or use the previous and next buttons."
        onKeyDown={(event) => {
          if (event.target !== rail.current) return
          if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
            event.preventDefault()
            moveProject(event.key === 'ArrowRight' ? 1 : -1)
          }
        }}
      >
        {projects.map((project, i) => (
          <Reveal
            key={project.title}
            className={`project project-${project.type}`}
            stagger
            delay={(i % 2) * 0.1}
          >
            <button
              className="project-art-button"
              onClick={() => show(project)}
              aria-label={`View ${project.title} project details`}
            >
              <ProjectArt project={project} />
              <span className="project-open">
                <ArrowUpRight size={24} />
              </span>
            </button>
            <div className="project-meta">
              <div>
                <p className="eyebrow">{project.category}</p>
                <h3>
                  {project.title}{' '}
                  <span>
                    {project.type === 'vision' ? '— AI Vision Analyzer' : ''}
                  </span>
                </h3>
              </div>
              <button className="text-link" onClick={() => show(project)}>
                View Project <ArrowUpRight size={16} />
              </button>
            </div>
            <p className="project-description">{project.description}</p>
          </Reveal>
        ))}
      </div>
      <dialog
        ref={dialog}
        aria-labelledby="project-dialog-title"
        className="project-dialog"
        onClick={(e) => {
          if (e.target === dialog.current) dialog.current.close()
        }}
      >
        <button
          className="dialog-close"
          aria-label="Close project details"
          onClick={() => dialog.current.close()}
        >
          <X />
        </button>
        {selected && (
          <>
            <p className="eyebrow">PORTFOLIO CONCEPT / {selected.category}</p>
            <h2 id="project-dialog-title">{selected.title}</h2>
            <div className="dialog-preview">
              <ProjectArt project={selected} />
            </div>
            <p>{selected.detail}</p>
            {selected.url ? (
              <a
                className="text-link"
                href={selected.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Open live project <ArrowUpRight size={16} />
              </a>
            ) : (
              <p className="project-availability">
                Concept study — a live demo is not available.
              </p>
            )}
            <div className="project-tags">
              {selected.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
            <a
              className="button button-primary"
              href="#contact"
              onClick={() => dialog.current.close()}
            >
              Discuss a similar idea <ArrowUpRight size={17} />
            </a>
          </>
        )}
      </dialog>
    </section>
  )
}
