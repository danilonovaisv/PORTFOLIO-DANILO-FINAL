import fs from 'fs';
import path from 'path';

/**
 * Script de diagnóstico local para verificar a integridade dos assets
 * antes de tentar a sincronização remota com o Supabase.
 */

const ASSETS_JSON_PATH = path.join(
  process.cwd(),
  'src',
  'config',
  'site-assets.json'
);

if (!fs.existsSync(ASSETS_JSON_PATH)) {
  console.error('❌ Arquivo site-assets.json não encontrado.');
  process.exit(1);
}

const assetsData = JSON.parse(fs.readFileSync(ASSETS_JSON_PATH, 'utf-8'));
// A estrutura do JSON é um array com um objeto que tem export_json
const assets = assetsData[0]?.export_json || [];

console.log('🔍 Iniciando Diagnóstico de Assets Locais...');
console.log('-------------------------------------------');

let missingFiles = 0;
let foundFiles = 0;

assets.forEach((asset: any) => {
  const localPath = path.join(process.cwd(), 'public', asset.file_path);

  if (fs.existsSync(localPath)) {
    foundFiles++;
  } else {
    console.error(`❌ ARQUIVO AUSENTE: ${asset.key}`);
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
