import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, X, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { ProductCard } from '@/components/product/ProductCard';
import { BottomNav } from '@/components/layout/BottomNav';
import { mockProducts } from '@/data/mockData';
import type { Product } from '@/types';

export default function SearchPage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const [recentSearches] = useState(['Milk', 'Eggs', 'Bread', 'Vegetables']);

  useEffect(() => {
    if (query.trim()) {
      const filtered = mockProducts.filter(
        p => p.name.toLowerCase().includes(query.toLowerCase()) ||
             p.description.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered);
    } else {
      setResults([]);
    }
  }, [query]);

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Search Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-card/95 backdrop-blur-lg safe-area-top">
        <div className="flex items-center gap-3 px-4 py-3">
          <button onClick={() => navigate(-1)} className="flex h-10 w-10 items-center justify-center">
            <ArrowLeft className="h-5 w-5 text-foreground" />
          </button>
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for products..."
              autoFocus
              className="w-full rounded-xl bg-secondary py-3 pl-10 pr-10 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                <X className="h-5 w-5 text-muted-foreground" />
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="px-4 py-4">
        {/* Recent Searches */}
        {!query && (
          <section>
            <h2 className="mb-3 text-sm font-semibold text-muted-foreground">Recent Searches</h2>
            <div className="flex flex-wrap gap-2">
              {recentSearches.map((term) => (
                <button
                  key={term}
                  onClick={() => setQuery(term)}
                  className="rounded-full bg-secondary px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary/80"
                >
                  {term}
                </button>
              ))}
            </div>
          </section>
        )}

        {/* Search Results */}
        {query && (
          <section>
            <p className="mb-4 text-sm text-muted-foreground">
              {results.length} results for "{query}"
            </p>
            {results.length > 0 ? (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                {results.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <Search className="mb-4 h-12 w-12 text-muted-foreground/50" />
                <p className="text-foreground font-medium">No products found</p>
                <p className="text-sm text-muted-foreground">Try a different search term</p>
              </div>
            )}
          </section>
        )}
      </main>

      <BottomNav />
    </div>
  );
}
