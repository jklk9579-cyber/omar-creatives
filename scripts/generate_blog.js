import fs from 'fs';
import path from 'path';

const GROQ_API_KEY = process.env.GROQ_API_KEY;

if (!GROQ_API_KEY) {
    console.error('GROQ_API_KEY is not set');
    process.exit(1);
}

// Each topic has a curated Unsplash photo ID that matches its theme
const TOPICS = [
    { topic: "Modern Web Design Trends in Egypt", unsplash: "1467232004584-a241de8bcf5d" },
    { topic: "How AI is Revolutionizing Graphic Design", unsplash: "1677442136019-21780ecad995" },
    { topic: "Benefits of Custom App Development for Small Businesses", unsplash: "1512941937169-cb5e5e181d55" },
    { topic: "The Importance of UI/UX in Digital Branding", unsplash: "1561070791-2526d30994b5" },
    { topic: "SEO Tips for Egyptian Entrepreneurs", unsplash: "1460925895917-afdab827c52f" },
    { topic: "Maximizing Social Media Engagement with AI Content", unsplash: "1611162617213-7d7a39e9b1d7" },
    { topic: "Choosing the Right Tech Stack for Your Startup", unsplash: "1518770660439-4636190af475" },
    { topic: "The Role of AI in Personal Branding", unsplash: "1635070041078-e363dbe005cb" },
    { topic: "Why Cairo Businesses are Switching to Astro for Performance", unsplash: "1551288049-bebda4e38f71" },
    { topic: "The Impact of Arabic Typography in Modern Web Design", unsplash: "1618172193622-ae2d025f4032" },
    { topic: "How to Automate Your Content Strategy for 2026", unsplash: "1460925895917-afdab827c52f" },
    { topic: "The Growth of E-commerce in Egypt: A Design Perspective", unsplash: "1556742049-0cfed4f6a45d" },
    { topic: "AI-Powered Video Marketing: The New Frontier", unsplash: "1536240478700-b869070f9279" },
    { topic: "Building Trust with Your Audience Through UX Design", unsplash: "1552664730-d307ca884978" },
    { topic: "The Future of Freelancing in the Middle East", unsplash: "1522071820081-009f0129c71c" },
    { topic: "Visual Storytelling: Why Your Brand Needs a Narrative", unsplash: "1542744173-8e7e91415657" },
    { topic: "Optimizing Your Website for Local Search in Egypt", unsplash: "1573164713988-8665fc963095" },
    { topic: "The Ethics of AI in Creative Content Creation", unsplash: "1620712943543-bcc4688e7485" },
];

/**
 * Download a topic-relevant image from Unsplash (no API key needed)
 * and save it to src/assets/ for Astro's image optimization.
 */
async function downloadImage(slug, unsplashId) {
    const imageName = `blog-${slug}.jpg`;
    const imagePath = path.join('src', 'assets', imageName);

    // Direct Unsplash CDN URL — no API key required, just a photo ID
    const imageUrl = `https://images.unsplash.com/photo-${unsplashId}?w=1200&h=600&fit=crop&q=80`;

    console.log(`Downloading topic-relevant image...`);

    try {
        const response = await fetch(imageUrl, { redirect: 'follow' });
        if (!response.ok) throw new Error(`Image download failed: ${response.statusText}`);

        const buffer = Buffer.from(await response.arrayBuffer());
        fs.writeFileSync(imagePath, buffer);
        console.log(`Image saved: ${imagePath} (${(buffer.length / 1024).toFixed(0)} KB)`);
        return `../../assets/${imageName}`;
    } catch (error) {
        console.warn(`Image download failed, using placeholder: ${error.message}`);
        return '../../assets/blog-placeholder-5.jpg';
    }
}

async function generateBlog() {
    const entry = TOPICS[Math.floor(Math.random() * TOPICS.length)];
    const { topic, unsplash } = entry;
    const now = new Date();
    const date = now.toISOString().split('T')[0];
    const time = now.getHours().toString().padStart(2, '0') + now.getMinutes().toString().padStart(2, '0');
    const slug = topic.toLowerCase().replace(/ /g, '-').replace(/[^\w-]/g, '');

    console.log(`Generating blog for topic: ${topic}`);

    // Step 1: Download a relevant image for this post
    const heroImagePath = await downloadImage(slug, unsplash);

    // Step 2: Generate the blog content via Groq
    const systemPrompt = `You are a professional blog writer for Omar Creatives, a specialized AI and Digital Creative agency in Cairo. 
  You write engaging, high-quality blog posts in both English and Arabic.
  Each post MUST follow this EXACT format (output ONLY the markdown, no extra text):
  
  ---
  title: "[English Title]"
  title_ar: "[Arabic Title]"
  description: "[Short English description, 1-2 sentences]"
  description_ar: "[Short Arabic description, 1-2 sentences]"
  pubDate: ${date}
  heroImage: "${heroImagePath}"
  tags: ["AI", "Design", "Web Development"]
  ---
  
  [English Content in Markdown]
  
  <!-- ARABIC_CONTENT -->
  
  [Arabic Content in Markdown]
  
  Requirements:
  - Focus on the Cairo/Egyptian market when relevant.
  - Mention Omar Creatives as a leader in these solutions.
  - Include a Call to Action (CTA) at the end leading to https://wa.me/201211867464.
  - Ensure the Arabic is professional and engaging.
  - The pubDate and heroImage MUST be EXACTLY as shown above, do NOT change them.`;

    const userPrompt = `Write a blog post about: ${topic}`;

    try {
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${GROQ_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'llama-3.3-70b-versatile',
                messages: [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: userPrompt }
                ],
                temperature: 0.7,
            }),
        });

        if (!response.ok) {
            throw new Error(`Groq API error: ${response.statusText}`);
        }

        const data = await response.json();
        let content = data.choices[0].message.content;

        // Force the correct heroImage path — AI often ignores the one we provide
        content = content.replace(
            /heroImage:\s*"[^"]*"/,
            `heroImage: "${heroImagePath}"`
        );

        const fileName = `${date}-${time}-${slug}.md`;
        const filePath = path.join('src', 'content', 'blog', fileName);

        fs.writeFileSync(filePath, content);
        console.log(`Blog post created: ${filePath}`);
    } catch (error) {
        console.error('Error generating blog:', error);
        process.exit(1);
    }
}

generateBlog();
