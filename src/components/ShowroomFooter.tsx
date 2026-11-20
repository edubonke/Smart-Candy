import { SmartCandyLogo } from './SmartCandyLogo';

export function ShowroomFooter() {
  return <footer id="showroom" className="bg-white border-t border-[#012C6D]/10">
    <div className="mx-auto max-w-[1360px] px-6 py-12 lg:px-10">
      <div className="grid gap-7 md:grid-cols-2">
        <div><SmartCandyLogo className="h-8 w-auto"/><h2 className="mt-4 font-display text-2xl font-bold text-[#012C6D]">Independent storefront concept</h2><p className="mt-3 text-sm leading-relaxed text-[#4B5565]">This educational redesign is a demonstration by EduBonke, not the official retailer. It does not operate a showroom, accept payments or make reservations. Illustrative product details must be confirmed by an authorised supplier.</p></div>
        <div className="rounded-2xl bg-[#EEF3F9] p-6"><h3 className="font-display font-bold text-[#012C6D]">Explore the concept</h3><div className="mt-4 flex flex-wrap gap-4 text-sm font-semibold text-[#012C6D]"><a className="underline" href="#catalog">Product catalogue</a><a className="underline" href="#guides">Buying guides</a><a className="underline" href="./wholesale/">Wholesale planner</a><a className="underline" href="./rentals/">Rental estimator</a></div><a className="mt-5 inline-block rounded-lg bg-[#012C6D] px-4 py-2 text-sm font-semibold text-white" href="https://www.smartcandy.co.za/" target="_blank" rel="noopener noreferrer">Visit the official retailer</a></div>
      </div>
      <p className="mt-8 border-t border-[#012C6D]/10 pt-5 text-xs text-[#4B5565]">© {new Date().getFullYear()} EduBonke · Independent design concept</p>
    </div>
  </footer>;
}
