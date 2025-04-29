// This file contains the JavaScript code for the client-side functionality of the application. 
// It handles user interactions, such as adding items, viewing supplies, managing locations, and toggling dark mode.

document.addEventListener('DOMContentLoaded', () => {
    const addItemTab = document.getElementById('add-item-tab');
    const viewSuppliesTab = document.getElementById('view-supplies-tab');
    const addItemPanel = document.getElementById('add-item-panel');
    const viewSuppliesPanel = document.getElementById('view-supplies-panel');
    const addItemForm = document.getElementById('add-item-form');
    const supplyListContainer = document.getElementById('supply-list-container');
    const locationFilter = document.getElementById('location-filter');
    const categoryFilter = document.getElementById('category-filter');
    const clearFilterButton = document.getElementById('clear-filter-button');
    const newLocationInput = document.getElementById('new-location-input');
    const addLocationButton = document.getElementById('add-location-button');
    const locationList = document.getElementById('location-list');
    const darkModeToggle = document.getElementById('dark-mode-toggle');

    let supplies = [];
    let locations = ["server-room", "office-1", "office-2", "storage"];
    const categories = [
        'IT Tools', 'Cables', 'Adapters', 'Storage', 'Networking', 'Hardware', 'Software', 'Furniture', 'Miscellaneous'
    ];

    function switchTab(tabId) {
        const tabs = document.querySelectorAll('.tab');
        const panels = document.querySelectorAll('.tab-panel');

        tabs.forEach(tab => tab.classList.remove('active-tab', 'bg-blue-500', 'hover:bg-blue-700', 'text-white', 'bg-gray-300', 'hover:bg-gray-400', 'text-gray-800'));
        panels.forEach(panel => panel.classList.add('hidden'));

        const selectedTab = document.getElementById(tabId);
        const selectedPanel = document.getElementById(tabId.replace('-tab', '-panel'));

        selectedTab.classList.add('active-tab', 'bg-blue-500', 'hover:bg-blue-700', 'text-white');
        selectedPanel.classList.remove('hidden');
    }

    addItemTab.addEventListener('click', () => switchTab('add-item-tab'));
    viewSuppliesTab.addEventListener('click', () => switchTab('view-supplies-tab'));

    addItemForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const location = document.getElementById('location').value;
        const itemName = document.getElementById('item-name').value;
        const quantity = parseInt(document.getElementById('quantity').value);

        if (quantity <= 0) {
            alert('Quantity must be greater than zero.');
            return;
        }

        const newItem = {
            location: location,
            itemName: itemName,
            quantity: quantity
        };

        supplies.push(newItem);
        updateSupplyList();
        addItemForm.reset();
        document.getElementById('location').value = ""; 
    });

    function updateSupplyList() {
        if (supplies.length === 0) {
            supplyListContainer.innerHTML = '<p class="text-gray-500">No supplies added yet.</p>';
            return;
        }
        const groupedSupplies = groupSuppliesByCategory();
        let supplyListHTML = '';
        const selectedLocation = locationFilter.value;
        const selectedCategory = categoryFilter.value;

        for (const category in groupedSupplies) {
            if (selectedCategory && category !== selectedCategory) {
                continue;
            }
            supplyListHTML += `<div class="mb-6">
                <h3 class="text-lg font-semibold text-gray-700 mb-2">${category}</h3>
                <ul class="border rounded-md shadow-sm">`;
            groupedSupplies[category].forEach(item => {
                if (selectedLocation && item.location !== selectedLocation) {
                    return; 
                }
                supplyListHTML += `<li class="px-4 py-2 border-b last:border-b-0 flex justify-between items-center">
                    <div>
                        <span class="font-medium text-gray-800">${item.itemName}</span>
                        <span class="text-gray-500 text-sm ml-2">(${item.location})</span>
                    </div>
                    <div class="flex items-center space-x-4">
                        <span class="text-blue-600 font-semibold">${item.quantity}</span>
                        <input type="number" value="${item.quantity}" min="0" class="quantity-input shadow appearance-none border rounded w-24 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" data-item-name="${item.itemName}" data-item-location="${item.location}">
                        <button class="delete-item-button bg-red-500 hover:bg-red-700 text-white font-semibold py-1 px-2 rounded focus:outline-none focus:shadow-outline" data-item-name="${item.itemName}" data-item-location="${item.location}">Delete</button>
                    </div>
                </li>`;
            });
            supplyListHTML += `</ul>
            </div>`;
        }

        supplyListContainer.innerHTML = supplyListHTML;

        const quantityInputs = document.querySelectorAll('.quantity-input');
        quantityInputs.forEach(input => {
            input.addEventListener('change', (event) => {
                const itemName = event.target.dataset.itemName;
                const location = event.target.dataset.itemLocation;
                const newQuantity = parseInt(event.target.value);
                if(newQuantity >= 0){
                    updateQuantity(itemName, location, newQuantity);
                }
                else{
                    alert("Quantity cannot be negative");
                    event.target.value = 0;
                }
            });
        });

        const deleteButtons = document.querySelectorAll('.delete-item-button');
        deleteButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                const itemName = event.target.dataset.itemName;
                const location = event.target.dataset.itemLocation;
                deleteItem(itemName, location);
            });
        });
    }

    function updateQuantity(itemName, location, newQuantity) {
        const itemToUpdate = supplies.find(item => item.itemName === itemName && item.location === location);
        if (itemToUpdate) {
            itemToUpdate.quantity = newQuantity;
            updateSupplyList(); 
        }
    }

    function deleteItem(itemName, location) {
        supplies = supplies.filter(item => !(item.itemName === itemName && item.location === location));
        updateSupplyList(); 
    }

    function groupSuppliesByCategory() {
        const grouped = {};

        supplies.forEach(item => {
            let categoryName = 'Miscellaneous'; 

            for (const category of categories) {
                if (categories.some(keyword => item.itemName.toLowerCase().includes(keyword))) {
                    categoryName = category;
                    break;
                }
            }

            if (!grouped[categoryName]) {
                grouped[categoryName] = [];
            }
            grouped[categoryName].push(item);
        });
        return grouped;
    }

    addLocationButton.addEventListener('click', () => {
        const newLocation = newLocationInput.value.trim();
        if (newLocation !== "" && !locations.includes(newLocation)) {
            locations.push(newLocation);
            updateLocationList();
            updateLocationDropdown();
            newLocationInput.value = ""; 
        }
        else if (locations.includes(newLocation)){
            alert("Location already exists");
        }
        else {
            alert("Please enter a valid location name.");
        }
    });

    function updateLocationDropdown() {
        const locationDropdown = document.getElementById('location');
        locationDropdown.innerHTML = '<option value="" disabled selected>Select Location</option>'; 
        locations.forEach(location => {
            locationDropdown.add(new Option(location, location));
        });
        const locationFilterDropdown = document.getElementById('location-filter');
        locationFilterDropdown.innerHTML = '<option value="">All Locations</option>';
        locations.forEach(location => {
            locationFilterDropdown.add(new Option(location, location));
        });
    }

    function updateLocationList() {
        locationList.innerHTML = ''; 
        locations.forEach(location => {
            const locationSpan = document.createElement('span');
            locationSpan.className = "inline-block bg-indigo-200 text-indigo-700 px-2 py-1 rounded-full text-sm font-semibold mr-2";
            locationSpan.textContent = location;
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'x';
            deleteButton.className = 'bg-red-500 hover:bg-red-700 text-white font-bold py-0.5 px-1 rounded ml-1 text-xs';
            deleteButton.addEventListener('click', () => {
                locations = locations.filter(loc => loc !== location);
                updateLocationList();
                updateLocationDropdown();
                updateSupplyList(); 
            });
            locationSpan.appendChild(deleteButton);
            locationList.appendChild(locationSpan);
        });
    }

    locationFilter.addEventListener('change', () => {
        updateSupplyList();
    });

    categoryFilter.addEventListener('change', () => {
        updateSupplyList();
    });

    clearFilterButton.addEventListener('click', () => {
        locationFilter.value = ''; 
        categoryFilter.value = '';
        updateSupplyList(); 
    });

    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
    });

    updateLocationList();
    updateLocationDropdown();
    updateSupplyList();
});