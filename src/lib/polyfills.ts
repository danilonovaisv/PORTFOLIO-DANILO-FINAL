// Ensures Node/SSR runtime has browser-like globals some deps expect.
// Safe to import anywhere (idempotent).
if (typeof globalThis !== 'undefined') {
  // ProgressEvent is not defined in Node, but some loaders (e.g. @monogrid/gainmap-js)
  // instantiate it during SSR. Provide a minimal polyfill.
  if (typeof (globalThis as any).ProgressEvent === 'undefined') {
    class NodeProgressEvent extends Event {
      lengthComputable: boolean;
      loaded: number;
      total: number;
      constructor(type: string, eventInitDict?: ProgressEventInit) {
        super(type);
        this.lengthComputable = !!eventInitDict?.lengthComputable;
        this.loaded = eventInitDict?.loaded ?? 0;
        this.total = eventInitDict?.total ?? 0;
      }
    }

    (globalThis as any).ProgressEvent = NodeProgressEvent;
  }
}
