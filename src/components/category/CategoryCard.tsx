import { motion } from 'framer-motion';
import type { Category } from '@/types';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface CategoryCardProps {
  category: Category;
  index?: number;
  className?: string;
}

export function CategoryCard({ category, index = 0, className }: CategoryCardProps) {
  return (
    <Link to={`/category/${category.id}`}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: index * 0.05 }}
        className={cn(
          'flex flex-col items-center gap-2 rounded-2xl bg-card p-3 shadow-card transition-all duration-200 hover:shadow-elevated active:scale-95',
          className
        )}
      >
        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary-light text-3xl">
          {category.icon}
        </div>
        <span className="text-center text-xs font-semibold text-foreground line-clamp-2">
          {category.name}
        </span>
      </motion.div>
    </Link>
  );
}
