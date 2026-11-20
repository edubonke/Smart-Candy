import { Plus, Search, SlidersHorizontal } from 'lucide-react';
import { useState } from 'react';
import { ItemType, ProductCategory, ProductItem } from '../data/catalog';
import { CatalogFilter, SortOption, formatZAR } from '../utils/commerce';

interface CatalogSectionProps {
  products: ProductItem[];
  filter: CatalogFilter;
  onChangeFilter: (next: CatalogFilter) => void;
  onInspectProduct: (product: ProductItem) => void;
  onQuickAdd: (product: ProductItem, variant: string) => void;
}

const CATEGORIES: Array<'All' | ProductCategory> = [
  'All',
  'Slush',
  'Soft Serve',
  'Candy Floss',
  'Popcorn',
  'Snow Cone & Shakes',
];

const ITEM_TYPES: Array<'All' | ItemType> = [
  'All',
  'Machines',
  'Mixes & Sugars',
  'Cups & Packaging',
];

export function CatalogSection({
  products,
  filter,
  onChangeFilter,
  onInspectProduct,
  onQuickAdd,
}: CatalogSectionProps) {
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});
  const [showAll, setShowAll] = useState(false);

  const isFiltered =
    filter.category !== 'All' || filter.itemType !== 'All' || filter.query.trim() !== '';
  const visibleProducts =
    isFiltered || showAll ? products : products.slice(0, 6);

  return (
    <section id="catalog" className="scroll-mt-20 mx-auto max-w-[1360px] px-6 py-16 lg:px-10 lg:py-20">
      {/* Section Header */}
      <div className="flex flex-col justify-between gap-6 border-b border-[#012C6D]/10 pb-8 lg:flex-row lg:items-end">
        <div>
          <p className="text-xs font-semibold tracking-[0.12em] text-[#0170B9] uppercase">
            Online Store · Direct Supply
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-[#012C6D] sm:text-4xl">
            Machines, Mixes &amp; Consumables
          </h2>
        </div>

        {/* Search + Sort Controls */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative min-w-[230px] flex-1 sm:w-64 sm:flex-none">
            <label htmlFor="catalog-search" className="sr-only">
              Search Smart Candy products
            </label>
            <Search
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#4B5565]"
              aria-hidden="true"
            />
            <input
              id="catalog-search"
              type="search"
              value={filter.query}
              onChange={(e) => onChangeFilter({ ...filter, query: e.target.value })}
              placeholder="Search slush, BQ323T, sugar..."
              className="h-10 w-full rounded-lg border border-[#012C6D]/15 bg-white pl-9 pr-3 text-sm text-[#0D1526] placeholder:text-[#4B5565]/70 focus:border-[#012C6D] focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4 text-[#4B5565]" aria-hidden="true" />
            <label htmlFor="catalog-sort" className="sr-only">
              Sort products
            </label>
            <select
              id="catalog-sort"
              value={filter.sort}
              onChange={(e) =>
                onChangeFilter({ ...filter, sort: e.target.value as SortOption })
              }
              className="h-10 rounded-lg border border-[#012C6D]/15 bg-white px-3 text-sm font-medium text-[#0D1526] focus:border-[#012C6D] focus:outline-none"
            >
              <option value="featured">Featured First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name-asc">Alphabetical (A–Z)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Category & Item-Type Interactive Filter Bars */}
      <div className="mt-6 flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
        <div
          role="group"
          aria-label="Filter by product world"
          className="flex flex-wrap items-center gap-2"
        >
          {CATEGORIES.map((cat) => {
            const active = filter.category === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => onChangeFilter({ ...filter, category: cat })}
                className={`min-h-[38px] whitespace-nowrap rounded-lg px-3.5 py-2 text-xs font-semibold transition-colors duration-150 ${
                  active
                    ? 'bg-[#012C6D] text-white'
                    : 'bg-[#EEF3F9] text-[#0D1526] hover:bg-[#012C6D]/10'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        <div
          role="group"
          aria-label="Filter by item type"
          className="inline-flex w-fit flex-wrap items-center gap-1 rounded-lg bg-[#EEF3F9] p-1"
        >
          {ITEM_TYPES.map((type) => {
            const active = filter.itemType === type;
            return (
              <button
                key={type}
                type="button"
                onClick={() => onChangeFilter({ ...filter, itemType: type })}
                className={`min-h-[34px] whitespace-nowrap rounded-md px-3 py-1.5 text-xs font-semibold transition-colors duration-150 ${
                  active
                    ? 'bg-white text-[#012C6D] shadow-sm'
                    : 'text-[#4B5565] hover:text-[#0D1526]'
                }`}
              >
                {type === 'All' ? 'All Types' : type}
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Count */}
      <div className="mt-6 flex items-center justify-between text-xs text-[#4B5565]">
        <span>
          Showing{' '}
          <strong className="font-semibold text-[#0D1526] tabular-nums">
            {visibleProducts.length}
          </strong>{' '}
          of <strong className="font-semibold text-[#0D1526] tabular-nums">{products.length}</strong>{' '}
          {products.length === 1 ? 'product' : 'products'} · VAT included
        </span>
        {isFiltered && (
          <button
            type="button"
            onClick={() =>
              onChangeFilter({ category: 'All', itemType: 'All', query: '', sort: 'featured' })
            }
            className="font-semibold text-[#E10B49] underline-offset-4 hover:underline"
          >
            Reset Filters
          </button>
        )}
      </div>

      {/* Product Grid */}
      {products.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-[#012C6D]/12 bg-white px-6 py-16 text-center">
          <p className="font-display text-lg font-semibold text-[#012C6D]">
            No matching equipment or mixes found
          </p>
          <p className="mt-2 text-sm text-[#4B5565]">
            Try clearing your search term or switching back to all product worlds.
          </p>
          <button
            type="button"
            onClick={() =>
              onChangeFilter({ category: 'All', itemType: 'All', query: '', sort: 'featured' })
            }
            className="mt-5 inline-flex min-h-[40px] items-center rounded-lg bg-[#012C6D] px-5 py-2 text-sm font-semibold text-white hover:bg-[#011E4D]"
          >
            View Full Catalog
          </button>
        </div>
      ) : (
        <>
          <div
            data-testid="catalog-grid"
            className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
          >
            {visibleProducts.map((product) => (
              <article
                key={product.id}
                className="group flex flex-col overflow-hidden rounded-2xl border border-[#012C6D]/10 bg-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
              >
                {/* Uniform 4:3 Image Container */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#EEF3F9]">
                  {!imgErrors[product.id] ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      onError={() =>
                        setImgErrors((prev) => ({ ...prev, [product.id]: true }))
                      }
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-[#EEF3F9] p-6 text-center text-sm font-semibold text-[#012C6D]">
                      {product.name}
                    </div>
                  )}
                </div>

                {/* Clean Card Body — zero pill spam */}
                <div className="flex flex-1 flex-col justify-between p-6">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-medium text-[#4B5565]">
                      <span className="text-[#0170B9] uppercase">{product.category}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono">{product.sku}</span>
                      <span aria-hidden="true">·</span>
                      <span>{product.stockStatus}</span>
                    </div>

                    <h3 className="mt-2 font-display text-lg font-semibold leading-snug text-[#0D1526]">
                      {product.name}
                    </h3>

                    <p className="mt-1.5 text-sm leading-relaxed text-[#4B5565] line-clamp-2">
                      {product.summary}
                    </p>
                  </div>

                  <div className="mt-6 border-t border-[#012C6D]/8 pt-4">
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="font-mono text-lg font-semibold text-[#012C6D] tabular-nums">
                        {formatZAR(product.priceZar)}
                      </span>
                      <span className="truncate text-xs text-[#4B5565]">{product.unitLabel}</span>
                    </div>

                    <div className="mt-4 flex items-center gap-2.5">
                      <button
                        type="button"
                        onClick={() => onInspectProduct(product)}
                        className="inline-flex min-h-[40px] flex-1 items-center justify-center whitespace-nowrap rounded-lg border border-[#012C6D]/20 bg-white px-4 py-2 text-sm font-semibold text-[#012C6D] transition-colors duration-150 hover:bg-[#EEF3F9]"
                      >
                        Inspect
                      </button>

                      <button
                        type="button"
                        onClick={() => onQuickAdd(product, product.variants[0])}
                        aria-label={`Add ${product.name} to cart`}
                        className="inline-flex min-h-[40px] flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-lg bg-[#012C6D] px-4 py-2 text-sm font-semibold text-white transition-colors duration-150 hover:bg-[#011E4D]"
                      >
                        <Plus className="h-4 w-4" aria-hidden="true" />
                        <span>Add to Cart</span>
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {!isFiltered && products.length > 6 && (
            <div className="mt-10 flex justify-center">
              <button
                type="button"
                onClick={() => setShowAll((prev) => !prev)}
                className="inline-flex min-h-[44px] items-center rounded-lg border border-[#012C6D]/25 bg-white px-6 py-2.5 text-sm font-semibold text-[#012C6D] transition-colors hover:bg-[#EEF3F9]"
              >
                {showAll ? 'Show Featured 6 Products' : `Show All ${products.length} Products`}
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}
