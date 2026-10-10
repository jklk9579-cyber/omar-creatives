import fs from 'fs';

const imgFiles = fs.readdirSync('public/images/scocial-media-designs');
const mdFiles = fs.readdirSync('src/content/projects').map(f => {
  const content = fs.readFileSync('src/content/projects/' + f, 'utf8');
  const coverMatch = content.match(/cover:\s*["']?([^"'\r\n]+)/);
  return { file: f, cover: coverMatch ? coverMatch[1].trim() : null };
});

console.log('Total files in scocial-media-designs:', imgFiles.length);
const usedCovers = mdFiles.map(m => m.cover).filter(Boolean);

const unused = imgFiles.filter(img => {
  return !usedCovers.some(c => c && (c.includes(img) || decodeURIComponent(c).includes(img)));
});

console.log('Unused images/folders count:', unused.length);
console.log('Unused items:');
unused.forEach(u => console.log(' -', u));
