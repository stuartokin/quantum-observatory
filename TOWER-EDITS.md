# tower.ts — three edits for the applications lane

`applications` was in the agent prompts but never in the board's lane list, so an
item there would have rendered in the wrong place. Three small blocks.

## 1. The list

```ts
export const CONSTELLATIONS = [
  'architectures',
  'error-correction',
  'algorithms',
  'enabling',
  'applications',
  'pqc',
  'migration',
  'communications',
  'sensing',
] as const
```

## 2. The labels

```ts
export const CONSTELLATION_LABEL: Record<string, string> = {
  architectures: 'Architectures',
  'error-correction': 'Error correction',
  algorithms: 'Algorithms',
  enabling: 'Enabling stack',
  applications: 'Applications',
  pqc: 'PQC algorithms',
  migration: 'Migration',
  communications: 'Communications',
  sensing: 'Sensing',
}
```

## 3. The positions — replace the whole block

Nine lanes across the same width, so everything shifts slightly.

```ts
/** Where each constellation sits. Organic positions, not a rigid grid — a
 *  spreadsheet of columns is what made the first version read as a chart. */
export const CONSTELLATION_HOME: Record<string, number> = {
  architectures: 0.085,
  'error-correction': 0.205,
  algorithms: 0.325,
  enabling: 0.44,
  applications: 0.55,
  pqc: 0.66,
  migration: 0.765,
  communications: 0.875,
  sensing: 0.965,
}
```

`applications` sits between the technology constellations and the deployment
ones, which is roughly where it belongs conceptually — what the technology is
for, between what it is and how it gets adopted.
