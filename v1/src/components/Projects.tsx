// Importação dos ícones e componentes necessários
import { FiGithub, FiExternalLink, FiFolder } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

// Componente Projects - Seção de Projetos
export default function Projects() {
  // Hook para traduções
  const { t } = useLanguage();

  // Array com informações dos projetos
  const projects = [
    {
      title: 'projects.projects.garimpeiroGenes.title',
      description: 'projects.projects.garimpeiroGenes.description',
      images: {
        default: '/images/garimpeiro-genes-logo.png',
        hover: '/images/garimpeiro-genes-thumb.png'
      },
      tech: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
      github: 'https://github.com/eduardogenes/geneseek',
      live: 'https://geneseek.vercel.app/'
    },
    {
      title: 'projects.projects.genesTomato.title',
      description: 'projects.projects.genesTomato.description',
      images: {
        default: '/images/genes-tomato-logo.png',
        hover: '/images/genes-tomato-thumb.png'
      },
      tech: ['React', 'Vite', 'TypeScript'],
      github: 'https://github.com/eduardogenes/GenesTomato',
      live: 'https://genes-tomato.vercel.app'
    },
    {
      title: 'projects.projects.infiniflix.title',
      description: 'projects.projects.infiniflix.description',
      images: {
        default: '/images/infiniflix-logo.png',
        hover: '/images/infiniflix-thumb.png'
      },
      tech: ['React', 'Next.js', 'Tailwind CSS'],
      github: 'https://github.com/eduardogenes/infiniflix',
      live: 'https://infiniflix.vercel.app'
    },
    {
      title: 'projects.projects.drCare.title',
      description: 'projects.projects.drCare.description',
      images: {
        default: '/images/drcare-logo.png',
        hover: '/images/drcare-thumb.png'
      },
      tech: ['React', 'Next.js', 'Styled Components'],
      github: 'https://github.com/eduardogenes/drCARE',
      live: 'https://dr-care-swart.vercel.app'
    },
    {
      title: 'projects.projects.orcamentoNano.title',
      description: 'projects.projects.orcamentoNano.description',
      images: {
        default: '/images/orcamento-thumb.png',
        hover: '/images/orcamento-thumb.png'
      },
      tech: ['React', 'TypeScript', 'Node.js'],
      github: 'https://github.com/eduardogenes/orcamento-nano',
      live: 'https://orcamento-nano.vercel.app'
    },
    {
      title: 'projects.projects.calculadora.title',
      description: 'projects.projects.calculadora.description',
      images: {
        default: '/images/calculadora-thumb.png',
        hover: '/images/calculadora-thumb.png'
      },
      tech: ['HTML', 'CSS', 'JavaScript'],
      github: 'https://github.com/eduardogenes/calculadora',
      live: 'https://calculadora-ochre-ten.vercel.app'
    },
    {
      title: 'projects.projects.interactiveRating.title',
      description: 'projects.projects.interactiveRating.description',
      images: {
        default: '/images/rating-thumb.png',
        hover: '/images/rating-thumb.png'
      },
      tech: ['React', 'CSS', 'JavaScript'],
      github: 'https://github.com/eduardogenes/interactive-rating-component',
      live: 'https://interactive-rating-component-ten-sigma.vercel.app'
    }
  ];

  // Estado para controlar qual projeto está com hover
  const [hoveredProjects, setHoveredProjects] = useState<{ [key: string]: boolean }>({});

  // Variantes de animação para as imagens
  const imageVariants = {
    enter: { opacity: 1 },
    center: {
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeIn"
      }
    }
  };

  // Variantes de animação para o container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  // Variantes de animação para o card
  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        damping: 15,
        stiffness: 100
      }
    }
  };

  return (
    // Seção principal com fundo e espaçamento
    <section id="projects" className="py-20 bg-white dark:bg-gray-900 transition-colors">
      <div className="container mx-auto px-6">
        {/* Título da seção com animação */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 flex items-center justify-center gap-3">
            <FiFolder className="w-8 h-8 text-blue-500" />
            <span className="animated-gradient-text">{t('projects.title')}</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t('projects.subtitle')}
          </p>
        </motion.div>

        {/* Grid de projetos */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project) => (
            // Card de projeto com animação
            <motion.div
              key={project.title}
              variants={cardVariants}
              whileHover={{ y: -5 }}
              // 1. O card é um container flexível com direção de coluna
              className="bg-gray-50 dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col"
            >
              {/* Container da imagem com efeito de hover (NENHUMA ALTERAÇÃO) */}
              <div
                className="relative h-48 overflow-hidden"
                onMouseEnter={() => setHoveredProjects(prev => ({ ...prev, [project.title]: true }))}
                onMouseLeave={() => setHoveredProjects(prev => ({ ...prev, [project.title]: false }))}
              >
                <img
                  src={project.images.hover}
                  alt={t(project.title)}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <AnimatePresence mode="wait">
                  {!hoveredProjects[project.title] && (
                    <motion.div
                      key="logo"
                      variants={imageVariants}
                      initial="enter"
                      animate="enter"
                      exit="center"
                      className={`absolute inset-0 w-full h-full ${
                        project.images.default.includes('logo')
                          ? 'bg-[#1B1F27] dark:bg-[#1B1F27]'
                          : ''
                      }`}
                    >
                      <img
                        src={project.images.default}
                        alt={t(project.title)}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Informações do projeto */}
              {/* 2. Este container também é flexível e crescerá para preencher o espaço */}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">
                  {t(project.title)}
                </h3>
                {/* 3. A classe 'flex-grow' é aplicada ao parágrafo da descrição */}
                <p className="text-gray-600 dark:text-gray-300 mb-4 flex-grow">
                  {t(project.description)}
                </p>

                {/* 4. Este bloco que contém as tecnologias e links será empurrado para o final */}
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700/50">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="flex flex-wrap gap-2 mb-4"
                  >
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </motion.div>
                  <div className="flex gap-4">
                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                    >
                      <FiGithub className="w-5 h-5" />
                      <span>{t('projects.code')}</span>
                    </motion.a>
                    {project.live && (
                      <motion.a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                      >
                        <FiExternalLink className="w-5 h-5" />
                        <span>{t('projects.demo')}</span>
                      </motion.a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Botão "Vamos conversar" com animação */}
        <div className="flex justify-center mt-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <a href="#contact" className="next-section-button">
              {t('projects.cta')}
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}