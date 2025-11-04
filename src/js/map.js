// ========== 2D Map Management ==========
window.iPUP_Map = {
    initMap() {
        const MAP_CONFIG = window.iPUP_MAP_CONFIG;
        const MARKER_DATA = window.iPUP_MARKER_DATA;
        const Helpers = window.iPUP_Helpers;

        const mapToggle = document.getElementById("mapToggle");
        const mapContainer = document.getElementById("map");
        const mapCloseBtn = document.getElementById("mapCloseBtn");
        const mapRecenterBtn = document.getElementById("mapRecenterBtn");
        const logo = document.querySelector(".minimalist-logo");
        const fabButtons = document.querySelector(".minimalist-fab-container");

        let map = null;
        let markers = {};
        let isMapVisible = localStorage.getItem("isMapVisible") === "true";

        const saveMapVisibility = () => {
            try {
                localStorage.setItem("isMapVisible", isMapVisible.toString());
            } catch (e) {
                // Silently fail if localStorage is not available
            }
        };

        const showRoute = (destination) => {
            if (map._routingControl) {
                map.removeControl(map._routingControl);
            }

            map._routingControl = L.Routing.control({
                waypoints: [markers.entrance.getLatLng(), L.latLng(destination)],
                routeWhileDragging: false,
                createMarker: () => null,
                lineOptions: {
                    styles: [{
                        color: MAP_CONFIG.routeColor,
                        weight: MAP_CONFIG.routeWeight,
                        opacity: MAP_CONFIG.routeOpacity,
                    }],
                },
            }).addTo(map);
        };

        const initializeMap = () => {
            map = L.map("map", { doubleClickZoom: false }).setView(MAP_CONFIG.initialView, MAP_CONFIG.initialZoom);

            // Only use OpenStreetMap
            L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                maxZoom: MAP_CONFIG.maxZoom,
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);

            const mapIcon = L.icon({
                iconUrl: MAP_CONFIG.iconUrl,
                iconSize: MAP_CONFIG.iconSize,
                iconAnchor: MAP_CONFIG.iconAnchor,
                popupAnchor: MAP_CONFIG.popupAnchor,
            });

            map.zoomControl.setPosition("bottomright");

            MARKER_DATA.forEach((markerData) => {
                const marker = L.marker(markerData.coords, { icon: mapIcon })
                    .addTo(map)
                    .bindPopup(Helpers.createPopupContent(markerData.title, markerData.description))
                    .on("click", () => { 
                        showRoute(markerData.coords);
                        // Show info toast like 3D map
                        Helpers.showInfoToastForMarker(markerData.title, markerData.description);
                    });

                markers[markerData.id] = marker;
            });

            map.on("dblclick", () => {
                if (map._routingControl) {
                    map.removeControl(map._routingControl);
                }
            });
        };

        const toggleMapVisibility = () => {
            isMapVisible = !isMapVisible;
            saveMapVisibility();
            
            const controlsLabel = document.querySelector(".controls-label");
            const infoToast = document.getElementById("infoToast");

            if (isMapVisible) {
                // Show 2D map
                mapContainer.style.display = "block";
                mapCloseBtn.classList.add("active");
                mapRecenterBtn.classList.add("active");
                
                // Hide 3D UI elements (but keep info toast available for 2D map markers)
                if (controlsLabel) controlsLabel.style.display = "none";
                if (logo) logo.style.display = "none";
                if (fabButtons) fabButtons.style.display = "none";
                // Don't hide info toast - it's used by 2D map markers too
                
                if (!map) {
                    initializeMap();
                } else {
                    map.invalidateSize();
                }
            } else {
                // Show 3D scene
                mapContainer.style.display = "none";
                mapCloseBtn.classList.remove("active");
                mapRecenterBtn.classList.remove("active");
                
                // Show 3D UI elements
                if (controlsLabel) controlsLabel.style.display = "flex";
                if (logo) logo.style.display = "flex";
                if (fabButtons) fabButtons.style.display = "flex";
                // Info toast remains functional in both modes
            }
        };

        const controlsLabel = document.querySelector(".controls-label");
        const infoToast = document.getElementById("infoToast");
        
        if (isMapVisible) {
            mapContainer.style.display = "block";
            mapCloseBtn.classList.add("active");
            mapRecenterBtn.classList.add("active");
            if (controlsLabel) controlsLabel.style.display = "none";
            if (logo) logo.style.display = "none";
            if (fabButtons) fabButtons.style.display = "none";
            initializeMap();
        } else {
            mapContainer.style.display = "none";
            mapCloseBtn.classList.remove("active");
            mapRecenterBtn.classList.remove("active");
            if (controlsLabel) controlsLabel.style.display = "flex";
        }

        // Map toggle button
        if (mapToggle) {
            mapToggle.addEventListener("click", toggleMapVisibility);
        }
        
        // Close button
        if (mapCloseBtn) {
            mapCloseBtn.addEventListener("click", () => {
                if (isMapVisible) {
                    toggleMapVisibility();
                }
            });
        }
        
        // Recenter button
        if (mapRecenterBtn) {
            mapRecenterBtn.addEventListener("click", () => {
                if (map) {
                    map.setView(MAP_CONFIG.initialView, MAP_CONFIG.initialZoom);
                }
            });
        }
    },
};
