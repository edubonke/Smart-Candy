import { ArrowRight, Sparkles } from 'lucide-react';
import { useState } from 'react';
import {
  CATALOG_PRODUCTS,
  FLAVOR_SWATCHES,
  HERO_SHOWCASES,
  ProductItem,
} from '../data/catalog';
import { formatZAR } from '../utils/commerce';

interface HeroShowcaseProps {
  onInspectProduct: (product: ProductItem) => void;
  onJumpToHire: () => void;
}

const MARQUEE_WORLDS = [
  'Slush Machines & Concentrates',
  'Soft Serve Freezers & Mixes',
  'Candy Floss Spinners & Sugar',
  '8oz Cinema Popcorn Kettles',
  'Snow Cone Crushers & Syrups',
  'Frozen Yogurt & Milkshake Blends',
  'Stick Waffle & Donut Mixes',
  'Gauteng Party Machine Rentals',
];

export function HeroShowcase({ onInspectProduct, onJumpToHire }: HeroShowcaseProps) {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [activeFlavorIndex, setActiveFlavorIndex] = useState(0);
  const [imgError, setImgError] = useState<Record<string, boolean>>({});

  const activeSlide = HERO_SHOWCASES[activeSlideIndex];
  const activeFlavor = FLAVOR_SWATCHES[activeFlavorIndex];
  const linkedProduct =
    CATALOG_PRODUCTS.find((p) => p.id === activeSlide.productId) || CATALOG_PRODUCTS[0];

  return (
    <section id="top" className="relative overflow-hidden border-b border-[#012C6D]/10 bg-white">
      {/* Subtle architectural grid lines reminiscent of Dairy Food Bulgaria / Ciao Energy */}
      <div className="mx-auto max-w-[1360px] px-6 pb-12 pt-10 lg:px-10 lg:pb-16 lg:pt-14">
        <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left Editorial Column */}
          <div className="flex flex-col justify-between lg:col-span-6">
            <div>
              <p className="text-xs font-semibold tracking-[0.12em] text-[#0170B9] uppercase">
                South African food-service · Independent concept
              </p>

              <h1
                className="mt-4 font-display text-[clamp(2.35rem,4.2vw,3.9rem)] font-bold leading-[1.06] tracking-[-0.025em] text-[#012C6D]"
                style={{ textWrap: 'balance' }}
              >
                Commercial slush, soft serve &amp; party machines.
              </h1>

              <p className="mt-5 max-w-[56ch] text-base leading-relaxed text-[#4B5565] sm:text-lg">
                Smart Candy supplies South Africa&apos;s cafés, cinemas, schools, and event caterers
                with ChromeCater equipment, vibrant slush and soft serve mixes, and turnkey
                Gauteng party rentals.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="#catalog"
                  className="inline-flex min-h-[44px] items-center gap-2.5 whitespace-nowrap rounded-lg bg-[#012C6D] px-6 py-3 text-sm font-semibold text-white transition-transform duration-150 hover:-translate-y-0.5 hover:bg-[#011E4D] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#012C6D]"
                >
                  <span>Shop Equipment &amp; Mixes</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>

                <button
                  type="button"
                  onClick={onJumpToHire}
                  className="inline-flex min-h-[44px] items-center gap-2 whitespace-nowrap rounded-lg bg-[#E10B49] px-6 py-3 text-sm font-semibold text-white transition-transform duration-150 hover:-translate-y-0.5 hover:bg-[#C6083F] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E10B49]"
                >
                  <span>Hire a Party Machine</span>
                </button>
              </div>
            </div>

            {/* Interactive Machine Selector Tabs (inspired by Ciao Energy / Gourou menu index) */}
            <div className="mt-10 border-t border-[#012C6D]/10 pt-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold tracking-wider text-[#4B5565] uppercase">
                  Equipment Spotlight
                </span>
                <span className="font-mono text-xs text-[#012C6D] tabular-nums">
                  {activeSlide.indexLabel} / 0{HERO_SHOWCASES.length}
                </span>
              </div>

              <div
                role="tablist"
                aria-label="Featured equipment lines"
                className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4"
              >
                {HERO_SHOWCASES.map((slide, idx) => {
                  const isActive = idx === activeSlideIndex;
                  return (
                    <button
                      key={slide.id}
                      role="tab"
                      type="button"
                      aria-selected={isActive}
                      onClick={() => setActiveSlideIndex(idx)}
                      className={`flex flex-col items-start rounded-lg border px-3 py-2.5 text-left transition-all duration-150 ${
                        isActive
                          ? 'border-[#012C6D] bg-[#012C6D] text-white'
                          : 'border-[#012C6D]/12 bg-[#F8FAFC] text-[#0D1526] hover:border-[#012C6D]/35 hover:bg-[#EEF3F9]'
                      }`}
                    >
                      <span
                        className={`font-mono text-[11px] tabular-nums ${
                          isActive ? 'text-white/75' : 'text-[#0170B9]'
                        }`}
                      >
                        {slide.indexLabel}
                      </span>
                      <span className="mt-0.5 w-full truncate text-xs font-semibold whitespace-nowrap">
                        {slide.shortTitle}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Product Stage Column */}
          <div className="flex flex-col justify-between gap-4 lg:col-span-6">
            <div className="group relative flex-1 overflow-hidden rounded-2xl border border-[#012C6D]/12 bg-[#EEF3F9]">
              <div className="aspect-[4/3] w-full overflow-hidden lg:aspect-auto lg:h-full lg:min-h-[420px]">
                {!imgError[activeSlide.id] ? (
                  <img
                    src={activeSlide.image}
                    alt={activeSlide.headline}
                    referrerPolicy="no-referrer"
                    onError={() =>
                      setImgError((prev) => ({ ...prev, [activeSlide.id]: true }))
                    }
                    className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                  />
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center bg-[#EEF3F9] p-8 text-center">
                    <Sparkles className="h-10 w-10 text-[#012C6D]" />
                    <p className="mt-3 font-display text-lg font-semibold text-[#012C6D]">
                      {activeSlide.shortTitle}
                    </p>
                  </div>
                )}
              </div>

              {/* Measured bottom contrast scrim for crystal-clear foreground spec overlay */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#0D1526]/90 via-[#0D1526]/45 to-transparent" />

              <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-4 p-5 sm:p-6">
                <div className="max-w-sm text-white">
                  <div className="flex items-center gap-2 text-xs text-white/80">
                    <span className="font-mono uppercase">{activeSlide.sku}</span>
                    <span aria-hidden="true">·</span>
                    <span>
                      {activeSlide.metricLabel}: {activeSlide.metricValue}
                    </span>
                  </div>
                  <p className="mt-1 font-display text-lg font-semibold leading-snug text-white">
                    {activeSlide.headline}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => onInspectProduct(linkedProduct)}
                  className="inline-flex min-h-[40px] shrink-0 items-center gap-2 whitespace-nowrap rounded-lg bg-white px-4 py-2 text-sm font-semibold text-[#012C6D] shadow-sm transition-colors duration-150 hover:bg-[#EEF3F9]"
                >
                  <span className="font-mono tabular-nums">
                    {formatZAR(activeSlide.priceZar)}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>Inspect</span>
                </button>
              </div>
            </div>

            {/* Interactive Flavor Swatch Studio Bar (inspired by Yaas Energy / Partake Foods) */}
            <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-[#012C6D]/10 bg-[#F8FAFC] px-4 py-3">
              <div className="flex items-center gap-3">
                <span
                  className="h-4 w-4 shrink-0 rounded-full border border-black/10 transition-colors duration-200"
                  style={{ backgroundColor: activeFlavor.hex }}
                  aria-hidden="true"
                />
                <div className="text-xs">
                  <span className="font-semibold text-[#0D1526]">{activeFlavor.name}</span>
                  <span className="mx-1.5 text-[#4B5565]" aria-hidden="true">
                    ·
                  </span>
                  <span className="text-[#4B5565]">{activeFlavor.note}</span>
                </div>
              </div>

              <div className="flex items-center gap-2" role="group" aria-label="Flavour profile preview">
                {FLAVOR_SWATCHES.map((swatch, idx) => {
                  const selected = idx === activeFlavorIndex;
                  return (
                    <button
                      key={swatch.id}
                      type="button"
                      onClick={() => setActiveFlavorIndex(idx)}
                      aria-label={`Preview ${swatch.name} flavour`}
                      aria-pressed={selected}
                      className={`h-7 w-7 rounded-full border-2 transition-transform duration-150 ${
                        selected
                          ? 'scale-110 border-[#012C6D] ring-2 ring-[#012C6D]/20'
                          : 'border-white hover:scale-105'
                      }`}
                      style={{ backgroundColor: swatch.hex }}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Full-width Architectural Marquee Strip */}
      <div className="overflow-hidden border-t border-[#012C6D]/10 bg-[#012C6D] py-3 text-white">
        <div className="animate-marquee flex items-center gap-8">
          {[...MARQUEE_WORLDS, ...MARQUEE_WORLDS].map((label, idx) => (
            <div key={`${label}-${idx}`} className="flex shrink-0 items-center gap-8 whitespace-nowrap">
              <span className="text-xs font-semibold tracking-[0.1em] text-white/95 uppercase">
                {label}
              </span>
              <span className="text-xs text-[#F5A623]" aria-hidden="true">
                ◆
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
