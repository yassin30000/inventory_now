# Inventory Now

Welcome to Inventory Now, a web application built with Flask and React for efficient inventory tracking and management.

# Live Link
## https://inventory-now.onrender.com

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)

## Overview

Inventory Now is a comprehensive solution for managing your inventory, tracking items, categories, suppliers, and more. It allows you to streamline your inventory operations, monitor stock levels, and generate reports to make informed business decisions.

## Features

- **User Management:** Create and manage user accounts.
- **Inventory Sheets:** Easily create, update, and view inventory sheets.
- **Item Management:** Add, edit, and categorize items with low stock notifications.
- **Category Management:** Organize items into categories and manage category-item relationships.
- **Supplier Management:** Maintain a list of suppliers and their information.
- **Inventory Tracking:** Record the quantity of items at the time of each inventory sheet.
- **Search:** Quickly find items in your inventory.
- **Dashboard:** Get an overview of recent inventory activity.

## Getting Started

To get started with Inventory Now, follow the installation instructions below.

## Installation

1. Clone the repository to your local machine:

  ```shell
  git clone https://github.com/yassin30000/inventory_now.git
  ```

2. Navigate to the root of the file

  ```shell
  cd inventory_now
  ```

3. Install the python dependecies:

  ```bash
  pipenv shell
  ```

  ```bash
  flask db upgrade
  ```

  ```bash
  flask seed all
  ```

  ```bash
  flask run
  ```

4. cd into the react-app:

  ```bash
  cd react-app
  ```

5. Install the react dependencies:

  ```bash
  npm install
  ```

6. cd into the react-app and start the frontend

  ```bash
  npm start
  ```
