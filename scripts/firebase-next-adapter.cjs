const fs = require('node:fs/promises');
const path = require('node:path');

module.exports = async function firebaseNextAdapter() {
  return {
    name: 'firebase-next-adapter',
    async adapt(context) {
      await context.build();
    },
    async onBuildComplete({ distDir, nextConfig }) {
      const exportMarkerPath = path.join(distDir, 'export-marker.json');

      try {
        await fs.access(exportMarkerPath);
      } catch {
        const exportMarker = {
          version: 1,
          hasExportPathMap: false,
          exportTrailingSlash: Boolean(nextConfig.trailingSlash),
          isNextImageImported: false,
        };

        await fs.writeFile(
          exportMarkerPath,
          `${JSON.stringify(exportMarker, null, 2)}\n`,
          'utf8',
        );
      }
    },
  };
};
