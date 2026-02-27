import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { transformAsync } from '@babel/core';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const appRoot = path.resolve(__dirname, '..');
const srcRoot = path.join(appRoot, 'src');
const outRoot = path.join(appRoot, 'dist');

const JS_EXT = new Set(['.js', '.jsx']);
const COPY_EXT = new Set(['.css', '.svg', '.png', '.jpg', '.jpeg', '.gif']);

const IGNORE_DIRS = new Set(['pages', 'assets']);
const IGNORE_FILES = new Set(['main.jsx', 'App.jsx', 'App.css', 'index.css']);

async function rimraf(target) {
  await fs.rm(target, { recursive: true, force: true });
}

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

async function* walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (IGNORE_DIRS.has(entry.name)) continue;
      yield* walk(full);
    } else {
      yield full;
    }
  }
}

function outPathFor(filePath) {
  const rel = path.relative(srcRoot, filePath);
  return path.join(outRoot, rel).replace(/\.jsx$/i, '.js');
}

async function compileJs(filePath) {
  const code = await fs.readFile(filePath, 'utf8');

  const result = await transformAsync(code, {
    filename: filePath,
    sourceType: 'module',
    babelrc: false,
    configFile: false,
    presets: [
      ['@babel/preset-react', { runtime: 'automatic' }],
      ['@babel/preset-env', { modules: false }],
    ],
    sourceMaps: false,
    comments: false,
  });

  if (!result?.code) {
    throw new Error(`Babel transform failed for: ${filePath}`);
  }

  const outFile = outPathFor(filePath);
  await ensureDir(path.dirname(outFile));
  await fs.writeFile(outFile, result.code, 'utf8');
}

async function copyAsset(filePath) {
  const outFile = path.join(outRoot, path.relative(srcRoot, filePath));
  await ensureDir(path.dirname(outFile));
  await fs.copyFile(filePath, outFile);
}

async function main() {
  await rimraf(outRoot);
  await ensureDir(outRoot);

  // Ensure entry point exists
  const entry = path.join(srcRoot, 'index.js');
  await fs.access(entry);

  for await (const filePath of walk(srcRoot)) {
    const ext = path.extname(filePath);
    const base = path.basename(filePath);
    if (IGNORE_FILES.has(base)) continue;

    if (JS_EXT.has(ext)) {
      await compileJs(filePath);
      continue;
    }

    if (COPY_EXT.has(ext)) {
      await copyAsset(filePath);
    }
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
