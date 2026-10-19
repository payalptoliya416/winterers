import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import SearchBar from '../components/SearchBar';
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
    icon: Sparkles,
    title: 'Curated Coastal Stays',
    desc: 'Handpicked beachfront properties inspected for winter insulation, scenic vistas, and supreme comfort.',
  },
  {
    icon: UserCheck,
    title: 'Personalized Service',
    desc: 'Local coastal hosts ready to assist with fireside wood delivery, private chefs, and itinerary planning.',
  },
  {
    icon: Compass,
    title: 'Unrivaled Experiences',
    desc: 'From private seaside sauna sessions to fjord cruises and aurora viewings over arctic waters.',
  },
  {
    icon: Headphones,
    title: '24/7 Dedicated Support',
    desc: 'Around-the-clock winter travel assistance ensuring seamless booking, arrival, and unforgettable stays.',
  },
];

const winterExperiences = [
  { title: 'Skiing & Snowboarding', img: 'ex01.png' },
  { title: 'Northern Lights Hunt', img: 'aurora.jpg' },
  { title: 'Fjord & Coastal Safaris', img: 'destination-norway.png' },
  { title: 'Seaside Hot Tubs & Spa', img: 'hottub.jpg' },
  { title: 'Winter Hiking & Trails', img: 'mountain.jpg' },
  { title: 'Snowmobiling Adventures', img: 'ex06.png' },
  { title: 'Fireside Dining', img: 'l-cozy.jpg' },
  { title: 'Ice & Sea Fishing', img: 'ex08.png' },
  { title: 'Coastal Photography', img: 'feature03.png' },
  { title: 'Shoreline Golf & Wildlife', img: 'golf.png' },
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

const propertyTypes = ['Entire Home', 'Cabin', 'Chalet', 'Villa', 'Igloo / Luxury Tent'] as const;
const amenityList = [
  'Ocean View',
  'Hot Tub',
  'Fireplace',
  'Sauna',
  'Pet Friendly',
  'Ski-in / Ski-out',
  'Kitchen',
  'Free Parking',
];

export default function BeachHouses() {
  // Filters state
  const [searchTerm, setSearchTerm] = useState('');
  const [maxPrice, setMaxPrice] = useState(800);
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
    setMaxPrice(800);
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
        if (stay.price > maxPrice) return false;

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
          if (!selectedTypes.includes(stay.type)) return false;
        }

        // Amenities filter
        if (selectedAmenities.length > 0) {
          const hasAll = selectedAmenities.every((a) => stay.amenities.includes(a));
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
  }, [searchTerm, maxPrice, selectedBedrooms, selectedTypes, selectedAmenities, sortBy]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredStays.length / itemsPerPage) || 1;
  const paginatedStays = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredStays.slice(start, start + itemsPerPage);
  }, [filteredStays, currentPage]);

  const hasActiveFilters =
    searchTerm !== '' ||
    maxPrice < 800 ||
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
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 sm:pb-10 border-b border-slate-200">
          <div>
            <span className="section-eyebrow !text-[#0284C7] tracking-wider">
              EXCLUSIVE STAYS
            </span>
            <h2 className="section-title !mt-1.5 !text-2xl sm:!text-3xl lg:!text-4xl text-[#0D1F35]">
              Featured Beach Houses
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-500 max-w-2xl font-body">
              Explore our handpicked collection of breathtaking stays nestled along scenic winter shorelines.
            </p>
          </div>

          {/* Sort By Dropdown */}
          <div className="flex items-center gap-3 shrink-0 self-start md:self-end">
            <span className="text-xs sm:text-sm text-slate-500 font-medium">Sort by:</span>
            <div className="relative inline-block">
              <select
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value as any);
                  setCurrentPage(1);
                }}
                className="appearance-none bg-white border border-slate-200 text-[#0D1F35] text-xs sm:text-sm font-semibold rounded-xl pl-3.5 pr-8 py-2 sm:py-2.5 focus:outline-none focus:border-[#7EC8E3] cursor-pointer shadow-sm"
              >
                <option value="recommended">Recommended</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Layout: Sidebar + Grid */}
        <div className="mt-8 sm:mt-10 grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-8 xl:gap-[30px] items-start">
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

            <div className="divide-y divide-slate-100 space-y-5">
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
                    placeholder="e.g. Lofoten, Norway..."
                    className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-[#F8FAFC] border border-[#E5EDF5] rounded-[12px] text-[#6B7C93] placeholder-[#6B7C93] outline-none transition"
                  />
                </div>
              </div>

              {/* Price Range Slider */}
              <div className="pt-5">
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-base font-semibold text-[#082B45] mb-3">
                    Price Range
                  </label>
                  <span className="text-xs font-bold text-[#0284C7]">
                    Up to €{maxPrice}/nt
                  </span>
                </div>
                <input
                  type="range"
                  min={200}
                  max={800}
                  step={20}
                  value={maxPrice}
                  onChange={(e) => {
                    setMaxPrice(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="w-full accent-[#062541] cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-slate-400 font-medium mt-1">
                  <span>€200</span>
                  <span>€800+</span>
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
                <label className="block text-base font-semibold text-[#082B45] mb-3">
                  Property Type
                </label>
                <div className="space-y-2">
                  {propertyTypes.map((type) => {
                    const isChecked = selectedTypes.includes(type);
                    return (
                      <label
                        key={type}
                        className="flex items-center gap-2.5 text-xs sm:text-[13px] text-slate-700 hover:text-[#062541] cursor-pointer select-none"
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleType(type)}
                          className="w-4 h-4 rounded border-slate-300 text-[#062541] focus:ring-[#7EC8E3] accent-[#062541] cursor-pointer"
                        />
                        <span>{type}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Amenities Checkboxes */}
              <div className="pt-5">
                <label className="block text-base font-semibold text-[#082B45] mb-3">
                  Amenities
                </label>
                <div className="space-y-2">
                  {amenityList.map((amenity) => {
                    const isChecked = selectedAmenities.includes(amenity);
                    return (
                      <label
                        key={amenity}
                        className="flex items-center gap-2.5 text-xs sm:text-[13px] text-slate-700 hover:text-[#062541] cursor-pointer select-none"
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleAmenity(amenity)}
                          className="w-4 h-4 rounded border-slate-300 text-[#062541] focus:ring-[#7EC8E3] accent-[#062541] cursor-pointer"
                        />
                        <span>{amenity}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Clear button */}
              <div className="pt-5">
                <button
                  type="button"
                  onClick={clearAllFilters}
                  className="w-full py-2.5 text-xs sm:text-sm font-semibold rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 transition cursor-pointer"
                >
                  Clear All Filters
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
                      <div className="mt-4 pt-3.5 flex items-center justify-between">
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
              <div className="mt-10 sm:mt-12 flex items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  disabled={currentPage === 1}
                  className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer"
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
                      className={`w-9 h-9 rounded-full text-xs font-semibold transition cursor-pointer flex items-center justify-center ${
                        isActive
                          ? 'bg-[#062541] text-white shadow-sm'
                          : 'border border-slate-200 text-slate-700 hover:bg-slate-50'
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
                  className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer"
                  aria-label="Next page"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 3. "A Different Kind of Coastal Escape" Section */}
      <section className="bg-[#F0F5FC] py-14 sm:py-18 md:py-[110px]">
        <div className="site-container text-center">
          <span className="section-eyebrow">
            WHAT SETS US APART
          </span>
          <h2 className="section-title">
            A Different Kind of Coastal Escape
          </h2>
          <p className="mx-auto mt-3 max-w-3xl text-xs sm:text-sm md:text-base text-[#98A1AC] leading-relaxed font-body">
           Beach houses offer the perfect combination of natural beauty, privacy and modern comfort, making your winter coastal getaway truly special.
          </p>

          <div className="mt-10 sm:mt-[25px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[32px]">
            {coastalPillars.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="rounded-[22px] bg-white p-6 sm:p-7 border border-[#DDE8F0] text-center flex flex-col items-center hover:-translate-y-1 hover:shadow-md transition-all duration-300"
              >
                <div className="w-[76px] h-[76px] rounded-[28px] bg-[#E8F1F8] flex items-center justify-center text-[#1A3A5C] mb-[25px]">
                  <Icon className="w-6 h-6 stroke-[1.8]" />
                </div>
                <h3 className="font-head text-base sm:text-lg font-bold text-[#0A1628] mb-[15px]">
                  {title}
                </h3>
                <p className="text-xs sm:text-sm text-[#6B8299] leading-relaxed font-body">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. "Choose Your Winter Experience" Section */}
      <section className="site-container py-14 sm:py-18 md:py-24">
        <div className="text-center">
          <span className="section-eyebrow !text-[#0284C7] tracking-wider">
            EXPERIENCES & ACTIVITIES
          </span>
          <h2 className="section-title !mt-2 text-2xl sm:text-3xl lg:text-[36px] text-[#0D1F35]">
            Choose Your Winter Experience
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-xs sm:text-sm md:text-base text-slate-500 leading-relaxed font-body">
            Complement your coastal beach house stay with handpicked winter excursions and coastal adventures.
          </p>
        </div>

        {/* 10 Experience Cards Grid (2 rows x 5 columns on desktop) */}
        <div className="mt-10 sm:mt-14 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4 md:gap-5">
          {winterExperiences.map((exp) => (
            <Link
              key={exp.title}
              to="/experiences"
              className="group relative block aspect-[4/3] sm:h-[180px] w-full overflow-hidden rounded-2xl shadow-sm hover:shadow-md transition-all duration-300"
            >
              <img
                src={img(exp.img)}
                alt={exp.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#062541]/90 via-[#062541]/35 to-transparent" />
              {/* Title label at bottom */}
              <div className="absolute inset-x-3 bottom-3 flex items-center justify-between">
                <span className="font-head text-xs sm:text-sm font-semibold text-white drop-shadow-sm line-clamp-1">
                  {exp.title}
                </span>
                <span className="w-5 h-5 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white shrink-0 group-hover:translate-x-0.5 transition-transform">
                  <ChevronRight className="w-3 h-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 5. "Beach Houses FAQ" Section */}
      <section className="py-14 sm:py-18 md:py-24">
        <div className="site-container max-w-4xl">
          <div className="text-center mb-10 sm:mb-12">
            <span className="section-eyebrow !text-[#0284C7] tracking-wider">
              FREQUENTLY ASKED QUESTIONS
            </span>
            <h2 className="section-title !mt-2 text-2xl sm:text-3xl lg:text-[36px] text-[#0D1F35]">
              Beach Houses FAQ
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-xs sm:text-sm text-slate-500 leading-relaxed font-body">
              Everything you need to know about booking and enjoying an extraordinary winter coastal stay.
            </p>
          </div>

          {/* Accordion List */}
          <div className="space-y-3 sm:space-y-3.5">
            {faqData.map((faq, idx) => {
              const isOpen = openFaqs.includes(idx);
              return (
                <div
                  key={faq.q}
                  className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm transition-all"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className="w-full px-5 sm:px-7 py-4 sm:py-5 flex items-center justify-between gap-4 text-left font-head text-sm sm:text-base font-semibold text-[#0D1F35] hover:text-[#0284C7] transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <span className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 shrink-0 transition-transform">
                      {isOpen ? (
                        <Minus className="w-3.5 h-3.5 text-[#0284C7]" />
                      ) : (
                        <Plus className="w-3.5 h-3.5" />
                      )}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-5 sm:px-7 pb-5 sm:pb-6 text-xs sm:text-sm text-slate-600 font-body leading-relaxed border-t border-slate-100 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Extra bottom padding to blend smoothly with footer newsletter */}
      <div className="h-6 sm:h-10 bg-[#FAFBFD]" />
    </div>
  );
}
