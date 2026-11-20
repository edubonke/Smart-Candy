export type ProductCategory =
  | 'Slush'
  | 'Soft Serve'
  | 'Candy Floss'
  | 'Popcorn'
  | 'Snow Cone & Shakes';

export type ItemType = 'Machines' | 'Mixes & Sugars' | 'Cups & Packaging';

export interface ProductSpec {
  label: string;
  value: string;
}

export interface ProductItem {
  id: string;
  sku: string;
  name: string;
  category: ProductCategory;
  itemType: ItemType;
  priceZar: number;
  unitLabel: string;
  stockStatus: 'In Stock' | 'Pretoria Showroom' | 'Made to Order';
  image: string;
  summary: string;
  variants: string[];
  specs: ProductSpec[];
  featured?: boolean;
}

export interface HeroShowcaseItem {
  id: string;
  productId: string;
  indexLabel: string;
  shortTitle: string;
  headline: string;
  subline: string;
  sku: string;
  priceZar: number;
  metricLabel: string;
  metricValue: string;
  image: string;
  accentHex: string;
}

export interface FlavorSwatch {
  id: string;
  name: string;
  category: string;
  hex: string;
  note: string;
}

export interface RentalMachine {
  id: string;
  name: string;
  dailyRateZar: number;
  weekendRateZar: number;
  corporateRateZar: number;
  includedPack: string;
  capacity: string;
  image: string;
}

export const IMAGES = {
  slushMachine: './src/assets/images/hero_slush_machine_1795165020736.jpg',
  softServe: './src/assets/images/product_soft_serve_1795165021015.jpg',
  candyFloss: './src/assets/images/product_candy_floss_1795165020843.jpg',
  popcornCart: './src/assets/images/product_popcorn_cart_1795165022462.jpg',
  mixesSyrups: './src/assets/images/product_mixes_syrups_1795165022390.jpg',
} as const;

export const HERO_SHOWCASES: HeroShowcaseItem[] = [
  {
    id: 'slush',
    productId: 'sc-slush-2',
    indexLabel: '01',
    shortTitle: 'Slush Systems',
    headline: 'Twin-barrel frozen precision for high-volume service.',
    subline: 'ChromeCater SC-2 double 12L bowls with fast-freeze stainless evaporators.',
    sku: 'SC-2',
    priceZar: 22495,
    metricLabel: 'Bowl Capacity',
    metricValue: '2 × 12L',
    image: IMAGES.slushMachine,
    accentHex: '#0170B9',
  },
  {
    id: 'soft-serve',
    productId: 'sc-softserve-323t',
    indexLabel: '02',
    shortTitle: 'Soft Serve',
    headline: 'Twin-twist creamy swirls built for cafés and events.',
    subline: 'BQ323T countertop soft serve unit paired with 1.5kg South African powder mixes.',
    sku: 'BQ323T',
    priceZar: 34995,
    metricLabel: 'Hourly Output',
    metricValue: '22L / hr',
    image: IMAGES.softServe,
    accentHex: '#012C6D',
  },
  {
    id: 'candy-floss',
    productId: 'sc-floss-mf01',
    indexLabel: '03',
    shortTitle: 'Candy Floss',
    headline: 'Spun sugar clouds in thirty seconds flat.',
    subline: 'ChromeCater MF-01 520mm stainless pan with calibrated heat control.',
    sku: 'MF-01',
    priceZar: 4495,
    metricLabel: 'Pan Diameter',
    metricValue: '520 mm',
    image: IMAGES.candyFloss,
    accentHex: '#E10B49',
  },
  {
    id: 'popcorn',
    productId: 'sc-popcorn-8oz',
    indexLabel: '04',
    shortTitle: 'Popcorn & Carts',
    headline: 'Cinema-grade 8oz kettles with crisp heated decks.',
    subline: 'ChromeCater POP6A-B tempered glass popper with butterfly kernels and spices.',
    sku: 'POP6A-B',
    priceZar: 3395,
    metricLabel: 'Kettle Size',
    metricValue: '8 oz',
    image: IMAGES.popcornCart,
    accentHex: '#F5A623',
  },
];

export const FLAVOR_SWATCHES: FlavorSwatch[] = [
  {
    id: 'strawberry',
    name: 'Ruby Strawberry',
    category: 'Slush & Floss',
    hex: '#E10B49',
    note: '1:4 syrup yield · 25L per 5L bottle',
  },
  {
    id: 'blueberry',
    name: 'Cobalt Blueberry',
    category: 'Slush & Snow Cone',
    hex: '#0170B9',
    note: 'Rich berry finish · bold freezer colour',
  },
  {
    id: 'bubblegum',
    name: 'Sky Bubblegum',
    category: 'Slush & Sugar',
    hex: '#00AEEF',
    note: 'Best-seller for school fetes & parties',
  },
  {
    id: 'mango',
    name: 'Golden Mango',
    category: 'Freezo & Tropical',
    hex: '#F5A623',
    note: 'Sun-ripened tropical blend · zero grit',
  },
];

export const CATALOG_PRODUCTS: ProductItem[] = [
  {
    id: 'sc-slush-2',
    sku: 'SC-2',
    name: 'Slush Machine SC-2 | ChromeCater Double Barrel',
    category: 'Slush',
    itemType: 'Machines',
    priceZar: 22495,
    unitLabel: 'Complete Commercial Unit',
    stockStatus: 'In Stock',
    image: IMAGES.slushMachine,
    featured: true,
    summary:
      'Dual 12L polycarbonate hoppers with independent freeze/chill controls, stainless chassis, and reliable Embraco-grade cooling for busy retail counters and event hire fleets.',
    variants: ['Standard Stainless (220V)', 'With 4 × 5L Starter Mixes (+R680)'],
    specs: [
      { label: 'Capacity', value: '2 × 12 Litres (24L Total)' },
      { label: 'Power', value: '820W · 220V / 50Hz' },
      { label: 'Dimensions', value: '400 × 540 × 810 mm' },
      { label: 'Warranty', value: '12 Months Carry-In Pretoria' },
    ],
  },
  {
    id: 'sc-slush-3',
    sku: 'SC-3',
    name: 'Slush Machine SC-3 | ChromeCater Triple Barrel',
    category: 'Slush',
    itemType: 'Machines',
    priceZar: 26495,
    unitLabel: 'Triple Hopper Commercial Unit',
    stockStatus: 'In Stock',
    image: IMAGES.slushMachine,
    summary:
      'Three independent 12L bowls allowing simultaneous Strawberry, Blueberry, and Bubblegum or Mango Freezo service at cinemas, forecourts, and stadiums.',
    variants: ['Triple Stainless (220V)'],
    specs: [
      { label: 'Capacity', value: '3 × 12 Litres (36L Total)' },
      { label: 'Power', value: '1150W · 220V / 50Hz' },
      { label: 'Dimensions', value: '600 × 540 × 810 mm' },
      { label: 'Warranty', value: '12 Months Carry-In Pretoria' },
    ],
  },
  {
    id: 'sc-slush-1',
    sku: 'SC-1',
    name: 'Slush Machine SC-1 | ChromeCater Single Barrel',
    category: 'Slush',
    itemType: 'Machines',
    priceZar: 16495,
    unitLabel: 'Compact Single Hopper',
    stockStatus: 'Pretoria Showroom',
    image: IMAGES.slushMachine,
    summary:
      'Space-saving single 12L slush dispenser ideal for coffee shops, cocktail bars, and boutique mobile trailers.',
    variants: ['Single 12L Stainless'],
    specs: [
      { label: 'Capacity', value: '1 × 12 Litres' },
      { label: 'Power', value: '480W · 220V / 50Hz' },
      { label: 'Dimensions', value: '220 × 540 × 810 mm' },
      { label: 'Warranty', value: '12 Months Carry-In Pretoria' },
    ],
  },
  {
    id: 'sc-slush-mix',
    sku: 'SM-2L',
    name: 'Smart Candy Slush Mix Concentrate',
    category: 'Slush',
    itemType: 'Mixes & Sugars',
    priceZar: 85.5,
    unitLabel: '2L Concentrate (Makes 10L Slush)',
    stockStatus: 'In Stock',
    image: IMAGES.mixesSyrups,
    featured: true,
    summary:
      'High-brix South African slush concentrate formulated to freeze cleanly without locking auger blades. Dilutes 1 part syrup to 4 parts water.',
    variants: ['Strawberry', 'Blueberry', 'Bubblegum', 'Grape', 'Cream Soda', 'Mango'],
    specs: [
      { label: 'Dilution Ratio', value: '1 : 4 Water' },
      { label: 'Yield', value: '10 Litres Finished Slush' },
      { label: 'Shelf Life', value: '12 Months Sealed' },
      { label: 'Origin', value: 'Blended in South Africa' },
    ],
  },
  {
    id: 'sc-softserve-323t',
    sku: 'BQ323T',
    name: 'Soft Serve Machine BQ323T | Dual + Twist',
    category: 'Soft Serve',
    itemType: 'Machines',
    priceZar: 34995,
    unitLabel: 'Countertop 3-Lever Unit',
    stockStatus: 'In Stock',
    image: IMAGES.softServe,
    featured: true,
    summary:
      'Commercial countertop soft serve freezer with dual hoppers and centre twist lever. Digital hardness control, standby overnight chill, and stainless beaters.',
    variants: ['Countertop 220V (Stainless)', 'With Starter Mix Bundle (+R795)'],
    specs: [
      { label: 'Output', value: '20 – 25 Litres / Hour' },
      { label: 'Flavours', value: '2 Base + 1 Mixed Twist' },
      { label: 'Power', value: '1850W · 220V / 50Hz' },
      { label: 'Hoppers', value: '2 × 5.5L Stainless' },
    ],
  },
  {
    id: 'sc-softserve-115t',
    sku: 'BQ115T',
    name: 'Soft Serve Machine BQ115T | Compact Single',
    category: 'Soft Serve',
    itemType: 'Machines',
    priceZar: 21995,
    unitLabel: 'Single Flavour Countertop',
    stockStatus: 'Pretoria Showroom',
    image: IMAGES.softServe,
    summary:
      'Reliable entry-commercial single-flavour soft serve and frozen yogurt machine for bistros, dessert kiosks, and event caterers.',
    variants: ['Single Flavour 220V'],
    specs: [
      { label: 'Output', value: '12 – 16 Litres / Hour' },
      { label: 'Flavours', value: '1 Single Spout' },
      { label: 'Power', value: '1250W · 220V / 50Hz' },
      { label: 'Footprint', value: '210 × 554 × 740 mm' },
    ],
  },
  {
    id: 'sc-softserve-mix',
    sku: 'SSM-1.5',
    name: 'Soft Serve Ice Cream Powder Mix | 1.5kg',
    category: 'Soft Serve',
    itemType: 'Mixes & Sugars',
    priceZar: 159.5,
    unitLabel: '1.5kg Bag (Makes ±5L Mix)',
    stockStatus: 'In Stock',
    image: IMAGES.mixesSyrups,
    summary:
      'Silky commercial soft serve and frozen yogurt powder mix. Simply whisk into 3.5L cold water or milk for rich overrun and clean cone structure.',
    variants: ['Vanilla', 'Chocolate', 'Strawberry', 'Frozen Yogurt Tart'],
    specs: [
      { label: 'Net Weight', value: '1.5 kg Foil Pouch' },
      { label: 'Yield', value: '±5 Litres (50–65 Cones)' },
      { label: 'Prep', value: 'Add 3.5L Cold Water' },
      { label: 'Storage', value: 'Dry Pantry · No Refrigeration' },
    ],
  },
  {
    id: 'sc-floss-mf01',
    sku: 'MF-01',
    name: 'Candy Floss Machine | ChromeCater MF-01',
    category: 'Candy Floss',
    itemType: 'Machines',
    priceZar: 4495,
    unitLabel: '520mm Stainless Steel Pan',
    stockStatus: 'In Stock',
    image: IMAGES.candyFloss,
    featured: true,
    summary:
      'Heavy-duty belt-driven spinner head with precision voltage dial, stainless steel catch pan, and clip-down clamps for effortless carnival spinning.',
    variants: ['Berry Pink Cabinet', 'Optional 520mm Clear Dome (+R995)'],
    specs: [
      { label: 'Bowl Diameter', value: '520 mm Food-Grade Steel' },
      { label: 'Power', value: '1030W · 220V' },
      { label: 'Warm-up', value: '90 Seconds' },
      { label: 'Output', value: '2 Cones / Minute' },
    ],
  },
  {
    id: 'sc-floss-sugar',
    sku: 'CFS-1.5',
    name: 'Candy Floss Flavoured Sugar Mix | 1.5kg',
    category: 'Candy Floss',
    itemType: 'Mixes & Sugars',
    priceZar: 75.0,
    unitLabel: '1.5kg Ready-to-Spin Tub',
    stockStatus: 'In Stock',
    image: IMAGES.mixesSyrups,
    summary:
      'Coarse-crystal flossine sugar engineered to melt evenly without scorching the heating ribbon. Produces vivid pastel clouds.',
    variants: ['Strawberry Pink', 'Bubblegum Blue', 'Cream Soda Green'],
    specs: [
      { label: 'Net Weight', value: '1.5 kg Resealable Bag' },
      { label: 'Yield', value: '±45–60 Servings' },
      { label: 'Crystal Grade', value: 'Coarse Flossine Granule' },
      { label: 'Pair With', value: '450mm Wooden Sticks' },
    ],
  },
  {
    id: 'sc-popcorn-8oz',
    sku: 'POP6A-B',
    name: 'Popcorn Machine | ChromeCater 8oz Cinema',
    category: 'Popcorn',
    itemType: 'Machines',
    priceZar: 3395,
    unitLabel: '8oz Heated Tempered Glass',
    stockStatus: 'In Stock',
    image: IMAGES.popcornCart,
    featured: true,
    summary:
      'Iconic crimson-and-black tempered glass popper with stainless 8oz kettle, heated kernel deck, crumb tray, and dual independent rocker switches.',
    variants: ['Crimson & Black 8oz', 'Pink & Black 8oz'],
    specs: [
      { label: 'Kettle Size', value: '8 oz Stainless Non-Stick' },
      { label: 'Power', value: '1350W · 220V' },
      { label: 'Cycle Time', value: '3 Minutes / Batch' },
      { label: 'Cabinet', value: 'Tempered Safety Glass' },
    ],
  },
  {
    id: 'sc-popcorn-bundle',
    sku: 'PK-SPICE',
    name: 'Popcorn Kernels (1kg) & Spice Pairing',
    category: 'Popcorn',
    itemType: 'Mixes & Sugars',
    priceZar: 109.5,
    unitLabel: '1kg Butterfly Kernels + 500g Spice',
    stockStatus: 'In Stock',
    image: IMAGES.popcornCart,
    summary:
      'High-expansion butterfly popping corn paired with authentic South African fine-milled popcorn seasoning salt.',
    variants: ['Butter Salt Pairing', 'Salt & Vinegar Pairing', 'White Cheddar Pairing'],
    specs: [
      { label: 'Kernel Grade', value: 'A-Grade Butterfly Corn' },
      { label: 'Expansion', value: '42:1 Popping Ratio' },
      { label: 'Spice Pack', value: '500g Fine Dusting Salt' },
      { label: 'Servings', value: '±30 Medium Bags' },
    ],
  },
  {
    id: 'sc-cups-lids',
    sku: 'SL-CUPS100',
    name: 'Slush Dome Cups, Lids & Spoon Straws',
    category: 'Snow Cone & Shakes',
    itemType: 'Cups & Packaging',
    priceZar: 245.0,
    unitLabel: '100 Complete Sets',
    stockStatus: 'In Stock',
    image: IMAGES.mixesSyrups,
    summary:
      'Crystal-clear PET slush and milkshake cups matched with wide-hole dome lids and vibrant wrapped spoon straws.',
    variants: ['350ml Set (100pcs)', '500ml Set (100pcs)', 'Snow Cone Paper Cups (200pcs)'],
    specs: [
      { label: 'Material', value: 'Food-Grade Clear PET' },
      { label: 'Pack Count', value: '100 Cups + 100 Lids + Straws' },
      { label: 'Compatibility', value: 'Slush, Milkshakes & Floats' },
      { label: 'Dispatch', value: 'Same-Day Pretoria' },
    ],
  },
];

export const RENTAL_MACHINES: RentalMachine[] = [
  {
    id: 'hire-slush',
    name: 'Double Barrel Slush Machine (2 × 12L)',
    dailyRateZar: 950,
    weekendRateZar: 1350,
    corporateRateZar: 1950,
    includedPack: 'Includes 2 × 5L mix + 50 cups & straws',
    capacity: '100–120 frozen servings per fill',
    image: IMAGES.slushMachine,
  },
  {
    id: 'hire-softserve',
    name: 'Twin-Twist Soft Serve Ice Cream Unit',
    dailyRateZar: 1650,
    weekendRateZar: 2450,
    corporateRateZar: 3200,
    includedPack: 'Includes 2 × 1.5kg vanilla/choc mixes + 100 cones',
    capacity: 'Up to 120 cones per hour',
    image: IMAGES.softServe,
  },
  {
    id: 'hire-floss',
    name: 'Commercial Candy Floss Machine & Dome',
    dailyRateZar: 650,
    weekendRateZar: 950,
    corporateRateZar: 1450,
    includedPack: 'Includes 1.5kg strawberry/blue sugar + 60 sticks',
    capacity: '2 fresh candy clouds per minute',
    image: IMAGES.candyFloss,
  },
  {
    id: 'hire-popcorn',
    name: 'Cinema 8oz Popcorn Maker & Cart',
    dailyRateZar: 650,
    weekendRateZar: 950,
    corporateRateZar: 1450,
    includedPack: 'Includes 1kg kernels, oil, butter salt + 60 bags',
    capacity: '60+ warm theatre bags per hour',
    image: IMAGES.popcornCart,
  },
];
