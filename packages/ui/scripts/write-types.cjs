const fs = require('node:fs');
const path = require('node:path');

const out = path.join(__dirname, '..', 'dist', 'types', 'index.d.ts');
const dir = path.dirname(out);
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}
fs.writeFileSync(out, 'export * from "./src/index";');
