/**
 * Footer.tsx
 * Componente de rodapé com informações de copyright e créditos.
 * 
 * Funcionalidades:
 * - Exibição de informações de copyright
 * - Ícone de coração animado
 * - Suporte a temas claro/escuro
 * - Internacionalização com i18n
 */

import { FiGithub, FiLinkedin, FiMail, FiHeart } from 'react-icons/fi';
import { useLanguage } from '../contexts/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white dark:bg-gray-900 py-8 transition-colors">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-600 dark:text-gray-300 flex items-center">
              {t('footer.madeWith')} <FiHeart className="w-4 h-4 mx-1 text-red-500" /> {t('footer.by')}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {currentYear} {t('footer.copyright')}
            </p>
          </div>

          <div className="flex space-x-4">
            <a
              href="https://github.com/eduardogenes"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
            >
              <FiGithub className="w-5 h-5" />
            </a>
            <a
              href="https://linkedin.com/in/eduardogenes"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
            >
              <FiLinkedin className="w-5 h-5" />
            </a>
            <a
              href="mailto:eduardogenes95@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
            >
              <FiMail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}