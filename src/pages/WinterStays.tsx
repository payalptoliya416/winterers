import { useState } from 'react';
import { useAppDispatch as useDispatch, useAppSelector as useSelector } from '../store/hooks';
import { selectSorted, setSort } from '../store/staysSlice';
import type { Sort } from '../store/staysSlice';
import SearchBar from '../components/SearchBar';
import Section from '../components/Section';
import SectionHead from '../components/SectionHead';
import StayGrid from '../components/StayGrid';
import Feature from '../components/Feature';
import Button from '../components/Button';
import ImgTile from '../components/ImgTile';
import {
  ArrowUpDown,
  CreditCard,
  Home as HomeIcon,
  Users,
  Bed,
  Star,
  MapPin,
  Award,
  SlidersHorizontal,
  ChevronDown,
  X,
} from 'lucide-react';

const filterItems = [
  { label: 'Sort by', icon: ArrowUpDown, hasChevron: true },
  { label: 'Price range', icon: CreditCard, hasChevron: true },
  { label: 'Property type', icon: HomeIcon, hasChevron: true },
  { label: 'Guests', icon: Users, hasChevron: true },
  { label: 'Bedrooms', icon: Bed, hasChevron: true },
  { label: 'Amenities', icon: Star, hasChevron: true },
  { label: 'Location', icon: MapPin, hasChevron: true },
  { label: 'Rating', icon: Award, hasChevron: true },
  { label: 'More filters', icon: SlidersHorizontal, hasChevron: false },
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
  const [activeTags, setActiveTags] = useState(['Lapland', '€200–€400', '6+ Guests']);

  const removeTag = (tag: string) => {
    setActiveTags((prev) => prev.filter((t) => t !== tag));
  };

  const clearAllTags = () => {
    setActiveTags([]);
  };

  return (
    <>
      {/* Hero Banner with SearchBar inside */}
      <div
        className="relative overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: `url('/images/hero-stays.png')` }}
      >
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#062541]/45 via-[#062541]/30 to-[#062541]/55" />

        <div className="relative z-10 flex flex-col items-center text-center text-white pt-32 sm:pt-36 md:pt-40 pb-12 sm:pb-16 px-4 sm:px-6">
          <div className="mx-auto max-w-[1000px]">
            <p className="mb-3.5 text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#7EC8E3]">
              PREMIUM WINTER PROPERTIES
            </p>

            <h1 className="text-4xl font-semibold leading-[1.12] sm:text-5xl md:text-6xl tracking-tight text-white">
              Find Your Perfect <br />
              <span className="text-sky">Winter Stay</span>
            </h1>

            <p className="mx-auto mt-4 sm:mt-5 max-w-xl text-xs sm:text-sm md:text-base leading-relaxed text-white/80 font-normal">
              Cabins, chalets, lodges and extraordinary winter properties across the world's most beautiful winter destinations.
            </p>
          </div>

          {/* Search Bar - Placed comfortably inside hero banner */}
          <div className="w-full max-w-[1140px] mt-8 sm:mt-10">
            <SearchBar cta="Search" chips={false} />
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 pt-6 sm:pt-8 pb-2">
        {/* Filter Buttons Row */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
          {filterItems.map(({ label, icon: Icon, hasChevron }) => (
            <button
              key={label}
              type="button"
              className="inline-flex items-center gap-2 rounded-xl sm:rounded-2xl border border-slate-200 bg-white px-3.5 py-2 sm:py-2.5 text-xs sm:text-[13px] font-medium text-[#1E293B] shadow-sm hover:border-slate-300 hover:bg-slate-50 transition cursor-pointer whitespace-nowrap"
            >
              <Icon className="w-3.5 h-3.5 text-slate-600" />
              <span>{label}</span>
              {hasChevron && <ChevronDown className="w-3 h-3 text-slate-400 -mr-0.5" />}
            </button>
          ))}
        </div>

        {/* Active Filter Chips Row - Aligned to Right */}
        {activeTags.length > 0 && (
          <div className="mt-3.5 flex flex-wrap items-center justify-end gap-2 sm:gap-2.5">
            {activeTags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1.5 rounded-full bg-[#EBF5FF] px-3.5 py-1 text-xs font-medium text-[#0284C7] transition"
              >
                <span>{tag}</span>
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="hover:opacity-75 cursor-pointer flex items-center justify-center"
                >
                  <X className="w-3 h-3 text-[#0284C7]" />
                </button>
              </span>
            ))}
            <button
              type="button"
              onClick={clearAllTags}
              className="text-xs sm:text-[13px] font-medium text-[#0284C7] hover:underline cursor-pointer ml-1"
            >
              Clear all
            </button>
          </div>
        )}
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
