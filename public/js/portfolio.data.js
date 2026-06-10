/* ============================================================
   Conteúdo + i18n (PT/EN) — dados reais do CV de Eduardo Genes
   ============================================================ */

window.FEATURED = [
  {
    id: 'wviana',
    badge: { pt: 'Cliente real', en: 'Real client' },
    title: 'W.VIANA Arquitetura',
    desc: {
      pt: 'Site institucional para escritório de arquitetura e interiores: portfólio de projetos, performance, SEO técnico e Open Graph. Publicado em produção com domínio próprio e DNS.',
      en: 'Brand site for an architecture & interiors studio: project portfolio, performance, technical SEO and Open Graph. Shipped to production with its own domain and DNS.'
    },
    metric: { pt: '↗ Em produção · wvianaarquitetura.com.br', en: '↗ Live · wvianaarquitetura.com.br' },
    tags: ['Next.js', 'TypeScript', 'Tailwind', 'Vercel', 'Cloudflare', 'SEO'],
    links: [
      { kind: 'live', label: { pt: 'Ver site', en: 'View site' }, href: 'https://wvianaarquitetura.com.br' }
    ],
    slot: 'shot-wviana'
  },
  {
    id: 'llm',
    badge: { pt: 'EdTech · Em produção', en: 'EdTech · In production' },
    title: { pt: 'Plataforma Método TRON', en: 'Método TRON Platform' },
    desc: {
      pt: 'LMS multitenant que funciona quase como uma rede social escolar: interação entre alunos, login com Google e permissões por papel — aluno, professor, direção, admin. IA corrige avaliações e gera jogos a partir do conteúdo que o professor insere; gamificação com pontos, badges e desafios. Atuo no desenvolvimento de ponta a ponta e encabecei a frente de UX/UI do produto, do painel administrativo à experiência do aluno.',
      en: "A multi-tenant LMS that works almost like a school social network: student interaction, Google sign-in and role-based permissions — student, teacher, principal, admin. AI grades assessments and generates games from the teacher's content; gamification with points, badges and challenges. I work across the product end to end and spearheaded its UX/UI, from the admin panel to the student experience."
    },
    metric: { pt: '↗ Vendida a colégios pelo Brasil · via IMTS Group', en: '↗ Sold to schools across Brazil · via IMTS Group' },
    tags: ['React', 'TypeScript', 'Angular', 'Multitenant', 'RBAC', 'IA aplicada', 'Gamificação'],
    links: [
      { kind: 'note', label: { pt: 'Produto comercial — demonstro numa conversa', en: 'Commercial product — happy to demo in a call' }, href: '#contato' }
    ],
    slot: 'shot-llm',
    placeholderText: { pt: 'Print da plataforma', en: 'Platform screenshot' }
  },
  {
    id: 'garimpeiro',
    badge: { pt: 'Open source', en: 'Open source' },
    title: 'Garimpeiro Genes',
    desc: {
      pt: 'Plataforma que transforma planilhas CSV complexas de imóveis em interface interativa: parsing robusto, filtros avançados, favoritos, páginas de detalhe e visualização totalmente responsiva.',
      en: 'A platform that turns messy real-estate CSV spreadsheets into an interactive interface: robust parsing, advanced filters, favorites, detail pages and a fully responsive view.'
    },
    metric: null,
    tags: ['Next.js', 'React', 'TypeScript', 'Tailwind', 'Shadcn/UI', 'Context API'],
    links: [
      { kind: 'code', label: { pt: 'Código', en: 'Code' }, href: 'https://github.com/eduardogenes/geneseek' }
    ],
    slot: 'shot-garimpeiro'
  },
  {
    id: 'mulheres',
    badge: { pt: 'Em desenvolvimento', en: 'In progress' },
    title: 'Mulheres Antes de Tudo',
    desc: {
      pt: 'Concepção e prototipação de um PWA de comunidade privada por assinatura: privacidade por padrão, identidade por contexto, jornadas guiadas, encontros ao vivo e design system próprio.',
      en: 'Concept and prototyping of a subscription-based private community PWA: privacy by default, contextual identity, guided journeys, live meetups and a bespoke design system.'
    },
    metric: null,
    tags: ['React', 'TypeScript', 'Tailwind v4', 'Motion', 'Design System', 'PWA'],
    links: [
      { kind: 'note', label: { pt: 'Produto em construção', en: 'Product in the works' }, href: '#contato' }
    ],
    slot: 'shot-mulheres',
    placeholderText: { pt: 'Mockup do app', en: 'App mockup' }
  }
];

window.SECONDARY = [
  {
    title: 'Home Alone Tracker',
    desc: {
      pt: 'Dashboard de planejamento financeiro: controle de gastos, simulador de cenários, checklist, gráficos e sincronização em nuvem.',
      en: 'Personal-finance dashboard: spending control, scenario simulator, checklist, charts and cloud sync.'
    },
    tags: ['Next.js', 'Supabase', 'Recharts', 'Radix UI'],
    href: 'https://github.com/eduardogenes-imts/home-alone-tracker'
  },
  {
    title: { pt: 'Sistema de Orçamentos', en: 'Quote System' },
    desc: {
      pt: 'Ferramenta interna para orçamentos de hospedagem (Nano Hotéis / Moriá Eco Lodge), com cálculo automático de diárias.',
      en: 'Internal tool for lodging quotes (Nano Hotéis / Moriá Eco Lodge), with automatic nightly-rate calculation.'
    },
    tags: ['JavaScript', 'HTML5', 'CSS3'],
    href: 'https://github.com/eduardogenes/orcamento-nano'
  }
];

window.EXPERIENCE = [
  {
    whenL: { pt: '08/2025 — Atual', en: '08/2025 — Present' },
    role: { pt: 'Desenvolvedor Full Stack Trainee', en: 'Full Stack Trainee Developer' },
    org: 'IMTS Group',
    desc: {
      pt: 'Desenvolvimento full stack de plataforma educacional multitenant usada por colégios pelo Brasil — da interface às APIs e regras de negócio. Encabecei a frente de UX/UI do produto: fluxos, telas e padrões de interface dos painéis de aluno, professor e gestão, em React, Angular e TypeScript, com integração a recursos de IA.',
      en: "Full stack development of a multi-tenant education platform used by schools across Brazil — from the interface to APIs and business logic. I spearheaded the product's UX/UI: flows, screens and interface patterns for the student, teacher and admin panels, in React, Angular and TypeScript, with AI-powered features."
    },
    tag: { pt: 'Atual', en: 'Current' }
  },
  {
    whenL: { pt: '2025 — Atual', en: '2025 — Present' },
    role: { pt: 'Desenvolvedor Web Freelance', en: 'Freelance Web Developer' },
    org: { pt: 'Projetos próprios e clientes', en: 'Own projects & clients' },
    desc: {
      pt: 'Site institucional para cliente real publicado em produção (domínio, DNS, deploy, performance, SEO técnico, Open Graph). Aplicações web focadas em necessidades práticas: dashboards, filtros avançados e protótipos de produto.',
      en: 'Brand site for a real client shipped to production (domain, DNS, deploy, performance, technical SEO, Open Graph). Web apps for practical needs: dashboards, advanced filters and product prototypes.'
    },
    tag: null
  },
  {
    whenL: { pt: '03/2023 — 11/2024', en: '03/2023 — 11/2024' },
    role: { pt: 'Analista de Gestão de Receitas', en: 'Revenue Management Analyst' },
    org: 'Nano Hotéis',
    desc: {
      pt: 'Gestão de receitas e análise de dados entre operação e presença digital. No caminho, automatizei cálculos de reservas com uma pequena ferramenta própria e mantive o site nanohoteis.com.br — meu primeiro código rodando em contexto real.',
      en: 'Revenue management and data analysis between operations and digital presence. Along the way I automated booking calculations with a small tool of my own and maintained nanohoteis.com.br — my first code running in a real-world setting.'
    },
    tag: null
  },
  {
    whenL: { pt: '02/2020 — 01/2023', en: '02/2020 — 01/2023' },
    role: { pt: 'Articulador Fiscal', en: 'Fiscal Coordinator' },
    org: { pt: 'Casa Civil / COPOL', en: 'Casa Civil / COPOL' },
    desc: {
      pt: 'Auditorias, organização documental e relatórios técnicos — base de atenção aos detalhes, raciocínio lógico e responsabilidade com prazos.',
      en: 'Audits, document management and technical reports — the foundation of attention to detail, logical reasoning and accountability with deadlines.'
    },
    tag: null
  }
];

window.EDUCATION = [
  {
    main: { pt: 'Análise e Desenvolvimento de Sistemas', en: 'Systems Analysis & Development' },
    sub: { pt: 'Universidade Estácio de Sá · Fortaleza', en: 'Estácio de Sá University · Fortaleza' },
    year: { pt: 'Conclusão jul/2026', en: 'Graduating Jul 2026' }
  }
];

window.CERTS = [
  { main: 'AWS Cloud Practitioner', sub: { pt: 'Escola da Nuvem · Amazon re/Start', en: 'Escola da Nuvem · Amazon re/Start' }, year: '2025' },
  { main: 'Curso.dev', sub: { pt: 'Desenvolvimento de Software · Filipe Deschamps', en: 'Software Development · Filipe Deschamps' }, year: '2025' },
  { main: 'DevOps', sub: { pt: 'Atlântico Avanti', en: 'Atlântico Avanti' }, year: '2023' },
  { main: { pt: 'Desenvolvimento Web Full-Stack', en: 'Full-Stack Web Development' }, sub: { pt: 'Infinity School', en: 'Infinity School' }, year: '2022' }
];

window.STACK = {
  frontend: ['HTML5 · CSS3', 'JavaScript', 'TypeScript', 'React · Next.js', 'Angular', 'Tailwind · SCSS', 'Vite'],
  integration: ['REST APIs', 'Node.js', 'SQL · MySQL', 'Supabase', 'Git · GitHub'],
  tooling: ['Vercel · Cloudflare', 'Figma', 'Docker', 'AWS', 'SEO · Open Graph', 'Linux']
};

window.STRINGS = {
  pt: {
    'nav.work': 'Trabalhos', 'nav.about': 'Sobre', 'nav.xp': 'Trajetória', 'nav.contact': 'Contato',
    'hero.status': 'Disponível para oportunidades',
    'hero.sub': 'Desenvolvedor full stack na IMTS Group. Construo produtos inteiros — da API à interface — com atenção obsessiva à experiência de quem usa. React, Next.js, TypeScript, Node.',
    'hero.cta1': 'Ver trabalhos', 'hero.cta2': 'Falar comigo',
    'hero.m1k': 'Função', 'hero.m1v': 'Full stack · forte em front',
    'hero.m2k': 'Base', 'hero.m2v': 'Fortaleza, BR · remoto',
    'hero.m3k': 'Idioma', 'hero.m3v': 'Inglês C1',
    'work.eyebrow': 'Trabalhos selecionados',
    'work.title': 'Projetos que provam o trabalho.',
    'work.more': 'Mais projetos',
    'about.eyebrow': 'Sobre',
    'about.statement1': 'Front-end bem feito é ', 'about.statementEm': 'invisível', 'about.statement2': ' — a pessoa só sente que funcionou.',
    'about.p1': 'Vim de áreas de operação, análise de dados e processos antes de migrar pra tecnologia — e isso virou vantagem: penso no produto, no usuário e no impacto, não só no código.',
    'about.p2': 'Hoje sou full stack na IMTS Group — interface de um lado, APIs e regras de negócio do outro —, finalizo a graduação em ADS (jul/2026) e tenho inglês C1. Sou obcecado por detalhe, performance e acessibilidade.',
    'about.photoCap': 'arraste sua foto profissional aqui',
    'stack.front': 'Front-end', 'stack.int': 'Integração & dados', 'stack.tool': 'Ferramentas',
    'xp.eyebrow': 'Trajetória',
    'xp.title': 'De operação a interface.',
    'cred.edu': 'Formação', 'cred.cert': 'Certificações & cursos',
    'contact.eyebrow': 'Vamos conversar',
    'contact.title': 'Bora construir\nalgo juntos?',
    'contact.sub': 'Aberto a vagas CLT, PJ e projetos freelance. Resposta rápida.',
    'footer.built': 'Feito do zero por Eduardo Genes · 2026',
    'footer.up': 'Voltar ao topo'
  },
  en: {
    'nav.work': 'Work', 'nav.about': 'About', 'nav.xp': 'Journey', 'nav.contact': 'Contact',
    'hero.status': 'Available for opportunities',
    'hero.sub': 'Full stack developer at IMTS Group. I build whole products — API to interface — with obsessive attention to the experience of whoever uses them. React, Next.js, TypeScript, Node.',
    'hero.cta1': 'View work', 'hero.cta2': 'Get in touch',
    'hero.m1k': 'Role', 'hero.m1v': 'Full stack · front-leaning',
    'hero.m2k': 'Based in', 'hero.m2v': 'Fortaleza, BR · remote',
    'hero.m3k': 'Language', 'hero.m3v': 'English C1',
    'work.eyebrow': 'Selected work',
    'work.title': 'Projects that do the talking.',
    'work.more': 'More projects',
    'about.eyebrow': 'About',
    'about.statement1': 'Good front-end is ', 'about.statementEm': 'invisible', 'about.statement2': ' — you just feel that it worked.',
    'about.p1': 'I came from operations, data analysis and process work before moving into tech — and it became an edge: I think about the product, the user and the impact, not just the code.',
    'about.p2': "Today I'm a full stack developer at IMTS Group — interface on one side, APIs and business logic on the other — finishing my Systems Analysis & Development degree (Jul 2026), with English at C1. I'm obsessed with detail, performance and accessibility.",
    'about.photoCap': 'drop your professional photo here',
    'stack.front': 'Front-end', 'stack.int': 'Integration & data', 'stack.tool': 'Tooling',
    'xp.eyebrow': 'Journey',
    'xp.title': 'From operations to interface.',
    'cred.edu': 'Education', 'cred.cert': 'Certifications & courses',
    'contact.eyebrow': "Let's talk",
    'contact.title': "Let's build\nsomething together.",
    'contact.sub': 'Open to full-time, contract and freelance work. Quick to reply.',
    'footer.built': 'Built from scratch by Eduardo Genes · 2026',
    'footer.up': 'Back to top'
  }
};
