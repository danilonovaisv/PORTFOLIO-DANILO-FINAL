import fs from 'fs';
import path from 'path';

/**
 * Script de Verificação de Integridade de Assets (Offline) - v2
 * Valida se os assets listados no assets.json (formato export_json) existem na pasta public/assets/
 */

const ASSETS_JSON_PATH = path.join(process.cwd(), 'assets.json');
const PUBLIC_ASSETS_DIR = path.join(process.cwd(), 'public', 'site.assets');

async function validate() {
  if (!fs.existsSync(ASSETS_JSON_PATH)) {
    console.error('❌ assets.json não encontrado!');
    return;
  }

  const raw = fs.readFileSync(ASSETS_JSON_PATH, 'utf8');
  let assetEntries: any[] = [];
  
  try {
    const parsed = JSON.parse(raw);
    // Trata o formato específico do assets.json encontrado
    if (Array.isArray(parsed) && parsed[0]?.export_json) {
      assetEntries = parsed[0].export_json;
    } else if (Array.isArray(parsed)) {
      assetEntries = parsed;
    }
  } catch (err) {
    console.error('❌ Erro ao parsear assets.json:', err);
    return;
  }

  console.log(`🔍 Validando ${assetEntries.length} assets mapeados...`);
  
  const results = {
    found: 0,
    missing: [] as string[],
    external: 0
  };

  assetEntries.forEach(entry => {
    const filePath = entry.file_path;
    if (!filePath) return;

    // Apenas validamos assets que pertencem ao bucket 'site-assets' 
    // ou que esperamos estar no public/assets
    if (entry.bucket !== 'site-assets') {
      results.external++;
      return;
    }

    const localPath = path.join(PUBLIC_ASSETS_DIR, filePath);
    
    if (fs.existsSync(localPath)) {
      results.found++;
    } else {
      results.missing.push(filePath);
    }
  });

  console.log('-------------------------------------------');
  console.log(`✅ Presentes no public/assets: ${results.found}`);
  console.log(`ℹ️ Ignorados (outros buckets): ${results.external}`);
  
  if (results.missing.length > 0) {
    console.error(`🚨 Ausentes localmente: ${results.missing.length}`);
    results.missing.slice(0, 15).forEach(m => console.log(`   - ${m}`));
    if (results.missing.length > 15) console.log('   ...e outros.');
  } else {
    console.log('✨ Todos os assets do site-assets configurados estão presentes localmente.');
  }
}

validate();
