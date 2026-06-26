# Style Hub

A full-stack e-commerce platform built with React, Node.js, Express, and MongoDB. This application provides a complete shopping experience with user authentication, product management, shopping cart, order processing, and admin dashboard.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture Overview](#architecture-overview)
- [Database Schema](#database-schema)
- [API Documentation](#api-documentation)
- [Frontend Structure](#frontend-structure)
- [State Management](#state-management)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Project](#running-the-project)
- [Project Structure](#project-structure)
- [Available Categories & Brands](#available-categories--brands)
- [Payment Flow](#payment-flow)
- [License](#license)
- [Author](#author)

## Features

### User Features

- **User Authentication**: Secure login/registration with JWT-based authentication
- **Product Browsing**: View all products with filtering and sorting capabilities
- **Product Search**: Search products by keyword
- **Product Details**: View detailed product information including reviews
- **Shopping Cart**: Add/remove items, update quantities
- **Address Management**: Add, edit, and delete shipping addresses
- **Order Management**: Place orders, view order history, track order status
- **Product Reviews**: Add reviews and ratings for purchased products
- **PayPal Integration**: Secure payment processing via PayPal

### Admin Features

- **Dashboard**: Overview of products and orders
- **Product Management**: Add, edit, delete products with image upload
- **Image Upload**: Cloudinary integration for product images
- **Order Management**: View all orders, update order status
- **Order Details**: View detailed order information

## Tech Stack

### Frontend

- **React 19** - UI library with hooks and concurrent features
- **Vite** - Fast build tool and dev server
- **Redux Toolkit** - State management with createAsyncThunk for async operations
- **React Router DOM v7** - Client-side routing
- **TailwindCSS v4** - Utility-first CSS framework
- **shadcn/ui** - Reusable UI components built on Radix UI
- **Lucide React** - Beautiful icon library
- **Axios** - HTTP client for API requests
- **Sonner** - Toast notifications
- **class-variance-authority** - Component variant management
- **clsx & tailwind-merge** - Conditional className utilities

### Backend

- **Node.js** - JavaScript runtime
- **Express 5** - Web framework for building REST APIs
- **MongoDB** - NoSQL database
- **Mongoose 9** - ODM for MongoDB with schema validation
- **JWT (jsonwebtoken)** - Token-based authentication
- **bcryptjs** - Password hashing for security
- **Cloudinary** - Cloud image storage and manipulation
- **PayPal REST SDK** - Payment processing integration
- **Multer** - File upload middleware
- **cookie-parser** - Cookie parsing middleware
- **CORS** - Cross-Origin Resource Sharing
- **dotenv** - Environment variable management

## Architecture Overview

The application follows a typical MERN (MongoDB, Express, React, Node.js) architecture with a clear separation of concerns:

### Backend Architecture

- **MVC Pattern**: Controllers handle business logic, Models define data structure, Routes define API endpoints
- **RESTful API**: Clean REST API design with proper HTTP methods and status codes
- **Middleware**: Authentication middleware for protected routes
- **File Upload**: Multer middleware for handling multipart/form-data
- **Cookie-based Auth**: JWT tokens stored in httpOnly cookies for security

### Frontend Architecture

- **Component-based**: Reusable UI components with shadcn/ui
- **Route-based Code Splitting**: Lazy loading for better performance
- **Centralized State**: Redux Toolkit for global state management
- **Protected Routes**: Route guards for authentication and role-based access
- **Responsive Design**: Mobile-first approach with TailwindCSS

## Database Schema

### User Model

```javascript
{
  username: String (required, unique, trimmed),
  email: String (required, unique, lowercase, trimmed),
  password: String (required, trimmed),
  role: String (enum: ['user', 'admin'], default: 'user'),
  timestamps: true
}
```

### Product Model

```javascript
{
  image: String (required),
  title: String (required, trimmed),
  description: String (default: ''),
  category: String (required),
  brand: String (default: 'Any'),
  price: Number (required),
  salePrice: Number (default: 0),
  totalStock: Number (required),
  averageReview: Number (default: 0),
  timestamps: true
}
```

### Cart Model

```javascript
{
  userId: ObjectId (ref: 'User', required, unique),
  items: [{
    productId: ObjectId (ref: 'Product', required),
    quantity: Number (required, min: 1)
  }],
  timestamps: true
}
```

### Address Model

```javascript
{
  userId: ObjectId (ref: 'User', required),
  address: String (required, trimmed),
  city: String (required, trimmed),
  pincode: String (required, trimmed),
  phone: String (required, trimmed),
  notes: String (default: '', trimmed),
  timestamps: true
}
```

### Order Model

```javascript
{
  userId: ObjectId (ref: 'User', required, indexed),
  cartId: String,
  cartItems: [{
    productId: ObjectId (ref: 'Product', required),
    title: String,
    image: String,
    price: Number (required),
    quantity: Number (required, min: 1)
  }],
  addressInfo: {
    addressId: String,
    address: String,
    city: String,
    pincode: String,
    phone: String,
    notes: String
  },
  orderStatus: String (enum: ['pending', 'inProcess', 'inShipping', 'delivered', 'rejected'], default: 'pending', indexed),
  paymentMethod: String (enum: ['cod', 'card', 'upi', 'paypal'], default: 'cod'),
  paymentStatus: String (enum: ['pending', 'paid', 'failed'], default: 'pending', indexed),
  totalAmount: Number (required, min: 0),
  orderDate: Date (default: Date.now),
  orderUpdateDate: Date (default: Date.now),
  paymentId: String,
  payerId: String,
  timestamps: true
}
```

### Review Model

```javascript
{
  productId: ObjectId (ref: 'Product', required),
  userId: ObjectId (ref: 'User', required),
  userName: String (required, trimmed),
  reviewMessage: String (required, trimmed),
  reviewValue: Number (required, min: 1, max: 5),
  timestamps: true
}
```

### Feature Model

```javascript
{
  image: String,
  timestamps: true
}
```

## API Documentation

### Base URL

- Development: `http://localhost:3000`
- Production: Set via `FRONTEND_URL` environment variable

### Authentication Endpoints

#### Register User

```http
POST /api/auth/register
Content-Type: application/json

{
  "username": "string",
  "email": "string",
  "password": "string"
}
```

#### Login User

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "string",
  "password": "string"
}
```

#### Logout User

```http
POST /api/auth/logout
```

#### Check Authentication

```http
GET /api/auth/check-auth
```

Requires authentication cookie. Returns current user information.

### Shop Endpoints

#### Products

```http
GET /api/shop/products/get?category=men&brand=nike&sortBy=price-lowtohigh
```

Query parameters for filtering and sorting:

- `category`: Filter by category (men, women, kids, accessories, footwear)
- `brand`: Filter by brand (nike, adidas, puma, levi, zara, h&m)
- `sortBy`: Sort order (price-lowtohigh, price-hightolow, title-atoz, title-ztoa)

```http
GET /api/shop/products/get/:id
```

Get detailed information for a specific product.

#### Search

```http
GET /api/shop/search/:keyword
```

Search products by keyword in title or description.

#### Cart

```http
POST /api/shop/cart/add
Content-Type: application/json

{
  "userId": "ObjectId",
  "productId": "ObjectId",
  "quantity": "number"
}
```

```http
GET /api/shop/cart/get/:userId
```

Get all cart items for a user.

```http
PUT /api/shop/cart/update
Content-Type: application/json

{
  "userId": "ObjectId",
  "productId": "ObjectId",
  "quantity": "number"
}
```

```http
DELETE /api/shop/cart/delete/:userId/:productId
```

Remove an item from cart.

#### Address

```http
POST /api/shop/address/add
Content-Type: application/json

{
  "userId": "ObjectId",
  "address": "string",
  "city": "string",
  "pincode": "string",
  "phone": "string",
  "notes": "string"
}
```

```http
GET /api/shop/address/get/:userId
```

Get all addresses for a user.

```http
PUT /api/shop/address/update/:userId/:addressId
Content-Type: application/json

{
  "address": "string",
  "city": "string",
  "pincode": "string",
  "phone": "string",
  "notes": "string"
}
```

```http
DELETE /api/shop/address/delete/:userId/:addressId
```

Delete an address.

#### Orders

```http
POST /api/shop/order/create
Content-Type: application/json

{
  "userId": "ObjectId",
  "cartItems": [...],
  "addressInfo": {...},
  "orderStatus": "string",
  "paymentMethod": "string",
  "paymentStatus": "string",
  "totalAmount": "number"
}
```

Returns PayPal approval URL for payment.

```http
POST /api/shop/order/capture
Content-Type: application/json

{
  "paymentId": "string",
  "payerId": "string",
  "orderId": "ObjectId"
}
```

Capture PayPal payment after user approval.

```http
GET /api/shop/order/list/:userId
```

Get all orders for a user.

```http
GET /api/shop/order/details/:orderId
```

Get detailed information for a specific order.

#### Reviews

```http
POST /api/shop/review/add
Content-Type: application/json

{
  "productId": "ObjectId",
  "userId": "ObjectId",
  "userName": "string",
  "reviewMessage": "string",
  "reviewValue": "number"
}
```

```http
GET /api/shop/review/:productId
```

Get all reviews for a product.

### Admin Endpoints

#### Products

```http
POST /api/admin/products/upload-image
Content-Type: multipart/form-data

my_file: <file>
```

Upload product image to Cloudinary.

```http
POST /api/admin/products/add
Content-Type: application/json

{
  "image": "string",
  "title": "string",
  "description": "string",
  "category": "string",
  "brand": "string",
  "price": "number",
  "salePrice": "number",
  "totalStock": "number"
}
```

```http
GET /api/admin/products/get
```

Get all products (admin view).

```http
PUT /api/admin/products/edit/:id
Content-Type: application/json

{
  "image": "string",
  "title": "string",
  "description": "string",
  "category": "string",
  "brand": "string",
  "price": "number",
  "salePrice": "number",
  "totalStock": "number"
}
```

```http
DELETE /api/admin/products/delete/:id
```

Delete a product.

#### Orders

```http
GET /api/admin/order/get
```

Get all orders from all users.

```http
GET /api/admin/order/get/:orderId
```

Get detailed order information.

```http
PUT /api/admin/order/update/:orderId
Content-Type: application/json

{
  "orderStatus": "string"
}
```

Update order status (pending, inProcess, inShipping, delivered, rejected).

### Common Endpoints

#### Features

```http
POST /api/common/feature/add
Content-Type: application/json

{
  "image": "string"
}
```

```http
GET /api/common/feature/get
```

Get feature banner images.

## Frontend Structure

### Pages

#### Authentication Pages

- `/auth/login` - User login page
- `/auth/register` - User registration page

#### Admin Pages

- `/admin/dashboard` - Admin dashboard overview
- `/admin/products` - Product management (add, edit, delete)
- `/admin/orders` - Order management (view, update status)

#### Shopping Pages

- `/shop/home` - Home page with featured products
- `/shop/listing` - Product listing with filters and sorting
- `/shop/account` - User account page with order history
- `/shop/checkout` - Checkout page with address selection
- `/shop/paypal-return` - PayPal return handler
- `/shop/payment-success` - Payment success confirmation
- `/shop/search` - Product search page

#### Other Pages

- `/unauth-page` - Unauthorized access page
- `/*` - 404 Not Found page

### Components

#### UI Components (shadcn/ui)

- `avatar`, `badge`, `button`, `card`, `checkbox`, `dialog`, `dropdown-menu`, `input`, `label`, `select`, `separator`, `sheet`, `skeleton`, `table`, `tabs`, `textarea`

#### Common Components

- `check-auth` - Authentication guard component
- `form` - Reusable form component with validation
- `loading` - Loading screen component
- `star-rating` - Star rating display component

#### Auth Components

- `layout` - Authentication layout wrapper

#### Shopping Components

- `layout` - Shopping layout with header and sidebar
- `header` - Navigation header with menu
- `productTile` - Product card component
- `product-detail` - Detailed product view
- `cart-wrapper` - Shopping cart container
- `cart-items-cnt` - Cart items list
- `address` - Address management component
- `address-card` - Individual address card
- `filter` - Product filter sidebar
- `orders` - User orders list
- `order-details` - Detailed order view

#### Admin Components

- `layout` - Admin layout with sidebar
- `sidebar` - Admin navigation sidebar
- `header` - Admin header
- `productTile` - Admin product card
- `image-upload` - Image upload component
- `orders` - Orders list table
- `orders-details` - Detailed order view

## State Management

### Redux Store Structure

The application uses Redux Toolkit for state management with the following slices:

#### Auth Slice (`auth`)

- `isAuthenticated` - Boolean authentication status
- `isLoading` - Loading state for auth operations
- `user` - Current user object
- **Actions**: `registerUser`, `loginUser`, `logoutUser`, `checkAuth`, `setUser`

#### Shop Product Slice (`shopProduct`)

- `isLoading` - Loading state
- `productList` - Array of filtered products
- `productDetails` - Single product details
- **Actions**: `fetchAllFilteredProducts`, `fetchProductDetails`, `setProductDetails`

#### Shop Cart Slice (`shopCart`)

- `cartItems` - Array of cart items
- `isLoading` - Loading state
- **Actions**: `addToCart`, `fetchCartItems`, `deleteCartItem`, `updateCartQuantity`

#### Shop Address Slice (`shopAddress`)

- `addressList` - Array of user addresses
- `isLoading` - Loading state
- **Actions**: `fetchAllAddresses`, `addNewAddress`, `editAddress`, `deleteAddress`

#### Shop Order Slice (`shopOrder`)

- `approvalURL` - PayPal approval URL
- `orderId` - Current order ID
- `orderList` - User's orders
- `orderDetails` - Detailed order info
- `isLoading` - Loading state
- **Actions**: `createNewOrder`, `capturePayment`, `getAllOrders`, `getOrderDetails`, `resetOrderDetails`

#### Shop Search Slice (`shopSearch`)

- `searchResults` - Search results array
- `isLoading` - Loading state
- **Actions**: `getSearchResults`, `resetSearchResults`

#### Shop Review Slice (`shopReview`)

- `reviews` - Product reviews array
- `isLoading` - Loading state
- **Actions**: `addReview`, `getReviews`, `clearReviews`

#### Admin Product Slice (`adminProduct`)

- `productList` - All products array
- `isLoading` - Loading state
- **Actions**: `addProduct`, `fetchAllProducts`, `editProduct`, `deleteProduct`

#### Admin Order Slice (`adminOrder`)

- `orderList` - All orders array
- `orderDetails` - Detailed order info
- `isLoading` - Loading state
- **Actions**: `getAllOrders`, `getOrderDetails`, `updateOrderStatus`, `resetOrderDetails`

#### Common Feature Slice (`commonFeature`)

- Feature banner data
- **Actions**: Feature-related operations

## Prerequisites

- **Node.js** (v18 or higher)
- **MongoDB** (local installation or MongoDB Atlas account)
- **Cloudinary** account (for image storage)
- **PayPal Developer** account (for payment processing)
- **Git** (for version control)

## Installation

### 1. Clone the repository

```bash
git clone <repository-url>
cd P5
```

### 2. Install server dependencies

```bash
cd server
npm install
```

### 3. Install client dependencies

```bash
cd ../client
npm install
```

## Environment Variables

### Server Environment Variables

Create a `.env` file in the `server` directory:

```env
# MongoDB Connection
MONGO_URL=your_mongodb_connection_string

# JWT Secret (generate a secure random string)
JWT_SECRET=your_jwt_secret_key

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# PayPal Configuration
PAYPAL_MODE=sandbox
PAYPAL_CLIENT_ID=your_paypal_client_id
PAYPAL_SECRET_KEY=your_paypal_client_secret

# Server Configuration
PORT=3000
FRONTEND_URL=http://localhost:5173
```

### Client Environment Variables

Create a `.env` file in the `client` directory:

```env
VITE_API_URL=http://localhost:3000/api
```

## Running the Project

### Development Mode

#### Start the server

```bash
cd server
npm run dev
```

Server runs on `http://localhost:3000`

#### Start the client (in a new terminal)

```bash
cd client
npm run dev
```

Client runs on `http://localhost:5173`

### Production Mode

#### Build the client

```bash
cd client
npm run build
```

#### Start the server

```bash
cd server
npm start
```

## Project Structure

```
P5/
├── client/                          # React Frontend
│   ├── public/                      # Static assets
│   ├── src/
│   │   ├── assets/                  # Images, fonts, etc.
│   │   ├── components/              # React components
│   │   │   ├── admin-view/          # Admin-specific components
│   │   │   │   ├── header.jsx
│   │   │   │   ├── image-upload.jsx
│   │   │   │   ├── layout.jsx
│   │   │   │   ├── orders-details.jsx
│   │   │   │   ├── orders.jsx
│   │   │   │   ├── productTile.jsx
│   │   │   │   └── sidebar.jsx
│   │   │   ├── auth/               # Authentication components
│   │   │   │   └── layout.jsx
│   │   │   ├── common/             # Shared components
│   │   │   │   ├── check-auth.jsx
│   │   │   │   ├── form.jsx
│   │   │   │   ├── loading.jsx
│   │   │   │   └── star-rating.jsx
│   │   │   ├── shopping-view/      # Shopping components
│   │   │   │   ├── address-card.jsx
│   │   │   │   ├── address.jsx
│   │   │   │   ├── cart-items-cnt.jsx
│   │   │   │   ├── cart-wrapper.jsx
│   │   │   │   ├── filter.jsx
│   │   │   │   ├── header.jsx
│   │   │   │   ├── layout.jsx
│   │   │   │   ├── order-details.jsx
│   │   │   │   ├── orders.jsx
│   │   │   │   ├── product-detail.jsx
│   │   │   │   └── productTile.jsx
│   │   │   └── ui/                 # shadcn/ui components
│   │   │       ├── avatar.jsx
│   │   │       ├── badge.jsx
│   │   │       ├── button.jsx
│   │   │       ├── card.jsx
│   │   │       ├── checkbox.jsx
│   │   │       ├── dialog.jsx
│   │   │       ├── dropdown-menu.jsx
│   │   │       ├── input.jsx
│   │   │       ├── label.jsx
│   │   │       ├── select.jsx
│   │   │       ├── separator.jsx
│   │   │       ├── sheet.jsx
│   │   │       ├── skeleton.jsx
│   │   │       ├── table.jsx
│   │   │       ├── tabs.jsx
│   │   │       └── textarea.jsx
│   │   ├── config/                 # Configuration files
│   │   │   └── index.js            # Form controls, menu items, filters
│   │   ├── lib/                    # Utility functions
│   │   │   └── utils.js            # cn() utility for className merging
│   │   ├── pages/                  # Page components
│   │   │   ├── admin-view/         # Admin pages
│   │   │   │   ├── dashboard.jsx
│   │   │   │   ├── orders.jsx
│   │   │   │   └── products.jsx
│   │   │   ├── auth/               # Auth pages
│   │   │   │   ├── login.jsx
│   │   │   │   └── register.jsx
│   │   │   ├── not-found/          # 404 page
│   │   │   │   └── index.jsx
│   │   │   ├── shopping-view/      # Shopping pages
│   │   │   │   ├── account.jsx
│   │   │   │   ├── checkout.jsx
│   │   │   │   ├── home.jsx
│   │   │   │   ├── listing.jsx
│   │   │   │   ├── payment-success.jsx
│   │   │   │   ├── paypal-return.jsx
│   │   │   │   └── search.jsx
│   │   │   └── unauth-page.jsx     # Unauthorized page
│   │   ├── store/                  # Redux store
│   │   │   ├── admin/              # Admin slices
│   │   │   │   ├── orders-slice/
│   │   │   │   │   └── index.js
│   │   │   │   └── products-slice/
│   │   │   │       └── index.js
│   │   │   ├── auth-slice/         # Authentication slice
│   │   │   │   └── index.js
│   │   │   ├── common/             # Common slice
│   │   │   │   └── index.js
│   │   │   ├── shop/               # Shopping slices
│   │   │   │   ├── address-slice/
│   │   │   │   │   └── index.js
│   │   │   │   ├── cart-slice/
│   │   │   │   │   └── index.js
│   │   │   │   ├── order-slice/
│   │   │   │   │   └── index.js
│   │   │   │   ├── product-slice/
│   │   │   │   │   └── index.js
│   │   │   │   ├── review-slice/
│   │   │   │   │   └── index.js
│   │   │   │   └── search-slice/
│   │   │   │       └── index.js
│   │   │   └── store.js            # Store configuration
│   │   ├── App.jsx                 # Main App component with routing
│   │   ├── index.css               # Global styles
│   │   └── main.jsx                # React entry point
│   ├── .env                        # Environment variables
│   ├── index.html                  # HTML template
│   ├── package.json                # Dependencies
│   ├── postcss.config.js           # PostCSS configuration
│   ├── tailwind.config.js          # Tailwind configuration
│   ├── vercel.json                 # Vercel deployment config
│   └── vite.config.js              # Vite configuration
├── server/                         # Express Backend
│   ├── src/
│   │   ├── controllers/            # Route controllers
│   │   │   ├── admin/              # Admin controllers
│   │   │   │   ├── order-controller.js
│   │   │   │   └── products.controller.js
│   │   │   ├── auth/               # Auth controllers
│   │   │   │   └── auth.controller.js
│   │   │   ├── common/             # Common controllers
│   │   │   │   └── feature.controller.js
│   │   │   └── shop/               # Shop controllers
│   │   │       ├── address.controller.js
│   │   │       ├── cart.controller.js
│   │   │       ├── order-controller.js
│   │   │       ├── products.controller.js
│   │   │       ├── review.controller.js
│   │   │       └── search.controller.js
│   │   ├── models/                 # MongoDB models
│   │   │   ├── address.model.js
│   │   │   ├── cart.model.js
│   │   │   ├── feature.model.js
│   │   │   ├── order.model.js
│   │   │   ├── product.model.js
│   │   │   ├── review.model.js
│   │   │   └── user.model.js
│   │   ├── routes/                 # API routes
│   │   │   ├── admin/              # Admin routes
│   │   │   │   ├── order.routes.js
│   │   │   │   └── product.routes.js
│   │   │   ├── auth/               # Auth routes
│   │   │   │   └── auth.routes.js
│   │   │   ├── common/             # Common routes
│   │   │   │   └── feature.routes.js
│   │   │   └── shop/               # Shop routes
│   │   │       ├── address.routes.js
│   │   │       ├── cart.routes.js
│   │   │       ├── order.routes.js
│   │   │       ├── product.routes.js
│   │   │       ├── review.routes.js
│   │   │       └── search.routes.js
│   │   ├── utils/                  # Utility functions
│   │   │   ├── cloudinary.js       # Cloudinary configuration
│   │   │   └── paypal.js           # PayPal configuration
│   │   └── index.js                # Server entry point
│   ├── .env                        # Environment variables
│   ├── package.json                # Dependencies
│   └── node_modules/               # Installed packages
├── .git/                          # Git repository
└── README.md                      # This file
```

## Available Categories & Brands

### Product Categories

- **Men** - Men's clothing and accessories
- **Women** - Women's clothing and accessories
- **Kids** - Children's clothing and accessories
- **Accessories** - Various accessories
- **Footwear** - Shoes and footwear

### Product Brands

- **Nike** - Sportswear and athletic products
- **Adidas** - Sportswear and athletic products
- **Puma** - Sportswear and athletic products
- **Levi's** - Denim and casual wear
- **Zara** - Fashion clothing
- **H&M** - Fashion clothing

### Sort Options

- **Price: Low to High** - Sort by ascending price
- **Price: High to Low** - Sort by descending price
- **Title: A to Z** - Sort alphabetically ascending
- **Title: Z to A** - Sort alphabetically descending

## Payment Flow

1. **Order Creation**: User creates order with cart items and address
2. **PayPal Approval**: Server generates PayPal approval URL
3. **User Redirect**: User is redirected to PayPal for payment
4. **Payment Approval**: User approves payment on PayPal
5. **Return Handler**: User returns to application with payment ID and payer ID
6. **Payment Capture**: Server captures payment using PayPal API
7. **Order Update**: Order status is updated to "paid"
8. **Confirmation**: User sees payment success page

## License

ISC

## Author

Swaraj Unde
