import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Order, OrderStatus, PaymentMode, CartItem, Address } from '@/types';
import { mockOrders } from '@/data/mockData';

interface OrderState {
  orders: Order[];
  currentOrderId: string | null;
  isLoading: boolean;
  
  // Actions
  setOrders: (orders: Order[]) => void;
  createOrder: (
    items: CartItem[],
    address: Address,
    paymentMode: PaymentMode
  ) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  getOrderById: (id: string) => Order | undefined;
  loadOrders: () => Promise<void>;
}

export const useOrderStore = create<OrderState>()(
  persist(
    (set, get) => ({
      orders: [],
      currentOrderId: null,
      isLoading: false,

      setOrders: (orders) => set({ orders }),

      createOrder: (items, address, paymentMode) => {
        const totalAmount = items.reduce(
          (sum, item) => sum + item.product.price * item.quantity,
          0
        );

        const newOrder: Order = {
          id: `ORD${Date.now().toString().slice(-6)}`,
          user_id: '1', // Would come from auth in real app
          items: items.map(item => ({
            order_id: '',
            product_id: item.product_id,
            product: item.product,
            quantity: item.quantity,
            price: item.product.price,
          })),
          total_amount: totalAmount,
          payment_mode: paymentMode,
          order_status: 'confirmed',
          delivery_address: address,
          created_at: new Date().toISOString(),
          estimated_delivery: '10-15 min',
        };

        // Update order_id in items
        newOrder.items = newOrder.items.map(item => ({
          ...item,
          order_id: newOrder.id,
        }));

        set(state => ({
          orders: [newOrder, ...state.orders],
          currentOrderId: newOrder.id,
        }));

        return newOrder;
      },

      updateOrderStatus: (orderId, status) => {
        const orders = get().orders.map(order =>
          order.id === orderId ? { ...order, order_status: status } : order
        );
        set({ orders });
      },

      getOrderById: (id) => {
        return get().orders.find(order => order.id === id);
      },

      loadOrders: async () => {
        set({ isLoading: true });
        await new Promise(resolve => setTimeout(resolve, 300));
        const orders = get().orders;
        if (orders.length === 0) {
          set({ orders: mockOrders });
        }
        set({ isLoading: false });
      },
    }),
    {
      name: 'kiranafresh-orders',
    }
  )
);
