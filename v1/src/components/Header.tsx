/**
 * Header.tsx
 * Componente de cabeçalho responsivo com navegação e controle de tema.
 * 
 * Funcionalidades:
 * - Navegação responsiva com menu mobile
 * - Alternância entre temas claro/escuro
 * - Detecção de seção ativa durante scroll
 * - Animações suaves usando Framer Motion
 * - Menu hamburguer para dispositivos móveis
 */

import { useState, useEffect } from 'react'
import { useTheme } from '../contexts/ThemeContext'
import { FiSun, FiMoon, FiMenu, FiX } from 'react-icons/fi'
import { motion, AnimatePresence } from 'framer-motion'
import { useScrollNavigation } from '../hooks/useScrollNavigation'
import { useLanguage } from '../contexts/LanguageContext'
import LanguageSwitch from './ui/LanguageSwitch'

export default function Header() {
  // Estados para controle da UI
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const { theme, toggleTheme } = useTheme()
  const { t } = useLanguage()

  // Hook personalizado para navegação por scroll
  useScrollNavigation()

  /**
   * Efeito para detectar scroll e adicionar sombra ao header
   */
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  /**
   * Efeito para detectar a seção ativa durante o scroll
   * Atualiza o estado activeSection baseado na posição da janela
   */
  useEffect(() => {
    const handleActiveSection = () => {
      const sections = ['home', 'about', 'skills', 'projects', 'contact']
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (!element) continue

        const offsetTop = element.offsetTop - 100 // Ajustando offset para considerar o header
        const offsetBottom = offsetTop + element.offsetHeight

        if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
          setActiveSection(section)
          break
        }
      }
    }

    window.addEventListener('scroll', handleActiveSection)
    handleActiveSection() // Chamando uma vez ao montar para definir seção inicial
    return () => window.removeEventListener('scroll', handleActiveSection)
  }, [])

  // Função para lidar com cliques nos links
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const targetId = href.substring(1)
    const element = document.getElementById(targetId)
    
    if (element) {
      const header = document.querySelector('header')
      const headerOffset = header ? header.offsetHeight : 0
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
      
      setIsMenuOpen(false)
      setActiveSection(targetId)
    }
  }

  // Array com itens do menu de navegação
  const menuItems = [
    { label: t('nav.home'), href: '#home' },
    { label: t('nav.about'), href: '#about' },
    { label: t('nav.skills'), href: '#skills' },
    { label: t('nav.projects'), href: '#projects' },
    { label: t('nav.contact'), href: '#contact' }
  ]

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed w-full z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg shadow-lg dark:shadow-blue-500/5'
          : 'bg-transparent'
      }`}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 dark:from-blue-500/5 dark:to-purple-500/5" />
      
      <nav className="container mx-auto px-6 py-4 relative">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold relative z-10">
            <span className="logo-text">
              Eduardo Genes
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {menuItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleLinkClick(e, item.href)}
                className={`
                  relative inline-flex items-center px-3 py-2 text-sm font-medium rounded-lg no-underline
                  transition-all duration-200 ease-in-out
                  ${activeSection === item.href.substring(1)
                    ? 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white'
                    : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800/50'
                  }
                `}
              >
                {item.label}
              </a>
            ))}
            
            {/* Theme and Language Switches */}
            <div className="flex items-center gap-2">
              <motion.button
                onClick={toggleTheme}
                className="relative p-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                animate={{
                  rotate: theme === 'dark' ? 180 : 0
                }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 10
                }}
              >
                {theme === 'dark' ? (
                  <FiSun className="w-5 h-5 text-yellow-400" />
                ) : (
                  <FiMoon className="w-5 h-5 text-gray-600" />
                )}
              </motion.button>
              <LanguageSwitch />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <motion.button
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {theme === 'dark' ? (
                <FiSun className="w-5 h-5 text-yellow-400" />
              ) : (
                <FiMoon className="w-5 h-5 text-gray-600" />
              )}
            </motion.button>
            
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <motion.div
                animate={isMenuOpen ? "open" : "closed"}
                variants={{
                  open: { rotate: 180 },
                  closed: { rotate: 0 }
                }}
              >
                {isMenuOpen ? (
                  <FiX className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                ) : (
                  <FiMenu className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                )}
              </motion.div>
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="absolute top-full left-0 right-0 mt-2 p-2 bg-white dark:bg-gray-900 rounded-2xl shadow-xl dark:shadow-blue-500/5 overflow-hidden"
            >
              {menuItems.map((item, index) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleLinkClick(e, item.href)}
                  className={`block px-4 py-3 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${
                    activeSection === item.href.substring(1)
                      ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-500 dark:text-blue-400'
                      : ''
                  }`}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ x: 10 }}
                >
                  {item.label}
                </motion.a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  )
}
