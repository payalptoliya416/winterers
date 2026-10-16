import { Link } from 'react-router-dom';

export default function HostBanner() {
  return (
    <section className="relative overflow-hidden bg-navy text-white">
      {/* Background Chalet Image */}
      <div
        className="absolute inset-0 bg-cover bg-right md:bg-center"
        style={{ backgroundImage: `url('/images/l-host.png')` }}
      />

      {/* Content Container */}
      <div className="relative z-10 site-container py-16 sm:py-20 md:py-[110px]">
        <div className="max-w-xl">
          <h2 className="font-head text-2xl sm:text-3xl md:text-4xl font-semibold text-white tracking-tight leading-tight">
            Own a Property Made for Winter?
          </h2>

          <p className="mt-5 text-xs sm:text-sm md:text-base leading-relaxed text-wh[#F0F4F8] font-body">
            List your cabin, chalet, lodge or unique winter stay and connect with travellers searching for their next cold-weather escape.
          </p>

          {/* 3 Checkmark Bullet Points */}
          <ul className="mt-[35px] space-y-3 font-body">
            {[
              'Reach winter-focused travellers',
              'Simple listing process',
              'More direct booking opportunities',
            ].map((item) => (
              <li key={item} className="flex items-center gap-3 text-sm sm:text-base text-[#F0F4F8]">
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
          <div className="mt-10 flex flex-wrap items-center gap-3.5">
            <Link
              to="/list-property"
              className="inline-flex items-center justify-center rounded-[18px] bg-[#7EC8E3] px-6 py-2.5 sm:px-7 sm:py-3 text-sm sm:text-base font-medium text-[#02213B] transition-all duration-200 hover:brightness-105 active:scale-95"
            >
              List Your Property
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
