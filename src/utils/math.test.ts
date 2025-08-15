import { gcd, isPrime, modularExp, findPrimitiveRoot, findMultiplier } from './math';

describe('Math Utilities', () => {
  describe('gcd', () => {
    test('should return the correct greatest common divisor for positive integers', () => {
      expect(gcd(48, 18)).toBe(6);
      expect(gcd(101, 103)).toBe(1);
      expect(gcd(10, 5)).toBe(5);
      expect(gcd(7, 9)).toBe(1);
    });

    test('should handle zero correctly', () => {
      expect(gcd(10, 0)).toBe(10);
      expect(gcd(0, 5)).toBe(5);
      expect(gcd(0, 0)).toBe(0);
    });
  });

  describe('isPrime', () => {
    test('should correctly identify prime numbers', () => {
      expect(isPrime(2)).toBe(true);
      expect(isPrime(3)).toBe(true);
      expect(isPrime(5)).toBe(true);
      expect(isPrime(7)).toBe(true);
      expect(isPrime(11)).toBe(true);
      expect(isPrime(97)).toBe(true);
    });

    test('should correctly identify non-prime numbers', () => {
      expect(isPrime(1)).toBe(false);
      expect(isPrime(4)).toBe(false);
      expect(isPrime(6)).toBe(false);
      expect(isPrime(9)).toBe(false);
      expect(isPrime(100)).toBe(false);
    });

    test('should handle numbers less than 2', () => {
      expect(isPrime(0)).toBe(false);
      expect(isPrime(-1)).toBe(false);
      expect(isPrime(-10)).toBe(false);
    });
  });

  describe('modularExp', () => {
    test('should compute modular exponentiation correctly', () => {
      expect(modularExp(4, 13, 497)).toBe(445);
      expect(modularExp(5, 3, 13)).toBe(8);
      expect(modularExp(2, 10, 1024)).toBe(0);
    });
  });

  describe('findPrimitiveRoot', () => {
    test('should find the smallest primitive root for a prime number', () => {
      expect(findPrimitiveRoot(3)).toBe(2);
      expect(findPrimitiveRoot(5)).toBe(2);
      expect(findPrimitiveRoot(7)).toBe(3);
    });

    test('should return -1 for non-prime numbers', () => {
      expect(findPrimitiveRoot(4)).toBe(-1);
      expect(findPrimitiveRoot(6)).toBe(-1);
      expect(findPrimitiveRoot(9)).toBe(-1);
    });
  });

  describe('findMultiplier', () => {
    test('should find a valid multiplier for a given number', () => {
      // For n=9, k=2 is valid because gcd(2,9)=1 and gcd(1,9)=1
      expect(findMultiplier(9)).toBe(2);
      // For n=15, k=2 fails (gcd(1,15)=1), k=3 fails (gcd(3,15)=3), k=4 fails (gcd(3,15)=3)
      // k=7 fails (gcd(6,15)=3), k=8 fails (gcd(7,15)=1, gcd(7-1,15)=gcd(6,15)=3)
      // Let's check for a number where it should work. For n=7 (prime), k=2 is the smallest valid multiplier.
      expect(findMultiplier(7)).toBe(2);
    });

    test('should return -1 when no valid multiplier exists', () => {
      expect(findMultiplier(4)).toBe(-1);
      expect(findMultiplier(6)).toBe(-1);
      expect(findMultiplier(10)).toBe(-1);
    });
  });
});
