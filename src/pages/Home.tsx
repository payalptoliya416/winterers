import Hero from '../components/Hero';
import SearchBar from '../components/SearchBar';
import Section from '../components/Section';
import SectionHead from '../components/SectionHead';
import Feature from '../components/Feature';
import Button from '../components/Button';
import ImgTile from '../components/ImgTile';
import StayTypesGrid from '../components/StayTypesGrid';
import { FeaturedStays, Destinations, Experiences, Deals } from '../components/Blocks';
import HostBanner from '../components/HostBanner';
import LaplandFeature from '../components/LaplandFeature';
import { Snowflake, Gem, ShieldCheck, MountainSnow, Lock, Headphones } from 'lucide-react';

const why = [
  { icon: Snowflake,    title: 'Winter Experts',            text: 'We focus on unforgettable winter experiences.' },
  { icon: Gem,          title: 'Unique Stays',              text: 'Discover places you will not find everywhere.' },
  { icon: ShieldCheck,  title: 'Trusted Properties',        text: 'Every stay is carefully selected.' },
  { icon: MountainSnow, title: 'Better Winter Experiences', text: 'Find properties close to the experiences you came for.' },
  { icon: Lock,         title: 'Secure Booking',            text: 'Book your stay with confidence.' },
  { icon: Headphones,   title: 'Dedicated Support',         text: 'Support whenever you need it.' },
];

export default function Home() {
  return (
    <>
      <div className="pb-28 md:pb-24">
        <Hero
          tall
          search={<SearchBar />}
          name="hero-cabin.png"
          eyebrow="EXPLORE WINTER DESTINATIONS"
          title={
            <>
              Find Your Perfect <br/> <span className="text-sky">Winter Escape</span>
            </>
          }
          text="From snow-covered alpine villages to remote Arctic landscapes, discover destinations made for unforgettable winter escapes."
        >
        </Hero>
      </div>

      <Section>
        <SectionHead
          eyebrow="Discover your stay"
          title="Find Your Perfect Kind of Stay"
          sub="From coastal escapes to secluded mountain hideaways, discover a stay that fits your way of travelling."
          action="Explore All Stays"
          to="/stays"
        />
        <StayTypesGrid />
      </Section>

      <FeaturedStays />
      <Destinations />
      <Experiences />

      <LaplandFeature />

      <Deals />

      <Section>
        <SectionHead
          center
          eyebrow="Why Winterers"
          title="Made for People Who Prefer Winter"
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {why.map(({ icon: Icon, title, text }) => (
            <div key={title} className="rounded-2xl border border-navy/10 bg-[#F8FAFB] p-6 hover:border-navy/20 hover:shadow-sm transition">
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white shadow-sm border border-navy/8">
                <Icon className="h-5 w-5 text-navy/70" strokeWidth={1.6} />
              </div>
              <h3 className="text-[15px] font-semibold text-navy">{title}</h3>
              <p className="mt-1.5 text-[13px] leading-relaxed text-navy/50">{text}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Host CTA Banner above Footer */}
      <HostBanner />
      <div className="h-8 sm:h-12 bg-white" />
    </>
  );
}
