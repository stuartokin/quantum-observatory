import { Component, type ErrorInfo, type ReactNode } from 'react'

/**
 * A blank page tells you nothing. This puts the actual error on screen, which
 * matters when the person debugging is on a phone with no console.
 */
export class ErrorBoundary extends Component<
  { children: ReactNode },
  { error: Error | null; info: string }
> {
  state = { error: null as Error | null, info: '' }

  static getDerivedStateFromError(error: Error) {
    return { error, info: '' }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    this.setState({ error, info: info.componentStack ?? '' })
    console.error('Horizon Q crashed:', error, info)
  }

  render() {
    const { error, info } = this.state
    if (!error) return this.props.children

    return (
      <main className="crash">
        <h2>Something broke</h2>
        <p className="label">Copy everything below and send it on.</p>
        <pre>
          {error.name}: {error.message}
          {'\n\n'}
          {error.stack?.split('\n').slice(0, 8).join('\n')}
          {info ? '\n\nComponent stack:' + info.split('\n').slice(0, 6).join('\n') : ''}
        </pre>
        <button onClick={() => location.reload()}>Reload</button>
      </main>
    )
  }
}
