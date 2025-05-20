#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

// Get the directory name in ES module context
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration for image processing
const config = {
  // Base directory for source and output
  baseDir: path.resolve(__dirname, '../images'), // Assuming './images' is at project root

  // Source directories containing property images
  sourceDirs: ['property-1', 'property-2'],

  // Output directory for processed images
  outputDir: 'processed-assets',

  // Image size configurations
  sizes: {
    // Thumbnail sizes
    thumbnail: { width: 640, height: 480 },
    thumbnailLow: { width: 320, height: 240 },

    // Room photo sizes
    room: { width: 1200, height: 800 },
    roomLow: { width: 400, height: 267 },

    // Floorplan sizes
    floorplan: { width: 800, height: null } // Height will be calculated to maintain aspect ratio
  },

  // JPEG quality settings
  quality: {
    high: 90, // High-res images
    low: 60   // Low-res images for faster loading
  }
};

/**
 * Creates necessary directories for processed images
 */
function createDirectories() {
  if (!fs.existsSync(path.join(config.baseDir, config.outputDir))) {
    fs.mkdirSync(path.join(config.baseDir, config.outputDir), { recursive: true });
  }

  // Create property-specific output directories
  for (const dir of config.sourceDirs) {
    const propertyDir = path.join(config.baseDir, config.outputDir, dir);
    if (!fs.existsSync(propertyDir)) {
      fs.mkdirSync(propertyDir, { recursive: true });
    }
  }

  console.log('✅ Output directories created');
}

/**
 * Process a floorplan image
 * @param {string} filePath - Path to the source image
 * @param {string} outputDir - Directory to save processed image
 * @param {string} fileName - Base filename without extension
 */
async function processFloorplan(filePath, outputDir, fileName) {
  console.log(`Processing floorplan: ${filePath}`);

  try {
    // Get image metadata to determine dimensions
    const metadata = await sharp(filePath).metadata();

    // Calculate height while maintaining aspect ratio
    let resizeOptions = { ...config.sizes.floorplan };
    if (!resizeOptions.height) {
      const aspectRatio = metadata.height / metadata.width;
      resizeOptions.height = Math.round(resizeOptions.width * aspectRatio);
    }

    // Process and save the floorplan image
    await sharp(filePath)
      .resize(resizeOptions.width, resizeOptions.height)
      .jpeg({ quality: config.quality.high })
      .toFile(path.join(outputDir, `${fileName}.jpg`));

    console.log(`✅ Floorplan processed: ${fileName}.jpg`);
    return true;
  } catch (error) {
    console.error(`❌ Error processing floorplan ${filePath}:`, error);
    return false;
  }
}

/**
 * Process a room image (creates both high and low resolution versions)
 * @param {string} filePath - Path to the source image
 * @param {string} outputDir - Directory to save processed images
 * @param {string} fileName - Base filename without extension
 */
async function processRoomImage(filePath, outputDir, fileName) {
  console.log(`Processing room image: ${filePath}`);

  try {
    // High resolution version
    await sharp(filePath)
      .resize(config.sizes.room.width, config.sizes.room.height, { fit: 'cover' })
      .jpeg({ quality: config.quality.high })
      .toFile(path.join(outputDir, `${fileName}.jpg`));

    // Low resolution version
    await sharp(filePath)
      .resize(config.sizes.roomLow.width, config.sizes.roomLow.height, { fit: 'cover' })
      .jpeg({ quality: config.quality.low })
      .toFile(path.join(outputDir, `${fileName}-low.jpg`));

    console.log(`✅ Room image processed: ${fileName}.jpg and ${fileName}-low.jpg`);
    return true;
  } catch (error) {
    console.error(`❌ Error processing room image ${filePath}:`, error);
    return false;
  }
}

/**
 * Generate thumbnails for properties using the first room image if no thumbnail exists
 */
async function generateThumbnails() {
  for (const propertyDir of config.sourceDirs) {
    const propertyOutputDir = path.join(config.baseDir, config.outputDir, propertyDir);

    // Check if thumbnail already exists
    if (!fs.existsSync(path.join(propertyOutputDir, 'thumbnail.jpg'))) {
      // Find a suitable room image to use as thumbnail
      const files = fs.readdirSync(propertyOutputDir);
      const roomImage = files.find(file =>
        file.match(/^(living-room|bedroom).*\.jpg$/) && !file.includes('-low')
      );

      if (roomImage) {
        try {
          // Generate high-res thumbnail
          await sharp(path.join(propertyOutputDir, roomImage))
            .resize(config.sizes.thumbnail.width, config.sizes.thumbnail.height, { fit: 'cover' })
            .jpeg({ quality: config.quality.high })
            .toFile(path.join(propertyOutputDir, 'thumbnail.jpg'));

          // Generate low-res thumbnail
          await sharp(path.join(propertyOutputDir, roomImage))
            .resize(config.sizes.thumbnailLow.width, config.sizes.thumbnailLow.height, { fit: 'cover' })
            .jpeg({ quality: config.quality.low })
            .toFile(path.join(propertyOutputDir, 'thumbnail-low.jpg'));

          console.log(`✅ Generated thumbnail for ${propertyDir} from ${roomImage}`);
        } catch (error) {
          console.error(`❌ Error generating thumbnail for ${propertyDir}:`, error);
        }
      } else {
        console.warn(`⚠️ No suitable image found for thumbnail in ${propertyDir}`);
      }
    }
  }
}

/**
 * Process all images in a directory
 * @param {string} dirName - Name of the directory to process
 */
async function processDirectory(dirName) {
  console.log(`\nProcessing directory: ${dirName}`);

  const sourceDir = path.join(config.baseDir, dirName);
  const outputDir = path.join(config.baseDir, config.outputDir, dirName);

  // Ensure the directory exists
  if (!fs.existsSync(sourceDir)) {
    console.error(`❌ Source directory not found: ${sourceDir}`);
    return;
  }

  // Read all files in the directory
  const files = fs.readdirSync(sourceDir);
  let processedCount = 0;

  for (const file of files) {
    // Skip non-image files
    if (!file.match(/\.(jpg|jpeg|png)$/i)) continue;

    const filePath = path.join(sourceDir, file);
    const fileNameWithoutExt = path.parse(file).name;

    // Standardize filenames to match the expected output format
    // E.g., "master-bedroom.png" should generate "master-bedroom.jpg" not just "master-bedroom"
    let outputFileName = fileNameWithoutExt;

    // Determine image type and process accordingly
    if (fileNameWithoutExt.includes('floorplan')) {
      const success = await processFloorplan(filePath, outputDir, outputFileName);
      if (success) processedCount++;
    } else {
      const success = await processRoomImage(filePath, outputDir, outputFileName);
      if (success) processedCount++;
    }
  }

  console.log(`Processed ${processedCount} images in ${dirName}`);
}

/**
 * Main function to process all property directories
 */
async function main() {
  console.log('🔍 Starting image processing tool...');
  console.log('Configuration:', JSON.stringify(config, null, 2));

  try {
    // Setup directories
    createDirectories();

    // Process each property directory
    for (const dir of config.sourceDirs) {
      await processDirectory(dir);
    }

    // Generate thumbnails if needed
    await generateThumbnails();

    console.log('\n✨ Image processing complete!');
    console.log(`📁 Processed images are in: ${path.join(config.baseDir, config.outputDir)}`);
  } catch (error) {
    console.error('❌ Error during image processing:', error);
    process.exit(1);
  }
}

// Start processing
main();
