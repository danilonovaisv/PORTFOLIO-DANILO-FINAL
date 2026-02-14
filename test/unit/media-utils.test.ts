import { getMediaAspectRatio } from '@/lib/media-utils';

describe('getMediaAspectRatio', () => {
  let originalImage: typeof Image;
  let originalCreateElement: typeof document.createElement;
  let consoleWarnSpy: jest.SpyInstance;

  beforeEach(() => {
    originalImage = global.Image;
    originalCreateElement = document.createElement.bind(document);
    consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});

    // Mock Image
    class MockImage {
      src: string = '';
      naturalWidth: number = 0;
      naturalHeight: number = 0;
      onload: (() => void) | null = null;
      onerror: (() => void) | null = null;

      constructor() {
        setTimeout(() => {
          if (this.src.includes('error')) {
            if (this.onerror) this.onerror();
          } else {
            // Determine dimensions based on src content
            if (this.src.includes('vertical')) {
              this.naturalWidth = 800;
              this.naturalHeight = 1200; // 0.66 ratio
            } else if (this.src.includes('square')) {
              this.naturalWidth = 1000;
              this.naturalHeight = 1000; // 1.0 ratio
            } else {
              // Default horizontal
              this.naturalWidth = 1200;
              this.naturalHeight = 800; // 1.5 ratio
            }
            if (this.onload) this.onload();
          }
        }, 0);
      }
    }
    global.Image = MockImage as unknown as typeof Image;

    // Mock Video via document.createElement
    jest
      .spyOn(document, 'createElement')
      .mockImplementation((tagName: string) => {
        if (tagName === 'video') {
          const mockVideo = {
            src: '',
            videoWidth: 0,
            videoHeight: 0,
            onloadedmetadata: null as (() => void) | null,
            onerror: null as (() => void) | null,
            preload: '',
          };

          // Simulate async metadata loading
          setTimeout(() => {
            if (mockVideo.src.includes('error')) {
              if (mockVideo.onerror) mockVideo.onerror();
            } else if (mockVideo.src) {
              if (mockVideo.src.includes('vertical')) {
                mockVideo.videoWidth = 800;
                mockVideo.videoHeight = 1200;
              } else if (mockVideo.src.includes('square')) {
                mockVideo.videoWidth = 1000;
                mockVideo.videoHeight = 1000;
              } else {
                // Default horizontal
                mockVideo.videoWidth = 1200;
                mockVideo.videoHeight = 800;
              }
              if (mockVideo.onloadedmetadata) mockVideo.onloadedmetadata();
            }
          }, 0);

          return mockVideo as unknown as HTMLElement;
        }
        return originalCreateElement(tagName);
      });
  });

  afterEach(() => {
    global.Image = originalImage;
    jest.restoreAllMocks();
  });

  it('does nothing if mediaUrl is empty', () => {
    const callback = jest.fn();
    getMediaAspectRatio('', callback);
    expect(callback).not.toHaveBeenCalled();
  });

  it('returns horizontal for YouTube URLs', (done) => {
    getMediaAspectRatio(
      'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      (ratio) => {
        expect(ratio).toBe('horizontal');
        done();
      }
    );
  });

  // --- Image Tests ---

  it('detects horizontal image', (done) => {
    getMediaAspectRatio('https://example.com/image-horizontal.jpg', (ratio) => {
      expect(ratio).toBe('horizontal');
      done();
    });
  });

  it('detects vertical image', (done) => {
    getMediaAspectRatio('https://example.com/image-vertical.jpg', (ratio) => {
      expect(ratio).toBe('vertical');
      done();
    });
  });

  it('detects square image', (done) => {
    getMediaAspectRatio('https://example.com/image-square.jpg', (ratio) => {
      expect(ratio).toBe('square');
      done();
    });
  });

  it('handles image load error by falling back to horizontal', (done) => {
    const url = 'https://example.com/image-error.jpg';
    getMediaAspectRatio(url, (ratio) => {
      expect(ratio).toBe('horizontal');
      expect(consoleWarnSpy).toHaveBeenCalledWith(
        expect.stringContaining(`Failed to load image for: ${url}`)
      );
      done();
    });
  });

  // --- Video Tests ---

  it('detects horizontal video', (done) => {
    getMediaAspectRatio('https://example.com/video-horizontal.mp4', (ratio) => {
      expect(ratio).toBe('horizontal');
      done();
    });
  });

  it('detects vertical video', (done) => {
    getMediaAspectRatio('https://example.com/video-vertical.mp4', (ratio) => {
      expect(ratio).toBe('vertical');
      done();
    });
  });

  it('detects square video', (done) => {
    getMediaAspectRatio('https://example.com/video-square.mp4', (ratio) => {
      expect(ratio).toBe('square');
      done();
    });
  });

  it('handles video load error by falling back to horizontal', (done) => {
    const url = 'https://example.com/video-error.mp4';
    getMediaAspectRatio(url, (ratio) => {
      expect(ratio).toBe('horizontal');
      expect(consoleWarnSpy).toHaveBeenCalledWith(
        expect.stringContaining(`Failed to load video metadata for: ${url}`)
      );
      done();
    });
  });
});
