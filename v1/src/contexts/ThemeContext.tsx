/**
 * ThemeContext.tsx
 * Contexto para gerenciamento do tema dark/light da aplicação.
 * 
 * Funcionalidades:
 * - Gerenciamento do estado do tema (dark/light)
 * - Persistência da preferência do usuário no localStorage
 * - Sincronização com preferências do sistema operacional
 * - Hook personalizado useTheme para fácil acesso ao tema
 */

import { createContext, useContext, useEffect, useState } from 'react'

// Define os tipos possíveis de tema
type Theme = 'light' | 'dark'

/**
 * Interface que define a estrutura do contexto de tema
 * @property theme - Tema atual ('light' | 'dark')
 * @property toggleTheme - Função para alternar entre temas
 */
interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
}

// Cria o contexto com valor inicial undefined
const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

/**
 * Provider do tema que encapsula a lógica de gerenciamento do tema
 * @param children - Componentes filhos que terão acesso ao contexto
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Inicializa o tema com base na preferência salva ou do sistema
  const [theme, setTheme] = useState<Theme>(() => {
    // Verifica o tema salvo no localStorage
    const savedTheme = localStorage.getItem('theme') as Theme
    if (savedTheme) return savedTheme
    
    // Se não houver tema salvo, usa a preferência do sistema
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })

  // Efeito para atualizar a classe do documento e persistir a preferência
  useEffect(() => {
    // Atualiza a classe 'dark' no elemento html
    document.documentElement.classList.toggle('dark', theme === 'dark')
    // Salva a preferência no localStorage
    localStorage.setItem('theme', theme)
  }, [theme])

  // Função para alternar entre temas
  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark')

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

/**
 * Hook personalizado para acessar o contexto do tema
 * @throws {Error} Se usado fora do ThemeProvider
 * @returns {ThemeContextType} Objeto contendo o tema atual e função para alternar
 */
export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}