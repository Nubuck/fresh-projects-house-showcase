# Fresh Projects House Showcase App - Context Document

## Overview
This document provides a comprehensive overview of the Fresh Projects technical challenge implementation - a single-page web application that showcases properties with interactive floorplans where users can click on rooms to view details. The app is built using Analog (Angular meta-framework), Tailwind CSS v4, and follows modern web development practices.

## Technical Challenge Requirements
- Create a simple web app allowing property sellers to showcase homes to potential buyers
- Single page layout (for each house) including:
  - General property information (title, description, price, address, thumbnail)
  - Interactive floorplan as navigation element
  - Room details loaded when clicking on floorplan areas (name, description, photos)
  - Responsive design for mobile devices
- Provided assets include room photographs and floorplans

## Current Implementation Status
The application has been implemented using Analog (Angular 19) with the following features:
- Landing page showing multiple property listings
- Detailed property page with:
  - Interactive floorplan using image maps
  - Room details panel that updates when clicking on rooms
  - Property statistics display
- API routes to serve static JSON data
- Responsive design using Tailwind CSS v4
- Brand styling from Fresh Projects CSS applied through Tailwind theme extension
- Performance optimization through progressive image loading
- Support for multiple properties with different floorplan orientations

## Technology Stack
- **Frontend**: Angular 19 via Analog meta-framework
- **Styling**: Tailwind CSS v4
- **Backend**: Analog API routes serving static JSON data
- **Routing**: File-based routing through Analog
- **Asset Management**: Optimized static assets with high/low-res versions
- **Image Processing**: Custom Node.js CLI tool for image optimization

## Key Components
1. **Property Card Component**: Displays property summary on the landing page
2. **Floor Plan Component**: Implements the interactive floorplan using image maps, supporting different orientations
3. **Room Details Component**: Shows selected room information and photos
4. **Property Stats Component**: Displays property statistics in a grid layout
5. **Layout Component**: Provides consistent header and footer across pages
6. **Progressive Image Loading**: Improves performance by loading low-res images first

## Data Structure
- **Property Model**: Contains property details (id, title, address, price, etc.) with support for high/low-res images
- **Room Model**: Contains room details (id, name, description, features, photos with high/low-res versions, coordinates)
- **Static JSON**: Stored in server/data folder and served via API routes

## Implementation Decisions
1. **Multiple Properties**: Enhanced the implementation to showcase multiple properties with a landing page listing
2. **Image Maps vs. SVG**: Used HTML image maps for the floorplan instead of SVG for simplicity since JPG floorplans were provided
3. **Static Data**: Using JSON files instead of a database to simplify the implementation while still demonstrating the API pattern
4. **Progressive Loading**: Implemented high/low-res image versions for improved performance
5. **Tailwind v4**: Applied the Fresh Projects brand colors and styling through Tailwind configuration
6. **Different Floorplan Orientations**: Added support for both horizontal and vertical floorplan layouts

## Key Features and Optimizations
1. **Responsive Design**: App works well on mobile and desktop
2. **Brand Consistency**: Uses Fresh Projects color scheme and typography
3. **Component Modularity**: Each component has a single responsibility
4. **API Routes**: Demonstrates fullstack capabilities even with static data
5. **Tailwind Integration**: Custom theme extending Tailwind with brand colors
6. **Image Optimization**: Custom CLI tool for generating optimized images
7. **Progressive Loading**: High/low-res image pairs improve initial load time

## Project Structure
```
/house-showcase
  /src
    /app
      /components      # Reusable UI components
      /models          # TypeScript interfaces
      /pages           # Page components using file-based routing
      /services        # Data services
    /server
      /data            # Static JSON data
      /routes          # API routes for serving data
    /styles.css        # Global styles with Tailwind
  /public
    /assets            # Static assets (images, etc.)
      /images
        /property-1    # Images for first property (optimized high/low res)
        /property-2    # Images for second property (optimized high/low res)
  /scripts
    /image-processor.js # CLI tool for image optimization
  /tailwind.config.js  # Tailwind configuration
  /vite.config.ts      # Vite/Analog configuration
```

## Image Processing
A custom Node.js CLI tool has been developed to optimize images for web performance:
- Converts PNG images to JPG format for better compression
- Creates high-resolution and low-resolution versions of each image
- Optimizes floorplan images for different orientations
- Generates property thumbnails automatically
- Ensures consistent image sizes across properties

## Property Data Structure
The application now supports multiple properties with the following data structure:
- Property 1: 1 bedroom, 1 bathroom apartment with kitchen, living room, and balcony (horizontal floorplan)
- Property 2: 3 bedrooms, 2 bathrooms apartment with open kitchen/living area and balcony (vertical floorplan)

## Next Steps and Potential Enhancements
1. **Animations**: Add smooth transitions when selecting rooms
2. **More Properties**: Add more diverse property types (houses, condos, etc.)
3. **Search/Filter**: Add search and filtering capabilities
4. **Accessibility**: Enhance ARIA attributes and keyboard navigation
5. **Unit Tests**: Add comprehensive tests for components and services
6. **Performance Monitoring**: Add metrics for page load times and interactions
7. **Virtual Tours**: Integrate 3D tour capabilities
8. **Contact Forms**: Add inquiry functionality for interested buyers

This document provides a comprehensive context for the current state of the Fresh Projects House Showcase app and serves as a foundation for future development.
