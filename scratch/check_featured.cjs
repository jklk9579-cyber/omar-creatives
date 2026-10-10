const fs = require('fs');
const path = require('path');
const dir = 'src/content/projects';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));
const featured = [];
for (const f of files) {
  const content = fs.readFileSync(path.join(dir, f), 'utf8');
  const isFeatured = /featured:\s*true/.test(content);
  const titleMatch = content.match(/title:\s*"?([^\r\n"]+)/);
  const title = titleMatch ? titleMatch[1] : f;
  const dateMatch = content.match(/date:\s*([^\r\n]+)/);
  const date = dateMatch ? dateMatch[1] : '';
  const catMatch = content.match(/category:\s*"?([^\r\n"]+)/);
  const cat = catMatch ? catMatch[1] : '';
  if (isFeatured) featured.push({ f, title, date, cat });
}
featured.sort((a,b) => new Date(b.date) - new Date(a.date));
console.log('Total featured:', featured.length);
featured.forEach(p => console.log(p.date, '|', p.cat, '|', p.title, '|', p.f));
