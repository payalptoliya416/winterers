import { Link } from 'react-router-dom';
import { Eye, Compass, Users, Snowflake } from 'lucide-react';
import Container from './Container';

const highlights = [
  { icon: Eye, label: 'Aurora Viewing' },
  { icon: Compass, label: 'Remote Wilderness' },
  { icon: Users, label: 'Local Experiences' },
  { icon: Snowflake, label: 'Snow Activities' },
];

export default function ExperienceSpotlight() {
  return (
    <section className="py-12 md:py-16 bg-white">
      <Container>
        <div className="overflow-hidden rounded-[28px] bg-[#EEF4FA] grid grid-cols-1 md:grid-cols-2">
          {/* Left Column: Image */}
          <div className="relative w-full">
            <img
              src="/images/expirience.png"
              alt="Life Under the Northern Lights"
              className="h-full w-full object-cover"
            />
          </div>

          {/* Right Column: Content */}
          <div className="flex flex-col justify-center p-8 sm:p-10 md:p-12 lg:p-[50px]">
            <p className="section-eyebrow">
              EXPERIENCE SPOTLIGHT
            </p>

            <h2 className="section-title">
              Life Under the Northern Lights
            </h2>

              <p className="mt-4 text-xs sm:text-base leading-relaxed text-[#6B7FA3] font-body">
              Drift into the remote wilderness of Finnish Lapland, where the sky comes alive with ribbons of emerald and violet light. Sleep in glass- roofed cabins, explore the silent forest on snowshoes, and let the aurora watch over you through the night.
            </p>

            {/* 4 Highlights */}
            <div className="mt-[30px] grid grid-cols-1 sm:grid-cols-2 gap-y-[15px] gap-x-6">
              {highlights.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-[10px]">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[8px] bg-white text-[#0A1628]">
                    <Icon className="h-4 w-4 text-[#0A1628]" strokeWidth={1.75} />
                  </div>
                  <span className="text-xs sm:text-sm font-medium text-[#0A1628]">
                    {label}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="mt-[60px]">
              <Link
                to="/stays"
                className="inline-flex items-center justify-center rounded-[18px] bg-[#062541] hover:bg-[#041a2e]
                px-[30px] py-4 text-xs sm:text-base font-medium text-white transition-all active:scale-95"
              >
                Discover the Experience
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
