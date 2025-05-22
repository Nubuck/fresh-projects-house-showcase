// src/server/routes/api/v1/contact.post.ts
import { defineEventHandler, readBody } from 'h3';
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

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const filePath = getDataPath('contacts.json');

  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify([], null, 2));
  }

  const contacts = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const newContact = {
    id: generateId(),
    ...body,
    timestamp: new Date().toISOString()
  };

  contacts.push(newContact);
  fs.writeFileSync(filePath, JSON.stringify(contacts, null, 2));

  return newContact;
});
