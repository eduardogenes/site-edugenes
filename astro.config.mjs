// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://edugenes.com.br',
  trailingSlash: 'never',
  // gera freela.html / cv.html (em vez de freela/index.html) — espelha as rotas
  // atuais e casa com o cleanUrls da Vercel
  build: { format: 'file' },
});
