import { generateSquaresPrime, generateSquaresComposite } from './squareGenerator';

// Helper function to check if a square is a Latin square
const isLatinSquare = (square: number[][]): boolean => {
  const n = square.length;
  for (let i = 0; i < n; i++) {
    const rowSet = new Set(square[i]);
    if (rowSet.size !== n) return false;

    const colSet = new Set();
    for (let j = 0; j < n; j++) {
      colSet.add(square[j][i]);
    }
    if (colSet.size !== n) return false;
  }
  return true;
};

// Helper function to check if two squares are orthogonal
const areOrthogonal = (a: number[][], b: number[][]): boolean => {
  const n = a.length;
  const pairs = new Set<string>();
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      pairs.add(`${a[i][j]},${b[i][j]}`);
    }
  }
  return pairs.size === n * n;
};

describe('Square Generation', () => {
  describe('generateSquaresPrime', () => {
    test('should generate valid and orthogonal Latin squares for prime order 3', () => {
      const { a, b } = generateSquaresPrime(3);
      expect(isLatinSquare(a)).toBe(true);
      expect(isLatinSquare(b)).toBe(true);
      expect(areOrthogonal(a, b)).toBe(true);
    });

    test('should generate valid and orthogonal Latin squares for prime order 5', () => {
      const { a, b } = generateSquaresPrime(5);
      expect(isLatinSquare(a)).toBe(true);
      expect(isLatinSquare(b)).toBe(true);
      expect(areOrthogonal(a, b)).toBe(true);
    });

    test('should throw an error for non-prime numbers', () => {
      expect(() => generateSquaresPrime(4)).toThrow();
    });
  });

  describe('generateSquaresComposite', () => {
    test('should throw an error for composite order 4, as the simple construction method is not applicable', () => {
      expect(() => generateSquaresComposite(4)).toThrow(
        'Could not find a valid multiplier for composite order 4. This construction method is not applicable.',
      );
    });

    test('should generate valid and orthogonal Latin squares for composite order 9', () => {
      const { a, b } = generateSquaresComposite(9);
      expect(isLatinSquare(a)).toBe(true);
      expect(isLatinSquare(b)).toBe(true);
      expect(areOrthogonal(a, b)).toBe(true);
    });
  });
});
