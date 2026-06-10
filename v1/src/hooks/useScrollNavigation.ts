/**
 * useScrollNavigation.ts
 * Hook personalizado para implementar navegação suave com scroll animado.
 * 
 * Funcionalidades:
 * - Scroll suave para seções da página
 * - Animação com easing cúbico
 * - Ajuste automático para altura do header
 * - Highlight visual da seção alvo
 * - Prevenção de comportamento padrão dos links
 */

import { useEffect } from 'react'
import { ANIMATION_CONFIG } from '../constants'

/**
 * Função de easing cúbica para animação suave
 * @param t - Progresso da animação (0 a 1)
 * @returns Valor calculado da curva de easing
 */
const easeInOutCubic = (t: number) => 
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2

export function useScrollNavigation() {
  /**
   * Realiza o scroll suave até a posição alvo
   * @param targetPosition - Posição Y final do scroll
   */
  const smoothScrollTo = (targetPosition: number) => {
    const startPosition = window.pageYOffset
    const distance = targetPosition - startPosition
    let startTime: number | null = null

    /**
     * Função de animação do scroll
     * @param currentTime - Timestamp atual da animação
     */
    const animation = (currentTime: number) => {
      if (startTime === null) startTime = currentTime
      const timeElapsed = currentTime - startTime
      const progress = Math.min(timeElapsed / ANIMATION_CONFIG.scroll.duration, 1)
      
      window.scrollTo(0, startPosition + distance * easeInOutCubic(progress))

      if (timeElapsed < ANIMATION_CONFIG.scroll.duration) {
        requestAnimationFrame(animation)
      }
    }

    requestAnimationFrame(animation)
  }

  /**
   * Efeito para adicionar listener de click nos links de navegação
   * Implementa scroll suave e highlight da seção
   */
  useEffect(() => {
    const handleSmoothScroll = (e: MouseEvent) => {
      const link = (e.target as HTMLElement).closest('a[href^="#"]')
      if (!link) return

      e.preventDefault()
      const targetId = link.getAttribute('href')
      if (!targetId) return

      const targetElement = document.querySelector(targetId)
      if (!targetElement) return

      // Calcula posição considerando altura do header
      const headerHeight = document.querySelector('header')?.offsetHeight || 0
      const elementPosition = targetElement.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerHeight - ANIMATION_CONFIG.scroll.offset

      smoothScrollTo(offsetPosition)

      // Adiciona efeito visual de highlight na seção
      setTimeout(() => {
        targetElement.classList.add('section-highlight')
        setTimeout(() => {
          targetElement.classList.remove('section-highlight')
        }, 1000)
      }, ANIMATION_CONFIG.scroll.duration)
    }

    document.addEventListener('click', handleSmoothScroll)
    return () => document.removeEventListener('click', handleSmoothScroll)
  }, [])
}
