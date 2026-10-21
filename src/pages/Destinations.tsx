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
        <Button variant="light" size="lg" to="/stays">
          View Winter Stays
        </Button>
      </Hero>

      <Destinations tone="light" center showAction={false} className="!pb-0 md:!pb-0" />
      <FeaturedStays />

      {/* Northern Norway Feature Banner */}
      <section className="relative overflow-hidden bg-navy text-white">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center md:bg-right"
          style={{ backgroundImage: `url('/images/destination-norway.png')` }}
        />

        {/* Content Container */}
        <div className="relative z-10 site-container py-16 sm:py-20 md:py-[111px]">
          <div className="max-w-[500px]">
            <h2 className="section-title !text-white">
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
                  <img
                    src="/images/checkmark.svg"
                    alt=""
                    aria-hidden="true"
                    className="w-[18px] h-[18px] shrink-0"
                  />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {/* Action Button */}
            <div className="mt-8">
              <Button
                variant="sky"
                to="/stays"
                className="px-6 py-2.5 sm:px-7 sm:py-3 text-xs sm:text-sm font-medium text-[#02213B] hover:brightness-105 active:scale-95 shadow-sm"
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
        <div className="grid grid-cols-1 lg:grid-cols-[58%_42%] xl:grid-cols-[880px_1fr] min-h-[538px] items-stretch">
          {/* Left image bleeds outside container to screen left edge with 880px on desktop */}
          <div className="relative w-full min-h-[360px] sm:min-h-[440px] lg:min-h-[538px] lg:h-full">
            <img
              src="/images/edit.jpg"
              alt="The Winterers Edit"
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
          </div>

          {/* Right side aligned */}
          <div className="flex flex-col justify-center py-12 px-6 sm:px-10 lg:py-16 lg:pl-12 xl:pl-14 xl:pr-10">
            <div className="w-full max-w-[640px]">
              <p className="section-eyebrow">
                THE WINTERERS EDIT
              </p>

              <h2 className="mt-[15px] font-head text-2xl sm:text-3xl lg:text-[30px] xl:text-[32px] font-medium text-[#0D1F35] tracking-tight leading-tight lg:whitespace-nowrap">
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
                  className="bg-navy hover:bg-[#071D36] px-8 py-3 text-xs sm:text-sm font-semibold text-white transition shadow-sm rounded-[18px]"
                >
                  Discover Winter Stays
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
