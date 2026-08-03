import { execSync } from 'child_process';
import ffmpegPath from 'ffmpeg-static';
import path from 'path';

const inputFile = path.join(process.cwd(), 'public', 'the-close-up.mp4');
const outputFile = path.join(process.cwd(), 'public', 'images', 'video-thumbnails', 'the-close-up.jpeg');

execSync(`"${ffmpegPath}" -i "${inputFile}" -ss 00:00:01 -vframes 1 "${outputFile}" -y`);
console.log('Successfully extracted real frame thumbnail!');
