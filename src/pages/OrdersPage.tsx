import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Package, ChevronRight, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BottomNav } from '@/components/layout/BottomNav';
import { useOrderStore } from '@/store/orderStore';
import type { OrderStatus } from '@/types';

const statusColors: Record<OrderStatus, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  confirmed: 'bg-blue-100 text-blue-800',
  preparing: 'bg-purple-100 text-purple-800',
  out_for_delivery: 'bg-orange-100 text-orange-800',
  delivered: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
};

const statusLabels: Record<OrderStatus, string> = {
  pending: 'Pending',
  confirmed: 'Confirmed',
  preparing: 'Preparing',
  out_for_delivery: 'Out for Delivery',
  delivered: 'Delivered',
  cancelled: 'Cancelled',
};

export default function OrdersPage() {
  const { orders, loadOrders, isLoading } = useOrderStore();

  useEffect(() => {
    loadOrders();
  }, []);

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="border-b border-border bg-card px-4 py-4 safe-area-top">
        <h1 className="text-xl font-bold text-foreground">My Orders</h1>
      </header>

      <main className="px-4 py-4">
        {orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary-light">
              <Package className="h-10 w-10 text-primary" />
            </div>
            <h2 className="mt-4 text-lg font-bold text-foreground">No orders yet</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Start shopping to see your orders here
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {orders.map((order, index) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="rounded-2xl bg-card p-4 shadow-card"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">Order #{order.id}</p>
                    <p className="mt-1 text-sm font-bold text-foreground">
                      ₹{order.total_amount}
                    </p>
                  </div>
                  <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusColors[order.order_status]}`}>
                    {statusLabels[order.order_status]}
                  </span>
                </div>

                <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="h-3.5 w-3.5" />
                  <span>{new Date(order.created_at).toLocaleDateString()}</span>
                  <span>•</span>
                  <span>{order.items.length} items</span>
                </div>

                <div className="mt-3 flex -space-x-2">
                  {order.items.slice(0, 4).map((item, i) => (
                    <img
                      key={i}
                      src={item.product.image_url}
                      alt={item.product.name}
                      className="h-10 w-10 rounded-full border-2 border-card bg-muted object-cover"
                    />
                  ))}
                  {order.items.length > 4 && (
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-card bg-secondary text-xs font-bold">
                      +{order.items.length - 4}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
}
