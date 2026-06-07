// Auto-increment the patch version in package.json.
// Runs automatically before every build (npm "prebuild" hook), so the app
// version increases on each build. Vite injects the value as __APP_VERSION__.
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const pkgPath = join(root, 'package.json');

const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'));
const parts = String(pkg.version || '0.0.0').split('.').map((n) => parseInt(n, 10) || 0);
while (parts.length < 3) parts.push(0);
parts[2] += 1; // bump patch
pkg.version = parts.join('.');

writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
console.log(`[bump-version] app version -> ${pkg.version}`);
