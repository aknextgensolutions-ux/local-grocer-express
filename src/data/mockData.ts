import type { Category, Product, Shop, Banner, Order, Address } from '@/types';

// Mock Categories
export const mockCategories: Category[] = [
  { id: '1', name: 'Dairy & Eggs', icon: '🥛', image_url: '/categories/dairy.jpg', product_count: 45 },
  { id: '2', name: 'Vegetables', icon: '🥬', image_url: '/categories/vegetables.jpg', product_count: 62 },
  { id: '3', name: 'Fruits', icon: '🍎', image_url: '/categories/fruits.jpg', product_count: 38 },
  { id: '4', name: 'Groceries', icon: '🛒', image_url: '/categories/groceries.jpg', product_count: 120 },
  { id: '5', name: 'Snacks', icon: '🍿', image_url: '/categories/snacks.jpg', product_count: 55 },
  { id: '6', name: 'Beverages', icon: '🥤', image_url: '/categories/beverages.jpg', product_count: 40 },
  { id: '7', name: 'Bread & Bakery', icon: '🍞', image_url: '/categories/bakery.jpg', product_count: 28 },
  { id: '8', name: 'Personal Care', icon: '🧴', image_url: '/categories/personal.jpg', product_count: 35 },
];

// Mock Shops
export const mockShops: Shop[] = [
  { id: '1', name: 'Sharma Kirana Store', address: 'Shop 12, Main Market, Sector 18', is_open: true, rating: 4.5, delivery_time: '10-15 min' },
  { id: '2', name: 'Fresh Dairy Hub', address: '45, Milk Lane, Near Temple', is_open: true, rating: 4.8, delivery_time: '8-12 min' },
  { id: '3', name: 'Gupta General Store', address: 'Block C, Housing Society', is_open: false, rating: 4.2, delivery_time: '15-20 min' },
  { id: '4', name: 'Daily Needs Mart', address: '78, Commercial Complex', is_open: true, rating: 4.6, delivery_time: '12-18 min' },
];

// Mock Products
export const mockProducts: Product[] = [
  // Dairy Products
  { id: '1', name: 'Amul Toned Milk', description: 'Fresh toned milk 500ml pouch', price: 28, mrp: 30, stock: 50, category_id: '1', shop_id: '2', image_url: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400', is_active: true, unit: '500ml', discount_percent: 7 },
  { id: '2', name: 'Mother Dairy Curd', description: 'Fresh curd 400g cup', price: 40, mrp: 45, stock: 30, category_id: '1', shop_id: '2', image_url: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400', is_active: true, unit: '400g', discount_percent: 11 },
  { id: '3', name: 'Amul Butter', description: '100g salted butter', price: 56, mrp: 58, stock: 25, category_id: '1', shop_id: '1', image_url: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=400', is_active: true, unit: '100g', discount_percent: 3 },
  { id: '4', name: 'Farm Fresh Eggs', description: '6 pieces brown eggs', price: 48, mrp: 55, stock: 40, category_id: '1', shop_id: '2', image_url: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=400', is_active: true, unit: '6 pcs', discount_percent: 13 },
  { id: '5', name: 'Paneer Fresh', description: '200g cottage cheese', price: 80, mrp: 90, stock: 20, category_id: '1', shop_id: '2', image_url: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400', is_active: true, unit: '200g', discount_percent: 11 },
  
  // Vegetables
  { id: '6', name: 'Fresh Tomatoes', description: 'Red ripe tomatoes', price: 35, mrp: 40, stock: 100, category_id: '2', shop_id: '1', image_url: 'https://images.unsplash.com/photo-1546470427-227c7b9e8c18?w=400', is_active: true, unit: '500g', discount_percent: 13 },
  { id: '7', name: 'Onions', description: 'Fresh red onions', price: 30, mrp: 35, stock: 150, category_id: '2', shop_id: '1', image_url: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=400', is_active: true, unit: '1kg', discount_percent: 14 },
  { id: '8', name: 'Potatoes', description: 'Farm fresh potatoes', price: 25, mrp: 30, stock: 200, category_id: '2', shop_id: '1', image_url: 'https://images.unsplash.com/photo-1518977676601-b53f82ber?w=400', is_active: true, unit: '1kg', discount_percent: 17 },
  { id: '9', name: 'Capsicum Green', description: 'Fresh green bell pepper', price: 60, mrp: 70, stock: 40, category_id: '2', shop_id: '1', image_url: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=400', is_active: true, unit: '250g', discount_percent: 14 },
  { id: '10', name: 'Spinach', description: 'Fresh green spinach bunch', price: 20, mrp: 25, stock: 60, category_id: '2', shop_id: '1', image_url: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400', is_active: true, unit: '1 bunch', discount_percent: 20 },
  
  // Fruits
  { id: '11', name: 'Bananas', description: 'Fresh yellow bananas', price: 45, mrp: 50, stock: 80, category_id: '3', shop_id: '1', image_url: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400', is_active: true, unit: '1 dozen', discount_percent: 10 },
  { id: '12', name: 'Apples', description: 'Shimla red apples', price: 180, mrp: 200, stock: 50, category_id: '3', shop_id: '1', image_url: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400', is_active: true, unit: '1kg', discount_percent: 10 },
  { id: '13', name: 'Oranges', description: 'Nagpur oranges', price: 80, mrp: 90, stock: 60, category_id: '3', shop_id: '1', image_url: 'https://images.unsplash.com/photo-1547514701-42782101795e?w=400', is_active: true, unit: '1kg', discount_percent: 11 },
  
  // Groceries
  { id: '14', name: 'Tata Salt', description: 'Iodized salt 1kg', price: 24, mrp: 25, stock: 100, category_id: '4', shop_id: '1', image_url: 'https://images.unsplash.com/photo-1518110925495-5fe2fda0442c?w=400', is_active: true, unit: '1kg', discount_percent: 4 },
  { id: '15', name: 'Fortune Oil', description: 'Refined sunflower oil 1L', price: 145, mrp: 160, stock: 40, category_id: '4', shop_id: '1', image_url: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400', is_active: true, unit: '1L', discount_percent: 9 },
  { id: '16', name: 'Aashirvaad Atta', description: 'Whole wheat flour 5kg', price: 260, mrp: 280, stock: 35, category_id: '4', shop_id: '1', image_url: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400', is_active: true, unit: '5kg', discount_percent: 7 },
  { id: '17', name: 'Toor Dal', description: 'Premium toor dal 1kg', price: 140, mrp: 155, stock: 45, category_id: '4', shop_id: '1', image_url: 'https://images.unsplash.com/photo-1585996746096-a8abfa979d10?w=400', is_active: true, unit: '1kg', discount_percent: 10 },
  { id: '18', name: 'Basmati Rice', description: 'Premium aged basmati 1kg', price: 120, mrp: 135, stock: 50, category_id: '4', shop_id: '1', image_url: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400', is_active: true, unit: '1kg', discount_percent: 11 },
  
  // Snacks
  { id: '19', name: 'Lays Classic', description: 'Salted potato chips 52g', price: 20, mrp: 20, stock: 100, category_id: '5', shop_id: '1', image_url: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=400', is_active: true, unit: '52g', discount_percent: 0 },
  { id: '20', name: 'Haldirams Namkeen', description: 'Aloo bhujia 200g', price: 55, mrp: 60, stock: 70, category_id: '5', shop_id: '1', image_url: 'https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=400', is_active: true, unit: '200g', discount_percent: 8 },
  
  // Beverages
  { id: '21', name: 'Coca Cola', description: 'Refreshing cola 750ml', price: 40, mrp: 40, stock: 80, category_id: '6', shop_id: '1', image_url: 'https://images.unsplash.com/photo-1554866585-cd94860890b7?w=400', is_active: true, unit: '750ml', discount_percent: 0 },
  { id: '22', name: 'Real Mango Juice', description: 'Mango fruit juice 1L', price: 99, mrp: 110, stock: 45, category_id: '6', shop_id: '1', image_url: 'https://images.unsplash.com/photo-1546173159-315724a31696?w=400', is_active: true, unit: '1L', discount_percent: 10 },
];

// Mock Banners
export const mockBanners: Banner[] = [
  { id: '1', title: 'Fresh Dairy', subtitle: 'Up to 20% off on all dairy products', image_url: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=800', bg_color: '#E8F5E9' },
  { id: '2', title: 'Farm Fresh Vegetables', subtitle: 'Delivered in 10 minutes', image_url: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800', bg_color: '#FFF8E1' },
  { id: '3', title: 'Grocery Essentials', subtitle: 'Stock up & save big', image_url: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800', bg_color: '#E3F2FD' },
];

// Mock Addresses
export const mockAddresses: Address[] = [
  { id: '1', user_id: '1', label: 'Home', full_address: 'Flat 302, Tower B, Green Valley Apartments', landmark: 'Near Central Park', city: 'Mumbai', pincode: '400001', is_default: true },
  { id: '2', user_id: '1', label: 'Office', full_address: '5th Floor, Tech Hub Building, BKC', landmark: 'Opposite Trade Center', city: 'Mumbai', pincode: '400051', is_default: false },
];

// Mock Orders
export const mockOrders: Order[] = [
  {
    id: 'ORD001',
    user_id: '1',
    items: [
      { order_id: 'ORD001', product_id: '1', product: mockProducts[0], quantity: 2, price: 28 },
      { order_id: 'ORD001', product_id: '4', product: mockProducts[3], quantity: 1, price: 48 },
    ],
    total_amount: 104,
    payment_mode: 'cod',
    order_status: 'delivered',
    delivery_address: mockAddresses[0],
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    estimated_delivery: '10-15 min',
  },
  {
    id: 'ORD002',
    user_id: '1',
    items: [
      { order_id: 'ORD002', product_id: '6', product: mockProducts[5], quantity: 1, price: 35 },
      { order_id: 'ORD002', product_id: '7', product: mockProducts[6], quantity: 2, price: 30 },
      { order_id: 'ORD002', product_id: '11', product: mockProducts[10], quantity: 1, price: 45 },
    ],
    total_amount: 140,
    payment_mode: 'upi',
    order_status: 'out_for_delivery',
    delivery_address: mockAddresses[0],
    created_at: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    estimated_delivery: '5 min',
  },
];

// Helper function to simulate API delay
export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock API functions
export const mockApi = {
  getCategories: async () => {
    await delay(300);
    return { success: true, data: mockCategories };
  },
  
  getProducts: async (params?: { category_id?: string; search?: string }) => {
    await delay(400);
    let filtered = [...mockProducts];
    if (params?.category_id) {
      filtered = filtered.filter(p => p.category_id === params.category_id);
    }
    if (params?.search) {
      const search = params.search.toLowerCase();
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(search) || 
        p.description.toLowerCase().includes(search)
      );
    }
    return { success: true, data: filtered };
  },
  
  getProduct: async (id: string) => {
    await delay(200);
    const product = mockProducts.find(p => p.id === id);
    return { success: true, data: product };
  },
  
  getShops: async () => {
    await delay(300);
    return { success: true, data: mockShops };
  },
  
  getBanners: async () => {
    await delay(200);
    return { success: true, data: mockBanners };
  },
  
  getAddresses: async () => {
    await delay(200);
    return { success: true, data: mockAddresses };
  },
  
  getOrders: async () => {
    await delay(300);
    return { success: true, data: mockOrders };
  },
};
