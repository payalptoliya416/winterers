import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import SearchBar from '../components/SearchBar';
import Section from '../components/Section';
import { Experiences } from '../components/Blocks';
import {
  Search,
  MapPin,
  Star,
  Users,
  Bed,
  Heart,
  ChevronDown,
  RotateCcw,
  Sparkles,
  UserCheck,
  Compass,
  Headphones,
  Plus,
  Minus,
  Check,
  ChevronLeft,
  ChevronRight,
  Eye,
  Waves,
  Home,
} from 'lucide-react';
import { img } from '../data';

export interface BeachHouseStay {
  id: number;
  name: string;
  location: string;
  country: string;
  type: 'Entire Home' | 'Cabin' | 'Chalet' | 'Villa' | 'Igloo / Luxury Tent';
  price: number;
  rating: number;
  reviewsCount: number;
  guests: number;
  bedrooms: number;
  bathrooms: number;
  img: string;
  tags: string[];
  amenities: string[];
  featured?: boolean;
}

const allBeachHouses: BeachHouseStay[] = [
  {
    id: 101,
    name: 'Nordic Fjord Beachfront Cabin',
    location: 'Lofoten Islands',
    country: 'Norway',
    type: 'Cabin',
    price: 389,
    rating: 4.95,
    reviewsCount: 64,
    guests: 6,
    bedrooms: 3,
    bathrooms: 2,
    img: 'find01.png',
    tags: ['Ocean View', 'Private Sauna', 'Fireplace'],
    amenities: ['Ocean View', 'Hot Tub', 'Fireplace', 'Sauna', 'Kitchen', 'Free Parking', 'Pet Friendly'],
    featured: true,
  },
  {
    id: 102,
    name: 'Arctic Shoreline Glass Villa',
    location: 'Tromsø Coast',
    country: 'Norway',
    type: 'Villa',
    price: 549,
    rating: 4.98,
    reviewsCount: 82,
    guests: 4,
    bedrooms: 2,
    bathrooms: 2,
    img: 'feature02.png',
    tags: ['Northern Lights', 'Heated Deck', 'Sauna'],
    amenities: ['Ocean View', 'Hot Tub', 'Fireplace', 'Sauna', 'Ski-in / Ski-out', 'Free Parking'],
    featured: true,
  },
  {
    id: 103,
    name: 'Aurora Coastline Dome Retreat',
    location: 'Senja Peninsula',
    country: 'Norway',
    type: 'Igloo / Luxury Tent',
    price: 429,
    rating: 4.91,
    reviewsCount: 53,
    guests: 2,
    bedrooms: 1,
    bathrooms: 1,
    img: 'feature03.png',
    tags: ['Panoramic Ocean View', 'Hot Tub'],
    amenities: ['Ocean View', 'Hot Tub', 'Fireplace', 'Sauna', 'Free Parking'],
    featured: true,
  },
  {
    id: 104,
    name: 'Glacier Bay Coastal Chalet',
    location: 'Snæfellsnes',
    country: 'Iceland',
    type: 'Chalet',
    price: 479,
    rating: 4.88,
    reviewsCount: 41,
    guests: 8,
    bedrooms: 4,
    bathrooms: 3,
    img: 'feature04.png',
    tags: ['Waterfront', 'Geothermal Spa', 'Fireplace'],
    amenities: ['Ocean View', 'Hot Tub', 'Fireplace', 'Kitchen', 'Free Parking', 'Pet Friendly'],
  },
  {
    id: 105,
    name: 'Midnight Tides Seaside Lodge',
    location: 'Vestmannaeyjar',
    country: 'Iceland',
    type: 'Entire Home',
    price: 360,
    rating: 4.85,
    reviewsCount: 39,
    guests: 5,
    bedrooms: 2,
    bathrooms: 2,
    img: 'feature05.png',
    tags: ['Cliffside Views', 'Private Deck'],
    amenities: ['Ocean View', 'Fireplace', 'Kitchen', 'Free Parking', 'Pet Friendly'],
  },
  {
    id: 106,
    name: 'Baltic Sea Pine Hideaway',
    location: 'Stockholm Archipelago',
    country: 'Sweden',
    type: 'Cabin',
    price: 295,
    rating: 4.92,
    reviewsCount: 77,
    guests: 4,
    bedrooms: 2,
    bathrooms: 1,
    img: 'feature06.png',
    tags: ['Lakeside Pier', 'Wood-fired Sauna'],
    amenities: ['Ocean View', 'Sauna', 'Fireplace', 'Kitchen', 'Free Parking', 'Pet Friendly'],
  },
  {
    id: 107,
    name: 'Alpine Oceanview Chalet',
    location: 'Alta Fjord',
    country: 'Norway',
    type: 'Chalet',
    price: 510,
    rating: 4.96,
    reviewsCount: 49,
    guests: 6,
    bedrooms: 3,
    bathrooms: 2,
    img: 'deal1.png',
    tags: ['Ski-to-Sea', 'Outdoor Jacuzzi'],
    amenities: ['Ocean View', 'Hot Tub', 'Sauna', 'Ski-in / Ski-out', 'Fireplace', 'Kitchen'],
  },
  {
    id: 108,
    name: 'Frost Coast Luxury Residence',
    location: 'Reykjavik Waterfront',
    country: 'Iceland',
    type: 'Villa',
    price: 680,
    rating: 4.99,
    reviewsCount: 95,
    guests: 8,
    bedrooms: 4,
    bathrooms: 4,
    img: 'deal2.png',
    tags: ['Private Chef', 'Infinity Hot Tub'],
    amenities: ['Ocean View', 'Hot Tub', 'Fireplace', 'Sauna', 'Kitchen', 'Free Parking'],
  },
  {
    id: 109,
    name: 'Fjordside Timber Retreat',
    location: 'Geirangerfjord',
    country: 'Norway',
    type: 'Cabin',
    price: 345,
    rating: 4.87,
    reviewsCount: 34,
    guests: 4,
    bedrooms: 2,
    bathrooms: 1,
    img: 'deal3.png',
    tags: ['Waterfront Terrace', 'Kayak Access'],
    amenities: ['Ocean View', 'Fireplace', 'Kitchen', 'Free Parking', 'Pet Friendly'],
  },
  {
    id: 110,
    name: 'Arctic Surf Beach House',
    location: 'Hoddevik Bay',
    country: 'Norway',
    type: 'Entire Home',
    price: 410,
    rating: 4.93,
    reviewsCount: 58,
    guests: 6,
    bedrooms: 3,
    bathrooms: 2,
    img: 'find02.png',
    tags: ['Surf Point View', 'Hot Tub', 'Drying Room'],
    amenities: ['Ocean View', 'Hot Tub', 'Fireplace', 'Kitchen', 'Free Parking'],
  },
  {
    id: 111,
    name: 'Kvaløya Oceanfront Sanctuary',
    location: 'Kvaløya Island',
    country: 'Norway',
    type: 'Villa',
    price: 590,
    rating: 4.97,
    reviewsCount: 67,
    guests: 10,
    bedrooms: 5,
    bathrooms: 4,
    img: 'find03.png',
    tags: ['Private Pier', 'Whale Watching Deck'],
    amenities: ['Ocean View', 'Hot Tub', 'Sauna', 'Fireplace', 'Kitchen', 'Free Parking'],
  },
  {
    id: 112,
    name: 'Lapland Shoreline Cabin',
    location: 'Lake Inari Shores',
    country: 'Finland',
    type: 'Cabin',
    price: 320,
    rating: 4.89,
    reviewsCount: 44,
    guests: 4,
    bedrooms: 2,
    bathrooms: 1,
    img: 'find04.png',
    tags: ['Ice Shore', 'Smoke Sauna'],
    amenities: ['Ocean View', 'Sauna', 'Fireplace', 'Kitchen', 'Free Parking', 'Pet Friendly'],
  },
  {
    id: 113,
    name: 'Barents Sea Coastal Lodge',
    location: 'Kirkenes',
    country: 'Norway',
    type: 'Chalet',
    price: 450,
    rating: 4.86,
    reviewsCount: 29,
    guests: 6,
    bedrooms: 3,
    bathrooms: 2,
    img: 'find05.png',
    tags: ['King Crab Safaris', 'Sauna'],
    amenities: ['Ocean View', 'Sauna', 'Fireplace', 'Kitchen', 'Free Parking'],
  },
  {
    id: 114,
    name: 'Glass Lagoon Beachfront Dome',
    location: 'Jökulsárlón',
    country: 'Iceland',
    type: 'Igloo / Luxury Tent',
    price: 490,
    rating: 4.94,
    reviewsCount: 71,
    guests: 2,
    bedrooms: 1,
    bathrooms: 1,
    img: 'find06.png',
    tags: ['Glacier Views', 'Stargazing Roof'],
    amenities: ['Ocean View', 'Hot Tub', 'Fireplace', 'Free Parking'],
  },
  {
    id: 115,
    name: 'Secluded Coastal Haven',
    location: 'Helgeland Coast',
    country: 'Norway',
    type: 'Entire Home',
    price: 375,
    rating: 4.9,
    reviewsCount: 38,
    guests: 6,
    bedrooms: 3,
    bathrooms: 2,
    img: 'find07.png',
    tags: ['Island Solitude', 'Panoramic Glass'],
    amenities: ['Ocean View', 'Hot Tub', 'Fireplace', 'Kitchen', 'Free Parking', 'Pet Friendly'],
  },
  {
    id: 116,
    name: 'Northern Tides Coastal Villa',
    location: 'Bodø Coast',
    country: 'Norway',
    type: 'Villa',
    price: 615,
    rating: 4.96,
    reviewsCount: 83,
    guests: 8,
    bedrooms: 4,
    bathrooms: 3,
    img: 'feature01.png',
    tags: ['Saltstraumen Views', 'Whirlpool'],
    amenities: ['Ocean View', 'Hot Tub', 'Sauna', 'Fireplace', 'Kitchen', 'Free Parking'],
  },
  {
    id: 117,
    name: 'Aurora Sands Chalet',
    location: 'Andøya Island',
    country: 'Norway',
    type: 'Chalet',
    price: 430,
    rating: 4.92,
    reviewsCount: 52,
    guests: 6,
    bedrooms: 3,
    bathrooms: 2,
    img: 'feature02.png',
    tags: ['White Sand Snowy Beach', 'Sauna'],
    amenities: ['Ocean View', 'Sauna', 'Fireplace', 'Kitchen', 'Free Parking', 'Pet Friendly'],
  },
  {
    id: 118,
    name: 'Arctic Bay Eco Retreat',
    location: 'Lyngen Alps Coast',
    country: 'Norway',
    type: 'Cabin',
    price: 395,
    rating: 4.91,
    reviewsCount: 61,
    guests: 4,
    bedrooms: 2,
    bathrooms: 1,
    img: 'feature03.png',
    tags: ['Fjord Panorama', 'Wood Stove'],
    amenities: ['Ocean View', 'Fireplace', 'Sauna', 'Kitchen', 'Free Parking'],
  },
];

const coastalPillars = [
  {
    icon: Waves,
    title: 'Stunning Ocean Views',
    desc: 'Wake up to breathtaking coastal scenery every day.',
  },
  {
    icon: Home,
    title: 'Privacy & Space',
    desc: 'Enjoy more space with your family or friends.',
  },
  {
    icon: Heart,
    title: 'Relaxing Atmosphere',
    desc: 'Unwind in peaceful coastal surroundings.',
  },
  {
    icon: Compass,
    title: 'Adventure Nearby',
    desc: 'From beach walks to winter activities.',
  },
];

const faqData = [
  {
    q: 'How warm and winter-proof are coastal beach houses?',
    a: 'All our coastal properties are specially winterized with high-performance thermal insulation, double or triple-glazed panoramic windows, radiant in-floor heating, and indoor wood-burning or stone fireplaces to keep you completely warm and cozy regardless of coastal weather.',
  },
  {
    q: 'Can I see the Northern Lights from these beach houses?',
    a: 'Yes! Many of our coastal retreats in Norway, Iceland, and Northern Scandinavia are situated away from urban light pollution along northern-facing shorelines, offering breathtaking front-row views of the Aurora Borealis directly from your private deck or heated panoramic lounge.',
  },
  {
    q: 'What amenities are typically included in coastal winter stays?',
    a: 'Our properties boast private oceanfront saunas, heated outdoor hot tubs, fully equipped chef’s kitchens, fast fiber WiFi, firewood supplies, snow gear storage, and premium organic bath and linen essentials.',
  },
  {
    q: 'Are these beachfront properties accessible during heavy snowfall?',
    a: 'Yes. Local access roads and driveways are regularly cleared by municipal and private snowplow services. We also provide detailed winter driving directions, 4WD vehicle recommendations, and local host check-in assistance.',
  },
  {
    q: 'What is the cancellation and refund policy?',
    a: 'We offer flexible cancellation policies. Most bookings can be canceled for a 100% full refund up to 14 days prior to check-in, with optional winter travel protection to cover unexpected seasonal flight disruptions.',
  },
  {
    q: 'Are pets allowed in the beachfront properties?',
    a: 'A wide selection of our coastal cabins and houses are pet-friendly. You can filter properties using our "Pet Friendly" amenity checkbox to find suitable accommodations for your four-legged companions.',
  },
  {
    q: 'Can we arrange private boat tours or private chef services?',
    a: 'Absolutely. Our dedicated local concierge team can arrange private fjord cruises, arctic fishing charters, private chefs, sauna rituals, and photography guides tailored to your stay.',
  },
];

const propertyTypes = [
  'Beach House',
  'Villa',
  'Cabin',
  'Chalet',
  'Lake House',
  'Glass Igloo & Dome',
] as const;

const amenityList = [
  'Ocean View',
  'Direct Beach Access',
  'Hot Tub',
  'Sauna',
  'Pet Friendly',
  'WiFi',
  'Kitchen',
  'Free Parking',
];

export default function BeachHouses() {
  // Filters state
  const [searchTerm, setSearchTerm] = useState('');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(5000);
  const [selectedBedrooms, setSelectedBedrooms] = useState<string>('Any');
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'recommended' | 'price-low' | 'price-high' | 'rating'>('recommended');
  const [favorites, setFavorites] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // FAQ Accordion state (open items)
  const [openFaqs, setOpenFaqs] = useState<number[]>([0, 1]);

  const toggleFaq = (index: number) => {
    setOpenFaqs((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const toggleType = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
    setCurrentPage(1);
  };

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity) ? prev.filter((a) => a !== amenity) : [...prev, amenity]
    );
    setCurrentPage(1);
  };

  const clearAllFilters = () => {
    setSearchTerm('');
    setMinPrice(0);
    setMaxPrice(5000);
    setSelectedBedrooms('Any');
    setSelectedTypes([]);
    setSelectedAmenities([]);
    setSortBy('recommended');
    setCurrentPage(1);
  };

  // Filtered & Sorted stays
  const filteredStays = useMemo(() => {
    return allBeachHouses
      .filter((stay) => {
        // Search filter (name, location, country)
        if (searchTerm.trim() !== '') {
          const q = searchTerm.toLowerCase();
          const matches =
            stay.name.toLowerCase().includes(q) ||
            stay.location.toLowerCase().includes(q) ||
            stay.country.toLowerCase().includes(q);
          if (!matches) return false;
        }

        // Price filter
        if (stay.price < minPrice) return false;
        if (maxPrice < 5000 && stay.price > maxPrice) return false;

        // Bedrooms filter
        if (selectedBedrooms !== 'Any') {
          if (selectedBedrooms === '4+') {
            if (stay.bedrooms < 4) return false;
          } else {
            if (stay.bedrooms !== parseInt(selectedBedrooms, 10)) return false;
          }
        }

        // Property Type filter
        if (selectedTypes.length > 0) {
          const matches = selectedTypes.some((t) => {
            if (t === 'Beach House') return stay.type === 'Entire Home' || (stay.type as string) === 'Beach House' || stay.name.toLowerCase().includes('beach');
            if (t === 'Lake House') return stay.type === 'Entire Home' || (stay.type as string) === 'Lake House' || stay.name.toLowerCase().includes('lake') || stay.name.toLowerCase().includes('fjord') || stay.name.toLowerCase().includes('bay');
            if (t === 'Glass Igloo & Dome') return stay.type === 'Igloo / Luxury Tent' || (stay.type as string) === 'Glass Igloo & Dome' || stay.name.toLowerCase().includes('dome') || stay.name.toLowerCase().includes('glass');
            return stay.type === t;
          });
          if (!matches) return false;
        }

        // Amenities filter
        if (selectedAmenities.length > 0) {
          const hasAll = selectedAmenities.every((a) => {
            if (a === 'Direct Beach Access') return stay.amenities.includes('Ocean View') || stay.tags.some(t => t.toLowerCase().includes('beach') || t.toLowerCase().includes('pier') || t.toLowerCase().includes('waterfront'));
            if (a === 'WiFi') return true;
            return stay.amenities.includes(a);
          });
          if (!hasAll) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        // Default: recommended
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0) || b.rating - a.rating;
      });
  }, [searchTerm, minPrice, maxPrice, selectedBedrooms, selectedTypes, selectedAmenities, sortBy]);

  // Dual price slider calculations
  const minPercent = Math.min(100, Math.max(0, Math.round((minPrice / 5000) * 100)));
  const maxPercent = Math.min(100, Math.max(0, Math.round((maxPrice / 5000) * 100)));

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Number(e.target.value), maxPrice - 100);
    setMinPrice(Math.max(0, value));
    setCurrentPage(1);
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(Number(e.target.value), minPrice + 100);
    setMaxPrice(Math.min(5000, value));
    setCurrentPage(1);
  };

  // Pagination calculation
  const totalPages = Math.ceil(filteredStays.length / itemsPerPage) || 1;
  const paginatedStays = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredStays.slice(start, start + itemsPerPage);
  }, [filteredStays, currentPage]);

  const hasActiveFilters =
    searchTerm !== '' ||
    minPrice > 0 ||
    maxPrice < 5000 ||
    selectedBedrooms !== 'Any' ||
    selectedTypes.length > 0 ||
    selectedAmenities.length > 0;

  return (
    <div className="w-full bg-white">
      {/* 1. Hero Section with Inner SearchBar */}
      <Hero
        name="beach.png"
        searchPosition="inner"
        search={<SearchBar cta="Find Retreats" chips={false} />}
        eyebrow="COASTAL WINTER RETREATS"
        title="Beach Houses"
        text="Indulge in an extraordinary winter getaway by the coast. Discover serene waterfront retreats, snowy shores, and warm, cozy fireplaces."
      />

      {/* 2. Featured Beach Houses Main Section with Sidebar Filters & Grid */}
      <section className="site-container py-12 sm:py-16 md:py-20">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 sm:pb-[35px]">
          <div>
            <span className="section-eyebrow !text-[#0284C7] tracking-wider">
              EXCLUSIVE STAYS
            </span>
            <h2 className="section-title !mt-1.5 !text-2xl sm:!text-3xl lg:!text-4xl text-[#0D1F35]">
              Featured Beach Houses
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#98A1AC] max-w-3xl font-body">
              Explore our handpicked collection of breathtaking stays nestled along scenic winter shorelines.
            </p>
          </div>

          {/* Sort By Dropdown */}
          <div className="relative inline-block shrink-0 self-start md:self-end">
            <select
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value as any);
                setCurrentPage(1);
              }}
              className="appearance-none bg-white border border-[#DCE5EE] hover:border-[#CAD7E2] text-[#0D2137] text-xs sm:text-sm font-medium rounded-[14px] pl-4 pr-8 py-2 sm:py-2.5 focus:outline-none focus:border-[#5CBDE5] cursor-pointer transition-colors"
            >
              <option value="recommended">Sort by recommended</option>
              <option value="price-low">Sort by price: low to high</option>
              <option value="price-high">Sort by price: high to low</option>
              <option value="rating">Sort by top rated</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-[#5F7387] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none stroke-[2]" />
          </div>
        </div>

        {/* Layout: Sidebar + Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-8 xl:gap-[30px] items-start">
          {/* Left Sidebar Filters Card */}
          <aside className="rounded-[20px] bg-[#F0F5FC] p-5 sm:p-6 shadow-sm sticky top-10">
            <div className="flex items-center justify-end border-b border-slate-100">
            
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={clearAllFilters}
                  className="inline-flex items-center gap-1.5 pb-4 text-xs text-[#0284C7] hover:underline font-semibold cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Reset
                </button>
              )}
            </div>

            <div className="divide-y divide-slate-100 space-y-2">
              {/* Search input */}
              <div className="pt-4">
                <label className="block text-base font-semibold text-[#082B45] mb-3">
                Location
                </label>
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setCurrentPage(1);
                    }}
                    placeholder="Search destination"
                    className="w-full pl-9 pr-3 py-[15px] text-xs sm:text-sm bg-[#fff] border border-[#E5EDF5] rounded-[12px] text-[#6B7C93] placeholder-[#6B7C93] outline-none transition"
                  />
                </div>
              </div>

              {/* Price Range Slider */}
              <div className="pt-5">
                <style>{`
                  .range-slider-thumb {
                    -webkit-appearance: none;
                    appearance: none;
                    height: 0;
                    outline: none;
                  }
                  .range-slider-thumb::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    appearance: none;
                    width: 22px;
                    height: 22px;
                    border-radius: 50%;
                    background: #42BAE4;
                    border: 3.5px solid #ffffff;
                    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.15);
                    cursor: pointer;
                    pointer-events: auto;
                    transition: transform 0.15s ease;
                  }
                  .range-slider-thumb::-webkit-slider-thumb:hover {
                    transform: scale(1.1);
                  }
                  .range-slider-thumb::-moz-range-thumb {
                    width: 22px;
                    height: 22px;
                    border-radius: 50%;
                    background: #42BAE4;
                    border: 3.5px solid #ffffff;
                    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.15);
                    cursor: pointer;
                    pointer-events: auto;
                    transition: transform 0.15s ease;
                  }
                  .range-slider-thumb::-moz-range-thumb:hover {
                    transform: scale(1.1);
                  }
                `}</style>
                <label className="block text-base font-semibold text-[#082B45] mb-3">
                  Price Range
                </label>
                <div className="relative w-full h-6 flex items-center select-none mt-2">
                  {/* Background track */}
                  <div className="absolute inset-x-0 h-[7px] rounded-full bg-[#D4EEF9]" />
                  {/* Highlighted active range */}
                  <div
                    className="absolute h-[7px] rounded-full bg-[#42BAE4]"
                    style={{
                      left: `${minPercent}%`,
                      width: `${Math.max(0, maxPercent - minPercent)}%`,
                    }}
                  />
                  {/* Min input */}
                  <input
                    type="range"
                    min={0}
                    max={5000}
                    step={50}
                    value={minPrice}
                    onChange={handleMinPriceChange}
                    className={`range-slider-thumb pointer-events-none absolute inset-x-0 w-full appearance-none bg-transparent ${
                      minPrice > 2500 ? 'z-[5]' : 'z-[3]'
                    }`}
                  />
                  {/* Max input */}
                  <input
                    type="range"
                    min={0}
                    max={5000}
                    step={50}
                    value={maxPrice}
                    onChange={handleMaxPriceChange}
                    className="range-slider-thumb pointer-events-none absolute inset-x-0 w-full appearance-none bg-transparent z-[4]"
                  />
                </div>
                <div className="flex justify-between text-sm text-[#6F8397] font-medium mt-2">
                  <span>€{minPrice.toLocaleString()}</span>
                  <span>€{maxPrice >= 5000 ? '5,000+' : maxPrice.toLocaleString()}</span>
                </div>
              </div>

              {/* Bedrooms button pills */}
              <div className="pt-5">
                <label className="block text-base font-semibold text-[#082B45] mb-3">
                  Bedrooms
                </label>
                <div className="grid grid-cols-5 gap-1.5">
                  {['Any', '1', '2', '3', '4+'].map((num) => {
                    const isActive = selectedBedrooms === num;
                    return (
                      <button
                        key={num}
                        type="button"
                        onClick={() => {
                          setSelectedBedrooms(num);
                          setCurrentPage(1);
                        }}
                        className={`py-2 text-xs font-semibold rounded-xl transition cursor-pointer text-center ${
                          isActive
                            ? 'bg-[#062541] text-white shadow-sm'
                            : 'bg-[#F8FAFC] border border-slate-200 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        {num}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Property Type Checkboxes */}
              <div className="pt-5">
                <label className="block text-base sm:text-[17px] font-bold text-[#0A1F33] mb-3.5">
                  Property Type
                </label>
                <div className="space-y-3.5">
                  {propertyTypes.map((type) => {
                    const isChecked = selectedTypes.includes(type);
                    return (
                      <label
                        key={type}
                        className="flex items-center gap-3.5 text-sm sm:text-[15px] font-normal text-[#0B2138] cursor-pointer select-none group"
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleType(type)}
                          className="sr-only"
                        />
                        <div
                          className={`w-[22px] h-[22px] rounded-[6px] flex items-center justify-center transition-all shrink-0 ${
                            isChecked
                              ? 'bg-[#42BAE4] border border-[#42BAE4]'
                              : 'bg-white border border-[#D5E0EB] group-hover:border-[#B7CCD9]'
                          }`}
                        >
                          {isChecked && (
                            <Check className="w-3.5 h-3.5 text-white stroke-[2.8]" />
                          )}
                        </div>
                        <span>{type}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Amenities Checkboxes */}
              <div className="pt-5">
                <label className="block text-base sm:text-[17px] font-bold text-[#0A1F33] mb-3.5">
                  Amenities
                </label>
                <div className="space-y-3.5">
                  {amenityList.map((amenity) => {
                    const isChecked = selectedAmenities.includes(amenity);
                    return (
                      <label
                        key={amenity}
                        className="flex items-center gap-3.5 text-sm sm:text-[15px] font-normal text-[#0B2138] cursor-pointer select-none group"
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleAmenity(amenity)}
                          className="sr-only"
                        />
                        <div
                          className={`w-[22px] h-[22px] rounded-[6px] flex items-center justify-center transition-all shrink-0 ${
                            isChecked
                              ? 'bg-[#42BAE4] border border-[#42BAE4]'
                              : 'bg-white border border-[#D5E0EB] group-hover:border-[#B7CCD9]'
                          }`}
                        >
                          {isChecked && (
                            <Check className="w-3.5 h-3.5 text-white stroke-[2.8]" />
                          )}
                        </div>
                        <span>{amenity}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Clear button */}
              <div className="pt-6">
                <button
                  type="button"
                  onClick={clearAllFilters}
                  className="w-full py-3.5 text-sm sm:text-base font-semibold rounded-[14px] border border-[#DCE5EE] bg-white hover:bg-slate-50 text-[#0B2138] transition cursor-pointer shadow-sm active:scale-[0.99]"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          </aside>

          {/* Right Main Content (Stays Grid + Pagination) */}
          <div className="w-full">
            {/* Results count bar */}
            {/* <div className="flex items-center justify-between pb-4 text-xs sm:text-sm text-slate-500">
              <p>
                Showing{' '}
                <span className="font-semibold text-[#0D1F35]">
                  {filteredStays.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} -{' '}
                  {Math.min(currentPage * itemsPerPage, filteredStays.length)}
                </span>{' '}
                of <span className="font-semibold text-[#0D1F35]">{filteredStays.length}</span> coastal properties
              </p>
            </div> */}

            {/* 3x3 Cards Grid */}
            {paginatedStays.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-[30px]">
                {paginatedStays.map((stay) => {
                  const isFav = favorites.includes(stay.id);
                  return (
                    <div
                      key={stay.id}
                      className="group rounded-[18px] border border-[#E2E8F0] bg-white p-4 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                    >
                      <div>
                        {/* Image Container with Badge & Favorite Heart */}
                        <div className="relative w-full aspect-[4/3] overflow-hidden rounded-[8px]">
                          <img
                            src={img(stay.img)}
                            alt={stay.name}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                         
                        </div>

                        {/* Property Details */}
                        <div className="pt-3.5">
                          <div className="flex items-center justify-between text-xs text-slate-400">
                            <span className="flex items-center gap-1 text-[#98A1AC] truncate">
                              <MapPin className="w-3.5 h-3.5 text-[#98A1AC] shrink-0" />
                              {stay.location}, {stay.country}
                            </span>
                          </div>

                          <h4 className="font-head text-base font-semibold text-[#02213B] mt-[4px] line-clamp-1 group-hover:text-[#0284C7] transition-colors">
                            {stay.name}
                          </h4>

                          {/* Guests and Bedrooms */}
                          <div className="flex items-center gap-3 text-xs text-[#98A1AC] mt-[7px font-body">
                            <span className="flex items-center gap-1">
                              <Users className="w-3.5 h-3.5 text-[#98A1AC] shrink-0" />
                              {stay.guests} guests
                            </span>
                            <span className="flex items-center gap-1">
                              <Bed className="w-3.5 h-3.5 text-[#98A1AC] shrink-0" />
                              {stay.bedrooms} bedrooms
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Card Footer: Price & Book Now */}
                      <div className="mt-4 flex items-center justify-between">
                        <div>
                          <div className="flex items-baseline gap-1">
                            <span className="font-head text-base font-bold text-[#02213B]">
                              €{stay.price}
                            </span>
                            <span className="text-xs text-[#98A1AC]">/night</span>
                          </div>
                        </div>

                        <Link
                          to={`/stays/${stay.id}`}
                          className="inline-flex items-center justify-center rounded-[9px] bg-[#02213B] hover:bg-[#0284C7] px-4 py-2 text-xs font-semibold text-white transition-all active:scale-95 shadow-sm whitespace-nowrap cursor-pointer"
                        >
                          View Stay
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-16 px-4 rounded-2xl border border-dashed border-slate-200">
                <p className="text-base font-semibold text-[#0D1F35]">
                  No beach houses found matching your filters.
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  Try adjusting your search criteria, price range, or clearing filters.
                </p>
                <button
                  type="button"
                  onClick={clearAllFilters}
                  className="mt-4 px-4 py-2 text-xs font-semibold rounded-xl bg-[#062541] text-white hover:bg-[#0284C7] transition"
                >
                  Clear Filters
                </button>
              </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="mt-10 sm:mt-12 flex items-center justify-center gap-[5px]">
                <button
                  type="button"
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  disabled={currentPage === 1}
                  className="w-[46px] h-[46px] rounded-[17px] border border-[#E5EDF5] flex items-center justify-center text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer"
                  aria-label="Previous page"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => {
                  const isActive = currentPage === num;
                  return (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setCurrentPage(num)}
                      className={`w-[46px] h-[46px] rounded-[17px] text-base font-semibold transition cursor-pointer flex items-center justify-center ${
                        isActive
                          ? 'bg-[#062541] text-white shadow-sm'
                          : 'border border-[#E5EDF5] text-[#082B45] hover:bg-slate-50'
                      }`}
                    >
                      {num}
                    </button>
                  );
                })}

                <button
                  type="button"
                  onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="w-[46px] h-[46px] rounded-[17px] border border-[#E5EDF5] flex items-center justify-center text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer"
                  aria-label="Next page"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 3. "WHY STAY IN A BEACH HOUSE" Section */}
      <section className="bg-[#F0F5FA] py-14 sm:py-20 lg:py-24">
        <div className="site-container text-center">
          <span className="section-eyebrow">
            WHY STAY IN A BEACH HOUSE
          </span>
          <h2 className="section-title">
            A Different Kind of Coastal Escape
          </h2>
          <p className="mx-auto mt-3.5 max-w-3xl text-xs sm:text-sm md:text-base text-[#98A1AC] leading-relaxed font-body">
            Beach houses offer the perfect combination of natural beauty, privacy and modern comfort, making your winter coastal getaway truly special.
          </p>

          <div className="mt-10 sm:mt-12 lg:mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {coastalPillars.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="rounded-[28px] bg-white pt-9 pb-8 px-6 sm:px-7 border border-[#E2ECF2] text-center flex flex-col items-center hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-[58px] h-[58px] rounded-[20px] bg-[#EAF3FA] flex items-center justify-center text-[#0D1F35] mb-6">
                  <Icon className="w-6 h-6 stroke-[1.8]" />
                </div>
                <h3 className="font-head text-[17px] sm:text-lg font-bold text-[#0D1F35] mb-2.5">
                  {title}
                </h3>
                <p className="text-xs sm:text-[13.5px] text-[#7A8B9C] leading-relaxed font-body max-w-[210px]">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. "Choose Your Winter Experience" Section */}
      <Experiences
        eyebrow="CHOOSE YOUR ADVENTURE"
        title="Choose Your Winter Experience"
        sub="Find the perfect winter stay for the experience you came for."
        bg="bg-white"
        linkTo="/experiences"
      />

      {/* 5. "Beach Houses FAQ" Section */}
      <Section tone="light" className="!bg-white">
        <div className="text-center mb-10">
          <p className="section-eyebrow">
            FREQUENTLY ASKED QUESTIONS
          </p>
          <h2 className="section-title">
            Beach Houses FAQ
          </h2>
        </div>

        <div className="mx-auto max-w-[954px] border-t border-[#D4DDE6] divide-y divide-[#D4DDE6]">
          {faqData.map((faq, i) => {
            const isOpen = openFaqs.includes(i);
            return (
              <div key={faq.q} className="transition-colors">
                <button
                  type="button"
                  onClick={() => toggleFaq(i)}
                  className="flex w-full items-start justify-between text-left py-5 sm:py-[28px] cursor-pointer group select-none"
                  aria-expanded={isOpen}
                >
                  <div className="pr-4">
                    <span className="text-base sm:text-lg font-semibold text-[#06243A] group-hover:text-[#5CBDE5] transition-colors leading-snug block">
                      {faq.q}
                    </span>
                    {isOpen && (
                      <p className="mt-3 text-sm sm:text-base text-[#6B8090] font-normal leading-relaxed pr-4 sm:pr-10 animate-in fade-in duration-200">
                        {faq.a}
                      </p>
                    )}
                  </div>
                  <div className="w-7 h-7 sm:w-[30px] sm:h-[30px] rounded-full border border-[#D4DDE6] flex items-center justify-center text-[#64748B] shrink-0 group-hover:border-[#94A3B8] transition-colors">
                    {isOpen ? (
                      <Minus className="w-4 h-4 text-[#6B8090]" strokeWidth={2} />
                    ) : (
                      <Plus className="w-4 h-4 text-[#6B8090]" strokeWidth={2} />
                    )}
                  </div>
                </button>
              </div>
            );
          })}
        </div>
      </Section>

      {/* Extra bottom padding to blend smoothly with footer newsletter */}
      <div className="h-6 sm:h-10 bg-[#FAFBFD]" />
    </div>
  );
}
