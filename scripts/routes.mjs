import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { PAGES, SITE, fallbackHtml, jsonLd, llmsText } from '../src/seo.js'

const dist = join(dirname(fileURLToPath(import.meta.url)), '..', 'dist')
const home = readFileSync(join(dist, 'index.html'), 'utf8')

function fill(html, path) {
  const page = PAGES[path]
  const url = `${SITE}${path}`
  return html
    .replace(/(<title data-bk="title">)[\s\S]*?(<\/title>)/, `$1${page.title}$2`)
    .replace(/(data-bk="description"[^>]*content=")[^"]*(")/, `$1${page.description}$2`)
    .replace(/(data-bk="canonical"[^>]*href=")[^"]*(")/, `$1${url}$2`)
    .replace(/(data-bk="og-title"[^>]*content=")[^"]*(")/, `$1${page.title}$2`)
    .replace(/(data-bk="og-description"[^>]*content=")[^"]*(")/, `$1${page.description}$2`)
    .replace(/(data-bk="og-url"[^>]*content=")[^"]*(")/, `$1${url}$2`)
    .replace(/(data-bk="twitter-title"[^>]*content=")[^"]*(")/, `$1${page.title}$2`)
    .replace(/(data-bk="twitter-description"[^>]*content=")[^"]*(")/, `$1${page.description}$2`)
    .replace(/(<script data-bk="jsonld" type="application\/ld\+json">)[\s\S]*?(<\/script>)/, `$1${jsonLd(path)}$2`)
    .replace(/<!--bk-start-->[\s\S]*?<!--bk-end-->/, `<!--bk-start-->${fallbackHtml(path)}<!--bk-end-->`)
}

for (const path of ['/menu', '/contact']) {
  const folder = join(dist, path.slice(1))
  mkdirSync(folder, { recursive: true })
  writeFileSync(join(folder, 'index.html'), fill(home, path))
}

writeFileSync(join(dist, 'llms.txt'), llmsText())
