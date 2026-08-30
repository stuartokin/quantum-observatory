import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { ErrorBoundary } from './components/ErrorBoundary'
import { loadContent } from './content/store'
import './styles/global.css'

/**
 * WAIT FOR THE CONTENT, THEN MOUNT.
 *
 * Content is fetched rather than bundled (see `content/store.ts`), so there is
 * a window in which the board's data is not there yet. Mounting inside that
 * window would mean every component needed a loading branch and the header
 * would report counts that changed under the reader a moment later — and this
 * project's first commitment is that every number on screen is a real count.
 *
 * So the wait happens once, here, before React exists. The cost is honest and
 * visible; the alternative was a board that renders a lie for 200 ms.
 */
const root = createRoot(document.getElementById('root')!)

loadContent().then(
  () => {
    root.render(
      <StrictMode>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </StrictMode>,
    )
  },
  /**
   * A failed fetch must not be a white screen.
   *
   * The ErrorBoundary cannot help here — it catches errors thrown *during*
   * render, and this one happens before there is anything to render. It says
   * what failed and offers the one action that might fix it, in the same shape
   * as the crash screen so the two read as the same product.
   */
  (err: unknown) => {
    const message = err instanceof Error ? err.message : String(err)
    console.error('Quantum Observatory could not load its content:', err)
    root.render(
      <main className="crash">
        <h2>The board could not load its content</h2>
        <p className="label">
          The application started, but the research it draws could not be fetched.
        </p>
        <pre>{message}</pre>
        <button onClick={() => location.reload()}>Try again</button>
      </main>,
    )
  },
)
