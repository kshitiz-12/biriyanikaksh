import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { IMAGE, PAGES, SITE, fallbackHtml, jsonLd } from './src/seo.js'

function attr(value) {
  return value.replaceAll('&', '&amp;').replaceAll('"', '&quot;')
}

function bkSeo() {
  const page = PAGES['/']
  return {
    name: 'bk-seo',
    transformIndexHtml(html) {
      return html
        .replaceAll('%BK_TITLE%', attr(page.title))
        .replaceAll('%BK_DESCRIPTION%', attr(page.description))
        .replaceAll('%BK_URL%', `${SITE}/`)
        .replaceAll('%BK_IMAGE%', IMAGE)
        .replaceAll('%BK_JSONLD%', jsonLd('/'))
        .replaceAll('%BK_FALLBACK%', fallbackHtml('/'))
    },
  }
}

export default defineConfig({
  plugins: [react(), bkSeo()],
})
