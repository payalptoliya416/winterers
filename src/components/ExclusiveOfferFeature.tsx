import { Link } from 'react-router-dom';
import { MapPin, Moon, Users } from 'lucide-react';
import Container from './Container';

export default function ExclusiveOfferFeature() {
  return (
    <section className="py-12 md:py-16 bg-white">
      <Container>
        <div className="overflow-hidden rounded-[28px] bg-[#EEF4FA] grid grid-cols-1 lg:grid-cols-2">
          {/* Left Column: Image with baked-in Featured Winter Deal badge */}
          <div className="relative min-h-[340px] sm:min-h-[420px] lg:min-h-[480px] w-full">
            <img
              src="/images/offer.png"
              alt="Stay More, Save More - Featured Winter Deal"
              className="h-full w-full object-cover"
            />
          </div>

          {/* Right Column: Offer Details */}
          <div className="flex flex-col justify-center p-8 sm:p-10 md:p-12 lg:p-[50px]">
            <p className="text-xs sm:text-[13px] font-semibold uppercase tracking-[0.16em] text-[#5CBDE5]">
              EXCLUSIVE OFFER
            </p>

            <h2 className="mt-2.5 font-head text-2xl sm:text-3xl lg:text-[36px] font-semibold text-navy tracking-tight leading-tight">
              Stay More, Save More
            </h2>

            <p className="mt-4 text-xs sm:text-base leading-relaxed text-[#6B7FA3] font-body">
              Enjoy an unforgettable winter escape with selected stays offering exclusive seasonal rates.
            </p>

            {/* Meta Info: Location, Nights, Guests */}
            <div className="mt-[30px] flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-[13px] font-medium text-[#6B7FA3]">
              <span className="flex items-center gap-[5px]">
                <MapPin className="h-4 w-4 text-[#6B7FA3] shrink-0" />
                Zermatt, Switzerland
              </span>
              <span className="flex items-center gap-[5px]">
                <Moon className="h-4 w-4 text-[#6B7FA3] shrink-0" />
                2 nights
              </span>
              <span className="flex items-center gap-[5px]">
                <Users className="h-4 w-4 text-[#6B7FA3] shrink-0" />
                2 guests
              </span>
            </div>

            {/* Price Box */}
            <div className="mt-6 rounded-[12px] bg-white p-5 max-w-[362px]">
              <p className="text-sm font-medium text-[#6B8299]">
                Was <span className="line-through">€620</span>
              </p>
              <div className="mt-[10px] flex items-center gap-4">
                <span className="font-head text-3xl sm:text-[34px] font-bold text-[#1A3A5C]">
                  €449
                </span>
                <span className="rounded-[8px] bg-[#1A7F6E] px-3 py-2 text-sm font-bold text-white tracking-wide">
                  SAVE 28%
                </span>
              </div>
            </div>

            {/* CTA Button */}
            <div className="mt-10">
              <Link
                to="/stays"
                className="inline-flex items-center justify-center rounded-[18px] bg-[#02213B] hover:bg-[#041a2e] px-[30px] py-3 text-xs sm:text-base font-medium text-white transition-all active:scale-95"
              >
                View This Deal
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
