import test from 'node:test';
import assert from 'node:assert/strict';
import { CATALOG_PRODUCTS, RENTAL_MACHINES } from '../data/catalog';
import {
  addToCart,
  calculateCartTotals,
  calculateRentalQuote,
  filterCatalog,
  formatZAR,
  updateCartQty,
  validateCheckoutForm,
  validateRentalForm,
  variantPriceZar,
} from './commerce';

test('formatZAR renders South African Rand with two decimals and commas', () => {
  assert.equal(formatZAR(22495), 'R22,495.00');
  assert.equal(formatZAR(85.5), 'R85.50');
  assert.equal(formatZAR(0), 'R0.00');
});

test('paid variants contribute their full surcharge to unit and cart totals', () => {
  const machine = CATALOG_PRODUCTS.find((product) => product.id === 'sc-softserve-323t')!;
  const variant = machine.variants[1];
  assert.equal(variantPriceZar(machine, variant), 35790);
  const cart = addToCart([], machine, variant, 2);
  assert.equal(cart[0].unitPriceZar, 35790);
  assert.equal(calculateCartTotals(cart, 'pickup-pretoria').subtotalZar, 71580);
});

test('filterCatalog filters by category, itemType, query and sorts accurately', () => {
  const slushMachines = filterCatalog(CATALOG_PRODUCTS, {
    category: 'Slush',
    itemType: 'Machines',
    query: '',
    sort: 'price-asc',
  });
  assert.equal(slushMachines.length, 3);
  assert.equal(slushMachines[0].sku, 'SC-1');
  assert.equal(slushMachines[2].sku, 'SC-3');

  const queryMatch = filterCatalog(CATALOG_PRODUCTS, {
    category: 'All',
    itemType: 'All',
    query: 'bubblegum',
    sort: 'featured',
  });
  assert.ok(queryMatch.length >= 2);
});

test('cart operations merge identical SKU+variant and compute SA VAT & shipping', () => {
  const mix = CATALOG_PRODUCTS.find((p) => p.id === 'sc-slush-mix')!;
  let cart = addToCart([], mix, 'Strawberry', 2);
  cart = addToCart(cart, mix, 'Strawberry', 3);
  cart = addToCart(cart, mix, 'Blueberry', 1);

  assert.equal(cart.length, 2);
  assert.equal(cart[0].quantity, 5);

  const totalsGauteng = calculateCartTotals(cart, 'gauteng-courier');
  assert.equal(totalsGauteng.itemCount, 6);
  assert.equal(totalsGauteng.subtotalZar, 513);
  assert.equal(totalsGauteng.deliveryZar, 125);
  assert.equal(totalsGauteng.totalZar, 638);
  assert.ok(Math.abs(totalsGauteng.vatIncludedZar - (513 * 15) / 115) < 0.01);

  const pickupTotals = calculateCartTotals(cart, 'pickup-pretoria');
  assert.equal(pickupTotals.deliveryZar, 0);

  cart = updateCartQty(cart, mix.id, 'Blueberry', 0);
  assert.equal(cart.length, 1);
});

test('calculateRentalQuote computes weekend & Gauteng delivery tiers properly', () => {
  const slushRental = RENTAL_MACHINES[0];
  const quote = calculateRentalQuote({
    machine: slushRental,
    duration: 'weekend',
    region: 'johannesburg',
    extraMixPacks: 2,
    includeAttendant: true,
  });

  assert.equal(quote.baseRateZar, 1350);
  assert.equal(quote.extrasZar, 330);
  assert.equal(quote.deliveryFeeZar, 420);
  assert.equal(quote.attendantFeeZar, 750);
  assert.equal(quote.totalEstimateZar, 2850);
});

test('form validations enforce required fields without silent bypass', () => {
  const checkoutErrors = validateCheckoutForm(
    { fullName: '', phone: '123', email: 'bad', address: '', city: '', paymentMethod: 'eft' },
    'nationwide-courier'
  );
  assert.ok(checkoutErrors.fullName);
  assert.ok(checkoutErrors.phone);
  assert.ok(checkoutErrors.email);
  assert.ok(checkoutErrors.address);
  assert.ok(checkoutErrors.city);

  const rentalErrors = validateRentalForm({
    contactName: '',
    phone: '072',
    eventDate: '',
    venueAddress: 'a',
  });
  assert.equal(Object.keys(rentalErrors).length, 4);
});
