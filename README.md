# LinkedIn Company Data Chrome Extension

## Overview

This Chrome extension allows users to scrape data from LinkedIn company pages, save it into a backend, and list previously saved companies. Users can copy website URLs from the saved company list. The extension displays company information in a modal within the LinkedIn page. It automatically opens when users visit a LinkedIn company page.

## Features

- Scrapes data from LinkedIn company pages using Puppeteer.
- Saves data into a backend.
- Lists saved companies.
- Allows copying website URLs and phone numbers from the list.
- Displays company information in a modal.


## Installation

1. Clone this repository.
2. Navigate to the extension folder.
3. Open Chrome and go to `chrome://extensions`.
4. Enable Developer Mode.
5. Click on "Load unpacked" and select the extension folder.

## Usage

1. Open Chrome and navigate to a LinkedIn company page.
2. Click on the extention, display's company information.
3. Save the company data if necessary.
4. Access the saved companies from the extension icon in the toolbar.

## Requirements

- Node.js v18.17.1
- MongoDB (configure port to 27107 in MongoDB folder `index.js`)

## Development

To start the server, run:
npm run server
