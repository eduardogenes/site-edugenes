// Importação dos ícones para as diferentes seções
import { FiCode, FiLayout, FiServer, FiUser } from 'react-icons/fi'
import { motion } from 'framer-motion'
// Importação do hook de idiomas
import { useLanguage } from '../contexts/LanguageContext'

// Componente About - Seção "Sobre Mim"
export default function About() {
  // Hook para traduções
  const { t } = useLanguage();
  
  // Array com informações das habilidades principais
  const skills = [
    {
      icon: <FiCode className="w-8 h-8" />,
      title: t('about.skills.frontend.title'),
      description: t('about.skills.frontend.description'),
    },
    {
      icon: <FiServer className="w-8 h-8" />,
      title: t('about.skills.backend.title'),
      description: t('about.skills.backend.description'),
    },
    {
      icon: <FiLayout className="w-8 h-8" />,
      title: t('about.skills.uiDesign.title'),
      description: t('about.skills.uiDesign.description'),
    },
  ]

  return (
    // Seção principal com fundo e espaçamento
    <section
      id="about"
      className="py-20 bg-white dark:bg-gray-900"
    >
      <div className="container mx-auto px-6">
        {/* Título da seção com animação */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 flex items-center justify-center gap-3">
            <FiUser className="w-8 h-8 text-blue-500" />
            <span className="animated-gradient-text">{t('about.title')}</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t('about.description')}
          </p>
        </motion.div>

        {/* Grid de habilidades */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {skills.map((skill, index) => (
            // Card de habilidade com animação
            <motion.div
              key={skill.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-gray-50 dark:bg-gray-800 p-8 rounded-2xl hover:shadow-lg transition-all duration-300"
            >
              <div className="text-blue-500 mb-4">{skill.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
                {skill.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {skill.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Botão "Ver Habilidades" com animação */}
        <div className="flex justify-center mt-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <a href="#skills" className="next-section-button">
              {t('about.skills.cta')}
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
