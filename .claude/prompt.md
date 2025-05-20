In this chat we will elevate the Fresh Projects House Showcase application to the next level by branding the app Fresh Places, enhance the app layout to look more like a simplified modern real estate website than a sample project and we will add 1 more property to the application.

I have generated a second floor plan and room images for a second property because a single property is not enough to showcase the application's capabilities. 

I have attached the 2 property floorplans: floorplan1.jpg and floorplan2.jpg. Floorplan1.jpg is a horizontally oriented image while floorplan2.jpg is a vertically oriented image.  Please use floorplan1.jpg for property-1 and floorplan2.jpg for property-2. 

Let's start with data and asset preparation:

Floorplan 1 is a 1 bedroom 1 bathroom apartment unit with a kitchen, balcony and living room. The images provided for the assessment indicate is quite upmarket with a more classical finish - modern kitchen and bathroom but rustic feel in the bedrooms and living room

Floorplan 2 is a 3 bedroom 2 bathroom apartment in an upscale modern and minimalist building complex. The kitchen is open plan to the living room and flows into the balcony. The shared space garden of the complex has beautiful gardens for luxurious and stylish living.

The images for floorplan 1 are all jpgs while the images for floorplan 2 are all png because I used AI to generate them.

Now part of the assessment challenge is performance optimization, and with online stores and real estate sites loading time is important.
To address this please help with the following:

- Generate fresh property data for the 2 properties in JSON format that includes all the details needed to populate the application.  
  - Include a description of the property, the price, the address, the number of bedrooms, bathrooms, area, type, and any other relevant details.
  - The most important change here is how we handle the images, we need to provision for the floorplan orientation and all other images must have a low res and high res version. the low res version will be served on page load and the high res will be lazy loaded or used in an image viewing component
- Write a cli tool for the project to generate the low res and high res versions of the images, if the image is a png convert it to a jpg.
  - The cli tool will iterate over folders of images, assuming the following structure for example - there maybe bedroom1, bedroom2, etc.:
    - /property-1
      - floorplan.jpg
      - living-room.jpg
      - bedroom.jpg
      - bathroom.jpg
      - balcony.jpg
    - /property-2
      - floorplan.png
      - living-room.png
      - bedroom.png
      - bathroom.png
      - balcony.png
  - The cli tool will resize the images to the sizes and resolutions you recommend for this application

The second important part I need your help with is the image map coordinates for the 2 floorplans.  Please provide the coordinates for the 2 floorplans in JSON format and if you find it difficult to judge where the rooms borders are please recommend a tool I can draw the squares over the rools to extract the x, y, width and height coordinates for the image maps. 
We wont do 2 versions of the floor plan, there will only be 1 resolution so we dont need to adjust the coordinates for different resolutions.

Please ask any clarifying questions you may have and then proceed with the above.
  
---

Images prepared in ./images. I get this error running the script:

$ node scripts/image-processor.js
file:///D:/code/OFFERZEN/FRESH/PROJECT2/house-showcase/scripts/image-processor.js:3
const fs = require('fs');
           ^

ReferenceError: require is not defined in ES module scope, you can use import instead
This file is being treated as an ES module because it has a '.js' file extension and 'D:\code\OFFERZEN\FRESH\PROJECT2\house-showcase\package.json' contains "type": "module". To treat it as a CommonJS script, rename it to use the '.cjs' file extension.
    at file:///D:/code/OFFERZEN/FRESH/PROJECT2/house-showcase/scripts/image-processor.js:3:12
    at ModuleJob.run (node:internal/modules/esm/module_job:222:25)
    at async ModuleLoader.import (node:internal/modules/esm/loader:316:24)
    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:123:5)

Node.js v20.15.1
