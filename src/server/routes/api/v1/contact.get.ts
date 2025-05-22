// src/server/routes/api/v1/contact.get.ts
import { defineEventHandler } from 'h3';
import fs from 'fs';
import path from 'path';

function getDataPath(filename: string): string {
  const isDev = process.env['NODE_ENV'] !== 'production';

  if (isDev) {
    return path.join(process.cwd(), 'src/server/data', filename);
  } else {
    return path.join(process.cwd(), 'dist/server/data', filename);
  }
}

export default defineEventHandler(() => {
  const filePath = getDataPath('contacts.json');
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify([], null, 2));
  }
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  return data;
});
