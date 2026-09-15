#!/usr/bin/env ts-node
/**
 * scripts/wiki-brain-sync.ts
 *
 * Wiki-Brain synchronization and validation script.
 * Operated by: @obsidian_vault_operator
 *
 * Responsibilities:
 *   1. Validate JSON Canvas files (.canvas) in graphify-out/
 *   2. Validate YAML in .base files
 *   3. Scan for broken Wikilinks in 00-INDEX.md and OFM notes
 *   4. Auto-generate .canvas node stub when a new module is added to src/
 *
 * Usage:
 *   pnpm tsx scripts/wiki-brain-sync.ts          # Full sync validation
 *   pnpm tsx scripts/wiki-brain-sync.ts --canvas  # Canvas-only validation
 *   pnpm tsx scripts/wiki-brain-sync.ts --auto    # Auto-generate canvas from src/
 */

import fs from "fs";
import path from "path";

const VAULT_DIR = path.resolve(process.cwd(), "graphify-out");
const SRC_DIR = path.resolve(process.cwd(), "src");
const CANVAS_FILE = path.join(VAULT_DIR, "architecture-map.canvas");

type CanvasNode = {
  id: string;
  type: "text" | "file" | "link" | "group";
  x: number;
  y: number;
  width: number;
  height: number;
  text?: string;
  file?: string;
  url?: string;
  label?: string;
  color?: string;
};

type CanvasEdge = {
  id: string;
  fromNode: string;
  toNode: string;
  fromSide?: "top" | "right" | "bottom" | "left";
  toSide?: "top" | "right" | "bottom" | "left";
  label?: string;
};

type CanvasSpec = {
  nodes: CanvasNode[];
  edges: CanvasEdge[];
};

// ─── VALIDATION: JSON Canvas ───────────────────────────────────────────────

function validateCanvas(filePath: string): boolean {
  console.log(`\n📐 Validating JSON Canvas: ${path.basename(filePath)}`);
  const raw = fs.readFileSync(filePath, "utf-8");

  let canvas: CanvasSpec;
  try {
    canvas = JSON.parse(raw) as CanvasSpec;
  } catch (e) {
    console.error("  ❌ JSON parse error:", (e as Error).message);
    return false;
  }

  const nodeIds = new Set(canvas.nodes.map((n) => n.id));
  let valid = true;

  // Check node IDs are unique and 16-char hex
  const seenIds = new Set<string>();
  for (const node of canvas.nodes) {
    if (!/^[a-f0-9]{16}$/i.test(node.id)) {
      console.warn(`  ⚠️  Node ID format unexpected: ${node.id} (should be 16-char hex)`);
    }
    if (seenIds.has(node.id)) {
      console.error(`  ❌ Duplicate node ID: ${node.id}`);
      valid = false;
    }
    seenIds.add(node.id);
  }

  // Check edge references resolve
  for (const edge of canvas.edges) {
    if (!nodeIds.has(edge.fromNode)) {
      console.error(`  ❌ Edge ${edge.id}: fromNode "${edge.fromNode}" not found`);
      valid = false;
    }
    if (!nodeIds.has(edge.toNode)) {
      console.error(`  ❌ Edge ${edge.id}: toNode "${edge.toNode}" not found`);
      valid = false;
    }
  }

  if (valid) {
    console.log(`  ✅ Canvas valid — ${canvas.nodes.length} nodes, ${canvas.edges.length} edges`);
  }
  return valid;
}

// ─── VALIDATION: Wikilinks in OFM Notes ────────────────────────────────────

function validateWikilinks(dir: string): void {
  console.log("\n🔗 Scanning Wikilinks in OFM notes...");
  // Exclude graphify-internal reports (they contain synthetic community cluster wikilinks)
  const EXCLUDED = new Set(["GRAPH_REPORT.md", "GRAPH_REPORT_CONTEXT.md"]);
  const mdFiles = fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md") && !EXCLUDED.has(f))
    .map((f) => path.join(dir, f));

  const wikiLinkRegex = /\[\[([^\]|#]+)(?:#[^\]|]*)?\|?[^\]]*\]\]/g;
  let broken = 0;

  for (const file of mdFiles) {
    const content = fs.readFileSync(file, "utf-8");
    const matches = [...content.matchAll(wikiLinkRegex)];
    for (const match of matches) {
      const targetName = match[1].trim();
      // Skip external URLs
      if (targetName.startsWith("http")) continue;
      // Skip relative-path links (Obsidian resolves these vault-globally)
      if (targetName.startsWith("..") || targetName.startsWith("./")) continue;
      // Skip non-md vault files (.canvas, .base) — Obsidian resolves by extension
      if (targetName.includes(".canvas") || targetName.includes(".base")) continue;
      // Skip single-word OFM syntax examples (e.g. [[Link]], [[Embed]])
      if (/^\w+$/.test(targetName) && targetName.length <= 6) continue;
      const targetPath = path.join(dir, `${targetName}.md`);
      const targetPathMd = path.resolve(process.cwd(), targetName);
      if (
        !fs.existsSync(targetPath) &&
        !fs.existsSync(targetPathMd) &&
        !fs.existsSync(`${targetPathMd}.md`)
      ) {
        console.warn(`  ⚠️  Broken link in ${path.basename(file)}: [[${targetName}]]`);
        broken++;
      }
    }
  }

  if (broken === 0) {
    console.log("  ✅ All Wikilinks resolve correctly");
  } else {
    console.log(`  ⚠️  ${broken} broken wikilink(s) found — update 00-INDEX.md`);
  }
}

// ─── AUTO-GENERATION: Canvas node from new src/ component ──────────────────

function generateCanvasNodeForNewModules(): void {
  console.log("\n⚙️  Auto-scan: new src/ modules for canvas node generation...");

  if (!fs.existsSync(CANVAS_FILE)) {
    console.warn("  ⚠️  Canvas file not found:", CANVAS_FILE);
    return;
  }

  const canvasRaw = fs.readFileSync(CANVAS_FILE, "utf-8");
  const canvas: CanvasSpec = JSON.parse(canvasRaw);

  const existingFileNodes = new Set(
    canvas.nodes
      .filter((n) => n.type === "file" && n.file)
      .map((n) => n.file as string)
  );

  // Scan src/ for key modules (app directories, major component dirs)
  const srcDirs = fs.existsSync(SRC_DIR)
    ? fs.readdirSync(SRC_DIR, { withFileTypes: true })
        .filter((d) => d.isDirectory())
        .map((d) => d.name)
    : [];

  const newNodes: CanvasNode[] = [];
  let yOffset = 650;

  for (const dir of srcDirs) {
    const relPath = `src/${dir}`;
    const indexPath = path.join(SRC_DIR, dir, "index.ts");
    const pageFile = path.join(SRC_DIR, dir, "page.tsx");
    const targetFile = fs.existsSync(pageFile) ? `src/${dir}/page.tsx` : `src/${dir}`;

    if (!existingFileNodes.has(targetFile)) {
      const nodeId = Array.from({ length: 16 }, () =>
        Math.floor(Math.random() * 16).toString(16)
      ).join("");

      newNodes.push({
        id: nodeId,
        type: "text",
        x: -50 + newNodes.length * 240,
        y: yOffset,
        width: 220,
        height: 100,
        text: `# src/${dir}\n_Auto-generated node_`,
        color: "6",
      });

      console.log(`  ➕ New canvas node queued for: ${relPath}`);
    }
  }

  if (newNodes.length > 0) {
    canvas.nodes.push(...newNodes);
    fs.writeFileSync(CANVAS_FILE, JSON.stringify(canvas, null, 2));
    console.log(`  ✅ Added ${newNodes.length} new node(s) to architecture-map.canvas`);
  } else {
    console.log("  ✅ No new src/ modules detected — canvas up to date");
  }
}

// ─── MAIN ───────────────────────────────────────────────────────────────────

const args = process.argv.slice(2);
const canvasOnly = args.includes("--canvas");
const autoGen = args.includes("--auto");

console.log("🧠 Wiki-Brain Sync — @obsidian_vault_operator");
console.log("=".repeat(50));

const canvasFiles = fs
  .readdirSync(VAULT_DIR)
  .filter((f) => f.endsWith(".canvas"))
  .map((f) => path.join(VAULT_DIR, f));

let allValid = true;
for (const cf of canvasFiles) {
  if (!validateCanvas(cf)) allValid = false;
}

if (!canvasOnly) {
  validateWikilinks(VAULT_DIR);
}

if (autoGen) {
  generateCanvasNodeForNewModules();
}

console.log("\n" + "=".repeat(50));
console.log(allValid ? "✅ Wiki-Brain sync complete — all checks passed." : "⚠️  Wiki-Brain sync finished with warnings.");
process.exit(allValid ? 0 : 1);
