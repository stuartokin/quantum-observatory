import { defineConfig } from 'vite'
import { contentJson } from './plugins/contentJson'
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'

export default defineConfig({
  /**
   * RELATIVE, NOT A HARD-CODED SUBPATH.
   *
   * The site moved from a GitHub *user* site (served at the domain root) to a
   * *project* site (served from `/<repo>/`), and the obvious fix was
   * `base: '/quantum-observatory/'`. This is better for two reasons.
   *
   * It removes the outage. A hard-coded base is wrong at the old location and
   * right at the new one, so renaming the repository and deploying the change
   * cannot both happen at once — whichever goes first, the site serves its HTML
   * and fails to find a single asset until the other catches up. A relative
   * base is correct at *both*, so the rename needs no coordination and can be
   * undone without a second deploy.
   *
   * And it removes a coupling. The build no longer contains the repository's
   * name, so renaming again, moving to a custom domain, or serving the same
   * artefact from two places all work without touching the config.
   *
   * `import.meta.env.BASE_URL` becomes './', which resolves against the page's
   * directory — `/quantum-observatory/content-data/frontier.json` there, and
   * `/content-data/frontier.json` at a root. The hash router is unaffected:
   * a fragment never takes part in relative resolution.
   */
  base: './',

  /**
   * When the site was last built, which is when content last reached a reader.
   * Front matter records dates but not times, so this is the only honest
   * timestamp available — and it is the one that answers "how fresh is this".
   */
  define: {
    __BUILD_TIME__: JSON.stringify(new Date().toISOString()),
  },
  plugins: [contentJson(), react()],
  // Content lives outside /src so agents have one obvious place to write.
  resolve: {
    alias: {
      '/content': resolve(__dirname, 'content'),
      // Help renders the agents' own source register rather than a copy of it,
      // so the two cannot drift apart.
      '/agents': resolve(__dirname, 'agents'),
      // The project's own documents, rendered in Help from source.
      '/docs': resolve(__dirname, '.'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        /**
         * Name chunks predictably.
         *
         * A manual chunk is usually named for its key, but not always — one
         * pulled in by a dynamic import can be named after the module instead,
         * and then the budget script filters on a prefix that never appears.
         * Being explicit removes the guesswork from both ends.
         */
        chunkFileNames: 'assets/[name]-[hash].js',
        manualChunks(id) {
          const norm = id.split('?')[0]

          /**
           * Content is no longer chunked, because it is no longer JavaScript.
           *
           * `plugins/contentJson.ts` emits each collection as a fetched JSON
           * asset instead. The `content` and `news` chunks that used to be
           * matched here — 188.8 KB and 106.1 KB gzipped at 0.48.11, both
           * downloaded and executed before anything appeared on screen — do
           * not exist any more.
           *
           * `content/frontier/_scales.json` is the one exception and is
           * deliberately left in the entry chunk: it is a few hundred bytes,
           * it defines what each readiness level *means* per pillar, and the
           * axis cannot be labelled without it. Splitting it out would be a
           * network round trip to save nothing.
           *
           * The project's own documents still are JavaScript — they are
           * `?raw` string imports rendered by Help — so they keep a chunk.
           * They grow with the project rather than with the application, and
           * measuring them alongside React would make the app look like it
           * bloats whenever anyone writes anything down. Help is lazy, so
           * nobody downloads these until they open it.
           */
          if (
            norm.includes('/agents/') ||
            norm.endsWith('/DESIGN-LOG.md') ||
            norm.endsWith('/OPERATING.md') ||
            norm.endsWith('/AGENT-PLAN.md')
          ) {
            return 'docs'
          }
          return undefined
        },
      },
    },
    chunkSizeWarningLimit: 900,
  },
})
