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
      <div className="pb-28 md:pb-24">
        <Hero
          tall
          search={<SearchBar />}
          name="hero-offers.png"
          eyebrow="Winter offers"
          title="Winter Escapes,"
          accent="Better Prices"
          text="Discover exclusive winter stays, seasonal savings and limited-time offers curated for your next snowy escape."
        >
          <Button variant="light">Explore Winter Deals</Button>
          <Button variant="ghost" to="/stays">Browse Winter Stays</Button>
        </Hero>
      </div>

      <FeaturedStays />
      <Deals action="View All Winter Offers" />

      <ExclusiveOfferFeature />

      {/* For Members Section */}
      <section className="bg-[#EEF4FA] py-14 sm:py-16 md:py-[110px]">
        <Container>
          <div className="text-center">
            <p className="text-xs sm:text-[13px] font-semibold uppercase tracking-[0.16em] text-[#5CBDE5]">
              FOR MEMBERS
            </p>
            <h2 className="mt-2.5 font-head text-3xl sm:text-4xl font-semibold text-navy tracking-tight">
              Unlock Exclusive Winter Savings
            </h2>
            <p className="mt-3 text-xs sm:text-sm text-navy/50 font-body max-w-xl mx-auto">
              Sign in to access selected member rates and early winter offers.
            </p>
          </div>

          <div className="mt-10 md:mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-[30px]">
            {perks.map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="rounded-[24px] sm:rounded-[28px] bg-white p-8 sm:p-10 text-center border border-[#DDE8F0] flex flex-col items-center justify-center transition-all duration-300 hover:shadow-md"
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-[18px] bg-[#E8F1F8] text-[#1A3A5C]">
                  <Icon className="h-6 w-6 text-[#1A3A5C]" strokeWidth={1.8} />
                </div>
                <h3 className="font-head text-lg sm:text-2xl font-semibold text-[#0A1628]">
                  {title}
                </h3>
                <p className="mt-[15px] text-xs sm:text-lg leading-relaxed text-[#6B8299] font-body">
                  {text}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 sm:mt-12 text-center">
            <Link
              to="/stays"
              className="inline-flex items-center justify-center rounded-[18px] bg-[#02213B] hover:bg-[#041a2e] px-[30px] py-3 text-sm sm:text-base font-semibold text-white transition-all active:scale-95"
            >
              Sign In & Explore
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
