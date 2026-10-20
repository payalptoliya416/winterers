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
      <Hero
        search={<SearchBar />}
        name="hero-cabin.png"
        eyebrow="THE WINTER TRAVEL PLATFORM"
        title={
          <>
            Find Your Perfect <br />
            <span className="text-[#7EC8E3]">Winter Escape</span>
          </>
        }
        text="Discover handpicked winter stays, from cosy mountain cabins and ski chalets to unforgettable escapes surrounded by snow."
      />

      <Section className='!pb-0'>
        <SectionHead
          center
          eyebrow="Discover your stay"
          title="Find Your Perfect Kind of Stay"
          sub="From coastal escapes to secluded mountain hideaways, discover a stay that fits your way of travelling."
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
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {why.map(({ icon: Icon, title, text }) => (
            <div key={title} className="rounded-[23px] border border-[#D0DCE8] bg-[#F9F9F9] p-[27px] hover:border-[#D0DCE8] hover:shadow-sm transition">
              <div className="mb-[21px] inline-flex h-[52px] w-[52px] items-center justify-center rounded-[17px] bg-white">
                <Icon className="h-5 w-5 text-[#02213B]" strokeWidth={1.6} />
              </div>
              <h3 className="text-lg font-semibold text-[#0D1F35]">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#98A1AC]">{text}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Host CTA Banner above Footer */}
      <HostBanner />
    </>
  );
}
