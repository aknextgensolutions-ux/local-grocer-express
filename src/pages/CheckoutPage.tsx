import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, CreditCard, Truck, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/store/cartStore';
import { useAddressStore } from '@/store/addressStore';
import { useOrderStore } from '@/store/orderStore';
import type { PaymentMode } from '@/types';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { items, totalAmount, totalSavings, clearCart } = useCartStore();
  const { getSelectedAddress } = useAddressStore();
  const { createOrder } = useOrderStore();
  const [paymentMode, setPaymentMode] = useState<PaymentMode>('cod');
  const [isProcessing, setIsProcessing] = useState(false);

  const selectedAddress = getSelectedAddress();
  const deliveryFee = totalAmount() > 199 ? 0 : 25;
  const finalAmount = totalAmount() + deliveryFee;

  const handlePlaceOrder = async () => {
    if (!selectedAddress) {
      navigate('/addresses');
      return;
    }

    setIsProcessing(true);
    await new Promise(r => setTimeout(r, 1500));
    
    const order = createOrder(items, selectedAddress, paymentMode);
    clearCart();
    navigate(`/order-success/${order.id}`);
  };

  return (
    <div className="min-h-screen bg-background pb-32">
      <header className="sticky top-0 z-40 border-b border-border bg-card/95 backdrop-blur-lg px-4 py-4">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="flex h-10 w-10 items-center justify-center">
            <ArrowLeft className="h-5 w-5 text-foreground" />
          </button>
          <h1 className="text-xl font-bold text-foreground">Checkout</h1>
        </div>
      </header>

      <main className="px-4 py-4 space-y-4">
        {/* Delivery Address */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl bg-card p-4 shadow-card"
        >
          <div className="flex items-start justify-between">
            <div className="flex gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-light">
                <MapPin className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-foreground">Delivery Address</h3>
                {selectedAddress ? (
                  <>
                    <p className="mt-1 text-sm text-foreground">{selectedAddress.label}</p>
                    <p className="text-xs text-muted-foreground">{selectedAddress.full_address}</p>
                  </>
                ) : (
                  <p className="mt-1 text-sm text-muted-foreground">No address selected</p>
                )}
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={() => navigate('/addresses')}>
              Change
            </Button>
          </div>
        </motion.div>

        {/* Payment Mode */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-2xl bg-card p-4 shadow-card"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-light">
              <CreditCard className="h-5 w-5 text-primary" />
            </div>
            <h3 className="text-sm font-bold text-foreground">Payment Method</h3>
          </div>
          <div className="space-y-2">
            {[
              { id: 'cod', label: 'Cash on Delivery', icon: '💵' },
              { id: 'upi', label: 'UPI Payment', icon: '📱' },
            ].map((method) => (
              <button
                key={method.id}
                onClick={() => setPaymentMode(method.id as PaymentMode)}
                className={`flex w-full items-center justify-between rounded-xl border-2 p-3 transition-colors ${
                  paymentMode === method.id
                    ? 'border-primary bg-primary-light'
                    : 'border-border bg-background'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{method.icon}</span>
                  <span className="text-sm font-medium text-foreground">{method.label}</span>
                </div>
                {paymentMode === method.id && (
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary">
                    <Check className="h-4 w-4 text-primary-foreground" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Order Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-2xl bg-card p-4 shadow-card"
        >
          <h3 className="mb-3 text-sm font-bold text-foreground">Order Summary</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Items ({items.length})</span>
              <span className="font-medium text-foreground">₹{totalAmount()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Delivery</span>
              <span className={deliveryFee === 0 ? 'font-medium text-primary' : 'font-medium'}>
                {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
              </span>
            </div>
            <div className="border-t border-border pt-2">
              <div className="flex justify-between">
                <span className="font-bold text-foreground">Total</span>
                <span className="font-bold text-foreground">₹{finalAmount}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </main>

      {/* Place Order Footer */}
      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-card p-4 safe-area-bottom">
        <Button
          size="lg"
          className="w-full gap-2"
          onClick={handlePlaceOrder}
          disabled={isProcessing || !selectedAddress}
        >
          {isProcessing ? (
            <span className="animate-pulse">Processing...</span>
          ) : (
            <>
              <Truck className="h-5 w-5" />
              Place Order • ₹{finalAmount}
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
