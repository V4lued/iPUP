import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { MapControls } from "three/examples/jsm/controls/MapControls.js";
import {
    CSS2DRenderer,
    CSS2DObject,
} from "three/examples/jsm/renderers/CSS2DRenderer";
import gsap from "gsap";

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Sets the color of the background
renderer.setClearColor(0x433d3d); // Change the background color to #433d3d

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    35,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

// Define your boundary coordinates here
const boundary = [
    { x: -200, z: -200 }, // Northeast corner (adjust these values)
    { x: -200, z: 200 }, // Southeast corner
    { x: 200, z: 200 }, // Southwest corner
    { x: 200, z: -200 }, // Northwest corner
    { x: -200, z: -200 }, // Close the polygon (optional)
];

// Sets map control to move the camera around
const controls = new MapControls(camera, renderer.domElement);
controls.enableDamping = true;

// Adjust damping factor for smoother camera movement (default: 0.045)
controls.dampingFactor = 0.02; // You can experiment with values between 0.02 and 0.04

// Optionally enable exponential damping for a smoother transition
// controls.enableDamping = false;  // Uncomment this if using exponential damping

const maxPolarAngle = Math.PI / 3.2;
controls.maxPolarAngle = maxPolarAngle;
controls.maxDistance = 575;
controls.minDistance = 300;
controls.target.set(0, 0, 0);

// Function to check if a point is within the boundary
function isWithinBoundary(point) {
    const minX = boundary[0].x;
    const maxX = boundary[2].x;
    const minZ = boundary[0].z;
    const maxZ = boundary[2].z;

    return (
        point.x >= minX && point.x <= maxX && point.z >= minZ && point.z <= maxZ
    );
}

// Camera positioning
camera.position.set(3.2, 575, 4); // Adjust initial position if needed

function createCpointMesh(name, x, y, z) {
    const geo = new THREE.SphereGeometry(2.75);
    const mat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.5,
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(x, y, z);
    mesh.name = name;
    return mesh;
}

function handleOpacity(mesh, opacity) {
    mesh.material.opacity = opacity;
}

const group = new THREE.Group();

const North_Wing = createCpointMesh("NorthWing", 33, 30, 21);
group.add(North_Wing);

const West_Wing = createCpointMesh("WestWing", 27, 30, 100);
group.add(West_Wing);

const East_Wing = createCpointMesh("EastWing", 100, 30, 67);
group.add(East_Wing);

const South_Wing = createCpointMesh("SouthWing", 76, 30, 106);
group.add(South_Wing);

const Interfaith_Chapel = createCpointMesh("InterfaithChapel", 91, 10, 5);
group.add(Interfaith_Chapel);

const Nutrition = createCpointMesh("Nutrition", 132, 17, 18);
group.add(Nutrition);

const Maintenance = createCpointMesh("Maintenance", 132, 10, 85);
group.add(Maintenance);

const Ferry_Station = createCpointMesh("FerryStation", 132, 10, 130);
group.add(Ferry_Station);

const Mabini_Shrine = createCpointMesh("MabiniShrine", -8, 13, -60);
group.add(Mabini_Shrine);

const Souvenir_Shop = createCpointMesh("SouvenirShop", -25, 10, -76);
group.add(Souvenir_Shop);

const Grandstand = createCpointMesh("Grandstand", 33, 15, -76);
group.add(Grandstand);

const Oval = createCpointMesh("Oval", 75, 10, -113.5);
group.add(Oval);

const Lagoon = createCpointMesh("Lagoon", -45, 10, 5);
group.add(Lagoon);

const Obelisk = createCpointMesh("Obelisk", -35, 10, -31.5);
group.add(Obelisk);

const Basketball_Tennis = createCpointMesh("BasketballTennis", -60, 16, -84.75);
group.add(Basketball_Tennis);

const Pylon = createCpointMesh("Pylon", -28, 10, -181);
group.add(Pylon);

const Gymnasium = createCpointMesh("Gymnasium", -110, 17, -128);
group.add(Gymnasium);

const Swimming_Pool = createCpointMesh("SwimmingPool", -114, 10, -56);
group.add(Swimming_Pool);

const Alumni = createCpointMesh("Alumni", -117, 12, -22);
group.add(Alumni);

const PE_Building = createCpointMesh("PEBuilding", -115, 15, -8);
group.add(PE_Building);

const Library = createCpointMesh("Library", -98, 15, 59);
group.add(Library);

const Amphitheater = createCpointMesh("Amphitheater", 3, 20, 66);
group.add(Amphitheater);

const Highschool = createCpointMesh("Highschool", -108, 15, 153);
group.add(Highschool);

const Rosario_Hall = createCpointMesh("RosarioHall", -57, 15, 135);
group.add(Rosario_Hall);

scene.add(group);

const text = document.createElement("text");
text.className = "tooltip";
const textContainer = document.createElement("div");
textContainer.appendChild(text);
const textPointlabel = new CSS2DObject(textContainer);

scene.add(textPointlabel);

const mousePos = new THREE.Vector2();
const raycaster = new THREE.Raycaster();

window.addEventListener("mousemove", function (e) {
    mousePos.x = (e.clientX / window.innerWidth) * 2 - 1;
    mousePos.y = -(e.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mousePos, camera);
    const intersects = raycaster.intersectObjects(group.children);

    if (intersects.length > 0) {
        const intersectedObject = intersects[0].object;

        switch (intersectedObject.name) {
            case "NorthWing":
            case "WestWing":
            case "EastWing":
            case "SouthWing":
            case "InterfaithChapel":
            case "Nutrition":
            case "Maintenance":
            case "FerryStation":
            case "MabiniShrine":
            case "SouvenirShop":
            case "Grandstand":
            case "Oval":
            case "Lagoon":
            case "Obelisk":
            case "BasketballTennis":
            case "Pylon":
            case "Gymnasium":
            case "SwimmingPool":
            case "Alumni":
            case "PEBuilding":
            case "Library":
            case "Amphitheater":
            case "Highschool":
            case "RosarioHall":
                text.className = "tooltip show";
                textPointlabel.position.set(
                    intersectedObject.position.x,
                    intersectedObject.position.y + 8,
                    intersectedObject.position.z
                );
                text.textContent = getDescription(intersectedObject.name);
                handleOpacity(intersectedObject, 1); // Set opacity to 1 for the hovered sphere
                break;

            default:
                break;
        }
    } else {
        text.className = "tooltip hide";
        // Reset opacity for all spheres when mouse is not over any sphere
        group.children.forEach((mesh) => {
            handleOpacity(mesh, 0.5);
        });
    }
});

let transitionInProgress = false;

window.addEventListener("click", function (e) {
    e.preventDefault();
    if (transitionInProgress) return; // If transition is already in progress, do nothing
    raycaster.setFromCamera(mousePos, camera);
    const intersects = raycaster.intersectObjects(group.children);

    if (intersects.length > 0) {
        const intersectedObject = intersects[0].object;
        const keyword = availableKeywords.find(
            (kw) => kw.altName === intersectedObject.name
        );

        if (keyword) {
            // Show or hide the content container corresponding to the clicked object
            const containerId = `${intersectedObject.name}-container`;
            showContent(containerId);

            // Animation code for all cases
            transitionInProgress = true; // Set transition flag to true
            const topViewPosition = { x: 0, y: 300, z: 0 };
            gsap.to(camera.position, {
                x: topViewPosition.x,
                y: topViewPosition.y,
                z: topViewPosition.z,
                duration: 1, // Duration of the transition (in seconds)
                ease: "power2.out", // Easing function for smooth transition
                onComplete: function () {
                    // Enable camera controls after transition is complete
                    controls.enabled = true;
                    transitionInProgress = false; // Reset transition flag
                },
            });
            // Disable camera controls during transition
            controls.enabled = false;
            gsap.to(controls.target, {
                x: intersectedObject.position.x,
                y: intersectedObject.position.y,
                z: intersectedObject.position.z,
                duration: 1, // Duration of the transition (in seconds)
                ease: "power2.out", // Easing function for smooth transition
            });

            // Update the search bar with the name of the clicked sphere
            inputBox.value = keyword.name;
        }
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const recenterButton = document.getElementById("recenterButton");

    recenterButton.addEventListener("click", function () {
        // Hide visible content container if exists
        hideContentContainer();

        // Disable camera controls during transition
        controls.enabled = false;

        // Move the camera to position (0, 550, 0)
        const topViewPosition = { x: 3.2, y: 575, z: 4 };
        gsap.to(camera.position, {
            x: topViewPosition.x,
            y: topViewPosition.y,
            z: topViewPosition.z,
            duration: 1, // Duration of the transition (in seconds)
            ease: "power2.out", // Easing function for smooth transition
            onComplete: function () {
                // Enable camera controls after transition is complete
                controls.enabled = true;
            },
        });

        // Optionally, update the controls target
        gsap.to(controls.target, {
            x: 0,
            y: 0,
            z: 0,
            duration: 1, // Duration of the transition (in seconds)
            ease: "power2.out", // Easing function for smooth transition
        });

        // Optionally, perform other actions related to your application logic
    });
});

// Helper function to get description for each sphere
function getDescription(name) {
    switch (name) {
        case "NorthWing":
            return "North Wing";
        case "WestWing":
            return "West Wing";
        case "EastWing":
            return "East Wing";
        case "SouthWing":
            return "South Wing";
        case "InterfaithChapel":
            return "Interfaith Chapel";
        case "Nutrition":
            return "Nutrition and Food Science Building";
        case "Maintenance":
            return "Campus Development and Maintenance Building";
        case "FerryStation":
            return "PUP Sta. Mesa Ferry Station";
        case "MabiniShrine":
            return "Apolinario Mabini Shrine";
        case "SouvenirShop":
            return "Souvenir Shop";
        case "Grandstand":
            return "Grandstand";
        case "Oval":
            return "Track and Football Oval";
        case "Lagoon":
            return "Lagoon";
        case "Obelisk":
            return "PUP Obelisk";
        case "BasketballTennis":
            return "Outdoor Basketball/Volleyball and Tennis Court";
        case "Pylon":
            return "Pylon";
        case "Gymnasium":
            return "Gymnasium and Sports Center";
        case "SwimmingPool":
            return "Swimming Pool";
        case "Alumni":
            return "Tahanan ng Alumni";
        case "PEBuilding":
            return "Physical Education Building";
        case "Library":
            return "Ninoy Aquino Library and Learning Resources Center";
        case "Amphitheater":
            return "Amphitheater";
        case "Highschool":
            return "Laboratory High School";
        case "RosarioHall":
            return "Charlie del Rosario Hall";
        default:
            return "";
    }
}

const loader = new GLTFLoader();
loader.load("scene.gltf", function (gltf) {
    const model = gltf.scene;
    scene.add(model);
});

const labelRenderer = new CSS2DRenderer();
labelRenderer.setSize(window.innerWidth, window.innerHeight);
labelRenderer.domElement.style.position = "absolute";
labelRenderer.domElement.style.top = "0px";
labelRenderer.domElement.style.pointerEvents = "none";
document.body.appendChild(labelRenderer.domElement);

// Ambient Light
const light = new THREE.AmbientLight(0xffffff, 1.5);
scene.add(light);

function animate() {
    const target = controls.target; // Get the current target

    // Restrict panning based on boundary
    if (!isWithinBoundary(target)) {
        // Clamp target coordinates within boundary
        target.x = Math.max(Math.min(target.x, boundary[2].x), boundary[0].x);
        target.z = Math.max(Math.min(target.z, boundary[2].z), boundary[0].z);
    }

    // Check

    if (controls.enableDamping) {
        // Apply damping
        controls.update();
    }

    labelRenderer.render(scene, camera);

    renderer.render(scene, camera);

    // Request animation frame
    requestAnimationFrame(animate);
}

// Start animation
animate();

window.addEventListener("resize", function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    labelRenderer.setSize(window.innerWidth, window.innerHeight);
});

let availableKeywords = [
    {
        name: "North Wing",
        altName: "NorthWing",
        favName: "NorthWing-container-fav",
        position: { x: 33, y: 30, z: 21 },
        favposition: { x: 33, y: 30, z: 21 },
    },
    {
        name: "West Wing",
        altName: "WestWing",
        favName: "WestWing-container-fav",
        position: { x: 27, y: 30, z: 100 },
        favposition: { x: 27, y: 30, z: 100 },
    },
    {
        name: "East Wing",
        altName: "EastWing",
        favName: "EastWing-container-fav",
        position: { x: 100, y: 30, z: 67 },
        favposition: { x: 100, y: 30, z: 67 },
    },
    {
        name: "South Wing",
        altName: "SouthWing",
        favName: "SouthWing-container-fav",
        position: { x: 76, y: 30, z: 106 },
        favposition: { x: 76, y: 30, z: 106 },
    },
    {
        name: "Interfaith Chapel",
        altName: "InterfaithChapel",
        favName: "InterfaithChapel-container-fav",
        position: { x: 91, y: 10, z: 5 },
        favposition: { x: 91, y: 10, z: 5 },
    },
    {
        name: "Nutrition and Food Science Building",
        altName: "Nutrition",
        favName: "Nutrition-container-fav",
        position: { x: 132, y: 17, z: 18 },
        favposition: { x: 132, y: 17, z: 18 },
    },
    {
        name: "Campus Development and Maintenance Building",
        altName: "Maintenance",
        favName: "Maintenance-container-fav",
        position: { x: 132, y: 10, z: 85 },
        favposition: { x: 132, y: 10, z: 85 },
    },
    {
        name: "PUP Sta. Mesa Ferry Station",
        altName: "FerryStation",
        favName: "FerryStation-container-fav",
        position: { x: 132, y: 10, z: 130 },
        favposition: { x: 132, y: 10, z: 130 },
    },
    {
        name: "Apolinario Mabini Shrine",
        altName: "MabiniShrine",
        favName: "MabiniShrine-container-fav",
        position: { x: -8, y: 13, z: -60 },
        favposition: { x: -8, y: 13, z: -60 },
    },
    {
        name: "Souvenir Shop",
        altName: "SouvenirShop",
        favName: "SouvenirShop-container-fav",
        position: { x: -25, y: 10, z: -76 },
        favposition: { x: -25, y: 10, z: -76 },
    },
    {
        name: "Grandstand",
        altName: "Grandstand",
        favName: "Grandstand-container-fav",
        position: { x: 33, y: 15, z: -76 },
        favposition: { x: 33, y: 15, z: -76 },
    },
    {
        name: "Track and Football Oval",
        altName: "Oval",
        favName: "Oval-container-fav",
        position: { x: 75, y: 10, z: -113.5 },
        favposition: { x: 75, y: 10, z: -113.5 },
    },
    {
        name: "Lagoon",
        altName: "Lagoon",
        favName: "Lagoon-container-fav",
        position: { x: -45, y: 10, z: 5 },
        favposition: { x: -45, y: 10, z: 5 },
    },
    {
        name: "PUP Obelisk",
        altName: "Obelisk",
        favName: "Obelisk-container-fav",
        position: { x: -35, y: 10, z: -31.5 },
        favposition: { x: -35, y: 10, z: -31.5 },
    },
    {
        name: "Outdoor Basketball/Volleyball and Tennis Court",
        altName: "BasketballTennis",
        favName: "BasketballTennis-container-fav",
        position: { x: -60, y: 16, z: -84.75 },
        favposition: { x: -60, y: 16, z: -84.75 },
    },
    {
        name: "Pylon",
        altName: "Pylon",
        favName: "Pylon-container-fav",
        position: { x: -28, y: 10, z: -181 },
        favposition: { x: -28, y: 10, z: -181 },
    },
    {
        name: "Gymnasium and Sports Center",
        altName: "Gymnasium",
        favName: "Gymnasium-container-fav",
        position: { x: -110, y: 17, z: -128 },
        favposition: { x: -110, y: 17, z: -128 },
    },
    {
        name: "Swimming Pool",
        altName: "SwimmingPool",
        favName: "SwimmingPool-container-fav",
        position: { x: -114, y: 10, z: -56 },
        favposition: { x: -114, y: 10, z: -56 },
    },
    {
        name: "Tahanan ng Alumni",
        altName: "Alumni",
        favName: "Alumni-container-fav",
        position: { x: -117, y: 12, z: -22 },
        favposition: { x: -117, y: 12, z: -22 },
    },
    {
        name: "Physical Education Building",
        altName: "PEBuilding",
        favName: "PEBuilding-container-fav",
        position: { x: -115, y: 15, z: -8 },
        favposition: { x: -115, y: 15, z: -8 },
    },
    {
        name: "Ninoy Aquino Library and Learning Resources Center",
        altName: "Library",
        favName: "Library-container-fav",
        position: { x: -98, y: 15, z: 59 },
        favposition: { x: -98, y: 15, z: 59 },
    },
    {
        name: "Amphitheater",
        altName: "Amphitheater",
        favName: "Amphitheater-container-fav",
        position: { x: 3, y: 20, z: 66 },
        favposition: { x: 3, y: 20, z: 66 },
    },

    {
        name: "Laboratory High School",
        altName: "Highschool",
        favName: "Highschool-container-fav",
        position: { x: -108, y: 15, z: 153 },
        favposition: { x: -108, y: 15, z: 153 },
    },
    {
        name: "Charlie del Rosario Hall",
        altName: "RosarioHall",
        favName: "RosarioHall-container-fav",
        position: { x: -57, y: 15, z: 135 },
        favposition: { x: -57, y: 15, z: 135 },
    },
];

const resultsBox = document.querySelector(".result-box");
const inputBox = document.getElementById("input-box");
let selectedIndex = -1;

inputBox.onkeyup = function (event) {
    let result = [];
    let input = inputBox.value;
    if (input.length) {
        result = availableKeywords.filter((keyword) => {
            return keyword.name.toLowerCase().includes(input.toLowerCase());
        });
    }
    display(result);

    if (!result.length) {
        resultsBox.innerHTML = "";
    }
};

function display(result) {
    const content = result.map((item, index) => {
        return (
            "<li data-position='" +
            JSON.stringify(item.position) +
            "' data-index='" +
            index +
            "'>" +
            item.name +
            "</li>"
        );
    });

    resultsBox.innerHTML = "<ul>" + content.join("") + "</ul>";
}

function updateSearchBar(item) {
    inputBox.value = item.innerText;
    selectedIndex = item.getAttribute("data-index");
    inputBox.focus();
    // Clear the results box after updating the search bar
    resultsBox.innerHTML = "";

    // Find the keyword object corresponding to the selectedIndex
    const keyword = availableKeywords.find((kw) => kw.name === item.innerText);
    if (keyword) {
        showContent(`${keyword.altName}-container`);
    }
}

// Add event listener for click events on the document
document.addEventListener("click", function (event) {
    // Check if the clicked element is a list item
    if (event.target.tagName === "LI") {
        const position = JSON.parse(event.target.getAttribute("data-position"));
        zoomToPosition(position);
        updateSearchBar(event.target); // Update the search bar with the clicked item
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const favoritesList = document.getElementById("favoritesList");
    const clearButton = document.querySelector(".clear"); // Get the clear button

    // Function to toggle visibility of a list item
    function toggleListItem(containerId) {
        const listItem = document.getElementById(containerId);
        if (listItem) {
            listItem.style.display =
                listItem.style.display === "none" ? "block" : "none";
        }
    }

    // Bookmark buttons click event listener
    const bookmarkButtons = document.querySelectorAll(
        ".content-header .fa-bookmark"
    );
    bookmarkButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            const containerId = button.parentElement.parentElement.id;
            const listItem = document.getElementById(containerId + "-fav");
            if (listItem) {
                toggleListItem(containerId + "-fav"); // Toggle visibility of the corresponding favorite list item
                // Toggle visibility of the bookmark buttons
                const regularButton = button.parentElement.querySelector(
                    ".fa-regular.fa-bookmark"
                );
                const solidButton = button.parentElement.querySelector(
                    ".fa-solid.fa-bookmark"
                );
                regularButton.style.display =
                    regularButton.style.display === "none" ? "block" : "none";
                solidButton.style.display =
                    solidButton.style.display === "none" ? "block" : "none";
            } else {
                const itemName = document
                    .getElementById(containerId)
                    .querySelector("h2").innerText;
                const newListItem = document.createElement("li");
                newListItem.textContent = itemName;
                newListItem.id = containerId + "-fav"; // Use the same ID convention as in the favorite list
                favoritesList.appendChild(newListItem); // Add the new favorite list item

                // Show the solid bookmark button
                const solidButton = button.parentElement.querySelector(
                    ".fa-solid.fa-bookmark"
                );
                solidButton.style.display = "block";
                // Hide the regular bookmark button
                button.style.display = "none";
            }
        });
    });

    // Initially hide all list items and set bookmark buttons visibility
    favoritesList.querySelectorAll("li").forEach(function (listItem) {
        listItem.style.display = "none";
    });
    const regularBookmarkIcons = document.querySelectorAll(
        ".fa-regular.fa-bookmark"
    );
    regularBookmarkIcons.forEach(function (icon) {
        icon.style.display = "block";
    });
    const solidBookmarkIcons = document.querySelectorAll(
        ".fa-solid.fa-bookmark"
    );
    solidBookmarkIcons.forEach(function (icon) {
        icon.style.display = "none";
    });

    // Event listener for clicking on favorite list items
    favoritesList.addEventListener("click", function (event) {
        // Check if the clicked element is a list item within the favorites list
        if (event.target.tagName === "LI") {
            const containerId = event.target.id; // Get the ID of the clicked list item
            const keyword = availableKeywords.find(
                (k) => k.favName === containerId
            ); // Find the corresponding keyword object
            if (keyword && keyword.favposition) {
                // Check if keyword and favposition are not null
                const favPosition = keyword.favposition; // Get the favposition of the keyword
                zoomToPosition(favPosition);
                updateSearchBar(event.target); // Update the search bar with the clicked item
            } else {
                console.log(
                    "Keyword or favposition not found for list item:",
                    containerId
                );
            }
        }
    });

    // Event listener for the "Clear all" button
    clearButton.addEventListener("click", function () {
        // Remove all list items from the favorites list
        favoritesList.innerHTML = "";

        // Toggle visibility of bookmark buttons
        regularBookmarkIcons.forEach(function (icon) {
            icon.style.display = "block";
        });
        solidBookmarkIcons.forEach(function (icon) {
            icon.style.display = "none";
        });
    });
});

let transitionInProgress_search = false; // Flag to track if a transition is in progress

function zoomToPosition(position) {
    // Check if a transition is already in progress
    if (transitionInProgress_search) {
        return; // Do nothing if a transition is already in progress
    }

    // Set transition flag to true to indicate that a transition is in progress
    transitionInProgress_search = true;

    const topViewPosition = { x: 0, y: 300, z: 0 };
    gsap.to(camera.position, {
        x: topViewPosition.x,
        y: topViewPosition.y,
        z: topViewPosition.z,
        duration: 1, // Duration of the transition (in seconds)
        ease: "power2.out", // Easing function for smooth transition
        onComplete: function () {
            // Enable camera controls after transition is complete
            controls.enabled = true;
            transitionInProgress_search = false; // Reset transition flag
        },
    });

    // Disable camera controls during transition
    controls.enabled = false;

    // Tween camera's target position to focus on the specified position
    gsap.to(controls.target, {
        x: position.x,
        y: position.y,
        z: position.z,
        duration: 1, // Duration of the transition (in seconds)
    });
}

function showContent(containerId) {
    // Hide all content containers
    const allContainers = document.querySelectorAll(".content-container");
    allContainers.forEach((container) => {
        container.classList.remove("active"); // Remove the "active" class from all containers
    });

    // Show the content container corresponding to the clicked object
    const contentContainer = document.getElementById(containerId);
    if (contentContainer) {
        contentContainer.classList.add("active"); // Add the "active" class to show the container
    }
}

const closeButtons = document.querySelectorAll("#closeBtn");

if (closeButtons.length > 0) {
    // Check if any elements were found
    closeButtons.forEach((closeButton) => {
        closeButton.addEventListener("click", hideContentContainer);
    });
} else {
    console.warn("No elements found with ID 'closeBtn'"); // Inform about missing elements
}

function hideContentContainer() {
    const visibleContainer = document.querySelector(
        ".content-container.active"
    );

    if (visibleContainer) {
        visibleContainer.classList.remove("active");
        // Clear the value of the search box
        inputBox.value = "";
    } else {
        console.log("No visible content container to hide.");
    }
}
