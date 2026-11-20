import { CheckCircle2, Minus, Plus, Trash2, X } from 'lucide-react';
import { FormEvent, useEffect, useState } from 'react';
import {
  CartItem,
  CheckoutFormInput,
  DeliveryZone,
  calculateCartTotals,
  formatZAR,
  validateCheckoutForm,
} from '../utils/commerce';

interface CartDrawerProps {
  isOpen: boolean;
  items: CartItem[];
  onClose: () => void;
  onUpdateQty: (productId: string, variant: string, nextQty: number) => void;
  onClearCart: () => void;
}

export function CartDrawer({
  isOpen,
  items,
  onClose,
  onUpdateQty,
  onClearCart,
}: CartDrawerProps) {
  const [zone, setZone] = useState<DeliveryZone>('gauteng-courier');
  const [step, setStep] = useState<'cart' | 'checkout' | 'confirmed'>('cart');
  const [orderRef, setOrderRef] = useState('');
  const [confirmedTotal, setConfirmedTotal] = useState(0);
  const [form, setForm] = useState<CheckoutFormInput>({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    paymentMethod: 'eft',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const totals = calculateCartTotals(items, zone);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (items.length === 0 && step === 'checkout') {
      setStep('cart');
    }
  }, [items.length, step]);

  if (!isOpen) return null;

  function handlePlaceOrder(e: FormEvent) {
    e.preventDefault();
    const validation = validateCheckoutForm(form, zone);
    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      return;
    }
    setErrors({});
    setConfirmedTotal(totals.totalZar);
    setOrderRef(`SC-${Math.floor(1000 + Math.random() * 9000)}`);
    setStep('confirmed');
    onClearCart();
  }

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-[#0D1526]/60 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-label="Shopping Cart"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="flex h-full w-full max-w-lg flex-col bg-white shadow-2xl">
        {/* Drawer Header */}
        <div className="flex items-center justify-between border-b border-[#012C6D]/10 px-6 py-4">
          <div>
            <h2 className="font-display text-lg font-bold text-[#012C6D]">
              {step === 'cart'
                ? `Your Order (${totals.itemCount})`
                : step === 'checkout'
                  ? 'Quote Request Details'
                  : 'Preview Quote Created'}
            </h2>
            <p className="text-xs text-[#4B5565]">
              Demo checkout · No payment or information is submitted
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close shopping cart"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[#012C6D]/15 text-[#0D1526] hover:bg-[#EEF3F9]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {step === 'confirmed' ? (
            <div data-testid="order-confirmation" className="py-10 text-center">
              <CheckCircle2 className="mx-auto h-12 w-12 text-[#0170B9]" aria-hidden="true" />
              <h3 className="mt-4 font-display text-2xl font-bold text-[#012C6D]">
                Sample Quote #{orderRef}
              </h3>
              <p className="mt-2 text-sm text-[#4B5565]">
                Your quote preview is ready. No invoice, order, payment, or contact information has been sent to Smart Candy.
              </p>

              <div className="mt-6 rounded-xl bg-[#EEF3F9] p-4 text-left text-sm">
                <div className="flex justify-between">
                  <span className="text-[#4B5565]">Illustrative Total (incl. 15% VAT)</span>
                  <span className="font-mono font-bold text-[#012C6D] tabular-nums">
                    {formatZAR(confirmedTotal)}
                  </span>
                </div>
                <div className="mt-1.5 flex justify-between text-xs text-[#4B5565]">
                  <span>Payment Method</span>
                  <span className="uppercase">{form.paymentMethod}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setStep('cart');
                  onClose();
                }}
                className="mt-6 inline-flex min-h-[42px] items-center rounded-lg bg-[#012C6D] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#011E4D]"
              >
                Continue Shopping
              </button>
            </div>
          ) : items.length === 0 ? (
            <div className="py-16 text-center">
              <p className="font-display text-lg font-semibold text-[#012C6D]">
                Your cart is currently empty
              </p>
              <p className="mt-2 text-sm text-[#4B5565]">
                Add commercial slush machines, soft serve mixes, or candy floss supplies to get
                started.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="mt-6 inline-flex min-h-[40px] items-center rounded-lg bg-[#012C6D] px-5 py-2 text-sm font-semibold text-white hover:bg-[#011E4D]"
              >
                Browse Storefront
              </button>
            </div>
          ) : step === 'cart' ? (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={`${item.productId}-${item.variant}`}
                  className="flex gap-4 rounded-xl border border-[#012C6D]/10 bg-[#F8FAFC] p-3.5"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    referrerPolicy="no-referrer"
                    className="h-20 w-24 shrink-0 rounded-lg object-cover"
                  />
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="text-sm font-semibold text-[#0D1526]">{item.name}</h3>
                        <button
                          type="button"
                          aria-label={`Remove ${item.name} (${item.variant})`}
                          onClick={() => onUpdateQty(item.productId, item.variant, 0)}
                          className="text-[#4B5565] hover:text-[#E10B49]"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <p className="mt-0.5 text-xs text-[#4B5565]">
                        {item.variant} · <span className="font-mono">{item.sku}</span>
                      </p>
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      <div className="inline-flex h-8 items-center rounded-md border border-[#012C6D]/20 bg-white">
                        <button
                          type="button"
                          aria-label={`Decrease quantity for ${item.name}`}
                          onClick={() =>
                            onUpdateQty(item.productId, item.variant, item.quantity - 1)
                          }
                          className="flex h-full w-8 items-center justify-center text-[#012C6D] hover:bg-[#EEF3F9]"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="w-8 text-center font-mono text-xs font-semibold tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          aria-label={`Increase quantity for ${item.name}`}
                          onClick={() =>
                            onUpdateQty(item.productId, item.variant, item.quantity + 1)
                          }
                          className="flex h-full w-8 items-center justify-center text-[#012C6D] hover:bg-[#EEF3F9]"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>

                      <span className="font-mono text-sm font-bold text-[#012C6D] tabular-nums">
                        {formatZAR(item.unitPriceZar * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              {/* Delivery Zone Selector */}
              <div className="mt-6 rounded-xl border border-[#012C6D]/12 bg-white p-4">
                <label
                  htmlFor="cart-delivery-zone"
                  className="block text-xs font-semibold tracking-wider text-[#0D1526] uppercase"
                >
                  Delivery / Collection Method
                </label>
                <select
                  id="cart-delivery-zone"
                  value={zone}
                  onChange={(e) => setZone(e.target.value as DeliveryZone)}
                  className="mt-2 h-10 w-full rounded-lg border border-[#012C6D]/20 bg-[#F8FAFC] px-3 text-sm font-medium text-[#0D1526]"
                >
                  <option value="pickup-pretoria">
                    Collect at Derdepoort Showroom (Free)
                  </option>
                  <option value="gauteng-courier">
                    Gauteng Courier (Pretoria / JHB / Centurion)
                  </option>
                  <option value="nationwide-courier">
                    Nationwide SA Courier (CPT / DBN / BFN / PE)
                  </option>
                </select>
                {totals.qualifiesFreeConsumableDelivery && zone !== 'pickup-pretoria' && (
                  <p className="mt-2 text-xs font-semibold text-[#0170B9]">
                    Free courier unlocked on consumables orders over R2,500.00.
                  </p>
                )}
              </div>
            </div>
          ) : (
            <form id="checkout-form" onSubmit={handlePlaceOrder} noValidate className="space-y-4">
              <p className="rounded-lg bg-[#EEF3F9] p-3 text-sm text-[#012C6D]">Use fictional contact details to test this quote preview. No information is sent.</p>
              <div>
                <label htmlFor="chk-name" className="block text-xs font-semibold text-[#0D1526]">
                  Full Name or Business Name
                </label>
                <input
                  id="chk-name"
                  type="text"
                  value={form.fullName}
                  onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                  placeholder="e.g. Johan van der Merwe / Café Twist"
                  className="mt-1 h-10 w-full rounded-lg border border-[#012C6D]/20 px-3 text-sm focus:border-[#012C6D] focus:outline-none"
                />
                {errors.fullName && (
                  <p className="mt-1 text-xs font-medium text-[#E10B49]">{errors.fullName}</p>
                )}
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="chk-phone" className="block text-xs font-semibold text-[#0D1526]">
                    Contact Number
                  </label>
                  <input
                    id="chk-phone"
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="072 609 0186"
                    className="mt-1 h-10 w-full rounded-lg border border-[#012C6D]/20 px-3 text-sm focus:border-[#012C6D] focus:outline-none"
                  />
                  {errors.phone && (
                    <p className="mt-1 text-xs font-medium text-[#E10B49]">{errors.phone}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="chk-email" className="block text-xs font-semibold text-[#0D1526]">
                    Email for Invoice
                  </label>
                  <input
                    id="chk-email"
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="orders@business.co.za"
                    className="mt-1 h-10 w-full rounded-lg border border-[#012C6D]/20 px-3 text-sm focus:border-[#012C6D] focus:outline-none"
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs font-medium text-[#E10B49]">{errors.email}</p>
                  )}
                </div>
              </div>

              {zone !== 'pickup-pretoria' && (
                <>
                  <div>
                    <label
                      htmlFor="chk-address"
                      className="block text-xs font-semibold text-[#0D1526]"
                    >
                      Street Address
                    </label>
                    <input
                      id="chk-address"
                      type="text"
                      value={form.address}
                      onChange={(e) => setForm({ ...form, address: e.target.value })}
                      placeholder="Unit 4, 28 Oak Avenue"
                      className="mt-1 h-10 w-full rounded-lg border border-[#012C6D]/20 px-3 text-sm focus:border-[#012C6D] focus:outline-none"
                    />
                    {errors.address && (
                      <p className="mt-1 text-xs font-medium text-[#E10B49]">{errors.address}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="chk-city" className="block text-xs font-semibold text-[#0D1526]">
                      City / Suburb
                    </label>
                    <input
                      id="chk-city"
                      type="text"
                      value={form.city}
                      onChange={(e) => setForm({ ...form, city: e.target.value })}
                      placeholder="Pretoria East"
                      className="mt-1 h-10 w-full rounded-lg border border-[#012C6D]/20 px-3 text-sm focus:border-[#012C6D] focus:outline-none"
                    />
                    {errors.city && (
                      <p className="mt-1 text-xs font-medium text-[#E10B49]">{errors.city}</p>
                    )}
                  </div>
                </>
              )}

              <div>
                <span className="block text-xs font-semibold text-[#0D1526]">Payment Option</span>
                <div className="mt-2 grid grid-cols-3 gap-2">
                  {[
                    { id: 'eft', label: 'Instant EFT' },
                    { id: 'card', label: 'Visa / Master' },
                    { id: 'showroom-cash', label: 'Showroom Cash' },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() =>
                        setForm({
                          ...form,
                          paymentMethod: opt.id as CheckoutFormInput['paymentMethod'],
                        })
                      }
                      className={`min-h-[38px] rounded-lg border px-2 py-1.5 text-xs font-semibold transition-colors ${
                        form.paymentMethod === opt.id
                          ? 'border-[#012C6D] bg-[#012C6D] text-white'
                          : 'border-[#012C6D]/20 bg-white text-[#0D1526] hover:bg-[#EEF3F9]'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </form>
          )}
        </div>

        {/* Drawer Footer */}
        {step !== 'confirmed' && items.length > 0 && (
          <div className="border-t border-[#012C6D]/10 bg-[#F8FAFC] px-6 py-5">
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between text-[#4B5565]">
                <span>Subtotal (incl. {formatZAR(totals.vatIncludedZar)} VAT)</span>
                <span className="font-mono text-[#0D1526] tabular-nums">
                  {formatZAR(totals.subtotalZar)}
                </span>
              </div>
              <div className="flex justify-between text-[#4B5565]">
                <span>Courier / Dispatch</span>
                <span className="font-mono text-[#0D1526] tabular-nums">
                  {totals.deliveryZar === 0 ? 'FREE' : formatZAR(totals.deliveryZar)}
                </span>
              </div>
              <div className="flex justify-between border-t border-[#012C6D]/10 pt-2 text-base font-bold text-[#012C6D]">
                <span>Total</span>
                <span data-testid="cart-total" className="font-mono tabular-nums">
                  {formatZAR(totals.totalZar)}
                </span>
              </div>
            </div>

            {step === 'cart' ? (
              <button
                type="button"
                onClick={() => setStep('checkout')}
                className="mt-4 inline-flex min-h-[44px] w-full items-center justify-center rounded-lg bg-[#012C6D] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#011E4D]"
              >
                Prepare Quote Request
              </button>
            ) : (
              <div className="mt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep('cart')}
                  className="inline-flex min-h-[44px] items-center justify-center rounded-lg border border-[#012C6D]/20 bg-white px-4 text-sm font-semibold text-[#012C6D] hover:bg-[#EEF3F9]"
                >
                  Back
                </button>
                <button
                  type="submit"
                  form="checkout-form"
                  className="inline-flex min-h-[44px] flex-1 items-center justify-center rounded-lg bg-[#E10B49] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#C6083F]"
                >
                  Preview Quote · {formatZAR(totals.totalZar)}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
