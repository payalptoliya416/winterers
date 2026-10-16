import { Link } from 'react-router-dom';
import { Calendar, MapPin, Clock, TrendingUp, Star } from 'lucide-react';
import Container from './Container';

const specs = [
  {
    icon: Calendar,
    label: 'Best Season',
    value: 'November – March',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Norway, Finland, Iceland',
  },
  {
    icon: Clock,
    label: 'Duration',
    value: '3 – 10 days',
  },
  {
    icon: TrendingUp,
    label: 'Experience Level',
    value: 'All levels welcome',
  },
];

export default function NorthernLightsFeature() {
  return (
    <section className="bg-[#062038] py-12 md:py-16 lg:py-20 text-white">
      <Container>
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-2 lg:gap-[41px]">
          {/* Left Column: Image with floating rating badge */}
          <div className="relative w-full rounded-[21px] overflow-hidden">
            <img
              src="/images/feature-exp.png"
              alt="Chase the Northern Lights"
              className="w-full h-full object-cover"
            />

            {/* Floating Rating Badge */}
            <div className="absolute bottom-5 left-5 sm:bottom-6 sm:left-6 flex items-center gap-[10px] rounded-[13px] bg-white px-[18px] py-[14px] z-10">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[8px] bg-[#E8F0FA]">
                <Star className="h-4 w-4 text-[#0A1628]" strokeWidth={1.8} />
              </div>
              <div>
                <p className="text-xs font-medium text-[#6B7FA3] leading-none">Rated</p>
                <p className="mt-[5px] text-xs sm:text-sm font-bold text-[#0A1628] leading-none whitespace-nowrap">
                  4.9 / 5.0 — 2,400+ Guests
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Information & Specs */}
          <div className="flex flex-col justify-center">
            <p className="text-sm sm:text-base font-semibold uppercase tracking-[0.18em] text-[#5CBDE5]">
              FEATURED EXPERIENCE
            </p>

            <h2 className="mt-[15px] font-head text-3xl sm:text-4xl lg:text-[36px] font-semibold text-white tracking-tight leading-tight">
              Chase the Northern Lights
            </h2>

            <p className="mt-5 text-sm sm:text-base !leading-[28px] text-[#F0F4F8] font-body">
              Few sights on earth compare to the aurora borealis dancing across the Arctic sky. Our northern lights experiences take you deep into remote wilderness, away from light pollution and surrounded by snow-blanketed forests, for the clearest views imaginable.
            </p>

            {/* 4 Specification Cards */}
            <div className="mt-[25px] grid grid-cols-1 sm:grid-cols-2 gap-5">
              {specs.map(({ icon: Icon, label, value }) => (
                <div
                  key={label}
                  className="flex items-center gap-[10px] rounded-[13px] border border-[#FFFFFF26] bg-[#FFFFFF0A] p-5 backdrop-blur-sm"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[8px] bg-[#E8F0FA33] text-white">
                    <Icon className="h-5 w-5" strokeWidth={1.8} />
                  </div>
                  <div>
                    <span className="block text-sm font-medium text-[#F0F4F8] leading-none">
                      {label}
                    </span>
                    <span className="mt-1.5 block text-xs sm:text-sm font-semibold text-white leading-tight">
                      {value}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="mt-[60px] flex flex-wrap items-center gap-3.5 sm:gap-4">
              <Link
                to="/stays"
                className="inline-flex items-center justify-center rounded-[18px] bg-white px-[30px] py-3 text-sm 
                sm:text-base font-semibold text-[#02213B] hover:bg-white transition-all duration-200 shadow-md"
              >
                Explore Northern Lights
              </Link>
              <Link
                to="/experiences"
                className="inline-flex items-center justify-center rounded-[18px] border border-[#7EC8E3] bg-transparent px-[30px] py-3 text-sm sm:text-base font-medium text-[#7EC8E3] hover:bg-white/10 transition-all duration-200"
              >
                View all aurora experiences
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
