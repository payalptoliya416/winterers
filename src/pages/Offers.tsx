import { Link } from 'react-router-dom';
import { BadgePercent, Clock, Sparkles } from 'lucide-react';
import Hero from '../components/Hero';
import SearchBar from '../components/SearchBar';
import Button from '../components/Button';
import Container from '../components/Container';
import { FeaturedStays, Deals } from '../components/Blocks';
import ExclusiveOfferFeature from '../components/ExclusiveOfferFeature';

const perks = [
  {
    icon: BadgePercent,
    title: 'Member-Only Prices',
    text: 'Access selected rates unavailable to everyone.',
  },
  {
    icon: Clock,
    title: 'Early Access',
    text: 'See seasonal offers before they become widely available.',
  },
  {
    icon: Sparkles,
    title: 'Special Winter Perks',
    text: 'Enjoy selected benefits with participating stays.',
  },
];

export default function Offers() {
  return (
    <>
      <Hero
        search={<SearchBar />}
        name="hero-offers.png"
        eyebrow="WINTER OFFERS"
        title={
          <>
            Winter Escapes, <br />
            <span className="text-[#7EC8E3]">Better Prices</span>
          </>
        }
        text="Discover exclusive winter stays, seasonal savings and limited-time offers curated for your next snowy escape."
      />

      <FeaturedStays
        center
        showAction={false}
        eyebrow="48 WINTER STAYS AVAILABLE · LAPLAND & SCANDINAVIA"
        title="Winter stays for your next escape"
        sub=""
      />
      <Deals center showAction={false} />

      <ExclusiveOfferFeature />

      {/* For Members Section */}
      <section className="bg-[#EEF4FA] py-14 sm:py-16 md:py-[110px]">
        <Container>
          <div className="text-center">
            <p className="section-eyebrow">
              FOR MEMBERS
            </p>
            <h2 className="section-title">
              Unlock Exclusive Winter Savings
            </h2>
            <p className="mt-[25px] text-sm sm:text-base text-[#98A1AC] font-body">
              Sign in to access selected member rates and early winter offers.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-[30px]">
            {perks.map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="rounded-[24px] sm:rounded-[28px] bg-white p-8 sm:p-10 text-center border border-[#DDE8F0] flex flex-col items-center justify-center transition-all duration-300 hover:shadow-md"
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-[18px] bg-[#E8F1F8] text-[#1A3A5C]">
                  <Icon className="h-6 w-6 text-[#1A3A5C]" strokeWidth={1.8} />
                </div>
                <h3 className="!font-body text-lg sm:text-2xl font-semibold text-[#0A1628]">
                  {title}
                </h3>
                <p className="mt-[15px] text-sm sm:text-base leading-relaxed text-[#6B8299] font-body">
                  {text}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 sm:mt-12 text-center">
            <Link
              to="/stays"
              className="section-head-btn inline-flex items-center justify-center rounded-[18px] bg-[#02213B] px-[30px] py-3 text-sm sm:text-base font-semibold text-white shadow-sm"
            >
              <span className="relative z-10">Sign In & Explore</span>
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
