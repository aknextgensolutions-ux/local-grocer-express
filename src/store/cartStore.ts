import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product, CartItem } from '@/types';

interface CartState {
  items: CartItem[];
  
  // Computed
  totalItems: () => number;
  totalAmount: () => number;
  totalSavings: () => number;
  
  // Actions
  addItem: (product: Product, quantity?: number) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
  getItemQuantity: (productId: string) => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      totalItems: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0);
      },

      totalAmount: () => {
        return get().items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
      },

      totalSavings: () => {
        return get().items.reduce(
          (sum, item) => sum + (item.product.mrp - item.product.price) * item.quantity,
          0
        );
      },

      addItem: (product, quantity = 1) => {
        const items = get().items;
        const existingIndex = items.findIndex((item) => item.product_id === product.id);

        if (existingIndex >= 0) {
          const newItems = [...items];
          newItems[existingIndex] = {
            ...newItems[existingIndex],
            quantity: newItems[existingIndex].quantity + quantity,
          };
          set({ items: newItems });
        } else {
          const newItem: CartItem = {
            id: `cart-${product.id}-${Date.now()}`,
            product_id: product.id,
            product,
            quantity,
          };
          set({ items: [...items, newItem] });
        }
      },

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }

        const items = get().items;
        const newItems = items.map((item) =>
          item.product_id === productId ? { ...item, quantity } : item
        );
        set({ items: newItems });
      },

      removeItem: (productId) => {
        const items = get().items.filter((item) => item.product_id !== productId);
        set({ items });
      },

      clearCart: () => {
        set({ items: [] });
      },

      getItemQuantity: (productId) => {
        const item = get().items.find((item) => item.product_id === productId);
        return item?.quantity || 0;
      },
    }),
    {
      name: 'kiranafresh-cart',
    }
  )
);
