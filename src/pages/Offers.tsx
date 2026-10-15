import Hero from '../components/Hero';
import SearchBar from '../components/SearchBar';
import Button from '../components/Button';
import Section from '../components/Section';
import SectionHead from '../components/SectionHead';
import Feature from '../components/Feature';
import { FeaturedStays, Deals } from '../components/Blocks';

const perks = [
  ['Member-Only Prices', 'Access selected rates unavailable to everyone.'],
  ['Early Access', 'See seasonal offers before they become widely available.'],
  ['Special Winter Perks', 'Enjoy selected benefits with participating stays.'],
];

export default function Offers() {
  return (
    <>
      <div className="pb-28 md:pb-24">
        <Hero
          tall
          search={<SearchBar />}
          name="hero-offers"
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

      <Section>
        <Feature
          name="offer"
          eyebrow="Exclusive offer"
          title="Stay More, Save More"
          text="Enjoy an unforgettable winter escape with selected stays offering exclusive seasonal rates."
        >
          <p className="text-[10px] text-navy/50">Zermatt, Switzerland · 2 nights · 2 guests</p>
          <div className="my-3 inline-block rounded-lg bg-white p-3">
            <p className="text-[10px] text-navy/50 line-through">Was €620</p>
            <b className="text-2xl">€449</b>{' '}
            <span className="rounded bg-sky px-1.5 py-0.5 text-[10px]">SAVE 28%</span>
          </div>
          <br />
          <Button>View This Deal</Button>
        </Feature>
      </Section>

      <Section tone="mist">
        <SectionHead
          center
          eyebrow="For members"
          title="Unlock Exclusive Winter Savings"
          sub="Sign in to access selected member rates and early winter offers."
        />
        <div className="grid gap-4 md:grid-cols-3">
          {perks.map(([t, x]) => (
            <div key={t} className="rounded-xl bg-white p-6 text-center">
              <div className="mx-auto mb-3 h-9 w-9 rounded-full bg-mist" />
              <h3 className="text-sm font-medium">{t}</h3>
              <p className="mt-1 text-[10px] text-navy/50">{x}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 text-center">
          <Button>Sign In & Explore</Button>
        </div>
      </Section>
    </>
  );
}
