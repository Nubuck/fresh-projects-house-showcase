// src/server/routes/api/v1/properties.get.ts
import { defineEventHandler } from 'h3';
import fs from 'fs';
import path from 'path';

export default defineEventHandler(() => {
  const filePath = path.join(process.cwd(), 'src/server/data/properties.json');
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  return data;
});



