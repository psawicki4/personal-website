import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const envFilePath = join(process.cwd(), 'apps/personal-website/src/environments/environment.ts');
const apiKey = process.env.GEMINI_API_KEY;

if (apiKey) {
  try {
    let content = readFileSync(envFilePath, 'utf8');
    content = content.replace(/geminiApiKey: '.*'/, `geminiApiKey: '${apiKey}'`);
    writeFileSync(envFilePath, content);
    console.log('API Key injected successfully.');
  } catch (error) {
    console.error('Error injecting API Key:', error);
    process.exit(1);
  }
} else {
  console.warn('GEMINI_API_KEY not found in environment variables. Skipping injection.');
}
