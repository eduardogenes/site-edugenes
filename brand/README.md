# edugenes · Pacote de marca — instruções de implementação

> **Para o Claude Code:** este documento é NORMATIVO. Os arquivos desta pasta são os
> assets FINAIS da marca edugenes (não são referências a recriar — use-os como estão).
> Não recolorir, não esticar, não redesenhar, não substituir por aproximações.
> Em caso de conflito entre este documento e qualquer outra instrução de estilo, este vence.

## Visão geral

Marca pessoal de Eduardo "Edu" Genes, web developer (edugenes.dev).
Conceito: genes → código genético → código-fonte. Três peças:

1. **Símbolo** — "escada" de pares de bases de DNA (barras café = A·T, verdes = C·G, pontos = fitas)
2. **Wordmark** — `edugenes_` em Space Grotesk 600, underscore café 700 (o cursor do terminal)
3. **Monograma** — `eg▍` (iniciais + cursor-bloco), usado em favicon/avatar

## 1 · Onde colocar os arquivos

### Projeto estático / Vite / geral
```
public/
  favicon.svg              ← renomear de svg/favicon-tile-escuro.svg
  favicon-16.png           ← png/favicon-16.png
  favicon-32.png           ← png/favicon-32.png
  apple-touch-icon.png     ← renomear de png/favicon-180.png
  icon-192.png             ← png/favicon-192.png
  icon-512.png             ← png/favicon-512.png
  site.webmanifest         ← criar (ver §3)
src/assets/brand/          ← todo o resto (símbolo SVGs, lockups, wordmark)
```

### Next.js (App Router)
```
app/icon.svg               ← svg/favicon-tile-escuro.svg (Next gera as tags sozinho)
app/apple-icon.png         ← png/favicon-180.png
public/icon-192.png, public/icon-512.png + manifest via app/manifest.ts
```
Demais assets em `public/brand/` ou importados de `src/assets/brand/`.

## 2 · Tags do `<head>` (HTML puro)

```html
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16.png">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
<meta name="theme-color" content="#1E1A14">
```

## 3 · site.webmanifest

```json
{
  "name": "edugenes",
  "short_name": "edugenes",
  "icons": [
    { "src": "/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/icon-512.png", "sizes": "512x512", "type": "image/png" }
  ],
  "theme_color": "#1E1A14",
  "background_color": "#FAF8F5",
  "display": "standalone"
}
```

## 4 · Tokens de cor (CSS)

Inserir no stylesheet global (ou tailwind.config / tokens do design system):

```css
:root {
  /* acentos — par conceitual (bases pareadas) */
  --brand-cafe: #E38D3D;        /* oklch(0.72 0.14 60)  — barras A·T, cursor */
  --brand-bio: #51B67A;         /* oklch(0.70 0.13 155) — barras C·G */
  --brand-cafe-deep: #B25400;   /* oklch(0.55 0.16 60)  — cursor sobre fundos claros/café */
  --brand-bio-deep: #007E46;    /* oklch(0.52 0.13 155) — par do café profundo */
  /* neutros — levemente aquecidos */
  --brand-tinta: #1E1A14;       /* oklch(0.22 0.012 80) — texto, tiles */
  --brand-papel: #FAF8F5;       /* oklch(0.98 0.005 90) — fundo light */
  --brand-dark: #17130E;        /* oklch(0.19 0.012 80) — fundo dark */
  --brand-dark-paper: #F0EEEA;  /* oklch(0.95 0.006 90) — texto sobre dark */
}
```

## 5 · Fontes

- **Space Grotesk** 600 e 700 — wordmark e títulos
- **JetBrains Mono** 400/500 — detalhes técnicos, legendas

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
```
(Preferir self-host em produção se quiser performance.)

## 6 · Lockup no site: usar TEXTO VIVO, não PNG

No header do site o wordmark deve ser texto real (nítido, acessível, responsivo),
ao lado do símbolo em SVG. Os PNGs de lockup são para documentos/social, não pro header.

```html
<a class="brand" href="/" aria-label="edugenes — início">
  <img src="/brand/simbolo-duotone.svg" alt="" height="28">
  <span class="brand-word">edugenes<span class="brand-cursor">_</span></span>
</a>
```

```css
.brand { display: flex; align-items: center; gap: 14px; text-decoration: none; }
.brand-word {
  font-family: "Space Grotesk", sans-serif;
  font-weight: 600; font-size: 24px; line-height: 1;
  letter-spacing: -0.02em; color: var(--brand-tinta);
}
.brand-cursor { color: var(--brand-cafe); font-weight: 700; animation: brand-blink 1.1s steps(1) infinite; }
@keyframes brand-blink { 0%, 55% { opacity: 1; } 56%, 100% { opacity: 0; } }
@media (prefers-reduced-motion: reduce) { .brand-cursor { animation: none; } }
```

Em fundo escuro: trocar `--brand-tinta` → `--brand-dark-paper` no texto e usar
`simbolo-duotone-para-fundo-escuro.svg`.

## 7 · Regras OBRIGATÓRIAS

1. **O cursor `_` pisca apenas em telas vivas** (site/app), ciclo ~1,1s, `steps(1)`,
   sempre com fallback `prefers-reduced-motion`. Em qualquer contexto estático o cursor
   fica visível e parado — nunca removê-lo.
2. **O símbolo (escada) nunca anima.** Não piscar, não girar, não "construir".
3. **Não alterar cores nem ordem das barras** (café/verde/verde/café). Versão mono
   (`simbolo-mono-*.svg`) é a única alternativa de cor permitida.
4. **Tamanhos mínimos:** símbolo completo ≥ 20px de altura; abaixo disso usar o corte
   favicon (só barras). Lockup horizontal ≥ 24px de altura.
5. **Light first:** o site é claro por padrão (`--brand-papel`); no dark, fundo
   `--brand-dark` e texto `--brand-dark-paper`.
6. **Hierarquia dos lockups:** horizontal no header/topo; wordmark sozinho no footer;
   empilhado só em formatos quadrados/verticais (cards de share, OG images).
7. **Avatares (`avatar-eg-*.png`) são para perfis externos** (GitHub, LinkedIn etc.),
   não aparecem dentro do site.

## 8 · Índice completo dos arquivos

| Arquivo | Descrição | Quando usar |
|---|---|---|
| `svg/simbolo-duotone.svg` | Escada com pontos tinta, barras café/verde | Símbolo padrão sobre fundos claros |
| `svg/simbolo-duotone-para-fundo-escuro.svg` | Idem, pontos claros (#F0EEEA) | Símbolo sobre fundos escuros |
| `svg/simbolo-mono-tinta.svg` | Escada 100% tinta | 1 cor sobre claro: carimbo, P&B, marca d'água |
| `svg/simbolo-mono-papel.svg` | Escada 100% papel | 1 cor sobre escuro ou sobre café/verde |
| `svg/favicon-barras.svg` | Só as 4 barras, fundo transparente | Base vetorial do favicon; sobre qualquer fundo escuro |
| `svg/favicon-tile-escuro.svg` | Barras em tile quadrado arredondado tinta | **→ favicon.svg do site** |
| `svg/favicon-circulo-escuro.svg` | Barras em círculo tinta | Plataformas que pedem ícone redondo |
| `png/favicon-16.png` / `-32.png` | Tile raster pequeno | Aba do navegador (fallback PNG) |
| `png/favicon-48.png` / `-64.png` | Tile raster médio | Atalhos, bookmarks, Windows |
| `png/favicon-180.png` | Tile 180×180 | **→ apple-touch-icon.png** |
| `png/favicon-192.png` / `-512.png` | Tile 192/512 | PWA / Android (manifest) |
| `png/avatar-eg-tinta.png` | eg▍ sobre fundo tinta, cursor café | **Avatar padrão** — GitHub, LinkedIn, redes |
| `png/avatar-eg-claro.png` | eg▍ sobre fundo claro, cursor café profundo | Plataformas de fundo escuro (avatar claro destaca) |
| `png/avatar-eg-cafe.png` | eg▍ sobre fundo café, cursor café profundo | Alternativo vibrante — usar com moderação |
| `png/lockup-horizontal-tinta.png` | Símbolo + edugenes_ lado a lado, tinta | Marca principal em docs/slides claros |
| `png/lockup-horizontal-papel.png` | Idem, texto papel | Docs/slides escuros |
| `png/lockup-empilhado-tinta.png` | Símbolo sobre o wordmark, tinta | Formatos quadrados/verticais claros |
| `png/lockup-empilhado-papel.png` | Idem, texto papel | Formatos quadrados/verticais escuros |
| `png/wordmark-tinta.png` | Só edugenes_, tinta | Faixas baixas claras (rodapés, créditos) |
| `png/wordmark-papel.png` | Só edugenes_, papel | Faixas baixas escuras |
| `Guia de Uso.html` | Guia visual da marca (abrir no navegador / imprimir) | Referência humana |
| `README.md` | Este documento | Referência para Claude Code / devs |

## 9 · Cole no CLAUDE.md do seu repositório

```markdown
## Marca edugenes
Os assets da marca vivem em <caminho>/brand/ e vieram do pacote oficial "entrega/".
LEIA E SIGA o README.md desse pacote antes de tocar em qualquer favicon, logo,
cor de marca ou tipografia. Regras inegociáveis: cursor pisca só em telas vivas
(com prefers-reduced-motion), símbolo nunca anima, cores/ordem das barras
imutáveis, wordmark do header é texto vivo (Space Grotesk 600) e não imagem.
Tokens de cor: usar as variáveis --brand-* definidas no CSS global.
```

## Checklist de implementação

- [ ] Favicons copiados/renomeados para `public/` + tags no `<head>` (§1–2)
- [ ] `site.webmanifest` criado (§3)
- [ ] Tokens `--brand-*` no CSS global (§4)
- [ ] Fontes carregadas (§5)
- [ ] Header com símbolo SVG + wordmark em texto vivo com cursor piscando (§6)
- [ ] `prefers-reduced-motion` respeitado (§7.1)
- [ ] Bloco da marca adicionado ao CLAUDE.md do repositório (§9)
