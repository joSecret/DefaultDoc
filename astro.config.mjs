import { defineConfig } from 'astro/config';
import sitemap from "@astrojs/sitemap";
import { SITE_URL, SITE_BASE } from './src/site_config';

export default defineConfig({
  site: SITE_URL,
  base: SITE_BASE,
  integrations: [sitemap()],
  vite: {
    plugins: [rawFonts(['.ttf'])],
    optimizeDeps: { exclude: ['@resvg/resvg-js'] }
  },
});

function rawFonts(ext) {
  return {
    name: 'vite-plugin-raw-fonts',
    transform(_, id) {
      if (ext.some(e => id.endsWith(e))) {
        const buffer = fs.readFileSync(id);
        return {
          code: `export default ${JSON.stringify(buffer)}`,
          map: null
        };
      }
    }
  };
}
