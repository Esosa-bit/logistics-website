// Joins class names and skips empty values.
// cn('a', false && 'b', 'c') -> 'a c'
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}
