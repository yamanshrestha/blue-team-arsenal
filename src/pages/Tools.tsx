import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { ToolCard } from '@/components/ToolCard';
import { SearchFilter } from '@/components/SearchFilter';
import { tools } from '@/data/tools';
import { Category } from '@/types/tool';

const Tools = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const [selectedPricing, setSelectedPricing] = useState<string[]>([]);

  // Initialize from URL params
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam && !selectedCategories.includes(categoryParam as Category)) {
      setSelectedCategories([categoryParam as Category]);
    }
  }, [searchParams]);

  const handleCategoryToggle = (category: Category) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
    // Clear URL param when toggling
    if (searchParams.has('category')) {
      searchParams.delete('category');
      setSearchParams(searchParams);
    }
  };

  const handlePricingToggle = (pricing: string) => {
    setSelectedPricing(prev =>
      prev.includes(pricing)
        ? prev.filter(p => p !== pricing)
        : [...prev, pricing]
    );
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategories([]);
    setSelectedPricing([]);
    setSearchParams({});
  };

  const filteredTools = useMemo(() => {
    return tools.filter(tool => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch =
          tool.name.toLowerCase().includes(query) ||
          tool.description.toLowerCase().includes(query);
        if (!matchesSearch) return false;
      }

      // Category filter
      if (selectedCategories.length > 0) {
        if (!selectedCategories.includes(tool.category)) return false;
      }

      // Pricing filter
      if (selectedPricing.length > 0) {
        if (!selectedPricing.includes(tool.pricing)) return false;
      }

      return true;
    });
  }, [searchQuery, selectedCategories, selectedPricing]);

  return (
    <Layout>
      <div className="container py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Browse Tools</h1>
          <p className="text-muted-foreground mt-2">
            Discover and explore blue team security tools
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
          {/* Sidebar Filters */}
          <aside className="space-y-6">
            <div className="lg:sticky lg:top-24">
              <SearchFilter
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                selectedCategories={selectedCategories}
                onCategoryToggle={handleCategoryToggle}
                selectedPricing={selectedPricing}
                onPricingToggle={handlePricingToggle}
                onClearFilters={handleClearFilters}
              />
            </div>
          </aside>

          {/* Tools Grid */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-muted-foreground">
                Showing {filteredTools.length} of {tools.length} tools
              </p>
            </div>

            {filteredTools.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {filteredTools.map(tool => (
                  <ToolCard key={tool.id} tool={tool} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-muted-foreground">No tools found matching your filters.</p>
                <button
                  onClick={handleClearFilters}
                  className="text-primary hover:underline mt-2 text-sm"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Tools;
