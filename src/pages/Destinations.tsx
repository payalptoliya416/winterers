import Hero from '../components/Hero';
import SearchBar from '../components/SearchBar';
import Button from '../components/Button';
import Section from '../components/Section';
import Feature from '../components/Feature';
import ImgBg from '../components/ImgBg';
import { FeaturedStays, Destinations, Experiences, Deals } from '../components/Blocks';

export default function DestinationsPage() {
  return (
    <>
      <div className="pb-28 md:pb-24">
        <Hero
          search={<SearchBar />}
          name="destination-bg.png"
          eyebrow="EXPLORE WINTER DESTINATIONS"
          title={
            <>
              Find Your <span className="text-[#7EC8E3]">Perfect Winter</span> <br />
              Destination
            </>
          }
          text="From snow-covered alpine villages to remote Arctic landscapes, discover destinations made for unforgettable winter escapes."
        >
          <Button variant="light" to="/destinations" pill>Explore Destinations</Button>
          <Button variant="ghost" to="/stays" pill>View Winter Stays</Button>
        </Hero>
      </div>

      <Destinations />
      <FeaturedStays />

      {/* Northern Norway Feature Banner */}
      <section className="relative overflow-hidden bg-navy text-white">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center md:bg-right"
          style={{ backgroundImage: `url('/images/destination-norway.png')` }}
        />

        {/* Content Container */}
        <div className="relative z-10 mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-[111px]">
          <div className="max-w-[500px]">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white tracking-tight leading-tight">
              Northern Norway
            </h2>
            <p className="mt-1.5 text-sm sm:text-base font-normal text-sky">
              Chase the Northern Lights
            </p>
            <p className="mt-4 text-xs sm:text-sm md:text-[15px] leading-relaxed text-white/80">
              Experience dramatic Arctic landscapes, cosy winter stays and some of the world's best Northern Lights experiences.
            </p>

            {/* Feature Bullets */}
            <div className="mt-6 grid grid-cols-2 gap-x-6 sm:gap-x-8 gap-y-3.5 max-w-md">
              {[
                'Northern Lights',
                'Arctic Adventures',
                'Mountain Escapes',
                'Coastal Landscapes',
              ].map((item) => (
                <div key={item} className="flex items-center gap-2.5 text-xs sm:text-sm text-white/90">
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
                </div>
              ))}
            </div>

            {/* Action Button */}
            <div className="mt-8">
              <Button
                variant="sky"
                pill
                to="/stays"
                className="px-6 py-2.5 sm:px-7 sm:py-3 text-xs sm:text-sm font-semibold text-navy hover:brightness-105 active:scale-95 shadow-sm"
              >
                Explore Northern Norway
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Experiences />
      <Deals />

      {/* The Winterers Edit - Half-bleed section */}
      <section className="relative overflow-hidden bg-[#F2F6FA] w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Left image bleeds outside container to screen left edge */}
          <div className="relative min-h-[380px] sm:min-h-[460px] lg:min-h-[520px] w-full">
            <img
              src="/images/edit.jpg"
              alt="The Winterers Edit"
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
          </div>

          {/* Right side aligned to container */}
          <div className="flex flex-col justify-center py-12 px-6 sm:px-12 lg:py-16 lg:pl-[50px] xl:pr-[max(1.5rem,calc((100vw-1440px)/2+1.5rem))]">
            <div className="max-w-xl">
              <p className="text-xs sm:text-[13px] font-semibold uppercase tracking-wider text-sky">
                THE WINTERERS EDIT
              </p>

              <h2 className="mt-3 font-head text-2xl sm:text-3xl md:text-[34px] font-semibold text-navy leading-tight tracking-tight">
                A Different Way to Experience Winter
              </h2>

              {/* Sky blue horizontal accent divider */}
              <div className="mt-3.5 mb-5 h-[3px] w-12 rounded-full bg-sky" />

              <div className="space-y-3 text-xs sm:text-sm md:text-[15px] leading-relaxed text-navy/75">
                <p className="font-medium text-navy/90">
                  Skip the ordinary winter holiday.
                </p>
                <p>
                  Discover remote cabins, mountain villages, Arctic adventures and destinations where the journey is just as memorable as the stay.
                </p>
              </div>

              <div className="mt-8">
                <Button
                  to="/stays"
                  pill
                  className="bg-navy hover:bg-[#071D36] px-8 py-3 text-xs sm:text-sm font-semibold text-white transition shadow-sm rounded-[18px]"
                >
                  Discover Winter Stays
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="h-12" />
    </>
  );
}
