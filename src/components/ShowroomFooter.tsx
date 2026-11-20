import { Clock, MapPin, Phone, ShieldCheck } from 'lucide-react';
import { SmartCandyLogo } from './SmartCandyLogo';

export function ShowroomFooter() {
  return (
    <footer id="showroom" className="scroll-mt-20 bg-white">
      {/* Pretoria Showroom & Trust Band */}
      <div className="mx-auto max-w-[1360px] px-6 py-16 lg:px-10 lg:py-20">
        <div className="grid grid-cols-1 gap-10 border-b border-[#012C6D]/10 pb-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="text-xs font-semibold tracking-[0.12em] text-[#0170B9] uppercase">
              Pretoria Showroom &amp; Workshop
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-[#012C6D]">
              Visit us in Derdepoort, Pretoria.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[#4B5565]">
              Inspect our ChromeCater slush, soft serve, candy floss, and popcorn machines in
              person, pick up fresh syrups and cones, or get technical advice before and after your
              purchase.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="tel:0726090186"
                className="inline-flex min-h-[40px] items-center gap-2 rounded-lg bg-[#012C6D] px-4 py-2 text-sm font-semibold text-white hover:bg-[#011E4D]"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                <span>Call 072 609 0186</span>
              </a>
              <a
                href="https://wa.me/27726090186"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[40px] items-center gap-2 rounded-lg border border-[#012C6D]/20 px-4 py-2 text-sm font-semibold text-[#012C6D] hover:bg-[#EEF3F9]"
              >
                <span>WhatsApp Sales Desk</span>
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 lg:col-span-7">
            <div className="rounded-2xl border border-[#012C6D]/10 bg-[#F8FAFC] p-5">
              <MapPin className="h-5 w-5 text-[#0170B9]" aria-hidden="true" />
              <h3 className="mt-3 font-display text-base font-semibold text-[#012C6D]">
                Showroom Address
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-[#4B5565]">
                117 Dewar Street, Unit 12
                <br />
                No.1 Mondustria Park
                <br />
                Derdepoort, Pretoria, 0035
              </p>
            </div>

            <div className="rounded-2xl border border-[#012C6D]/10 bg-[#F8FAFC] p-5">
              <Clock className="h-5 w-5 text-[#E10B49]" aria-hidden="true" />
              <h3 className="mt-3 font-display text-base font-semibold text-[#012C6D]">
                Trading Hours
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-[#4B5565]">
                Mon – Fri: 08:00 – 17:00
                <br />
                Saturday: 08:00 – 12:00
                <br />
                Online Store: 24 Hours
              </p>
            </div>

            <div className="rounded-2xl border border-[#012C6D]/10 bg-[#F8FAFC] p-5">
              <ShieldCheck className="h-5 w-5 text-[#012C6D]" aria-hidden="true" />
              <h3 className="mt-3 font-display text-base font-semibold text-[#012C6D]">
                Direct Contact &amp; Pay
              </h3>
              <p className="mt-1.5 font-mono text-sm text-[#0D1526]">072 609 0186</p>
              <p className="font-mono text-sm text-[#0D1526]">072 498 3516</p>
              <p className="mt-2 text-xs text-[#4B5565]">
                Cash · Visa &amp; Mastercard · Instant EFT · Nationwide Courier
              </p>
            </div>
          </div>
        </div>

        {/* Clean Architectural Bottom Footer */}
        <div className="flex flex-col items-start justify-between gap-6 pt-8 sm:flex-row sm:items-center">
          <SmartCandyLogo className="h-8 w-auto" />
          <div className="flex flex-wrap items-center gap-6 text-xs text-[#4B5565]">
            <a href="#catalog" className="hover:text-[#012C6D]">
              Equipment &amp; Mixes
            </a>
            <a href="#party-hire" className="hover:text-[#012C6D]">
              Party Machine Hire
            </a>
            <span>Derdepoort, Pretoria · South Africa</span>
            <span>© {new Date().getFullYear()} Smart Candy</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
