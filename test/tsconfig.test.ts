import fs from 'fs';
import path from 'path';

describe('tsconfig.json', () => {
  const tsconfigPath = path.join(__dirname, '../tsconfig.json');
  let tsconfig: any;

  beforeAll(() => {
    const tsconfigContent = fs.readFileSync(tsconfigPath, 'utf-8');
    tsconfig = JSON.parse(tsconfigContent);
  });

  it('should have ES2022 as target', () => {
    expect(tsconfig.compilerOptions.target).toBe('ES2022');
  });

  it('should enable experimental decorators', () => {
    expect(tsconfig.compilerOptions.experimentalDecorators).toBe(true);
  });

  it('should have bundler module resolution', () => {
    expect(tsconfig.compilerOptions.moduleResolution).toBe('bundler');
  });

  it('should have strict mode enabled', () => {
    expect(tsconfig.compilerOptions.strict).toBe(true);
  });

  it('should allow JS files', () => {
    expect(tsconfig.compilerOptions.allowJs).toBe(true);
  });

  it('should support JSX with react-jsx', () => {
    expect(tsconfig.compilerOptions.jsx).toBe('react-jsx');
  });

  it('should include necessary library types', () => {
    const requiredLibs = ['ES2022', 'DOM', 'DOM.Iterable'];
    requiredLibs.forEach((lib) => {
      expect(tsconfig.compilerOptions.lib).toContain(lib);
    });
  });

  it('should have proper path mappings', () => {
    expect(tsconfig.compilerOptions.paths['@/*']).toEqual(['./*', './src/*']);
  });

  it('should include test and source files', () => {
    expect(tsconfig.include).toContain('**/*.ts');
    expect(tsconfig.include).toContain('**/*.tsx');
  });

  it('should exclude node_modules and unnecessary directories', () => {
    expect(tsconfig.exclude).toContain('node_modules');
  });

  it('should have skipLibCheck enabled for faster compilation', () => {
    expect(tsconfig.compilerOptions.skipLibCheck).toBe(true);
  });

  it('should have isolatedModules enabled for ESM compatibility', () => {
    expect(tsconfig.compilerOptions.isolatedModules).toBe(true);
  });

  it('should have esModuleInterop enabled for CommonJS compatibility', () => {
    expect(tsconfig.compilerOptions.esModuleInterop).toBe(true);
  });

  it('should include jest types for testing', () => {
    expect(tsconfig.compilerOptions.types).toContain('jest');
    expect(tsconfig.compilerOptions.types).toContain('node');
  });
});
