document.addEventListener("DOMContentLoaded", function () {
    const mapToggle = document.getElementById("mapToggle");
    const mapContainer = document.getElementById("map");

    let map = null; // Variable to store the Leaflet map instance
    let isMapVisible = localStorage.getItem("isMapVisible") !== "true"; // Initial state from local storage

    // Function to save map visibility state to local storage
    function saveMapVisibility() {
        try {
            localStorage.setItem("isMapVisible", isMapVisible.toString()); // Save boolean as string
            console.log(
                "Saved isMapVisible state to localStorage:",
                isMapVisible
            );
        } catch (e) {
            console.error("Error saving to local storage:", e);
        }
    }

    // Function to toggle map visibility
    function toggleMapVisibility() {
        isMapVisible = !isMapVisible; // Toggle the state
        saveMapVisibility(); // Save visibility state to local storage

        if (isMapVisible) {
            // Show the map
            mapContainer.style.display = "block";
            console.log("Map is visible");

            // Initialize Leaflet map if not already initialized
            if (!map) {
                initializeMap(); // Initialize the map
            } else {
                // Ensure the map is resized correctly if already initialized
                map.invalidateSize();
            }
        } else {
            // Hide the map
            mapContainer.style.display = "none";
            console.log("Map is hidden");
        }
    }

    // Function to initialize the Leaflet map
    function initializeMap() {
        // Initialize the map with specific coordinates and zoom level
        map = L.map("map", {
            doubleClickZoom: false, // Disable double click zoom
        }).setView([14.59789, 121.01084], 18);

        // Define OpenStreetMap tile layer
        var OSM = L.tileLayer(
            "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
            {
                maxZoom: 19,
            }
        ).addTo(map);

        // Define Jawg Dark tile layer
        var Jawg_Dark = L.tileLayer(
            "https://tile.jawg.io/jawg-dark/{z}/{x}/{y}{r}.png?access-token=ARO7E8ioLitD7xtxvNL0z5buUU9b1nkaoKUqVgcr5uf4o22cebLRacapcS4yaGii",
            {
                attribution:
                    '<a href="https://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; <b>Jawg</b>Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                maxZoom: 19,
            }
        );

        // Define Jawg Streets tile layer
        var Jawg_Streets = L.tileLayer(
            "https://tile.jawg.io/jawg-streets/{z}/{x}/{y}{r}.png?access-token=ARO7E8ioLitD7xtxvNL0z5buUU9b1nkaoKUqVgcr5uf4o22cebLRacapcS4yaGii",
            {
                attribution:
                    '<a href="https://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; <b>Jawg</b>Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                maxZoom: 19,
            }
        );

        // Define base maps object
        var baseMaps = {
            "Open Street Map": OSM,
            "Jawg Streets": Jawg_Streets,
            "Jawg Dark": Jawg_Dark,
        };

        // Add layer control to the map
        L.control
            .layers(baseMaps, null, { position: "bottomright" })
            .addTo(map);

        // Map Icon
        let mapIcon = L.icon({
            iconUrl:
                "https://cdn-icons-png.flaticon.com/512/14090/14090313.png",
            iconSize: [34, 34],
            iconAnchor: [20, 30],
            popupAnchor: [0, -50],
        });

        map.zoomControl.setPosition("bottomright");

        // Add event listener for recenter button
        document
            .getElementById("recenterButton")
            .addEventListener("click", function () {
                map.setView([14.59789, 121.01084], 18);
            });

        // Function to show route on map
        function showRoute(destination) {
            if (map._routingControl) {
                map.removeControl(map._routingControl);
            }

            map._routingControl = L.Routing.control({
                waypoints: [
                    entrance.getLatLng(), // Entrance coordinates
                    L.latLng(destination), // Destination coordinates
                ],
                routeWhileDragging: false,
                createMarker: function () {
                    return null;
                },
                lineOptions: {
                    styles: [
                        {
                            color: "#760c0c",
                            weight: 6,
                            opacity: 0.75,
                        },
                    ],
                },
            }).addTo(map);
        }

        // Define markers and bind popups
        let entrance = L.marker([14.599167220340236, 121.01184385201297], {
            icon: mapIcon,
        })
            .addTo(map)
            .bindPopup(
                "<div style='text-align: center; color: #760c0c; max-width: 400px;'>" +
                    "<h2 style='text-align: center;'>PUP Main Entrance</h2>" +
                    "<img src='https://drive.google.com/thumbnail?id=1HGKImvwdSMQr3M5JQpY_3Jorv7rde6eA' style='display: block; margin: 10px auto; width: 300px;' />" +
                    "</div>"
            )
            .on("click", function () {
                showRoute([14.599167220340236, 121.01184385201297]);
            });

        let obelisk = L.marker([14.598159, 121.010777], {
            icon: mapIcon,
        })
            .addTo(map)
            .bindPopup(
                "<div style='text-align: center; color: #760c0c; max-width: 400px;'>" +
                    "<h2 style='text-align: center;'>PUP Obelisk</h2>" +
                    "<h4 style='text-align: justify; margin: 0 10px;'>- Long-standing at the core of the campus, it symbolizes the enduring strength of the Polytechnic University of the Philippines as a beacon of higher education, promoting educational and moral aims. Committed to the future, the obelisk stands as an emblem of strength and greatness, immutable against the passage of time.</h4>" +
                    "<img src='https://drive.google.com/thumbnail?id=1JcW23ZOSAtBCWmPcuGTisxEkZIas9iKw' style='display: block; margin: 10px auto; width: 300px;' />" +
                    "</div>"
            )
            .on("click", function () {
                showRoute([14.598159, 121.010777]);
            });

        let mabiniShrine = L.marker([14.598192046540378, 121.01115077736], {
            icon: mapIcon,
        })
            .addTo(map)
            .bindPopup(
                "<div style='text-align: center; color: #760c0c; max-width: 400px;'>" +
                    "<h2 style='text-align: center;'>Apolinario Mabini Shrine</h2>" +
                    "<h4 style='text-align: justify; margin: 0 10px;'>- The fourth relocation site of the Mabini Shrine year 2010 and is declared as its permanent home under the National Historical Institute. It features the things that are once owned by Apolinario Mabini and other memorabilia.</h4>" +
                    "<img src='https://drive.google.com/thumbnail?id=18LOEs2B3vWgOnf419R23BazWlZmv7fmQ' style='display: block; margin: 10px auto; width: 300px;' />" +
                    "</div>"
            )
            .on("click", function () {
                showRoute([14.598192046540378, 121.01115077736]);
            });

        let chapel = L.marker([14.59712260635423, 121.0114095287371], {
            icon: mapIcon,
        })
            .addTo(map)
            .bindPopup(
                "<div style='text-align: center; color: #760c0c; max-width: 400px;'>" +
                    "<h2 style='text-align: center;'>Interfaith Chapel</h2>" +
                    "<h4 style='text-align: justify; margin: 0 10px;'>- The Interfaith Chapel at PUP is a place of worship and reflection where individuals from various religious backgrounds can come together to practice their faith, engage in spiritual activities, and find solace. It serves as a symbol of unity, diversity, and tolerance within the university community, promoting interfaith dialogue and understanding.</h4>" +
                    "<img src='https://drive.google.com/thumbnail?id=1kVRudTkI5_FnM7aGTEzxKsRDfvpa57tX' style='display: block; margin: 10px auto; width: 300px;' />" +
                    "</div>"
            )
            .on("click", function () {
                showRoute([14.59712260635423, 121.0114095287371]);
            });

        let foodNutritionBuilding = L.marker(
            [14.596887541044095, 121.01168990135194],
            { icon: mapIcon }
        )
            .addTo(map)
            .bindPopup(
                "<div style='text-align: center; color: #760c0c; max-width: 400px;'>" +
                    "<h2 style='text-align: center;'>Nutrition and Food Science Building</h2>" +
                    "<h4 style='text-align: justify; margin: 0 10px;'>- The College of Nutrition & Food Science Building houses the academic departments, laboratories, research facilities, and administrative offices related to nutrition, food science, and related disciplines. It provides students with state-of-the-art facilities for hands-on learning, research opportunities, and practical training in the field of food and nutrition.</h4>" +
                    "<img src='https://drive.google.com/thumbnail?id=1kOeY0StQYt8Zpv3uFTZvItRSQ2fYGKPt' style='display: block; margin: 10px auto; width: 300px;' />" +
                    "</div>"
            )
            .on("click", function () {
                showRoute([14.596887541044095, 121.01168990135194]);
            });

        let oval = L.marker([14.598163269529868, 121.01203920265445], {
            icon: mapIcon,
        })
            .addTo(map)
            .bindPopup(
                "<div style='text-align: center; color: #760c0c; max-width: 400px;'>" +
                    "<h2 style='text-align: center;'>Track and Football Oval</h2>" +
                    "<h4 style='text-align: justify; margin: 0 10px;'>- The PUP Oval serves as a venue for jogging or casual strolls, as well as the training ground for football athletes, providing opportunities for individuals of diverse fitness levels to maintain an active and healthy lifestyle, and serving as a site for hosting grand campus events and celebrations.</h4>" +
                    "<img src='https://drive.google.com/thumbnail?id=1KYJkENpflX6b0N2Vt9UcLiJHJZNlKCIY' style='display: block; margin: 10px auto; width: 300px;' />" +
                    "</div>"
            )
            .on("click", function () {
                showRoute([14.598163269529868, 121.01203920265445]);
            });

        let grandstand = L.marker([14.597997374984713, 121.01151823997499], {
            icon: mapIcon,
        })
            .addTo(map)
            .bindPopup(
                "<div style='text-align: center; color: #760c0c; max-width: 400px;'>" +
                    "<h2 style='text-align: center;'>Grandstand</h2>" +
                    "<h4 style='text-align: justify; margin: 0 10px;'>- A vast seating area located at the PUP oval, the grandstand is the focal point in most university events and contributes to the overall atmosphere of excitement and camaraderie within the campus space.</h4>" +
                    "<img src='https://drive.google.com/thumbnail?id=15qr-DS2vDe1JHkc6lt2I8kKLOfcvD9K-' style='display: block; margin: 10px auto; width: 300px;' />" +
                    "</div>"
            )
            .on("click", function () {
                showRoute([14.597997374984713, 121.01151823997499]);
            });

        let basketballCourt = L.marker(
            [14.598635886517906, 121.0108181834221],
            { icon: mapIcon }
        )
            .addTo(map)
            .bindPopup(
                "<div style='text-align: center; color: #760c0c; max-width: 400px;'>" +
                    "<h2 style='text-align: center;'>Outdoor Basketball/Volleyball and Tennis Court</h2>" +
                    "<h4 style='text-align: justify; margin: 0 10px;'>- The Outdoor Basketball and Volleyball court are currently under construction, envisioned to be an outdoor gym fit for basketball, tennis, and other Palarong Pambansa sports. PE classes will also be held in this school facility. The Tennis court is a go-to destination for tennis at any skill level, where one can enjoy friendly matches or hone their skills in a welcoming environment designed for fun and fitness, tailored to accommodate Tennis PE classes and provide ample opportunities for recreational play and skill development.</h4>" +
                    "<img src='https://drive.google.com/thumbnail?id=1laLjpAjAEATdrv3SLfunucA-rGMkJlYV' style='display: block; margin: 10px auto; width: 300px;' />" +
                    "</div>"
            )
            .on("click", function () {
                showRoute([14.598635886517906, 121.0108181834221]);
            });

        let gym = L.marker([14.599184, 121.010762], {
            icon: mapIcon,
        })
            .addTo(map)
            .bindPopup(
                "<div style='text-align: center; color: #760c0c; max-width: 400px;'>" +
                    "<h2 style='text-align: center;'>Gymnasium and Sports Center</h2>" +
                    "<h4 style='text-align: justify; margin: 0 10px;'>- The University gymnasium, rebranded as the PUP Multipurpose Building and Sports Development Facility, caters to commercial spaces, events, and sports activities with a capacity to accommodate 2,000 people. It also serves as the training ground for student athletes participating in the intercollegiate sports program.</h4>" +
                    "<img src='https://drive.google.com/thumbnail?id=1g5VcvAaZfy1FR0EMGXVOeZd_O7XbJpo5' style='display: block; margin: 10px auto; width: 300px;' />" +
                    "</div>"
            )
            .on("click", function () {
                showRoute([14.599184, 121.010762]);
            });

        let library = L.marker([14.597803007870432, 121.00971410642437], {
            icon: mapIcon,
        })
            .addTo(map)
            .bindPopup(
                "<div style='text-align: center; color: #760c0c; max-width: 400px;'>" +
                    "<h2 style='text-align: center;'>Ninoy Aquino Library and Learning Resources Center</h2>" +
                    "<h4 style='text-align: justify; margin: 0 10px;'>- The Ninoy Aquino Learning Resource Center, located within the Polytechnic University of the Philippines (PUP), serves as a hub for educational resources, including books, journals, multimedia materials, and online databases, named after the Filipino senator and democracy icon Benigno 'Ninoy' Aquino Jr., embodying a commitment to knowledge, learning, and the pursuit of academic excellence.</h4>" +
                    "<img src='https://drive.google.com/thumbnail?id=1mdH5-etEsi4A9WCCuuCj0_d74xY6Vehc' style='display: block; margin: 10px auto; width: 300px;' />" +
                    "</div>"
            )
            .on("click", function () {
                showRoute([14.597803007870432, 121.00971410642437]);
            });

        let alumni = L.marker([14.598562730927682, 121.01010739803316], {
            icon: mapIcon,
        })
            .addTo(map)
            .bindPopup(
                "<div style='text-align: center; color: #760c0c; max-width: 400px;'>" +
                    "<h2 style='text-align: center;'>Tahanan ng Alumni</h2>" +
                    "<h4 style='text-align: justify; margin: 0 10px;'>- The Alumni Grounds at PUP is a place for alumni to connect, network, and engage with the alma mater, housing resources and support for alumni activities, events, and initiatives, and serving as a space for reunions and meetings.</h4>" +
                    "<img src='https://drive.google.com/thumbnail?id=1gTf3zQoN5i5juFWs1JIGC8CoZEdlgs_f' style='display: block; margin: 10px auto; width: 300px;' />" +
                    "</div>"
            )
            .on("click", function () {
                showRoute([14.598562730927682, 121.01010739803316]);
            });

        let pe = L.marker([14.598360054778654, 121.01012080907823], {
            icon: mapIcon,
        })
            .addTo(map)
            .bindPopup(
                "<div style='text-align: center; color: #760c0c; max-width: 400px;'>" +
                    "<h2 style='text-align: center;'>Physical Education Building</h2>" +
                    "<h4 style='text-align: justify; margin: 0 10px;'>- A facility dedicated to physical education classes, housing faculty offices and various amenities including studios and equipment storage areas.</h4>" +
                    "<img src='https://drive.google.com/thumbnail?id=1gZPDI7p_FKIx1bKaqB6ogPlO2CJYO2IL' style='display: block; margin: 10px auto; width: 300px;' />" +
                    "</div>"
            )
            .on("click", function () {
                showRoute([14.598360054778654, 121.01012080907823]);
            });

        let pool = L.marker([14.5987724809504, 121.01034343242647], {
            icon: mapIcon,
        })
            .addTo(map)
            .bindPopup(
                "<div style='text-align: center; color: #760c0c; max-width: 400px;'>" +
                    "<h2 style='text-align: center;'>Swimming Pool</h2>" +
                    "<h4 style='text-align: justify; margin: 0 10px;'>- An Olympic-sized swimming pool exclusively available at the Mabini Campus of PUP, capable of handling multiple swimming classes and student athlete activities simultaneously, enhancing the campus' sports and recreational offerings.</h4>" +
                    "<img src='https://drive.google.com/thumbnail?id=1lhRTAavdsY459I3LtEEmSIOrHfW-REI6' style='display: block; margin: 10px auto; width: 300px;' />" +
                    "</div>"
            )
            .on("click", function () {
                showRoute([14.5987724809504, 121.01034343242647]);
            });

        let northWing = L.marker([14.597367165198307, 121.01087450981142], {
            icon: mapIcon,
        })
            .addTo(map)
            .bindPopup(
                "<div style='text-align: center; color: #760c0c; max-width: 400px;'>" +
                    "<h2 style='text-align: center;'>North Wing</h2>" +
                    "<h4 style='text-align: justify; margin: 0 10px;'>- Currently under development, the North Wing of PUP Main Building is transforming from administrative offices to a student-centric space, expected to complete by the end of 2024 with open ground floors, larger classrooms, elevators, and multi-purpose rooms to enhance the learning environment and showcase institutional innovation.</h4>" +
                    "<img src='https://drive.google.com/thumbnail?id=1MpwqCqHBCY6KUq1KAsK6sjokNSw6AGq_' style='display: block; margin: 10px auto; width: 300px;' />" +
                    "</div>"
            )
            .on("click", function () {
                showRoute([14.597367165198307, 121.01087450981142]);
            });

        let eastWing = L.marker([14.59673618302698, 121.01107299327852], {
            icon: mapIcon,
        })
            .addTo(map)
            .bindPopup(
                "<div style='text-align: center; color: #760c0c; max-width: 400px;'>" +
                    "<h2 style='text-align: center;'>East Wing</h2>" +
                    "<h4 style='text-align: justify; margin: 0 10px;'>- Welcome to the East Wing of the main building at PUP, housing essential services including the Corps of Cadets Headquarters, Dental Clinic Services, Department of Military Science and Tactics Office, and HRD Records Office on the first floor. Ascend to the fourth floor to explore the Learning Resources Center, which houses artifacts related to computer history such as early recording devices/media, parts of computers, and computer processors.</h4>" +
                    "<img src='https://drive.google.com/thumbnail?id=1X1EPq7fDYRGq4lCC0y9XNrKIHlBBQRKx' style='display: block; margin: 10px auto; width: 300px;' />" +
                    "</div>"
            )
            .on("click", function () {
                showRoute([14.59673618302698, 121.01107299327852]);
            });

        let westWing = L.marker([14.596907494987134, 121.01039707660676], {
            icon: mapIcon,
        })
            .addTo(map)
            .bindPopup(
                "<div style='text-align: center; color: #760c0c; max-width: 400px;'>" +
                    "<h2 style='text-align: center;'>West Wing</h2>" +
                    "<h4 style='text-align: justify; margin: 0 10px;'>- The PUP West Wing, a modern building on the western side of the campus, stands out with its contemporary architectural design and spacious layout. It serves as a hub for academic activity and administrative functions, providing facilities for student learning, research, and campus operations, including faculty offices, meeting rooms, and collaboration spaces for academic pursuits and student mentoring.</h4>" +
                    "<img src='https://drive.google.com/thumbnail?id=1zdrcMtZI47b8-LNaNkMx9AMDxi3QW4T_' style='display: block; margin: 10px auto; width: 300px;' />" +
                    "</div>"
            )
            .on("click", function () {
                showRoute([14.596907494987134, 121.01039707660676]);
            });

        let southWing = L.marker([14.596564870933435, 121.01066261529924], {
            icon: mapIcon,
        })
            .addTo(map)
            .bindPopup(
                "<div style='text-align: center; color: #760c0c; max-width: 400px;'>" +
                    "<h2 style='text-align: center;'>South Wing</h2>" +
                    "<h4 style='text-align: justify; margin: 0 10px;'>- The South Wing Academic Building complements PUP's Main Academic Building, providing additional space for classrooms, laboratories, faculty offices, and student services to accommodate the growing needs of the academic community and enhance the environment for teaching and learning.</h4>" +
                    "<img src='https://drive.google.com/thumbnail?id=1TTcGWZJ3UL0iMKndXPi0lhcShrqLaJSy' style='display: block; margin: 10px auto; width: 300px;' />" +
                    "</div>"
            )
            .on("click", function () {
                showRoute([14.596564870933435, 121.01066261529924]);
            });

        let lagoon = L.marker([14.597924981456014, 121.0105472803116], {
            icon: mapIcon,
        })
            .addTo(map)
            .bindPopup(
                "<div style='text-align: center; color: #760c0c; max-width: 400px;'>" +
                    "<h2 style='text-align: center;'>Lagoon</h2>" +
                    "<h4 style='text-align: justify; margin: 0 10px;'>- The Lagoon is a prominent feature within the PUP campus, serving as a venue for events, gatherings, and recreational activities, offering a picturesque setting with lush greenery, pathways, and water features, creating a relaxing environment for students, faculty, and visitors.</h4>" +
                    "<img src='https://drive.google.com/thumbnail?id=1m-bv4ipRlQYuN6b-5r7FdT00V7-zs7h0' style='display: block; margin: 10px auto; width: 300px;' />" +
                    "</div>"
            )
            .on("click", function () {
                showRoute([14.597924981456014, 121.0105472803116]);
            });

        let ferry = L.marker([14.59608889719123, 121.0108369588852], {
            icon: mapIcon,
        })
            .addTo(map)
            .bindPopup(
                "<div style='text-align: center; color: #760c0c; max-width: 400px;'>" +
                    "<h2 style='text-align: center;'>PUP Sta. Mesa Ferry Station</h2>" +
                    "<h4 style='text-align: justify; margin: 0 10px;'>- The PUP Ferry Station provides transportation access via waterways for students, faculty, and staff commuting to and from the university, strategically located along a river or coastline to offer a convenient and efficient mode of transportation, especially for those living in areas accessible by water routes.</h4>" +
                    "<img src='https://drive.google.com/thumbnail?id=1k0BgHwnUhGBW9KiqDnW_t4X41ZYiY0a7' style='display: block; margin: 10px auto; width: 300px;' />" +
                    "</div>"
            )
            .on("click", function () {
                showRoute([14.59608889719123, 121.0108369588852]);
            });

        let charlie = L.marker([14.597129266282073, 121.00975334644319], {
            icon: mapIcon,
        })
            .addTo(map)
            .bindPopup(
                "<div style='text-align: center; color: #760c0c; max-width: 400px;'>" +
                    "<h2 style='text-align: center;'>Charlie del Rosario Hall</h2>" +
                    "<h4 style='text-align: justify; margin: 0 10px;'>- The Charlie Del Rosario Hall at PUP serves as the center for student guidance and counseling services, named after an esteemed figure in the university's history, offering academic advising, career counseling, personal counseling, and guidance on student affairs and welfare.</h4>" +
                    "<img src='https://drive.google.com/thumbnail?id=1iis4TnxsWS0Ygr1xZ03W_QGHhjGddNFb' style='display: block; margin: 10px auto; width: 300px;' />" +
                    "</div>"
            )
            .on("click", function () {
                showRoute([14.597129266282073, 121.00975334644319]);
            });

        let labHigh = L.marker([14.597403504005879, 121.0091096162796], {
            icon: mapIcon,
        })
            .addTo(map)
            .bindPopup(
                "<div style='text-align: center; color: #760c0c; max-width: 400px;'>" +
                    "<h2 style='text-align: center;'>Laboratory High School</h2>" +
                    "<h4 style='text-align: justify; margin: 0 10px;'>- The High School Prefabricated (Prefab) Building at PUP accommodates the academic needs of high school students in the affiliated secondary education program, constructed with prefabricated materials to provide classrooms, laboratories, and facilities tailored to secondary-level educational requirements, ensuring a conducive learning environment.</h4>" +
                    "<img src='https://drive.google.com/thumbnail?id=1BHOXH2-1NgkH5eJULMl8zk6lc6KV2afB' style='display: block; margin: 10px auto; width: 300px;' />" +
                    "</div>"
            )
            .on("click", function () {
                showRoute([14.597403504005879, 121.0091096162796]);
            });

        let souvenirShop = L.marker([14.598436568608198, 121.01123660802843], {
            icon: mapIcon,
        })
            .addTo(map)
            .bindPopup(
                "<div style='text-align: center; color: #760c0c; max-width: 400px;'>" +
                    "<h2 style='text-align: center;'>Souvenir Shop</h2>" +
                    "<h4 style='text-align: justify; margin: 0 10px;'>- The PUP Souvenir Shop (PSS) offers a variety of products including hoodie jackets, shirts, baseball caps, notebooks, planners, lanyards, flash drives, pennants, toothbrushes, combs, greeting cards, keychains, pillows, tissue containers, mugs, tumblers, and more, all available at affordable prices.</h4>" +
                    "<img src='https://drive.google.com/thumbnail?id=1hpMEWK4_t5myNpeJI5TK1HfwQH94w3i2' style='display: block; margin: 10px auto; width: 300px;' />" +
                    "</div>"
            )
            .on("click", function () {
                showRoute([14.598436568608198, 121.01123660802843]);
            });

        let pylon = L.marker([14.59916370999337, 121.01172745227815], {
            icon: mapIcon,
        })
            .addTo(map)
            .bindPopup(
                "<div style='text-align: center; color: #760c0c; max-width: 400px;'>" +
                    "<h2 style='text-align: center;'>Pylon</h2>" +
                    "<h4 style='text-align: justify; margin: 0 10px;'>- The Polytechnic University of the Philippines upholds a triad of pillars symbolizing wisdom, strength, and beauty, advocating that there should be wisdom to contrive, strength to support, and beauty to adorn all significant endeavors.</h4>" +
                    "<img src='https://drive.google.com/thumbnail?id=1nXvEYzqiHyeE7yQXAK-DZhqN9-VDWwQi' style='display: block; margin: 10px auto; width: 300px;' />" +
                    "</div>"
            )
            .on("click", function () {
                showRoute([14.59916370999337, 121.01172745227815]);
            });

        let amphitheater = L.marker([14.597245, 121.010447], {
            icon: mapIcon,
        })
            .addTo(map)
            .bindPopup(
                "<div style='text-align: center; color: #760c0c; max-width: 400px;'>" +
                    "<h2 style='text-align: center;'>Amphitheater</h2>" +
                    "<h4 style='text-align: justify; margin: 0 10px;'>- The Amphitheater at PUP is a dynamic space designed for hosting performances, lectures, seminars, and cultural events, featuring an open-air design that comfortably accommodates large audiences for both enjoyment of performances and engagement in academic discourse, serving as a vibrant hub of artistic and intellectual exchange within the university community.</h4>" +
                    "<img src='https://drive.google.com/thumbnail?id=1iSBtLY7hp1LCY1Md9weCn6tgV_qizl13' style='display: block; margin: 10px auto; width: 300px;' />" +
                    "</div>"
            )
            .on("click", function () {
                showRoute([14.597245, 121.010447]);
            });

        let maintenance = L.marker([14.596356, 121.011186], {
            icon: mapIcon,
        })
            .addTo(map)
            .bindPopup(
                "<div style='text-align: center; color: #760c0c; max-width: 400px;'>" +
                    "<h2 style='text-align: center;'>Campus Development and Maintenance Building</h2>" +
                    "<h4 style='text-align: justify; margin: 0 10px;'>- The Campus Development & Maintenance Department Building serves as the administrative headquarters overseeing the planning, construction, maintenance, and beautification of the PUP campus, ensuring infrastructure and facilities meet the needs of students, faculty, and staff, while preserving the campus environment's aesthetic appeal and functionality.</h4>" +
                    "<img src='https://drive.google.com/thumbnail?id=1k7Qsjb6dtrfdBiQEOjYSLsWiiu_PdVYB' style='display: block; margin: 10px auto; width: 300px;' />" +
                    "</div>"
            )
            .on("click", function () {
                showRoute([14.596356, 121.011186]);
            });

        // Remove routing control on double click
        map.on("dblclick", function () {
            if (map._routingControl) {
                map.removeControl(map._routingControl);
            }
        });
    }

    // Initial UI setup based on isMapVisible state
    if (isMapVisible) {
        mapContainer.style.display = "block";
        console.log("Map is initially visible");
        initializeMap(); // Initialize map if it should be visible initially
    } else {
        mapContainer.style.display = "none";
        console.log("Map is initially hidden");
    }

    // Event listener for mapToggle click to toggle visibility
    mapToggle.addEventListener("click", toggleMapVisibility);

    // Set the initial state of the toggle button based on isMapVisible
    mapToggle.checked = isMapVisible;

    // Trigger initial setup
    toggleMapVisibility();
});
