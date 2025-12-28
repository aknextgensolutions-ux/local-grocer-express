// User types
export interface User {
  id: string;
  name: string;
  phone: string;
  role: 'user' | 'admin';
  created_at: string;
}

export interface Address {
  id: string;
  user_id: string;
  label: string;
  full_address: string;
  landmark?: string;
  city: string;
  pincode: string;
  is_default: boolean;
}

// Shop types
export interface Shop {
  id: string;
  name: string;
  address: string;
  is_open: boolean;
  rating?: number;
  delivery_time?: string;
  image_url?: string;
}

// Category types
export interface Category {
  id: string;
  name: string;
  icon?: string;
  image_url?: string;
  product_count?: number;
}

// Product types
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  mrp: number;
  stock: number;
  category_id: string;
  shop_id: string;
  image_url: string;
  is_active: boolean;
  unit?: string;
  discount_percent?: number;
}

// Cart types
export interface CartItem {
  id: string;
  product_id: string;
  product: Product;
  quantity: number;
}

export interface Cart {
  id: string;
  user_id: string;
  items: CartItem[];
  total_amount: number;
  total_savings: number;
}

// Order types
export type OrderStatus = 'pending' | 'confirmed' | 'preparing' | 'out_for_delivery' | 'delivered' | 'cancelled';
export type PaymentMode = 'cod' | 'upi' | 'card';

export interface OrderItem {
  order_id: string;
  product_id: string;
  product: Product;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  user_id: string;
  items: OrderItem[];
  total_amount: number;
  payment_mode: PaymentMode;
  order_status: OrderStatus;
  delivery_address: Address;
  created_at: string;
  estimated_delivery?: string;
}

// Banner type
export interface Banner {
  id: string;
  title: string;
  subtitle?: string;
  image_url: string;
  link?: string;
  bg_color?: string;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  total: number;
  page: number;
  limit: number;
  total_pages: number;
}

// Auth types
export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface OtpRequest {
  phone: string;
}

export interface OtpVerifyRequest {
  phone: string;
  otp: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}
