import { storage } from './config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { buildAssetFilePath } from '@/lib/supabase/asset-paths';

type UploadContext = {
  key: string;
  page: string;
  subPath?: string;
  file: File;
};

export async function uploadSiteAssetFirebase({
  key,
  page,
  subPath,
  file,
}: UploadContext) {
  const extension = file.name.split('.').pop() ?? 'bin';
  const path = buildAssetFilePath({
    page,
    key,
    subPath,
    extension,
  });

  const storageRef = ref(storage, path);
  const snapshot = await uploadBytes(storageRef, file);
  const url = await getDownloadURL(snapshot.ref);

  return { url, path };
}
