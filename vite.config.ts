import { defineConfig } from 'vite'
import { frontmatter } from './plugins/frontmatter'
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'

export default defineConfig({
  plugins: [frontmatter(), react()],
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
    // Content is bundled at build time, so the entry chunk grows with every
    // item the agents add. Splitting it out keeps two honest measurements:
    // application code, which should stay flat, and data, which is meant to
    // grow. One combined number makes the app look like it bloats every time a
    // research agent does its job.
    rollupOptions: {
      output: {
        manualChunks(id) {
          // import.meta.glob with ?raw yields ids like
          // "/content/frontier/x.md?raw", so match on the path, not the
          // extension. That suffix is why the first attempt caught nothing.
          const norm = id.split('?')[0]
          // Documents and content share a chunk. They grow with the project,
          // not with the application, and measuring them together with React
          // would make the app look like it bloats whenever anyone writes
          // anything down.
          //
          // Match the whole content tree rather than naming collections.
          // /content/news/ was missed when it was added, so every headline the
          // newsroom wrote went into the entry chunk — downloaded before
          // anything appeared on screen, and growing with each run. The content
          // chunk stayed byte-identical across builds while the app grew, which
          // is the tell.
          //
          // Naming collections has now failed twice: once here, once in the
          // workflow that stages files for commit. Match the tree.
          if (
            norm.includes('/content/') ||
            norm.includes('/agents/') ||
            norm.endsWith('/DESIGN-LOG.md') ||
            norm.endsWith('/OPERATING.md') ||
            norm.endsWith('/AGENT-PLAN.md')
          ) {
            return 'content'
          }
          return undefined
        },
      },
    },
    chunkSizeWarningLimit: 900,
  },
})
