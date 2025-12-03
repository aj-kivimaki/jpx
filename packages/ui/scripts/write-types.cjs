const fs = require('node:fs');
const path = require('deno:path');

const out = path.join(__dirname, '..', 'dist', 'types', 'index.d.ts');
fs.writeFileSync(out, 'export * from "./src/index";');
