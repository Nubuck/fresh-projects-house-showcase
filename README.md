# Fresh Projects House Showcase 🏠

[![Live Demo](https://img.shields.io/badge/Live%20Demo-fresh--spaces.fly.dev-green?style=for-the-badge)](https://fresh-spaces.fly.dev/)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-blue?style=for-the-badge&logo=github)](https://github.com/Nubuck/fresh-projects-house-showcase)

A modern, interactive property showcase application that allows potential buyers to explore homes through interactive floorplans. Built with Angular 19 using the Analog meta-framework, this application demonstrates cutting-edge web development practices for real estate marketplaces.

## 🌟 Features

- **Interactive Floorplans**: Click on rooms to view detailed information and photos
- **Responsive Design**: Optimized for both desktop and mobile devices
- **Server-Side Rendering**: Fast initial load times and SEO optimization
- **Progressive Image Loading**: High and low-resolution images for optimal performance
- **Dark/Light Mode**: Automatic theme switching with user preference persistence
- **Contact Forms**: Property inquiries and viewing scheduling
- **Multiple Properties**: Showcase different property types and layouts
- **Modern UI**: Clean, professional design using Tailwind CSS v4

## 🚀 Live Demo

Visit the live application: **[https://fresh-spaces.fly.dev/](https://fresh-spaces.fly.dev/)**

## 🛠️ Technology Stack

- **Frontend**: Angular 19 with Analog meta-framework
- **Styling**: Tailwind CSS v4 with custom Fresh Projects branding
- **Backend**: Analog API routes with server-side rendering
- **Build Tool**: Vite with optimized bundling
- **Icons**: Tabler Icons via @ng-icons
- **Deployment**: Fly.io with Docker containerization
- **Image Processing**: Custom Node.js CLI tool for optimization

## 📋 Prerequisites

- Node.js 20+ (LTS recommended)
- npm or yarn package manager
- Git

## 🔧 Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Nubuck/fresh-projects-house-showcase.git
   cd fresh-projects-house-showcase
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment** (optional):
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

## 🏃‍♂️ Running the Project

### Development Mode
Start the development server with hot reload:
```bash
npm run dev
```
The application will be available at `http://localhost:5173`

### Development with SSR
To test server-side rendering locally:
```bash
npm run build
npm run start
```

## 🏗️ Building the Project

### Production Build
Create an optimized production build:
```bash
npm run build
```

The built files will be output to the `dist/` directory.

### Build with Analysis
To analyze the bundle size:
```bash
npm run build -- --analyze
```

## 🚢 Deployment

### Deploy to Fly.io

1. **Install Fly.io CLI**:
   ```bash
   # macOS
   brew install flyctl
   
   # Windows (PowerShell)
   iwr https://fly.io/install.ps1 -useb | iex
   
   # Linux
   curl -L https://fly.io/install.sh | sh
   ```

2. **Login to Fly.io**:
   ```bash
   fly auth login
   ```

3. **Deploy the application**:
   ```bash
   fly launch --name your-app-name
   ```

4. **For subsequent deployments**:
   ```bash
   fly deploy
   ```

### Deploy to Other Platforms

The application can also be deployed to:
- **Vercel**: `npm run build` then deploy the `dist/` folder
- **Netlify**: Connect your GitHub repository and set build command to `npm run build`
- **Railway**: Connect GitHub repository with automatic deployments
- **DigitalOcean App Platform**: Deploy directly from GitHub

## 📁 Project Structure

```
fresh-projects-house-showcase/
├── src/
│   ├── app/
│   │   ├── components/          # Reusable UI components
│   │   ├── models/              # TypeScript interfaces
│   │   ├── pages/               # Page components (file-based routing)
│   │   ├── services/            # Data services
│   │   └── app.component.ts     # Root component
│   ├── server/
│   │   ├── data/               # Static JSON data
│   │   └── routes/             # API routes
│   └── styles.css              # Global styles with Tailwind
├── public/
│   └── assets/                 # Static assets (images, etc.)
├── scripts/
│   └── image-processor.js      # CLI tool for image optimization
├── Dockerfile                  # Docker configuration for deployment
├── fly.toml                   # Fly.io deployment configuration
├── tailwind.config.js         # Tailwind CSS configuration
└── vite.config.ts             # Vite/Analog configuration
```

## 🎨 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run test` - Run tests
- `npm run mix` - Generate project overview with Repomix

### Image Processing

The project includes a custom image processor for optimizing property photos:

```bash
node scripts/image-processor.js
```

This tool:
- Converts images to optimized JPG format
- Creates high and low-resolution versions
- Generates property thumbnails
- Optimizes floorplan images

### Adding New Properties

1. Add property images to `public/assets/images/property-{id}/`
2. Update `src/server/data/properties.json` with property details
3. Update `src/server/data/rooms.json` with room information
4. Run the image processor to optimize images

## 🧪 Testing

Run the test suite:
```bash
npm run test
```

For test coverage:
```bash
npm run test:coverage
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Fresh Projects** - For the design inspiration and branding
- **Angular Team** - For the amazing framework
- **Analog Team** - For the excellent meta-framework
- **Tailwind CSS** - For the utility-first CSS framework
- **Fly.io** - For the seamless deployment platform

## 📞 Support

If you have any questions or need help with the project:

- 📧 Open an issue on [GitHub](https://github.com/Nubuck/fresh-projects-house-showcase/issues)
- 🌐 Visit the live demo: [https://fresh-spaces.fly.dev/](https://fresh-spaces.fly.dev/)

---

**Built with ❤️ using Angular 19 and Analog**
