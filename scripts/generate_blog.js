import fs from 'fs';
import path from 'path';
import { pipeline } from 'stream/promises';
import { Readable } from 'stream';

const GROQ_API_KEY = process.env.GROQ_API_KEY;

if (!GROQ_API_KEY) {
    console.error('GROQ_API_KEY is not set');
    process.exit(1);
}

const TOPICS = [
    { topic: "Modern Web Design Trends in Egypt", keywords: "web,design,modern" },
    { topic: "How AI is Revolutionizing Graphic Design", keywords: "artificial-intelligence,design" },
    { topic: "Benefits of Custom App Development for Small Businesses", keywords: "mobile,app,development" },
    { topic: "The Importance of UI/UX in Digital Branding", keywords: "ux,design,interface" },
    { topic: "SEO Tips for Egyptian Entrepreneurs", keywords: "seo,marketing,business" },
    { topic: "Maximizing Social Media Engagement with AI Content", keywords: "social-media,content,marketing" },
    { topic: "Choosing the Right Tech Stack for Your Startup", keywords: "technology,startup,coding" },
    { topic: "The Role of AI in Personal Branding", keywords: "branding,ai,personal" },
    { topic: "Why Cairo Businesses are Switching to Astro for Performance", keywords: "performance,web,speed" },
    { topic: "The Impact of Arabic Typography in Modern Web Design", keywords: "typography,arabic,design" },
    { topic: "How to Automate Your Content Strategy for 2026", keywords: "automation,content,strategy" },
    { topic: "The Growth of E-commerce in Egypt: A Design Perspective", keywords: "ecommerce,shopping,online" },
    { topic: "AI-Powered Video Marketing: The New Frontier", keywords: "video,marketing,ai" },
    { topic: "Building Trust with Your Audience Through UX Design", keywords: "trust,ux,audience" },
    { topic: "The Future of Freelancing in the Middle East", keywords: "freelance,remote,work" },
    { topic: "Visual Storytelling: Why Your Brand Needs a Narrative", keywords: "storytelling,brand,visual" },
    { topic: "Optimizing Your Website for Local Search in Egypt", keywords: "local,search,egypt" },
    { topic: "The Ethics of AI in Creative Content Creation", keywords: "ethics,ai,creative" },
];

/**
 * Download a unique, topic-relevant image from Picsum/Unsplash
 * and save it to src/assets/ for Astro's image optimization.
 */
async function downloadImage(slug) {
    const imageName = `blog-${slug}.jpg`;
    const imagePath = path.join('src', 'assets', imageName);

    // Use Picsum for a random high-quality photo (1200x600)
    // The random seed ensures a unique image per slug
    const seed = slug.replace(/[^a-z0-9]/g, '').slice(0, 20);
    const imageUrl = `https://picsum.photos/seed/${seed}/1200/600`;

    console.log(`Downloading image from: ${imageUrl}`);

    try {
        const response = await fetch(imageUrl, { redirect: 'follow' });
        if (!response.ok) throw new Error(`Image download failed: ${response.statusText}`);

        const buffer = Buffer.from(await response.arrayBuffer());
        fs.writeFileSync(imagePath, buffer);
        console.log(`Image saved: ${imagePath}`);
        return `../../assets/${imageName}`;
    } catch (error) {
        console.warn(`Image download failed, using placeholder: ${error.message}`);
        return '../../assets/blog-placeholder-5.jpg';
    }
}

async function generateBlog() {
    const entry = TOPICS[Math.floor(Math.random() * TOPICS.length)];
    const { topic } = entry;
    const now = new Date();
    const date = now.toISOString().split('T')[0];
    const time = now.getHours().toString().padStart(2, '0') + now.getMinutes().toString().padStart(2, '0');
    const slug = topic.toLowerCase().replace(/ /g, '-').replace(/[^\w-]/g, '');

    console.log(`Generating blog for topic: ${topic}`);

    // Step 1: Download a unique image for this post
    const heroImagePath = await downloadImage(slug);

    // Step 2: Generate the blog content via Groq
    const systemPrompt = `You are a professional blog writer for Omar Creatives, a specialized AI and Digital Creative agency in Cairo. 
  You write engaging, high-quality blog posts in both English and Arabic.
  Each post MUST follow this exact format (output ONLY the markdown, no extra text):
  
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
        const content = data.choices[0].message.content;

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
