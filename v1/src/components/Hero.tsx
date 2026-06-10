// Importação dos ícones das redes sociais e ferramentas
import { FiGithub, FiLinkedin, FiMail, FiFileText } from 'react-icons/fi';
// Importação do Framer Motion para animações
import { motion } from 'framer-motion';
// Importação do hook de idiomas para internacionalização
import { useLanguage } from '../contexts/LanguageContext';

export default function Hero() {
  // Hook para traduções
  const { t } = useLanguage();

  // Array com links das redes sociais e CV
  const socialLinks = [
    {
      icon: <FiGithub className="w-6 h-6" />,
      href: 'https://github.com/eduardogenes',
      label: 'GitHub',
    },
    {
      icon: <FiLinkedin className="w-6 h-6" />,
      href: 'https://linkedin.com/in/eduardogenes',
      label: 'LinkedIn',
    },
    {
      icon: <FiMail className="w-6 h-6" />,
      href: 'mailto:eduardogenes95@gmail.com',
      label: 'Email',
    },
    {
      icon: <FiFileText className="w-6 h-6" />,
      href: 'https://drive.google.com/file/d/1YnMcP5eWRmZYuXHsh0Tfvg9vKzs-LNGr/view?usp=drive_link',
      label: 'CV',
    },
  ];

  return (
    // Seção principal com altura mínima da tela e fundo gradiente
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 py-20"
    >
      {/* Elementos de fundo animados */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -inset-[10px] opacity-50">
          {/* Criação de 20 pontos animados no fundo */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-[2px] w-[2px] bg-blue-500 rounded-full"
              animate={{
                scale: [1, 2, 1],
                opacity: [0.2, 0.5, 0.2],
                x: [
                  Math.random() * window.innerWidth,
                  Math.random() * window.innerWidth,
                ],
                y: [
                  Math.random() * window.innerHeight,
                  Math.random() * window.innerHeight,
                ],
              }}
              transition={{
                duration: Math.random() * 5 + 5,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
          ))}
        </div>
      </div>

      {/* Container principal com conteúdo */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center">
          {/* Título profissional com animação */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-2xl md:text-3xl font-semibold text-blue-600 dark:text-blue-400 mb-4"
          >
            {t('hero.title')}
          </motion.p>

          {/* Subtítulo com animação e estilo delicado */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-base md:text-lg text-gray-500 dark:text-gray-400 mb-8 font-light tracking-wide"
          >
            {t('hero.subtitle')}
          </motion.p>

          {/* Links de redes sociais com animação */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex justify-center space-x-6"
          >
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300"
                aria-label={link.label}
              >
                {link.icon}
              </a>
            ))}
          </motion.div>

          {/* Botão "Sobre" com animação */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-12"
          >
            <a
              href="#about"
              className="inline-block px-8 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors duration-300"
            >
              {t('hero.callToAction')}
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
