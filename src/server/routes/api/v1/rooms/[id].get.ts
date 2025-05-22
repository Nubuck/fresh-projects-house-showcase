// src/server/routes/api/v1/rooms/[id].get.ts
import { defineEventHandler, getRouterParam, createError } from 'h3';
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

export default defineEventHandler((event) => {
  const id = getRouterParam(event, 'id');
  const filePath = getDataPath('rooms.json');
  const rooms = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const room = rooms.find((r: { id: string }) => r.id === id);

  if (!room) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Room not found'
    });
  }

  return room;
});
