// Post-build step: renders <App /> to static HTML and injects it (plus inlined CSS, font
// preloads and SEO tags) into dist/index.html so crawlers and first paint don't need JS.
// Set SITE_URL (e.g. https://gymtracko.com) at build time to emit canonical/og:url/og:image,
// sitemap.xml and the robots.txt Sitemap line.
import { readFileSync, writeFileSync, readdirSync, appendFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')
const siteUrl = (process.env.SITE_URL || '').replace(/\/+$/, '')

const { render } = await import(pathToFileURL(join(root, 'dist-ssr', 'entry-server.js')).href)
let html = readFileSync(join(dist, 'index.html'), 'utf8')

// 1) static markup
html = html.replace('<div id="root"></div>', `<div id="root">${render()}</div>`)

// 2) inline the (small) stylesheet to remove the render-blocking request
html = html.replace(/<link rel="stylesheet"[^>]*href="(\/assets\/[^"]+\.css)"[^>]*>/, (_, href) => {
  const css = readFileSync(join(dist, href), 'utf8')
  return `<style>${css}</style>`
})

// 2b) the markup is already complete and visible, so load the app bundle after the first
// paint instead of in the critical path; it then hydrates the existing HTML
html = html.replace(/<script type="module"[^>]*src="(\/assets\/[^"]+\.js)"[^>]*><\/script>/, (_, src) => {
  return `<script>addEventListener('load',function(){var s=document.createElement('script');s.type='module';s.src='${src}';document.head.appendChild(s)})</script>`
})

// 3) preload the fonts used above the fold
const assets = readdirSync(join(dist, 'assets'))
const preload = ['barlow-condensed-latin-900-normal', 'barlow-latin-300-normal']
  .map((name) => assets.find((f) => f.startsWith(name) && f.endsWith('.woff2')))
  .filter(Boolean)
  .map((f) => `<link rel="preload" href="/assets/${f}" as="font" type="font/woff2" crossorigin />`)

// 4) SEO tags
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      name: 'GYMTRACKO',
      ...(siteUrl && { url: siteUrl, logo: `${siteUrl}/brand/gymtracko-lockup.png` }),
      description:
        'Plataforma para gimnasios: retención de socios, seguimiento individual de cada alumno y app para alumnos.',
      email: 'soporte@gymtracko.com',
      telephone: '+54 9 11 2501-5698',
      founder: [
        { '@type': 'Person', name: 'Jonas Bazzi', jobTitle: 'CEO y CTO' },
        { '@type': 'Person', name: 'Mayza Ynara', jobTitle: 'CPO y cofundadora' },
      ],
    },
    {
      '@type': 'WebSite',
      name: 'GYMTRACKO',
      inLanguage: 'es',
      ...(siteUrl && { url: siteUrl }),
    },
  ],
}
const seo = [
  ...preload,
  ...(siteUrl
    ? [
        `<link rel="canonical" href="${siteUrl}/" />`,
        `<meta property="og:url" content="${siteUrl}/" />`,
        `<meta property="og:image" content="${siteUrl}/img/og.jpg" />`,
        `<meta property="og:image:width" content="1200" />`,
        `<meta property="og:image:height" content="630" />`,
        `<meta name="twitter:image" content="${siteUrl}/img/og.jpg" />`,
      ]
    : []),
  `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`,
].join('\n    ')
html = html.replace('<!--SEO_HEAD-->', seo)

writeFileSync(join(dist, 'index.html'), html)

// 5) sitemap + robots Sitemap line (needs the absolute site URL)
if (siteUrl) {
  const today = new Date().toISOString().slice(0, 10)
  writeFileSync(
    join(dist, 'sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url>\n    <loc>${siteUrl}/</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>1.0</priority>\n  </url>\n</urlset>\n`,
  )
  appendFileSync(join(dist, 'robots.txt'), `\nSitemap: ${siteUrl}/sitemap.xml\n`)
}
console.log(`prerendered dist/index.html${siteUrl ? ` for ${siteUrl}` : ' (no SITE_URL: skipped canonical/sitemap)'}`)
