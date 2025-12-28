// API Configuration - Replace with your actual backend URL
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Token management
let authToken: string | null = localStorage.getItem('auth_token');

export const setAuthToken = (token: string | null) => {
  authToken = token;
  if (token) {
    localStorage.setItem('auth_token', token);
  } else {
    localStorage.removeItem('auth_token');
  }
};

export const getAuthToken = () => authToken;

// Generic API request function
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(authToken && { Authorization: `Bearer ${authToken}` }),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Network error' }));
    throw new Error(error.message || `HTTP error! status: ${response.status}`);
  }

  return response.json();
}

// Auth API
export const authApi = {
  sendOtp: (phone: string) =>
    apiRequest<{ success: boolean; message: string }>('/auth/send-otp', {
      method: 'POST',
      body: JSON.stringify({ phone }),
    }),

  verifyOtp: (phone: string, otp: string) =>
    apiRequest<{ success: boolean; user: any; token: string }>('/auth/verify-otp', {
      method: 'POST',
      body: JSON.stringify({ phone, otp }),
    }),

  getProfile: () =>
    apiRequest<{ success: boolean; user: any }>('/auth/profile'),
};

// Products API
export const productsApi = {
  getAll: (params?: { category_id?: string; shop_id?: string; search?: string }) => {
    const searchParams = new URLSearchParams();
    if (params?.category_id) searchParams.set('category_id', params.category_id);
    if (params?.shop_id) searchParams.set('shop_id', params.shop_id);
    if (params?.search) searchParams.set('search', params.search);
    const query = searchParams.toString();
    return apiRequest<{ success: boolean; data: any[] }>(`/products${query ? `?${query}` : ''}`);
  },

  getById: (id: string) =>
    apiRequest<{ success: boolean; data: any }>(`/products/${id}`),

  create: (data: any) =>
    apiRequest<{ success: boolean; data: any }>('/products', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  update: (id: string, data: any) =>
    apiRequest<{ success: boolean; data: any }>(`/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  delete: (id: string) =>
    apiRequest<{ success: boolean }>(`/products/${id}`, {
      method: 'DELETE',
    }),
};

// Categories API
export const categoriesApi = {
  getAll: () =>
    apiRequest<{ success: boolean; data: any[] }>('/categories'),
};

// Shops API
export const shopsApi = {
  getAll: () =>
    apiRequest<{ success: boolean; data: any[] }>('/shops'),

  getById: (id: string) =>
    apiRequest<{ success: boolean; data: any }>(`/shops/${id}`),
};

// Cart API
export const cartApi = {
  get: () =>
    apiRequest<{ success: boolean; data: any }>('/cart'),

  add: (product_id: string, quantity: number) =>
    apiRequest<{ success: boolean; data: any }>('/cart/add', {
      method: 'POST',
      body: JSON.stringify({ product_id, quantity }),
    }),

  update: (product_id: string, quantity: number) =>
    apiRequest<{ success: boolean; data: any }>('/cart/update', {
      method: 'PUT',
      body: JSON.stringify({ product_id, quantity }),
    }),

  remove: (product_id: string) =>
    apiRequest<{ success: boolean }>('/cart/remove', {
      method: 'DELETE',
      body: JSON.stringify({ product_id }),
    }),

  clear: () =>
    apiRequest<{ success: boolean }>('/cart/clear', {
      method: 'DELETE',
    }),
};

// Orders API
export const ordersApi = {
  create: (data: { address_id: string; payment_mode: string }) =>
    apiRequest<{ success: boolean; data: any }>('/orders', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  getUserOrders: () =>
    apiRequest<{ success: boolean; data: any[] }>('/orders/user'),

  getById: (id: string) =>
    apiRequest<{ success: boolean; data: any }>(`/orders/${id}`),

  getAdminOrders: () =>
    apiRequest<{ success: boolean; data: any[] }>('/orders/admin'),
};

// Address API
export const addressApi = {
  getAll: () =>
    apiRequest<{ success: boolean; data: any[] }>('/addresses'),

  create: (data: any) =>
    apiRequest<{ success: boolean; data: any }>('/addresses', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  update: (id: string, data: any) =>
    apiRequest<{ success: boolean; data: any }>(`/addresses/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  delete: (id: string) =>
    apiRequest<{ success: boolean }>(`/addresses/${id}`, {
      method: 'DELETE',
    }),

  setDefault: (id: string) =>
    apiRequest<{ success: boolean }>(`/addresses/${id}/default`, {
      method: 'PUT',
    }),
};
