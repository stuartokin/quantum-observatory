/**
 * Orbit in three dimensions.
 *
 * Rings sit in the XZ plane at a radius set by readiness, so the readiness
 * reading survives; rotation then lets you look at the system from any angle.
 * Simple perspective projection — enough for depth cues without a 3D engine.
 */

export interface Vec3 { x: number; y: number; z: number }

export interface Camera {
  yaw: number
  pitch: number
  roll: number
  /** Distance from the origin. Larger is further away. */
  dist: number
}

export const DEFAULT_CAMERA: Camera = { yaw: 0.5, pitch: 0.95, roll: 0, dist: 2.6 }

/** Ring position for a member: angle around the ring, radius from readiness. */
export function ringPosition(angle: number, radius: number, lift: number): Vec3 {
  return { x: Math.cos(angle) * radius, y: lift, z: Math.sin(angle) * radius }
}

export function rotate(p: Vec3, c: Camera): Vec3 {
  let x = p.x * Math.cos(c.yaw) - p.z * Math.sin(c.yaw)
  let z = p.x * Math.sin(c.yaw) + p.z * Math.cos(c.yaw)
  let y = p.y

  const y2 = y * Math.cos(c.pitch) - z * Math.sin(c.pitch)
  const z2 = y * Math.sin(c.pitch) + z * Math.cos(c.pitch)
  y = y2
  z = z2

  const x3 = x * Math.cos(c.roll) - y * Math.sin(c.roll)
  const y3 = x * Math.sin(c.roll) + y * Math.cos(c.roll)
  x = x3
  y = y3

  return { x, y, z }
}

export interface Projected {
  sx: number
  sy: number
  /** Perspective scale. Drives both size and depth fading. */
  scale: number
  depth: number
}

export function project(p: Vec3, c: Camera, spread = 0.34): Projected {
  const r = rotate(p, c)
  const denom = Math.max(0.35, c.dist + r.z)
  const scale = c.dist / denom
  return { sx: 0.5 + r.x * scale * spread, sy: 0.5 + r.y * scale * spread, scale, depth: r.z }
}

/** Clamp so the rings never go fully edge-on and become unreadable. */
export function clampCamera(c: Camera): Camera {
  return {
    ...c,
    pitch: Math.max(0.12, Math.min(Math.PI / 2 - 0.02, c.pitch)),
    dist: Math.max(1.3, Math.min(7, c.dist)),
  }
}
