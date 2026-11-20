import { ItemType, ProductCategory, ProductItem, RentalMachine } from '../data/catalog';

export interface CartItem {
  productId: string;
  sku: string;
  name: string;
  variant: string;
  unitPriceZar: number;
  quantity: number;
  image: string;
  itemType: ItemType;
}

export type DeliveryZone = 'pickup-pretoria' | 'gauteng-courier' | 'nationwide-courier';
export type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'name-asc';

export interface CatalogFilter {
  category: 'All' | ProductCategory;
  itemType: 'All' | ItemType;
  query: string;
  sort: SortOption;
}

export interface CartTotals {
  itemCount: number;
  subtotalZar: number;
  vatIncludedZar: number;
  deliveryZar: number;
  totalZar: number;
  qualifiesFreeConsumableDelivery: boolean;
}

export type RentalDuration = 'day' | 'weekend' | 'corporate';
export type GautengRegion = 'pretoria' | 'centurion' | 'midrand' | 'johannesburg';

export interface RentalQuoteInput {
  machine: RentalMachine;
  duration: RentalDuration;
  region: GautengRegion;
  extraMixPacks: number;
  includeAttendant: boolean;
}

export interface RentalQuoteBreakdown {
  baseRateZar: number;
  extrasZar: number;
  deliveryFeeZar: number;
  attendantFeeZar: number;
  refundableDepositZar: number;
  totalEstimateZar: number;
}

export interface CheckoutFormInput {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  paymentMethod: 'eft' | 'card' | 'showroom-cash';
}

export interface RentalFormInput {
  contactName: string;
  phone: string;
  eventDate: string;
  venueAddress: string;
}

export function formatZAR(amount: number): string {
  const fixed = Math.max(0, amount).toFixed(2);
  const [intPart, decPart] = fixed.split('.');
  const withCommas = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return `R${withCommas}.${decPart}`;
}

export function filterCatalog(items: ProductItem[], filter: CatalogFilter): ProductItem[] {
  const q = filter.query.trim().toLowerCase();

  const filtered = items.filter((item) => {
    if (filter.category !== 'All' && item.category !== filter.category) {
      return false;
    }
    if (filter.itemType !== 'All' && item.itemType !== filter.itemType) {
      return false;
    }
    if (q.length > 0) {
      const hay = `${item.name} ${item.sku} ${item.category} ${item.summary} ${item.variants.join(' ')}`.toLowerCase();
      if (!hay.includes(q)) {
        return false;
      }
    }
    return true;
  });

  const sorted = [...filtered];
  if (filter.sort === 'price-asc') {
    sorted.sort((a, b) => a.priceZar - b.priceZar);
  } else if (filter.sort === 'price-desc') {
    sorted.sort((a, b) => b.priceZar - a.priceZar);
  } else if (filter.sort === 'name-asc') {
    sorted.sort((a, b) => a.name.localeCompare(b.name));
  } else {
    sorted.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
  }

  return sorted;
}

export function variantPriceZar(product: ProductItem, variant: string): number {
  const selected = product.variants.find((option) => option === variant);
  const surcharge = selected?.match(/\(\+R([\d,.]+)\)/)?.[1];
  return product.priceZar + (surcharge ? Number(surcharge.replace(/,/g, '')) : 0);
}

export function addToCart(cart: CartItem[], product: ProductItem, variant: string, quantity = 1): CartItem[] {
  const safeQty = Math.max(1, Math.floor(quantity));
  const existingIndex = cart.findIndex(
    (entry) => entry.productId === product.id && entry.variant === variant
  );

  if (existingIndex >= 0) {
    return cart.map((entry, idx) =>
      idx === existingIndex ? { ...entry, quantity: entry.quantity + safeQty } : entry
    );
  }

  return [
    ...cart,
    {
      productId: product.id,
      sku: product.sku,
      name: product.name,
      variant,
      unitPriceZar: variantPriceZar(product, variant),
      quantity: safeQty,
      image: product.image,
      itemType: product.itemType,
    },
  ];
}

export function updateCartQty(cart: CartItem[], productId: string, variant: string, nextQty: number): CartItem[] {
  if (nextQty <= 0) {
    return cart.filter((entry) => !(entry.productId === productId && entry.variant === variant));
  }
  return cart.map((entry) =>
    entry.productId === productId && entry.variant === variant
      ? { ...entry, quantity: Math.floor(nextQty) }
      : entry
  );
}

export function calculateCartTotals(cart: CartItem[], zone: DeliveryZone): CartTotals {
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotalZar = cart.reduce((sum, item) => sum + item.unitPriceZar * item.quantity, 0);
  // South African retail prices include 15% VAT (VAT portion = subtotal * 15 / 115)
  const vatIncludedZar = (subtotalZar * 15) / 115;

  if (itemCount === 0 || zone === 'pickup-pretoria') {
    return {
      itemCount,
      subtotalZar,
      vatIncludedZar,
      deliveryZar: 0,
      totalZar: subtotalZar,
      qualifiesFreeConsumableDelivery: subtotalZar >= 2500,
    };
  }

  const hasMachine = cart.some((item) => item.itemType === 'Machines');
  const qualifiesFreeConsumableDelivery = !hasMachine && subtotalZar >= 2500;

  let deliveryZar = 0;
  if (qualifiesFreeConsumableDelivery) {
    deliveryZar = 0;
  } else if (zone === 'gauteng-courier') {
    deliveryZar = hasMachine ? 350 : 125;
  } else {
    deliveryZar = hasMachine ? 650 : 195;
  }

  return {
    itemCount,
    subtotalZar,
    vatIncludedZar,
    deliveryZar,
    totalZar: subtotalZar + deliveryZar,
    qualifiesFreeConsumableDelivery,
  };
}

export function calculateRentalQuote(input: RentalQuoteInput): RentalQuoteBreakdown {
  const baseRateZar =
    input.duration === 'day'
      ? input.machine.dailyRateZar
      : input.duration === 'weekend'
        ? input.machine.weekendRateZar
        : input.machine.corporateRateZar;

  const extraPacks = Math.max(0, Math.floor(input.extraMixPacks));
  const extrasZar = extraPacks * 165;

  const regionFees: Record<GautengRegion, number> = {
    pretoria: 180,
    centurion: 240,
    midrand: 320,
    johannesburg: 420,
  };
  const deliveryFeeZar = regionFees[input.region];
  const attendantFeeZar = input.includeAttendant ? 750 : 0;
  const refundableDepositZar = 1000;

  return {
    baseRateZar,
    extrasZar,
    deliveryFeeZar,
    attendantFeeZar,
    refundableDepositZar,
    totalEstimateZar: baseRateZar + extrasZar + deliveryFeeZar + attendantFeeZar,
  };
}

export function validateCheckoutForm(form: CheckoutFormInput, zone: DeliveryZone): Record<string, string> {
  const errors: Record<string, string> = {};
  if (form.fullName.trim().length < 2) {
    errors.fullName = 'Please enter your full name or business name.';
  }
  if (form.phone.replace(/\D/g, '').length < 9) {
    errors.phone = 'Enter a valid South African contact number (e.g. 072 609 0186).';
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
    errors.email = 'Enter a valid email address for your tax invoice.';
  }
  if (zone !== 'pickup-pretoria' && form.address.trim().length < 5) {
    errors.address = 'Street address is required for courier dispatch.';
  }
  if (zone !== 'pickup-pretoria' && form.city.trim().length < 2) {
    errors.city = 'Enter your delivery city or suburb.';
  }
  return errors;
}

export function validateRentalForm(form: RentalFormInput): Record<string, string> {
  const errors: Record<string, string> = {};
  if (form.contactName.trim().length < 2) {
    errors.contactName = 'Enter the event organiser name.';
  }
  if (form.phone.replace(/\D/g, '').length < 9) {
    errors.phone = 'Enter a valid WhatsApp or mobile number.';
  }
  if (!form.eventDate.trim()) {
    errors.eventDate = 'Select your event date.';
  }
  if (form.venueAddress.trim().length < 4) {
    errors.venueAddress = 'Enter your Gauteng venue or suburb.';
  }
  return errors;
}
