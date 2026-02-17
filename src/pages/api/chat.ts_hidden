import type { APIRoute } from 'astro';

export const prerender = false;

export const POST: APIRoute = async ({ request, locals }) => {
    let messages;
    try {
        const body = await request.json();
        messages = body.messages;
    } catch (err) {
        return new Response(JSON.stringify({ error: 'Missing or invalid request body' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    // Cloudflare Workers runtime uses locals.runtime.env
    // Astro uses import.meta.env
    const runtime = (locals as any).runtime;
    const GROQ_API_KEY = runtime?.env?.GROQ_API_KEY || import.meta.env.GROQ_API_KEY;

    if (!GROQ_API_KEY) {
        return new Response(JSON.stringify({ error: 'API Key not configured. Add GROQ_API_KEY to your environment.' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    try {
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${GROQ_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'llama-3.3-70b-versatile',
                messages,
                max_tokens: 256,
                temperature: 0.7,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            return new Response(JSON.stringify({ error: errorData.error?.message || 'Groq API error' }), {
                status: response.status,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const data = await response.json();
        return new Response(JSON.stringify(data), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error: any) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
};
