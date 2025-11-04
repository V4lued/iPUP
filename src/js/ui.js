// ========== UI Management ==========
window.iPUP_UI = {
    // Page Loader
    initLoader() {
        const hideLoader = () => {
            const loader = document.querySelector(".loader");
            if (!loader) return;
            
            loader.classList.add("loader--hidden");

            loader.addEventListener("transitionend", () => {
                if (document.body.contains(loader)) {
                    document.body.removeChild(loader);
                }
            });
        };

        window.addEventListener("load", hideLoader);
    },

    // Info Toast Handler
    initSidebar() {
        const infoToast = document.getElementById("infoToast");
        const infoToastClose = document.getElementById("infoToastClose");

        // Close info toast
        if (infoToast && infoToastClose) {
            infoToastClose.addEventListener("click", () => {
                infoToast.classList.remove("active");
            });
        }
    },

    // Search removed per user request
    initSearch() {
        return null;
    },

    // Favorites removed per user request
    initFavorites() {
        // Favorites functionality disabled
    },

    // Close Button Handler
    initCloseButtons() {
        const Helpers = window.iPUP_Helpers;
        const closeButtons = document.querySelectorAll("#closeBtn");

        if (closeButtons.length > 0) {
            closeButtons.forEach((closeButton) => {
                closeButton.addEventListener("click", () => {
                    Helpers.hideContentContainer();
                });
            });
        }
    },
};

// Make globally available
window.iPUP_UI = iPUP_UI;
