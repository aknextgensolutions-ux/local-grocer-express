import { Home, Search, ShoppingCart, ClipboardList, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useCartStore } from '@/store/cartStore';
import { motion } from 'framer-motion';

const navItems = [
  { path: '/', icon: Home, label: 'Home' },
  { path: '/search', icon: Search, label: 'Search' },
  { path: '/cart', icon: ShoppingCart, label: 'Cart' },
  { path: '/orders', icon: ClipboardList, label: 'Orders' },
  { path: '/profile', icon: User, label: 'Profile' },
];

export function BottomNav() {
  const location = useLocation();
  const totalItems = useCartStore(state => state.totalItems());

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card/95 backdrop-blur-lg safe-area-bottom">
      <div className="mx-auto flex h-16 max-w-lg items-center justify-around px-2">
        {navItems.map(({ path, icon: Icon, label }) => {
          const isActive = location.pathname === path;
          const isCart = path === '/cart';

          return (
            <Link
              key={path}
              to={path}
              className={cn(
                'relative flex flex-col items-center justify-center gap-0.5 px-3 py-2 transition-colors',
                isActive ? 'text-primary' : 'text-muted-foreground'
              )}
            >
              <div className="relative">
                <Icon className={cn('h-6 w-6', isActive && 'stroke-[2.5px]')} />
                {isCart && totalItems > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -right-2 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground"
                  >
                    {totalItems > 9 ? '9+' : totalItems}
                  </motion.span>
                )}
              </div>
              <span className="text-[10px] font-medium">{label}</span>
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute -bottom-2 h-0.5 w-8 rounded-full bg-primary"
                />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
