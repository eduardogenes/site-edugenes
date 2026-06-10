/**
 * types/index.ts
 * Definições de tipos e interfaces utilizadas no projeto.
 * 
 * Contém:
 * - Tipos básicos
 * - Interfaces de componentes
 * - Tipos de animação
 * - Interfaces de dados
 */

/**
 * Tipo que representa os temas disponíveis na aplicação
 * @type Theme - 'light' | 'dark'
 */
export type Theme = 'light' | 'dark'

/**
 * Interface para itens do menu de navegação
 * @interface MenuItem
 * @property {string} label - Texto exibido no menu
 * @property {string} href - Link de navegação
 */
export interface MenuItem {
  label: string
  href: string
}

/**
 * Interface para projetos do portfólio
 * @interface Project
 * @property {string} title - Título do projeto
 * @property {string} description - Descrição detalhada
 * @property {string[]} technologies - Lista de tecnologias utilizadas
 * @property {string} [imageUrl] - URL da imagem de preview (opcional)
 * @property {string} [githubUrl] - Link para repositório (opcional)
 * @property {string} [liveUrl] - Link para demo ao vivo (opcional)
 */
export interface Project {
  title: string
  description: string
  technologies: string[]
  imageUrl?: string
  githubUrl?: string
  liveUrl?: string
}

/**
 * Interface para habilidades técnicas
 * @interface Skill
 * @property {string} name - Nome da habilidade
 * @property {number} level - Nível de proficiência (0-100)
 * @property {string} [icon] - Ícone representativo (opcional)
 */
export interface Skill {
  name: string
  level: number
  icon?: string
}

/**
 * Interface para informações de contato
 * @interface ContactInfo
 * @property {'email' | 'phone' | 'location'} type - Tipo de contato
 * @property {string} text - Texto para exibição
 * @property {string} href - Link para ação
 */
export interface ContactInfo {
  type: 'email' | 'phone' | 'location'
  text: string
  href: string
}

/**
 * Interface para links de redes sociais
 * @interface SocialLink
 * @property {string} platform - Nome da plataforma
 * @property {string} url - Link para o perfil
 */
export interface SocialLink {
  platform: string
  url: string
}

/**
 * Interface para configurações de animação
 * @interface AnimationConfig
 * @property {Object} scroll - Configurações de scroll
 * @property {Object} transition - Configurações de transição
 * @property {Object} stagger - Configurações de animação em sequência
 */
export interface AnimationConfig {
  scroll: {
    duration: number  // Duração em ms
    offset: number    // Offset em pixels
  }
  transition: {
    duration: number  // Duração em segundos
    ease: number[]    // Array de valores para curva de easing
  }
  stagger: {
    children: number  // Delay entre elementos em segundos
  }
}
