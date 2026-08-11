declare const __BUILD_TIME__: string

/** When this build was made. Injected by Vite; see vite.config.ts. */
export const BUILD_TIME: string =
  typeof __BUILD_TIME__ === 'string' ? __BUILD_TIME__ : new Date().toISOString()

export function formatBuildTime(iso: string = BUILD_TIME): string {
  const d = new Date(iso)
  if (isNaN(d.getTime())) return 'unknown'
  return d.toLocaleString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short',
  })
}
