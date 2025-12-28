# KiranaFresh Backend API Specification

Complete REST API specification for the grocery delivery application.

## Base URL
```
https://api.yourdomain.com/api
```

## Authentication

All protected routes require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

---

## Auth Endpoints

### POST /auth/send-otp
Send OTP to mobile number for login/registration.

**Request:**
```json
{
  "phone": "9876543210"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "OTP sent successfully"
}
```

---

### POST /auth/verify-otp
Verify OTP and get JWT token.

**Request:**
```json
{
  "phone": "9876543210",
  "otp": "1234"
}
```

**Response (200):**
```json
{
  "success": true,
  "user": {
    "id": "uuid",
    "name": "John Doe",
    "phone": "9876543210",
    "role": "user"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

## Products Endpoints

### GET /products
Get all products with optional filters.

**Query Parameters:**
- `category_id` (optional): Filter by category
- `shop_id` (optional): Filter by shop
- `search` (optional): Search by name/description
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 20)

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "prod-1",
      "name": "Amul Milk",
      "description": "Fresh toned milk",
      "price": 28,
      "mrp": 30,
      "stock": 50,
      "unit": "500ml",
      "category_id": "cat-1",
      "shop_id": "shop-1",
      "image_url": "https://...",
      "is_active": true
    }
  ],
  "total": 100,
  "page": 1,
  "limit": 20
}
```

---

### GET /products/:id
Get single product by ID.

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "prod-1",
    "name": "Amul Milk",
    "description": "Fresh toned milk",
    "price": 28,
    "mrp": 30,
    "stock": 50,
    "unit": "500ml",
    "category_id": "cat-1",
    "shop_id": "shop-1",
    "image_url": "https://...",
    "is_active": true,
    "category": {
      "id": "cat-1",
      "name": "Dairy & Eggs"
    },
    "shop": {
      "id": "shop-1",
      "name": "Fresh Dairy Hub"
    }
  }
}
```

---

### POST /products (Admin Only)
Create a new product.

**Request (multipart/form-data):**
```
name: "New Product"
description: "Product description"
price: 50
mrp: 60
stock: 100
unit: "1kg"
category_id: "cat-1"
shop_id: "shop-1"
image: <file>
```

**Response (201):**
```json
{
  "success": true,
  "data": { /* product object */ }
}
```

---

### PUT /products/:id (Admin Only)
Update a product.

---

### DELETE /products/:id (Admin Only)
Delete a product.

---

## Categories Endpoints

### GET /categories
Get all categories.

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "cat-1",
      "name": "Dairy & Eggs",
      "icon": "🥛",
      "image_url": "https://...",
      "product_count": 45
    }
  ]
}
```

---

## Cart Endpoints

### GET /cart
Get current user's cart.

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "cart-1",
    "items": [
      {
        "id": "item-1",
        "product_id": "prod-1",
        "quantity": 2,
        "product": {
          "id": "prod-1",
          "name": "Amul Milk",
          "price": 28,
          "mrp": 30,
          "image_url": "https://..."
        }
      }
    ],
    "total_amount": 56,
    "total_savings": 4
  }
}
```

---

### POST /cart/add
Add item to cart.

**Request:**
```json
{
  "product_id": "prod-1",
  "quantity": 1
}
```

---

### PUT /cart/update
Update item quantity.

**Request:**
```json
{
  "product_id": "prod-1",
  "quantity": 3
}
```

---

### DELETE /cart/remove
Remove item from cart.

**Request:**
```json
{
  "product_id": "prod-1"
}
```

---

## Orders Endpoints

### POST /orders
Create a new order from cart.

**Request:**
```json
{
  "address_id": "addr-1",
  "payment_mode": "cod"
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "id": "order-1",
    "order_number": "ORD123456",
    "total_amount": 156,
    "payment_mode": "cod",
    "order_status": "confirmed",
    "estimated_delivery_time": "10-15 min"
  }
}
```

---

### GET /orders/user
Get current user's orders.

---

### GET /orders/admin (Admin Only)
Get all orders for admin.

---

## Addresses Endpoints

### GET /addresses
Get current user's addresses.

### POST /addresses
Create new address.

### PUT /addresses/:id
Update address.

### DELETE /addresses/:id
Delete address.

### PUT /addresses/:id/default
Set address as default.

---

## Image Upload

Images should be uploaded using `multipart/form-data` to:
```
POST /upload
```

Images are stored in `/uploads/products/` and the URL is returned:
```json
{
  "success": true,
  "url": "https://api.domain.com/uploads/products/image-123.jpg"
}
```

**IMPORTANT:** Never store images in database. Store only the URL path.

---

## Error Responses

All errors follow this format:
```json
{
  "success": false,
  "error": "Error message",
  "code": "ERROR_CODE"
}
```

Common HTTP status codes:
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Internal Server Error
