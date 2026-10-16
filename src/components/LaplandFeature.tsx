import { Link } from 'react-router-dom';

export default function LaplandFeature() {
  return (
    <section className="relative overflow-hidden bg-[#F9F9F9]">
      <div className="grid grid-cols-1 lg:grid-cols-2 items-stretch min-h-[540px] sm:min-h-[580px] lg:min-h-[640px]">
        {/* Left Column: Full-bleed image touching the left edge of the screen */}
        <div className="relative w-full min-h-[360px] sm:min-h-[440px] lg:min-h-full">
          <img
            src="/images/lapland.png"
            alt="Lapland After Dark"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
        </div>

        {/* Right Column: Content aligned inside container on the right */}
        <div className="flex flex-col justify-center py-12 sm:py-16 lg:py-20 px-6 sm:px-10 lg:pl-14 xl:pl-10 xl:pr-[max(1.5rem,calc((100vw-var(--container-max-w))/2+1.5rem))] bg-[#F9F9F9]">
          <div className="w-full max-w-[500px]">
            <p className="section-eyebrow">
              WINTER WONDERLAND
            </p>

            <h2 className="section-title">
              Lapland After Dark
            </h2>

            <p className="mt-[15px] text-xs sm:text-sm md:text-base leading-relaxed text-[#98A1AC] font-body">
              Experience a world where snow-covered forests stretch endlessly beneath the Northern Lights.
            </p>

            {/* Spec 1: Best Time */}
            <div className="mt-7 sm:mt-[60px] border-t border-slate-200/80 pt-4 sm:pt-[30px]">
              <span className="block font-head text-xs font-medium uppercase tracking-[0.14em] text-[#98A1AC]">
                BEST TIME
              </span>
              <span className="mt-[9px] block font-head text-xs font-bold uppercase tracking-wider text-[#0D1F35]">
                NOVEMBER — MARCH
              </span>
            </div>

            {/* Spec 2: Experience */}
            <div className="mt-4 sm:mt-[32px] border-t border-[#0D1F3540] pt-4 sm:pt-5">
              <span className="block font-head text-xs font-medium uppercase tracking-[0.14em] text-[#98A1AC]">
                EXPERIENCE
              </span>
              <span className="mt-1 block font-head text-xs sm:text-sm font-bold uppercase tracking-wider text-[#7EC8E3]">
                AURORA • HUSKY SAFARIS • SNOWMOBILING
              </span>
            </div>

            {/* Spec 3: Perfect For */}
            <div className="mt-4 sm:mt-5 border-t border-[#0D1F3540] pt-4 sm:pt-5">
              <span className="block font-head text-xs font-medium uppercase tracking-[0.14em] text-[#98A1AC]">
                PERFECT FOR
              </span>
              <span className="mt-1 block font-head text-xs sm:text-sm font-bold uppercase tracking-wider text-[#0D1F35]">
                COUPLES • FAMILIES • ADVENTURERS
              </span>
            </div>

            {/* Explore Button */}
            <div className="mt-8 sm:mt-[64px]">
              <Link
                to="/experiences"
                className="inline-flex items-center justify-center rounded-[18px] bg-[#071D36] hover:bg-[#051527] px-8 py-3.5 text-xs sm:text-sm font-medium text-white transition-all duration-200 hover:shadow-md active:scale-95"
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
