import { Menu, ShoppingBag, X } from 'lucide-react';
import { useState } from 'react';
import { formatZAR } from '../utils/commerce';
import { SmartCandyLogo } from './SmartCandyLogo';

interface HeaderProps {
  cartCount: number;
  cartSubtotalZar: number;
  onOpenCart: () => void;
  onNavigateCatalogFilter: (type: 'All' | 'Machines' | 'Mixes & Sugars') => void;
}

export function Header({
  cartCount,
  cartSubtotalZar,
  onOpenCart,
  onNavigateCatalogFilter,
}: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-[#012C6D]/10 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1360px] items-center justify-between gap-2 px-3 py-3.5 sm:gap-4 sm:px-6 lg:gap-8 lg:px-10">
        {/* Zone 1: Single-element Brand Wordmark */}
        <a
          href="#top"
          aria-label="Smart Candy Home"
          className="inline-flex shrink-0 items-center whitespace-nowrap rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#012C6D]"
        >
          <SmartCandyLogo className="h-7 w-auto sm:h-10" />
        </a>

        {/* Zone 2: 4 concise single-line navigation links */}
        <nav aria-label="Primary Navigation" className="hidden items-center gap-8 lg:flex">
          <a
            href="#catalog"
            onClick={() => onNavigateCatalogFilter('All')}
            className="whitespace-nowrap shrink-0 text-sm font-medium text-[#0D1526] underline-offset-4 transition-colors duration-150 hover:text-[#012C6D] hover:underline"
          >
            Shop All
          </a>
          <a
            href="#catalog"
            onClick={() => onNavigateCatalogFilter('Machines')}
            className="whitespace-nowrap shrink-0 text-sm font-medium text-[#0D1526] underline-offset-4 transition-colors duration-150 hover:text-[#012C6D] hover:underline"
          >
            Machines
          </a>
          <a
            href="#party-hire"
            className="whitespace-nowrap shrink-0 text-sm font-medium text-[#0D1526] underline-offset-4 transition-colors duration-150 hover:text-[#E10B49] hover:underline"
          >
            Party Hire
          </a>
          <a
            href="#guides"
            className="whitespace-nowrap shrink-0 text-sm font-medium text-[#0D1526] underline-offset-4 transition-colors duration-150 hover:text-[#012C6D] hover:underline"
          >
            Buying Guides
          </a>
        </nav>

        {/* Zone 3: Single primary action (Cart) + mobile menu toggle */}
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={onOpenCart}
            aria-label={`Open shopping cart, ${cartCount} items`}
            className="inline-flex min-h-[40px] shrink-0 items-center gap-2.5 whitespace-nowrap rounded-lg bg-[#012C6D] px-4 py-2 text-sm font-semibold text-white transition-colors duration-150 hover:bg-[#011E4D] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#012C6D]"
          >
            <ShoppingBag className="h-4 w-4" aria-hidden="true" />
            <span>Cart ({cartCount})</span>
            {cartCount > 0 && (
              <span className="hidden font-mono text-xs font-medium text-white/85 tabular-nums sm:inline">
                {formatZAR(cartSubtotalZar)}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[#012C6D]/15 text-[#012C6D] transition-colors hover:bg-[#EEF3F9] lg:hidden"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav
          aria-label="Mobile Navigation"
          className="border-t border-[#012C6D]/10 bg-white px-6 py-4 lg:hidden"
        >
          <div className="flex flex-col gap-3">
            <a
              href="#catalog"
              onClick={() => {
                onNavigateCatalogFilter('All');
                setMobileOpen(false);
              }}
              className="py-1.5 text-sm font-semibold text-[#0D1526]"
            >
              Shop All
            </a>
            <a
              href="#catalog"
              onClick={() => {
                onNavigateCatalogFilter('Machines');
                setMobileOpen(false);
              }}
              className="py-1.5 text-sm font-semibold text-[#0D1526]"
            >
              Machines
            </a>
            <a
              href="#party-hire"
              onClick={() => setMobileOpen(false)}
              className="py-1.5 text-sm font-semibold text-[#E10B49]"
            >
              Party Hire
            </a>
            <a
              href="#guides"
              onClick={() => setMobileOpen(false)}
              className="py-1.5 text-sm font-semibold text-[#0D1526]"
            >
              Buying Guides
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
