import { Link } from 'react-router-dom';

export default function LaplandFeature() {
  return (
    <section className="py-12 md:py-16">
      <div className="site-container">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-10 bg-[#F9F9F9] rounded-[24px] overflow-hidden">
          {/* Left Column: Image with Aurora and Cabin */}
          <div className="relative w-full overflow-hidden">
            <img
              src="/images/lapland.png"
              alt="Lapland After Dark"
              className="h-full w-full"
            />
          </div>

          {/* Right Column: Details & Specs */}
          <div className="flex flex-col justify-center">
            <p className="font-head text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-sky">
              Winter Wonderland
            </p>

            <h2 className="mt-2 font-head text-3xl sm:text-4xl lg:text-[40px] font-semibold text-navy tracking-tight leading-tight">
              Lapland After Dark
            </h2>

            <p className="mt-3 max-w-lg text-xs sm:text-sm leading-relaxed text-navy/60 font-body">
              Experience a world where snow-covered forests stretch endlessly beneath the Northern Lights.
            </p>

            {/* Spec 1: Best Time */}
            <div className="mt-6 border-t border-navy/10 pt-4 sm:pt-5">
              <span className="block font-head text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.14em] text-navy/40">
                Best Time
              </span>
              <span className="mt-1 block font-head text-xs sm:text-sm font-bold uppercase tracking-wider text-navy">
                November — March
              </span>
            </div>

            {/* Spec 2: Experience */}
            <div className="mt-4 sm:mt-5 border-t border-navy/10 pt-4 sm:pt-5">
              <span className="block font-head text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.14em] text-navy/40">
                Experience
              </span>
              <span className="mt-1 block font-head text-xs sm:text-sm font-bold uppercase tracking-wider text-sky">
                Aurora • Husky Safaris • Snowmobiling
              </span>
            </div>

            {/* Spec 3: Perfect For */}
            <div className="mt-4 sm:mt-5 border-t border-navy/10 pt-4 sm:pt-5">
              <span className="block font-head text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.14em] text-navy/40">
                Perfect For
              </span>
              <span className="mt-1 block font-head text-xs sm:text-sm font-bold uppercase tracking-wider text-navy">
                Couples • Families • Adventurers
              </span>
            </div>

            {/* Explore Button */}
            <div className="mt-8">
              <Link
                to="/experiences"
                className="inline-flex items-center justify-center rounded-full bg-navy px-8 py-3 text-xs sm:text-sm font-medium text-white transition-all duration-200 hover:bg-navy/90 hover:shadow-md active:scale-95"
              >
                Explore Lapland
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
