import "./main.js";
import "./2dmap.js";

const darkModeToggle = document.querySelector("#dark-mode-toggle");

const enableDarkMode = () => {
    document.body.classList.add("dark-mode");
    localStorage.setItem("darkMode", "enabled");
};

const disableDarkMode = () => {
    document.body.classList.remove("dark-mode");
    localStorage.removeItem("darkMode");
};

darkModeToggle.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent default anchor behavior
    const darkMode = localStorage.getItem("darkMode");
    if (darkMode !== "enabled") {
        enableDarkMode();
    } else {
        disableDarkMode();
    }
});

// Check if dark mode is enabled when the page loads
const initialDarkMode = localStorage.getItem("darkMode");
if (initialDarkMode === "enabled") {
    enableDarkMode();
}

window.addEventListener("load", () => {
    const loader = document.querySelector(".loader");

    loader.classList.add("loader--hidden");

    loader.addEventListener("transitionend", () => {
        document.body.removeChild(document.querySelector(".loader"));
    });
});

document.addEventListener("DOMContentLoaded", function () {
    var aboutUsLink = document.getElementById("aboutusbtn"); // Corrected id
    aboutUsLink.addEventListener("click", function () {
        window.location.href = "aboutUs.html";
    });
});

const btn = document.querySelector(".sidebar #btn");
const sidebar = document.querySelector(".sidebar");
const searchButton = document.getElementById("searchbtn");
const searchBox = document.querySelector(".search-box");

// Add event listener to the menu bar icon
btn.addEventListener("click", function () {
    // Toggle the sidebar
    sidebar.classList.toggle("active");

    // Check if the search box is visible and hide it
    if (searchBox.classList.contains("active")) {
        searchBox.classList.remove("active");
    }
});

// Add event listener to the search button
searchButton.addEventListener("click", function () {
    // Toggle the search box
    searchBox.classList.toggle("active");

    // Check if the sidebar is active and hide it
    if (sidebar.classList.contains("active")) {
        sidebar.classList.remove("active");
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const bookmarkBtn = document.getElementById("bookmarkbtn");
    const favoriteContainer = document.querySelector(".favorite-container");

    // Hide the favorite container initially
    favoriteContainer.style.transform = "translateX(100%)";
    favoriteContainer.style.opacity = "0";

    // Add click event listener to the bookmark button
    bookmarkBtn.addEventListener("click", function (event) {
        event.preventDefault(); // Prevent default link behavior

        // Toggle the visibility of the favorite container
        if (favoriteContainer.style.transform === "translateX(0%)") {
            // If already visible, hide it
            favoriteContainer.style.transform = "translateX(100%)";
            favoriteContainer.style.opacity = "0";
        } else {
            // If hidden, show it
            favoriteContainer.style.transform = "translateX(0%)";
            favoriteContainer.style.opacity = "1";
        }
    });
});

const closeBtn = document.getElementById("closeFavBtn");
closeBtn.addEventListener("click", function () {
    // Your code to handle the close button click event
    console.log("Close button clicked!");
});
