# Overview
Welcome to the Furniture E-Commerce API! This API provides functionalities for managing products, categories, and orders for a furniture e-commerce platform.
Features:
- CRUD operations for managing furniture products and categories.
- Order processing and tracking functionalities.
- Secure authentication and authorization mechanisms.
 -Email verification and payment method.
technologies used:
Express.js serves as the framework, MongoDB as the NoSQL database with Mongoose as the Object-Document Mapper (ODM), Nodemailer as a third-party tool for sending verification emails, and Stripe as the payment method.

The E-Commerce API!  provides a set of endpoints to manage users, products, orders, and authentication. This README file outlines the available endpoints, their functionalities, and installation instructions.

## Endpoints

### Authentication

#### POST /users/register
- Create a new user account.

#### POST /users/login
- Authenticate user credentials.



### Users

#### DELETE /users/{id}
- Delete a specific user by ID (Admin only).
  
#### GET /users/find/{id}
- find a specific user by ID (Admin only).

#### GET /users
- Retrieve new users (Admin only).
#### GET /users/stats
- Retrieve users statistics  (Admin only).
- 
#### PATCH /users/me
- Update user details (User only).
  
### Products

#### POST /products
- Add a new product (Admin only).

#### GET /product/find/{id}
- find a specific product by ID (Admin only).
#### GET /products
- Retrieve all products.
  
  Query Parameters:
  - `sort`: Sort products by 'new' or 'category'. Defaults to 'new'.
  
#### DELETE /products/{id}
- Delete a specific product by ID (Admin only).


#### PATCH /products/{id}
- Update a specific product by ID (Admin only).



### Orders

#### POST /Order
- Add a new order (User only).

#### DELETE /orders/{id}
- Delete a specific order by ID (User only).

#### PATCH /orders/{id}
- Update a specific order by ID (User only).

#### GET /orders/find/{id}
- Get orders by user ID (Admin only).

#### GET /Orders
- Get all orders (Admin only).

#### GET /incomes
- Get site incomes (Admin only).

## Authentication and Authorization

- Authentication is required for most routes using JWT tokens (`verifyToken` middleware).
- Different roles (admin, user) have different levels of access (`verifyTokenAndAuthorization`, `verifyTokenAdmin` middlewares).



### Carts

#### POST /Cart
- Create a new cart .

#### DELETE /cart/{id}
- Delete a specific cart by ID.

#### PATCH /cart/{id}
- Update a specific cart by ID .

#### GET /cart/{id}
- Retrieve details of a specific cart by ID .

#### GET /Carts
 Retrieve all carts (Admin only).



## Installation

### Clone the repository:

```bash
git clone https://github.com/omarokstar/Ecommerce-API 
cd Ecommerce-API 
Configure environment variables:
Copy .env.example to


## Install dependencies:

### Install backend dependencies:

npm install

Run the development server:

nodemon app.js


