import { useEffect, useMemo, useState } from 'react';
import { CartDrawer } from './components/CartDrawer';
import { CatalogSection } from './components/CatalogSection';
import { Header } from './components/Header';
import { GrowthGuideSection } from './components/GrowthGuideSection';
import { HeroShowcase } from './components/HeroShowcase';
import { PartyHireSection } from './components/PartyHireSection';
import { ProductModal } from './components/ProductModal';
import { ShowroomFooter } from './components/ShowroomFooter';
import { CATALOG_PRODUCTS, ProductItem } from './data/catalog';
import {
  CartItem,
  CatalogFilter,
  addToCart,
  calculateCartTotals,
  filterCatalog,
  updateCartQty,
} from './utils/commerce';

const STORAGE_KEY = 'smartcandy_concept_cart_v2';

export default function App() {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      // Ignore storage read errors
    }
    return [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [inspectedProduct, setInspectedProduct] = useState<ProductItem | null>(null);
  const [recentNotice, setRecentNotice] = useState<string | null>(null);

  const [filter, setFilter] = useState<CatalogFilter>({
    category: 'All',
    itemType: 'All',
    query: '',
    sort: 'featured',
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch {
      // Ignore storage write errors
    }
  }, [cart]);

  useEffect(() => {
    if (!recentNotice) return;
    const timer = window.setTimeout(() => setRecentNotice(null), 3200);
    return () => window.clearTimeout(timer);
  }, [recentNotice]);

  const filteredProducts = useMemo(
    () => filterCatalog(CATALOG_PRODUCTS, filter),
    [filter]
  );

  const cartSummary = useMemo(
    () => calculateCartTotals(cart, 'gauteng-courier'),
    [cart]
  );

  function handleAddToCart(product: ProductItem, variant: string, quantity = 1) {
    setCart((prev) => addToCart(prev, product, variant, quantity));
    setRecentNotice(`Added ${quantity} × ${product.name}`);
  }

  function handleUpdateQty(productId: string, variant: string, nextQty: number) {
    setCart((prev) => updateCartQty(prev, productId, variant, nextQty));
  }

  function handleJumpToHire() {
    const el = document.getElementById('party-hire');
    el?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0D1526]">
      <div className="bg-[#0D1526] px-4 py-2 text-center text-xs font-medium leading-relaxed text-white sm:text-sm">
        Independent design concept · Illustrative products, prices and availability · No orders, payments or reservations are sent.{' '}
        <a href="https://www.smartcandy.co.za/" target="_blank" rel="noopener noreferrer" className="font-semibold text-[#F5A623] underline underline-offset-2">Visit the official store</a>
      </div>
      <Header
        cartCount={cartSummary.itemCount}
        cartSubtotalZar={cartSummary.subtotalZar}
        onOpenCart={() => setIsCartOpen(true)}
        onNavigateCatalogFilter={(type) =>
          setFilter((prev) => ({
            ...prev,
            category: 'All',
            itemType: type,
          }))
        }
      />

      <main>
        <HeroShowcase
          onInspectProduct={(product) => setInspectedProduct(product)}
          onJumpToHire={handleJumpToHire}
        />

        <CatalogSection
          products={filteredProducts}
          filter={filter}
          onChangeFilter={setFilter}
          onInspectProduct={(product) => setInspectedProduct(product)}
          onQuickAdd={(product, variant) => handleAddToCart(product, variant, 1)}
        />

        <PartyHireSection />
        <GrowthGuideSection />
      </main>

      <ShowroomFooter />

      <ProductModal
        product={inspectedProduct}
        onClose={() => setInspectedProduct(null)}
        onAddToCart={handleAddToCart}
      />

      <CartDrawer
        isOpen={isCartOpen}
        items={cart}
        onClose={() => setIsCartOpen(false)}
        onUpdateQty={handleUpdateQty}
        onClearCart={() => setCart([])}
      />

      {recentNotice && !isCartOpen && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-5 right-5 z-40 flex items-center gap-3 rounded-xl bg-[#012C6D] px-4 py-3 text-sm font-medium text-white shadow-lg"
        >
          <span>{recentNotice}</span>
          <button
            type="button"
            onClick={() => {
              setRecentNotice(null);
              setIsCartOpen(true);
            }}
            className="whitespace-nowrap font-semibold text-[#F5A623] underline underline-offset-4 hover:text-white"
          >
            View Cart
          </button>
        </div>
      )}
    </div>
  );
}
