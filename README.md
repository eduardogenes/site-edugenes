# edugenes.dev — portfólio «Documento» (v2)

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
├── components/Analytics.astro loader do Umami + eg-analytics.js (todas as páginas)
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
│   ├── portfolio-v2-devmode.js       statusline vim + modo inspect (só no portfólio)
│   ├── eg-analytics.js        eventos custom do Umami (não é motor — pode evoluir)
│   └── web-vitals.iife.js     lib oficial vendorada (RUM — LCP/CLS/INP)
├── fonts/ + fonts.css         fontes self-hosted (subsets latin/latin-ext)
├── robots.txt                 aponta o sitemap; sem Disallow (noindex faz o papel)
├── portfolio-v2.css           sistema visual compartilhado (intacto)
├── assets/                    favicon, OG cards, placeholder dos prints
└── retrato.avif / retrato.webp  retrato 640px (AVIF + fallback WebP)
v1/                            versão anterior (React + Vite + TS), arquivada
```

### ⚠ Regra de ouro dos motores

Os arquivos de `public/js/` e o `portfolio-v2.css` são **código final**: a física de mola (letras, carimbo, botões magnéticos) foi calibrada à mão, iterativamente. Eles funcionam lendo o DOM que os componentes Astro renderizam — **não reescrever como módulos/hooks/keyframes**, e não renomear as classes que eles esperam (`.masthead`, `.name .l1/.l2`, `.stamp`, `.sec-head`, `.lrow`, `.windex .wrow`, `.wa-cta`, `.bigmail`, `[data-screen-label]`…). Exceção: `eg-analytics.js` não é motor (só consome esse mesmo contrato de classes por delegação) e as strings de conteúdo do dicionário i18n em `portfolio-v2.js` podem ser atualizadas.

Divergência deliberada do bundle de design (jun/2026, calibrada com o Eduardo): os ímãs (letras do título, `.bigmail`, `.wa-cta`) ganharam **massa** (`m`) e a **tremida de reacomodação** — ruído zero-média em X/Y/rotação injetado nas molas enquanto o cursor se move, proporcional à velocidade × proximidade. Botões de calibração nos motores: ganhos `1300`/`850`, sensibilidade `/900`, decaimento ~110 ms, massa `m = 1.5`.

## Desenvolvimento

```bash
npm install
npm run dev        # dev server com HMR (http://localhost:4321)
npm run build      # gera dist/
npm run preview    # serve o dist/ localmente
npm run check      # validação TypeScript/Astro
```

## Analytics (Umami)

Umami Cloud (região UE), **cookieless e sem PII** — dispensa banner de consentimento (LGPD);
a transparência fica na linha de métricas dos colofões. O script é servido pelo próprio domínio
via rewrite `/stats/*` → `cloud.umami.is` no `vercel.json` (reduz perda por adblocker);
`data-domains` ignora localhost e previews.

Instrumentação em duas camadas:

- **Estáticos**: `data-umami-event` (+ `data-umami-event-<prop>`) direto nos templates Astro —
  `whatsapp_click`, `email_click` (prop `placement`), `social_click` (prop `network`),
  `phone_click`, `freela_nav` (prop `from`).
- **Via `public/js/eg-analytics.js`** (delegação no `document` — sobrevive ao re-render da
  troca de idioma): `project_open`, `project_link_click`, `service_open`, `toc_click`,
  `lang_switch`, `404_view`, `scroll_depth` (marcos 50/90), `section_view`, `inspect_toggle`,
  `cv_print` (via `beforeprint` — pega botão e Ctrl+P) e `web_vital` (LCP/CLS/INP reais,
  lib `web-vitals` vendorada).

Regras: nomes `objeto_acao` em snake_case, ≤ 2 props por evento, **nunca PII em props**.

SEO: `robots.txt` + sitemap (`@astrojs/sitemap`, sem `/cv`) + JSON-LD (`Person` na home,
`ProfessionalService` na /freela). Falta (manual): verificar o domínio no Google Search Console
e submeter `https://edugenes.dev/sitemap-index.xml`.

Fontes: self-hosted em `public/fonts/` (latin + latin-ext baixados da URL css2 original do
Google Fonts, eixos variáveis preservados — `font-stretch` do Archivo incluso). Para alterar
famílias/pesos, regenerar `fonts.css` + woff2 a partir da nova URL css2.

### Convenção UTM (links externos meus)

Links divulgados fora do site devem carregar UTM — sem isso tudo vira "tráfego direto":

| Onde                  | `utm_source` | `utm_medium` |
| --------------------- | ------------ | ------------ |
| Bio do Instagram      | `instagram`  | `bio`        |
| Status/msg WhatsApp   | `whatsapp`   | `status`     |
| Cartão (QR)           | `cartao`     | `qr`         |
| Assinatura de e-mail  | `email`      | `assinatura` |
| Perfil LinkedIn       | `linkedin`   | `bio`        |

Ex.: `https://edugenes.dev/freela?utm_source=instagram&utm_medium=bio`

## Prints dos projetos (pendente)

As fichas usam um placeholder (`public/assets/projetos/_placeholder.svg`). Para publicar os prints reais, basta soltar os arquivos em `public/assets/projetos/` com estes nomes — substituem o placeholder sem mexer no código:

`shot-wviana.png` · `shot-llm.png` · `shot-garimpeiro.png` · `shot-mulheres.png` · `shot-hat.png` · `shot-orc.png`

## Histórico

A versão anterior do portfólio (React + Vite + TypeScript + Tailwind) está preservada em [`v1/`](v1/), fora do deploy.
