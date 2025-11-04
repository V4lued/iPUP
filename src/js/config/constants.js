// ========== Configuration Constants ==========
// Global configuration object
window.iPUP_CONFIG = {
    // Camera Configuration
    CAMERA: {
        fov: 35,
        near: 0.1,
        far: 1000,
        initialPosition: { x: 3.2, y: 575, z: 4 },
    },

    // Controls Configuration
    CONTROLS: {
        dampingFactor: 0.02,
        maxPolarAngle: Math.PI / 3.2,
        maxDistance: 575,
        minDistance: 300,
    },

    // Boundary Configuration
    BOUNDARY: {
        minX: -200,
        maxX: 200,
        minZ: -200,
        maxZ: 200,
    },

    // Animation Configuration
    ANIMATION: {
        duration: 1,
        ease: "power2.out",
        topViewPosition: { x: 0, y: 300, z: 0 },
    },

    // Renderer Configuration
    RENDERER: {
        antialias: true,
        clearColor: 0x433d3d,
    },

    // Lighting Configuration
    LIGHTING: {
        ambientLight: {
            color: 0xffffff,
            intensity: 0.6,
        },
        directionalLight: {
            color: 0xffffff,
            intensity: 0.25,
            position: { x: 100, y: 200, z: 100 },
        },
        directionalLight2: {
            color: 0xffffff,
            intensity: 0.15,
            position: { x: -100, y: 150, z: -100 },
        },
    },

    // Marker Configuration
    MARKER: {
        geometry: {
            radius: 2.75,
            mobileRadius: 4.5, // Larger radius for mobile
        },
        material: {
            color: 0xffffff,
            opacity: {
                default: 0.85,
                hover: 1,
            },
        },
        tooltipOffset: 8,
    },
};

// Make it globally available
window.iPUP_CONFIG = iPUP_CONFIG;
