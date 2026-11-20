const guides = [
  ['slush-mix/', 'Slush mixes & yield calculator'], ['candy-floss-sugar/', 'Candy floss sugar & portion planner'], ['slush-machines/', 'Commercial slush machines'], ['soft-serve-machines/', 'Commercial soft serve machines'], ['soft-serve-machines/bq323t/', 'BQ323T equipment guide'], ['popcorn-machines/', 'Popcorn machines & supplies'], ['candy-floss-machines/', 'Candy floss machine guide'], ['snow-cone-syrups/', 'Snow cone syrups'], ['rentals/', 'Gauteng party machine rentals'], ['rentals/slush-machine-hire-pretoria/', 'Pretoria slush hire'], ['rentals/slush-machine-hire-centurion/', 'Centurion slush hire'], ['rentals/slush-machine-hire-midrand/', 'Midrand slush hire'], ['rentals/slush-machine-hire-johannesburg/', 'Johannesburg slush hire'], ['wholesale/', 'Wholesale & trial order planner'], ['business-starter-kits/', 'Business starter kit & ROI planner'],
];
export function GrowthGuideSection() {
  return <section id="guides" className="scroll-mt-20 mx-auto max-w-[1360px] px-6 py-16 lg:px-10">
    <p className="text-xs font-bold uppercase tracking-widest text-[#0170B9]">Buying guides · Planning tools</p>
    <h2 className="mt-3 font-display text-3xl font-bold text-[#012C6D]">Find the right equipment and supplies</h2>
    <p className="mt-3 max-w-3xl text-[#4B5565]">Explore product guides, compare business economics and calculate illustrative party rentals. These tools do not place orders or check real stock.</p>
    <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">{guides.map(([href, title]) => <a key={href} href={`./${href}`} className="flex items-center justify-between gap-3 rounded-xl border border-[#012C6D]/15 bg-white p-4 text-sm font-semibold text-[#012C6D] hover:bg-[#EEF3F9] focus-visible:outline-2 focus-visible:outline-[#0170B9]">{title}<span aria-hidden="true">→</span></a>)}</div>
  </section>;
}
