import fs from 'fs';
import path from 'path';

// Helper to check if string contains non-ascii or special chars
function hasSpecialChars(str) {
    return /[^\x00-\x7F]/.test(str) || /[()"+']/.test(str);
}

// Simple slugify
function safeName(str) {
    let name = str.replace(/[^\w.-]/g, '-').replace(/-+/g, '-');
    return name.replace(/^-+|-+$/g, '');
}

async function run() {
    const publicDir = path.join(process.cwd(), 'public');
    const srcDir = path.join(process.cwd(), 'src');

    const filesToRename = [];

    // recursively find files
    function findFiles(dir) {
        const entries = fs.readdirSync(dir, { withFileTypes: true });
        for (let entry of entries) {
            const fullPath = path.join(dir, entry.name);
            if (entry.isDirectory()) {
                findFiles(fullPath);
            } else {
                if (hasSpecialChars(entry.name)) {
                    // Generate safe name
                    const ext = path.extname(entry.name);
                    const base = path.basename(entry.name, ext);
                    const safeBase = safeName(base) || `file-${Date.now()}-${Math.floor(Math.random()*1000)}`;
                    const safeEntryName = safeBase + ext;
                    
                    filesToRename.push({
                        oldPath: fullPath,
                        newPath: path.join(dir, safeEntryName),
                        oldName: entry.name,
                        newName: safeEntryName,
                        // We also need the relative path for find/replace in src
                        oldRel: fullPath.replace(publicDir, '').replace(/\\/g, '/'),
                        newRel: path.join(dir, safeEntryName).replace(publicDir, '').replace(/\\/g, '/')
                    });
                }
            }
        }
    }

    findFiles(publicDir);

    if (filesToRename.length === 0) {
        console.log("No files need renaming.");
        return;
    }

    // Now update references in src/
    function updateRefs(dir) {
        const entries = fs.readdirSync(dir, { withFileTypes: true });
        for (let entry of entries) {
            const fullPath = path.join(dir, entry.name);
            if (entry.isDirectory()) {
                updateRefs(fullPath);
            } else if (entry.name.endsWith('.md') || entry.name.endsWith('.astro') || entry.name.endsWith('.ts')) {
                let content = fs.readFileSync(fullPath, 'utf8');
                let changed = false;
                for (let rename of filesToRename) {
                    // Sometimes oldRel has a leading slash in markdown
                    if (content.includes(rename.oldName) || content.includes(rename.oldRel)) {
                        // replace all occurrences of oldRel with newRel
                        // we split and join to replace all
                        const searchStr = rename.oldRel;
                        if(content.includes(searchStr)){
                             content = content.split(searchStr).join(rename.newRel);
                             changed = true;
                        }
                        
                        // Just in case it's URL encoded in the markdown
                        const encodedStr = encodeURI(rename.oldRel);
                        if(content.includes(encodedStr)) {
                             content = content.split(encodedStr).join(rename.newRel);
                             changed = true;
                        }
                    }
                }
                if (changed) {
                    fs.writeFileSync(fullPath, content, 'utf8');
                    console.log(`Updated references in: ${fullPath}`);
                }
            }
        }
    }

    updateRefs(srcDir);

    // Finally rename the files
    for (let rename of filesToRename) {
        fs.renameSync(rename.oldPath, rename.newPath);
        console.log(`Renamed: ${rename.oldName} -> ${rename.newName}`);
    }
}

run();
