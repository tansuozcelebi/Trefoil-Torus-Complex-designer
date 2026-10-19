// Auto-increment the patch version (x.y.Z -> x.y.Z+1) in package.json and
// package-lock.json. Runs before every build (npm "prebuild" hook), so every
// build — local or the CI deploy — gets the next patch number. Vite injects
// the value as __APP_VERSION__. The CI deploy commits the bumped files back to
// main so the next build continues from there.
// Set NO_VERSION_BUMP=1 for validation-only builds (e.g. the PR CI check).
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const pkgPath = join(root, 'package.json');
const lockPath = join(root, 'package-lock.json');

const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'));
if (process.env.NO_VERSION_BUMP){
  console.log(`[bump-version] NO_VERSION_BUMP set, keeping ${pkg.version}`);
  process.exit(0);
}
const parts = String(pkg.version || '0.0.0').split('.').map((n) => parseInt(n, 10) || 0);
while (parts.length < 3) parts.push(0);
parts[2] += 1; // bump patch
pkg.version = parts.join('.');
writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');

// Keep the lockfile's own version in step (dependencies are untouched).
if (existsSync(lockPath)){
  const lock = JSON.parse(readFileSync(lockPath, 'utf8'));
  lock.version = pkg.version;
  if (lock.packages && lock.packages['']) lock.packages[''].version = pkg.version;
  writeFileSync(lockPath, JSON.stringify(lock, null, 2) + '\n');
}
console.log(`[bump-version] app version -> ${pkg.version}`);
