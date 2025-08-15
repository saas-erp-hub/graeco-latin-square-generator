import { findPrimitiveRoot, findMultiplier } from '../utils/math';

/**
 * Generates a pair of Graeco-Latin squares for a prime order n using a primitive root.
 * @param n The prime order of the squares.
 * @returns An object containing two 2D arrays, `a` and `b`, representing the two orthogonal Latin squares.
 * @throws Error if no primitive root is found for the given prime.
 */
export function generateSquaresPrime(n: number): { a: number[][]; b: number[][] } {
  const k = findPrimitiveRoot(n);
  if (k === -1) throw new Error('No primitive root found for prime ' + n);

  const squareA: number[][] = [];
  const squareB: number[][] = [];

  for (let i = 0; i < n; i++) {
    const rowA: number[] = [];
    const rowB: number[] = [];
    for (let j = 0; j < n; j++) {
      rowA.push((i + j) % n);
      rowB.push((i + k * j) % n);
    }
    squareA.push(rowA);
    squareB.push(rowB);
  }
  return { a: squareA, b: squareB };
}

/**
 * Generates a pair of Graeco-Latin squares for a composite order n (excluding 2 and 6).
 * Uses the smallest k coprime to n for construction.
 * @param n The composite order of the squares.
 *
 * @returns An object containing two 2D arrays, `a` and `b`, representing the two orthogonal Latin squares.
 */
export function generateSquaresComposite(n: number): { a: number[][]; b: number[][] } {
  const k = findMultiplier(n);
  if (k === -1) {
    throw new Error(
      `Could not find a valid multiplier for composite order ${n}. This construction method is not applicable.`,
    );
  }

  const squareA: number[][] = [];
  const squareB: number[][] = [];

  for (let i = 0; i < n; i++) {
    const rowA: number[] = [];
    const rowB: number[] = [];
    for (let j = 0; j < n; j++) {
      rowA.push((i + j) % n);
      rowB.push((i + k * j) % n);
    }
    squareA.push(rowA);
    squareB.push(rowB);
  }
  return { a: squareA, b: squareB };
}
