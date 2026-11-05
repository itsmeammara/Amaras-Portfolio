import test from 'node:test'
import assert from 'node:assert/strict'
import { skillCategories, getOrbitPages } from '../src/data/skills.js'

test('all requested skills appear once in their required category', () => {
  const expected = {
    languages: [
      'C',
      'C++',
      'Java',
      'JavaScript',
      'TypeScript',
      'Python',
      'PHP',
    ],
    frontend: ['HTML', 'CSS', 'React', 'Angular'],
    backend: ['Node.js', 'Next.js', 'Flask', 'FastAPI', 'Laravel'],
    mobile: ['React Native', 'Expo', 'Flutter', 'Android SDK'],
    databases: ['MySQL', 'SQLite', 'PostgreSQL', 'MongoDB'],
    editors: [
      'Visual Studio Code (VS Code)',
      'PyCharm',
      'IntelliJ IDEA',
      'Cursor',
    ],
    collaboration: ['Git', 'GitHub', 'Docker'],
    cloud: [
      'AWS',
      'Microsoft Azure',
      'Google Cloud Platform (GCP)',
      'Kubernetes',
      'Jenkins',
      'GitHub Actions',
      'CI/CD Pipelines',
    ],
    ai: ['TensorFlow', 'PyTorch'],
    integration: ['REST APIs'],
    professional: [
      'Communication',
      'Teamwork & Collaboration',
      'Problem-Solving',
      'Adaptability',
      'Creativity',
      'Time Management',
    ],
  }
  assert.equal(skillCategories.length, Object.keys(expected).length)
  const names = skillCategories.flatMap((category) =>
    category.items.map((item) => item.name),
  )
  assert.equal(new Set(names).size, names.length)
  for (const category of skillCategories)
    assert.deepEqual(
      category.items.map((item) => item.name),
      expected[category.id],
    )
})

test('descriptions classify frameworks, runtimes, databases and strengths accurately without ratings', () => {
  const items = new Map(
    skillCategories.flatMap((category) =>
      category.items.map((item) => [item.name, item]),
    ),
  )
  for (const [name, kind] of Object.entries({
    'Node.js': 'JavaScript runtime',
    React: 'Frontend library',
    Angular: 'Frontend framework',
    'Next.js': 'React framework',
    Flask: 'Python framework',
    FastAPI: 'Python framework',
    Laravel: 'PHP framework',
    Docker: 'Containerization platform',
    Kubernetes: 'Container orchestration platform',
    MongoDB: 'NoSQL document database',
    TensorFlow: 'Machine learning framework',
    PyTorch: 'Machine learning framework',
  }))
    assert.equal(items.get(name).kind, kind)
  for (const item of items.values()) {
    assert.ok(item.description.length > 20)
    assert.ok(item.icon)
    assert.doesNotMatch(item.description, /\d+%|expert|years of experience/i)
  }
})

test('orbit paging exposes every item without crowding a ring or duplicating items', () => {
  for (const category of skillCategories) {
    const pages = getOrbitPages(category)
    assert.deepEqual(pages.flat(), category.items)
    assert.ok(pages.every((page) => [1, 2, 3, 4, 6].includes(page.length)))
  }
})
