import { assets } from '../src/config/site-assets';
import fs from 'fs';
import path from 'path';

/**
 * Script de diagnóstico local para verificar a integridade dos assets
 * antes de tentar a sincronização remota com o Supabase.
 */

const PUBLIC_ASSETS_DIR = path.join(process.cwd(), 'public', 'assets');

console.log('🔍 Iniciando Diagnóstico de Assets Locais...');
console.log('-------------------------------------------');

let missingFiles = 0;
let foundFiles = 0;

Object.entries(assets).forEach(([key, asset]) => {
  const localPath = path.join(process.cwd(), 'public', asset.file_path);

  if (fs.existsSync(localPath)) {
    foundFiles++;
  } else {
    console.error(`❌ ARQUIVO AUSENTE: ${key}`);
    console.error(`   Caminho esperado: ${asset.file_path}`);
    missingFiles++;
  }
});

console.log('-------------------------------------------');
console.log(`✅ Assets encontrados: ${foundFiles}`);
if (missingFiles > 0) {
  console.log(`🚨 Assets ausentes: ${missingFiles}`);
} else {
  console.log('✨ Todos os assets configurados estão presentes localmente.');
}

if (missingFiles > 0) {
  process.exit(1);
}
