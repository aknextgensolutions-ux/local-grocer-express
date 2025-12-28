import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { BottomNav } from '@/components/layout/BottomNav';
import { useCartStore } from '@/store/cartStore';

export default function CartPage() {
  const navigate = useNavigate();
  const { items, totalAmount, totalSavings, updateQuantity, removeItem } = useCartStore();
  const deliveryFee = totalAmount() > 199 ? 0 : 25;
  const finalAmount = totalAmount() + deliveryFee;

  if (items.length === 0) {
    return (
      <div className="flex min-h-screen flex-col bg-background pb-20">
        <header className="border-b border-border bg-card px-4 py-4">
          <h1 className="text-xl font-bold text-foreground">My Cart</h1>
        </header>
        <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary-light">
            <ShoppingBag className="h-12 w-12 text-primary" />
          </div>
          <h2 className="text-xl font-bold text-foreground">Your cart is empty</h2>
          <p className="text-sm text-muted-foreground">
            Add items from our collection to get started
          </p>
          <Button asChild className="mt-4">
            <Link to="/">Start Shopping</Link>
          </Button>
        </div>
        <BottomNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-40">
      <header className="sticky top-0 z-40 border-b border-border bg-card/95 backdrop-blur-lg px-4 py-4">
        <h1 className="text-xl font-bold text-foreground">My Cart ({items.length} items)</h1>
      </header>

      <main className="px-4 py-4">
        {/* Savings Banner */}
        {totalSavings() > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 flex items-center justify-center gap-2 rounded-xl bg-primary-light px-4 py-2"
          >
            <span className="text-sm font-semibold text-primary">
              🎉 You're saving ₹{totalSavings().toFixed(0)} on this order!
            </span>
          </motion.div>
        )}

        {/* Cart Items */}
        <div className="space-y-3">
          <AnimatePresence>
            {items.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="flex gap-3 rounded-2xl bg-card p-3 shadow-card"
              >
                <img
                  src={item.product.image_url}
                  alt={item.product.name}
                  className="h-20 w-20 rounded-xl bg-muted/50 object-contain p-2"
                />
                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <h3 className="text-sm font-semibold text-foreground line-clamp-2">
                      {item.product.name}
                    </h3>
                    <span className="text-xs text-muted-foreground">{item.product.unit}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-foreground">
                        ₹{item.product.price * item.quantity}
                      </span>
                      {item.product.mrp > item.product.price && (
                        <span className="text-xs text-muted-foreground line-through">
                          ₹{item.product.mrp * item.quantity}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => removeItem(item.product_id)}
                        className="flex h-8 w-8 items-center justify-center rounded-lg bg-destructive/10 text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                      <div className="flex items-center gap-1 rounded-lg bg-primary p-0.5">
                        <button
                          onClick={() => updateQuantity(item.product_id, item.quantity - 1)}
                          className="flex h-7 w-7 items-center justify-center rounded-md text-primary-foreground"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="min-w-6 text-center text-sm font-bold text-primary-foreground">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product_id, item.quantity + 1)}
                          className="flex h-7 w-7 items-center justify-center rounded-md text-primary-foreground"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Bill Details */}
        <div className="mt-6 rounded-2xl bg-card p-4 shadow-card">
          <h3 className="mb-3 text-sm font-bold text-foreground">Bill Details</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Item Total</span>
              <span className="font-medium text-foreground">₹{totalAmount()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Delivery Fee</span>
              <span className={deliveryFee === 0 ? 'font-medium text-primary' : 'font-medium text-foreground'}>
                {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
              </span>
            </div>
            {totalSavings() > 0 && (
              <div className="flex justify-between text-primary">
                <span>Total Savings</span>
                <span className="font-medium">-₹{totalSavings().toFixed(0)}</span>
              </div>
            )}
            <div className="border-t border-border pt-2">
              <div className="flex justify-between">
                <span className="font-bold text-foreground">To Pay</span>
                <span className="font-bold text-foreground">₹{finalAmount}</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Checkout Footer */}
      <div className="fixed bottom-16 left-0 right-0 z-40 border-t border-border bg-card p-4">
        <Button
          size="lg"
          className="w-full gap-2"
          onClick={() => navigate('/checkout')}
        >
          Proceed to Checkout
          <ArrowRight className="h-5 w-5" />
        </Button>
      </div>

      <BottomNav />
    </div>
  );
}
