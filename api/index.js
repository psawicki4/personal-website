import { join } from 'path';

export default async (req, res) => {
  const projectRoot = process.cwd();
  const { reqHandler } = await import('../dist/apps/personal-website/server/server.mjs');
  process.env['ASSETS_PATH'] = join(projectRoot, 'dist/apps/personal-website/browser');
  return reqHandler(req, res);
};
