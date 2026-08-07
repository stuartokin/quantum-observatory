import { useEffect } from 'react'
import { Board } from './renderers/board/Board'
import { watchPosture } from './capability'

/**
 * The board is the application. Orbital is a mode within it, and everything
 * else lives in windows the board owns.
 */
export default function App() {
  useEffect(() => watchPosture(), [])
  return <Board />
}
