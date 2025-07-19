# Product Catalog API

A RESTful API for managing a product catalog, built with Node.js, Express, and MongoDB.

## Setup & Installation

1. **Clone the repository:**
   ```bash
   git clone <repo-url>
   cd API_Catalog
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Configure environment variables:**
   - Copy `.env` example and set your MongoDB URI (default is for local MongoDB):
     ```
     MONGO_URI=mongodb://localhost:27017/product_catalog
     PORT=5000
     ```
4. **Start the server:**
   - For development (with auto-reload):
     ```bash
     npm run dev
     ```
   - For production:
     ```bash
     npm start
     ```

The API will be available at `http://localhost:5000` by default.

## API Documentation

Interactive API docs are available at: [http://localhost:5000/api-docs](http://localhost:5000/api-docs)

All endpoints, request/response formats, and examples are documented there using Swagger UI.

## Core Endpoints

### Categories
- `POST   /api/categories` — Create a category
- `GET    /api/categories` — List all categories
- `GET    /api/categories/{id}` — Get a category by ID
- `PUT    /api/categories/{id}` — Update a category
- `DELETE /api/categories/{id}` — Delete a category

### Products
- `POST   /api/products` — Create a product
- `GET    /api/products` — List/search products (supports filters)
- `GET    /api/products/{id}` — Get a product by ID
- `PUT    /api/products/{id}` — Update a product
- `DELETE /api/products/{id}` — Delete a product
- `GET    /api/products/report/low-stock` — List low-stock products

## Features
- Product & category CRUD
- Product variants (size, color, etc.)
- Inventory tracking
- Pricing & discounts
- Search & filtering
- Low-stock reporting
- Input validation & error handling
- Interactive Swagger docs

## Testing
Use [Postman](https://www.postman.com/) or [Insomnia](https://insomnia.rest/) to test endpoints. Example requests and responses are available in the Swagger UI.

## Assumptions & Limitations
- No authentication/authorization (public API)
- Discounts are a single number (percent or fixed value)
- Inventory is tracked at both product and variant level
- No image/file upload support

## Video Walkthrough
The walkthrough video is included in the root folder
