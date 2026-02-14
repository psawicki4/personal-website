import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const envFiles = [
  'apps/personal-website/src/environments/environment.ts',
  'apps/personal-website/src/environments/environment.development.ts',
];

envFiles.forEach((file) => {
  const filePath = join(process.cwd(), file);
  try {
    let content = readFileSync(filePath, 'utf8');
    if (content.includes("geminiApiKey: '") && !content.includes("geminiApiKey: ''")) {
      content = content.replace(/geminiApiKey: '.*'/, "geminiApiKey: ''");
      writeFileSync(filePath, content);
      console.log(`API Key cleaned up successfully from ${file}`);
    }
  } catch (error) {
    console.error(`Error cleaning up API Key in ${file}:`, error);
  }
});
