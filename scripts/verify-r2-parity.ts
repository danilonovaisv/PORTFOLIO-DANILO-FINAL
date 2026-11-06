import fs from 'node:fs';
import path from 'node:path';

interface AssetItem {
  key?: string;
  bucket?: string;
  file_path?: string;
  file_url?: string;
}

async function verifyR2Parity() {
  const r2Base =
    process.env.NEXT_PUBLIC_R2_PUBLIC_URL || process.env.R2_PUBLIC_URL;
  if (!r2Base) {
    console.error(
      '❌ Erro: Defina NEXT_PUBLIC_R2_PUBLIC_URL para executar a auditoria.'
    );
    process.exit(1);
  }

  const cleanBase = r2Base.replace(/\/+$/, '');
  const assetsFile = path.resolve(process.cwd(), 'assets.json');
  if (!fs.existsSync(assetsFile)) {
    console.error(`❌ Arquivo ${assetsFile} não encontrado.`);
    process.exit(1);
  }

  const raw = JSON.parse(fs.readFileSync(assetsFile, 'utf8'));
  const list: AssetItem[] = raw[0]?.export_json || raw;

  console.log(
    `🔍 Iniciando auditoria de paridade para ${list.length} assets em ${cleanBase}...`
  );

  let okCount = 0;
  let failCount = 0;
  const sampleErrors: Array<{ key?: string; url: string; status: number }> = [];

  // Testa uma amostra representativa ou todos os assets em lotes de 20
  const sample = list.filter(
    (item) =>
      item.file_path && !item.file_path.endsWith('.emptyFolderPlaceholder')
  );

  for (let i = 0; i < sample.length; i += 20) {
    const chunk = sample.slice(i, i + 20);
    await Promise.all(
      chunk.map(async (item) => {
        const bucket = item.bucket || 'site-assets';
        const url = `${cleanBase}/${bucket}/${item.file_path}`;
        try {
          const res = await fetch(url, { method: 'HEAD' });
          if (res.ok) {
            okCount++;
          } else {
            failCount++;
            if (sampleErrors.length < 10) {
              sampleErrors.push({ key: item.key, url, status: res.status });
            }
          }
        } catch (err) {
          failCount++;
          if (sampleErrors.length < 10) {
            sampleErrors.push({ key: item.key, url, status: 0 });
          }
        }
      })
    );
  }

  console.log('----------------------------------------------------');
  console.log(`✅ Assets verificados com sucesso: ${okCount}`);
  if (failCount > 0) {
    console.warn(`⚠️  Assets com falha ou pendentes: ${failCount}`);
    console.log('Amostra de falhas:', sampleErrors);
  } else {
    console.log('🎉 100% de paridade confirmada no Cloudflare R2!');
  }
}

verifyR2Parity().catch(console.error);
