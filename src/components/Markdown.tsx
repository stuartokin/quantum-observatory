import { useMemo, type ReactNode } from 'react'

/**
 * A small markdown renderer, for showing the project's own documents.
 *
 * Deliberately not a library. These files are written by us, so the subset that
 * appears in them is known: headings, paragraphs, lists, tables, links, bold,
 * inline code, block quotes and rules. Adding a parser for the rest would cost
 * more bundle than the documents themselves.
 *
 * The point is that the documents render *from source*. A copy maintained
 * beside the original disagrees with it within a month, and the version a
 * reader sees would be the one nobody was updating.
 */

function inline(text: string): ReactNode[] {
  const out: ReactNode[] = []
  // links, bold, then inline code — in that order so a link inside bold works
  const pattern = /(\[([^\]]+)\]\(([^)]+)\))|(\*\*([^*]+)\*\*)|(`([^`]+)`)/g
  let last = 0
  let m: RegExpExecArray | null
  let key = 0

  while ((m = pattern.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index))
    if (m[1]) {
      out.push(
        <a key={key++} href={m[3]} target="_blank" rel="noopener noreferrer">
          {m[2]}
        </a>,
      )
    } else if (m[4]) {
      out.push(<strong key={key++}>{m[5]}</strong>)
    } else if (m[6]) {
      out.push(<code key={key++}>{m[7]}</code>)
    }
    last = m.index + m[0].length
  }
  if (last < text.length) out.push(text.slice(last))
  return out
}

type Block =
  | { kind: 'h'; level: number; text: string }
  | { kind: 'p'; text: string }
  | { kind: 'ul'; items: string[] }
  | { kind: 'ol'; items: string[] }
  | { kind: 'quote'; text: string }
  | { kind: 'table'; head: string[]; rows: string[][] }
  | { kind: 'code'; text: string }
  | { kind: 'hr' }

function parse(src: string): Block[] {
  const lines = src.split('\n')
  const blocks: Block[] = []
  let i = 0

  const cells = (row: string) =>
    row
      .replace(/^\||\|$/g, '')
      .split('|')
      .map((c) => c.trim())

  while (i < lines.length) {
    const line = lines[i]

    if (!line.trim()) {
      i++
      continue
    }

    if (/^```/.test(line)) {
      const body: string[] = []
      i++
      while (i < lines.length && !/^```/.test(lines[i])) body.push(lines[i++])
      i++
      blocks.push({ kind: 'code', text: body.join('\n') })
      continue
    }

    if (/^(-{3,}|_{3,})\s*$/.test(line)) {
      blocks.push({ kind: 'hr' })
      i++
      continue
    }

    const h = line.match(/^(#{1,6})\s+(.*)$/)
    if (h) {
      blocks.push({ kind: 'h', level: h[1].length, text: h[2] })
      i++
      continue
    }

    if (/^\|/.test(line) && /^\|?[\s:-]+\|/.test(lines[i + 1] ?? '')) {
      const head = cells(line)
      i += 2
      const rows: string[][] = []
      while (i < lines.length && /^\|/.test(lines[i])) rows.push(cells(lines[i++]))
      blocks.push({ kind: 'table', head, rows })
      continue
    }

    if (/^>\s?/.test(line)) {
      const body: string[] = []
      while (i < lines.length && /^>\s?/.test(lines[i])) body.push(lines[i++].replace(/^>\s?/, ''))
      blocks.push({ kind: 'quote', text: body.join(' ') })
      continue
    }

    if (/^\s*[-*]\s+/.test(line)) {
      const items: string[] = []
      while (i < lines.length && /^\s*[-*]\s+/.test(lines[i])) {
        items.push(lines[i++].replace(/^\s*[-*]\s+/, ''))
        // continuation lines belong to the item above
        while (i < lines.length && /^\s{2,}\S/.test(lines[i]) && !/^\s*[-*]\s/.test(lines[i])) {
          items[items.length - 1] += ' ' + lines[i++].trim()
        }
      }
      blocks.push({ kind: 'ul', items })
      continue
    }

    if (/^\s*\d+\.\s+/.test(line)) {
      const items: string[] = []
      while (i < lines.length && /^\s*\d+\.\s+/.test(lines[i])) {
        items.push(lines[i++].replace(/^\s*\d+\.\s+/, ''))
        while (i < lines.length && /^\s{2,}\S/.test(lines[i]) && !/^\s*\d+\.\s/.test(lines[i])) {
          items[items.length - 1] += ' ' + lines[i++].trim()
        }
      }
      blocks.push({ kind: 'ol', items })
      continue
    }

    const para: string[] = []
    while (
      i < lines.length &&
      lines[i].trim() &&
      !/^(#{1,6}\s|>|\||```|\s*[-*]\s|\s*\d+\.\s|-{3,})/.test(lines[i])
    ) {
      para.push(lines[i++].trim())
    }
    if (para.length) blocks.push({ kind: 'p', text: para.join(' ') })
  }

  return blocks
}

export function Markdown({ source, skipTitle = true }: { source: string; skipTitle?: boolean }) {
  const blocks = useMemo(() => {
    const parsed = parse(source)
    // The document's own H1 duplicates the section heading it sits under.
    return skipTitle && parsed[0]?.kind === 'h' && parsed[0].level === 1
      ? parsed.slice(1)
      : parsed
  }, [source, skipTitle])

  return (
    <div className="md">
      {blocks.map((b, i) => {
        switch (b.kind) {
          case 'h':
            return b.level <= 2 ? (
              <h4 key={i}>{inline(b.text)}</h4>
            ) : (
              <h5 key={i}>{inline(b.text)}</h5>
            )
          case 'p':
            return <p key={i}>{inline(b.text)}</p>
          case 'ul':
            return (
              <ul key={i}>
                {b.items.map((it, j) => (
                  <li key={j}>{inline(it)}</li>
                ))}
              </ul>
            )
          case 'ol':
            return (
              <ol key={i}>
                {b.items.map((it, j) => (
                  <li key={j}>{inline(it)}</li>
                ))}
              </ol>
            )
          case 'quote':
            return <blockquote key={i}>{inline(b.text)}</blockquote>
          case 'code':
            return (
              <pre key={i}>
                <code>{b.text}</code>
              </pre>
            )
          case 'hr':
            return <hr key={i} />
          case 'table':
            return (
              <table key={i}>
                <thead>
                  <tr>
                    {b.head.map((c, j) => (
                      <th key={j}>{inline(c)}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {b.rows.map((r, j) => (
                    <tr key={j}>
                      {r.map((c, k) => (
                        <td key={k}>{inline(c)}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            )
        }
      })}
    </div>
  )
}
