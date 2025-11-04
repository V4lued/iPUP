// ========== Animation Utilities ==========
window.iPUP_Animations = {
    /**
     * Animate camera to a specific location
     */
    animateToLocation(camera, controls, position, onComplete) {
        const ANIMATION_CONFIG = window.iPUP_CONFIG.ANIMATION;
        controls.enabled = false;

        gsap.to(camera.position, {
            x: ANIMATION_CONFIG.topViewPosition.x,
            y: ANIMATION_CONFIG.topViewPosition.y,
            z: ANIMATION_CONFIG.topViewPosition.z,
            duration: ANIMATION_CONFIG.duration,
            ease: ANIMATION_CONFIG.ease,
            onComplete: () => {
                controls.enabled = true;
                if (onComplete) onComplete();
            },
        });

        gsap.to(controls.target, {
            x: position.x,
            y: position.y,
            z: position.z,
            duration: ANIMATION_CONFIG.duration,
            ease: ANIMATION_CONFIG.ease,
        });
    },

    /**
     * Animate camera to initial/home position
     */
    animateToHome(camera, controls, onComplete) {
        const CAMERA_CONFIG = window.iPUP_CONFIG.CAMERA;
        const ANIMATION_CONFIG = window.iPUP_CONFIG.ANIMATION;
        controls.enabled = false;

        gsap.to(camera.position, {
            x: CAMERA_CONFIG.initialPosition.x,
            y: CAMERA_CONFIG.initialPosition.y,
            z: CAMERA_CONFIG.initialPosition.z,
            duration: ANIMATION_CONFIG.duration,
            ease: ANIMATION_CONFIG.ease,
            onComplete: () => {
                controls.enabled = true;
                if (onComplete) onComplete();
            },
        });

        gsap.to(controls.target, {
            x: 0,
            y: 0,
            z: 0,
            duration: ANIMATION_CONFIG.duration,
            ease: ANIMATION_CONFIG.ease,
        });
    },

    /**
     * Zoom camera to a specific position
     */
    zoomToPosition(camera, controls, position, onComplete) {
        const ANIMATION_CONFIG = window.iPUP_CONFIG.ANIMATION;
        controls.enabled = false;

        gsap.to(camera.position, {
            x: ANIMATION_CONFIG.topViewPosition.x,
            y: ANIMATION_CONFIG.topViewPosition.y,
            z: ANIMATION_CONFIG.topViewPosition.z,
            duration: ANIMATION_CONFIG.duration,
            ease: ANIMATION_CONFIG.ease,
            onComplete: () => {
                controls.enabled = true;
                if (onComplete) onComplete();
            },
        });

        gsap.to(controls.target, {
            x: position.x,
            y: position.y,
            z: position.z,
            duration: ANIMATION_CONFIG.duration,
            ease: ANIMATION_CONFIG.ease,
        });
    },
};

// Make globally available
window.iPUP_Animations = iPUP_Animations;
