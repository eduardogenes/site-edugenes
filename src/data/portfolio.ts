/* ============================================================
   Fonte ÚNICA de conteúdo + i18n (PT/EN) — dados reais do CV
   de Eduardo Genes.

   Build: os componentes Astro pré-renderizam o PT daqui (SEO,
   no-JS e zero flash de conteúdo divergente).
   Cliente: index.astro serializa estes mesmos objetos em
   window.* — o motor portfolio-v2.js só re-renderiza na troca
   de idioma. Tipos em src/types/global.d.ts.
   ============================================================ */

export const FEATURED: FeaturedProject[] = [
  {
    id: 'wviana',
    badge: { pt: 'Cliente real', en: 'Real client' },
    title: 'W.VIANA Arquitetura',
    desc: {
      pt: 'Site institucional para escritório de arquitetura e interiores: portfólio de projetos, performance, SEO técnico e Open Graph. Publicado em produção com domínio próprio e DNS.',
      en: 'Brand site for an architecture & interiors studio: project portfolio, performance, technical SEO and Open Graph. Shipped to production with its own domain and DNS.',
    },
    metric: { pt: '↗ Em produção · wvianaarquitetura.com.br', en: '↗ Live · wvianaarquitetura.com.br' },
    tags: ['Next.js', 'TypeScript', 'Tailwind', 'Vercel', 'Cloudflare', 'SEO'],
    links: [
      { kind: 'live', label: { pt: 'Ver site', en: 'View site' }, href: 'https://wvianaarquitetura.com.br' },
      { kind: 'private' },
    ],
    slot: 'shot-wviana',
  },
  {
    id: 'llm',
    badge: { pt: 'EdTech · Em produção', en: 'EdTech · In production' },
    title: { pt: 'Plataforma de Ensino', en: 'EdTech Platform' },
    desc: {
      pt: 'LMS multitenant que funciona quase como uma rede social escolar: interação entre alunos, login com Google e permissões por papel — aluno, professor, direção, admin. IA corrige avaliações e gera jogos a partir do conteúdo que o professor insere; gamificação com pontos, badges e desafios. Atuei no desenvolvimento de ponta a ponta — desenvolvi a experiência do aluno do zero e melhorei fluxos no painel admin.',
      en: "A multi-tenant LMS that works almost like a school social network: student interaction, Google sign-in and role-based permissions — student, teacher, principal, admin. AI grades assessments and generates games from the teacher's content; gamification with points, badges and challenges. I worked across the product end to end — built the student experience from scratch and improved admin panel flows.",
    },
    metric: { pt: '↗ Vendida a colégios pelo Brasil · via IMTS Group', en: '↗ Sold to schools across Brazil · via IMTS Group' },
    tags: ['React', 'TypeScript', 'Angular', 'Multitenant', 'RBAC', 'IA aplicada', 'Gamificação'],
    links: [
      { kind: 'private' },
    ],
    slot: 'shot-llm',
    placeholderText: { pt: 'Print da plataforma', en: 'Platform screenshot' },
  },
  {
    id: 'garimpeiro',
    badge: { pt: 'Open source', en: 'Open source' },
    title: 'Garimpeiro Genes',
    desc: {
      pt: 'Plataforma que transforma planilhas CSV complexas de imóveis em interface interativa: parsing robusto, filtros avançados, favoritos, páginas de detalhe e visualização totalmente responsiva.',
      en: 'A platform that turns messy real-estate CSV spreadsheets into an interactive interface: robust parsing, advanced filters, favorites, detail pages and a fully responsive view.',
    },
    metric: null,
    tags: ['Next.js', 'React', 'TypeScript', 'Tailwind', 'Shadcn/UI', 'Context API'],
    links: [
      { kind: 'live', label: { pt: 'Ver site', en: 'View site' }, href: 'https://geneseek.vercel.app' },
      { kind: 'code', label: { pt: 'Código', en: 'Code' }, href: 'https://github.com/eduardogenes/geneseek' },
    ],
    slot: 'shot-garimpeiro',
  },
  {
    id: 'mulheres',
    badge: { pt: 'Em desenvolvimento', en: 'In progress' },
    title: 'Mulheres Antes de Tudo',
    desc: {
      pt: 'Concepção e prototipação de um PWA de comunidade privada por assinatura: privacidade por padrão, identidade por contexto, jornadas guiadas, encontros ao vivo e design system próprio.',
      en: 'Concept and prototyping of a subscription-based private community PWA: privacy by default, contextual identity, guided journeys, live meetups and a bespoke design system.',
    },
    metric: null,
    tags: ['React', 'TypeScript', 'Tailwind v4', 'Motion', 'Design System', 'PWA'],
    links: [
      { kind: 'note', label: { pt: 'Produto em construção', en: 'Product in the works' }, href: '#contato' },
    ],
    slot: 'shot-mulheres',
    placeholderText: { pt: 'Mockup do app', en: 'App mockup' },
  },
  {
    id: 'edugenes',
    badge: { pt: 'Em produção', en: 'In production' },
    title: 'edugenes.dev',
    desc: {
      pt: 'Este portfólio na identidade «Documento»: Astro 6 + TypeScript, motion design calibrado à mão, i18n PT/EN, SEO técnico e analytics cookieless. Publicado com domínio próprio.',
      en: 'This portfolio in the «Documento» identity: Astro 6 + TypeScript, hand-tuned motion design, PT/EN i18n, technical SEO and cookieless analytics. Shipped on its own domain.',
    },
    metric: { pt: '↗ Em produção · edugenes.dev', en: '↗ Live · edugenes.dev' },
    tags: ['Astro', 'TypeScript', 'Motion', 'Vercel', 'Umami', 'i18n'],
    links: [
      { kind: 'live', label: { pt: 'Ver site', en: 'View site' }, href: 'https://edugenes.dev' },
      { kind: 'code', label: { pt: 'Código', en: 'Code' }, href: 'https://github.com/eduardogenes/site-edugenes' },
    ],
    slot: 'shot-edugenes',
  },
];

export const SECONDARY: SecondaryProject[] = [
  {
    title: 'Home Alone Tracker',
    desc: {
      pt: 'Dashboard de planejamento financeiro: controle de gastos, simulador de cenários, checklist, gráficos e sincronização em nuvem.',
      en: 'Personal-finance dashboard: spending control, scenario simulator, checklist, charts and cloud sync.',
    },
    tags: ['Next.js', 'Supabase', 'Recharts', 'Radix UI'],
    links: [
      { kind: 'live', label: { pt: 'Ver site', en: 'View site' }, href: 'https://home-alone-tracker.vercel.app' },
      { kind: 'code', label: { pt: 'Código', en: 'Code' }, href: 'https://github.com/eduardogenes-imts/home-alone-tracker' },
    ],
  },
  {
    title: { pt: 'Sistema de Orçamentos', en: 'Quote System' },
    desc: {
      pt: 'Ferramenta interna para orçamentos de hospedagem (Nano Hotéis / Moriá Eco Lodge), com cálculo automático de diárias.',
      en: 'Internal tool for lodging quotes (Nano Hotéis / Moriá Eco Lodge), with automatic nightly-rate calculation.',
    },
    tags: ['JavaScript', 'HTML5', 'CSS3'],
    links: [
      { kind: 'live', label: { pt: 'Ver site', en: 'View site' }, href: 'https://orcamento-nano.vercel.app' },
      { kind: 'code', label: { pt: 'Código', en: 'Code' }, href: 'https://github.com/eduardogenes/orcamento-nano' },
    ],
  },
];

export const EXPERIENCE: ExperienceEntry[] = [
  {
    whenL: { pt: '08/2025 — Atual', en: '08/2025 — Present' },
    role: { pt: 'Desenvolvedor Full Stack Trainee', en: 'Full Stack Trainee Developer' },
    org: 'IMTS Group',
    desc: {
      pt: 'Software house com projetos para diferentes clientes e setores — a stack varia conforme o projeto (React, Angular, TypeScript, Node, Python). Maior entrega: plataforma educacional multitenant usada por colégios pelo Brasil, onde desenvolvi a experiência do aluno do zero e melhorei fluxos no painel admin.',
      en: "Software house delivering projects across different clients and industries — stack varies per project (React, Angular, TypeScript, Node, Python). Biggest delivery: a multi-tenant education platform used by schools across Brazil, where I built the student experience from scratch and improved admin panel flows.",
    },
    tag: { pt: 'Atual', en: 'Current' },
  },
  {
    whenL: { pt: '2025 — Atual', en: '2025 — Present' },
    role: { pt: 'Desenvolvedor Web Freelance', en: 'Freelance Web Developer' },
    org: { pt: 'Projetos próprios e clientes', en: 'Own projects & clients' },
    desc: {
      pt: 'Site institucional para cliente real publicado em produção (domínio, DNS, deploy, performance, SEO técnico, Open Graph). Aplicações web focadas em necessidades práticas: dashboards, filtros avançados e protótipos de produto.',
      en: 'Brand site for a real client shipped to production (domain, DNS, deploy, performance, technical SEO, Open Graph). Web apps for practical needs: dashboards, advanced filters and product prototypes.',
    },
    tag: null,
  },
  {
    whenL: { pt: '03/2023 — 11/2024', en: '03/2023 — 11/2024' },
    role: { pt: 'Analista de Gestão de Receitas', en: 'Revenue Management Analyst' },
    org: 'Nano Hotéis',
    desc: {
      pt: 'Gestão de receitas e análise de dados entre operação e presença digital. No caminho, automatizei cálculos de reservas com uma pequena ferramenta própria e mantive o site nanohoteis.com.br — meu primeiro código rodando em contexto real.',
      en: 'Revenue management and data analysis between operations and digital presence. Along the way I automated booking calculations with a small tool of my own and maintained nanohoteis.com.br — my first code running in a real-world setting.',
    },
    tag: null,
  },
  {
    whenL: { pt: '02/2020 — 01/2023', en: '02/2020 — 01/2023' },
    role: { pt: 'Articulador Fiscal', en: 'Fiscal Coordinator' },
    org: { pt: 'Casa Civil / COPOL', en: 'Casa Civil / COPOL' },
    desc: {
      pt: 'Auditorias, organização documental e relatórios técnicos — base de atenção aos detalhes, raciocínio lógico e responsabilidade com prazos.',
      en: 'Audits, document management and technical reports — the foundation of attention to detail, logical reasoning and accountability with deadlines.',
    },
    tag: null,
  },
];

export const EDUCATION: CredItem[] = [
  {
    main: { pt: 'Análise e Desenvolvimento de Sistemas', en: 'Systems Analysis & Development' },
    sub: { pt: 'Universidade Estácio de Sá · Fortaleza', en: 'Estácio de Sá University · Fortaleza' },
    year: { pt: 'jul/2026', en: 'Jul 2026' },
  },
];

export const CERTS: CredItem[] = [
  { main: 'AWS Cloud Practitioner', sub: { pt: 'Escola da Nuvem · Amazon re/Start', en: 'Escola da Nuvem · Amazon re/Start' }, year: '2025' },
  { main: 'Curso.dev', sub: { pt: 'Desenvolvimento de Software · Filipe Deschamps', en: 'Software Development · Filipe Deschamps' }, year: '2025' },
  { main: 'DevOps', sub: { pt: 'Atlântico Avanti', en: 'Atlântico Avanti' }, year: '2023' },
  { main: { pt: 'Desenvolvimento Web Full-Stack', en: 'Full-Stack Web Development' }, sub: { pt: 'Infinity School', en: 'Infinity School' }, year: '2022' },
];

/* meta por projeto no índice (tipo + ano) */
export const WMETA: Record<string, { ty: Localized; yr: string }> = {
  wviana: { ty: { pt: 'cliente real — no ar', en: 'real client — live' }, yr: '2025' },
  llm: { ty: { pt: 'edtech · em produção', en: 'edtech · in production' }, yr: '2025–26' },
  garimpeiro: { ty: { pt: 'open source', en: 'open source' }, yr: '2025' },
  mulheres: { ty: { pt: 'produto próprio', en: 'own product' }, yr: '2026' },
  edugenes: { ty: { pt: 'portfólio · no ar', en: 'portfolio · live' }, yr: '2026' },
  hat: { ty: { pt: 'open source', en: 'open source' }, yr: '2025' },
  orc: { ty: { pt: 'ferramenta interna', en: 'internal tool' }, yr: '2023' },
};

/* dicionário i18n dos templates (data-i18n) e do motor */
export const S: Record<'pt' | 'en', Record<string, string>> = {
  pt: {
    'm.doc': 'Portfólio — rev. 02 / 2026',
    'm.now': 'agora, hora local',
    'm.stamp': 'em produção',
    'm.tail': 'Desenvolvedor full stack — construo o produto inteiro, com queda assumida por front-end e experiência do usuário. Hoje na IMTS Group.',
    'm.since': 'escrevendo interfaces desde 2022',
    'toc.1': 'Trabalhos', 'toc.1n': '7 fichas',
    'toc.2': 'Trajetória', 'toc.2n': '4 períodos',
    'toc.3': 'Sobre', 'toc.3n': '1 pessoa',
    'toc.4': 'Contato', 'toc.4n': '4 canais',
    'w.note': 'Clique numa linha para abrir a ficha do projeto.',
    'x.note': 'Operação, dados e processos antes do código — virou vantagem.',
    'x.edu': 'Formação', 'x.cert': 'Certificações & cursos',
    'a.cap': 'Fortaleza, 2026',
    'c.lead': 'Sem formulário — mensagem boa não merece morrer num inbox de formulário. Me escreve direto:',
    'c.phone': 'Telefone',
    'c.cv': 'versão pra imprimir →',
    'f.colo': '// Tipografia: Archivo & Newsreader · Nada gerado, nada clonado — cada detalhe foi uma escolha · Rev. 02, junho de 2026 · Fortaleza',
    'f.metrics': 'métricas anônimas e sem cookies (Umami) — nenhum dado pessoal é coletado',
    'f.top': '↑ voltar ao topo',
    'w.live': 'ver no ar ↗', 'w.code': 'código ↗', 'w.private': 'código privado',
    'w.nda': 'Produto comercial — demonstro com prazer numa conversa.',
    'w.shot': 'Print do projeto — arraste aqui',
  },
  en: {
    'm.doc': 'Portfolio — rev. 02 / 2026',
    'm.now': 'now, local time',
    'm.stamp': 'in production',
    'm.tail': 'Full stack developer — I build the whole product, with an admitted soft spot for front-end and user experience. Currently at IMTS Group.',
    'm.since': 'writing interfaces since 2022',
    'toc.1': 'Work', 'toc.1n': '7 entries',
    'toc.2': 'Track record', 'toc.2n': '4 chapters',
    'toc.3': 'About', 'toc.3n': '1 person',
    'toc.4': 'Contact', 'toc.4n': '4 channels',
    'w.note': 'Click a row to open the project file.',
    'x.note': 'Operations, data and process before code — it became an edge.',
    'x.edu': 'Education', 'x.cert': 'Certifications & courses',
    'a.cap': 'Fortaleza, 2026',
    'c.lead': "No contact form — good messages shouldn't die in a form inbox. Write me directly:",
    'c.phone': 'Phone',
    'c.cv': 'print-ready version →',
    'f.colo': '// Type: Archivo & Newsreader · Nothing generated, nothing cloned — every detail was a choice · Rev. 02, June 2026 · Fortaleza',
    'f.metrics': 'anonymous, cookie-free metrics (Umami) — no personal data is collected',
    'f.top': '↑ back to top',
    'w.live': 'see it live ↗', 'w.code': 'source ↗', 'w.private': 'private code',
    'w.nda': 'Commercial product — happy to demo it in a call.',
    'w.shot': 'Project screenshot — drop it here',
  },
};

/* parágrafos do Sobre (a voz difere da v1 — mantidos aqui, fora do CV) */
export const ABOUT: Record<'pt' | 'en', string[]> = {
  pt: [
    'Passei quatro anos entre auditorias, hotéis e planilhas antes de escrever código profissionalmente. Foi lá que aprendi o que bootcamp nenhum ensina: a pessoa do outro lado da tela está com pressa — e interface boa é a que respeita isso.',
    'Hoje sou full stack na IMTS Group, uma software house onde cada projeto traz uma stack diferente — React, Angular e TypeScript no front; Node, Python e APIs REST no back. Termino a graduação em ADS em julho de 2026. <span class="red">Desenvolvi a experiência do aluno do zero e melhorei fluxos no painel admin</span> de uma plataforma educacional usada por colégios pelo Brasil.',
    'Inglês C1: leio documentação, escrevo, converso. Presencial, híbrido ou remoto, a partir de Fortaleza.',
  ],
  en: [
    "I spent four years in audits, hotels and spreadsheets before writing code for a living. That's where I learned what no bootcamp teaches: the person on the other side of the screen is in a hurry — and a good interface respects that.",
    "Today I'm a full stack developer at IMTS Group, a software house where each project brings a different stack — React, Angular and TypeScript on the front; Node, Python and REST APIs on the back. Finishing my degree in July 2026. <span class=\"red\">I built the student experience from scratch and improved admin panel flows</span> for an education platform used by schools across Brazil.",
    'English at C1: I read docs, write and hold a conversation. On-site, hybrid or remote, based in Fortaleza.',
  ],
};

export const STACKLINE: Record<'pt' | 'en', string> = {
  pt: '<b>Caixa de ferramentas:</b> React · Next.js · TypeScript · Angular · Tailwind · SCSS · Vite · Node · SQL · Supabase · Git · Figma · Vercel · AWS — o resto se aprende.',
  en: '<b>Toolbox:</b> React · Next.js · TypeScript · Angular · Tailwind · SCSS · Vite · Node · SQL · Supabase · Git · Figma · Vercel · AWS — the rest can be learned.',
};

/** Resolve um Localized para PT (render de build). */
export function pt<T>(v: Localized<T> | null | undefined): T {
  if (v && typeof v === 'object' && !Array.isArray(v) && 'pt' in (v as object)) {
    return (v as { pt: T }).pt;
  }
  return v as T;
}

/** Atalho pro dicionário PT (render de build). */
export const t = (k: string): string => S.pt[k] ?? k;
