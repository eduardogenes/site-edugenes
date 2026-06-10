# edugenes.com.br — portfólio «Documento» (v2)

Site pessoal do Eduardo Genes na identidade visual **«Documento»**: diagramado como uma proposta impressa, com tipografia industrial (Archivo + Newsreader) e uma camada pesada de motion design (boot de terminal, tipos móveis que caem, carimbo, coreografia de scroll).

**100% estático** — HTML/CSS/JS vanilla, sem build, sem framework. A física das animações é JS puro com `requestAnimationFrame`.

## Páginas / rotas

| Rota | Arquivo | O quê |
|---|---|---|
| `/` | `index.html` | Portfólio (PT/EN) |
| `/freela` | `freela.html` | Proposta comercial (B2B local) |
| `/cv` | `cv.html` | Currículo imprimível (`noindex`) |
| — | `404.html` | Página de erro temática (`noindex`) |

Rotas limpas (`/freela`, `/cv`) e fallback de 404 são resolvidos pela Vercel via [`vercel.json`](vercel.json) (`cleanUrls`, deploy estático sem build).

## Estrutura

```
index.html  freela.html  cv.html  404.html
portfolio-v2.css                      sistema visual compartilhado
portfolio-v2.js                       i18n PT/EN, render, relógio (tweaks congelados)
portfolio-v2-motion.js                boot + abertura física do masthead
portfolio-v2-scrollmotion.js          coreografia de scroll + botões magnéticos
portfolio-v2-devmode.js               statusline vim + modo inspect (só no portfólio)
portfolio.data.js                     dados dos projetos/experiência (PT/EN)
retrato.png                           foto da seção "Sobre"
assets/                               favicon, apple-touch-icon, OG, placeholder dos prints
v1/                                   versão anterior (React + Vite + TS), arquivada
```

Os arquivos `portfolio-v2*.{js,css}` e `portfolio.data.js` são código final — a física de mola foi calibrada à mão; não reescrever.

## Desenvolvimento local

Como é estático, basta servir a pasta. O repo traz um servidor de dev zero-dependências que reproduz o roteamento da Vercel (clean URLs + 404):

```bash
node dev-server.js          # http://localhost:3000
node dev-server.js 8080     # porta alternativa
```

(`npx serve .` também funciona; já `python3 -m http.server` serve os arquivos mas não resolve `/freela` → `freela.html`.)

## Prints dos projetos (pendente)

As fichas de trabalho usam um placeholder em `assets/projetos/_placeholder.svg`. Para publicar os prints reais, basta soltar os arquivos em `assets/projetos/` com estes nomes — substituem o placeholder sem mexer no código:

`shot-wviana.png` · `shot-llm.png` · `shot-garimpeiro.png` · `shot-mulheres.png` · `shot-hat.png` · `shot-orc.png`

## Histórico

A versão anterior do portfólio (React + Vite + TypeScript + Tailwind) está preservada em [`v1/`](v1/), fora do deploy.
