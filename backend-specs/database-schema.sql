-- =============================================
-- KiranaFresh Database Schema for MySQL
-- Complete SQL with all tables
-- =============================================

-- Users table
CREATE TABLE users (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(15) UNIQUE NOT NULL,
    role ENUM('user', 'admin') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_phone (phone),
    INDEX idx_role (role)
);

-- User addresses table
CREATE TABLE addresses (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    user_id VARCHAR(36) NOT NULL,
    label VARCHAR(50) NOT NULL,
    full_address TEXT NOT NULL,
    landmark VARCHAR(200),
    city VARCHAR(100) NOT NULL,
    pincode VARCHAR(10) NOT NULL,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    is_default BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id)
);

-- Shops table
CREATE TABLE shops (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    name VARCHAR(200) NOT NULL,
    address TEXT NOT NULL,
    phone VARCHAR(15),
    email VARCHAR(100),
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    is_open BOOLEAN DEFAULT TRUE,
    opening_time TIME DEFAULT '08:00:00',
    closing_time TIME DEFAULT '22:00:00',
    rating DECIMAL(2, 1) DEFAULT 0,
    delivery_time VARCHAR(20) DEFAULT '15-20 min',
    image_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_is_open (is_open)
);

-- Categories table
CREATE TABLE categories (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    name VARCHAR(100) NOT NULL,
    icon VARCHAR(50),
    image_url VARCHAR(500),
    display_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_display_order (display_order)
);

-- Products table
CREATE TABLE products (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    name VARCHAR(200) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    mrp DECIMAL(10, 2) NOT NULL,
    stock INT DEFAULT 0,
    unit VARCHAR(50),
    category_id VARCHAR(36) NOT NULL,
    shop_id VARCHAR(36) NOT NULL,
    image_url VARCHAR(500),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id),
    FOREIGN KEY (shop_id) REFERENCES shops(id),
    INDEX idx_category_id (category_id),
    INDEX idx_shop_id (shop_id),
    INDEX idx_is_active (is_active),
    FULLTEXT INDEX idx_search (name, description)
);

-- Carts table
CREATE TABLE carts (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    user_id VARCHAR(36) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE INDEX idx_user_id (user_id)
);

-- Cart items table
CREATE TABLE cart_items (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    cart_id VARCHAR(36) NOT NULL,
    product_id VARCHAR(36) NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (cart_id) REFERENCES carts(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id),
    UNIQUE INDEX idx_cart_product (cart_id, product_id)
);

-- Orders table
CREATE TABLE orders (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    order_number VARCHAR(20) UNIQUE NOT NULL,
    user_id VARCHAR(36) NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    delivery_fee DECIMAL(10, 2) DEFAULT 0,
    payment_mode ENUM('cod', 'upi', 'card') DEFAULT 'cod',
    payment_status ENUM('pending', 'paid', 'failed') DEFAULT 'pending',
    order_status ENUM('pending', 'confirmed', 'preparing', 'out_for_delivery', 'delivered', 'cancelled') DEFAULT 'pending',
    delivery_address_id VARCHAR(36),
    delivery_address_snapshot JSON,
    estimated_delivery_time VARCHAR(50),
    delivered_at TIMESTAMP NULL,
    cancelled_at TIMESTAMP NULL,
    cancellation_reason TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (delivery_address_id) REFERENCES addresses(id),
    INDEX idx_user_id (user_id),
    INDEX idx_order_status (order_status),
    INDEX idx_created_at (created_at)
);

-- Order items table
CREATE TABLE order_items (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    order_id VARCHAR(36) NOT NULL,
    product_id VARCHAR(36) NOT NULL,
    product_name VARCHAR(200) NOT NULL,
    product_image_url VARCHAR(500),
    quantity INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    mrp DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id),
    INDEX idx_order_id (order_id)
);

-- OTP verification table
CREATE TABLE otp_verifications (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    phone VARCHAR(15) NOT NULL,
    otp_code VARCHAR(6) NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    is_verified BOOLEAN DEFAULT FALSE,
    attempts INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_phone (phone),
    INDEX idx_expires_at (expires_at)
);

-- Banners table
CREATE TABLE banners (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    title VARCHAR(100) NOT NULL,
    subtitle VARCHAR(200),
    image_url VARCHAR(500) NOT NULL,
    link VARCHAR(500),
    bg_color VARCHAR(20),
    display_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_is_active (is_active)
);

-- =============================================
-- SEED DATA
-- =============================================

-- Insert sample categories
INSERT INTO categories (id, name, icon, display_order) VALUES
('cat-1', 'Dairy & Eggs', '🥛', 1),
('cat-2', 'Vegetables', '🥬', 2),
('cat-3', 'Fruits', '🍎', 3),
('cat-4', 'Groceries', '🛒', 4),
('cat-5', 'Snacks', '🍿', 5),
('cat-6', 'Beverages', '🥤', 6),
('cat-7', 'Bread & Bakery', '🍞', 7),
('cat-8', 'Personal Care', '🧴', 8);

-- Insert sample shop
INSERT INTO shops (id, name, address, is_open, rating, delivery_time) VALUES
('shop-1', 'Sharma Kirana Store', 'Shop 12, Main Market, Sector 18', TRUE, 4.5, '10-15 min'),
('shop-2', 'Fresh Dairy Hub', '45, Milk Lane, Near Temple', TRUE, 4.8, '8-12 min');

-- Insert sample products
INSERT INTO products (id, name, description, price, mrp, stock, unit, category_id, shop_id, image_url) VALUES
('prod-1', 'Amul Toned Milk', 'Fresh toned milk 500ml pouch', 28, 30, 50, '500ml', 'cat-1', 'shop-2', 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400'),
('prod-2', 'Mother Dairy Curd', 'Fresh curd 400g cup', 40, 45, 30, '400g', 'cat-1', 'shop-2', 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400'),
('prod-3', 'Farm Fresh Eggs', '6 pieces brown eggs', 48, 55, 40, '6 pcs', 'cat-1', 'shop-2', 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=400'),
('prod-4', 'Fresh Tomatoes', 'Red ripe tomatoes', 35, 40, 100, '500g', 'cat-2', 'shop-1', 'https://images.unsplash.com/photo-1546470427-227c7b9e8c18?w=400'),
('prod-5', 'Onions', 'Fresh red onions', 30, 35, 150, '1kg', 'cat-2', 'shop-1', 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=400'),
('prod-6', 'Bananas', 'Fresh yellow bananas', 45, 50, 80, '1 dozen', 'cat-3', 'shop-1', 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400');

-- Insert sample banners
INSERT INTO banners (id, title, subtitle, image_url, bg_color, display_order) VALUES
('ban-1', 'Fresh Dairy', 'Up to 20% off on all dairy products', 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=800', '#E8F5E9', 1),
('ban-2', 'Farm Fresh Vegetables', 'Delivered in 10 minutes', 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800', '#FFF8E1', 2);
