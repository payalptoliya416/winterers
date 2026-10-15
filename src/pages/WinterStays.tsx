import { useAppDispatch as useDispatch, useAppSelector as useSelector } from '../store/hooks';
import { selectSorted, setSort } from '../store/staysSlice';
import type { Sort } from '../store/staysSlice';
import Hero from '../components/Hero';
import SearchBar from '../components/SearchBar';
import Section from '../components/Section';
import SectionHead from '../components/SectionHead';
import StayGrid from '../components/StayGrid';
import Feature from '../components/Feature';
import Button from '../components/Button';
import ImgTile from '../components/ImgTile';

const filters = [
  'Sort by', 'Price range', 'Property type',
  'Guests', 'Bedrooms', 'Amenities',
  'Location', 'Rating', 'More filters',
];

const typeLabels = [
  'Cabins', 'Chalets', 'Lodges',
  'Glass Houses', 'Mountain Retreats',
  'Luxury Villas', 'Remote Hideaways',
];

export default function WinterStays() {
  const d = useDispatch();
  const s = useSelector(selectSorted);
  const sort = useSelector((x) => x.stays.sort);

  return (
    <>
      <div className="pb-28 md:pb-24">
        <Hero
          tall
          search={<SearchBar cta="Search" chips={false} />}
          name="hero-stays"
          eyebrow="Premium winter properties"
          title="Find Your Perfect"
          accent="Winter Stay"
          text="Cabins, chalets, lodges and extraordinary winter properties across the world's most beautiful winter destinations."
        />
      </div>

      {/* Filter Bar */}
      <div className="mx-auto flex max-w-[1100px] flex-wrap gap-2 px-4 pb-6 sm:px-6">
        {filters.map((f) => (
          <button
            key={f}
            className="rounded-lg border border-navy/15 px-3 py-1.5 text-[10px] hover:bg-mist"
          >
            {f} ⌄
          </button>
        ))}
      </div>

      <Section className="!pt-4">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-[10px] uppercase tracking-wider text-sky">48 winter stays available</p>
            <h2 className="text-2xl md:text-3xl">Winter stays for your next escape</h2>
          </div>
          <select
            value={sort}
            onChange={(e) => d(setSort(e.target.value as Sort))}
            className="rounded-lg border border-navy/15 px-2 py-1.5 text-[10px]"
          >
            <option value="top">Top rated</option>
            <option value="low">Price: low to high</option>
            <option value="high">Price: high to low</option>
          </select>
        </div>
        <StayGrid items={s} detailed />
      </Section>

      <Section className="!py-0">
        <Feature
          tone="dark"
          name="collection"
          eyebrow="Featured collection"
          title="Stay Somewhere Extraordinary"
          text="Our hand-picked collection of the world's most remarkable winter properties."
        >
          <Button variant="sky">Explore the Collection</Button>
        </Feature>
      </Section>

      <Section tone="mist" className="mt-12">
        <SectionHead
          eyebrow="Browse by type"
          title="Explore Every Kind of Winter Stay"
          action="View All Types"
          to="/stays"
        />
        <div className="-mx-4 flex gap-3 overflow-x-auto px-4 pb-2">
          {typeLabels.map((l, i) => (
            <ImgTile
              key={l}
              label={l}
              sub={`${40 + i * 13} stays`}
              name={`t${i + 1}`}
              className="h-28 w-40 shrink-0"
            />
          ))}
        </div>
      </Section>

      <Section tone="dark">
        <SectionHead dark eyebrow="Staff pick" title="This Week's Highlighted Stay" />
        <Feature
          tone="light"
          name="highlight"
          eyebrow="Glass Lodge · 5.0"
          title="Aurora Glass Lodge"
          text="Sleep under the northern lights in this architecturally stunning glass lodge."
        >
          <Button to="/stays/3">View Full Property</Button>
        </Feature>
      </Section>

      <Section>
        <SectionHead
          eyebrow="Personalised for you"
          title="Stays You May Like"
          action="See all recommendations"
          to="/stays"
        />
        <StayGrid items={s.slice(0, 3)} detailed />
      </Section>
    </>
  );
}
