import { User, MapPin, Package, HelpCircle, LogOut, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BottomNav } from '@/components/layout/BottomNav';
import { useAuthStore } from '@/store/authStore';

const menuItems = [
  { icon: MapPin, label: 'My Addresses', path: '/addresses' },
  { icon: Package, label: 'My Orders', path: '/orders' },
  { icon: HelpCircle, label: 'Help & Support', path: '/help' },
];

export default function ProfilePage() {
  const { user, isAuthenticated, logout } = useAuthStore();

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="bg-primary px-4 pb-8 pt-6 safe-area-top">
        <h1 className="text-xl font-bold text-primary-foreground">Profile</h1>
        <div className="mt-4 flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-foreground/20">
            <User className="h-8 w-8 text-primary-foreground" />
          </div>
          <div>
            <p className="text-lg font-bold text-primary-foreground">
              {isAuthenticated ? user?.name || 'Guest User' : 'Welcome!'}
            </p>
            <p className="text-sm text-primary-foreground/80">
              {isAuthenticated ? user?.phone : 'Login to access all features'}
            </p>
          </div>
        </div>
      </header>

      <main className="-mt-4 px-4">
        <div className="rounded-2xl bg-card shadow-card overflow-hidden">
          {!isAuthenticated && (
            <Link
              to="/login"
              className="flex items-center justify-between border-b border-border p-4 transition-colors hover:bg-secondary"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-light">
                  <User className="h-5 w-5 text-primary" />
                </div>
                <span className="font-semibold text-foreground">Login / Sign Up</span>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </Link>
          )}
          
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="flex items-center justify-between border-b border-border p-4 transition-colors hover:bg-secondary last:border-b-0"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary">
                  <item.icon className="h-5 w-5 text-foreground" />
                </div>
                <span className="font-medium text-foreground">{item.label}</span>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </Link>
          ))}

          {isAuthenticated && (
            <button
              onClick={logout}
              className="flex w-full items-center justify-between p-4 transition-colors hover:bg-secondary"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10">
                  <LogOut className="h-5 w-5 text-destructive" />
                </div>
                <span className="font-medium text-destructive">Logout</span>
              </div>
            </button>
          )}
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          KiranaFresh v1.0.0
        </p>
      </main>

      <BottomNav />
    </div>
  );
}
