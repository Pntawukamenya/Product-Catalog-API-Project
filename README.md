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

## Request/Response Examples & Status Codes

### Categories

#### Create Category
**POST** `/api/categories`
```json
{
  "name": "Electronics",
  "description": "All electronic items"
}
```
**Response (201 Created):**
```json
{
  "_id": "687b837f9c6215664b82b23a",
  "name": "Electronics",
  "description": "All electronic items",
  "createdAt": "2025-07-19T11:37:35.390Z",
  "updatedAt": "2025-07-19T11:37:35.390Z"
}
```

#### Get All Categories
**GET** `/api/categories`
**Response (200 OK):**
```json
[
  {
    "_id": "687b837f9c6215664b82b23a",
    "name": "Electronics",
    "description": "All electronic items",
    "createdAt": "2025-07-19T11:37:35.390Z",
    "updatedAt": "2025-07-19T11:37:35.390Z"
  }
]
```

#### Update Category
**PUT** `/api/categories/{id}`
```json
{
  "name": "Electronics & Gadgets",
  "description": "Updated description"
}
```
**Response (200 OK):**
```json
{
  "_id": "687b837f9c6215664b82b23a",
  "name": "Electronics & Gadgets",
  "description": "Updated description",
  "createdAt": "2025-07-19T11:37:35.390Z",
  "updatedAt": "2025-07-19T11:37:35.390Z"
}
```

#### Delete Category
**DELETE** `/api/categories/{id}`
**Response (200 OK):**
```json
{
  "message": "Category deleted"
}
```

### Products

#### Create Product
**POST** `/api/products`
```json
{
  "name": "Smartphone",
  "description": "iPhone 16 Pro",
  "category": "687b837f9c6215664b82b23a",
  "price": 1200,
  "discount": 10,
  "variants": [
    { "size": "128GB", "color": "Black", "inventory": 5 },
    { "size": "256GB", "color": "Silver", "inventory": 2 }
  ],
  "inventory": 7
}
```
**Response (201 Created):**
```json
{
  "_id": "687b85c79c6215664b82b248",
  "name": "Smartphone",
  "description": "iPhone 16 Pro",
  "category": {
    "_id": "687b837f9c6215664b82b23a",
    "name": "Electronics",
    "description": "All electronic items"
  },
  "price": 1200,
  "discount": 10,
  "variants": [
    { "size": "128GB", "color": "Black", "inventory": 5 },
    { "size": "256GB", "color": "Silver", "inventory": 2 }
  ],
  "inventory": 7,
  "createdAt": "2025-07-19T11:37:35.390Z",
  "updatedAt": "2025-07-19T11:37:35.390Z"
}
```

#### Get Products with Filters
**GET** `/api/products?name=phone&minPrice=1000&maxPrice=1300`
**Response (200 OK):**
```json
[
  {
    "_id": "687b85c79c6215664b82b248",
    "name": "Smartphone",
    "description": "iPhone 16 Pro",
    "category": {
      "_id": "687b837f9c6215664b82b23a",
      "name": "Electronics"
    },
    "price": 1200,
    "discount": 10,
    "variants": [...],
    "inventory": 7
  }
]
```

#### Low Stock Report
**GET** `/api/products/report/low-stock?threshold=5`
**Response (200 OK):**
```json
[
  {
    "_id": "687b85c79c6215664b82b248",
    "name": "Smartphone",
    "inventory": 3
  }
]
```

### Error Responses

#### Validation Error (400 Bad Request)
```json
{
  "errors": [
    {
      "type": "field",
      "value": "Electronics",
      "msg": "Invalid value",
      "path": "category",
      "location": "body"
    }
  ]
}
```

#### Not Found (404 Not Found)
```json
{
  "message": "Product not found"
}
```

#### Invalid Category (400 Bad Request)
```json
{
  "message": "Invalid category"
}
```

### Status Codes

| Code | Description | Usage |
|------|-------------|-------|
| 200  | OK | Successful GET, PUT, DELETE operations |
| 201  | Created | Successful POST operations |
| 400  | Bad Request | Validation errors, invalid data |
| 404  | Not Found | Resource not found |
| 500  | Internal Server Error | Server errors |

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
I used [Postman](https://www.postman.com/) to test endpoints. 
Example requests and responses are available in the Swagger UI.

## Assumptions & Limitations
- No authentication/authorization (public API)
- Discounts are a single number (percent or fixed value)
- Inventory is tracked at both product and variant level
- No image/file upload support

## Video Walkthrough
The walkthrough video is included in the root folder
