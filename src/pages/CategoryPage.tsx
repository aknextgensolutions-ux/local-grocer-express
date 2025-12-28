import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Filter } from 'lucide-react';
import { ProductCard } from '@/components/product/ProductCard';
import { BottomNav } from '@/components/layout/BottomNav';
import { mockProducts, mockCategories } from '@/data/mockData';
import type { Product, Category } from '@/types';

export default function CategoryPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState<Category | null>(null);

  useEffect(() => {
    if (id === 'all') {
      setProducts(mockProducts);
      setCategory({ id: 'all', name: 'All Products', icon: '🛒' });
    } else {
      const cat = mockCategories.find(c => c.id === id);
      setCategory(cat || null);
      setProducts(mockProducts.filter(p => p.category_id === id));
    }
  }, [id]);

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="sticky top-0 z-40 border-b border-border bg-card/95 backdrop-blur-lg safe-area-top">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="flex h-10 w-10 items-center justify-center">
              <ArrowLeft className="h-5 w-5 text-foreground" />
            </button>
            <div>
              <h1 className="text-lg font-bold text-foreground">
                {category?.icon} {category?.name}
              </h1>
              <p className="text-xs text-muted-foreground">{products.length} items</p>
            </div>
          </div>
          <button className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary">
            <Filter className="h-5 w-5 text-foreground" />
          </button>
        </div>
      </header>

      <main className="px-4 py-4">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
