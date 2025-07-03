import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, 'node_modules', 'pdf-parse', 'index.js');
const originalPattern = /if \(require\.main === module\) \{/g;
const replacementText = 'if (false) { // Patched by postinstall';

try {
    let content = fs.readFileSync(filePath, 'utf8');

    if (content.match(originalPattern)) {
        content = content.replace(originalPattern, replacementText);
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('✅ Successfully patched pdf-parse/index.js');
    } else {
        console.warn('⚠️ pdf-parse/index.js pattern not found for patching. It might already be patched or the file structure has changed.');
    }

} catch (error) {
    console.error('❌ Error during pdf-parse patching:', error.message);
    process.exit(1);
}
