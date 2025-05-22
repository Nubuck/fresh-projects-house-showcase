
// src/server/routes/api/v1/properties.get.ts
import { defineEventHandler } from 'h3';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Helper function to get the correct data path for both dev and production
function getDataPath(filename: string): string {
  // In production, we're running from dist/server/
  // In development, we're running from the project root
  const isDev = process.env['NODE_ENV'] !== 'production';

  if (isDev) {
    // Development: use the source path
    return path.join(process.cwd(), 'src/server/data', filename);
  } else {
    // Production: data files are copied to dist/server/data/
    return path.join(process.cwd(), 'dist/server/data', filename);
  }
}

export default defineEventHandler(() => {
  const filePath = getDataPath('properties.json');
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  return data;
});
