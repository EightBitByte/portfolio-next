/**
 * Returns the text in a URL format.
 * 
 * @example "Quick Links" -> "quick-links"
 * @param str The text to transform to a link
 */
export function toLink(str: string): string {
    return str.toLowerCase()
              .replace(' ', '-');
}