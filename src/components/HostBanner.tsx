import { Link } from 'react-router-dom';

export default function HostBanner() {
  return (
    <section className="relative overflow-hidden bg-navy text-white">
      {/* Background Chalet Image */}
      <div
        className="absolute inset-0 bg-cover bg-right md:bg-center"
        style={{ backgroundImage: `url('/images/l-host.png')` }}
      />

      {/* Dark gradient overlay on the left for crisp text contrast */}
      <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/95 md:via-navy/85 to-navy/50 md:to-transparent" />

      {/* Content Container */}
      <div className="relative z-10 mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-24">
        <div className="max-w-xl">
          <h2 className="font-head text-2xl sm:text-3xl md:text-4xl font-semibold text-white tracking-tight leading-tight">
            Own a Property Made for Winter?
          </h2>

          <p className="mt-3 text-xs sm:text-sm md:text-[15px] leading-relaxed text-white/80 font-body">
            List your cabin, chalet, lodge or unique winter stay and connect with travellers searching for their next cold-weather escape.
          </p>

          {/* 3 Checkmark Bullet Points */}
          <ul className="mt-6 space-y-3 font-body">
            {[
              'Reach winter-focused travellers',
              'Simple listing process',
              'More direct booking opportunities',
            ].map((item) => (
              <li key={item} className="flex items-center gap-3 text-xs sm:text-sm text-white/90">
                <svg
                  className="h-4 w-4 shrink-0 text-sky"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <circle cx="12" cy="12" r="9" />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.5 12.5l2.5 2.5 4.5-5"
                  />
                </svg>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-wrap items-center gap-3.5">
            <Link
              to="/list-property"
              className="inline-flex items-center justify-center rounded-full bg-sky px-6 py-2.5 sm:px-7 sm:py-3 text-xs sm:text-sm font-semibold text-navy transition-all duration-200 hover:brightness-105 active:scale-95 shadow-sm"
            >
              List Your Property
            </Link>
            <Link
              to="/list-property"
              className="inline-flex items-center justify-center rounded-full border border-white/40 bg-white/5 px-6 py-2.5 sm:px-7 sm:py-3 text-xs sm:text-sm font-medium text-white backdrop-blur-sm transition-all duration-200 hover:border-white/80 hover:bg-white/15 active:scale-95"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
