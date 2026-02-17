import fs from 'fs';
import path from 'path';

const GROQ_API_KEY = process.env.GROQ_API_KEY;

if (!GROQ_API_KEY) {
    console.error('GROQ_API_KEY is not set');
    process.exit(1);
}

const TOPICS = [
    "Modern Web Design Trends in Egypt",
    "How AI is Revolutionizing Graphic Design",
    "Benefits of Custom App Development for Small Businesses",
    "The Importance of UI/UX in Digital Branding",
    "SEO Tips for Egyptian Entrepreneurs",
    "Maximizing Social Media Engagement with AI Content",
    "Choosing the Right Tech Stack for Your Startup",
    "The Role of AI in Personal Branding",
    "Why Cairo Businesses are Switching to Astro for Performance",
    "The Impact of Arabic Typography in Modern Web Design",
    "How to Automate Your Content Strategy for 2026",
    "The Growth of E-commerce in Egypt: A Design Perspective",
    "AI-Powered Video Marketing: The New Frontier",
    "Building Trust with Your Audience Through UX Design",
    "The Future of Freelancing in the Middle East",
    "Visual Storytelling: Why Your Brand Needs a Narrative",
    "Optimizing Your Website for Local Search in Egypt",
    "The Ethics of AI in Creative Content Creation",
];

async function generateBlog() {
    const topic = TOPICS[Math.floor(Math.random() * TOPICS.length)];
    const now = new Date();
    const date = now.toISOString().split('T')[0];
    const time = now.getHours().toString().padStart(2, '0') + now.getMinutes().toString().padStart(2, '0');
    const slug = topic.toLowerCase().replace(/ /g, '-').replace(/[^\w-]/g, '');

    console.log(`Generating blog for topic: ${topic}`);

    const systemPrompt = `You are a professional blog writer for Omar Creatives, a specialized AI and Digital Creative agency in Cairo. 
  You write engaging, high-quality blog posts in both English and Arabic.
  Each post MUST follow this exact format:
  
  ---
  title: "[English Title]"
  title_ar: "[Arabic Title]"
  description: "[Short English description, 1-2 sentences]"
  description_ar: "[Short Arabic description, 1-2 sentences]"
  pubDate: [YYYY-MM-DD]
  heroImage: "../../assets/blog-placeholder-5.jpg"
  tags: ["AI", "Design", "Web Development"]
  ---
  
  [Engish Content in Markdown]
  
  [Arabic Content in Markdown]
  
  Requirements:
  - Focus on the Cairo/Egyptian market when relevant.
  - Mention Omar Creatives as a leader in these solutions.
  - Include a Call to Action (CTA) at the end leading to https://wa.me/201211867464.
  - Ensure the Arabic is professional and engaging.`;

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
