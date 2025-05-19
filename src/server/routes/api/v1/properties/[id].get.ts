// src/server/routes/api/v1/properties/[id].get.ts
import { defineEventHandler, getRouterParam, createError } from 'h3';
import fs from 'fs';
import path from 'path';

export default defineEventHandler((event) => {
  const id = getRouterParam(event, 'id');
  const filePath = path.join(process.cwd(), 'src/server/data/properties.json');
  const properties = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  const property = properties.find((p: { id: string }) => p.id === id);
  if (!property) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Property not found'
    });
  }

  return property;
});
