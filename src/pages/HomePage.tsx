import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, ChevronDown, Search, Bell } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BannerCarousel } from '@/components/home/BannerCarousel';
import { CategoryCard } from '@/components/category/CategoryCard';
import { ProductCard } from '@/components/product/ProductCard';
import { BottomNav } from '@/components/layout/BottomNav';
import { mockCategories, mockProducts, mockBanners, delay } from '@/data/mockData';
import { useAddressStore } from '@/store/addressStore';
import type { Category, Product, Banner } from '@/types';

export default function HomePage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [banners, setBanners] = useState<Banner[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { loadAddresses, getSelectedAddress } = useAddressStore();
  const selectedAddress = getSelectedAddress();

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      await delay(500);
      setCategories(mockCategories);
      setProducts(mockProducts);
      setBanners(mockBanners);
      await loadAddresses();
      setIsLoading(false);
    };
    loadData();
  }, []);

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-card/95 backdrop-blur-lg safe-area-top">
        <div className="flex items-center justify-between px-4 py-3">
          {/* Location */}
          <Link to="/addresses" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-light">
              <MapPin className="h-5 w-5 text-primary" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <span className="text-sm font-bold text-foreground">
                  {selectedAddress?.label || 'Add Address'}
                </span>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </div>
              <span className="max-w-48 truncate text-xs text-muted-foreground">
                {selectedAddress?.full_address || 'Set your delivery location'}
              </span>
            </div>
          </Link>

          {/* Notifications */}
          <button className="relative flex h-10 w-10 items-center justify-center rounded-full bg-secondary">
            <Bell className="h-5 w-5 text-foreground" />
            <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-primary" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="px-4 pb-3">
          <Link
            to="/search"
            className="flex items-center gap-3 rounded-xl bg-secondary px-4 py-3"
          >
            <Search className="h-5 w-5 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Search for groceries, dairy...</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 py-4">
        {/* Banner Carousel */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <BannerCarousel banners={banners} />
        </motion.section>

        {/* Categories */}
        <section className="mb-6">
          <h2 className="mb-3 text-lg font-bold text-foreground">Shop by Category</h2>
          <div className="grid grid-cols-4 gap-3">
            {categories.slice(0, 8).map((category, index) => (
              <CategoryCard key={category.id} category={category} index={index} />
            ))}
          </div>
        </section>

        {/* Products */}
        <section>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-bold text-foreground">Popular Products</h2>
            <Link to="/category/all" className="text-sm font-semibold text-primary">
              See All
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {products.slice(0, 8).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* Dairy Section */}
        <section className="mt-6">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-bold text-foreground">🥛 Fresh Dairy</h2>
            <Link to="/category/1" className="text-sm font-semibold text-primary">
              See All
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {products.filter(p => p.category_id === '1').slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </main>

      <BottomNav />
    </div>
  );
}
