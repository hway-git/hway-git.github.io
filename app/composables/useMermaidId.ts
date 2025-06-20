export function useStableMermaidId(code: string, prefix = 'mermaid'): string {
  let hash = 0
  for (let i = 0; i < code.length; i++) {
    const chr = code.charCodeAt(i)
    hash = ((hash << 5) - hash) + chr
    hash |= 0 // Convert to 32bit integer
  }
  return `${prefix}-${Math.abs(hash)}`
}
