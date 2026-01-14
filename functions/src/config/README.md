# Firebase Admin Configuration

## Service Account Setup

To use Firebase Admin SDK, you need to download your service account JSON file from the Firebase Console and place it in the project root directory.

### Steps to download the service account file:

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Select your project (portfolio-danilo-novais)
3. Navigate to Project Settings (gear icon)
4. Go to the Service Accounts tab
5. Click "Generate New Private Key" 
6. Save the JSON file to your project root as `portfolio-danilo-novais-firebase-adminsdk-fbsvc-2bc940e508.json`

### Security Considerations

⚠️ **Important**: Keep the service account file secure and never commit it to version control.

Add the following line to your `.gitignore` file:

```
# Firebase service account
*.json
!package*.json
```

Or be more specific:

```
# Firebase service account
portfolio-danilo-novais-firebase-adminsdk-*.json
```

### Resolving "Maximum number of keys" Error

If you encounter the error:
`Error: You cannot add another key because the service account github-action-1108800623 already contains the max number of keys: 10.`

This means your service account has reached the maximum of 10 keys. To resolve this:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project
3. Navigate to "IAM & Admin" > "Service Accounts"
4. Find the service account `gcloud iam service-accounts keys list --iam-account=github-action-1108800623@appspot.gserviceaccount.com
gcloud iam service-accounts keys delete KEY_ID --iam-account=github-action-1108800623@appspot.gserviceaccount.comithub-action-1108800623@appspot.gserviceaccount.com`
5. Click on the service account to expand it
6. Go to the "Keys" tab
7. Remove any unnecessary or outdated keys by clicking the trash can icon
8. Keep only the keys that are actively being used

Alternatively, you can use Google Cloud CLI to remove keys:
```bash
# List all keys for the service account
gcloud iam service-accounts keys list --iam-account=github-action-1108800623@appspot.gserviceaccount.com

# Delete a specific key by key-id
gcloud iam service-accounts keys delete KEY_ID --iam-account=github-action-1108800623@appspot.gserviceaccount.com
```

### Using the Service Account

Once you've placed the service account file in your project root, the configuration in [admin-config.ts](./admin-config.ts) will load it automatically.

For production deployments, it's recommended to use environment variables instead of storing the file directly in your project.