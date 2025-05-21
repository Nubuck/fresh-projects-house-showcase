// src/server/routes/api/v1/contact.post.ts
import { defineEventHandler, readBody } from 'h3';
import fs from 'fs';
import path from 'path';

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const filePath = path.join(process.cwd(), 'src/server/data/contacts.json');

  // Create file if it doesn't exist
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify([], null, 2));
  }

  // Read existing contacts
  const contacts = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  // Create new contact with ID and timestamp
  const newContact = {
    id: generateId(),
    ...body,
    timestamp: new Date().toISOString()
  };

  // Add to contacts array
  contacts.push(newContact);

  // Write back to file
  fs.writeFileSync(filePath, JSON.stringify(contacts, null, 2));

  return newContact;
});
