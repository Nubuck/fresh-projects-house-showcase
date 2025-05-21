
// src/server/routes/api/v1/contact.get.ts
import { defineEventHandler } from 'h3';
import fs from 'fs';
import path from 'path';

export default defineEventHandler(() => {
  const filePath = path.join(process.cwd(), 'src/server/data/contacts.json');

  // Create file if it doesn't exist
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify([], null, 2));
  }

  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  return data;
});
