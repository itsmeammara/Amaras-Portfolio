import { useState } from 'react'
import {
  Code2,
  Smartphone,
  Braces,
  Database,
  Terminal,
  MessageCircle,
  Users,
  Lightbulb,
  RefreshCw,
  Palette,
  Clock,
  Orbit,
  Coffee,
  Globe,
  GitBranch,
  MousePointer2,
  Network,
  Server,
  Cloud,
  Layers,
  BrainCircuit,
  Workflow,
  FileCode2,
  ArrowLeft,
  ArrowRight,
} from 'lucide-react'
import Reveal, { SectionTitle } from './Reveal.jsx'
import { skillCategories as categories, getOrbitPages } from '../data/skills.js'

const icons = {
  Code2,
  Smartphone,
  Braces,
  Database,
  Terminal,
  MessageCircle,
  Users,
  Lightbulb,
  RefreshCw,
  Palette,
  Clock,
  Coffee,
  Globe,
  GitBranch,
  MousePointer2,
  Network,
  Server,
  Cloud,
  Layers,
  BrainCircuit,
  Workflow,
  FileCode2,
}
export default function Technologies() {
  const [categoryIndex, setCategoryIndex] = useState(0)
  const [pageIndex, setPageIndex] = useState(0)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const category = categories[categoryIndex]
  const pages = getOrbitPages(category)
  const items = pages[pageIndex]
  const selected = items[selectedIndex]
  const CoreIcon = icons[category.icon]
  function changeCategory(index) {
    setCategoryIndex(index)
    setPageIndex(0)
    setSelectedIndex(0)
  }
  function changePage(index) {
    setPageIndex(index)
    setSelectedIndex(0)
  }
  return (
    <section id="technologies" className="section-space tech-section">
      <div className="page-container">
        <SectionTitle
          number="04"
          label="Skills & strengths"
          description="Explore the languages, development tools, and professional strengths that support my project work."
        >
          A connected
          <br />
          <span className="gradient-text">skill set.</span>
        </SectionTitle>
        <Reveal className="orbital-skills" variant="fade">
          <div
            className="orbit-category-controls"
            role="group"
            aria-label="Skill category"
          >
            {categories.map(({ title, icon }, i) => {
              const Icon = icons[icon]
              return (
                <button
                  key={title}
                  type="button"
                  aria-pressed={categoryIndex === i}
                  aria-controls="skill-orbit"
                  onClick={() => changeCategory(i)}
                >
                  <Icon size={16} aria-hidden="true" />
                  {title}
                </button>
              )
            })}
          </div>
          <label className="orbit-category-select">
            Choose a skill category
            <select
              value={categoryIndex}
              onChange={(event) => changeCategory(Number(event.target.value))}
              aria-controls="skill-orbit"
            >
              {categories.map(({ title }, i) => (
                <option key={title} value={i}>
                  {title}
                </option>
              ))}
            </select>
          </label>
          <div
            id="skill-orbit"
            className="skills-orbit-stage"
            aria-label={category.title}
          >
            <div className="skills-orbit-path" aria-hidden="true" />
            <div
              className="skills-orbit-path orbit-path-inner"
              aria-hidden="true"
            />
            <div className="skills-orbit-core" aria-hidden="true">
              <Orbit className="core-orbit-glyph" size={68} />
              <CoreIcon size={25} />
              <span>{category.short}</span>
            </div>
            {items.map(({ name, icon }, i) => {
              const Icon = icons[icon]
              const angle =
                (((items.length === 4 ? -45 : -90) + (i * 360) / items.length) *
                  Math.PI) /
                180
              return (
                <button
                  key={name}
                  type="button"
                  className="orbit-skill-node"
                  style={{
                    '--orbit-x': Math.cos(angle),
                    '--orbit-y': Math.sin(angle),
                    '--orbit-order': i,
                  }}
                  aria-pressed={selectedIndex === i}
                  aria-controls="skill-orbit-description"
                  onClick={() => setSelectedIndex(i)}
                >
                  <Icon size={24} aria-hidden="true" />
                  <span>{name}</span>
                </button>
              )
            })}
          </div>
          {pages.length > 1 && (
            <div
              className="orbit-page-controls"
              role="group"
              aria-label={`${category.title} orbit pages`}
            >
              <button
                type="button"
                aria-label="Previous technologies"
                disabled={pageIndex === 0}
                onClick={() => changePage(pageIndex - 1)}
              >
                <ArrowLeft size={18} />
              </button>
              <span aria-live="polite">
                Group {pageIndex + 1} of {pages.length}
              </span>
              <button
                type="button"
                aria-label="Next technologies"
                disabled={pageIndex === pages.length - 1}
                onClick={() => changePage(pageIndex + 1)}
              >
                <ArrowRight size={18} />
              </button>
            </div>
          )}
          <div
            className="orbit-skill-detail"
            id="skill-orbit-description"
            aria-live="polite"
            aria-atomic="true"
          >
            <p className="eyebrow">{selected.kind}</p>
            <h3>{selected.name}</h3>
            <p>{selected.description}</p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
