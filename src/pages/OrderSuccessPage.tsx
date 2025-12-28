import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, Package, Clock } from 'lucide-react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useOrderStore } from '@/store/orderStore';
import confetti from 'canvas-confetti';

export default function OrderSuccessPage() {
  const { id } = useParams<{ id: string }>();
  const order = useOrderStore(state => state.getOrderById(id || ''));

  useEffect(() => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#22c55e', '#eab308', '#3b82f6'],
    });
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 py-8">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        className="flex h-24 w-24 items-center justify-center rounded-full bg-primary"
      >
        <Check className="h-12 w-12 text-primary-foreground" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-6 text-center"
      >
        <h1 className="text-2xl font-bold text-foreground">Order Placed!</h1>
        <p className="mt-2 text-muted-foreground">
          Your order #{id} has been confirmed
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-8 w-full max-w-sm rounded-2xl bg-card p-6 shadow-card"
      >
        <div className="flex items-center gap-4 border-b border-border pb-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-light">
            <Clock className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Estimated Delivery</p>
            <p className="text-lg font-bold text-foreground">10-15 minutes</p>
          </div>
        </div>

        {order && (
          <div className="mt-4 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Items</span>
              <span className="font-medium text-foreground">{order.items.length} items</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Payment</span>
              <span className="font-medium text-foreground uppercase">{order.payment_mode}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Total</span>
              <span className="font-bold text-foreground">₹{order.total_amount}</span>
            </div>
          </div>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-8 flex w-full max-w-sm flex-col gap-3"
      >
        <Button asChild size="lg" className="w-full">
          <Link to="/orders">
            <Package className="mr-2 h-5 w-5" />
            Track Order
          </Link>
        </Button>
        <Button asChild variant="outline" size="lg" className="w-full">
          <Link to="/">Continue Shopping</Link>
        </Button>
      </motion.div>
    </div>
  );
}
