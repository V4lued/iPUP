// ========== Campus Location Data ==========
window.iPUP_LOCATIONS = [
    { name: "North Wing", altName: "NorthWing", position: { x: 33, y: 30, z: 21 } },
    { name: "West Wing", altName: "WestWing", position: { x: 27, y: 30, z: 100 } },
    { name: "East Wing", altName: "EastWing", position: { x: 100, y: 30, z: 67 } },
    { name: "South Wing", altName: "SouthWing", position: { x: 76, y: 30, z: 106 } },
    { name: "Interfaith Chapel", altName: "InterfaithChapel", position: { x: 91, y: 10, z: 5 } },
    { name: "Nutrition and Food Science Building", altName: "Nutrition", position: { x: 132, y: 17, z: 18 } },
    { name: "Campus Development and Maintenance Building", altName: "Maintenance", position: { x: 132, y: 10, z: 85 } },
    { name: "PUP Sta. Mesa Ferry Station", altName: "FerryStation", position: { x: 132, y: 10, z: 130 } },
    { name: "Apolinario Mabini Shrine", altName: "MabiniShrine", position: { x: -8, y: 13, z: -60 } },
    { name: "Souvenir Shop", altName: "SouvenirShop", position: { x: -25, y: 10, z: -76 } },
    { name: "Grandstand", altName: "Grandstand", position: { x: 33, y: 15, z: -76 } },
    { name: "Track and Football Oval", altName: "Oval", position: { x: 75, y: 10, z: -113.5 } },
    { name: "Lagoon", altName: "Lagoon", position: { x: -45, y: 10, z: 5 } },
    { name: "PUP Obelisk", altName: "Obelisk", position: { x: -35, y: 10, z: -31.5 } },
    { name: "Outdoor Basketball/Volleyball and Tennis Court", altName: "BasketballTennis", position: { x: -60, y: 16, z: -84.75 } },
    { name: "Pylon", altName: "Pylon", position: { x: -28, y: 10, z: -181 } },
    { name: "Gymnasium and Sports Center", altName: "Gymnasium", position: { x: -110, y: 17, z: -128 } },
    { name: "Swimming Pool", altName: "SwimmingPool", position: { x: -114, y: 10, z: -56 } },
    { name: "Tahanan ng Alumni", altName: "Alumni", position: { x: -117, y: 12, z: -22 } },
    { name: "Physical Education Building", altName: "PEBuilding", position: { x: -115, y: 15, z: -8 } },
    { name: "Ninoy Aquino Library and Learning Resources Center", altName: "Library", position: { x: -98, y: 15, z: 59 } },
    { name: "Amphitheater", altName: "Amphitheater", position: { x: 3, y: 20, z: 66 } },
    { name: "Laboratory High School", altName: "Highschool", position: { x: -108, y: 15, z: 153 } },
    { name: "Charlie del Rosario Hall", altName: "RosarioHall", position: { x: -57, y: 15, z: 135 } },
];

// Create availableKeywords with favName for backward compatibility
const iPUP_KEYWORDS = iPUP_LOCATIONS.map((location) => ({
    ...location,
    favName: `${location.altName}-container-fav`,
    favposition: { ...location.position },
}));

// Make globally available
window.iPUP_LOCATIONS = iPUP_LOCATIONS;
window.iPUP_KEYWORDS = iPUP_KEYWORDS;
