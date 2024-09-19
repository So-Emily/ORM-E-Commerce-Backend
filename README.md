# E-Commerce Back End

## Description

This project is a back-end application for an e-commerce site built using Express.js, Sequelize, and PostgreSQL. It provides a RESTful API for managing categories, products, and tags in an e-commerce database. The application allows users to perform CRUD operations on these entities and ensures that the data is stored and retrieved efficiently.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [Seeding the Database](#seeding-the-database)
- [Technologies Used](#technologies-used)
- [Video](#Video)
- [License](#license)

## Installation

1. Clone the repository:
    ```sh
    git clone git@work.github.com:coding-boot-camp/module-13-challenge-orm.git
    cd module-13-challenge-orm
    ```

2. Install the dependencies:
    ```sh
    npm install
    ```

3. Create a `.env` file in the root directory and add your PostgreSQL database credentials:
    ```env
    DB_NAME=your_database_name
    DB_USER=your_postgresql_username
    DB_PASSWORD=your_postgresql_password
    DB_URL=your_database_url (optional)
    ```

4. Create the database schema:
    ```sh
    psql -U postgres -f db/schema.sql
    ```

5. Seed the database:
    ```sh
    npm run seed
    ```

## Usage

1. Start the server:
    ```sh
    npm start
    ```

2. The server will be running on `http://localhost:3001`. You can use Insomnia or any other API client to interact with the API endpoints.

## API Endpoints

### Categories

- **GET** `/api/categories` - Get all categories
- **GET** `/api/categories/:id` - Get a category by ID
- **POST** `/api/categories` - Create a new category
- **PUT** `/api/categories/:id` - Update a category by ID
- **DELETE** `/api/categories/:id` - Delete a category by ID

### Products

- **GET** `/api/products` - Get all products
- **GET** `/api/products/:id` - Get a product by ID
- **POST** `/api/products` - Create a new product
- **PUT** `/api/products/:id` - Update a product by ID
- **DELETE** `/api/products/:id` - Delete a product by ID

### Tags

- **GET** `/api/tags` - Get all tags
- **GET** `/api/tags/:id` - Get a tag by ID
- **POST** `/api/tags` - Create a new tag
- **PUT** `/api/tags/:id` - Update a tag by ID
- **DELETE** `/api/tags/:id` - Delete a tag by ID

## Database Schema

The database schema includes the following tables:

- **category**
    - `id` (Primary Key)
    - `category_name` (VARCHAR)

- **product**
    - `id` (Primary Key)
    - `product_name` (VARCHAR)
    - `price` (DECIMAL)
    - `stock` (INTEGER)
    - `category_id` (Foreign Key)

- **tag**
    - `id` (Primary Key)
    - `tag_name` (VARCHAR)

- **product_tag**
    - `id` (Primary Key)
    - `product_id` (Foreign Key)
    - `tag_id` (Foreign Key)

## Seeding the Database

To seed the database with test data, run the following command:
```sh
npm run seed
```

This will execute the seeds/index.js file, which seeds the database with categories, products, tags, and product tags.

## Technologies Used
- Node.js
- Express.js
- Sequelize
- PostgreSQL
- dotenv

## Video

[Screencastify Video](https://app.screencastify.com/v3/watch/LPmagdF8GFBmEnYxuT8p)

## License
This project is licensed under the MIT License. 
See the LICENSE file for details.
