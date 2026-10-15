import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
import { img } from '../data';
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
  LayoutGrid,
  List,
} from 'lucide-react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Mousewheel } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';

const browseTypes = [
  { label: 'Cabins', sub: '124 stays', img: 'browse01.png' },
  { label: 'Chalets', sub: '89 stays', img: 'browse02.png' },
  { label: 'Lodges', sub: '47 stays', img: 'browse03.png' },
  { label: 'Glass Houses', sub: '31 stays', img: 'browse04.png' },
  { label: 'Mountain Retreats', sub: '62 stays', img: 'browse05.png' },
  { label: 'Luxury Villas', sub: '28 stays', img: 'browse06.png' },
  { label: 'Remote Hideaways', sub: '53 stays', img: 'browse07.png' },
];

const sortOptions: { value: Sort; label: string }[] = [
  { value: 'top', label: 'Top rated' },
  { value: 'low', label: 'Price: low to high' },
  { value: 'high', label: 'Price: high to low' },
];

const filterConfigs: Record<
  string,
  {
    icon: any;
    hasChevron: boolean;
    options: string[];
  }
> = {
  'Sort by': {
    icon: ArrowUpDown,
    hasChevron: true,
    options: ['Top rated', 'Price: low to high', 'Price: high to low', 'Most popular'],
  },
  'Price range': {
    icon: CreditCard,
    hasChevron: true,
    options: ['Under €200', '€200–€400', '€400–€700', '€700+'],
  },
  'Property type': {
    icon: HomeIcon,
    hasChevron: true,
    options: ['Cabins', 'Chalets', 'Lodges', 'Glass Igloos & Domes', 'Luxury Villas', 'Remote Hideaways'],
  },
  'Guests': {
    icon: Users,
    hasChevron: true,
    options: ['Any guests', '1–2 Guests', '3–5 Guests', '6+ Guests'],
  },
  'Bedrooms': {
    icon: Bed,
    hasChevron: true,
    options: ['Any bedrooms', '1 Bedroom', '2 Bedrooms', '3 Bedrooms', '4+ Bedrooms'],
  },
  'Amenities': {
    icon: Star,
    hasChevron: true,
    options: ['Hot tub', 'Sauna', 'Fireplace', 'Ski-in/ski-out', 'Mountain view', 'Northern lights view'],
  },
  'Location': {
    icon: MapPin,
    hasChevron: true,
    options: ['Lapland', 'Norway', 'Finland', 'Switzerland', 'Austria', 'Iceland'],
  },
  'Rating': {
    icon: Award,
    hasChevron: true,
    options: ['All ratings', '4.5+ Stars', '4.8+ Stars', '5.0 Stars only'],
  },
  'More filters': {
    icon: SlidersHorizontal,
    hasChevron: true,
    options: ['Instant booking', 'Pet friendly', 'Breakfast included', 'Free parking', 'Private chef'],
  },
};

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
  const [openFilter, setOpenFilter] = useState<string | null>(null);
  const [sortOpen, setSortOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const sortRef = useRef<HTMLDivElement>(null);
  const filterBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) {
        setSortOpen(false);
      }
      if (filterBarRef.current && !filterBarRef.current.contains(e.target as Node)) {
        setOpenFilter(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentSortLabel = sortOptions.find((o) => o.value === sort)?.label || 'Top rated';

  const handleSelectOption = (filterName: string, opt: string) => {
    if (filterName === 'Sort by') {
      if (opt === 'Price: low to high') d(setSort('low'));
      else if (opt === 'Price: high to low') d(setSort('high'));
      else d(setSort('top'));
    } else {
      if (!opt.startsWith('Any') && !opt.startsWith('All')) {
        setActiveTags((prev) => (prev.includes(opt) ? prev.filter((t) => t !== opt) : [...prev, opt]));
      }
    }
    setOpenFilter(null);
  };

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
          <div className="w-full max-w-[1440px] mt-8 sm:mt-10">
            <SearchBar cta="Search" chips={false} />
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div ref={filterBarRef} className="mx-auto max-w-[1440px] px-4 sm:px-6 pt-6 sm:pt-8 pb-4">
        {/* Filter Buttons Row with Interactive Dropdowns */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
          {Object.entries(filterConfigs).map(([label, { icon: Icon, hasChevron, options }]) => {
            const isOpen = openFilter === label;
            return (
              <div key={label} className="relative">
                <button
                  type="button"
                  onClick={() => setOpenFilter((prev) => (prev === label ? null : label))}
                  className={`inline-flex items-center gap-2 rounded-full border bg-white px-3.5 py-2 sm:py-2.5 text-xs sm:text-[13px] font-medium transition cursor-pointer whitespace-nowrap shadow-sm ${
                    isOpen
                      ? 'border-sky text-sky bg-[#F4F9FF]'
                      : 'border-slate-200 text-[#1E293B] hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 text-slate-500" />
                  <span>{label}</span>
                  {hasChevron && (
                    <ChevronDown
                      className={`w-3 h-3 text-slate-400 -mr-0.5 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-sky' : ''
                      }`}
                    />
                  )}
                </button>

                {isOpen && (
                  <div className="absolute left-0 top-full mt-2 w-52 rounded-2xl border border-slate-100 bg-white p-1.5 shadow-2xl z-40">
                    <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 px-3 py-1 border-b border-slate-100 mb-1">
                      {label}
                    </div>
                    <div className="max-h-60 overflow-y-auto space-y-0.5">
                      {options.map((opt) => {
                        const isSelected =
                          activeTags.includes(opt) ||
                          (label === 'Sort by' &&
                            ((opt === 'Top rated' && sort === 'top') ||
                              (opt === 'Price: low to high' && sort === 'low') ||
                              (opt === 'Price: high to low' && sort === 'high')));

                        return (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => handleSelectOption(label, opt)}
                            className={`w-full text-left px-3 py-2 text-xs sm:text-[13px] rounded-xl transition flex items-center justify-between cursor-pointer ${
                              isSelected
                                ? 'bg-[#EBF5FF] text-[#0284C7] font-semibold'
                                : 'text-slate-700 hover:bg-slate-50 hover:text-navy'
                            }`}
                          >
                            <span>{opt}</span>
                            {isSelected && <span className="text-xs">✓</span>}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
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

      <div className="mx-auto max-w-[1440px] px-4 sm:px-6">
        <div className="border-t border-[#E4EAF2] my-4 sm:mb-[90px]" />
      </div>

      <Section className="!pt-0">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-sky">
              48 WINTER STAYS AVAILABLE · LAPLAND & SCANDINAVIA
            </p>
            <h2 className="mt-1 font-head text-2xl sm:text-3xl font-semibold text-navy">
              Winter stays for your next escape
            </h2>
          </div>

          <div className="flex items-center gap-2.5 sm:gap-3 self-end sm:self-auto">
            {/* Sort Dropdown */}
            <div className="relative" ref={sortRef}>
              <button
                type="button"
                onClick={() => setSortOpen((prev) => !prev)}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs sm:text-[13px] font-medium text-slate-700 shadow-sm hover:border-slate-300 hover:bg-slate-50 transition cursor-pointer whitespace-nowrap"
              >
                <span className="text-slate-400 font-normal">Sort:</span>
                <span className="font-semibold text-navy">{currentSortLabel}</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
                    sortOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {sortOpen && (
                <div className="absolute right-0 top-full mt-1.5 w-48 rounded-xl border border-slate-100 bg-white p-1.5 shadow-xl z-30">
                  {sortOptions.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => {
                        d(setSort(opt.value));
                        setSortOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs sm:text-[13px] rounded-lg transition ${
                        sort === opt.value
                          ? 'bg-slate-100 font-semibold text-navy'
                          : 'text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* View Mode Toggle: Grid vs List */}
            <div className="flex items-center rounded-xl border border-slate-200 bg-white p-1 shadow-sm">
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`p-1.5 sm:p-2 rounded-lg transition cursor-pointer ${
                  viewMode === 'grid'
                    ? 'bg-[#0B1E36] text-white shadow-sm'
                    : 'text-slate-400 hover:text-navy hover:bg-slate-50'
                }`}
                title="Grid view"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode('list')}
                className={`p-1.5 sm:p-2 rounded-lg transition cursor-pointer ${
                  viewMode === 'list'
                    ? 'bg-[#0B1E36] text-white shadow-sm'
                    : 'text-slate-400 hover:text-navy hover:bg-slate-50'
                }`}
                title="List view"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Stays List / Grid View */}
        {viewMode === 'grid' ? (
          <StayGrid items={s} detailed />
        ) : (
          <div className="flex flex-col gap-4">
            {s.map((item) => (
              <div
                key={item.id}
                className="group rounded-2xl border border-slate-200/80 bg-white p-3 hover:shadow-md transition-all duration-300 flex flex-col md:flex-row gap-4 items-stretch"
              >
                <div className="relative h-48 md:h-auto md:w-72 shrink-0 overflow-hidden rounded-xl bg-slate-100">
                  <img
                    src={img(item.img)}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute right-2.5 top-2.5 rounded-full bg-white/95 px-2.5 py-0.5 text-[11px] font-semibold text-navy flex items-center gap-1 shadow-sm backdrop-blur-sm">
                    <Star className="w-3 h-3 text-navy/70" />
                    {item.rating}
                  </span>
                </div>

                <div className="flex-1 flex flex-col justify-between py-1">
                  <div>
                    <div className="flex items-center gap-1 text-[11px] text-navy/50">
                      <MapPin className="w-3 h-3 text-navy/40 shrink-0" />
                      <span>{item.country}</span>
                    </div>

                    <h3 className="font-head text-base sm:text-lg font-semibold text-navy mt-1">
                      {item.name}
                    </h3>

                    <div className="flex items-center gap-4 text-xs text-navy/50 mt-1.5 font-body">
                      <span className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5 text-navy/40 shrink-0" />
                        {item.guests} guests
                      </span>
                      <span className="flex items-center gap-1">
                        <Bed className="w-3.5 h-3.5 text-navy/40 shrink-0" />
                        {item.beds} bedrooms
                      </span>
                    </div>

                    <p className="mt-2 text-xs text-navy/60">{item.tags}</p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="font-head text-lg sm:text-xl font-bold text-navy">
                        €{item.price}
                      </span>{' '}
                      <span className="text-xs text-navy/50">/night</span>
                      <p className="text-[11px] text-navy/50">
                        €{item.price * 7} total · 7 nights
                      </p>
                    </div>

                    <Link
                      to={`/stays/${item.id}`}
                      className="inline-flex items-center justify-center rounded-full bg-navy px-5 py-2 text-xs sm:text-sm font-medium text-white transition-all hover:bg-navy/90 active:scale-95 shadow-sm"
                    >
                      View Stay
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Section>

      {/* Featured Collection Showcase Banner */}
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 my-10 sm:my-14">
        <div
          className="relative overflow-hidden rounded-[26px] sm:rounded-[32px] min-h-[420px] sm:min-h-[460px] flex items-center bg-cover bg-center"
          style={{ backgroundImage: `url('/images/stay-bg.png')` }}
        >
          {/* Banner Content: Left Info & Right Floating Card */}
          <div className="relative z-10 w-full p-6 sm:p-10 md:p-14 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            {/* Left side text */}
            <div className="max-w-xl text-white">
              <p className="text-xs sm:text-[13px] font-semibold uppercase tracking-wider text-sky mb-2 sm:mb-2.5">
                FEATURED COLLECTION
              </p>

              <h2 className="font-head text-2xl sm:text-3xl md:text-4xl font-semibold text-white tracking-tight leading-tight">
                Stay Somewhere Extraordinary
              </h2>

              <p className="mt-3.5 sm:mt-4 text-xs sm:text-sm md:text-base leading-relaxed text-white/85 font-normal max-w-lg">
                Our hand-picked collection of the world's most remarkable winter properties — each one a destination in its own right.
              </p>

              <div className="mt-6 sm:mt-8">
                <Link
                  to="/stays"
                  className="inline-flex items-center justify-center rounded-full bg-sky hover:bg-[#68bede] px-7 py-3 text-xs sm:text-sm font-semibold text-navy transition-all duration-200 active:scale-95 shadow-sm"
                >
                  Explore the Collection
                </Link>
              </div>
            </div>

            {/* Right side floating property card */}
            <div className="w-full max-w-sm lg:w-[312px] rounded-2xl bg-white p-5 sm:p-6 shadow-2xl shrink-0 text-navy">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-sky">
                GLACIER EDGE CHALET
              </p>

              <h3 className="mt-1 font-head text-lg sm:text-xl font-bold text-navy leading-snug">
                Zermatt, Switzerland
              </h3>

              <p className="mt-1 text-[11px] sm:text-xs text-navy/55">
                Glacier views · Private spa · 5 bedrooms
              </p>

              {/* Rating */}
              <div className="mt-2.5 flex items-center gap-1.5 text-xs text-navy/60">
                <div className="flex items-center gap-0.5 text-navy/40">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-3.5 h-3.5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  ))}
                </div>
                <span className="text-[11px] text-navy/50">(63 reviews)</span>
              </div>

              {/* Bottom row: Price & View Property Button */}
              <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="font-head text-lg sm:text-xl font-bold text-navy">
                    €899
                  </span>{' '}
                  <span className="text-[11px] text-navy/50">/ night</span>
                </div>

                <Link
                  to="/stays/2"
                  className="inline-flex items-center justify-center rounded-full bg-navy hover:bg-[#06182c] px-5 py-2 text-xs font-semibold text-white transition-all active:scale-95 shadow-sm"
                >
                  View Property
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Browse by Type Swiper Slider Section */}
      <section className="bg-mist py-12 md:py-16 overflow-hidden mt-12 sm:mt-16">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <p className="text-xs sm:text-[13px] font-semibold uppercase tracking-wider text-sky mb-1">
                BROWSE BY TYPE
              </p>
              <h2 className="font-head text-2xl sm:text-3xl font-semibold text-navy tracking-tight">
                Explore Every Kind of Winter Stay
              </h2>
            </div>

            <Link
              to="/stays"
              className="inline-flex items-center justify-center rounded-full bg-[#071D36] hover:bg-[#051527] px-6 py-2.5 text-xs sm:text-sm font-semibold text-white transition-all active:scale-95 shadow-sm whitespace-nowrap self-start sm:self-auto"
            >
              View All Types
            </Link>
          </div>
        </div>

        {/* Swiper Slider: starts at left container edge and bleeds off to the right edge */}
        <div
          className="mt-6 sm:mt-8"
          style={{
            paddingLeft: 'max(1rem, calc((100vw - 1440px) / 2 + 1.5rem))',
          }}
        >
          <Swiper
            modules={[FreeMode, Mousewheel]}
            slidesPerView="auto"
            spaceBetween={14}
            freeMode={true}
            grabCursor={true}
            mousewheel={{ forceToAxis: true }}
            className="!overflow-visible"
          >
            {[...browseTypes, ...browseTypes].map((item, idx) => (
              <SwiperSlide key={idx} className="!w-auto">
                <Link
                  to="/stays"
                  className="group relative block w-[190px] sm:w-[210px] md:w-[224px] h-[145px] sm:h-[155px] rounded-[22px] overflow-hidden bg-slate-200 hover:shadow-lg transition-all duration-300 shrink-0"
                >
                  <img
                    src={`/images/${item.img}`}
                    alt={item.label}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 pointer-events-none"
                  />
                  <div className="absolute bottom-3.5 left-4 text-white pointer-events-none">
                    <p className="font-semibold text-sm sm:text-[15px] leading-tight text-white drop-shadow-sm">
                      {item.label}
                    </p>
                    <p className="text-[11px] sm:text-xs text-white/75 mt-0.5">
                      {item.sub}
                    </p>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

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
