import { parentPort, workerData } from 'worker_threads';

// Extract the start and end indexes for this chunk from workerData
const { start, end } = workerData;

let counter = 0;

// Loop from start to end, doing the work assigned to this chunk
for (let i = start; i < end; i++) {
  counter++;
}

// Send the result (counter) back to the main thread
parentPort?.postMessage(counter);
