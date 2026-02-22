import fs from 'fs';
import path from 'path';

const files = [
    { slug: '2026-02-22-0501-what-is-ai-powered-content-creation', unsplash: "1677442136019-21780ecad995" },
    { slug: '2026-02-22-0502-web-dev-vs-app-dev', unsplash: "1518770660439-4636190af475" },
    { slug: '2026-02-22-0503-why-website-design-not-converting', unsplash: "1467232004584-a241de8bcf5d" },
    { slug: '2026-02-22-0504-create-strong-brand-identity', unsplash: "1561070791-2526d30994b5" },
    { slug: '2026-02-22-0505-ai-in-creative-development', unsplash: "1635070041078-e363dbe005cb" },
    { slug: '2026-02-22-0506-what-does-a-creative-developer-do', unsplash: "1551288049-bebda4e38f71" },
    { slug: '2026-02-22-0507-ui-ux-design-trends', unsplash: "1552664730-d307ca884978" },
    { slug: '2026-02-22-0508-common-web-development-misconceptions', unsplash: "1460925895917-afdab827c52f" }
];

async function attach() {
    for (const file of files) {
        const imageName = `blog-${file.slug}.jpg`;
        const imagePath = path.join('src', 'assets', imageName);
        const imageUrl = `https://images.unsplash.com/photo-${file.unsplash}?w=1200&h=600&fit=crop&q=80`;

        try {
            const response = await fetch(imageUrl, { redirect: 'follow' });
            if (!response.ok) throw new Error('Failed ' + response.statusText);
            const buffer = Buffer.from(await response.arrayBuffer());
            fs.writeFileSync(imagePath, buffer);
            console.log(`Saved ${imagePath}`);

            const mdPath = path.join('src', 'content', 'blog', `${file.slug}.md`);
            let mdContent = fs.readFileSync(mdPath, 'utf8');
            mdContent = mdContent.replace('heroImage: "../../assets/blog-placeholder-1.jpg"', `heroImage: "../../assets/${imageName}"`);
            fs.writeFileSync(mdPath, mdContent);
        } catch (e) {
            console.error(e);
        }
    }
}
attach();
