import { execSync } from 'child_process';
import ffmpegPath from 'ffmpeg-static';
import path from 'path';
import fs from 'fs';

const thumbsDir = path.join(process.cwd(), 'public', 'images', 'video-thumbnails');
if (!fs.existsSync(thumbsDir)) {
  fs.mkdirSync(thumbsDir, { recursive: true });
}

const videos = [
  { input: 'about-video.mp4', output: 'about-video.jpeg' },
  { input: 'vision-2030.mp4', output: 'vision-2030.jpeg' }
];

for (const v of videos) {
  const inputFile = path.join(process.cwd(), 'public', v.input);
  const outputFile = path.join(thumbsDir, v.output);
  if (fs.existsSync(inputFile)) {
    execSync(`"${ffmpegPath}" -i "${inputFile}" -ss 00:00:01 -vframes 1 "${outputFile}" -y`);
    console.log(`Extracted thumbnail for ${v.input} -> ${v.output}`);
  }
}
