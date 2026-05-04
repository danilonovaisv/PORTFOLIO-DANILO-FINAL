/**
 * Verification script for asset URL logic.
 * This script reproduces the core logic of getAssetUrl and buildSupabaseStorageUrl
 * to verify that .glb files are correctly handled.
 */

const IMAGE_EXTENSIONS = ['.png', '.jpg', '.jpeg', '.webp', '.avif'];
const NON_TRANSFORM_EXTENSIONS = [
  '.svg',
  '.mp4',
  '.webm',
  '.mov',
  '.m4v',
  '.gif',
  '.glb',
  '.gltf',
];

function is3DModel(path) {
  if (!path) return false;
  const modelExtensions = ['.glb', '.gltf'];
  const cleanPath = path.split('?')[0].split('#')[0].toLowerCase();
  return modelExtensions.some((ext) => cleanPath.endsWith(ext));
}

function isVideo(path) {
  if (!path) return false;
  const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov', '.m4v'];
  const cleanPath = path.split('?')[0].split('#')[0].toLowerCase();
  return videoExtensions.some((ext) => cleanPath.endsWith(ext));
}

function buildSupabaseStorageUrl(bucket, filePath, options) {
  const normalizedPath = filePath.toLowerCase();
  const isNonTransformable = /\.(mp4|webm|mov|m4v|ogg|glb|gltf)$/i.test(
    normalizedPath
  );

  const endpoint =
    !isNonTransformable && options
      ? '/storage/v1/render/image/public/'
      : '/storage/v1/object/public/';

  let url = `https://project.supabase.co${endpoint}${bucket}/${filePath}`;

  if (!isNonTransformable && options) {
    url += `?width=${options.width}&quality=${options.quality}&format=${options.format}`;
  }

  return url;
}

// Test cases
const tests = [
  { path: '3d/ghost-v1.glb', expectedEndpoint: '/object/public/' },
  { path: 'images/hero.jpg', expectedEndpoint: '/render/image/public/' },
  { path: 'videos/intro.mp4', expectedEndpoint: '/object/public/' },
];

console.log('--- Verification Results ---');
let allPassed = true;

tests.forEach(({ path, expectedEndpoint }) => {
  const isModel = is3DModel(path);
  const isVid = isVideo(path);

  const url = buildSupabaseStorageUrl('site-assets', path, {
    width: 800,
    quality: 85,
    format: 'webp',
  });

  const passed = url.includes(expectedEndpoint);
  console.log(`${passed ? '✅' : '❌'} Path: ${path}`);
  console.log(`   Generated URL: ${url}`);
  if (!passed) allPassed = false;
});

if (allPassed) {
  console.log('\n✨ All logic verification tests PASSED!');
} else {
  console.log('\n🛑 Some tests FAILED!');
  process.exit(1);
}
