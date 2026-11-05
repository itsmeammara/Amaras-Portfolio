// Factual classifications, not proficiency or employment claims.
const skill = (name, kind, description, icon) => ({
  name,
  kind,
  description,
  icon,
})
export const skillCategories = [
  {
    id: 'languages',
    title: 'Programming Languages',
    short: 'Languages',
    icon: 'Braces',
    items: [
      skill(
        'C',
        'Programming language',
        'A procedural language for structured and systems-oriented programming.',
        'Code2',
      ),
      skill(
        'C++',
        'Programming language',
        'A language supporting procedural, object-oriented, and generic programming.',
        'Code2',
      ),
      skill(
        'Java',
        'Programming language',
        'Object-oriented programming and structured application logic.',
        'Coffee',
      ),
      skill(
        'JavaScript',
        'Programming language',
        'Interactive web interfaces and application logic.',
        'Braces',
      ),
      skill(
        'TypeScript',
        'Programming language',
        'JavaScript with a static type system for application development.',
        'FileCode2',
      ),
      skill(
        'Python',
        'Programming language',
        'A general-purpose language used across applications, automation, and data workflows.',
        'Terminal',
      ),
      skill(
        'PHP',
        'Programming language',
        'A scripting language commonly used for server-side web development.',
        'Code2',
      ),
    ],
  },
  {
    id: 'frontend',
    title: 'Frontend Development',
    short: 'Frontend',
    icon: 'Code2',
    items: [
      skill(
        'HTML',
        'Frontend technology',
        'Semantic page structure for accessible, well-organized interfaces.',
        'Code2',
      ),
      skill(
        'CSS',
        'Frontend technology',
        'Responsive layouts, visual styling, and purposeful interface motion.',
        'Palette',
      ),
      skill(
        'React',
        'Frontend library',
        'Component-based interfaces built with JavaScript.',
        'Layers',
      ),
      skill(
        'Angular',
        'Frontend framework',
        'A framework for structured, component-based web applications.',
        'Network',
      ),
    ],
  },
  {
    id: 'backend',
    title: 'Backend & Full-Stack Development',
    short: 'Full-stack',
    icon: 'Server',
    items: [
      skill(
        'Node.js',
        'JavaScript runtime',
        'Running JavaScript outside the browser for application services and APIs.',
        'Server',
      ),
      skill(
        'Next.js',
        'React framework',
        'React-based web applications with integrated routing and rendering tools.',
        'Globe',
      ),
      skill(
        'Flask',
        'Python framework',
        'A lightweight framework for web applications and HTTP services.',
        'Server',
      ),
      skill(
        'FastAPI',
        'Python framework',
        'A framework for building HTTP APIs with Python type hints.',
        'Network',
      ),
      skill(
        'Laravel',
        'PHP framework',
        'A framework providing structure and tooling for PHP web applications.',
        'Layers',
      ),
    ],
  },
  {
    id: 'mobile',
    title: 'Mobile & Cross-Platform Development',
    short: 'Mobile',
    icon: 'Smartphone',
    items: [
      skill(
        'React Native',
        'Cross-platform mobile framework',
        'Native mobile interfaces built with reusable React components.',
        'Smartphone',
      ),
      skill(
        'Expo',
        'React Native development platform',
        'Tools and services supporting cross-platform React Native applications.',
        'Smartphone',
      ),
      skill(
        'Flutter',
        'Cross-platform UI framework',
        'A framework for building interfaces across mobile and other platforms.',
        'Layers',
      ),
      skill(
        'Android SDK',
        'Android development toolkit',
        'Tools and platform APIs for Android application development.',
        'Smartphone',
      ),
    ],
  },
  {
    id: 'databases',
    title: 'Databases',
    short: 'Data',
    icon: 'Database',
    items: [
      skill(
        'MySQL',
        'Relational database',
        'Structured data storage and querying with SQL.',
        'Database',
      ),
      skill(
        'SQLite',
        'Relational database',
        'An embedded SQL database stored within an application or local file.',
        'Database',
      ),
      skill(
        'PostgreSQL',
        'Relational database',
        'Relational data modeling and SQL-based application storage.',
        'Database',
      ),
      skill(
        'MongoDB',
        'NoSQL document database',
        'Document-based storage for flexible application data.',
        'Database',
      ),
    ],
  },
  {
    id: 'editors',
    title: 'Development Environments & IDEs',
    short: 'Editors',
    icon: 'Terminal',
    items: [
      skill(
        'Visual Studio Code (VS Code)',
        'Code editor',
        'Editing, debugging, and organizing development work.',
        'Code2',
      ),
      skill(
        'PyCharm',
        'Integrated development environment',
        'An IDE focused on Python development workflows.',
        'Terminal',
      ),
      skill(
        'IntelliJ IDEA',
        'Integrated development environment',
        'An IDE supporting Java and other application development workflows.',
        'Code2',
      ),
      skill(
        'Cursor',
        'AI-assisted code editor',
        'AI-assisted editing within a code-focused development workflow.',
        'MousePointer2',
      ),
    ],
  },
  {
    id: 'collaboration',
    title: 'Version Control & Collaboration',
    short: 'Workflow',
    icon: 'GitBranch',
    items: [
      skill(
        'Git',
        'Version control system',
        'Tracking source changes, branches, and development history.',
        'GitBranch',
      ),
      skill(
        'GitHub',
        'Code hosting & collaboration platform',
        'Repository management, code review, and collaborative development.',
        'GitBranch',
      ),
      skill(
        'Docker',
        'Containerization platform',
        'Packaging applications and dependencies in containers for consistent environments.',
        'Layers',
      ),
    ],
  },
  {
    id: 'cloud',
    title: 'Cloud & DevOps',
    short: 'Cloud',
    icon: 'Cloud',
    items: [
      skill(
        'AWS',
        'Cloud platform',
        'Cloud infrastructure and managed application services.',
        'Cloud',
      ),
      skill(
        'Microsoft Azure',
        'Cloud platform',
        'Cloud infrastructure and application services from Microsoft.',
        'Cloud',
      ),
      skill(
        'Google Cloud Platform (GCP)',
        'Cloud platform',
        'Cloud infrastructure, data, and application services from Google.',
        'Cloud',
      ),
      skill(
        'Kubernetes',
        'Container orchestration platform',
        'Coordinating the deployment and operation of containerized applications.',
        'Network',
      ),
      skill(
        'Jenkins',
        'CI/CD automation server',
        'Automating build, test, and delivery workflows.',
        'Workflow',
      ),
      skill(
        'GitHub Actions',
        'CI/CD automation platform',
        'Repository-based automation for building, testing, and delivery.',
        'GitBranch',
      ),
      skill(
        'CI/CD Pipelines',
        'Development automation workflow',
        'Connecting integration checks, builds, and deployment steps in a repeatable workflow.',
        'Workflow',
      ),
    ],
  },
  {
    id: 'ai',
    title: 'AI & Machine Learning',
    short: 'AI / ML',
    icon: 'BrainCircuit',
    items: [
      skill(
        'TensorFlow',
        'Machine learning framework',
        'Tools for building and working with machine learning models.',
        'BrainCircuit',
      ),
      skill(
        'PyTorch',
        'Machine learning framework',
        'Tensor computation and tools for developing machine learning models.',
        'BrainCircuit',
      ),
    ],
  },
  {
    id: 'integration',
    title: 'APIs & Integration',
    short: 'APIs',
    icon: 'Network',
    items: [
      skill(
        'REST APIs',
        'Application communication & integration',
        'Resource-oriented HTTP interfaces that connect applications and services.',
        'Network',
      ),
    ],
  },
  {
    id: 'professional',
    title: 'Professional & Soft Skills',
    short: 'Strengths',
    icon: 'Users',
    items: [
      skill(
        'Communication',
        'Professional strength',
        'Expressing ideas clearly and listening to different perspectives.',
        'MessageCircle',
      ),
      skill(
        'Teamwork & Collaboration',
        'Professional strength',
        'Sharing context, coordinating work, and contributing to shared goals.',
        'Users',
      ),
      skill(
        'Problem-Solving',
        'Professional strength',
        'Breaking down challenges and evaluating practical solutions.',
        'Lightbulb',
      ),
      skill(
        'Adaptability',
        'Professional strength',
        'Responding thoughtfully to new tools, requirements, and feedback.',
        'RefreshCw',
      ),
      skill(
        'Creativity',
        'Professional strength',
        'Connecting technical possibilities with thoughtful visual ideas.',
        'Palette',
      ),
      skill(
        'Time Management',
        'Professional strength',
        'Prioritizing tasks and organizing work around clear goals.',
        'Clock',
      ),
    ],
  },
]

// Keep existing six-node arrangements; split larger sets and five-node sets
// into balanced, readable pages rather than crowding the mobile orbit.
export function getOrbitPages(category) {
  const size =
    category.items.length === 5
      ? 3
      : category.items.length > 6
        ? 4
        : category.items.length
  return Array.from(
    { length: Math.ceil(category.items.length / size) },
    (_, i) => category.items.slice(i * size, (i + 1) * size),
  )
}
