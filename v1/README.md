# Portfólio Profissional

Um portfólio moderno e responsivo desenvolvido com React, TypeScript e Tailwind CSS.

---

## 🎯Sobre Mim

 Desenvolvedor Front-End focado em criar experiências únicas para o usuário. Adoro aprender novas tecnologias e enfrentar desafios que me tirem da zona de conforto.

Entre em contato comigo:
- [E-mail](mailto:seuemail@email.com)
- [LinkedIn](https://linkedin.com/in/seu-perfil)
- [GitHub](https://github.com/seu-usuario)

## 🚀 Tecnologias do Projeto

- React
- TypeScript
- Tailwind CSS
- Vite
- Lucide React (ícones)

## 🌟 Funcionalidades

- Design responsivo para todos os dispositivos
- Modo escuro/claro
- Seções para: Sobre, Habilidades, Projetos, Formação e Contato
- Animações suaves
- Links para redes sociais e currículo

---

## ✨ Projetos em Destaque

### 1. Sistema de Gerenciamento de Tarefas
Um aplicativo que permite aos usuários criar, organizar e gerenciar tarefas do dia a dia.
- **Tecnologias**: React, TypeScript, Tailwind CSS
- [Acesse o projeto aqui](https://link-para-o-projeto.com)

### 2. Calculadora de Investimentos
Uma calculadora responsiva que simula retornos financeiros com base em diferentes entradas.
- **Tecnologias**: HTML, CSS, JavaScript
- [Acesse o projeto aqui](https://link-para-o-projeto.com)


---

## 📚 Arquitetura do Projeto

### Estrutura de Diretórios
```
src/
├── components/     # Componentes React reutilizáveis
├── constants/      # Constantes e dados estáticos
├── contexts/       # Contextos React (ex: ThemeContext)
├── hooks/          # Hooks personalizados
├── styles/         # Estilos globais e utilitários
├── types/         # Definições de tipos TypeScript
└── utils/         # Funções utilitárias
```

### Componentes Principais

#### 1. App.tsx
- Componente raiz da aplicação
- Gerencia o estado de carregamento inicial
- Implementa o ThemeProvider para controle de tema
- Organiza a estrutura principal do layout

#### 2. ThemeContext
- Gerencia o tema dark/light da aplicação
- Persiste a preferência do usuário no localStorage
- Sincroniza com as preferências do sistema operacional
- Fornece hook useTheme para fácil acesso ao tema

#### 3. Componentes de Seção
- **Header**: Navegação principal e controle de tema
- **Hero**: Seção de apresentação inicial
- **About**: Informações detalhadas sobre experiência
- **Skills**: Grade de habilidades técnicas
- **Projects**: Portfólio de projetos
- **Contact**: Formulário de contato
- **Footer**: Links e informações adicionais

## 🛠️ Stack Tecnológica

### Core
- **React 18**: Biblioteca principal para construção da UI
- **TypeScript**: Adiciona tipagem estática ao JavaScript
- **Vite**: Build tool moderna e rápida

### Estilização
- **Tailwind CSS**: Framework CSS utility-first
- **PostCSS**: Processador CSS para plugins modernos
- **CSS Modules**: Escopo local para estilos

### Bibliotecas Auxiliares
- **Lucide React**: Biblioteca de ícones modernos
- **React Hook Form**: Gerenciamento de formulários
- **Framer Motion**: Animações fluidas

## 💡 Padrões e Boas Práticas

### Componentes
- Componentes funcionais com TypeScript
- Props tipadas e documentadas
- Separação de responsabilidades
- Reutilização de código através de hooks personalizados

### Estado
- Contexto React para estado global
- useState para estado local
- useEffect para efeitos colaterais

### Estilização
- Classes utilitárias do Tailwind
- Dark mode nativo
- Design responsivo mobile-first
- Animações otimizadas para performance

### TypeScript
- Interfaces para tipos complexos
- Type guards quando necessário
- Strict mode habilitado

## 🔧 Configuração do Ambiente

1. **Pré-requisitos**
   - Node.js >= 16.x
   - npm >= 8.x

2. **Instalação**
   ```bash
   npm install
   ```

3. **Scripts Disponíveis**
   - `npm run dev`: Inicia servidor de desenvolvimento
   - `npm run build`: Gera build de produção
   - `npm run preview`: Visualiza build local
   - `npm run lint`: Executa verificação de código

## 🎨 Design System

### Cores
- Primary: #3B82F6 (blue-500)
- Background: #F9FAFB (light) / #111827 (dark)
- Text: #111827 (light) / #F9FAFB (dark)
- Accent: #2563EB (blue-600)

### Tipografia
- Fonte principal: Inter
- Tamanhos: 
  - Heading: 2rem - 4rem
  - Body: 1rem - 1.125rem
  - Small: 0.875rem

### Breakpoints
- sm: 640px
- md: 768px
- lg: 1024px
- xl: 1280px

## 🔐 Boas Práticas de Segurança

- Sanitização de inputs
- Proteção contra XSS
- Validação de formulários
- Variáveis de ambiente seguras

## 📱 Responsividade

O projeto segue uma abordagem mobile-first com breakpoints específicos para:
- Dispositivos móveis (< 640px)
- Tablets (640px - 1024px)
- Desktop (> 1024px)

## 🚀 Performance

- Lazy loading de imagens
- Code splitting automático
- Otimização de assets
- Caching eficiente

## 📈 SEO e Acessibilidade

- Tags semânticas HTML5
- Meta tags otimizadas
- Landmarks ARIA
- Alt text em imagens
- Contraste de cores adequado

## 🔧 Instalação e Uso

1. Clone o repositório
```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
```

2. Instale as dependências
```bash
npm install
```

3. Execute o projeto
```bash
npm run dev
```

## 🌐 Deploy

O projeto está disponível em: []

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

Espero que goste! Feedbacks são sempre bem-vindos! 😊
