/**
 * Exponential backoff retry utility.
 *
 * Retries the given async function up to maxRetries times with exponential backoff.
 * Delay doubles on each retry: baseDelay, baseDelay*2, baseDelay*4, ...
 *
 * @param {Function} fn - Async function to retry
 * @param {object} [options]
 * @param {number} [options.maxRetries=3] - Maximum number of retry attempts
 * @param {number} [options.baseDelay=1000] - Base delay in ms before first retry
 * @param {Function} [options.onRetry] - Optional callback on each retry (receives error, attempt number)
 * @returns {Promise<*>} Result of the function call
 * @throws {Error} The last error if all retries are exhausted
 */
export async function retryWithBackoff(fn, options = {}) {
  const { maxRetries = 3, baseDelay = 1000, onRetry } = options;

  let lastError;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;

      if (attempt >= maxRetries) {
        break;
      }

      const delay = baseDelay * Math.pow(2, attempt);

      if (onRetry) {
        onRetry(error, attempt + 1, delay);
      }

      await sleep(delay);
    }
  }

  throw lastError;
}

/**
 * Sleep for a given number of milliseconds.
 * @param {number} ms
 * @returns {Promise<void>}
 */
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
