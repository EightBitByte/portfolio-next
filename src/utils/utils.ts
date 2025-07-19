import type { JSX } from "react";

/**
 * Returns the text in a URL format.
 *
 * @example "Quick Links" -> "quick-links"
 * @param str The text to transform to a link
 */
export function toLink(str: string): string {
  return `/${str.toLowerCase().replaceAll(" ", "-")}`;
}

const wordOverride = new Map<string, string>(
  Object.entries({
    ai: "AI",
  }),
);

/**
 * Returns the text in a title case format.
 *
 * @example "Star platinum requiem" -> "Star Platinum Requiem"
 * @param str The text to transform into a title
 */
export function toTitleCase(str: string): string {
  if (!str) {
    return "";
  }
  return str
    .toLowerCase()
    .split(" ")
    .map((word) =>
      wordOverride.has(word)
        ? wordOverride.get(word)
        : word.charAt(0).toUpperCase() + word.slice(1),
    )
    .join(" ");
}

/**
 * Returns a random icon from `iconSet` based on the weights provided.
 * The higher a weight, the higher the chance of its corresponding icon being selected.
 *
 * @param iconSet The array of icons to choose from.
 * @param iconWeights The corresponding array of weights for each icon. Must be the same length as `iconSet`.
 * @returns A randomly selected JSX.Element from the `iconSet`.
 */
export function chooseIcon(
  iconSet: JSX.Element[],
  iconWeights: number[],
): JSX.Element {
  if (iconSet.length !== iconWeights.length || iconSet.length === 0) {
    throw new Error(
      "`iconSet` and `iconWeights` must be non-empty arrays of the same length.",
    );
  }

  const totalWeight = iconWeights.reduce((sum, weight) => sum + weight, 0);
  if (totalWeight <= 0)
    throw new Error("The sum of `iconWeights` must be a positive number.");

  let randomWeight = Math.random() * totalWeight;

  for (let i = 0; i < iconWeights.length; i++) {
    if (randomWeight < iconWeights[i]) {
      return iconSet[i];
    }
    randomWeight -= iconWeights[i];
  }

  // Fallback in case of floating point inaccuracies.
  return iconSet[iconSet.length - 1];
}

const monthToString: string[] = [
  "Jan.",
  "Feb.",
  "Mar.",
  "Apr.",
  "Jun.",
  "Jul.",
  "Aug.",
  "Sep.",
  "Oct.",
  "Nov.",
  "Dec.",
];

export function formatDate(date: Date): string {
  return `${monthToString[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}
