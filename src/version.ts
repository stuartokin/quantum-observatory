import pkg from '../package.json'

/**
 * Single source of truth. Bumped in package.json, surfaced on the page, so a
 * glance at the site tells you which build is actually deployed rather than
 * inferring it from visual cues.
 */
export const VERSION = pkg.version as string
