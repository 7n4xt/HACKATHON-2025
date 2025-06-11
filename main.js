
   // Game state
        const gameState = {
            co2: 1200,
            initialCo2: 1200,
            greenPoints: 10,
            clickPower: 1,
            passiveIncome: 0,
            timeRemaining: 600, // 10 minutes in seconds
            gameActive: false,
            timerInterval: null,
            totalUpgradesPurchased: 0,
            upgradesOwned: {}
        };

        // Upgrade categories
        const categories = {
            nature: { emoji: '🌱', name: 'Nature & Biodiversity' },
            energy: { emoji: '⚡', name: 'Renewable Energy' },
            transport: { emoji: '🚊', name: 'Sustainable Transport' },
            buildings: { emoji: '🏢', name: 'Green Buildings' },
            waste: { emoji: '♻️', name: 'Waste & Circular Economy' },
            water: { emoji: '💧', name: 'Water Management' },
            smart: { emoji: '🧠', name: 'Smart City Tech' },
            carbon: { emoji: '🌍', name: 'Carbon Capture & Advanced' }
        };

        // Define all upgrades
        const allUpgrades = [
            // NATURE & BIODIVERSITY
            { id: 'tree', name: 'Plant Tree', emoji: '🌳', cost: 5, effect: 2, category: 'nature', description: 'Effect: -2 CO₂/day' },
            { id: 'forest', name: 'Urban Forest', emoji: '🌲', cost: 150, effect: 50, category: 'nature', description: 'Effect: -50 CO₂/day' },
            { id: 'garden', name: 'Flower Garden', emoji: '🌺', cost: 8, effect: 1, category: 'nature', description: 'Effect: -1 CO₂/day + Air Quality Bonus' },
            { id: 'butterfly', name: 'Butterfly Sanctuary', emoji: '🦋', cost: 35, effect: 8, category: 'nature', description: 'Effect: -8 CO₂/day + Biodiversity Bonus' },
            { id: 'greenroof', name: 'Green Roof', emoji: '🌿', cost: 45, effect: 12, category: 'nature', description: 'Effect: -12 CO₂/day + Insulation Bonus' },
            { id: 'citypark', name: 'City Park', emoji: '🏞️', cost: 200, effect: 60, category: 'nature', description: 'Effect: -60 CO₂/day + Recreation Bonus' },
            { id: 'verticalfarm', name: 'Vertical Farm', emoji: '🌾', cost: 120, effect: 25, category: 'nature', description: 'Effect: -25 CO₂/day + Food Production' },
            { id: 'wildlife', name: 'Wildlife Corridor', emoji: '🦎', cost: 300, effect: 80, category: 'nature', description: 'Effect: -80 CO₂/day + Ecosystem Health' },
            { id: 'livingwall', name: 'Living Wall', emoji: '🍃', cost: 25, effect: 6, category: 'nature', description: 'Effect: -6 CO₂/day + Building Efficiency' },
            { id: 'greenhouse', name: 'Tropical Greenhouse', emoji: '🌴', cost: 180, effect: 45, category: 'nature', description: 'Effect: -45 CO₂/day + Research Bonus' },

            // RENEWABLE ENERGY
            { id: 'solar', name: 'Solar Panel', emoji: '☀️', cost: 25, effect: 10, category: 'energy', description: 'Effect: -10 CO₂/day' },
            { id: 'wind', name: 'Wind Turbine', emoji: '💨', cost: 75, effect: 25, category: 'energy', description: 'Effect: -25 CO₂/day' },
            { id: 'tidal', name: 'Tidal Generator', emoji: '🌊', cost: 400, effect: 120, category: 'energy', description: 'Effect: -120 CO₂/day' },
            { id: 'geothermal', name: 'Geothermal Plant', emoji: '🔥', cost: 800, effect: 200, category: 'energy', description: 'Effect: -200 CO₂/day' },
            { id: 'hydroelectric', name: 'Hydroelectric Dam', emoji: '⚡', cost: 1200, effect: 350, category: 'energy', description: 'Effect: -350 CO₂/day' },
            { id: 'battery', name: 'Battery Storage', emoji: '🔋', cost: 150, effect: 30, category: 'energy', description: 'Effect: -30 CO₂/day + Grid Stability' },
            { id: 'solarhood', name: 'Solar Neighborhood', emoji: '🏠', cost: 500, effect: 140, category: 'energy', description: 'Effect: -140 CO₂/day' },
            { id: 'solarfarm', name: 'Solar Farm', emoji: '🌅', cost: 900, effect: 250, category: 'energy', description: 'Effect: -250 CO₂/day' },
            { id: 'offshorewind', name: 'Offshore Wind', emoji: '🌪️', cost: 1500, effect: 400, category: 'energy', description: 'Effect: -400 CO₂/day' },
            { id: 'nuclear', name: 'Nuclear Plant', emoji: '☢️', cost: 2000, effect: 600, category: 'energy', description: 'Effect: -600 CO₂/day' },

            // SUSTAINABLE TRANSPORT
            { id: 'bikelane', name: 'Bike Lane', emoji: '🚴', cost: 15, effect: 5, category: 'transport', description: 'Effect: -5 CO₂/day' },
            { id: 'metro', name: 'Metro Line', emoji: '🚇', cost: 400, effect: 100, category: 'transport', description: 'Effect: -100 CO₂/day' },
            { id: 'ebus', name: 'Electric Bus', emoji: '🚌', cost: 80, effect: 20, category: 'transport', description: 'Effect: -20 CO₂/day' },
            { id: 'tram', name: 'Tram Network', emoji: '🚋', cost: 300, effect: 75, category: 'transport', description: 'Effect: -75 CO₂/day' },
            { id: 'escooter', name: 'E-Scooter Hub', emoji: '🛴', cost: 30, effect: 8, category: 'transport', description: 'Effect: -8 CO₂/day' },
            { id: 'carshare', name: 'Car Sharing', emoji: '🚗', cost: 60, effect: 15, category: 'transport', description: 'Effect: -15 CO₂/day' },
            { id: 'etaxi', name: 'Electric Taxi', emoji: '🚁', cost: 120, effect: 30, category: 'transport', description: 'Effect: -30 CO₂/day' },
            { id: 'cargobike', name: 'Cargo Bike Delivery', emoji: '🛺', cost: 40, effect: 10, category: 'transport', description: 'Effect: -10 CO₂/day' },
            { id: 'highspeedrail', name: 'High-Speed Rail', emoji: '🚝', cost: 2500, effect: 500, category: 'transport', description: 'Effect: -500 CO₂/day' },
            { id: 'evcharger', name: 'EV Charging Station', emoji: '🔌', cost: 100, effect: 25, category: 'transport', description: 'Effect: -25 CO₂/day + EV Adoption' },

            // GREEN BUILDINGS
            { id: 'led', name: 'LED Street Lights', emoji: '💡', cost: 20, effect: 4, category: 'buildings', description: 'Effect: -4 CO₂/day' },
            { id: 'insulation', name: 'Insulated Building', emoji: '🏠', cost: 90, effect: 22, category: 'buildings', description: 'Effect: -22 CO₂/day' },
            { id: 'smartwindows', name: 'Smart Windows', emoji: '🪟', cost: 70, effect: 18, category: 'buildings', description: 'Effect: -18 CO₂/day' },
            { id: 'greenoffice', name: 'Green Office', emoji: '🏢', cost: 250, effect: 65, category: 'buildings', description: 'Effect: -65 CO₂/day' },
            { id: 'carbonneutralfactory', name: 'Carbon Neutral Factory', emoji: '🏭', cost: 600, effect: 150, category: 'buildings', description: 'Effect: -150 CO₂/day' },
            { id: 'districtcooling', name: 'District Cooling', emoji: '❄️', cost: 350, effect: 90, category: 'buildings', description: 'Effect: -90 CO₂/day' },
            { id: 'smartthermostat', name: 'Smart Thermostat', emoji: '🌡️', cost: 12, effect: 3, category: 'buildings', description: 'Effect: -3 CO₂/day' },
            { id: 'passivehouse', name: 'Passive House', emoji: '🏘️', cost: 180, effect: 45, category: 'buildings', description: 'Effect: -45 CO₂/day' },
            { id: 'leedbuilding', name: 'LEED Building', emoji: '🏢', cost: 320, effect: 80, category: 'buildings', description: 'Effect: -80 CO₂/day' },
            { id: 'heatpump', name: 'Heat Pump System', emoji: '🔥', cost: 140, effect: 35, category: 'buildings', description: 'Effect: -35 CO₂/day' },

            // WASTE & CIRCULAR ECONOMY
            { id: 'recycling', name: 'Recycling Center', emoji: '♻️', cost: 110, effect: 28, category: 'waste', description: 'Effect: -28 CO₂/day' },
            { id: 'wastetoenergy', name: 'Waste-to-Energy', emoji: '🗑️', cost: 450, effect: 110, category: 'waste', description: 'Effect: -110 CO₂/day' },
            { id: 'composting', name: 'Composting Hub', emoji: '🍌', cost: 35, effect: 9, category: 'waste', description: 'Effect: -9 CO₂/day' },
            { id: 'ewaste', name: 'E-Waste Processing', emoji: '📱', cost: 85, effect: 21, category: 'waste', description: 'Effect: -21 CO₂/day' },
            { id: 'zerowaste', name: 'Zero Waste Store', emoji: '🛍️', cost: 55, effect: 14, category: 'waste', description: 'Effect: -14 CO₂/day' },
            { id: 'bottlereturn', name: 'Bottle Return System', emoji: '🥤', cost: 40, effect: 10, category: 'waste', description: 'Effect: -10 CO₂/day' },
            { id: 'textilerecycling', name: 'Textile Recycling', emoji: '👕', cost: 65, effect: 16, category: 'waste', description: 'Effect: -16 CO₂/day' },
            { id: 'foodwaste', name: 'Food Waste Reduction', emoji: '🍽️', cost: 75, effect: 19, category: 'waste', description: 'Effect: -19 CO₂/day' },
            { id: 'circularmall', name: 'Circular Mall', emoji: '🔄', cost: 280, effect: 70, category: 'waste', description: 'Effect: -70 CO₂/day' },
            { id: 'pyrolysis', name: 'Plastic Pyrolysis Plant', emoji: '⚗️', cost: 520, effect: 130, category: 'waste', description: 'Effect: -130 CO₂/day' },

            // WATER MANAGEMENT
            { id: 'rainwater', name: 'Rainwater Harvesting', emoji: '🌧️', cost: 45, effect: 11, category: 'water', description: 'Effect: -11 CO₂/day' },
            { id: 'watertreatment', name: 'Water Treatment Plant', emoji: '🚰', cost: 200, effect: 50, category: 'water', description: 'Effect: -50 CO₂/day' },
            { id: 'greywater', name: 'Greywater System', emoji: '💧', cost: 80, effect: 20, category: 'water', description: 'Effect: -20 CO₂/day' },
            { id: 'naturalpool', name: 'Natural Pool Filter', emoji: '🏊', cost: 120, effect: 30, category: 'water', description: 'Effect: -30 CO₂/day' },
            { id: 'wetland', name: 'Wetland Restoration', emoji: '🌊', cost: 160, effect: 40, category: 'water', description: 'Effect: -40 CO₂/day' },
            { id: 'smartirrigation', name: 'Smart Irrigation', emoji: '💦', cost: 60, effect: 15, category: 'water', description: 'Effect: -15 CO₂/day' },
            { id: 'bioswale', name: 'Bioswale Network', emoji: '🏞️', cost: 90, effect: 23, category: 'water', description: 'Effect: -23 CO₂/day' },
            { id: 'atmosphericwater', name: 'Atmospheric Water Gen', emoji: '🌀', cost: 220, effect: 55, category: 'water', description: 'Effect: -55 CO₂/day' },
            { id: 'aquaponics', name: 'Aquaponics System', emoji: '🐟', cost: 140, effect: 35, category: 'water', description: 'Effect: -35 CO₂/day' },
            { id: 'desalination', name: 'Desalination Solar', emoji: '💎', cost: 380, effect: 95, category: 'water', description: 'Effect: -95 CO₂/day' },

            // SMART CITY TECH
            { id: 'smartgrid', name: 'Smart Grid', emoji: '📱', cost: 300, effect: 75, category: 'smart', description: 'Effect: -75 CO₂/day + Efficiency Bonus' },
            { id: 'aitraffic', name: 'AI Traffic Control', emoji: '🤖', cost: 180, effect: 45, category: 'smart', description: 'Effect: -45 CO₂/day' },
            { id: 'iotsensors', name: 'IoT Sensors Network', emoji: '📡', cost: 120, effect: 30, category: 'smart', description: 'Effect: -30 CO₂/day + Data Bonus' },
            { id: 'digitaltwin', name: 'Digital Twin City', emoji: '🖥️', cost: 800, effect: 200, category: 'smart', description: 'Effect: -200 CO₂/day + Optimization' },
            { id: 'smarttraffic', name: 'Smart Traffic Lights', emoji: '🚦', cost: 70, effect: 18, category: 'smart', description: 'Effect: -18 CO₂/day' },
            { id: 'energyai', name: 'Energy Management AI', emoji: '📊', cost: 250, effect: 65, category: 'smart', description: 'Effect: -65 CO₂/day' },
            { id: 'greennetwork', name: '5G Green Network', emoji: '🌐', cost: 400, effect: 100, category: 'smart', description: 'Effect: -100 CO₂/day' },
            { id: 'remotework', name: 'Remote Work Hub', emoji: '📞', cost: 150, effect: 38, category: 'smart', description: 'Effect: -38 CO₂/day' },
            { id: 'smartparking', name: 'Smart Parking', emoji: '🏙️', cost: 90, effect: 23, category: 'smart', description: 'Effect: -23 CO₂/day' },
            { id: 'carbonmonitor', name: 'Carbon Monitoring', emoji: '🔍', cost: 200, effect: 50, category: 'smart', description: 'Effect: -50 CO₂/day + Tracking Bonus' },

            // CARBON CAPTURE & ADVANCED
            { id: 'directair', name: 'Direct Air Capture', emoji: '🌪️', cost: 1000, effect: 300, category: 'carbon', description: 'Effect: -300 CO₂/day' },
            { id: 'biochar', name: 'Biochar Production', emoji: '🌿', cost: 350, effect: 90, category: 'carbon', description: 'Effect: -90 CO₂/day' },
            { id: 'carboncapture', name: 'Carbon Capture Plant', emoji: '🏭', cost: 1500, effect: 450, category: 'carbon', description: 'Effect: -450 CO₂/day' },
            { id: 'algae', name: 'Algae Bioreactor', emoji: '🧪', cost: 600, effect: 180, category: 'carbon', description: 'Effect: -180 CO₂/day' },
            { id: 'mineral', name: 'Mineral Carbonation', emoji: '🌋', cost: 800, effect: 240, category: 'carbon', description: 'Effect: -240 CO₂/day' },
            { id: 'oceanalkalinization', name: 'Ocean Alkalinization', emoji: '🌊', cost: 2000, effect: 600, category: 'carbon', description: 'Effect: -600 CO₂/day' },
            { id: 'spacesolar', name: 'Space Solar Power', emoji: '🚀', cost: 5000, effect: 1500, category: 'carbon', description: 'Effect: -1500 CO₂/day' },
            { id: 'fusion', name: 'Fusion Reactor', emoji: '🔬', cost: 8000, effect: 2500, category: 'carbon', description: 'Effect: -2500 CO₂/day' },
            { id: 'orbitalreflector', name: 'Orbital Reflector', emoji: '🌌', cost: 10000, effect: 3000, category: 'carbon', description: 'Effect: -3000 CO₂/day' },
            { id: 'planetarycooling', name: 'Planetary Cooling', emoji: '🌍', cost: 15000, effect: 5000, category: 'carbon', description: 'Effect: -5000 CO₂/day' }
        ];

        // DOM Elements
        const co2Counter = document.getElementById('co2-counter');
        const gpCounter = document.getElementById('gp-counter');
        const timeCounter = document.getElementById('time-counter');
        const cityContainer = document.getElementById('city-container');
        const pollutionOverlay = document.getElementById('pollution-overlay');
        const co2Progress = document.getElementById('co2-progress');
        const progressText = document.querySelector('.progress-text');
        const upgradesList = document.getElementById('upgrades-list');
        const categoryButtons = document.querySelectorAll('.category-button');
        const victoryModal = document.getElementById('victory-modal');
        const gameoverModal = document.getElementById('gameover-modal');
        const playAgainVictory = document.getElementById('play-again-victory');
        const playAgainGameover = document.getElementById('play-again-gameover');

        // Initialize the game
        function initGame() {
            // Reset game state
            gameState.co2 = 1200;
            gameState.initialCo2 = 1200;
            gameState.greenPoints = 10;
            gameState.clickPower = 1;
            gameState.passiveIncome = 0;
            gameState.timeRemaining = 600;
            gameState.gameActive = true;
            gameState.totalUpgradesPurchased = 0;
            gameState.upgradesOwned = {};

            // Clear any existing timer
            if (gameState.timerInterval) {
                clearInterval(gameState.timerInterval);
            }

            // Initialize upgrades
            initializeUpgrades();

            // Update UI
            updateCounters();
            updatePollutionOverlay();
            updateProgressBar();

            // Start game timer
            startTimer();

            // Hide modals
            victoryModal.classList.remove('active');
            gameoverModal.classList.remove('active');
        }

        // Initialize upgrades
        function initializeUpgrades() {
            // Clear existing upgrades
            upgradesList.innerHTML = '';

            // Add each upgrade
            allUpgrades.forEach(upgrade => {
                const upgradeElement = createUpgradeElement(upgrade);
                upgradesList.appendChild(upgradeElement);
                // Initialize the count for this upgrade
                gameState.upgradesOwned[upgrade.id] = 0;
            });

            // Set active category to 'all'
            showCategory('all');
        }

        // Create an upgrade element
        function createUpgradeElement(upgrade) {
            const upgradeDiv = document.createElement('div');
            upgradeDiv.className = 'upgrade-item';
            upgradeDiv.dataset.category = upgrade.category;
            upgradeDiv.dataset.id = upgrade.id;

            upgradeDiv.innerHTML = `
                <div class="upgrade-info">
                    <div class="upgrade-emoji">${upgrade.emoji}</div>
                    <div class="upgrade-details">
                        <h3>${upgrade.name}</h3>
                        <p class="upgrade-effect">${upgrade.description}</p>
                    </div>
                </div>
                <div class="upgrade-action">
                    <div class="upgrade-cost">
                        <span>${upgrade.cost}</span>
                        <span>🌿</span>
                    </div>
                    <button class="upgrade-button" data-id="${upgrade.id}">Buy</button>
                    <div class="upgrade-count">0</div>
                </div>
            `;

            const buyButton = upgradeDiv.querySelector('.upgrade-button');
            buyButton.addEventListener('click', () => {
                buyUpgrade(upgrade.id);
            });

            return upgradeDiv;
        }

        // Show upgrades by category
        function showCategory(category) {
            // Update active button
            categoryButtons.forEach(button => {
                if (button.dataset.category === category) {
                    button.classList.add('active');
                } else {
                    button.classList.remove('active');
                }
            });

            // Show upgrades in the selected category
            const upgradeItems = document.querySelectorAll('.upgrade-item');
            upgradeItems.forEach(item => {
                if (category === 'all' || item.dataset.category === category) {
                    item.style.display = 'flex';
                } else {
                    item.style.display = 'none';
                }
            });
        }

        // Buy an upgrade
        function buyUpgrade(upgradeId) {
            // Find the upgrade
            const upgrade = allUpgrades.find(u => u.id === upgradeId);
            if (!upgrade) return;

            // Calculate current cost (with 50% increase per purchase)
            const count = gameState.upgradesOwned[upgradeId] || 0;
            const currentCost = Math.floor(upgrade.cost * Math.pow(1.5, count));

            // Check if player has enough points
            if (gameState.greenPoints >= currentCost) {
                // Deduct points
                gameState.greenPoints -= currentCost;

                // Apply upgrade effect
                gameState.co2 -= upgrade.effect;
                if (gameState.co2 < 0) gameState.co2 = 0;

                // Increase count
                gameState.upgradesOwned[upgradeId] = (gameState.upgradesOwned[upgradeId] || 0) + 1;
                gameState.totalUpgradesPurchased++;

                // Update the count display
                const upgradeElement = document.querySelector(`.upgrade-item[data-id="${upgradeId}"]`);
                const countElement = upgradeElement.querySelector('.upgrade-count');
                countElement.textContent = gameState.upgradesOwned[upgradeId];

                // Update cost display (for next purchase)
                const nextCost = Math.floor(upgrade.cost * Math.pow(1.5, gameState.upgradesOwned[upgradeId]));
                const costElement = upgradeElement.querySelector('.upgrade-cost span:first-child');
                costElement.textContent = nextCost;

                // Add passive income if applicable
                // For simplicity, let's give a small passive income bonus for each upgrade
                gameState.passiveIncome += upgrade.effect * 0.01;

                // Create upgrade animation
                createUpgradeAnimation(upgrade.emoji);

                // Update UI
                updateCounters();
                updatePollutionOverlay();
                updateProgressBar();

                // Check for victory
                if (gameState.co2 <= 0) {
                    victory();
                }
            }
        }

        // City click handler
        function handleCityClick(event) {
            if (!gameState.gameActive) return;

            // Add green points
            gameState.greenPoints += gameState.clickPower;

            // Reduce CO2
            gameState.co2 -= 0.1;
            if (gameState.co2 < 0) gameState.co2 = 0;

            // Create click feedback
            createClickFeedback(event.clientX, event.clientY);

            // Update UI
            updateCounters();
            updatePollutionOverlay();
            updateProgressBar();

            // Check for victory
            if (gameState.co2 <= 0) {
                victory();
            }
        }

        // Create click feedback animation
        function createClickFeedback(x, y) {
            const feedback = document.createElement('div');
            feedback.className = 'click-feedback';
            feedback.textContent = `+${gameState.clickPower}`;

            // Position at click location, adjusted to city container
            const rect = cityContainer.getBoundingClientRect();
            feedback.style.left = (x - rect.left) + 'px';
            feedback.style.top = (y - rect.top) + 'px';

            // Add to city container and remove after animation
            cityContainer.appendChild(feedback);
            setTimeout(() => {
                cityContainer.removeChild(feedback);
            }, 1000);
        }

        // Create upgrade animation
        function createUpgradeAnimation(emoji) {
            // Create a floating emoji from the bottom of the screen
            const animation = document.createElement('div');
            animation.className = 'click-feedback';
            animation.textContent = emoji;
            animation.style.fontSize = '2rem';

            // Random position on the city
            const rect = cityContainer.getBoundingClientRect();
            animation.style.left = Math.floor(Math.random() * (rect.width - 40) + 20) + 'px';
            animation.style.top = rect.height + 'px';
            animation.style.animation = 'float-up 2s forwards';

            // Add to city container and remove after animation
            cityContainer.appendChild(animation);
            setTimeout(() => {
                cityContainer.removeChild(animation);
            }, 2000);
        }

        // Start the game timer
        function startTimer() {
            gameState.timerInterval = setInterval(() => {
                // Decrement time
                gameState.timeRemaining--;

                // Add passive income
                if (gameState.passiveIncome > 0) {
                    gameState.greenPoints += gameState.passiveIncome;
                    updateCounters();
                }

                // Update timer display
                updateTimeDisplay();

                // Check if time's up
                if (gameState.timeRemaining <= 0) {
                    clearInterval(gameState.timerInterval);
                    gameState.timeRemaining = 0;
                    updateTimeDisplay();
                    gameOver();
                }
            }, 1000);
        }

        // Update time display
        function updateTimeDisplay() {
            const minutes = Math.floor(gameState.timeRemaining / 60);
            const seconds = gameState.timeRemaining % 60;
            timeCounter.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        }

        // Update counters
        function updateCounters() {
            co2Counter.textContent = Math.round(gameState.co2);
            gpCounter.textContent = Math.floor(gameState.greenPoints);

            // Update button states based on affordability
            updateUpgradeButtons();

            // Update CO2 counter color
            if (gameState.co2 / gameState.initialCo2 < 0.2) {
                co2Counter.className = 'stats-value co2-value good';
            } else if (gameState.co2 / gameState.initialCo2 < 0.6) {
                co2Counter.className = 'stats-value co2-value improving';
            } else {
                co2Counter.className = 'stats-value co2-value';
            }
        }

        // Update upgrade buttons (enable/disable based on affordability)
        function updateUpgradeButtons() {
            allUpgrades.forEach(upgrade => {
                const count = gameState.upgradesOwned[upgrade.id] || 0;
                const currentCost = Math.floor(upgrade.cost * Math.pow(1.5, count));

                const button = document.querySelector(`.upgrade-button[data-id="${upgrade.id}"]`);
                if (button) {
                    button.disabled = gameState.greenPoints < currentCost;
                }
            });
        }

        // Update pollution overlay
        function updatePollutionOverlay() {
            const progress = 1 - (gameState.co2 / gameState.initialCo2);
            pollutionOverlay.style.opacity = 0.6 - (progress * 0.6);
        }

        // Update progress bar
        function updateProgressBar() {
            const progress = 1 - (gameState.co2 / gameState.initialCo2);
            const percentage = Math.min(Math.round(progress * 100), 100);

            co2Progress.style.width = `${percentage}%`;
            progressText.textContent = `${percentage}%`;
        }

        // Game victory
        function victory() {
            gameState.gameActive = false;
            clearInterval(gameState.timerInterval);

            // Update victory modal
            document.getElementById('victory-time').textContent = timeCounter.textContent;
            document.getElementById('victory-points').textContent = Math.floor(gameState.greenPoints);
            document.getElementById('victory-upgrades').textContent = gameState.totalUpgradesPurchased;

            // Show victory modal
            victoryModal.classList.add('active');
        }

        // Game over
        function gameOver() {
            gameState.gameActive = false;

            // Update gameover modal
            document.getElementById('gameover-co2').textContent = Math.round(gameState.co2);
            document.getElementById('gameover-points').textContent = Math.floor(gameState.greenPoints);

            const percentage = Math.min(Math.round((1 - (gameState.co2 / gameState.initialCo2)) * 100), 100);
            document.getElementById('gameover-percentage').textContent = percentage;

            // Show gameover modal
            gameoverModal.classList.add('active');
        }

        // Event Listeners

        // City click
        cityContainer.addEventListener('click', handleCityClick);

        // Category buttons
        categoryButtons.forEach(button => {
            button.addEventListener('click', () => {
                showCategory(button.dataset.category);
            });
        });

        // Play again buttons
        playAgainVictory.addEventListener('click', initGame);
        playAgainGameover.addEventListener('click', initGame);

        // Initialize the game when the page loads
        window.addEventListener('DOMContentLoaded', initGame);