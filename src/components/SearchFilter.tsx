import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { categories } from '@/data/categories';
import { Search, X } from 'lucide-react';
import { Category } from '@/types/tool';

interface SearchFilterProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategories: Category[];
  onCategoryToggle: (category: Category) => void;
  selectedPricing: string[];
  onPricingToggle: (pricing: string) => void;
  onClearFilters: () => void;
}

const pricingOptions = [
  { id: 'free', label: 'Free' },
  { id: 'freemium', label: 'Freemium' },
  { id: 'paid', label: 'Paid' },
];

export const SearchFilter = ({
  searchQuery,
  onSearchChange,
  selectedCategories,
  onCategoryToggle,
  selectedPricing,
  onPricingToggle,
  onClearFilters,
}: SearchFilterProps) => {
  const hasActiveFilters = searchQuery || selectedCategories.length > 0 || selectedPricing.length > 0;

  return (
    <div className="space-y-4">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search tools by name or description..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Category Filters */}
      <div className="space-y-2">
        <p className="text-sm font-medium text-muted-foreground">Categories</p>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Badge
              key={category.id}
              variant={selectedCategories.includes(category.id) ? 'default' : 'outline'}
              className="cursor-pointer transition-colors"
              onClick={() => onCategoryToggle(category.id)}
            >
              {category.name}
            </Badge>
          ))}
        </div>
      </div>

      {/* Pricing Filters */}
      <div className="space-y-2">
        <p className="text-sm font-medium text-muted-foreground">Pricing</p>
        <div className="flex flex-wrap gap-2">
          {pricingOptions.map((option) => (
            <Badge
              key={option.id}
              variant={selectedPricing.includes(option.id) ? 'default' : 'outline'}
              className="cursor-pointer transition-colors"
              onClick={() => onPricingToggle(option.id)}
            >
              {option.label}
            </Badge>
          ))}
        </div>
      </div>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearFilters}
          className="text-muted-foreground"
        >
          <X className="h-4 w-4 mr-1" />
          Clear all filters
        </Button>
      )}
    </div>
  );
};
