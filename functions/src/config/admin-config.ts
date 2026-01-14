import * as admin from 'firebase-admin';
import * as fs from 'fs';
import { ServiceAccount } from 'firebase-admin';

// Check if the app is already initialized
if (admin.apps.length === 0) {
  const serviceAccount: ServiceAccount = JSON.parse(
    fs.readFileSync('/Users/danilonovais/.ssh/portfolio-danilo-novais-firebase-adminsdk-fbsvc-2bc940e508.json', 'utf8')
  );

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://portfolio-danilo-novais-default-rtdb.firebaseio.com"
  });
}

export { admin };