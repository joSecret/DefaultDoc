import { defineConfig } from 'astro/config';
import sitemap from "@astrojs/sitemap";
import { SITE_URL } from './src/site_config';

// https://astro.build/config
export default defineConfig({
  site: SITE_URL,
  base: '/DefaultDoc',
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
