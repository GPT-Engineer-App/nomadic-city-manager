# nomadic-city-manager

# CityManager App Specification

The CityManager App is designed to provide a clean, modern interface similar to NomadList for managing cities through CRUD (Create, Read, Update, Delete) operations. The data is managed via a third-party API hosted at SheetDB.

## Screens

### Home Page
Features a list of cities currently in the database with options to add, edit, or delete cities.

### Add City Modal
A dialog that allows users to input the name of a new city and submit it to the database.

### Edit City Modal
A dialog allowing users to update the name of an existing city.

### Delete Confirmation Modal
A confirmation dialog that prompts the users before deleting a selected city to prevent accidental removals.

## Components

### Navigation Bar
Contains the application’s title and links to important sections of the application.

- **Behavior:** Static at the top of all pages for easy accessibility.
- **Design:** Uses a light base color with the logo and navigation items highlighted in vibrant colors for clear visibility.

### CityList

- **Behavior:** Fetches city data from the provided API and displays it in a list format. Each city entry has buttons for edit and delete operations.
- **Layout:** Designed to be scrollable with ample whitespace around each city item, consistent with an uncluttered, airy interface.

### CityItem
Each city item displays the name of the city and has controls for editing and deleting the city.

- **Behavior:** 
  - Edit button opens the Edit City Modal pre-filled with the city's current name.
  - Delete button opens the Delete Confirmation Modal.
- **Design:** City name is prominently displayed, using bold, readable fonts. The edit and delete buttons use standout colors for easy identification.

### Add City Button
A floating action button on the Home Page used to add new cities.

- **Behavior:** Opens the Add City Modal.
- **Design:** Vibrant, contrasting color to draw attention and placed in a fixed, accessible position on the screen.

## Collaborate with GPT Engineer

This is a [gptengineer.app](https://gptengineer.app)-synced repository 🌟🤖

Changes made via gptengineer.app will be committed to this repo.

If you clone this repo and push changes, you will have them reflected in the GPT Engineer UI.

## Tech stack

This project is built with React and Chakra UI.

- Vite
- React
- Chakra UI

## Setup

```sh
git clone https://github.com/GPT-Engineer-App/nomadic-city-manager.git
cd nomadic-city-manager
npm i
```

```sh
npm run dev
```

This will run a dev server with auto reloading and an instant preview.

## Requirements

- Node.js & npm - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
