import React, { useState } from 'react';

const colorPalette = [
  // Primary colors
  '#ef4444',
  '#f97316',
  '#f59e0b',
  '#eab308',
  '#84cc16',
  '#22c55e',
  '#14b8a6',
  '#0ea5e9',
  '#3b82f6',
  '#6366f1',
  '#8b5cf6',
  '#ec4899',
  '#f43f5e',

  // Secondary colors
  '#f87171',
  '#fb923c',
  '#fbbf24',
  '#facc15',
  '#a3e635',
  '#4ade80',
  '#2dd4bf',
  '#38bdf8',
  '#60a5fa',
  '#818cf8',
  '#a78bfa',
  '#f472b6',
  '#f0abfc',

  // Tertiary colors
  '#fca5a5',
  '#f9a825',
  '#f59e0b',
  '#eab308',
  '#84cc16',
  '#10b981',
  '#0d9488',
  '#0ea5e9',
  '#3b82f6',
  '#6366f1',
  '#8b5cf6',
  '#ec4899',
  '#d946ef',

  // Additional distinct colors
  '#06b6d4',
  '#2563eb',
  '#4338ca',
  '#6b219c',
  '#9333ea',
  '#c026d3',
  '#e11d98',
  '#f43f7c',
  '#ea580c',
  '#be185d',
  '#86198f',
  '#7e22ce',
  '#581c87',
  '#1e40af',
  '#0369a1',
  '#075985',
  '#0c4a6e',
  '#083344',
  '#0f172a',
  '#1e293b',
  '#334155',
  '#475569',
  '#64748b',
  '#94a3b8',
  '#cbd5e1',
  '#e2e8f0',
  '#f1f5f9',
];

/**
 * Returns a color from the color palette based on the given value.
 * The color is determined by the value modulo the length of the color palette.
 * @param value The number to use for color selection.
 * @returns A hex color string.
 */
function getColor(value: number): string {
  return colorPalette[value % colorPalette.length];
}

/**
 * Computes the greatest common divisor (GCD) of two numbers using the Euclidean algorithm.
 * @param a The first number.
 * @param b The second number.
 * @returns The greatest common divisor of a and b.
 */
function gcd(a: number, b: number): number {
  while (b !== 0) {
    const t = b;
    b = a % b;
    a = t;
  }
  return a;
}

/**
 * Checks if a given number is a prime number.
 * Implements an optimized primality test.
 * @param n The number to check.
 * @returns True if the number is prime, false otherwise.
 */
function isPrime(n: number): boolean {
  if (n <= 1) return false;
  if (n <= 3) return true;
  if (n % 2 === 0 || n % 3 === 0) return false;
  for (let i = 5; i * i <= n; i += 6) {
    if (n % i === 0 || n % (i + 2) === 0) return false;
  }
  return true;
}

/**
 * Finds a primitive root modulo a prime number p.
 * @param p The prime number.
 * @returns The smallest primitive root modulo p, or -1 if p is not prime or no primitive root is found.
 */
function findPrimitiveRoot(p: number): number {
  if (!isPrime(p)) return -1;
  const phi = p - 1;
  // Find prime factors of phi
  const primeFactors = new Set<number>();
  let x = phi;
  for (let i = 2; i * i <= x; i++) {
    while (x % i === 0) {
      primeFactors.add(i);
      x /= i;
    }
  }
  if (x > 1) primeFactors.add(x);

  for (let r = 2; r <= p; r++) {
    let flag = true;
    for (const factor of primeFactors) {
      if (modularExp(r, phi / factor, p) === 1) {
        flag = false;
        break;
      }
    }
    if (flag) return r;
  }
  return -1;
}

/**
 * Computes (base^exp) % mod using modular exponentiation.
 * @param base The base number.
 * @param exp The exponent.
 * @param mod The modulus.
 * @returns The result of (base^exp) % mod.
 */
function modularExp(base: number, exp: number, mod: number): number {
  let result = 1;
  base = base % mod;
  while (exp > 0) {
    if (exp % 2 === 1) result = (result * base) % mod;
    base = (base * base) % mod;
    exp = Math.floor(exp / 2);
  }
  return result;
}

/**
 * Generates a pair of Graeco-Latin squares for a prime order n using a primitive root.
 * @param n The prime order of the squares.
 * @returns An object containing two 2D arrays, `a` and `b`, representing the two orthogonal Latin squares.
 * @throws Error if no primitive root is found for the given prime.
 */
function generateSquaresPrime(n: number): { a: number[][]; b: number[][] } {
  const k = findPrimitiveRoot(n);
  if (k === -1) throw new Error('No primitive root found for prime ' + n);

  const squareA: number[][] = [];
  const squareB: number[][] = [];

  for (let i = 0; i < n; i++) {
    const rowA: number[] = [];
    const rowB: number[] = [];
    for (let j = 0; j < n; j++) {
      rowA.push((i + j) % n);
      rowB.push((i + modularExp(k, j, n)) % n);
    }
    squareA.push(rowA);
    squareB.push(rowB);
  }
  return { a: squareA, b: squareB };
}

/**
 * Finds the smallest integer k (k >= 2) that is coprime to n.
 * Used for generating Graeco-Latin squares for composite orders.
 * @param n The number to find a coprime for.
 * @returns The smallest coprime integer k, or 1 if no such k is found (should not happen for n > 1).
 */
function findCoprime(n: number): number {
  for (let k = 2; k < n; k++) {
    if (gcd(k, n) === 1) return k;
  }
  return 1;
}

/**
 * Generates a pair of Graeco-Latin squares for a composite order n (excluding 2 and 6).
 * Uses the smallest k coprime to n for construction.
 * @param n The composite order of the squares.
 * @returns An object containing two 2D arrays, `a` and `b`, representing the two orthogonal Latin squares.
 */
function generateSquaresComposite(n: number): { a: number[][]; b: number[][] } {
  const k = findCoprime(n);
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
 * GraecoLatinSquare React Component.
 * This component provides a user interface to generate and visualize Graeco-Latin Squares.
 * It handles user input for the order (n), generates the squares based on whether n is prime or composite,
 * and displays the result with an interactive color visualization.
 */
const GraecoLatinSquare: React.FC = () => {
  const [order, setOrder] = useState<string>('');
  const [inputValue, setInputValue] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [squares, setSquares] = useState<{ a: number[][]; b: number[][] } | null>(null);
  const [showNumbers, setShowNumbers] = useState<boolean>(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSquares(null);

    const n = parseInt(inputValue);
    if (isNaN(n) || n < 1) {
      setError('Please enter a valid positive integer.');
      return;
    }

    if (n === 2 || n === 6) {
      setError(`No Graeco-Latin square exists for order ${n}.`);
      return;
    }

    try {
      let result: { a: number[][]; b: number[][] };
      if (isPrime(n)) {
        result = generateSquaresPrime(n);
      } else {
        result = generateSquaresComposite(n);
      }
      setSquares(result);
      setOrder(String(n)); // Update order state only on successful generation
    } catch (err) {
      setError('Failed to generate Graeco-Latin square: ' + (err instanceof Error ? err.message : String(err)));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Graeco-Latin Square Generator</h1>

        <form onSubmit={handleSubmit} className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-grow">
              <label htmlFor="order" className="block text-sm font-medium text-gray-700 mb-1">
                Order (n)
              </label>
              <input
                type="number"
                id="order"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter order (excluding 2 and 6)"
                min="1"
              />
            </div>
            <div className="flex items-end">
              <button
                type="submit"
                className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Generate
              </button>
            </div>
          </div>
          <div className="flex items-center mt-4">
            <input
              type="checkbox"
              id="showNumbers"
              checked={showNumbers}
              onChange={(e) => setShowNumbers(e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="showNumbers" className="ml-2 block text-sm text-gray-900">
              Show Numbers
            </label>
          </div>
        </form>

        {error && (
          <div className="mb-8 p-4 bg-red-50 text-red-700 rounded-md">
            <p>{error}</p>
          </div>
        )}

        {squares && (
          <div className="overflow-auto max-h-[70vh] border border-gray-200 rounded">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Result (Order {order})</h2>
            <div
              className="w-full"
              style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${parseInt(order)}, minmax(0, 1fr))`,
                gap: 0,
                maxWidth: '100vw',
              }}
            >
              {squares.a.flatMap((row, i) =>
                row.map((cellA, j) => {
                  const cellB = squares.b[i][j];
                  const outerColor = getColor(cellB);
                  const innerColor = getColor(cellA);

                  return (
                    <div
                      key={`${i}-${j}`}
                      className="relative border border-black shadow-sm"
                      style={{
                        backgroundColor: outerColor,
                        aspectRatio: '1 / 1',
                        boxShadow: '0 0 1px rgba(0,0,0,0.1)',
                        userSelect: 'none',
                      }}
                      title={`A: ${cellA}, B: ${cellB}`}
                    >
                      {/* Inner smaller rectangle */}
                      <div
                        className="absolute border border-black shadow-sm"
                        style={{
                          backgroundColor: innerColor,
                          width: '60%',
                          height: '60%',
                          top: '20%',
                          left: '20%',
                          boxShadow: '0 0 1px rgba(0,0,0,0.1)',
                        }}
                      />

                      {/* Numbers */}
                      {showNumbers && (
                        <span
                          className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none"
                          style={{
                            color: '#000000',
                            fontSize: '12px',
                            fontWeight: 'bold',
                            lineHeight: 1,
                            userSelect: 'none',
                          }}
                        >
                          <span>{cellA}</span>
                          <span>{cellB}</span>
                        </span>
                      )}
                    </div>
                  );
                }),
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GraecoLatinSquare;
