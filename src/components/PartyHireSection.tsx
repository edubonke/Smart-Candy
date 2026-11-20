import { CalendarCheck2, CheckCircle2 } from 'lucide-react';
import { FormEvent, useState } from 'react';
import { RENTAL_MACHINES } from '../data/catalog';
import {
  GautengRegion,
  RentalDuration,
  RentalFormInput,
  calculateRentalQuote,
  formatZAR,
  validateRentalForm,
} from '../utils/commerce';

export function PartyHireSection() {
  const [machineId, setMachineId] = useState(RENTAL_MACHINES[0].id);
  const [duration, setDuration] = useState<RentalDuration>('weekend');
  const [region, setRegion] = useState<GautengRegion>('pretoria');
  const [extraMixPacks, setExtraMixPacks] = useState(1);
  const [includeAttendant, setIncludeAttendant] = useState(false);

  const [form, setForm] = useState<RentalFormInput>({
    contactName: '',
    phone: '',
    eventDate: '',
    venueAddress: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [confirmedRef, setConfirmedRef] = useState<string | null>(null);

  const selectedMachine =
    RENTAL_MACHINES.find((m) => m.id === machineId) || RENTAL_MACHINES[0];

  const quote = calculateRentalQuote({
    machine: selectedMachine,
    duration,
    region,
    extraMixPacks,
    includeAttendant,
  });

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const validation = validateRentalForm(form);
    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      return;
    }
    setErrors({});
    const code = `HIRE-${String(Math.floor(1000 + Math.random() * 9000))}`;
    setConfirmedRef(code);
  }

  return (
    <section
      id="party-hire"
      className="scroll-mt-20 border-y border-[#012C6D]/15 bg-[#012C6D] py-16 text-white lg:py-24"
    >
      <div className="mx-auto max-w-[1360px] px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start">
          {/* Left Narrative & Proof Metrics */}
          <div className="lg:col-span-5">
            <p className="text-xs font-semibold tracking-[0.12em] text-[#00AEEF] uppercase">
              Pretoria · Centurion · Midrand · Johannesburg
            </p>

            <h2
              className="mt-3 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl"
              style={{ textWrap: 'balance' }}
            >
              Gauteng Party &amp; Event Machine Rentals
            </h2>

            <p className="mt-4 text-base leading-relaxed text-white/80">
              Hosting a birthday, school sports day, wedding, or corporate brand activation? Hire
              commercial slush, soft serve, candy floss, and cinema popcorn machines supplied with
              fresh mixes, cups, and cones.
            </p>

            <div className="mt-8 grid grid-cols-3 gap-4 border-y border-white/15 py-6">
              <div>
                <div className="font-mono text-base font-bold text-white tabular-nums sm:text-2xl">Gauteng</div>
                <div className="mt-1 text-xs text-white/75">Event Hire Region</div>
              </div>
              <div>
                <div className="font-mono text-base font-bold text-[#F5A623] tabular-nums sm:text-2xl">Mixes</div>
                <div className="mt-1 text-xs text-white/75">Starter Kit Options</div>
              </div>
              <div>
                <div className="font-mono text-2xl font-bold text-[#00AEEF] tabular-nums">08:00</div>
                <div className="mt-1 text-xs text-white/75">Sample Setup Time</div>
              </div>
            </div>

            {/* Selected Machine Preview Card */}
            <div className="mt-8 overflow-hidden rounded-2xl border border-white/15 bg-white/5">
              <div className="aspect-[4/3] w-full overflow-hidden">
                <img
                  src={selectedMachine.image}
                  alt={selectedMachine.name}
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-5">
                <div className="text-xs font-semibold text-[#00AEEF] uppercase">
                  Included Starter Kit
                </div>
                <p className="mt-1 text-sm font-semibold text-white">
                  {selectedMachine.includedPack}
                </p>
                <p className="mt-1 text-xs text-white/75">{selectedMachine.capacity}</p>
              </div>
            </div>
          </div>

          {/* Right Interactive Rental Quote & Booking Configurator */}
          <div className="rounded-2xl bg-white p-6 text-[#0D1526] shadow-xl sm:p-8 lg:col-span-7">
            {confirmedRef ? (
              <div data-testid="rental-confirmation" className="py-8 text-center">
                <CheckCircle2 className="mx-auto h-12 w-12 text-[#0170B9]" aria-hidden="true" />
                <h3 className="mt-4 font-display text-2xl font-bold text-[#012C6D]">
                  Sample Rental Quote {confirmedRef}
                </h3>
                <p className="mx-auto mt-2 max-w-md text-sm text-[#4B5565]">
                  Your illustrative estimate is ready for{' '}
                  <strong className="text-[#0D1526]">{selectedMachine.name}</strong> for{' '}
                  <strong className="text-[#0D1526]">{form.eventDate}</strong> in{' '}
                  <span className="capitalize">{region}</span>. No reservation was made or information sent.
                </p>

                <div className="mx-auto mt-6 max-w-sm rounded-xl bg-[#EEF3F9] p-4 text-left text-sm">
                  <div className="flex justify-between">
                    <span className="text-[#4B5565]">Estimated Rental Total</span>
                    <span className="font-mono font-bold text-[#012C6D] tabular-nums">
                      {formatZAR(quote.totalEstimateZar)}
                    </span>
                  </div>
                  <div className="mt-1.5 flex justify-between text-xs text-[#4B5565]">
                    <span>Refundable Security Deposit</span>
                    <span className="font-mono tabular-nums">
                      {formatZAR(quote.refundableDepositZar)}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setConfirmedRef(null);
                    setForm({ contactName: '', phone: '', eventDate: '', venueAddress: '' });
                  }}
                  className="mt-6 inline-flex min-h-[42px] items-center rounded-lg bg-[#012C6D] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#011E4D]"
                >
                  Configure Another Hire
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <p className="mb-4 rounded-lg bg-[#EEF3F9] p-3 text-sm text-[#012C6D]">Demo only: use fictional contact details. This does not reserve a machine.</p>
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#012C6D]/10 pb-4">
                  <div>
                    <h3 className="font-display text-xl font-bold text-[#012C6D]">
                      Rental Quote Preview
                    </h3>
                    <p className="text-xs text-[#4B5565]">
                      Select your machine, Gauteng delivery zone, and event date.
                    </p>
                  </div>
                  <span className="font-mono text-xl font-bold text-[#E10B49] tabular-nums">
                    {formatZAR(quote.totalEstimateZar)}
                  </span>
                </div>

                {/* Machine Selection */}
                <div className="mt-5">
                  <label className="block text-xs font-semibold tracking-wider text-[#0D1526] uppercase">
                    1. Choose Party Machine
                  </label>
                  <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {RENTAL_MACHINES.map((machine) => {
                      const active = machine.id === machineId;
                      return (
                        <button
                          key={machine.id}
                          type="button"
                          onClick={() => setMachineId(machine.id)}
                          className={`rounded-xl border px-3.5 py-2.5 text-left transition-colors ${
                            active
                              ? 'border-[#012C6D] bg-[#012C6D] text-white'
                              : 'border-[#012C6D]/15 bg-[#F8FAFC] text-[#0D1526] hover:bg-[#EEF3F9]'
                          }`}
                        >
                          <div className="text-xs font-semibold">{machine.name}</div>
                          <div
                            className={`mt-1 font-mono text-[11px] tabular-nums ${
                              active ? 'text-white/80' : 'text-[#0170B9]'
                            }`}
                          >
                            From {formatZAR(machine.dailyRateZar)} / day
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Duration & Gauteng Region */}
                <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="rental-duration"
                      className="block text-xs font-semibold tracking-wider text-[#0D1526] uppercase"
                    >
                      2. Hire Duration
                    </label>
                    <select
                      id="rental-duration"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value as RentalDuration)}
                      className="mt-1.5 h-10 w-full rounded-lg border border-[#012C6D]/20 bg-white px-3 text-sm font-medium text-[#0D1526]"
                    >
                      <option value="day">Single Day Event</option>
                      <option value="weekend">Full Weekend (Fri–Mon)</option>
                      <option value="corporate">Corporate / 3-Day Expo</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="rental-region"
                      className="block text-xs font-semibold tracking-wider text-[#0D1526] uppercase"
                    >
                      3. Gauteng Delivery Zone
                    </label>
                    <select
                      id="rental-region"
                      value={region}
                      onChange={(e) => setRegion(e.target.value as GautengRegion)}
                      className="mt-1.5 h-10 w-full rounded-lg border border-[#012C6D]/20 bg-white px-3 text-sm font-medium text-[#0D1526]"
                    >
                      <option value="pretoria">Pretoria / Derdepoort (R180)</option>
                      <option value="centurion">Centurion (R240)</option>
                      <option value="midrand">Midrand (R320)</option>
                      <option value="johannesburg">Johannesburg Metro (R420)</option>
                    </select>
                  </div>
                </div>

                {/* Extras & Attendant */}
                <div className="mt-4 flex flex-wrap items-center justify-between gap-4 rounded-xl bg-[#EEF3F9] px-4 py-3">
                  <div className="flex items-center gap-3">
                    <label htmlFor="extra-mix-packs" className="text-xs font-semibold text-[#0D1526]">
                      Extra 50-Serving Refill Packs (+R165 ea):
                    </label>
                    <select
                      id="extra-mix-packs"
                      value={extraMixPacks}
                      onChange={(e) => setExtraMixPacks(Number(e.target.value))}
                      className="h-8 rounded-md border border-[#012C6D]/20 bg-white px-2 font-mono text-xs font-semibold"
                    >
                      {[0, 1, 2, 3, 4, 5].map((n) => (
                        <option key={n} value={n}>
                          {n}
                        </option>
                      ))}
                    </select>
                  </div>

                  <label className="inline-flex cursor-pointer items-center gap-2 text-xs font-semibold text-[#0D1526]">
                    <input
                      type="checkbox"
                      checked={includeAttendant}
                      onChange={(e) => setIncludeAttendant(e.target.checked)}
                      className="h-4 w-4 accent-[#012C6D]"
                    />
                    <span>Dedicated Operator (+R750)</span>
                  </label>
                </div>

                {/* Contact Fields */}
                <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="rental-name" className="block text-xs font-semibold text-[#0D1526]">
                      Organiser Name
                    </label>
                    <input
                      id="rental-name"
                      type="text"
                      value={form.contactName}
                      onChange={(e) => setForm({ ...form, contactName: e.target.value })}
                      placeholder="e.g. Thabo Mokoena"
                      className="mt-1 h-10 w-full rounded-lg border border-[#012C6D]/20 px-3 text-sm focus:border-[#012C6D] focus:outline-none"
                    />
                    {errors.contactName && (
                      <p className="mt-1 text-xs font-medium text-[#E10B49]">{errors.contactName}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="rental-phone" className="block text-xs font-semibold text-[#0D1526]">
                      WhatsApp / Mobile Number
                    </label>
                    <input
                      id="rental-phone"
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="e.g. 071 000 0000"
                      className="mt-1 h-10 w-full rounded-lg border border-[#012C6D]/20 px-3 text-sm focus:border-[#012C6D] focus:outline-none"
                    />
                    {errors.phone && (
                      <p className="mt-1 text-xs font-medium text-[#E10B49]">{errors.phone}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="rental-date" className="block text-xs font-semibold text-[#0D1526]">
                      Event Date
                    </label>
                    <input
                      id="rental-date"
                      type="date"
                      value={form.eventDate}
                      onChange={(e) => setForm({ ...form, eventDate: e.target.value })}
                      className="mt-1 h-10 w-full rounded-lg border border-[#012C6D]/20 px-3 text-sm focus:border-[#012C6D] focus:outline-none"
                    />
                    {errors.eventDate && (
                      <p className="mt-1 text-xs font-medium text-[#E10B49]">{errors.eventDate}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="rental-venue" className="block text-xs font-semibold text-[#0D1526]">
                      Venue / Suburb
                    </label>
                    <input
                      id="rental-venue"
                      type="text"
                      value={form.venueAddress}
                      onChange={(e) => setForm({ ...form, venueAddress: e.target.value })}
                      placeholder="e.g. Waterkloof, Pretoria"
                      className="mt-1 h-10 w-full rounded-lg border border-[#012C6D]/20 px-3 text-sm focus:border-[#012C6D] focus:outline-none"
                    />
                    {errors.venueAddress && (
                      <p className="mt-1 text-xs font-medium text-[#E10B49]">{errors.venueAddress}</p>
                    )}
                  </div>
                </div>

                {/* Live Quote Summary Footer */}
                <div className="mt-6 flex flex-col justify-between gap-4 border-t border-[#012C6D]/10 pt-5 sm:flex-row sm:items-center">
                  <div className="text-xs text-[#4B5565]">
                    <div>
                      Machine: <strong className="font-mono text-[#0D1526] tabular-nums">{formatZAR(quote.baseRateZar)}</strong>
                      {' · '}Delivery:{' '}
                      <strong className="font-mono text-[#0D1526] tabular-nums">{formatZAR(quote.deliveryFeeZar)}</strong>
                      {' · '}Extras: <strong>{formatZAR(quote.extrasZar)}</strong>
                      {' · '}Attendant: <strong>{formatZAR(quote.attendantFeeZar)}</strong>
                    </div>
                    <div className="mt-0.5">
                      Sample refundable deposit: {formatZAR(quote.refundableDepositZar)} (separate from estimate). Total including deposit: {formatZAR(quote.totalEstimateZar + quote.refundableDepositZar)}.
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="inline-flex min-h-[44px] shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-[#E10B49] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#C6083F]"
                  >
                    <CalendarCheck2 className="h-4 w-4" aria-hidden="true" />
                    <span>Preview Rental Quote</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
