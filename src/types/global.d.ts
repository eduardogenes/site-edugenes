/* Tipagem do conteúdo de src/data/portfolio.ts (fonte única, pré-renderizada
   no build e serializada em window.* pro cliente) e dos flags de runtime dos
   motores de animação (scripts clássicos, código final — calibrados à mão;
   ver README). */

/** Valor localizável: string simples ou par PT/EN. */
type Localized<T = string> = T | { pt: T; en: T };

interface ProjectLink {
  kind: 'live' | 'code' | 'note';
  label: Localized;
  href: string;
}

interface FeaturedProject {
  id: 'wviana' | 'llm' | 'garimpeiro' | 'mulheres';
  badge: Localized;
  title: Localized;
  desc: Localized;
  metric: Localized | null;
  tags: string[];
  links: ProjectLink[];
  slot: string;
  placeholderText?: Localized;
}

interface SecondaryProject {
  title: Localized;
  desc: Localized;
  tags: string[];
  href: string;
}

interface ExperienceEntry {
  whenL: Localized;
  role: Localized;
  org: Localized;
  desc: Localized;
  tag: Localized | null;
}

interface CredItem {
  main: Localized;
  sub: Localized;
  year: Localized;
}

/* Globais serializados por index.astro a partir de src/data/portfolio.ts
   (consumidos pelo motor portfolio-v2.js na troca de idioma). */
interface Window {
  FEATURED: FeaturedProject[];
  SECONDARY: SecondaryProject[];
  EXPERIENCE: ExperienceEntry[];
  EDUCATION: CredItem[];
  CERTS: CredItem[];
  EG_I18N: Record<'pt' | 'en', Record<string, string>>;
  EG_ABOUT: Record<'pt' | 'en', string[]>;
  EG_STACKLINE: Record<'pt' | 'en', string>;
  EG_WMETA: Record<string, { ty: Localized; yr: string }>;
  /** Tweak congelado: desliga o magnetismo das letras (lido pelo motor de abertura). */
  __v2NoMagnet?: boolean;
  /** Comando do boot de terminal memorizado entre applyTweaks() e o motor. */
  __bootCmd?: string | null;
}
