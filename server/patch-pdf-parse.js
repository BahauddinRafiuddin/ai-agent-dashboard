// patch-pdf-parse.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, 'node_modules', 'pdf-parse', 'index.js');
const originalPattern = /if \(require\.main === module\) \{/g;
const replacementText = 'if (false) { // Patched by postinstall';

console.log(`[Patch Script] Attempting to patch: ${filePath}`);

try {
    let content = fs.readFileSync(filePath, 'utf8');

    // --- START DEBUGGING LOGS ---
    console.log('[Patch Script] --- First 500 characters of pdf-parse/index.js ---');
    console.log(content.substring(0, 500));
    console.log('[Patch Script] --- End of snippet ---');
    // --- END DEBUGGING LOGS ---

    if (content.match(originalPattern)) {
        content = content.replace(originalPattern, replacementText);
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('✅ Successfully patched pdf-parse/index.js');

        // Optional: Log after patch to confirm it worked
        // console.log('[Patch Script] --- First 500 characters AFTER patch ---');
        // console.log(fs.readFileSync(filePath, 'utf8').substring(0, 500));
        // console.log('[Patch Script] --- End of snippet AFTER patch ---');

    } else {
        console.warn('⚠️ [Patch Script] pdf-parse/index.js pattern not found for patching. Checking if already patched...');
        if (content.includes(replacementText)) {
            console.log('✅ [Patch Script] pdf-parse/index.js appears to be already patched.');
        } else {
            console.error('❌ [Patch Script] Pattern not found and file not already patched. The `pdf-parse` source code might have changed or your `originalPattern` is incorrect.');
            console.error('Please manually inspect the pdf-parse/index.js file content logged above.');
            // Do NOT exit 1 here, let the build continue so we see the final error if it happens.
        }
    }

} catch (error) {
    console.error('❌ [Patch Script] Error during pdf-parse patching:', error.message);
    process.exit(1); // Exit if an error occurs during file read/write
}