/**
 * Formats a salary amount as a currency string
 * @param amount - The salary amount in dollars
 * @returns Formatted string like "$45,000" or "$45K"
 */
export function formatSalary(amount: number): string {
  if (amount >= 1000000) {
    return `$${(amount / 1000000).toFixed(1)}M`;
  } else if (amount >= 1000) {
    return `$${(amount / 1000).toFixed(0)}K`;
  }
  return `$${amount.toLocaleString()}`;
}

/**
 * Formats a salary range
 * @param low - Lower bound of salary range
 * @param high - Upper bound of salary range
 * @param compact - If true, uses compact format (e.g., "$45K")
 * @returns Formatted string like "$45K - $65K"
 */
export function formatSalaryRange(
  low: number,
  high: number,
  compact: boolean = true
): string {
  const lowFormatted = compact ? compactSalary(low) : `$${low.toLocaleString()}`;
  const highFormatted = compact ? compactSalary(high) : `$${high.toLocaleString()}`;

  return `${lowFormatted} - ${highFormatted}`;
}

/**
 * Formats a score as a fraction
 * @param score - Score value between 0 and 100
 * @returns Formatted string like "85/100"
 */
export function formatScore(score: number): string {
  const rounded = Math.round(score);
  return `${rounded}/100`;
}

/**
 * Converts text to a URL-safe slug
 * @param text - The text to convert
 * @returns URL-safe slug like "my-career-path"
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}

/**
 * Returns a Tailwind color class based on a score band
 * @param score - Score value between 0 and 100
 * @returns Tailwind color class like "text-green-600"
 */
export function getScoreColor(score: number): string {
  if (score >= 80) {
    return 'text-green-600'; // Highly Defensible
  } else if (score >= 60) {
    return 'text-yellow-500'; // Evolving
  } else if (score >= 40) {
    return 'text-orange-500'; // At Risk
  } else {
    return 'text-red-600'; // High Disruption
  }
}

/**
 * Helper function to format salary in compact form
 * @param amount - Salary amount in dollars
 * @returns Compact formatted string like "$45K"
 */
function compactSalary(amount: number): string {
  if (amount >= 1000000) {
    return `$${(amount / 1000000).toFixed(1)}M`;
  } else if (amount >= 1000) {
    return `$${(amount / 1000).toFixed(0)}K`;
  }
  return `$${amount}`;
}
