/**
 * constants/index.ts
 * Arquivo de constantes globais da aplicação.
 * 
 * Contém:
 * - Configurações de animação
 */

/**
 * Configurações globais de animação
 * - scroll: configurações para animação de scroll suave
 * - transition: configurações padrão para transições
 * - stagger: configurações para animações em sequência
 */
export const ANIMATION_CONFIG = {
  scroll: {
    duration: 800, // Duração da animação de scroll em ms
    offset: 20     // Offset para ajuste fino da posição final
  },
  transition: {
    duration: 0.3,                // Duração padrão de transições
    ease: [0.4, 0, 0.2, 1]       // Curva de easing personalizada
  },
  stagger: {
    children: 0.1                 // Delay entre animações de elementos filhos
  }
} as const
