import { Worker } from 'worker_threads';

export const getErrorMessage = (error: unknown): string => {
  return error instanceof Error ? error.message : String(error);
};

export function runWorker<T = unknown> (filename: string, workerData?: unknown): Promise<T> {
  return new Promise((resolve, reject) => {
    const worker = new Worker(filename, { workerData });

    worker.once('message', (data) => resolve(data));
    worker.once('error', reject);
    worker.once('exit', (code) => {
      if (code !== 0) {
        reject(new Error(`Worker stopped with exit code ${code}`));
      }
    });
  });
}
