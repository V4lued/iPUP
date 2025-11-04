// ========== 3D Scene Management ==========
window.iPUP_Scene = {
    renderer: null,
    scene: null,
    camera: null,
    controls: null,
    labelRenderer: null,
    locationGroup: null,
    transitionInProgress: false,
    transitionInProgress_search: false,

    // Initialize the 3D scene
    initScene() {
        const CONFIG = window.iPUP_CONFIG;
        const LOCATIONS = window.iPUP_LOCATIONS;
        const Helpers = window.iPUP_Helpers;

        // Renderer setup
        this.renderer = new THREE.WebGLRenderer({ antialias: CONFIG.RENDERER.antialias });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setClearColor(CONFIG.RENDERER.clearColor);
        
        // Set proper color settings to preserve model colors
        this.renderer.outputEncoding = THREE.sRGBEncoding;
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
        this.renderer.toneMappingExposure = 1.0;
        
        document.body.appendChild(this.renderer.domElement);

        // Scene setup
        this.scene = new THREE.Scene();

        // Camera setup
        this.camera = new THREE.PerspectiveCamera(
            CONFIG.CAMERA.fov,
            window.innerWidth / window.innerHeight,
            CONFIG.CAMERA.near,
            CONFIG.CAMERA.far
        );
        this.camera.position.set(
            CONFIG.CAMERA.initialPosition.x,
            CONFIG.CAMERA.initialPosition.y,
            CONFIG.CAMERA.initialPosition.z
        );

        // Controls setup
        this.controls = new THREE.MapControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = CONFIG.CONTROLS.dampingFactor;
        this.controls.maxPolarAngle = CONFIG.CONTROLS.maxPolarAngle;
        this.controls.maxDistance = CONFIG.CONTROLS.maxDistance;
        this.controls.minDistance = CONFIG.CONTROLS.minDistance;
        this.controls.target.set(0, 0, 0);

        // Label renderer setup
        this.labelRenderer = new THREE.CSS2DRenderer();
        this.labelRenderer.setSize(window.innerWidth, window.innerHeight);
        this.labelRenderer.domElement.style.position = "absolute";
        this.labelRenderer.domElement.style.top = "0px";
        this.labelRenderer.domElement.style.pointerEvents = "none";
        document.body.appendChild(this.labelRenderer.domElement);

        // Lighting - Clean white lighting to preserve model colors
        const ambientLight = new THREE.AmbientLight(
            CONFIG.LIGHTING.ambientLight.color,
            CONFIG.LIGHTING.ambientLight.intensity
        );
        this.scene.add(ambientLight);

        // Directional lights for depth
        const directionalLight = new THREE.DirectionalLight(
            CONFIG.LIGHTING.directionalLight.color,
            CONFIG.LIGHTING.directionalLight.intensity
        );
        directionalLight.position.set(
            CONFIG.LIGHTING.directionalLight.position.x,
            CONFIG.LIGHTING.directionalLight.position.y,
            CONFIG.LIGHTING.directionalLight.position.z
        );
        this.scene.add(directionalLight);

        const directionalLight2 = new THREE.DirectionalLight(
            CONFIG.LIGHTING.directionalLight2.color,
            CONFIG.LIGHTING.directionalLight2.intensity
        );
        directionalLight2.position.set(
            CONFIG.LIGHTING.directionalLight2.position.x,
            CONFIG.LIGHTING.directionalLight2.position.y,
            CONFIG.LIGHTING.directionalLight2.position.z
        );
        this.scene.add(directionalLight2);

        // Create location markers
        this.locationGroup = new THREE.Group();
        LOCATIONS.forEach((location) => {
            const marker = Helpers.createLocationMarker(
                location.altName,
                location.position.x,
                location.position.y,
                location.position.z
            );
            this.locationGroup.add(marker);
        });
        this.scene.add(this.locationGroup);

        // Load 3D model
        const loader = new THREE.GLTFLoader();
        loader.load(
            "public/scene.gltf",
            (gltf) => {
                this.scene.add(gltf.scene);
            },
            undefined,
            (error) => {
                // Continue without the model - markers will still work
            }
        );
    },

    // Initialize tooltip
    initTooltip() {
        const tooltipText = document.createElement("text");
        tooltipText.className = "tooltip";
        const tooltipContainer = document.createElement("div");
        tooltipContainer.appendChild(tooltipText);
        const tooltipLabel = new THREE.CSS2DObject(tooltipContainer);
        this.scene.add(tooltipLabel);

        return { tooltipText, tooltipLabel };
    },

    // Initialize mouse interaction
    initMouseInteraction(tooltipText, tooltipLabel) {
        const CONFIG = window.iPUP_CONFIG;
        const Helpers = window.iPUP_Helpers;
        const mousePosition = new THREE.Vector2();
        const raycaster = new THREE.Raycaster();

        window.addEventListener("mousemove", (event) => {
            mousePosition.x = (event.clientX / window.innerWidth) * 2 - 1;
            mousePosition.y = -(event.clientY / window.innerHeight) * 2 + 1;

            raycaster.setFromCamera(mousePosition, this.camera);
            const intersects = raycaster.intersectObjects(this.locationGroup.children);

            if (intersects.length > 0) {
                const intersectedObject = intersects[0].object;
                const locationName = Helpers.getLocationName(intersectedObject.name);

                if (locationName) {
                    tooltipText.className = "tooltip show";
                    tooltipLabel.position.set(
                        intersectedObject.position.x,
                        intersectedObject.position.y + CONFIG.MARKER.tooltipOffset,
                        intersectedObject.position.z
                    );
                    tooltipText.textContent = locationName;
                    Helpers.setMarkerOpacity(intersectedObject, CONFIG.MARKER.material.opacity.hover);
                }
            } else {
                tooltipText.className = "tooltip hide";
                this.locationGroup.children.forEach((mesh) => {
                    Helpers.setMarkerOpacity(mesh, CONFIG.MARKER.material.opacity.default);
                });
            }
        });

        return { mousePosition, raycaster };
    },

    // Initialize click interaction
    initClickInteraction(mousePosition, raycaster) {
        const KEYWORDS = window.iPUP_KEYWORDS;
        const Helpers = window.iPUP_Helpers;
        const Animations = window.iPUP_Animations;
        const TouchHandler = window.iPUP_TouchHandler;

        const handleInteraction = (intersectedObject) => {
            if (this.transitionInProgress) return;

            const keyword = KEYWORDS.find((kw) => kw.altName === intersectedObject.name);

            if (keyword) {
                const containerId = `${intersectedObject.name}-container`;
                Helpers.showContent(containerId);
                this.transitionInProgress = true;
                Animations.animateToLocation(this.camera, this.controls, intersectedObject.position, () => {
                    this.transitionInProgress = false;
                });
                
            }
        };

        // Expose handleInteraction globally for search to use
        this.triggerLocationInteraction = (position) => {
            if (this.transitionInProgress) return;
            
            // Find the circle at this position
            const circle = this.locationGroup.children.find(child => {
                return child.position.x === position.x && 
                       child.position.y === position.y && 
                       child.position.z === position.z;
            });
            
            if (circle) {
                handleInteraction(circle);
            }
        };

        // Mouse click events
        window.addEventListener("click", (event) => {
            event.preventDefault();
            if (this.transitionInProgress) return;

            raycaster.setFromCamera(mousePosition, this.camera);
            const intersects = raycaster.intersectObjects(this.locationGroup.children);

            if (intersects.length > 0) {
                handleInteraction(intersects[0].object);
            }
        });

        // Touch events for mobile
        if (TouchHandler.isTouchDevice()) {
            TouchHandler.preventDefaultTouch();
            TouchHandler.initTouchEvents(this.scene, this.camera, raycaster, this.locationGroup, (intersectedObject) => {
                handleInteraction(intersectedObject);
            });
        }
    },

    // Initialize recenter button
    initRecenterButton() {
        const Helpers = window.iPUP_Helpers;
        const Animations = window.iPUP_Animations;
        const recenterButton = document.getElementById("recenterButton");

        if (recenterButton) {
            recenterButton.addEventListener("click", () => {
                Helpers.hideContentContainer();
                Animations.animateToHome(this.camera, this.controls);
            });
        }
    },

    // Zoom to position
    handleZoomToPosition(position, onComplete) {
        const Animations = window.iPUP_Animations;
        if (this.transitionInProgress_search) return;

        this.transitionInProgress_search = true;
        Animations.zoomToPosition(this.camera, this.controls, position, () => {
            this.transitionInProgress_search = false;
            if (onComplete) onComplete();
        });
    },

    // Animation loop
    animate() {
        const CONFIG = window.iPUP_CONFIG;
        const Helpers = window.iPUP_Helpers;
        const target = this.controls.target;

        // Restrict panning within boundary
        if (!Helpers.isWithinBoundary(target)) {
            target.x = Math.max(Math.min(target.x, CONFIG.BOUNDARY.maxX), CONFIG.BOUNDARY.minX);
            target.z = Math.max(Math.min(target.z, CONFIG.BOUNDARY.maxZ), CONFIG.BOUNDARY.minZ);
        }

        if (this.controls.enableDamping) {
            this.controls.update();
        }

        this.labelRenderer.render(this.scene, this.camera);
        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(() => this.animate());
    },

    // Initialize resize handler
    initResizeHandler() {
        window.addEventListener("resize", () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
            this.labelRenderer.setSize(window.innerWidth, window.innerHeight);
        });
    }
};

// Make globally available
window.iPUP_Scene = iPUP_Scene;
