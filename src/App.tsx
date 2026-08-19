import { Suspense, useEffect } from 'react'
import { Board } from './renderers/board/Board'
import { watchPosture } from './capability'
import { lazyWithReload } from './components/lazyWithReload'
import { useRoute } from './qday/route'

const QDay = lazyWithReload('QDay', () => import('./qday/QDay'))

/**
 * Two surfaces, one address bar.
 *
 * The board is still the application — orbital is a mode within it and
 * everything else lives in windows the board owns. Q-Day is the exception, and
 * it earns the exception by being a different kind of thing: seven dense pages
 * a reader moves between and sends to people, rather than a space to move
 * around in.
 *
 * The board unmounts while Q-Day is open rather than hiding behind it. That
 * costs the window layout, which the board does not persist across a reload
 * either — and it buys not running a canvas animation loop behind an opaque
 * overlay for as long as somebody reads.
 */
export default function App() {
  useEffect(() => watchPosture(), [])
  const route = useRoute()

  if (route.view === 'qday') {
    return (
      <Suspense fallback={<div className="qday-boot">Opening Q-Day…</div>}>
        <QDay tab={route.tab} />
      </Suspense>
    )
  }

  return <Board />
}
