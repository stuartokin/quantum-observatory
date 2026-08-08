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
    // grow. Mixing them means the app appears to bloat as the board fills up.
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('/content/') && id.endsWith('.md')) return 'content'
          if (id.includes('/content/frontier/_scales.json')) return 'content'
          if (id.includes('/content/site.json')) return 'content'
          return undefined
        },
      },
    },
    chunkSizeWarningLimit: 900,
  },
})
