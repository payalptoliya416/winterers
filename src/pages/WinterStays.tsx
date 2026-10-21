import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
import { Experiences } from '../components/Blocks';
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
  Map,
  Bath,
  Check,
} from 'lucide-react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Mousewheel } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';

const locationStays = [
  {
    id: 2,
    type: 'Chalet',
    name: 'Alpine Ridge Chalet',
    location: 'Chamonix, France',
    country: 'France',
    price: 749,
    rating: 4.8,
    img: 'location01.png',
  },
  {
    id: 1,
    type: 'Lodge',
    name: 'Northern Lights Lodge',
    location: 'Abisko, Sweden',
    country: 'Sweden',
    price: 569,
    rating: 4.9,
    img: 'location01.png',
  },
  {
    id: 3,
    type: 'Chalet',
    name: 'Glacier Edge Chalet',
    location: 'Zermatt, Switzerland',
    country: 'Switzerland',
    price: 899,
    rating: 5.0,
    img: 'location02.png',
  },
  {
    id: 4,
    type: 'Retreat',
    name: 'Nordic Forest Retreat',
    location: 'Rovaniemi, Finland',
    country: 'Finland',
    price: 319,
    rating: 4.7,
    img: 'location01.png',
  },
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
  const [dropdownCoord, setDropdownCoord] = useState<{ top: number; left: number } | null>(null);
  const [sortOpen, setSortOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedStayId, setSelectedStayId] = useState<number>(2);
  const sortRef = useRef<HTMLDivElement>(null);
  const filterBarRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) {
        setSortOpen(false);
      }
      if (
        filterBarRef.current &&
        !filterBarRef.current.contains(e.target as Node) &&
        (!dropdownRef.current || !dropdownRef.current.contains(e.target as Node))
      ) {
        setOpenFilter(null);
        setDropdownCoord(null);
      }
    };
    const handleCloseDropdown = () => {
      setOpenFilter(null);
      setDropdownCoord(null);
    };
    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('resize', handleCloseDropdown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('resize', handleCloseDropdown);
    };
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
    setDropdownCoord(null);
  };

  const removeTag = (tag: string) => {
    setActiveTags((prev) => prev.filter((t) => t !== tag));
  };

  const clearAllTags = () => {
    setActiveTags([]);
  };

  return (
    <>
      {/* Hero Banner with 800px height and inner SearchBar */}
      <Hero
        searchPosition="inner"
        search={<SearchBar cta="Search" chips={false} />}
        name="hero-stays.png"
        eyebrow="PREMIUM WINTER PROPERTIES"
        title={
          <>
            Find Your Perfect <br />
            <span className="text-[#7EC8E3]">Winter Stay</span>
          </>
        }
        text="Cabins, chalets, lodges and extraordinary winter properties across the world's most beautiful winter destinations."
      />

      {/* Filter Bar */}
      <div ref={filterBarRef} className="site-container pt-6 sm:pt-8 pb-4">
        {/* Filter Buttons Row with Horizontal Scroll on responsive */}
        <div className="flex items-center gap-2 sm:gap-2.5 overflow-x-auto pb-2.5 pt-1 scrollbar-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden flex-nowrap lg:flex-wrap lg:overflow-visible lg:pb-0">
          {Object.entries(filterConfigs).map(([label, { icon: Icon, hasChevron }]) => {
            const isOpen = openFilter === label;
            return (
              <div key={label} className="relative shrink-0">
                <button
                  type="button"
                  onClick={(e) => {
                    if (openFilter === label) {
                      setOpenFilter(null);
                      setDropdownCoord(null);
                    } else {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const dropdownWidth = 208;
                      const left = Math.max(12, Math.min(rect.left, window.innerWidth - dropdownWidth - 12));
                      setDropdownCoord({ top: rect.bottom + 8, left });
                      setOpenFilter(label);
                    }
                  }}
                  className={`inline-flex items-center gap-2 rounded-full border bg-white px-3.5 py-2 sm:py-2.5 text-xs sm:text-[13px] font-medium transition cursor-pointer whitespace-nowrap shadow-xs ${
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
              </div>
            );
          })}
        </div>

        {/* Floating Fixed Dropdown (Avoids clipping inside overflow-x-auto) */}
        {openFilter && dropdownCoord && filterConfigs[openFilter] && (
          <div
            ref={dropdownRef}
            style={{ top: dropdownCoord.top, left: dropdownCoord.left }}
            className="fixed w-52 rounded-2xl border border-slate-100 bg-white p-1.5 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150"
          >
            <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 px-3 py-1 border-b border-slate-100 mb-1">
              {openFilter}
            </div>
            <div className="max-h-60 overflow-y-auto space-y-0.5">
              {filterConfigs[openFilter].options.map((opt) => {
                const isSelected =
                  activeTags.includes(opt) ||
                  (openFilter === 'Sort by' &&
                    ((opt === 'Top rated' && sort === 'top') ||
                      (opt === 'Price: low to high' && sort === 'low') ||
                      (opt === 'Price: high to low' && sort === 'high')));

                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => handleSelectOption(openFilter, opt)}
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

      <div className="site-container">
        <div className="border-t border-[#E4EAF2] my-4 sm:mb-[90px]" />
      </div>

      <Section className="!pt-0">
        <div className="mb-8 sm:mb-10 text-center">
          <p className="section-eyebrow">
            48 WINTER STAYS AVAILABLE · LAPLAND & SCANDINAVIA
          </p>
          <h2 className="section-title">
            Winter stays for your next escape
          </h2>
        </div>

        {/* Stays Grid */}
        <StayGrid items={s} detailed />
      </Section>

      {/* Featured Collection Showcase Banner */}
      <div className="site-container mb-10 sm:mb-14">
        <div
          className="relative overflow-hidden rounded-[26px] sm:rounded-[32px] min-h-[420px] sm:min-h-[460px] flex items-center bg-cover bg-center"
          style={{ backgroundImage: `url('/images/stay-bg.png')` }}
        >
          {/* Banner Content: Left Info & Right Floating Card */}
          <div className="relative z-10 w-full p-6 sm:p-10 md:p-14 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            {/* Left side text */}
            <div className="max-w-xl text-white">
              <p className="section-eyebrow">
                FEATURED COLLECTION
              </p>

              <h2 className="section-title !text-white">
                Stay Somewhere Extraordinary
              </h2>

              <p className="mt-3.5 sm:mt-[25px] text-xs sm:text-sm md:text-base leading-relaxed text-[#C8E6F5] font-normal max-w-lg">
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
            <div className="w-full max-w-sm lg:w-[312px] rounded-[14px] bg-white p-5 sm:p-6 shrink-0 text-navy">
              <p className="text-sm font-semibold uppercase tracking-wider text-sky">
                GLACIER EDGE CHALET
              </p>

              <h3 className="mt-1 font-head text-lg sm:text-xl font-bold text-navy leading-snug">
                Zermatt, Switzerland
              </h3>

              <p className="mt-1 text-[11px] sm:text-sm text-navy/55">
                Glacier views · Private spa · 5 bedrooms
              </p>

              {/* Bottom row: Price & View Property Button */}
              <div className="mt-[25px] flex items-center justify-between">
                <div>
                  <span className="font-head text-lg sm:text-xl font-bold text-navy">
                    €899
                  </span>{' '}
                  <span className="text-xs text-[#7A8FA6]">/ night</span>
                </div>

                <Link
                  to="/stays/2"
                  className="inline-flex items-center justify-center rounded-[12px] bg-navy hover:bg-[#06182c] px-5 py-2 text-sm font-semibold text-white transition-all active:scale-95"
                >
                  View Property
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Browse by Type Section */}
      <Experiences
        eyebrow="BROWSE BY TYPE"
        title="Explore Every Kind of Winter Stay"
        sub=""
        bg="bg-[#EEF6FC]"
        className="mt-12 sm:mt-[110px]"
        linkTo="/stays"
      />

      {/* Find Stays by Location Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="site-container">
          {/* Centered Header */}
          <div className="text-center mb-8">
            <p className="section-eyebrow">
              EXPLORE THE MAP
            </p>
            <h2 className="section-title">
              Find Stays by Location
            </h2>
          </div>

          {/* Map View: Left Stays List & Right Interactive Map */}
          {(() => {
            const currentStay =
              locationStays.find((item) => item.id === selectedStayId) ||
              locationStays[0];

            return (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 xl:gap-10 items-start">
                {/* Left Side: Stays List */}
                <div className="lg:col-span-5 flex flex-col">
                  <p className="text-sm text-slate-400 font-normal mb-3.5">
                    Showing 4 of 48 stays
                  </p>

                  <div className="space-y-3.5">
                    {locationStays.map((item) => {
                      const isSelected = currentStay.id === item.id;
                      return (
                        <div
                          key={item.id}
                          onClick={() => setSelectedStayId(item.id)}
                          className={`group rounded-2xl border p-4 transition-all duration-300 flex items-center justify-between gap-3.5 cursor-pointer ${
                            isSelected
                              ? ' bg-sky/[0.04]'
                              : 'border-slate-200/80 bg-white hover:border-slate-300 hover:shadow-md'
                          }`}
                        >
                          <div className="flex items-center gap-3.5 min-w-0">
                            {/* Thumbnail */}
                            <div className="relative h-[108px] w-[108px] sm:h-22 sm:w-22 shrink-0 overflow-hidden rounded-xl bg-slate-100">
                              <img
                                src={`/images/${item.img}`}
                                alt={item.name}
                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                              />
                            </div>

                            {/* Details */}
                            <div className="min-w-0">
                              <p className="text-sm text-[#7A8FA6]">
                                {item.type}
                              </p>
                              <h3 className="font-head text-sm sm:text-base font-medium text-[#0D1B2A] truncate">
                                {item.name}
                              </h3>
                              <div className="mt-0.5 flex items-center gap-1 text-sm text-[#7A8FA6]">
                                <MapPin className="w-3 h-3 text-[#7A8FA6] shrink-0" />
                                <span className="truncate">{item.location}</span>
                              </div>
                              <p className="mt-3 text-base text-[#0D1B2A] font-medium">
                                €{item.price}{' '}
                                <span className="text-xs font-normal text-[#7A8FA6]">/night</span>
                              </p>
                            </div>
                          </div>

                          {/* Right Side: Rating & View Link */}
                          <div className="flex flex-col items-end justify-between self-stretch shrink-0 py-0.5">
                            <span className="flex items-center gap-1 text-sm font-semibold text-[#000000]">
                                <Star className="w-3.5 h-3.5 text-[#000000]" />
                              {item.rating}
                            </span>
                            <Link
                              to={`/stays/${item.id}`}
                              onClick={(e) => e.stopPropagation()}
                              className="text-sm font-semibold text-[#1A5F9E] underline transition"
                            >
                              View
                            </Link>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Right Side: Map Container */}
                <div className="lg:col-span-7">
                  <div className="relative overflow-hidden rounded-[24px] sm:rounded-[32px] bg-slate-100 shadow-sm border border-slate-200/80 w-full h-[480px] sm:h-[520px] md:h-[630px] lg:h-[660px]">
                    {/* Floating location badge */}
                    <div className="absolute top-4 left-4 z-10 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-md border border-slate-200/60 flex items-center gap-2 text-xs font-semibold text-navy">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span>{currentStay.name}</span>
                      <span className="text-slate-400 font-normal">· {currentStay.location}</span>
                    </div>

                    <iframe
                      key={currentStay.id}
                      title="Find Stays Map"
                      src={`https://maps.google.com/maps?q=${encodeURIComponent(currentStay.name + ', ' + currentStay.location)}&t=&z=12&ie=UTF8&iwloc=&output=embed`}
                      className="w-full h-full border-0 rounded-[24px] sm:rounded-[32px]"
                      loading="lazy"
                      allowFullScreen
                    />
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      </section>

      {/* This Week’s Highlighted Stay Section */}
      <section className="bg-[#031B33] py-16 md:py-20 lg:py-24">
        <div className="site-container">
          <div className="mb-6 sm:mb-8">
            <p className="section-eyebrow">
              STAFF PICK
            </p>
            <h2 className="section-title !text-white">
              This Week’s Highlighted Stay
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
            {/* Left: Image Container */}
            <div className="lg:col-span-8">
              <div className="relative overflow-hidden rounded-[28px] w-full h-[360px] sm:h-[440px] lg:h-full min-h-[380px]">
                <img
                  src="/images/highlight-stay.png"
                  alt="Aurora Glass Lodge"
                  className="w-full h-full object-cover transition-transform duration-700"
                />
              </div>
            </div>

            {/* Right: Floating White Card */}
            <div className="lg:col-span-4 flex">
              <div className="w-full rounded-[28px] bg-white p-6 sm:p-8 md:p-9 shadow-2xl flex flex-col justify-between">
                <div>
                  {/* Top: Category Badge & Star Rating */}
                  <div className="flex items-center justify-between gap-3">
                    <span className="rounded-full bg-[#EBF5FF] px-3.5 py-1 text-xs font-semibold text-[#0284C7]">
                      Glass Lodge
                    </span>
                  </div>

                  {/* Title & Location */}
                  <h3 className="font-head text-2xl sm:text-[30px] font-bold text-[#071D36] mt-4 leading-tight">
                    Aurora Glass Lodge
                  </h3>
                  <div className="mt-1 flex items-center gap-1.5 text-sm text-[#7A8FA6]">
                    <MapPin className="w-3.5 h-3.5 text-[#7A8FA6] shrink-0" />
                    <span>Tromsø, Norway</span>
                  </div>

                  {/* 3 Stat Pill Blocks */}
                  <div className="grid grid-cols-3 gap-[15px] mt-[32px]">
                    <div className="rounded-xl bg-[#EEF6FC] py-[14px] px-3 text-center flex flex-col items-center justify-center gap-1">
                      <Users className="w-4 h-4 text-[#0D1B2A]" />
                      <span className="text-xs font-semibold text-[#0D1B2A]">2 Guests</span>
                    </div>
                    <div className="rounded-xl bg-[#EEF6FC] py-[14px] px-3 text-center flex flex-col items-center justify-center gap-1">
                      <Bed className="w-4 h-4 text-[#0D1B2A]" />
                      <span className="text-xs font-semibold text-[#0D1B2A]">1 Bedroom</span>
                    </div>
                    <div className="rounded-xl bg-[#EEF6FC] py-[14px] px-3 text-center flex flex-col items-center justify-center gap-1">
                      <Bath className="w-4 h-4 text-[#0D1B2A]" />
                      <span className="text-xs font-semibold text-[#0D1B2A]">1 Bathroom</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="mt-5 text-xs sm:text-sm text-[#7A8FA6] leading-relaxed">
                    Sleep under the northern lights in this architecturally stunning glass lodge. The panoramic ceiling offers uninterrupted aurora views from your bed. Includes private sauna, guided aurora tours, and a private chef on request.
                  </p>

                  {/* Feature Checklist (2 columns) */}
                  <div className="grid grid-cols-2 gap-y-2.5 gap-x-3 text-sm text-[#0D1B2A] mt-5 sm:mt-[30px]">
                    <div className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#0D1B2A] shrink-0" />
                      <span>Private sauna</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#0D1B2A] shrink-0" />
                      <span>Aurora observatory</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#0D1B2A] shrink-0" />
                      <span>Wi-Fi</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#0D1B2A] shrink-0" />
                      <span>Breakfast included</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#0D1B2A] shrink-0" />
                      <span>Hot tub</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#0D1B2A] shrink-0" />
                      <span>Snowmobile tours</span>
                    </div>
                  </div>
                </div>

                {/* Footer with Price & Button */}
                <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between gap-4 flex-wrap">
                  <div>
                    <div className="flex items-baseline gap-1">
                      <span className="font-head text-2xl font-bold text-[#071D36]">€459</span>
                      <span className="text-sm text-[#7A8FA6] font-normal">/ night</span>
                    </div>
                    <p className="text-sm text-[#7A8FA6] mt-2">
                      €3,213 total · 7 nights
                    </p>
                  </div>
                  <Link
                    to="/stays/1"
                    className="rounded-[18px] bg-[#071D36] text-white px-5 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold hover:bg-sky transition whitespace-nowrap"
                  >
                    View Full Property
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stays You May Like Section with Swiper Slider */}
      <section className="pt-12 md:pt-[110px] bg-white overflow-hidden">
        <div className="site-container">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
            <div>
              <p className="section-eyebrow mb-1">
                PERSONALISED FOR YOU
              </p>
              <h2 className="section-title">
                Stays You May Like
              </h2>
            </div>
            <Link
              to="/stays"
              className="inline-flex items-center justify-center rounded-full bg-[#071D36] hover:bg-[#051527] px-6 py-2.5 text-xs sm:text-sm font-semibold text-white transition-all active:scale-95 shadow-sm whitespace-nowrap self-start sm:self-auto"
            >
              See all recommendations
            </Link>
          </div>
        </div>

        {/* Swiper Slider: starts at left container edge and bleeds off to the right edge */}
        <div
          className="mt-6 sm:mt-8"
          style={{
            paddingLeft: 'max(1rem, calc((100vw - var(--container-max-w)) / 2 + 1.5rem))',
          }}
        >
          <Swiper
            modules={[FreeMode, Mousewheel]}
            slidesPerView="auto"
            spaceBetween={20}
            freeMode={true}
            grabCursor={true}
            mousewheel={{ forceToAxis: true }}
            className="!overflow-visible"
          >
            {s.map((item) => (
              <SwiperSlide key={item.id} className="!w-auto">
                <div
                  className="w-[280px] sm:w-[320px] md:w-[340px] lg:w-[380px]"
                  style={{
                    width: 'clamp(280px, calc((min(100vw, var(--container-max-w)) - 108px) / 3.5), 382px)',
                  }}
                >
                  <div className="group rounded-[24px] border border-slate-200/80 bg-white p-3.5 hover:shadow-lg transition-all duration-300 flex flex-col justify-between h-full">
                    <div>
                      {/* Card Image with Rating Badge */}
                      <div className="relativ w-full overflow-hidden rounded-[14px]">
                        <img
                          src={img(item.img)}
                          alt={item.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>

                      {/* Location & Title */}
                      <div className="pt-3 px-1">
                        <div className="flex items-center gap-1 text-xs text-slate-400">
                          <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span>{item.country}</span>
                        </div>

                        <h3 className="font-head text-base sm:text-lg font-semibold text-navy mt-1 truncate">
                          {item.name}
                        </h3>

                        {/* Guests and Bedrooms */}
                        <div className="flex items-center gap-3 text-xs text-slate-500 mt-1.5 font-body">
                          <span className="flex items-center gap-1">
                            <Users className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                            {item.guests} guests
                          </span>
                          <span className="flex items-center gap-1">
                            <Bed className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                            {item.beds} beds
                          </span>
                        </div>

                        {/* Tags */}
                        <p className="mt-2 text-xs text-slate-400 truncate">
                          {item.tags}
                        </p>
                      </div>
                    </div>

                    {/* Bottom Row: Price & View Stay Button */}
                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between px-1">
                      <div>
                        <div className="flex items-baseline gap-1">
                          <span className="font-head text-lg sm:text-xl font-bold text-navy">
                            €{item.price}
                          </span>
                          <span className="text-xs text-slate-400">/night</span>
                        </div>
                        <p className="text-sm text-slate-400 mt-0.5">
                          €{item.price * 7} total · 7 nights
                        </p>
                      </div>

                      <Link
                        to={`/stays/${item.id}`}
                        className="inline-flex items-center justify-center rounded-xl bg-[#071D36] hover:bg-sky px-4 py-2 text-xs font-semibold text-white transition-all active:scale-95 shadow-sm whitespace-nowrap"
                      >
                        View Stay
                      </Link>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </>
  );
}
