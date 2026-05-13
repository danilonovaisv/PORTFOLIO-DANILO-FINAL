import { getAssetUrl } from '../src/lib/utils';
console.log('Ghost Model URL:', getAssetUrl('site-assets/3d/ghost-v1.glb'));
console.log('About Video URL:', getAssetUrl('site-assets/about/hero/about.hero_video.desktop.mp4', { isVideo: true }));
