/**
 * App.tsx
 * Componente principal da aplicação que gerencia o layout e estrutura básica.
 * 
 * Funcionalidades:
 * - Gerenciamento de estado de carregamento inicial
 * - Implementação do ThemeProvider para controle de tema dark/light
 * - Organização da estrutura principal do layout
 * - Carregamento dos componentes principais
 */

import { useEffect, useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Contact from './components/Contact'
import Footer from './components/Footer'
import { ThemeProvider } from './contexts/ThemeContext'
import { LanguageProvider } from './contexts/LanguageContext'

export default function App() {
  // Estado para controlar a tela de carregamento inicial
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    /**
     * Simula um tempo de carregamento mínimo para melhorar UX
     * Isso evita flashs de conteúdo e permite carregar recursos necessários
     */
    const timer = setTimeout(() => setIsLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  // Renderiza tela de carregamento enquanto isLoading for true
  if (isLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-gray-900">
        <div className="animate-pulse text-4xl font-bold text-blue-500">
          Carregando...
        </div>
      </div>
    )
  }

  /**
   * Layout principal da aplicação
   * - ThemeProvider: Contexto para gerenciamento do tema
   * - Header: Navegação e controles
   * - Main: Conteúdo principal organizado em seções
   * - Footer: Rodapé com informações adicionais
   */
  return (
    <LanguageProvider>
      <ThemeProvider>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
          <Header />
          <main>
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Contact />
          </main>
          <Footer />
        </div>
      </ThemeProvider>
    </LanguageProvider>
  )
}