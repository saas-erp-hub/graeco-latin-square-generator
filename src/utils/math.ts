/**
 * Computes the greatest common divisor (GCD) of two numbers using the Euclidean algorithm.
 * @param a The first number.
 * @param b The second number.
 * @returns The greatest common divisor of a and b.
 */
export function gcd(a: number, b: number): number {
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
export function isPrime(n: number): boolean {
  if (n <= 1) return false;
  if (n <= 3) return true;
  if (n % 2 === 0 || n % 3 === 0) return false;
  for (let i = 5; i * i <= n; i += 6) {
    if (n % i === 0 || n % (i + 2) === 0) return false;
  }
  return true;
}

/**
 * Computes (base^exp) % mod using modular exponentiation.
 * @param base The base number.
 * @param exp The exponent.
 * @param mod The modulus.
 * @returns The result of (base^exp) % mod.
 */
export function modularExp(base: number, exp: number, mod: number): number {
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
 * Finds a primitive root modulo a prime number p.
 * @param p The prime number.
 * @returns The smallest primitive root modulo p, or -1 if p is not prime or no primitive root is found.
 */
export function findPrimitiveRoot(p: number): number {
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
 * Finds a suitable multiplier k for constructing orthogonal Latin squares for a given order n.
 * A valid k must satisfy gcd(k, n) = 1 and gcd(k - 1, n) = 1.
 * @param n The order of the square.
 * @returns A valid multiplier k, or -1 if none is found.
 */
export function findMultiplier(n: number): number {
  for (let k = 2; k < n; k++) {
    if (gcd(k, n) === 1 && gcd(k - 1, n) === 1) {
      return k;
    }
  }
  return -1; // Indicates no suitable multiplier was found
}
