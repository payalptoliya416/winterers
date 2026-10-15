import Hero from '../components/Hero';
import SearchBar from '../components/SearchBar';
import Section from '../components/Section';
import SectionHead from '../components/SectionHead';
import Feature from '../components/Feature';
import Button from '../components/Button';
import ImgTile from '../components/ImgTile';
import { FeaturedStays, Destinations, Experiences, Deals } from '../components/Blocks';

const why = [
  ['Winter Experts', 'We focus on unforgettable winter experiences.'],
  ['Unique Stays', 'Discover places you will not find everywhere.'],
  ['Trusted Properties', 'Every stay is carefully selected.'],
  ['Better Winter Experiences', 'Find properties close to the experiences you came for.'],
  ['Secure Booking', 'Book your stay with confidence.'],
  ['Dedicated Support', 'Support whenever you need it.'],
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
              Find Your <span className="text-sky">Perfect Winter</span>
              <br className="hidden sm:block" /> Destination
            </>
          }
          text="From snow-covered alpine villages to remote Arctic landscapes, discover destinations made for unforgettable winter escapes."
        >
          <Button pill variant="light" size="lg" to="/destinations">
            Explore Destinations
          </Button>
          <Button pill variant="ghost" size="lg" to="/stays">
            View Winter Stays
          </Button>
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
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {[
            ['Cabins', 'cabin1'],
            ['Chalets', 'chalet'],
            ['Lodges', 'forest'],
            ['Glass Houses', 'aurora'],
          ].map(([l, n]) => (
            <ImgTile key={l} label={l} name={n} className="h-40" />
          ))}
        </div>
      </Section>

      <FeaturedStays />
      <Destinations />
      <Experiences />

      <Section>
        <Feature
          name="lapland"
          reverse
          eyebrow="Winter wonderlands"
          title="Lapland After Dark"
          text="Experience a world where snow-covered forests stretch endlessly beneath the Northern Lights."
        >
          <Button>Explore Lapland</Button>
        </Feature>
      </Section>

      <Deals />

      <Section>
        <SectionHead
          center
          eyebrow="Why Winterers"
          title="Made for People Who Prefer Winter"
        />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {why.map(([t, x]) => (
            <div key={t} className="rounded-xl border border-navy/10 p-5">
              <h3 className="text-sm font-medium">{t}</h3>
              <p className="mt-1 text-[10px] text-navy/50">{x}</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
