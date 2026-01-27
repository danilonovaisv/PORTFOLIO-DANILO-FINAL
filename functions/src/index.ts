/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import { setGlobalOptions } from 'firebase-functions';
import { onRequest } from 'firebase-functions/v2/https';
import * as logger from 'firebase-functions/logger';
import next from 'next';

import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Global variables to store Next.js app and initialization state
let nextApp: any = null;
let nextAppInitialized = false;
let initPromise: Promise<void> | null = null;

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// For cost control, you can set the maximum number of containers that can be
// running at the same time. This helps mitigate the impact of unexpected
// traffic spikes by instead downgrading performance. This limit is a
// per-function limit. You can override the limit for each function using the
// `maxInstances` option in the function's options, e.g.
// `onRequest({ maxInstances: 5 }, (req, res) => { ... })`.
// NOTE: setGlobalOptions does not apply to functions using the v1 API. V1
// functions should each use functions.runWith({ maxInstances: 10 }) instead.
// In the v1 API, each function can only serve one request per container, so
// this will be the maximum concurrent request count.
setGlobalOptions({
  maxInstances: 10,
  region: 'us-central1',
  memory: '512MiB',
});

export const helloWorld = onRequest((request, response) => {
  logger.info('Hello logs!', { structuredData: true });
  response.send('Hello from Firebase!');
});

// Initialize Next.js app with proper error handling
async function initializeNextApp(): Promise<void> {
  if (nextAppInitialized) {
    return;
  }

  if (initPromise) {
    // Wait for ongoing initialization to complete
    await initPromise;
    return;
  }

  try {
    initPromise = (async () => {
      nextApp = ((next as any).default || next)({
        dev: false,
        hostname: '0.0.0.0',
        port: parseInt(process.env.PORT || '8080', 10),
        // conf: { distDir: 'next_build' }, // Removed: using next.config.js instead
        dir: resolve(__dirname, '../'),
      });

      await nextApp.prepare();
      nextAppInitialized = true;
      logger.info('Next.js app prepared successfully');
    })();

    await initPromise;
  } catch (error) {
    logger.error('Failed to initialize Next.js app:', error);
    throw error;
  }
}

// SSR Next.js Proxy
export const ssr_modern = onRequest(
  {
    region: 'us-central1',
    memory: '1GiB',
    timeoutSeconds: 60,
  },
  async (req, res) => {
    try {
      await initializeNextApp();

      if (!nextApp) {
        throw new Error('Next.js app is not initialized');
      }

      const handle = nextApp.getRequestHandler();
      return handle(req, res);
    } catch (err) {
      logger.error('SSR Error:', err);
      res.status(500).send('Internal Server Error - SSR Failed');
    }
  }
);
