# edugenes.com.br — portfólio «Documento» (v2)

Site pessoal do Eduardo Genes na identidade visual **«Documento»**: diagramado como uma proposta impressa, com tipografia industrial (Archivo + Newsreader) e uma camada pesada de motion design (boot de terminal, tipos móveis que caem, carimbo, coreografia de scroll).

**Stack:** [Astro 6](https://astro.build) + TypeScript estrito, saída 100% estática — zero JS de framework no navegador. A física das animações é JS vanilla com `requestAnimationFrame`, carregada como scripts clássicos.

## Páginas / rotas

| Rota | Fonte | O quê |
|---|---|---|
| `/` | `src/pages/index.astro` | Portfólio (PT/EN) |
| `/freela` | `src/pages/freela.astro` | Proposta comercial (B2B local) |
| `/cv` | `src/pages/cv.astro` | Currículo imprimível (`noindex`) |
| — | `src/pages/404.astro` | Página de erro temática (`noindex`) |

Rotas limpas e fallback de 404 são resolvidos pela Vercel ([`vercel.json`](vercel.json): preset Astro + `cleanUrls`; `build.format: 'file'` no [`astro.config.mjs`](astro.config.mjs) gera `freela.html`/`cv.html`).

## Estrutura

```
src/
├── layouts/Base.astro         head comum (SEO/OG, fontes, CSS) das páginas «Documento»
├── components/portfolio/      Masthead · Toc · WorkSection · TrackSection ·
│                              AboutSection · ContactSection · Colophon
├── pages/                     index · freela · cv · 404
└── types/global.d.ts          tipagem dos dados globais (window.FEATURED etc.)
public/
├── js/                        ⚠ motores de animação + dados — código final, intacto
│   ├── portfolio.data.js      dados dos projetos/experiência (PT/EN)
│   ├── portfolio-v2.js        i18n, render das fichas/ledger, relógio
│   ├── portfolio-v2-motion.js boot + abertura física do masthead
│   ├── portfolio-v2-scrollmotion.js  coreografia de scroll + botões magnéticos
│   └── portfolio-v2-devmode.js       statusline vim + modo inspect (só no portfólio)
├── portfolio-v2.css           sistema visual compartilhado (intacto)
├── assets/                    favicon, OG cards, placeholder dos prints
└── retrato.png
v1/                            versão anterior (React + Vite + TS), arquivada
```

### ⚠ Regra de ouro dos motores

Os arquivos de `public/js/` e o `portfolio-v2.css` são **código final**: a física de mola (letras, carimbo, botões magnéticos) foi calibrada à mão, iterativamente. Eles funcionam lendo o DOM que os componentes Astro renderizam — **não reescrever como módulos/hooks/keyframes**, e não renomear as classes que eles esperam (`.masthead`, `.name .l1/.l2`, `.stamp`, `.sec-head`, `.lrow`, `.windex .wrow`, `.wa-cta`, `.bigmail`, `[data-screen-label]`…).

Divergência deliberada do bundle de design (jun/2026, calibrada com o Eduardo): os ímãs (letras do título, `.bigmail`, `.wa-cta`) ganharam **massa** (`m`) e a **tremida de reacomodação** — ruído zero-média em X/Y/rotação injetado nas molas enquanto o cursor se move, proporcional à velocidade × proximidade. Botões de calibração nos motores: ganhos `1300`/`850`, sensibilidade `/900`, decaimento ~110 ms, massa `m = 1.5`.

## Desenvolvimento

```bash
npm install
npm run dev        # dev server com HMR (http://localhost:4321)
npm run build      # gera dist/
npm run preview    # serve o dist/ localmente
npm run check      # validação TypeScript/Astro
```

## Prints dos projetos (pendente)

As fichas usam um placeholder (`public/assets/projetos/_placeholder.svg`). Para publicar os prints reais, basta soltar os arquivos em `public/assets/projetos/` com estes nomes — substituem o placeholder sem mexer no código:

`shot-wviana.png` · `shot-llm.png` · `shot-garimpeiro.png` · `shot-mulheres.png` · `shot-hat.png` · `shot-orc.png`

## Histórico

A versão anterior do portfólio (React + Vite + TypeScript + Tailwind) está preservada em [`v1/`](v1/), fora do deploy.
