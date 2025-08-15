import React, { useState } from 'react';
import { getColor } from './constants/colors';
import { isPrime } from './utils/math';
import {
  generateSquaresComposite,
  generateSquaresPrime,
} from './services/squareGenerator';

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
