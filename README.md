# iPUP - Interactive PUP Campus Map

Interactive 3D/2D campus map for Polytechnic University of the Philippines.

## Quick Start

**Right-click `index.html` → Open with Live Server**

Or use Python:
```bash
python -m http.server 8080
```

## Features

- 🎨 3D interactive campus map
- 🗺️ 2D Leaflet map with routing
- 🔍 Search locations
- ⭐ Favorites system
- 🌓 Dark mode
- 📱 Mobile responsive

## Technology

- Three.js (3D graphics)
- Leaflet (2D maps)
- GSAP (animations)
- Vanilla JavaScript (no build tools)

All dependencies loaded via CDN - no npm install needed!

## Project Structure

```
iPUP/
├── index.html          # Main entry point
├── public/             # Assets
└── src/
    ├── js/            # JavaScript modules
    │   ├── app.js     # Entry point
    │   ├── scene.js   # 3D scene
    │   ├── ui.js      # UI controls
    │   ├── map.js     # 2D map
    │   ├── config/    # Configuration
    │   └── utils/     # Utilities
    └── styles/        # CSS
```

## License

MIT

