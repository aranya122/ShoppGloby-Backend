
# Project Title

ShoppyGlobe

ShoppyGlobe is an e-commerce application that provides a seamless shopping experience. This repository contains the backend code, developed using Node.js, Express.js, and MongoDB. The backend handles user authentication, product and cart management, and implements secure, RESTful API endpoints.


## Features

- User Authentication: Secure JWT-based authentication for user registration and login.

 - Product Management: CRUD operations to manage products in the MongoDB database.

-  Cart Management: API endpoints for adding, updating, and removing items in the cart.

-  Error Handling: Comprehensive error responses and validation checks for all endpoints.

  Database Integration: Uses MongoDB Atlas for cloud database storage.


## Tech Stack

- Node.js: JavaScript runtime for building scalable server applications.

 - Express.js: Minimal and flexible Node.js web application framework.

- MongoDB: NoSQL database used with Mongoose ODM for schema-based data modeling.

 - JWT: JSON Web Token for securing user authentication.

-  MongoDB Atlas: Cloud-hosted MongoDB instance.
## Github Repository Link
https://github.com/aranya122/ShoppGloby-Backend


## Installation

Install my-project with npm
```bash
  npm install
```
 Set up environment variables:

Create a .env file in the project root directory.

Add the following environment variables:

 - URL=your_mongodb_connection_string
  - JWT_SECRET=your_jwt_secret



4. Run the application:

npm start

- The server should be running at http://localhost:8000.
- Connected to MONGODB
```bash
  npm run dev
  ```
    
## Authentication

- POST /api/auth/register: Register a new user.

- POST /api/auth/login: Login and obtain a JWT token.
## Products

 - GET /api/products: Get all products.

 - GET /api/products/:id: Get a single product by ID.

- POST /api/products: Add a new product (admin only).

- PUT /api/products/:id: Update a product (admin only).

- DELETE /api/products/:id: Delete a product (admin only).
## Cart 


- POST /api/cart: Add an item to the cart.

- PUT /api/cart/:id: Update an item in the cart.

- DELETE /api/cart/:id: Remove an item from the cart.

- GET /api/cart: Get all items in the cart for the authenticated user.