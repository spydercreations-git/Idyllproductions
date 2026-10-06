import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const distDir = path.resolve(rootDir, 'dist');
const ssrOutDir = path.resolve(rootDir, 'dist-ssr');

async function prerender() {
  console.log('🚀 Step 1: Building SSR bundle for prerendering...');
  execSync('npx vite build --ssr entry-server.tsx --outDir dist-ssr', {
    cwd: rootDir,
    stdio: 'inherit',
  });

  console.log('🚀 Step 2: Prerendering static HTML for all pages...');
  const templatePath = path.resolve(distDir, 'index.html');
  if (!fs.existsSync(templatePath)) {
    console.error('❌ dist/index.html not found. Please run vite build first.');
    process.exit(1);
  }

  const template = fs.readFileSync(templatePath, 'utf-8');
  const ssrEntryPath = path.resolve(ssrOutDir, 'entry-server.js');
  const { render, PAGE_SEO_MAP, NOT_FOUND_SEO } = await import(ssrEntryPath);

  const routes = Object.keys(PAGE_SEO_MAP);
  const allRoutes = [...routes, '/404'];

  console.log(`📄 Prerendering ${allRoutes.length} pages into static HTML...`);

  for (const url of allRoutes) {
    const is404 = url === '/404';
    const seo = is404 ? NOT_FOUND_SEO : PAGE_SEO_MAP[url];

    let appHtml = '';
    try {
      appHtml = render(is404 ? '/non-existent-fallback-path' : url);
    } catch (err) {
      console.error(`⚠️ Error rendering ${url}:`, err);
      appHtml = '';
    }

    let html = template;

    // 1. Replace title
    html = html.replace(/<title>.*?<\/title>/s, `<title>${seo.title}</title>`);

    // 2. Replace meta description
    html = html.replace(
      /<meta name="description" content=".*?"\/?>/s,
      `<meta name="description" content="${seo.description}">`
    );

    // 3. Replace canonical URL
    html = html.replace(
      /<link rel="canonical" href=".*?"\/?>/s,
      `<link rel="canonical" href="${seo.canonical}">`
    );

    // 4. Replace og:title & twitter:title
    html = html.replace(
      /<meta property="og:title" content=".*?"\/?>/s,
      `<meta property="og:title" content="${seo.title}">`
    );
    html = html.replace(
      /<meta name="twitter:title" content=".*?"\/?>/s,
      `<meta name="twitter:title" content="${seo.title}">`
    );

    // 5. Replace og:description & twitter:description
    html = html.replace(
      /<meta property="og:description" content=".*?"\/?>/s,
      `<meta property="og:description" content="${seo.description}">`
    );
    html = html.replace(
      /<meta name="twitter:description" content=".*?"\/?>/s,
      `<meta name="twitter:description" content="${seo.description}">`
    );

    // 6. Replace og:url & twitter:url
    html = html.replace(
      /<meta property="og:url" content=".*?"\/?>/s,
      `<meta property="og:url" content="${seo.canonical}">`
    );
    html = html.replace(
      /<meta name="twitter:url" content=".*?"\/?>/s,
      `<meta name="twitter:url" content="${seo.canonical}">`
    );

    // 6.5. Manage JSON-LD schema
    if (url !== '/') {
      // Remove template schemas on non-home pages to avoid schema clutter
      html = html.replace(/<script\s+type="application\/ld\+json"[^>]*>.*?<\/script>\s*/gs, '');
      if (seo.schema) {
        const schemaTag = `\n    <!-- Page Specific Schema -->\n    <script type="application/ld+json" id="page-jsonld">\n${JSON.stringify(seo.schema, null, 2)}\n    </script>`;
        html = html.replace('</head>', `${schemaTag}\n</head>`);
      }
    }

    // 7. Inject prerendered HTML into #root
    html = html.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);

    // 8. Determine destination file path
    let outFilePath;
    if (is404) {
      outFilePath = path.resolve(distDir, '404.html');
    } else if (url === '/') {
      outFilePath = path.resolve(distDir, 'index.html');
    } else {
      const routeDir = path.resolve(distDir, url.replace(/^\//, ''));
      if (!fs.existsSync(routeDir)) {
        fs.mkdirSync(routeDir, { recursive: true });
      }
      outFilePath = path.resolve(routeDir, 'index.html');
    }

    fs.writeFileSync(outFilePath, html, 'utf-8');
    console.log(`  ✓ Prerendered ${url.padEnd(35)} -> ${path.relative(distDir, outFilePath)} (${(html.length / 1024).toFixed(1)} KB)`);
  }

  // Cleanup temporary dist-ssr directory
  try {
    fs.rmSync(ssrOutDir, { recursive: true, force: true });
  } catch {}

  console.log('🎉 Prerendering complete! All pages have dedicated HTML files and SEO tags.');
}

prerender().catch((err) => {
  console.error('❌ Prerendering error:', err);
  process.exit(1);
});
