# iPUP - Interactive PUP Campus Map

Interactive 3D campus map for Polytechnic University of the Philippines.

## Quick Start

**Development Server (Recommended):**

Right-click `index.html` → Open with Live Server

**Or use Python:**
```bash
python -m http.server 8080
```

**Or use PowerShell:**
```bash
npm run serve:win
```

Then open: `http://localhost:8080`

## Features

- 🎨 **3D Interactive Campus Map** - Immersive Three.js visualization
- ⭐ **Favorites System** - Save frequently visited locations
- 📱 **Mobile Responsive** - Optimized for all devices
- 🎯 **Touch Support** - Gesture-based navigation
- ℹ️ **Location Information** - Detailed descriptions for each campus location

## Technology Stack

- **Three.js** (r128) - 3D graphics and rendering
- **GSAP** - Smooth animations
- **Vanilla JavaScript** - No framework dependencies
- **CSS3** - Modern responsive styling

**Note:** All dependencies loaded via CDN - no npm install required!

## Project Structure

```
iPUP/
├── index.html              # Main application entry point
├── package.json            # Project metadata & scripts
├── README.md               # This file
├── public/
│   ├── iPUP_logo.png      # Application logo
│   └── scene.gltf         # 3D campus model
└── src/
    ├── js/
    │   ├── app.js         # Application initialization
    │   ├── scene.js       # Three.js 3D scene management
    │   ├── ui.js          # UI controls and interactions
    │   ├── config/
    │   │   ├── constants.js    # Global constants
    │   │   ├── locations.js    # Campus location data
    │   │   └── mapConfig.js    # Map configuration
    │   └── utils/
    │       ├── animations.js   # Animation helpers
    │       ├── helpers.js      # Utility functions
    │       └── touchHandler.js # Touch gesture handling
    └── styles/
        ├── style.css           # Main styles
        ├── responsive.css      # Mobile responsiveness
        └── minimalist-ui.css   # UI component styles
```

## Browser Requirements

- Modern browsers with WebGL support
- Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- Mobile: iOS Safari 14+, Chrome Android 90+

## Development

This is a standalone web application with no build process required. Simply serve the files and start developing.

**Available Scripts:**
- `npm run serve` - Start Python server (Unix/Mac)
- `npm run serve:win` - Start Python server (Windows)
- `npm run start` - Start Live Server

## Author

Made by **Cyrus Severino**

## License

MIT

