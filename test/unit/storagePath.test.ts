import {
  normalizeBrand,
  normalizeProject,
  hashContent,
  buildV4Path,
} from '../../src/lib/assets/storagePath';

describe('storagePath generator', () => {
  describe('normalizeBrand', () => {
    it('normalizes normal text to slug', () => {
      expect(normalizeBrand('O Boticário')).toBe('o-botic-rio');
      expect(normalizeBrand('   Danilo Novais !@# ')).toBe('danilo-novais');
    });

    it('returns empty string if nothing left', () => {
      expect(normalizeBrand('!@#')).toBe('');
    });
  });

  describe('normalizeProject', () => {
    it('normalizes project name to slug', () => {
      expect(normalizeProject('Campanha Verão 2024')).toBe(
        'campanha-ver-o-2024'
      );
    });
  });

  describe('hashContent', () => {
    it('generates a 16 chars SHA-256 hash', () => {
      const buffer1 = Buffer.from('hello world');
      const buffer2 = Buffer.from('hello world!');

      const hash1 = hashContent(buffer1);
      const hash2 = hashContent(buffer2);

      expect(hash1).toHaveLength(16);
      expect(hash2).toHaveLength(16);
      expect(hash1).not.toBe(hash2);
      expect(hashContent(Buffer.from('hello world'))).toBe(hash1); // determinism
    });
  });

  describe('buildV4Path', () => {
    it('builds a correct path without kind', () => {
      const path = buildV4Path({
        brand: 'O Boticário',
        project: 'Boti Sun',
        filename: 'Video Final_01.MP4',
        ext: 'mp4',
        hash: 'abcdef1234567890',
      });

      expect(path).toBe(
        'o-botic-rio/boti-sun/assets-do-projeto/video-final-01.abcdef1234567890.mp4'
      );
    });

    it('builds a correct path with kind', () => {
      const path = buildV4Path({
        brand: 'Danilo',
        project: 'Rebranding',
        kind: 'Cover 16x9',
        filename: 'imagem.png',
        ext: 'png',
        hash: '1234567890abcdef',
      });

      expect(path).toBe(
        'danilo/rebranding/assets-do-projeto/cover-16x9/imagem.1234567890abcdef.png'
      );
    });

    it('builds a correct path with landing-page kind strictly', () => {
      const path = buildV4Path({
        brand: 'Danilo',
        project: 'Rebranding',
        kind: 'landing-page',
        filename: 'imagem.png',
        ext: 'png',
        hash: '1234567890abcdef',
      });

      expect(path).toBe(
        'danilo/rebranding/assets-do-projeto/landin-page/imagem.1234567890abcdef.png'
      );
    });

    it('handles files with multiple extensions or dots', () => {
      const path = buildV4Path({
        brand: 'A',
        project: 'B',
        filename: 'my.epic.file.tar.gz',
        ext: 'gz',
        hash: '0000000000000000',
      });

      expect(path).toBe('a/b/assets-do-projeto/my-epic-file-tar.0000000000000000.gz');
    });

    it('defaults to file if filename is scrubbed completely', () => {
      const path = buildV4Path({
        brand: 'brand',
        project: 'project',
        filename: '!@#$.png',
        ext: 'png',
        hash: '1111111111111111',
      });

      expect(path).toBe('brand/project/assets-do-projeto/file.1111111111111111.png');
    });
  });
});
