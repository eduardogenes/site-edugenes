/**
 * Skills.tsx
 * Componente que exibe as habilidades técnicas, competências e certificações.
 * 
 * Funcionalidades:
 * - Exibição de habilidades técnicas com barras de progresso
 * - Lista de competências com ícones e descrições
 * - Lista de certificações com status
 * - Animações de entrada usando Framer Motion
 * - Suporte a temas claro/escuro
 * - Internacionalização com i18n
 */

// Importações necessárias
import { FaReact, FaNodeJs, FaHtml5, FaGitAlt, FaDatabase, FaUsers, FaLanguage, FaBrain } from 'react-icons/fa';
import { SiTypescript, SiJavascript, SiDocker, SiAmazonaws } from 'react-icons/si';
import { BsLightbulb, BsBook } from 'react-icons/bs';
import { MdOutlineEngineering } from 'react-icons/md';
import { useLanguage } from '../contexts/LanguageContext';

export default function Skills() {
  const { t } = useLanguage();

  const skills = [
    { name: 'JavaScript', level: 80, icon: SiJavascript },
    { name: 'TypeScript', level: 60, icon: SiTypescript },
    { name: 'React', level: 70, icon: FaReact },
    { name: 'Node.js', level: 65, icon: FaNodeJs },
    { name: 'HTML/CSS', level: 85, icon: FaHtml5 },
    { name: 'Git', level: 80, icon: FaGitAlt },
    { name: 'SQL', level: 60, icon: FaDatabase },
    { name: 'Docker', level: 40, icon: SiDocker },
    { name: 'AWS', level: 30, icon: SiAmazonaws }
  ];

  const competencies = [
    {
      icon: <FaUsers className="w-6 h-6" />,
      title: t('skills.competencies.teamwork.title'),
      subtitle: t('skills.competencies.teamwork.subtitle'),
      description: t('skills.competencies.teamwork.description')
    },
    {
      icon: <FaLanguage className="w-6 h-6" />,
      title: t('skills.competencies.english.title'),
      subtitle: t('skills.competencies.english.subtitle'),
      description: t('skills.competencies.english.description')
    },
    {
      icon: <BsLightbulb className="w-6 h-6" />,
      title: t('skills.competencies.problemSolving.title'),
      subtitle: t('skills.competencies.problemSolving.subtitle'),
      description: t('skills.competencies.problemSolving.description')
    },
    {
      icon: <BsBook className="w-6 h-6" />,
      title: t('skills.competencies.learning.title'),
      subtitle: t('skills.competencies.learning.subtitle'),
      description: t('skills.competencies.learning.description')
    }
  ];

  const certifications = [
    {
      name: t('skills.certifications.systemsAnalysis.name'),
      institution: t('skills.certifications.systemsAnalysis.institution'),
      year: "2025",
      status: "current"
    },
    { 
      name: t('skills.certifications.webDevelopment.name'),
      institution: t('skills.certifications.webDevelopment.institution'),
      year: "2022"
    },
    {
      name: t('skills.certifications.devOps.name'),
      institution: t('skills.certifications.devOps.institution'),
      year: "2023"
    },
    {
      name: t('skills.certifications.cursoDev.name'),
      institution: t('skills.certifications.cursoDev.institution'),
      year: t('skills.certifications.inProgress'),
      status: "current"
    },
    {
      name: t('skills.certifications.aws.name'),
      institution: t('skills.certifications.aws.institution'),
      year: t('skills.certifications.inProgress'),
      status: "current"
    }
  ];

  return (
    <section id="skills" className="relative py-20 bg-gray-50 dark:bg-gray-800 transition-colors">
      <div className="max-w-6xl mx-auto px-4">
        {/* Título da seção */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 flex items-center justify-center gap-3">
            <FaBrain className="w-8 h-8 text-blue-500" />
            <span className="animated-gradient-text">{t('skills.title')}</span>
          </h2>
          <div className="flex flex-col items-center justify-center gap-2">
            <p className="text-gray-600 dark:text-gray-300 font-medium">
              {t('skills.subtitle')}
            </p>
            <div className="flex items-center gap-3 text-blue-500 text-sm">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              <span className="w-2 h-2 rounded-full bg-blue-400"></span>
              <span className="w-2 h-2 rounded-full bg-blue-300"></span>
            </div>
          </div>
        </div>

        {/* Habilidades Técnicas */}
        <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {skills.map((skill) => (
            <div
              key={skill.name}
              className="skill-card bg-white dark:bg-gray-700 p-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  {skill.icon && <skill.icon className="w-5 h-5 text-blue-500" />}
                  <h3 className="text-base font-semibold text-gray-800 dark:text-white">{skill.name}</h3>
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-300">{skill.level}%</span>
              </div>
              <div 
                className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-1.5"
              >
                <div
                  className="bg-blue-500 h-1.5 rounded-full"
                  style={{ width: `${skill.level}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Competências */}
        <div
          className="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-8 mb-12"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 flex items-center justify-center gap-3">
              <MdOutlineEngineering className="w-8 h-8 text-blue-500" />
              <span className="animated-gradient-text">{t('skills.competencies.title')}</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {competencies.map((comp, idx) => (
              <div
                key={idx}
                className="p-4 rounded-lg bg-gray-50 dark:bg-gray-600 hover:shadow-md transition-shadow"
              >
                <div className="text-blue-500 mb-3">{comp.icon}</div>
                <h3 className="font-semibold text-gray-800 dark:text-white mb-1">{comp.title}</h3>
                <p className="text-sm text-blue-500 mb-2">{comp.subtitle}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">{comp.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Certificações */}
        <div
          className="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-8"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 flex items-center justify-center gap-3">
              <FaUsers className="w-8 h-8 text-blue-500" />
              <span className="animated-gradient-text">{t('skills.certifications.title')}</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert, idx) => (
              <div
                key={idx}
                className="border-l-2 border-blue-500 pl-4 bg-white dark:bg-gray-700 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <h4 className="font-medium text-gray-800 dark:text-white flex items-center gap-2">
                  {cert.name}
                  {cert.status === 'current' && (
                    <span
                      className="text-xs bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300 px-2 py-0.5 rounded-full"
                    >
                      {t('skills.certifications.inProgress')}
                    </span>
                  )}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                  {cert.institution} • {cert.year}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Botão de navegação */}
        <div
          className="flex justify-center mt-16"
        >
          <a
            href="#projects"
            onClick={() => {
              const element = document.getElementById('projects');
              const headerOffset = 100;
              if (element) {
                const elementPosition = element.getBoundingClientRect().top;
                window.scrollTo({
                  top: elementPosition + window.pageYOffset - headerOffset,
                  behavior: 'smooth'
                });
              }
            }}
            className="flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-full transition-colors duration-300"
          >
            {t('skills.cta')}
          </a>
        </div>
      </div>
    </section>
  );
}