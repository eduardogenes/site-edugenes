/**
 * translations.ts
 * Arquivo central de traduções do portfólio.
 * 
 * Estrutura:
 * - Organizado por idiomas (en, pt)
 * - Cada idioma contém seções correspondentes aos componentes
 * - Chaves aninhadas para melhor organização
 * - Mantém consistência entre as traduções
 * 
 * Seções principais:
 * - hero: Seção inicial com apresentação
 * - about: Informações sobre mim
 * - skills: Habilidades técnicas e competências
 * - projects: Portfólio de projetos
 * - contact: Formulário de contato
 * - nav: Menu de navegação
 * - footer: Rodapé
 */

export const translations = {
  // Traduções em inglês
  en: {
    // Hero - Seção inicial
    hero: {
      title: "Full Stack Web Developer",
      subtitle: "Transforming ideas into elegant and functional solutions",
      callToAction: "About"
    },
    
    // About - Seção sobre mim
    about: {
      title: "About Me",
      description: "Web developer focused on creating practical and functional solutions. Currently dedicated to full-stack development, always seeking to learn and evolve with each project.",
      // Subseção de habilidades no About
      skills: {
        frontend: {
          title: "Front-end",
          description: "Web interface development with React and TypeScript, aiming to create responsive and accessible experiences."
        },
        backend: {
          title: "Back-end",
          description: "Knowledge in Node.js and SQL databases, focusing on development best practices."
        },
        uiDesign: {
          title: "UI Design",
          description: "Interface implementation following design and usability principles with Tailwind CSS."
        },
        cta: "Skills"
      }
    },

    // Skills - Seção de habilidades
    skills: {
      title: "Skills",
      subtitle: "Knowledge is an endless journey",
      cta: "Projects",
      // Subseção de competências
      competencies: {
        title: "Competencies",
        teamwork: {
          title: "Teamwork",
          subtitle: "Clear Communication",
          description: "Experience with agile methodologies and collaborative tools"
        },
        english: {
          title: "English C1",
          subtitle: "Advanced",
          description: "Proficiency for communication and technical documentation"
        },
        problemSolving: {
          title: "Problem Solving",
          subtitle: "Analytical Thinking",
          description: "Ability to analyze and solve complex problems"
        },
        learning: {
          title: "Continuous Learning",
          subtitle: "Self-taught",
          description: "Always seeking to learn new technologies and methodologies"
        }
      },
      // Subseção de certificações
      certifications: {
        title: "Certifications",
        inProgress: "In Progress",
        systemsAnalysis: {
          name: "Systems Analysis and Development",
          institution: "UNESA"
        },
        webDevelopment: {
          name: "Full-Stack Web Development",
          institution: "Infinity School"
        },
        devOps: {
          name: "DevOps",
          institution: "Atlantico Avanti"
        },
        cursoDev: {
          name: "Curso.dev",
          institution: "Curso.dev"
        },
        aws: {
          name: "AWS Cloud Practitioner",
          institution: "Escola da Nuvem"
        }
      }
    },

    // Projects - Seção de projetos
    projects: {
      title: "Projects",
      subtitle: "Some of the projects I've developed, demonstrating my skills and experience",
      projects: {
        // Detalhes de cada projeto
        garimpeiroGenes: {
          title: "Garimpeiro Genes",
          description: "An intelligent prospector for real estate opportunities from Caixa Econômica Federal with modern visualization."
        },
        genesTomato: {
          title: "GenesTomato",
          description: "A simple and modern Pomodoro timer, built to help maintain focus and increase productivity."
        },
        infiniflix: {
          title: "InfiniFlix",
          description: "Streaming platform with movies and series catalog."
        },
        drCare: {
          title: "Dr. Care",
          description: "Institutional website for medical clinic with appointment scheduling."
        },
        orcamentoNano: {
          title: "Budget Nano",
          description: "Personal budget and financial control application."
        },
        calculadora: {
          title: "Calculator",
          description: "Web calculator with modern interface and advanced features."
        },
        interactiveRating: {
          title: "Interactive Rating",
          description: "Interactive rating component with animations and visual feedback."
        }
      },
      cta: "Let's talk",
      code: "Code",
      demo: "Demo"
    },

    // Contact - Seção de contato
    contact: {
      title: "Contact",
      subtitle: "Let's work together?",
      form: {
        name: "Name",
        email: "Email",
        message: "Message",
        send: "Send Message",
        sending: "Sending...",
        success: "Message sent successfully!",
        error: "An error occurred. Please try again.",
        placeholders: {
          name: "Your name",
          email: "your.email@example.com",
          message: "Tell me about your project or idea..."
        }
      },
      workingHours: {
        title: "Working Hours",
        days: "Monday - Friday",
        hours: "8:00 AM - 6:00 PM"
      }
    },

    // Nav - Menu de navegação
    nav: {
      home: "Home",
      about: "About",
      skills: "Skills",
      projects: "Projects",
      contact: "Contact"
    },

    // Footer - Rodapé
    footer: {
      madeWith: "Made with",
      by: "by Eduardo Genes",
      copyright: "All rights reserved"
    }
  },

  // Traduções em português
  pt: {
    // Hero - Seção inicial
    hero: {
      title: "Desenvolvedor Web Full Stack",
      subtitle: "Transformando ideias em soluções elegantes e funcionais",
      callToAction: "Conheça meu trabalho"
    },
    
    // About - Seção sobre mim
    about: {
      title: "Sobre Mim",
      description: "Desenvolvedor web focado em criar soluções práticas e funcionais. Atualmente me dedicando ao desenvolvimento full-stack, sempre buscando aprender e evoluir com cada projeto.",
      // Subseção de habilidades no About
      skills: {
        frontend: {
          title: "Front-end",
          description: "Desenvolvimento de interfaces web com React e TypeScript, buscando criar experiências responsivas e acessíveis."
        },
        backend: {
          title: "Back-end",
          description: "Conhecimento em Node.js e bancos de dados SQL, com foco em boas práticas de desenvolvimento."
        },
        uiDesign: {
          title: "UI Design",
          description: "Implementação de interfaces seguindo princípios de design e usabilidade com Tailwind CSS."
        },
        cta: "minhas habilidades"
      }
    },

    // Skills - Seção de habilidades
    skills: {
      title: "Habilidades",
      subtitle: "O conhecimento é uma jornada sem fim",
      cta: "meus projetos",
      // Subseção de competências
      competencies: {
        title: "Competências",
        teamwork: {
          title: "Trabalho em Equipe",
          subtitle: "Comunicação Clara",
          description: "Experiência com metodologias ágeis e ferramentas colaborativas"
        },
        english: {
          title: "Inglês C1",
          subtitle: "Avançado",
          description: "Proficiência para comunicação e documentação técnica"
        },
        problemSolving: {
          title: "Resolução de Problemas",
          subtitle: "Pensamento Analítico",
          description: "Capacidade de analisar e resolver problemas complexos"
        },
        learning: {
          title: "Aprendizado Contínuo",
          subtitle: "Autodidata",
          description: "Sempre buscando aprender novas tecnologias e metodologias"
        }
      },
      // Subseção de certificações
      certifications: {
        title: "Certificações",
        inProgress: "Em andamento",
        systemsAnalysis: {
          name: "Análise e Desenvolvimento de Sistemas",
          institution: "UNESA"
        },
        webDevelopment: {
          name: "Desenvolvimento Web Full-Stack",
          institution: "Infinity School"
        },
        devOps: {
          name: "DevOps",
          institution: "Atlantico Avanti"
        },
        cursoDev: {
          name: "Curso.dev",
          institution: "Curso.dev"
        },
        aws: {
          name: "AWS Cloud Practitioner",
          institution: "Escola da Nuvem"
        }
      }
    },

    // Projects - Seção de projetos
    projects: {
      title: "Projetos",
      subtitle: "Alguns dos projetos que desenvolvi, demonstrando minhas habilidades e experiência",
      projects: {
        // Detalhes de cada projeto
        garimpeiroGenes: {
          title: "Garimpeiro Genes",
          description: "Garimpeiro de oportunidades em imóveis da Caixa com análise inteligente e visualização moderna."
        },
        genesTomato: {
          title: "GenesTomato",
          description: "Um temporizador Pomodoro simples e moderno, construído para ajudar a manter o foco e aumentar a produtividade."
        },
        infiniflix: {
          title: "InfiniFlix",
          description: "Plataforma de streaming com catálogo de filmes e séries."
        },
        drCare: {
          title: "Dr. Care",
          description: "Site institucional para clínica médica com agendamento de consultas."
        },
        orcamentoNano: {
          title: "Orçamento Nano",
          description: "Aplicativo para gerenciamento de orçamento pessoal e controle financeiro."
        },
        calculadora: {
          title: "Calculadora",
          description: "Calculadora web com interface moderna e funcionalidades avançadas."
        },
        interactiveRating: {
          title: "Interactive Rating",
          description: "Componente interativo de avaliação com animações e feedback visual."
        }
      },
      cta: "vamos conversar",
      code: "Código",
      demo: "Demo"
    },

    // Contact - Seção de contato
    contact: {
      title: "Contato",
      subtitle: "Vamos trabalhar juntos?",
      form: {
        name: "Nome",
        email: "Email",
        message: "Mensagem",
        send: "Enviar Mensagem",
        sending: "Enviando...",
        success: "Mensagem enviada com sucesso!",
        error: "Ocorreu um erro. Tente novamente.",
        placeholders: {
          name: "Seu nome",
          email: "seu.email@exemplo.com",
          message: "Me conte sobre seu projeto ou ideia..."
        }
      },
      workingHours: {
        title: "Horário de Trabalho",
        days: "Segunda - Sexta",
        hours: "8:00 - 18:00"
      }
    },

    // Nav - Menu de navegação
    nav: {
      home: "Início",
      about: "Sobre",
      skills: "Habilidades",
      projects: "Projetos",
      contact: "Contato"
    },

    // Footer - Rodapé
    footer: {
      madeWith: "Feito com",
      by: "por Eduardo Genes",
      copyright: "Todos os direitos reservados"
    }
  }
};
