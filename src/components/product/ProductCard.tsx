import { motion } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/store/cartStore';
import type { Product } from '@/types';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const { addItem, updateQuantity, getItemQuantity } = useCartStore();
  const quantity = getItemQuantity(product.id);
  const discountPercent = Math.round(((product.mrp - product.price) / product.mrp) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-2xl bg-card shadow-card transition-shadow hover:shadow-elevated',
        className
      )}
    >
      {/* Discount Badge */}
      {discountPercent > 0 && (
        <div className="absolute left-2 top-2 z-10 rounded-md bg-primary px-1.5 py-0.5 text-[10px] font-bold text-primary-foreground">
          {discountPercent}% OFF
        </div>
      )}

      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden bg-muted/50 p-3">
        <img
          src={product.image_url}
          alt={product.name}
          className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
      </div>

      {/* Product Info */}
      <div className="flex flex-1 flex-col p-3">
        <span className="mb-1 text-[10px] font-medium text-muted-foreground">
          {product.unit}
        </span>
        <h3 className="mb-2 line-clamp-2 text-sm font-semibold leading-tight text-foreground">
          {product.name}
        </h3>

        {/* Price & Add Button */}
        <div className="mt-auto flex items-end justify-between">
          <div className="flex flex-col">
            <span className="text-base font-bold text-foreground">₹{product.price}</span>
            {product.mrp > product.price && (
              <span className="text-xs text-muted-foreground line-through">₹{product.mrp}</span>
            )}
          </div>

          {/* Add to Cart Button */}
          {quantity === 0 ? (
            <Button
              size="sm"
              variant="outline"
              onClick={() => addItem(product)}
              className="h-8 rounded-lg border-primary px-3 text-xs font-bold"
            >
              ADD
            </Button>
          ) : (
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="flex items-center gap-1 rounded-lg bg-primary p-0.5"
            >
              <button
                onClick={() => updateQuantity(product.id, quantity - 1)}
                className="flex h-7 w-7 items-center justify-center rounded-md text-primary-foreground transition-colors hover:bg-primary-dark"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="min-w-6 text-center text-sm font-bold text-primary-foreground">
                {quantity}
              </span>
              <button
                onClick={() => updateQuantity(product.id, quantity + 1)}
                className="flex h-7 w-7 items-center justify-center rounded-md text-primary-foreground transition-colors hover:bg-primary-dark"
              >
                <Plus className="h-4 w-4" />
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
