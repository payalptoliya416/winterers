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
          tall
          search={<SearchBar />}
          name="hero-home"
          eyebrow="Explore winter destinations"
          title="Find Your Perfect Winter"
          accent="Destination"
          text="From snow-covered alpine villages to remote Arctic landscapes, discover destinations made for unforgettable winter escapes."
        >
          <Button variant="light" to="/destinations">Explore Destinations</Button>
          <Button variant="ghost" to="/stays">View Winter Stays</Button>
        </Hero>
      </div>

      <Destinations />
      <FeaturedStays />

      <ImgBg name="norway-banner" overlay="bg-navy/60">
        <div className="mx-auto max-w-[1100px] px-4 py-16 text-white sm:px-6">
          <h2 className="text-2xl md:text-3xl">Northern Norway</h2>
          <p className="text-sm text-sky">Chase the Northern Lights</p>
          <p className="mt-3 max-w-sm text-xs text-white/80">
            Experience dramatic Arctic landscapes, cosy winter stays and some of the world's best Northern Lights experiences.
          </p>
          <div className="mt-4 grid max-w-xs grid-cols-2 gap-2 text-[10px]">
            {['Northern Lights', 'Arctic Adventures', 'Mountain Escapes', 'Coastal Landscapes'].map((t) => (
              <span key={t}>✓ {t}</span>
            ))}
          </div>
          <Button variant="sky" className="mt-5">Explore Northern Norway</Button>
        </div>
      </ImgBg>

      <Experiences />
      <Deals />

      <Section className="!py-0">
        <Feature
          reverse={false}
          name="edit"
          eyebrow="The Winterers Edit"
          title="A Different Way to Experience Winter"
          text="Skip the ordinary winter holiday. Discover remote cabins, mountain villages, Arctic adventures and destinations where the journey is just as memorable as the stay."
        >
          <Button to="/stays">Discover Winter Stays</Button>
        </Feature>
      </Section>

      <div className="h-12" />
    </>
  );
}
