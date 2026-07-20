/**
 * Clamps a numeric value between an optional minimum and maximum bound.
 * @param value - The value to clamp.
 * @param min - The lower bound (inclusive). Defaults to `-Infinity`.
 * @param max - The upper bound (inclusive). Defaults to `Infinity`.
 * @returns `value` if it lies within `[min, max]`, otherwise the nearest bound.
 * @example
 * ```ts
 * clamp(5, 0, 10); // 5
 * clamp(-3, 0, 10); // 0
 * clamp(15, 0, 10); // 10
 * clamp(5); // 5 (no bounds)
 * ```
 */
export function clamp(value: number, min = -Infinity, max = Infinity): number {
  return Math.min(Math.max(value, min), max);
}
