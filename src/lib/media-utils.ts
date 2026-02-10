import { isVideo } from './utils';

export type MediaAspectRatio = 'horizontal' | 'vertical' | 'square';

/**
 * Detects the aspect ratio of a given media URL.
 * Works for both images and videos.
 */
export function getMediaAspectRatio(
    mediaUrl: string,
    callback: (ratio: MediaAspectRatio) => void
): void {
    if (!mediaUrl) return;

    if (isVideo(mediaUrl)) {
        const video = document.createElement('video');
        video.src = mediaUrl;
        video.preload = 'metadata';

        video.onloadedmetadata = () => {
            const ratio = video.videoWidth / video.videoHeight;
            callback(getRatioType(ratio));
        };

        video.onerror = () => {
            // Fallback for video errors
            console.warn(`[media-utils] Failed to load video metadata for: ${mediaUrl}`);
            callback('horizontal');
        };
    } else {
        const img = new Image();
        img.src = mediaUrl;

        img.onload = () => {
            const ratio = img.naturalWidth / img.naturalHeight;
            callback(getRatioType(ratio));
        };

        img.onerror = () => {
            console.warn(`[media-utils] Failed to load image for: ${mediaUrl}`);
            callback('horizontal');
        };
    }
}

function getRatioType(ratio: number): MediaAspectRatio {
    if (ratio > 1.1) return 'horizontal'; // Landscape
    if (ratio < 0.9) return 'vertical';   // Portrait
    return 'square';                       // Square
}
