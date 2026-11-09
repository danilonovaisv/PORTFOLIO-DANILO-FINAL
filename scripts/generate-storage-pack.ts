import fs from 'node:fs';
import path from 'node:path';

const PACK_ROOT = path.resolve(process.cwd(), 'storage-pack');
const ASSETS_JSON = path.resolve(process.cwd(), 'assets.json');
const LOCAL_ASSETS = path.resolve(process.cwd(), 'public/site.assets');

interface AssetRecord {
  id?: string;
  key?: string;
  bucket?: string;
  file_url?: string;
  file_path?: string;
  is_active?: boolean;
}

function ensureDir(dirPath: string) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

async function main() {
  console.log(
    '================================================================='
  );
  console.log('  Gerador de Pack de Pastas do Storage -> Cloudflare R2');
  console.log(
    '================================================================='
  );

  if (!fs.existsSync(ASSETS_JSON)) {
    console.error(`❌ Arquivo ${ASSETS_JSON} não encontrado.`);
    process.exit(1);
  }

  ensureDir(PACK_ROOT);

  const raw = JSON.parse(fs.readFileSync(ASSETS_JSON, 'utf8'));
  const list: AssetRecord[] = raw[0]?.export_json || raw;

  const validItems = list.filter(
    (item) =>
      item.file_path && !item.file_path.endsWith('.emptyFolderPlaceholder')
  );

  console.log(`📋 Total de itens catalogados: ${validItems.length}`);

  // Mapear diretórios e arquivos por diretório
  const dirMap = new Map<
    string,
    { filename: string; fullRelPath: string; url: string; bucket: string }[]
  >();

  for (const item of validItems) {
    const bucket = item.bucket || 'site-assets';
    const filePath = item.file_path!;
    const relFolder = path.join(bucket, path.dirname(filePath));
    const filename = path.basename(filePath);
    const fullRelPath = path.join(bucket, filePath);
    const url =
      item.file_url ||
      `https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/${bucket}/${filePath}`;

    if (!dirMap.has(relFolder)) {
      dirMap.set(relFolder, []);
    }
    dirMap.get(relFolder)!.push({ filename, fullRelPath, url, bucket });
  }

  console.log(
    `📁 Criando estrutura de ${dirMap.size} pastas no storage-pack/...`
  );

  let alreadyPresentCount = 0;
  let missingCount = 0;

  for (const [folderRel, files] of dirMap.entries()) {
    const fullTargetDir = path.join(PACK_ROOT, folderRel);
    ensureDir(fullTargetDir);

    const checklistLines: string[] = [];
    checklistLines.push(`# Checklist de Arquivos: ${folderRel}`);
    checklistLines.push(
      `> Adicione os arquivos abaixo diretamente nesta pasta.\n`
    );
    checklistLines.push(`| Status | Nome do Arquivo | Caminho Completo |`);
    checklistLines.push(`| :---: | :--- | :--- |`);

    const seenFilesInDir = new Set<string>();
    for (const f of files) {
      if (seenFilesInDir.has(f.filename)) continue;
      seenFilesInDir.add(f.filename);

      const destFilePath = path.join(PACK_ROOT, f.fullRelPath);
      // Checar se já temos localmente em public/site.assets
      const localCandidate = path.join(
        LOCAL_ASSETS,
        path.relative(f.bucket, f.fullRelPath)
      );

      let existsInPack = fs.existsSync(destFilePath);

      if (
        !existsInPack &&
        fs.existsSync(localCandidate) &&
        !fs.statSync(localCandidate).isDirectory()
      ) {
        ensureDir(path.dirname(destFilePath));
        fs.copyFileSync(localCandidate, destFilePath);
        existsInPack = true;
      }

      if (existsInPack) {
        alreadyPresentCount++;
        checklistLines.push(
          `| ✅ PRESENTE | \`${f.filename}\` | \`${f.fullRelPath}\` |`
        );
      } else {
        missingCount++;
        checklistLines.push(
          `| ⏳ PENDENTE | \`${f.filename}\` | \`${f.fullRelPath}\` |`
        );
      }
    }

    fs.writeFileSync(
      path.join(fullTargetDir, '_CHECKLIST.md'),
      checklistLines.join('\n')
    );
  }

  // Também verificar se há arquivos locais em public/site.assets que não estavam em assets.json
  if (fs.existsSync(LOCAL_ASSETS)) {
    function copyLocalRecursive(currentDir: string) {
      const entries = fs.readdirSync(currentDir, { withFileTypes: true });
      for (const entry of entries) {
        if (entry.name === '.DS_Store') continue;
        const fullPath = path.join(currentDir, entry.name);
        if (entry.isDirectory()) {
          copyLocalRecursive(fullPath);
        } else if (entry.isFile()) {
          const rel = path.relative(LOCAL_ASSETS, fullPath);
          const targetInPack = path.join(PACK_ROOT, 'site-assets', rel);
          if (!fs.existsSync(targetInPack)) {
            ensureDir(path.dirname(targetInPack));
            fs.copyFileSync(fullPath, targetInPack);
            alreadyPresentCount++;
          }
        }
      }
    }
    copyLocalRecursive(LOCAL_ASSETS);
  }

  // Gerar README master do storage-pack
  const readmeContent = `# 📦 Storage Pack — Migração de Assets para Cloudflare R2

Este diretório contém **toda a estrutura de pastas e projetos do Supabase Storage** espelhada perfeitamente.

## 📂 Como Usar Este Pack

1. **Localize o projeto ou pasta** onde você possui os arquivos originais (ex.: \`site-assets/landing-pages/zevi...\`, \`site-assets/landing-pages/nestle...\`, etc.).
2. **Cole os arquivos de mídia** (imagens \`.webp\`, \`.png\`, vídeos \`.mp4\`) dentro da respectiva pasta.
   * Cada pasta possui um arquivo \`_CHECKLIST.md\` listando o nome exato esperado para cada asset!
3. **Execute o comando de upload:**
   \`\`\`bash
   pnpm run upload-pack
   \`\`\`
   *O script irá escanear este diretório e enviar automaticamente todos os arquivos presentes para o Cloudflare R2 (\`portfolio-assets\`) com os Content-Types e Cache-Control corretos!*

---

## 📊 Status Atual do Pack
- **Pastas criadas:** ${dirMap.size} pastas
- **Arquivos já presentes no pack:** ${alreadyPresentCount}
- **Arquivos pendentes de adição:** ${missingCount}

---

## 🗂️ Estrutura de Pastas Principais
- \`site-assets/\`: Assets gerais, landing pages, logos, vídeos e 3D do site.
  - \`landing-pages/\`: Pastas de cada landing page (bidaya, conid, dntro, glad, nestle, swift, topz, zevi, etc.)
  - \`about/\`: Vídeos e imagens da página About
  - \`home/\`: Vídeos de manifesto e showcase
  - \`portfolio/\`: Vídeos do Hero
  - \`3d/\`: Modelos 3D GLB
  - \`global/\`: Logos, favicons e fontes
  - \`clients/\`: SVGs de clientes
- \`portfolio-media/\`: Cases de projetos e mídias de portfólio (covers 16x9, 1x1, galerias).
`;

  fs.writeFileSync(path.join(PACK_ROOT, 'README.md'), readmeContent);

  console.log(
    '\n================================================================='
  );
  console.log(`✅ Pack gerado com sucesso em: ${PACK_ROOT}`);
  console.log(`📁 ${dirMap.size} pastas criadas`);
  console.log(`📦 ${alreadyPresentCount} arquivos já populados no pack`);
  console.log(`⏳ ${missingCount} arquivos pendentes`);
  console.log(
    '================================================================='
  );
}

main().catch(console.error);
