// ========== Touch Event Handlers for Mobile ==========
window.iPUP_TouchHandler = {
    /**
     * Initialize touch event handlers for mobile devices
     */
    initTouchEvents(scene, camera, raycaster, locationGroup, onTap) {
        let touchStartTime = 0;
        let touchStartX = 0;
        let touchStartY = 0;
        const TAP_THRESHOLD = 300; // milliseconds - increased for better tap detection
        const MOVE_THRESHOLD = 15; // pixels - increased tolerance for mobile

        const handleTouchStart = (event) => {
            touchStartTime = Date.now();
            if (event.touches.length > 0) {
                touchStartX = event.touches[0].clientX;
                touchStartY = event.touches[0].clientY;
            }
        };

        const handleTouchEnd = (event) => {
            const touchEndTime = Date.now();
            const touchDuration = touchEndTime - touchStartTime;

            if (event.changedTouches.length > 0 && touchDuration < TAP_THRESHOLD) {
                const touchEndX = event.changedTouches[0].clientX;
                const touchEndY = event.changedTouches[0].clientY;

                const moveX = Math.abs(touchEndX - touchStartX);
                const moveY = Math.abs(touchEndY - touchStartY);

                // Check if it's a tap (not a drag)
                if (moveX < MOVE_THRESHOLD && moveY < MOVE_THRESHOLD) {
                    const touch = event.changedTouches[0];
                    const mouse = {
                        x: (touch.clientX / window.innerWidth) * 2 - 1,
                        y: -(touch.clientY / window.innerHeight) * 2 + 1,
                    };

                    // Use larger threshold for mobile hit detection
                    raycaster.params.Points = { threshold: 2 };
                    raycaster.setFromCamera(mouse, camera);
                    const intersects = raycaster.intersectObjects(locationGroup.children);

                    if (intersects.length > 0 && onTap) {
                        event.preventDefault();
                        onTap(intersects[0].object);
                    }
                }
            }
        };

        // Add touch event listeners
        window.addEventListener('touchstart', handleTouchStart, { passive: true });
        window.addEventListener('touchend', handleTouchEnd, { passive: false });

        return {
            cleanup: () => {
                window.removeEventListener('touchstart', handleTouchStart);
                window.removeEventListener('touchend', handleTouchEnd);
            },
        };
    },

    /**
     * Prevent default touch behavior on specific elements
     */
    preventDefaultTouch() {
        // Prevent pull-to-refresh on mobile
        document.body.addEventListener(
            'touchmove',
            (e) => {
                // Only prevent if scrolling the main canvas area
                if (e.target === document.body || e.target.tagName === 'CANVAS') {
                    e.preventDefault();
                }
            },
            { passive: false }
        );

        // Prevent double-tap zoom on canvas
        let lastTouchEnd = 0;
        document.addEventListener(
            'touchend',
            (e) => {
                const now = Date.now();
                if (now - lastTouchEnd <= 300) {
                    if (e.target.tagName === 'CANVAS') {
                        e.preventDefault();
                    }
                }
                lastTouchEnd = now;
            },
            { passive: false }
        );
    },

    /**
     * Check if device is touch-enabled
     */
    isTouchDevice() {
        return (
            'ontouchstart' in window ||
            navigator.maxTouchPoints > 0 ||
            navigator.msMaxTouchPoints > 0
        );
    },

    /**
     * Get device type based on screen size
     */
    getDeviceType() {
        const width = window.innerWidth;
        if (width < 768) return 'mobile';
        if (width < 1024) return 'tablet';
        return 'desktop';
    },
};

// Make globally available
window.iPUP_TouchHandler = iPUP_TouchHandler;
