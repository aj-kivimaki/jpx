const fs = require('fs');
const path = require('path');

const out = path.join(__dirname, '..', 'dist', 'types', 'index.d.ts');
fs.writeFileSync(out, 'export * from "./src/index";');
