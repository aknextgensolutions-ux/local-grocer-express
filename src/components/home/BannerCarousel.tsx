import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Banner } from '@/types';
import { cn } from '@/lib/utils';

interface BannerCarouselProps {
  banners: Banner[];
  autoPlayInterval?: number;
}

export function BannerCarousel({ banners, autoPlayInterval = 4000 }: BannerCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (banners.length <= 1) return;
    
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [banners.length, autoPlayInterval]);

  if (banners.length === 0) return null;

  return (
    <div className="relative overflow-hidden rounded-2xl">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
          className="relative aspect-[2/1] overflow-hidden rounded-2xl"
          style={{ backgroundColor: banners[currentIndex]?.bg_color || '#E8F5E9' }}
        >
          <img
            src={banners[currentIndex]?.image_url}
            alt={banners[currentIndex]?.title}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/60 to-transparent" />
          <div className="absolute bottom-4 left-4 right-16">
            <h3 className="text-lg font-bold text-card">{banners[currentIndex]?.title}</h3>
            <p className="text-sm text-card/80">{banners[currentIndex]?.subtitle}</p>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Dots */}
      {banners.length > 1 && (
        <div className="absolute bottom-2 right-4 flex gap-1">
          {banners.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={cn(
                'h-1.5 rounded-full transition-all',
                idx === currentIndex ? 'w-4 bg-card' : 'w-1.5 bg-card/50'
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}
