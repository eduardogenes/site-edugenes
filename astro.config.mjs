// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://edugenes.dev',
  trailingSlash: 'never',
  // gera freela.html / cv.html (em vez de freela/index.html) — espelha as rotas
  // atuais e casa com o cleanUrls da Vercel
  build: { format: 'file' },
  // /cv fora do sitemap (coerente com o noindex); a 404 o plugin já exclui
  integrations: [sitemap({ filter: (page) => !page.includes('/cv') })],
  // permite acesso via ngrok no dev (subdomínio muda a cada sessão)
  vite: {
    server: {
      allowedHosts: ['.ngrok-free.dev', '.ngrok.io', '.ngrok.app'],
    },
  },
});
