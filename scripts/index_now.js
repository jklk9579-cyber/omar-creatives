import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';

const keyContent = process.env.GOOGLE_INDEXING_SERVICE_ACCOUNT;
const SITE_URL = 'https://omarcreatives.com';

async function indexLatestPost() {
    if (!keyContent) {
        console.error('GOOGLE_INDEXING_SERVICE_ACCOUNT secret is missing.');
        process.exit(1);
    }

    try {
        const key = JSON.parse(keyContent);
        const jwtClient = new google.auth.JWT(
            key.client_email,
            null,
            key.private_key,
            ['https://www.googleapis.com/auth/indexing'],
            null
        );

        await jwtClient.authorize();

        // Get the most recent blog post file
        const blogDir = path.join('src', 'content', 'blog');
        const files = fs.readdirSync(blogDir)
            .filter(f => f.endsWith('.md'))
            .sort((a, b) => fs.statSync(path.join(blogDir, b)).mtime.getTime() - fs.statSync(path.join(blogDir, a)).mtime.getTime());

        if (files.length === 0) {
            console.log('No blog posts found to index.');
            return;
        }

        const latestFile = files[0];
        // Extract slug from filename: YYYY-MM-DD-HHMM-slug.md
        const slugMatch = latestFile.match(/\d{4}-\d{2}-\d{2}-\d{4}-(.+)\.md$/);
        const slug = slugMatch ? slugMatch[1] : latestFile.replace('.md', '');

        const urlToIndex = `${SITE_URL}/blog/${slug}/`;
        console.log(`Notifying Google about URL: ${urlToIndex}`);

        const indexing = google.indexing('v3');
        const response = await indexing.urlNotifications.publish({
            auth: jwtClient,
            requestBody: {
                url: urlToIndex,
                type: 'URL_UPDATED',
            },
        });

        console.log('Indexing response:', response.data);
    } catch (error) {
        console.error('Error in indexing script:', error.message);
        process.exit(1);
    }
}

indexLatestPost();
