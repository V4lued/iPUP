// ========== iPUP Application Entry Point ==========
// Wait for DOM to be ready
document.addEventListener("DOMContentLoaded", function() {
    try {
        // Check if THREE is loaded
        if (typeof THREE === 'undefined') {
            throw new Error("THREE.js is not loaded!");
        }
        
        // Check required THREE components
        if (!THREE.GLTFLoader) throw new Error("GLTFLoader not available!");
        if (!THREE.CSS2DRenderer) throw new Error("CSS2DRenderer not available!");
        if (!THREE.MapControls) throw new Error("MapControls not available!");

        // Get all modules from global scope
        const Scene = window.iPUP_Scene;
        const UI = window.iPUP_UI;
        
        if (!Scene) throw new Error("iPUP_Scene not loaded!");
        if (!UI) throw new Error("iPUP_UI not loaded!");

        // Initialize UI components
        UI.initLoader();
        UI.initSidebar();

        // Initialize 3D scene
        Scene.initScene();
        const { tooltipText, tooltipLabel } = Scene.initTooltip();
        const { mousePosition, raycaster } = Scene.initMouseInteraction(tooltipText, tooltipLabel);

        // Initialize interactions
        Scene.initClickInteraction(mousePosition, raycaster);
        Scene.initRecenterButton();
        UI.initCloseButtons();

        // Initialize favorites
        UI.initFavorites();

        // Initialize window resize handler
        Scene.initResizeHandler();

        // Start animation loop
        Scene.animate();

    } catch (error) {
        
        // Remove loader even if there's an error
        const loader = document.querySelector(".loader");
        if (loader && document.body.contains(loader)) {
            loader.style.display = "none";
        }
        
        // Show error message on page
        document.body.innerHTML = `
            <div style="
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                height: 100vh;
                background: #1a1a1a;
                color: #fff;
                font-family: sans-serif;
                padding: 20px;
                text-align: center;
            ">
                <h1 style="color: #ff6b6b; margin-bottom: 20px;">Application Error</h1>
                <p style="font-size: 18px; margin-bottom: 20px;">${error.message}</p>
                <p style="color: #888; font-size: 14px; margin-bottom: 30px;">
                    Check the browser console (F12) for more details
                </p>
                <button onclick="location.reload()" style="
                    background: #760c0c;
                    color: white;
                    border: none;
                    padding: 12px 24px;
                    font-size: 16px;
                    border-radius: 5px;
                    cursor: pointer;
                ">Reload Page</button>
            </div>
        `;
    }
});
