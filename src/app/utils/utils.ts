/**
 * Returns the text in a URL format.
 * 
 * @example "Quick Links" -> "quick-links"
 * @param str The text to transform into a link
 */
export function toLink(str: string): string {
  return str.toLowerCase()
    .replaceAll(' ', '-');
}

/**
 * Returns the text in a title case format.
 * 
 * @example "Star platinum requiem" -> "Star Platinum Requiem"
 * @param str The text to transform into a title
 */
export function toTitleCase(str: string): string {
  return str.toLowerCase()
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}