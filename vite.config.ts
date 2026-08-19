import { defineConfig } from 'vite'
import { contentJson } from './plugins/contentJson'
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'

export default defineConfig({
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
