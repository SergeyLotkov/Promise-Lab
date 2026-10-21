import { sleep } from "./sleep";

export async function retry<T>(
  fn: () => Promise<T>,
  retries: number,
  delay: number
  ): Promise<T> {
  let lastError: unknown;

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;

    if (attempt === retries) {
      throw lastError;
    }

    const currentDelay = delay * Math.pow(2, attempt - 1); // Exponential backoff
    await sleep(currentDelay);
    }
  }
  throw lastError;
} 