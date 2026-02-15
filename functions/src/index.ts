import { setGlobalOptions } from 'firebase-functions';
import { onRequest } from 'firebase-functions/v2/https';
import * as logger from 'firebase-functions/logger';

/**
 * GHOST SYSTEM - Cloud Functions API
 * Regra: O SSR é gerenciado nativamente pelo Firebase Hosting Frameworks na raiz.
 * Esta codebase (modern_ssr) deve conter apenas funções de backend puro (triggers, hooks, etc).
 */

setGlobalOptions({
  maxInstances: 10,
  region: 'us-west1', // Sincronizado com o Hosting em firebase.json
  memory: '256MiB',  // Configuração eficiente para funções leves
});

export const heartbeat = onRequest((request, response) => {
  logger.info('Ghost API Heartbeat', { structuredData: true });
  response.send('Ghost System API: Online');
});

// Outras funções de backend podem ser adicionadas aqui.
