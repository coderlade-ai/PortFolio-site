export type ProjectCategory =
  | 'all'
  | 'developer-tools'
  | 'documents-media'
  | 'utilities-games'
  | 'explorations';

export interface ProjectUseCase {
  title: string;
  description: string;
}

export interface ProjectItem {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  category: Exclude<ProjectCategory, 'all'>;
  categoryLabel: string;
  role: string;
  statusLabel: string;
  isProvisional?: boolean;
  featuredSpan?: 'wide' | 'standard';
  url?: string;
  repoUrl?: string;
  overview: string;
  useCases: ProjectUseCase[];
  stack: string[];
  note?: string;
  previewType:
    | 'ecosystem'
    | 'ide'
    | 'pdf'
    | 'markdown'
    | 'land'
    | 'resume'
    | 'image'
    | 'games'
    | 'drive';
}

export interface ExplorationItem {
  id: string;
  name: string;
  status: 'Concept' | 'In development' | 'Prototype' | 'Exploratory';
  summary: string;
  focusAreas: string[];
  links?: { label: string; url: string }[];
}

export interface StrengthDomain {
  id: string;
  domain: string;
  summary: string;
  technologies: string[];
  application: string;
}

export interface ProfileData {
  fullName: string;
  displayName: string;
  headline: string;
  secondaryHeadline: string;
  location: string;
  brandName: string;
  brandUrl: string;
  contactEmail: string;
  heroEyebrow: string;
  heroHeadline: string;
  heroSubheading: string;
  positioningStatement: string;
  shortBio: string;
  mediumBio: string;
  extendedBio: string[];
  social: {
    label: string;
    handle: string;
    url: string;
  }[];
  storyChapters: {
    index: string;
    title: string;
    body: string;
  }[];
  education: {
    stage: string;
    institution: string;
    field: string;
    detail: string;
  }[];
  visionMission: {
    personalVision: string;
    personalMission: string;
    ladeStackVision: string;
    ladeStackMission: string;
    languages: string[];
  };
  coreValues: {
    index: string;
    title: string;
    description: string;
  }[];
  approachSteps: {
    index: string;
    title: string;
    description: string;
  }[];
  technicalChallenges: {
    title: string;
    description: string;
  }[];
  offerings: {
    index: string;
    title: string;
    description: string;
  }[];
  strengthDomains: StrengthDomain[];
  learningLandscape: {
    category: string;
    items: string[];
  }[];
  qualitativeHighlights: string[];
  closingQuote: string;
}

export const PROFILE: ProfileData = {
  fullName: 'Girish Balaso Lade',
  displayName: 'Girish Lade',
  headline: 'UI/UX Designer · Full-Stack Developer · Founder of LadeStack',
  secondaryHeadline: 'Engineer by training. Product builder by choice.',
  location: 'Pune, Maharashtra, India',
  brandName: 'LadeStack',
  brandUrl: 'https://ladestack.in/',
  contactEmail: 'admin@ladestack.in',
  heroEyebrow: 'Girish Lade · Pune, India',
  heroHeadline: 'Building useful software with thoughtful design.',
  heroSubheading:
    "I'm Girish, a UI/UX designer and full-stack developer building LadeStack — an independent ecosystem of accessible, privacy-conscious developer tools and practical web apps.",
  positioningStatement:
    'I build useful, accessible, privacy-conscious software — tools that help developers, students, independent creators, and everyday users get things done without unnecessary friction.',
  shortBio:
    "I'm Girish Lade, a UI/UX designer, full-stack developer, and founder of LadeStack. I combine an engineering mindset with design-led product development to build free, useful, and privacy-conscious tools for developers, students, and creators.",
  mediumBio:
    "I'm Girish Balaso Lade, an independent developer and product designer based in Pune, India. My academic path began in Mechanical Engineering, while my professional curiosity took me into web development, interaction design, AI-assisted software creation, and browser-native computing. I founded LadeStack to bring practical tools into one developer-friendly ecosystem.",
  extendedBio: [
    "I'm an engineer by education and a software product builder by choice. My background in Mechanical Engineering shaped how I approach problems: identify constraints, understand the system, simplify the process, and iterate until the result becomes dependable. Over time, that problem-solving mindset found a new outlet in software engineering, UI/UX design, and product architecture.",
    'Today, I design and develop modern websites, full-stack applications, browser-based utilities, and experimental AI-powered developer tools. My work spans the experience users see — information architecture, visual systems, responsive interaction, and accessibility — and the systems that make those experiences possible: TypeScript and Node.js applications, modern frontend frameworks, storage design, authentication patterns, deployment pipelines, and client-side execution environments.',
    'I started LadeStack as an independent product brand built around a straightforward belief: everyday software should be useful before it is complicated. A developer should be able to open an IDE without a burdensome setup; a student should be able to turn notes into a clean PDF; a job seeker should be able to create a professional resume; and someone working with personal documents should not be forced to upload them to an unknown server when local processing is practical.',
    'I frequently explore AI coding agents and multi-model workflows, treating AI as a development accelerator rather than a substitute for verification, architecture, or user-centered thinking. My long-term goal is to grow LadeStack into a coherent, trustworthy ecosystem that helps more people learn, build, and create.',
  ],
  social: [
    {
      label: 'LadeStack',
      handle: 'ladestack.in',
      url: 'https://ladestack.in/',
    },
    {
      label: 'GitHub',
      handle: 'github.com/girishlade111',
      url: 'https://github.com/girishlade111',
    },
    {
      label: 'LinkedIn',
      handle: 'in/girish-lade',
      url: 'https://www.linkedin.com/in/girish-lade/',
    },
    {
      label: 'CodePen',
      handle: 'Girish-Lade-the-looper',
      url: 'https://codepen.io/Girish-Lade-the-looper',
    },
    {
      label: 'Instagram',
      handle: '@girish_lade_',
      url: 'https://www.instagram.com/girish_lade_/',
    },
  ],
  storyChapters: [
    {
      index: '01',
      title: 'An Engineering Foundation',
      body: 'Formal education in Mechanical Engineering introduced structured thinking, precision, trade-offs, and solving problems within real constraints — principles now applied directly to interface architecture and software systems.',
    },
    {
      index: '02',
      title: 'Connecting Design and Code',
      body: 'Rather than treating design and engineering as separate worlds, I focus on where they meet: clear information hierarchy, responsive interaction, and reliable implementation underneath.',
    },
    {
      index: '03',
      title: 'Building With AI Intentionally',
      body: 'I work with agentic editors, model APIs, and BYOK workflows to move from concept to working prototype faster, while keeping verification, architecture, and user control firmly in human hands.',
    },
    {
      index: '04',
      title: 'Why LadeStack Exists',
      body: 'Too many everyday tasks hide behind forced sign-ups, unnecessary file uploads, or cluttered dashboards. LadeStack focuses on direct browser-first utilities that open fast and get out of the way.',
    },
  ],
  education: [
    {
      stage: 'Engineering Studies',
      institution: "SVERI's College of Engineering, Pandharpur",
      field: 'Mechanical Engineering',
      detail: 'Undergraduate mechanical engineering studies (degree completion not listed as finalized)',
    },
    {
      stage: 'Diploma',
      institution: 'Fabtech Technical Campus',
      field: 'Diploma in Mechanical Engineering',
      detail: 'Completed in 2021',
    },
    {
      stage: 'Self-Directed Practice',
      institution: 'Project-Driven Engineering & UI/UX',
      field: 'Full-Stack Web, Browser Runtimes & AI Workflows',
      detail: 'Continuous learning through shipping, documenting, and iterating on public tools',
    },
  ],
  visionMission: {
    personalVision:
      'To help make sophisticated software creation and everyday digital productivity more accessible through practical tools, intuitive design, and open technologies.',
    personalMission:
      'To design, build, document, and continuously improve software that saves time, respects users, and removes unnecessary barriers to creation.',
    ladeStackVision:
      'A developer-friendly ecosystem where high-quality tools are accessible, connected by a consistent product philosophy, and useful from the first click.',
    ladeStackMission:
      'Make essential developer and productivity workflows faster, simpler, more private, and less expensive — prioritizing on-device processing wherever feasible.',
    languages: [
      'English (en)',
      'Japanese (ja)',
      'Korean (ko)',
      'Simplified Chinese (zh)',
      'Russian (ru)',
      'Turkish (tr)',
      'French (fr)',
      'Portuguese (pt)',
      'Spanish (es)',
    ],
  },
  coreValues: [
    {
      index: '01',
      title: 'Utility before hype',
      description: 'A product should solve a real problem and make its value obvious through immediate use.',
    },
    {
      index: '02',
      title: 'Privacy by architecture',
      description: 'Prefer local execution, data minimization, and transparent handling of files and keys when feasible.',
    },
    {
      index: '03',
      title: 'Accessible by default',
      description: 'Make practical workflows approachable for students, learners, and independent builders.',
    },
    {
      index: '04',
      title: 'Design clarity',
      description: 'Turn complex workflows into legible hierarchy, predictable controls, and clear feedback.',
    },
    {
      index: '05',
      title: 'Technical honesty',
      description: 'Distinguish shipped behavior from roadmap plans; never overstate security or verification claims.',
    },
    {
      index: '06',
      title: 'Ownership and portability',
      description: 'Let users export their documents, code, and drafts in standard, durable formats.',
    },
  ],
  approachSteps: [
    {
      index: '01',
      title: 'Define the real problem',
      description: 'Identify the user, the concrete task, existing friction, and what a simpler workflow looks like.',
    },
    {
      index: '02',
      title: 'Separate essentials from extras',
      description: 'Build the cleanest working core first before layering optional integrations or settings.',
    },
    {
      index: '03',
      title: 'Match architecture to the task',
      description: 'Decide intentionally what belongs in static HTML, client-side memory, IndexedDB, or a backend service.',
    },
    {
      index: '04',
      title: 'Craft responsive interactions',
      description: 'Pair readable typography, accessible keyboard flows, and clear empty or error states.',
    },
    {
      index: '05',
      title: 'Respect privacy boundaries',
      description: 'Minimize external transfers and communicate clearly whenever a third-party API is involved.',
    },
    {
      index: '06',
      title: 'Document, ship, and iterate',
      description: 'Use real runtime evidence and user feedback to refine behavior over time.',
    },
  ],
  technicalChallenges: [
    {
      title: 'Designing Local-First Applications',
      description:
        'Balancing instant onboarding with browser storage quotas, multi-tab consistency, clear export portability, and resilience when site data is cleared.',
    },
    {
      title: 'Browser-Native Development Workspaces',
      description:
        'Pairing Monaco Editor with WebContainer runtimes while respecting cross-origin isolation, memory limits, and graceful fallbacks on unsupported browsers.',
    },
    {
      title: 'Structured Document Publishing',
      description:
        'Turning GitHub-Flavored Markdown into clean multi-chapter PDFs with sanitized HTML, KaTeX math, syntax highlighting, page breaks, and table of contents generation.',
    },
    {
      title: 'Responsible BYOK AI Integration',
      description:
        'Building provider-flexible workflows where users control models, prompts, and keys while clearly separating local processing from external API calls.',
    },
    {
      title: 'Multilingual Static Architecture',
      description:
        'Treating localized URL routing, canonical tags, hreflang metadata, semantic HTML, and performance as core product architecture from day one.',
    },
  ],
  offerings: [
    {
      index: '01',
      title: 'UI/UX & Interface Design',
      description:
        'User flows, page hierarchy, responsive design systems, and accessible interaction patterns that make complex tools feel calm and legible.',
    },
    {
      index: '02',
      title: 'Frontend Engineering',
      description:
        'Modern web applications built with React, Next.js, Astro, and TypeScript — from interactive editor workspaces to static product directories.',
    },
    {
      index: '03',
      title: 'Product Prototyping & Full-Stack Flows',
      description:
        'End-to-end flows covering validation, API integration, local or database persistence, authentication patterns, and practical deployment.',
    },
    {
      index: '04',
      title: 'Developer Tooling & AI Workflows',
      description:
        'Browser-native utilities, BYOK multi-model interfaces, and transparent AI-assisted workflows designed to accelerate builders.',
    },
    {
      index: '05',
      title: 'Technical SEO & Internationalization',
      description:
        'Crawlable Astro architectures, semantic markup, structured data, and multilingual content strategies engineered for discoverability.',
    },
  ],
  strengthDomains: [
    {
      id: 'frontend',
      domain: 'Frontend & UI/UX',
      summary: 'Design-led interfaces and responsive component systems built for speed and clarity.',
      technologies: [
        'TypeScript',
        'React',
        'Astro',
        'Next.js',
        'Vite',
        'Tailwind CSS',
        'Figma workflows',
        'Accessibility',
      ],
      application: 'Interactive product sites, local-first web utilities, editor workspaces, and multi-theme UIs.',
    },
    {
      id: 'browser-runtime',
      domain: 'Browser Runtimes & Local Data',
      summary: 'Client-side computing architectures that keep workflows fast and user files close.',
      technologies: [
        'Monaco Editor',
        'WebContainers',
        'Web Workers',
        'IndexedDB',
        'Canvas API',
        'Sandboxed Iframes',
        'Blob / ArrayBuffer',
        'WebAssembly concepts',
      ],
      application: 'In-browser IDE workspaces, local project persistence, image optimization, and ZIP exports.',
    },
    {
      id: 'documents',
      domain: 'Document & Publishing Systems',
      summary: 'Structured parsing, sanitization, typesetting, and PDF generation pipelines.',
      technologies: [
        'PDF.js',
        'pdf-lib',
        'GitHub-Flavored Markdown',
        'KaTeX',
        'DOMPurify',
        'JSZip',
        'Print CSS',
      ],
      application: 'MD2PDF documentation books, LS PDF local document toolkit, and A4 resume exports.',
    },
    {
      id: 'backend-ai',
      domain: 'Full-Stack, SEO & AI Workflows',
      summary: 'Pragmatic backend integrations, multilingual static delivery, and BYOK model orchestration.',
      technologies: [
        'Node.js',
        'REST APIs',
        'Supabase',
        'Firebase',
        'PostgreSQL concepts',
        'GitHub CI/CD',
        'Vercel',
        'BYOK / LLM APIs',
      ],
      application: 'File-sharing prototypes, multilingual Astro sites, canonical/hreflang SEO, and agent workflows.',
    },
  ],
  learningLandscape: [
    {
      category: 'Runtimes & Languages',
      items: ['TypeScript', 'JavaScript', 'Node.js', 'Python (tooling)', 'WebAssembly', 'Kotlin & Swift (exploring)'],
    },
    {
      category: 'Frameworks & UI',
      items: ['Astro', 'Next.js', 'React', 'Tailwind CSS', 'Radix UI', 'shadcn/ui', 'Monaco Editor', 'WebContainers'],
    },
    {
      category: 'Data & Infrastructure',
      items: ['Supabase', 'Firebase', 'PostgreSQL / Neon', 'IndexedDB', 'Appwrite', 'Vercel', 'GitHub Actions', 'Sentry'],
    },
    {
      category: 'AI & Developer Agents',
      items: ['Gemini API', 'Claude', 'OpenAI', 'OpenRouter', 'Cursor', 'Windsurf', 'n8n', 'BYOK Architectures'],
    },
  ],
  qualitativeHighlights: [
    'Founded and continue to shape LadeStack, an independent product brand for browser-first developer and productivity tools.',
    'Built and documented products spanning browser IDEs, local PDF workflows, Markdown book publishing, image compression, resume creation, regional land conversion, and browser games.',
    'Worked hands-on with Astro, React, Next.js, TypeScript, Monaco Editor, WebContainers, IndexedDB, and PDF/Canvas libraries across tangible products.',
    'Invested in UI/UX craft, accessible interaction, multilingual static architecture (9 defined site locales), and privacy-conscious engineering.',
    'Maintain a transparent public code presence on GitHub with open product repositories and ongoing experiments.',
  ],
  closingQuote:
    'The goal is simple: make useful software easier to access, easier to understand, and better to use.',
};

export const PROJECTS: ProjectItem[] = [
  {
    id: 'ladestack',
    slug: 'ladestack',
    name: 'LadeStack',
    tagline: 'Central hub and product directory for browser-first developer utilities.',
    category: 'developer-tools',
    categoryLabel: 'Brand Platform · Developer Ecosystem',
    role: 'Founder, design, engineering & content strategy',
    statusLabel: 'Flagship Hub · Astro Multilingual',
    featuredSpan: 'wide',
    url: 'https://ladestack.in/',
    repoUrl: 'https://github.com/girishlade111',
    overview:
      'LadeStack is the central home of my independent developer-tool ecosystem. It organizes specialized applications alongside product documentation, FAQs, and technical articles — built with Astro and a nine-language content architecture focused on discoverability and fast static delivery.',
    useCases: [
      {
        title: 'Find the Right Tool Quickly',
        description:
          'Browse a unified directory to jump straight into coding, PDF workflows, image compression, or resume creation without comparing fragmented websites.',
      },
      {
        title: 'Understand Browser-First Architecture',
        description:
          'Read technical guides and documentation explaining client-side execution, local persistence, and practical browser data-handling boundaries.',
      },
      {
        title: 'Explore Open Repositories and Connect',
        description:
          'Review active products, inspect connected GitHub repositories, and reach out for product feedback or collaboration through one coherent hub.',
      },
    ],
    stack: ['Astro', 'TypeScript', 'Multilingual i18n (9 locales)', 'Technical SEO', 'Static Rendering'],
    note: 'Independent product brand; multilingual scope reflects the main brand site content strategy.',
    previewType: 'ecosystem',
  },
  {
    id: 'gb-coder',
    slug: 'gb-coder',
    name: 'GB Coder',
    tagline: 'Monaco-powered browser IDE for static prototyping and compatible WebContainer workflows.',
    category: 'developer-tools',
    categoryLabel: 'Developer Tools · Online IDE',
    role: 'Founder & Product Creator',
    statusLabel: 'Public Alpha · Browser IDE',
    featuredSpan: 'wide',
    url: 'https://code.ladestack.in/',
    repoUrl: 'https://github.com/girishlade111/GB-CODER-PUBLIC-ALPHA',
    overview:
      'GB Coder is a browser-based development studio combining a lightweight HTML/CSS/JS live preview environment with an advanced WebContainer-backed mode for compatible Node.js projects. Monaco Editor provides syntax highlighting, autocomplete, and diagnostics while IndexedDB keeps workspaces local.',
    useCases: [
      {
        title: 'Prototype Interfaces Without Local Setup',
        description:
          'Sketch HTML, CSS, and JavaScript components with instant preview feedback to test layouts, DOM behavior, or visual ideas directly in the browser.',
      },
      {
        title: 'Run Compatible Framework Starters in Browser',
        description:
          'Use the WebContainer environment on supported browsers to explore package scripts, dev servers, and multi-file frontend project structures.',
      },
      {
        title: 'Keep and Export Portable Workspaces',
        description:
          'Preserve learning exercises locally in browser storage and export ZIP archives to move smoothly into desktop editors or Git repositories.',
      },
    ],
    stack: ['Monaco Editor', 'TypeScript', 'WebContainers', 'Sandboxed Iframe', 'IndexedDB', 'ZIP Export'],
    note: 'Advanced runtime workflows depend on browser compatibility; collaborative sync and GitHub OAuth remain future roadmap explorations.',
    previewType: 'ide',
  },
  {
    id: 'ls-pdf',
    slug: 'ls-pdf',
    name: 'LS PDF',
    tagline: 'Local-first toolkit documenting 17 browser-based PDF editing and conversion workflows.',
    category: 'documents-media',
    categoryLabel: 'Documents · Privacy-First PDF Suite',
    role: 'Product Creator & Maintainer',
    statusLabel: '17 Documented Tools · Local Processing',
    featuredSpan: 'standard',
    url: 'https://pdf.ladestack.in/',
    repoUrl: 'https://github.com/girishlade111/LS-PDF',
    overview:
      'LS PDF is a browser-oriented PDF utility suite designed to handle merging, splitting, compression, rotation, page ordering, image conversion, text extraction, watermarking, metadata, and repair attempts without requiring server-side document uploads.',
    useCases: [
      {
        title: 'Organize Multi-Document Packets',
        description:
          'Merge files, remove unneeded pages, reorder sections, rotate scans, and add page numbering for clean application or academic packets.',
      },
      {
        title: 'Prepare Files for Sharing & Archiving',
        description:
          'Compress oversized reports, convert scanned images into PDFs, or extract pages and embedded assets when attachment limits apply.',
      },
      {
        title: 'Process Personal Documents On-Device',
        description:
          'Keep drafts, receipts, and personal files inside the browser runtime instead of uploading sensitive documents to unknown third-party servers.',
      },
    ],
    stack: ['React', 'TypeScript', 'Vite', 'PDF.js', 'pdf-lib', 'Web Workers', 'IndexedDB', 'Capacitor'],
    note: 'Local processing improves privacy by design, not an independently audited encryption certification; password workflows undergo ongoing hardening.',
    previewType: 'pdf',
  },
  {
    id: 'md2pdf',
    slug: 'md2pdf',
    name: 'MD2PDF',
    tagline: 'Transform Markdown notes and GitHub documentation into formatted PDFs and multi-chapter books.',
    category: 'documents-media',
    categoryLabel: 'Documentation · Markdown Publishing',
    role: 'Creator & Product Owner',
    statusLabel: 'Formerly ReadmePDF · Book Builder',
    featuredSpan: 'standard',
    url: 'https://md2pdf.ladestack.in/',
    repoUrl: 'https://github.com/girishlade111/ReadmePDF',
    overview:
      'MD2PDF turns Markdown text, local .md files, and compatible GitHub repository docs into clean print-ready PDFs. It supports chapter ordering, covers, tables of contents, GitHub-Flavored Markdown, KaTeX math, syntax highlighting, and local draft history.',
    useCases: [
      {
        title: 'Convert READMEs and Notes Into PDFs',
        description:
          'Turn Markdown notes with tables, code blocks, and headings into portable documents for project handoffs or offline reading.',
      },
      {
        title: 'Assemble Multi-Chapter Documentation Books',
        description:
          'Select repository Markdown files, arrange chapter order, generate a table of contents, and export a consolidated reference manual.',
      },
      {
        title: 'Format Repeatable Technical Writing',
        description:
          'Combine KaTeX math rendering, syntax-highlighted examples, and print CSS layouts with local draft history for consistent deliverables.',
      },
    ],
    stack: ['Astro', 'GFM Parsing', 'DOMPurify', 'KaTeX', 'pdf-lib', 'JSZip', 'IndexedDB', 'Print CSS'],
    note: 'Fetching GitHub repository files involves explicit network requests to GitHub while PDF generation remains client-side.',
    previewType: 'markdown',
  },
  {
    id: 'ls-image-compressor',
    slug: 'ls-image-compressor',
    name: 'LS Image Compressor',
    tagline: 'Client-side image optimization, resizing, and format conversion built for web workflows.',
    category: 'documents-media',
    categoryLabel: 'Image Utilities · Web Performance',
    role: 'Product Creator & Maintainer',
    statusLabel: 'On-Device · Offline-Ready Design',
    featuredSpan: 'standard',
    url: 'https://img.ladestack.in/',
    repoUrl: 'https://github.com/girishlade111/Image-Compressor',
    overview:
      'LS Image Compressor reduces file sizes, adjusts dimensions, and converts between JPEG, PNG, WebP, and other common formats locally in the browser — supporting target file sizes, quality sliders, and direct clipboard image pasting.',
    useCases: [
      {
        title: 'Optimize Assets for Faster Pages',
        description:
          'Shrink photos and graphics before committing them to a static site, CMS, or web application to reduce payload transfer size.',
      },
      {
        title: 'Meet Strict Upload Size Limits',
        description:
          'Resize images or dial in target output sizes for portals, email attachments, forms, and social publishing without desktop software.',
      },
      {
        title: 'Convert Personal Photos Locally',
        description:
          'Process personal images directly on-device with documented clipboard input and offline-oriented browser handling.',
      },
    ],
    stack: ['Canvas API', 'TypeScript', 'Client-Side Compression', 'WebP / JPEG / PNG', 'PWA Architecture'],
    previewType: 'image',
  },
  {
    id: 'swift-resume',
    slug: 'swift-resume',
    name: 'Swift Resume',
    tagline: 'Structured browser-based resume builder with live A4 preview and PDF export.',
    category: 'utilities-games',
    categoryLabel: 'Career Productivity · Resume Builder',
    role: 'Product Creator',
    statusLabel: 'Free Browser Tool · Local Drafts',
    featuredSpan: 'standard',
    url: 'https://resume.ladestack.in/',
    repoUrl: 'https://github.com/girishlade111/swift-resume-builder',
    overview:
      'Swift Resume simplifies organizing education, experience, skills, projects, and contact links into a clean, recruiter-readable document with structured form inputs, template switching, live A4 preview, browser-local drafts, and print-ready PDF export.',
    useCases: [
      {
        title: 'Build a First Structured Resume',
        description:
          'Help students and early-career applicants organize projects and education cleanly without fighting manual document spacing.',
      },
      {
        title: 'Tailor Copies for Specific Roles',
        description:
          'Reorder highlights and refine summaries while watching layout changes reflect live on an A4 canvas.',
      },
      {
        title: 'Export Print-Ready PDFs Without Accounts',
        description:
          'Keep drafts in local browser storage and download clean PDFs ready for applications and email sharing.',
      },
    ],
    stack: ['React', 'TypeScript', 'Responsive Forms', 'A4 Live Preview', 'Local Persistence', 'PDF Export'],
    note: 'ATS-friendly layout structure is a design goal rather than a guarantee of acceptance by every screening system.',
    previewType: 'resume',
  },
  {
    id: 'bharat-land-converter',
    slug: 'bharat-land-converter',
    name: 'Bharat Land Converter',
    tagline: 'Region-aware converter bridging standard area units with traditional Indian land measurements.',
    category: 'utilities-games',
    categoryLabel: 'Engineering & Measurement · Regional Utility',
    role: 'Product Creator',
    statusLabel: 'Region-Aware · Indian Units',
    featuredSpan: 'standard',
    url: 'https://land.ladestack.in/',
    overview:
      'Bharat Land Converter translates between standard measurements (sq. ft., sq. m., acres, hectares) and Indian regional terms including Guntha, Bigha, Biswa, Kattha, Dhur, Kanal, Marla, Cent, and Ground — making state-level assumptions visible and understandable.',
    useCases: [
      {
        title: 'Compare Local and Standard Units',
        description:
          'Enter an area in Guntha, Bigha, or Cent to immediately see approximate equivalents in square feet, square meters, or acres.',
      },
      {
        title: 'Navigate Cross-State Conventions',
        description:
          'Understand how terms like Bigha vary across Maharashtra, Uttar Pradesh, Bihar, Rajasthan, and other Indian regions.',
      },
      {
        title: 'Support Preliminary Field Estimates',
        description:
          'Provide quick calculations for students, surveyors, engineers, and property discussions prior to formal land-revenue verification.',
      },
    ],
    stack: ['Client-Side Calculation', 'Region-Specific Factors', 'Responsive Numeric UI'],
    note: 'Reference utility for estimation only — always verify with official state land-revenue records before legal or property transactions.',
    previewType: 'land',
  },
  {
    id: 'gamehub',
    slug: 'gamehub',
    name: 'GameHub',
    tagline: 'Instant-play Next.js portal documenting 33 browser games across six classic genres.',
    category: 'utilities-games',
    categoryLabel: 'Interactive Frontend · Browser Games',
    role: 'Project Builder & Developer',
    statusLabel: '33 Documented Games · Next.js 15',
    featuredSpan: 'standard',
    url: 'https://games-ladestack.vercel.app/',
    repoUrl: 'https://github.com/girishlade111/games-ladestack',
    overview:
      'GameHub is a Next.js, React 19, and TypeScript portal organizing 33 small arcade, puzzle, action, strategy, word, and card games behind dynamic code splitting and canvas-based game loops for zero-install browser play.',
    useCases: [
      {
        title: 'Play Quick Sessions in the Browser',
        description:
          'Jump directly into lightweight classics such as Snake, Tetris, or 2048 without installing native packages.',
      },
      {
        title: 'Explore Varied Puzzle & Arcade Loops',
        description:
          'Switch between pattern, memory, word, and reaction games inside one consistent catalog interface.',
      },
      {
        title: 'Study Modular Frontend Game Architecture',
        description:
          'Demonstrates lazy-loaded mini-apps, responsive controls, animation-frame loops, and shared menu-to-play state management.',
      },
    ],
    stack: ['Next.js 15', 'React 19', 'TypeScript', 'Tailwind CSS', 'Dynamic Imports', 'HTML5 Canvas'],
    note: 'Catalog size reflects the documented source repository; individual production URL parity is maintained separately.',
    previewType: 'games',
  },
  {
    id: 'ladestack-drive',
    slug: 'ladestack-drive',
    name: 'LadeStack Drive',
    tagline: 'File-management and storage exploration project (exact live implementation pending audit).',
    category: 'explorations',
    categoryLabel: 'File Management · Verification Pending',
    role: 'Associated Storage Exploration',
    statusLabel: 'Provisional · Verification Pending',
    isProvisional: true,
    featuredSpan: 'standard',
    url: 'https://drive.ladestack.in/',
    overview:
      'LadeStack Drive reflects ongoing exploration into approachable digital file organization, storage interfaces, and link-based sharing workflows. Listed transparently as provisional while exact production capabilities and repository parity are reviewed.',
    useCases: [
      {
        title: 'Structured File Organization (Proposed)',
        description:
          'Exploring clean folder navigation and asset browsing for working documents, exports, and project resources.',
      },
      {
        title: 'Cross-Session Workflow Access (Proposed)',
        description:
          'Investigating durable backend storage, access rules, and account boundaries where local-only storage is insufficient.',
      },
      {
        title: 'Scoped Asset Sharing (Proposed)',
        description:
          'Exploring expiring or permission-scoped download links for clean deliverable handoffs without oversized email attachments.',
      },
    ],
    stack: ['File Management UX', 'Storage Architecture Exploration'],
    note: 'Provisional listing — proposed workflows are not advertised as verified live production features until audited.',
    previewType: 'drive',
  },
];

export const EXPLORATIONS: ExplorationItem[] = [
  {
    id: 'ai-app-builder',
    name: 'AI Website & App Builder (build.ladestack.in)',
    status: 'Concept',
    summary:
      'Browser-oriented AI application builder exploring BYOK model providers, agentic code editing, Monaco integration, checkpoints, IndexedDB persistence, and ZIP export without mandatory sign-up.',
    focusAreas: ['BYOK Architecture', 'Agentic Workflows', 'Monaco + IndexedDB', 'ZIP Export'],
  },
  {
    id: 'ladestack-labs',
    name: 'LadeStack Labs — Editorial Product Showcase',
    status: 'Concept',
    summary:
      'Planned Astro-first showcase emphasizing discoverable static HTML, expressive typography, multilingual routing, and curated interactive project studies.',
    focusAreas: ['Astro Static HTML', 'Editorial Typography', 'Multilingual Routing'],
  },
  {
    id: 'visual-bookmark-manager',
    name: 'Personal Visual Bookmark Manager',
    status: 'In development',
    summary:
      'Private visual URL organizer engineered around strict data integrity: normalized full-URL duplicate detection, user-selected category precedence, and deterministic non-AI baseline categorization.',
    focusAreas: ['Normalized URL Deduplication', 'Explainable Rules', 'Batch Import'],
  },
  {
    id: 'multi-llm-agents',
    name: 'Multi-LLM Chat & Agent Experiments',
    status: 'Exploratory',
    summary:
      'Provider-independent prototypes exploring Gemini, OpenRouter, and multi-model switching with explicit cost awareness, tool calling, and clear failure handling.',
    focusAreas: ['Multi-Provider Routing', 'BYOK Keys', 'Tool Calling'],
  },
  {
    id: 'ecommerce-experiments',
    name: 'Full-Stack Commerce Prototypes',
    status: 'Prototype',
    summary:
      'End-to-end Next.js, TypeScript, and Supabase explorations covering catalog filtering, wishlists, carts, order models, and operational admin workflows.',
    focusAreas: ['Next.js + Supabase', 'Relational Modeling', 'Order Workflows'],
  },
  {
    id: 'file-sharing-demos',
    name: 'File-Sharing & Link Prototypes',
    status: 'Prototype',
    summary:
      'Repository-backed Supabase upload dashboards and scoped link-sharing experiments focused on storage permissions and expiring download flows.',
    focusAreas: ['Supabase Storage', 'Access Policies', 'Expiring Links'],
    links: [
      { label: 'File-Sharing Webapp Demo', url: 'https://github.com/girishlade111/File-Sharing-Webapp-Demo' },
      { label: 'Secure File Share Link', url: 'https://github.com/girishlade111/secure-file-share-link' },
    ],
  },
];

export const CONTACT_TOPICS = [
  'Collaboration',
  'Product Feedback',
  'UI/UX & Frontend',
  'Developer Tools',
  'General Inquiry',
] as const;

export type ContactTopic = (typeof CONTACT_TOPICS)[number];
