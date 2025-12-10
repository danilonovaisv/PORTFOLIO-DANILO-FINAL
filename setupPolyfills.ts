import ResizeObserver from 'resize-observer-polyfill';

if (typeof window !== 'undefined') {
  if (!window.ResizeObserver) {
    window.ResizeObserver = ResizeObserver;
  }
}
