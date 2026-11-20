import { Check, Minus, Plus, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { ProductItem } from '../data/catalog';
import { formatZAR, variantPriceZar } from '../utils/commerce';

interface ProductModalProps {
  product: ProductItem | null;
  onClose: () => void;
  onAddToCart: (product: ProductItem, variant: string, quantity: number) => void;
}

export function ProductModal({ product, onClose, onAddToCart }: ProductModalProps) {
  const [selectedVariant, setSelectedVariant] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (product) {
      setSelectedVariant(product.variants[0] || 'Standard');
      setQuantity(1);
    }
  }, [product]);

  useEffect(() => {
    if (!product) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [product, onClose]);

  if (!product) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#0D1526]/65 p-4 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="pdp-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close product details"
          className="absolute right-4 top-4 z-10 inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[#012C6D]/15 bg-white text-[#0D1526] transition-colors hover:bg-[#EEF3F9]"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12">
          {/* Left Studio Gallery */}
          <div className="bg-[#EEF3F9] p-6 md:col-span-6 md:flex md:flex-col md:justify-between">
            <div className="aspect-[4/3] w-full overflow-hidden rounded-xl bg-white">
              <img
                src={product.image}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover"
              />
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">
              {product.specs.map((spec) => (
                <div key={spec.label} className="rounded-lg bg-white px-3.5 py-2.5">
                  <div className="text-[11px] font-medium text-[#4B5565] uppercase">
                    {spec.label}
                  </div>
                  <div className="mt-0.5 font-mono text-xs font-semibold text-[#012C6D]">
                    {spec.value}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Contiguous Purchase Module */}
          <div className="flex flex-col justify-between p-6 sm:p-8 md:col-span-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-medium text-[#4B5565]">
                <span className="text-[#0170B9] uppercase">{product.category}</span>
                <span aria-hidden="true">·</span>
                <span className="font-mono">{product.sku}</span>
                <span aria-hidden="true">·</span>
                <span>{product.stockStatus}</span>
              </div>

              <h2
                id="pdp-modal-title"
                className="mt-2 font-display text-2xl font-bold leading-tight text-[#012C6D]"
              >
                {product.name}
              </h2>

              <div className="mt-3 flex items-baseline gap-2.5">
                <span className="font-mono text-2xl font-bold text-[#0D1526] tabular-nums">
                  {formatZAR(variantPriceZar(product, selectedVariant))}
                </span>
                <span className="text-xs text-[#4B5565]">{product.unitLabel} (incl. VAT)</span>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-[#4B5565]">{product.summary}</p>

              {/* Variant / Flavour Selector */}
              <div className="mt-6">
                <span className="block text-xs font-semibold tracking-wider text-[#0D1526] uppercase">
                  Select Option / Flavour
                </span>
                <div className="mt-2.5 flex flex-wrap gap-2">
                  {product.variants.map((variant) => {
                    const active = selectedVariant === variant;
                    return (
                      <button
                        key={variant}
                        type="button"
                        onClick={() => setSelectedVariant(variant)}
                        className={`inline-flex min-h-[38px] items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors ${
                          active
                            ? 'border-[#012C6D] bg-[#012C6D] text-white'
                            : 'border-[#012C6D]/20 bg-white text-[#0D1526] hover:bg-[#EEF3F9]'
                        }`}
                      >
                        {active && <Check className="h-3.5 w-3.5" aria-hidden="true" />}
                        <span>{variant}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Quantity Stepper + Primary Add to Cart */}
            <div className="mt-8 border-t border-[#012C6D]/10 pt-6">
              <div className="flex flex-col items-stretch gap-4 sm:flex-row sm:items-center">
                <div className="inline-flex h-11 items-center rounded-lg border border-[#012C6D]/20 bg-[#F8FAFC]">
                  <button
                    type="button"
                    aria-label="Decrease quantity"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="flex h-full w-10 items-center justify-center text-[#012C6D] hover:bg-[#EEF3F9]"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span
                    data-testid="pdp-quantity"
                    className="w-10 text-center font-mono text-sm font-semibold text-[#0D1526] tabular-nums"
                  >
                    {quantity}
                  </span>
                  <button
                    type="button"
                    aria-label="Increase quantity"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="flex h-full w-10 items-center justify-center text-[#012C6D] hover:bg-[#EEF3F9]"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    onAddToCart(product, selectedVariant || product.variants[0], quantity);
                    onClose();
                  }}
                  className="inline-flex h-11 flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-[#012C6D] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#011E4D]"
                >
                  <span>Add to Cart</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono tabular-nums">
                    {formatZAR(variantPriceZar(product, selectedVariant) * quantity)}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
