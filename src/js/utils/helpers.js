// ========== Helper Functions ==========
window.iPUP_Helpers = {
    /**
     * Check if a point is within the boundary
     */
    isWithinBoundary(point) {
        const BOUNDARY = window.iPUP_CONFIG.BOUNDARY;
        return (
            point.x >= BOUNDARY.minX &&
            point.x <= BOUNDARY.maxX &&
            point.z >= BOUNDARY.minZ &&
            point.z <= BOUNDARY.maxZ
        );
    },

    /**
     * Create a location marker mesh
     */
    createLocationMarker(name, x, y, z) {
        const MARKER_CONFIG = window.iPUP_CONFIG.MARKER;
        
        // Check if mobile device - use larger radius for easier tapping
        const isMobile = window.innerWidth <= 768;
        const radius = isMobile ? MARKER_CONFIG.geometry.mobileRadius : MARKER_CONFIG.geometry.radius;
        
        const geometry = new THREE.SphereGeometry(radius);
        const material = new THREE.MeshBasicMaterial({
            color: MARKER_CONFIG.material.color,
            transparent: true,
            opacity: MARKER_CONFIG.material.opacity.default,
        });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(x, y, z);
        mesh.name = name;
        return mesh;
    },

    /**
     * Set marker opacity
     */
    setMarkerOpacity(mesh, opacity) {
        mesh.material.opacity = opacity;
    },

    /**
     * Get location name from altName
     */
    getLocationName(altName) {
        const location = window.iPUP_LOCATIONS.find((loc) => loc.altName === altName);
        return location ? location.name : "";
    },

    /**
     * Show location info in bottom toast
     */
    showContent(containerId) {
        // Get the container to extract info
        const contentContainer = document.getElementById(containerId);
        if (contentContainer) {
            const infoToast = document.getElementById("infoToast");
            const infoToastTitle = document.getElementById("infoToastTitle");
            const infoToastContent = document.getElementById("infoToastContent");
            
            if (infoToast && infoToastTitle && infoToastContent) {
                // Get title from h2
                const titleElement = contentContainer.querySelector(".main-content h2");
                const descriptionElement = contentContainer.querySelector(".main-content p");
                
                if (titleElement) {
                    infoToastTitle.textContent = titleElement.textContent.trim();
                }
                
                if (descriptionElement) {
                    infoToastContent.textContent = descriptionElement.textContent.trim();
                } else {
                    infoToastContent.textContent = "Explore this campus location on the 3D map.";
                }
                
                infoToast.classList.add("active");
            }
        }
    },

    /**
     * Hide all content containers
     */
    hideContentContainer() {
        const visibleContainer = document.querySelector(".content-container.active");

        if (visibleContainer) {
            visibleContainer.classList.remove("active");
        }
        
        // Close info toast
        const infoToast = document.getElementById("infoToast");
        if (infoToast) {
            infoToast.classList.remove("active");
        }
    },

    /**
     * Display search results
     */
    displaySearchResults(results, resultsBox) {
        const content = results
            .map(
                (item, index) =>
                    `<div class="minimalist-search-item" data-position='${JSON.stringify(item.position)}' data-index='${index}'>
                        <p>${item.name}</p>
                    </div>`
            )
            .join("");

        resultsBox.innerHTML = content || '<div class="no-results">No results found. Try a different search term.</div>';
    },

    /**
     * Create popup content for 2D map markers (without images)
     */
    createPopupContent(title, description) {
        return `
            <div style='text-align: center; color: #760c0c; max-width: 250px;'>
                <h3 style='margin: 0 0 8px 0; font-size: 16px;'>${title}</h3>
                ${
                    description
                        ? `<p style='text-align: left; margin: 0; font-size: 13px; color: #555; line-height: 1.5;'>${description}</p>`
                        : ""
                }
            </div>
        `;
    },

    /**
     * Show info toast for 2D map markers
     */
    showInfoToastForMarker(title, description) {
        const infoToast = document.getElementById("infoToast");
        const infoToastTitle = document.getElementById("infoToastTitle");
        const infoToastContent = document.getElementById("infoToastContent");
        
        if (infoToast && infoToastTitle && infoToastContent) {
            infoToastTitle.textContent = title;
            infoToastContent.textContent = description || "Explore this campus location on the map.";
            infoToast.classList.add("active");
        }
    },
};

// Make globally available
window.iPUP_Helpers = iPUP_Helpers;
