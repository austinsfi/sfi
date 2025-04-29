# IT Supply Organizer

## Overview
The IT Supply Organizer is a web application designed to help users manage and organize IT office supplies efficiently. Users can add items with their respective locations and quantities, view supplies categorized by type, and manage locations, including the ability to add or delete them. The application also features a dark mode for improved usability in low-light environments.

## Features
- **Add Items**: Users can add new supplies by specifying the item name, location, and quantity.
- **View Supplies**: Supplies can be viewed by category, allowing for easy organization and management.
- **Manage Locations**: Users can add new locations or delete existing ones as needed.
- **Quick Quantity Changes**: Users can quickly update the quantity of supplies directly from the supply list.
- **Dark Mode**: A toggle button allows users to switch between light and dark mode for better visibility.

## Project Structure
```
it-supply-organizer
├── public
│   ├── index.html          # Main HTML document
│   ├── styles
│   │   └── main.css       # CSS styles for the application
│   └── scripts
│       └── app.js         # Client-side JavaScript functionality
├── src
│   ├── server.js          # Entry point for the server-side application
│   ├── routes
│   │   └── supplies.js    # Routes for managing supplies
│   ├── controllers
│   │   └── suppliesController.js # Logic for supply-related operations
│   ├── models
│   │   └── supply.js      # Supply model definition
│   └── database
│       └── connection.js   # Database connection setup
├── package.json           # npm configuration file
├── .env                   # Environment variables
├── .gitignore             # Files and directories to ignore by Git
└── README.md              # Project documentation
```

## Installation
1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd it-supply-organizer
   ```
3. Install the dependencies:
   ```
   npm install
   ```
4. Set up your environment variables in the `.env` file.

## Usage
1. Start the server:
   ```
   npm start
   ```
2. Open your browser and navigate to `http://localhost:3000` to access the application.

## Contributing
Contributions are welcome! Please submit a pull request or open an issue for any enhancements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for more details.