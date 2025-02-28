import fs from 'fs';
import path from 'path';
import config from '../lighthouse-local';

// Convert the config to JSON and write it to a file
const configJson = JSON.stringify(config, null, 2);
const outputPath = path.join(process.cwd(), 'lighthouse-local.json');

fs.writeFileSync(outputPath, configJson);
console.log(`Lighthouse config written to ${outputPath}`);
