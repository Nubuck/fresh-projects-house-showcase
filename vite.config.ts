import { defineConfig } from 'vite';
import analog from '@analogjs/platform';
import tailwindcss from '@tailwindcss/vite';
import devtoolsJson from 'vite-plugin-devtools-json';
import { copyFileSync, mkdirSync, existsSync } from 'fs';
import { resolve } from 'path';

// Custom plugin to copy data files during build
function copyDataFiles() {
  return {
    name: 'copy-data-files',
    writeBundle() {
      // Ensure the target directory exists
      const targetDir = resolve(process.cwd(), 'dist/server/data');
      if (!existsSync(targetDir)) {
        mkdirSync(targetDir, { recursive: true });
      }

      // Copy each data file
      const dataFiles = ['properties.json', 'rooms.json', 'contacts.json'];
      const sourceDir = resolve(process.cwd(), 'src/server/data');

      dataFiles.forEach(file => {
        const sourcePath = resolve(sourceDir, file);
        const targetPath = resolve(targetDir, file);

        if (existsSync(sourcePath)) {
          copyFileSync(sourcePath, targetPath);
          console.log(`✅ Copied ${file} to dist/server/data/`);
        }
      });
    }
  };
}

export default defineConfig(({ mode }) => ({
  build: {
    target: ['es2020'],
  },
  resolve: {
    mainFields: ['module'],
  },
  plugins: [
    devtoolsJson(),
    analog(),
    tailwindcss(),
    copyDataFiles(), // Add our custom plugin
  ],
  server: {
    watch: {
      ignored: [
        '**/src/server/data/contacts.json',
        '**/node_modules/**',
        '**/dist/**'
      ]
    }
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['src/test-setup.ts'],
    include: ['**/*.spec.ts'],
    reporters: ['default'],
  },
  define: {
    'import.meta.vitest': mode !== 'production',
  },
}));
