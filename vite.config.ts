import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'

export default defineConfig({
  plugins: [react()],
  // Content lives outside /src so agents have one obvious place to write.
  resolve: { alias: { '/content': resolve(__dirname, 'content') } },
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
          if (
            norm.includes('/content/frontier/') ||
            norm.includes('/content/items/') ||
            norm.endsWith('/content/site.json')
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
