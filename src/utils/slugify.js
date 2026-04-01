/**
 * Convert a product name to a URL-safe slug.
 * Deterministic: same name always produces same slug.
 * Used for DB products that don't have an explicit slug field.
 */
export function slugify(name) {
  return name
    .toLowerCase()
    .replace(/[()]/g, '')          // strip parentheses
    .replace(/[^a-z0-9]+/g, '-')  // non-alphanumeric → dash
    .replace(/^-+|-+$/g, '')       // trim leading/trailing dashes
    .replace(/-{2,}/g, '-')        // collapse multiple dashes
}
