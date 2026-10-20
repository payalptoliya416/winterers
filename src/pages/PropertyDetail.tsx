import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAppDispatch as useDispatch, useAppSelector as useSelector } from '../store/hooks';
import { toggleSave, selectSorted } from '../store/staysSlice';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Mousewheel } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import {
  Star,
  MapPin,
  Heart,
  Share2,
  Users,
  Bed,
  BedDouble,
  Bath,
  Flame,
  FireExtinguisher,
  Telescope,
  Mountain,
  Utensils,
  Navigation,
  Armchair,
  Thermometer,
  Wifi,
  Tv,
  Columns2,
  Car,
  HeartPulse,
  Droplets,
  Wind,
  ChefHat,
  Coffee,
  Refrigerator,
  Sparkles,
  ShieldCheck,
  BadgeCheck,
  Check,
  ChevronLeft,
  ChevronRight,
  X,
  Grid,
  Calendar,
  Clock,
  Lock,
  MessageSquare,
  MessageCircle,
  Award,
  Waves,
  Key,
  Compass,
  ArrowRight,
  LayoutGrid,
  Maximize2,
  Minimize2,
  Eye,
} from 'lucide-react';
import { img } from '../data';

const galleryPhotos = [
  { url: 'p-main.jpg', title: 'The Cabin — Alpine Timber Exterior & Snowy Peaks', category: 'The Cabin' },
  { url: 'p-inside.jpg', title: 'Inside — Handcrafted Fireside Living Lounge', category: 'Interior' },
  { url: 'p-view.jpg', title: 'The View — Night Atmosphere by the Fireplace', category: 'Interior' },
  { url: 'aurora.jpg', title: 'After Dark — Aurora Borealis Over the Fjord Deck', category: 'Northern Lights' },
  { url: 'p-after.jpg', title: 'Candlelight Dining Space with Fjord Panorama', category: 'Interior' },
  { url: 'hottub.jpg', title: 'Steaming Outdoor Cedar Jacuzzi with Mountain Backdrop', category: 'Wellness & Spa' },
  { url: 'feature01.png', title: 'Twilight Exterior & Snow-Dusted Forest', category: 'The Cabin' },
  { url: 'feature02.png', title: 'Illuminated Coastal Chalet & Heated Balcony', category: 'The Cabin' },
  { url: 'feature03.png', title: 'Panoramic Glass Lounge Looking Out to the Fjords', category: 'Interior' },
  { url: 'feature04.png', title: 'Master Bedroom with Private Snowy Balcony', category: 'Interior' },
  { url: 'feature05.png', title: 'Wood-Fired Finnish Cedar Sauna Session', category: 'Wellness & Spa' },
  { url: 'feature06.png', title: 'Shoreline Deck & Private Arctic Pier', category: 'Views' },
  { url: 'find01.png', title: 'Nordic Breakfast Nook with Morning Alpine Sun', category: 'Interior' },
  { url: 'find02.png', title: 'Snowfall Outside Triple-Glazed Panoramic Windows', category: 'Views' },
  { url: 'find03.png', title: 'Luxury Rain Shower & Stone Basin En-Suite', category: 'Interior' },
  { url: 'find04.png', title: 'Heated Ski Gear Drying Room & Boot Warmers', category: 'Amenities' },
  { url: 'find05.png', title: 'Blue Hour Twilight Reflection on Arctic Waters', category: 'Views' },
  { url: 'find06.png', title: 'Gourmet Chef Kitchen with Espresso Bar', category: 'Interior' },
  { url: 'find07.png', title: 'Second Bedroom with Handcrafted Wood Finishes', category: 'Interior' },
  { url: 'deal1.png', title: 'Starlight Soak Beneath Arctic Constellations', category: 'Wellness & Spa' },
  { url: 'deal2.png', title: 'Warm Wool Throw Blankets & Reading Nook', category: 'Interior' },
  { url: 'deal3.png', title: 'Private Snowshoe Trail Starting from Deck', category: 'Views' },
  { url: 'hero-cabin.png', title: 'Golden Hour Mountain Peak Reflections', category: 'The Cabin' },
  { url: 'beach.png', title: 'Frosty Coastal Shoreline at Dawn', category: 'Views' },
];

const placeAmenities = [
  {
    category: 'Comfort',
    icon: Armchair,
    items: [
      { name: 'Fireplace', icon: Flame },
      { name: 'Heating', icon: Thermometer },
      { name: 'Wi-Fi', icon: Wifi },
      { name: 'Smart TV', icon: Tv },
    ],
  },
  {
    category: 'Outdoor',
    icon: Mountain,
    items: [
      { name: 'Private Terrace', icon: Columns2 },
      { name: 'Mountain View', icon: Mountain },
      { name: 'Fire Pit', icon: Flame },
      { name: 'Private Parking', icon: Car },
    ],
  },
  {
    category: 'Wellness',
    icon: HeartPulse,
    items: [
      { name: 'Sauna', icon: Waves },
      { name: 'Hot Tub', icon: Droplets },
      { name: 'Spa Amenities', icon: Wind },
    ],
  },
  {
    category: 'Kitchen',
    icon: Utensils,
    items: [
      { name: 'Full Kitchen', icon: ChefHat },
      { name: 'Coffee Machine', icon: Coffee },
      { name: 'Dining Area', icon: Utensils },
      { name: 'Refrigerator', icon: Refrigerator },
    ],
  },
];

const nearbyExperiences = [
  {
    id: 1,
    name: 'The Snowy Pine Cabin',
    country: 'Finland',
    price: 289,
    guests: 6,
    beds: 3,
    tags: 'Hot tub · Mountain views · Fireplace',
    img: 'feature01.png',
  },
  {
    id: 2,
    name: 'The Snowy Pine Cabin',
    country: 'Chamonix, France',
    price: 749,
    guests: 10,
    beds: 5,
    tags: 'Ski-in/ski-out · Private chef',
    img: 'feature02.png',
  },
  {
    id: 3,
    name: 'Aurora Glass Lodge',
    country: 'Tromsø, Norway',
    price: 459,
    guests: 2,
    beds: 1,
    tags: 'Northern Lights view · Sauna',
    img: 'feature03.png',
  },
  {
    id: 4,
    name: 'Nordic Forest Retreat',
    country: 'Rovaniemi, Finland',
    price: 319,
    guests: 4,
    beds: 2,
    tags: 'Lakeside · Outdoor sauna · Ski',
    img: 'feature04.png',
  },
  {
    id: 5,
    name: 'Alpine Ridge Chalet',
    country: 'Zermatt, Switzerland',
    price: 610,
    guests: 8,
    beds: 4,
    tags: 'Matterhorn view · Fireplace · Spa',
    img: 'feature05.png',
  },
  {
    id: 6,
    name: 'Arctic Haven Lodge',
    country: 'Lofoten, Norway',
    price: 540,
    guests: 6,
    beds: 3,
    tags: 'Arctic ocean deck · Sauna · Aurora',
    img: 'feature06.png',
  },
];

export default function PropertyDetail() {
  const { id = '101' } = useParams();
  const d = useDispatch();
  const saved = useSelector((s) => s.stays.saved).includes(+id);

  // Gallery Lightbox Modal state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [galleryViewMode, setGalleryViewMode] = useState<'slideshow' | 'grid'>('slideshow');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Booking Card state
  const [checkIn, setCheckIn] = useState('2026-11-14');
  const [checkOut, setCheckOut] = useState('2026-11-19');
  const [guestCount, setGuestCount] = useState(2);
  const [guestDropdown, setGuestDropdown] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Amenities modal state
  const [showAllAmenities, setShowAllAmenities] = useState(false);

  // Calculate nights
  const nights = 5;
  const pricePerNight = 389;
  const staySubtotal = pricePerNight * nights;
  const cleaningFee = 65;
  const serviceFee = 48;
  const totalPrice = staySubtotal + cleaningFee + serviceFee;

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      if (e.key === 'Escape') setLightboxOpen(false);
      if (e.key === 'ArrowRight') setPhotoIndex((i) => (i + 1) % galleryPhotos.length);
      if (e.key === 'ArrowLeft') setPhotoIndex((i) => (i - 1 + galleryPhotos.length) % galleryPhotos.length);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen]);

  const openLightboxAt = (index: number) => {
    setPhotoIndex(index);
    setLightboxOpen(true);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  return (
    <div className="w-full pt-24 sm:pt-32 pb-16">
      {/* 1. Breadcrumbs */}
      <div className="w-full px-3 sm:px-6 mb-3 sm:mb-3.5">
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-[13px] text-slate-500 font-body">
          <Link to="/stays" className="hover:text-[#062541] transition-colors">Winter Stays</Link>
          <span className="text-[#6B7F96] font-normal px-0.5">/</span>
          <Link to="/stays" className="hover:text-[#062541] transition-colors">Norway</Link>
          <span className="text-[#6B7F96] font-normal px-0.5">/</span>
          <Link to="/stays" className="hover:text-[#062541] transition-colors">Northern Norway</Link>
          <span className="text-[#6B7F96] font-normal px-0.5">/</span>
          <span className="text-[#0D1F35] font-semibold truncate">Arktis Fjord Cabin</span>
        </nav>
      </div>

      {/* 2. Hero Gallery Section - Full width outside container */}
      <div className="w-full px-3 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-5 h-full min-h-[800px]">
          {/* Big Main Image (Left, spans 8 cols) */}
          <div
            onClick={() => openLightboxAt(0)}
            className="lg:col-span-8 relative h-full rounded-[4px] overflow-hidden cursor-pointer group"
          >
            <img
              src={img(galleryPhotos[0].url)}
              alt={galleryPhotos[0].title}
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent pointer-events-none" />
            <span className="absolute bottom-3.5 left-3.5 sm:bottom-4 sm:left-5 text-sm font-medium uppercase tracking-[0.12em] text-white">
              THE CABIN
            </span>

            {/* Mobile-only "View all 24 photos" Button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                openLightboxAt(0);
              }}
              className="lg:hidden absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-lg bg-white/95 hover:bg-white text-[#0D1F35] px-3 py-1.5 text-xs font-medium shadow-sm backdrop-blur-sm transition-colors cursor-pointer z-10 border border-slate-200/80"
            >
              <Grid className="w-3.5 h-3.5 text-[#062541]" />
              <span>View all 24 photos</span>
            </button>
          </div>

          {/* Right 3 Images (Right, spans 4 cols) */}
          <div className="hidden lg:grid lg:col-span-4 grid-rows-[1.32fr_1fr] gap-3 sm:gap-5 h-full">
            {/* Top Right Image: Inside */}
            <div
              onClick={() => openLightboxAt(1)}
              className="relative h-full rounded-[4px] overflow-hidden cursor-pointer group"
            >
              <img
                src={img(galleryPhotos[1].url)}
                alt={galleryPhotos[1].title}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent pointer-events-none" />
              <span className="absolute bottom-3.5 left-3.5 text-xs font-semibold uppercase tracking-[0.12em] text-white/95 drop-shadow-md">
                INSIDE
              </span>
            </div>

            {/* Bottom 2 Images split 50/50 */}
            <div className="grid grid-cols-2 gap-3 sm:gap-5 h-full">
              {/* Bottom Left: The View */}
              <div
                onClick={() => openLightboxAt(2)}
                className="relative h-full rounded-[4px] overflow-hidden cursor-pointer group"
              >
                <img
                  src={img(galleryPhotos[2].url)}
                  alt={galleryPhotos[2].title}
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent pointer-events-none" />
                <span className="absolute bottom-3.5 left-3.5 text-xs font-semibold uppercase tracking-[0.12em] text-white/95 drop-shadow-md">
                  THE VIEW
                </span>
              </div>

              {/* Bottom Right: After Dark */}
              <div
                onClick={() => openLightboxAt(3)}
                className="relative h-full rounded-[4px] overflow-hidden cursor-pointer group"
              >
                <img
                  src={img(galleryPhotos[3].url)}
                  alt={galleryPhotos[3].title}
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent pointer-events-none" />
                <span className="absolute bottom-3.5 left-3.5 text-xs font-semibold uppercase tracking-[0.12em] text-white/95 drop-shadow-md">
                  AFTER DARK
                </span>

                {/* "View all 24 photos" Button at bottom right */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    openLightboxAt(0);
                  }}
                  className="absolute bottom-3 right-3 sm:bottom-3.5 sm:right-3.5 inline-flex items-center gap-1.5 sm:gap-2 rounded-lg bg-white/95 hover:bg-white text-[#0D1F35] px-3 sm:px-3.5 py-1.5 sm:py-2 text-xs sm:text-[13px] font-medium shadow-sm backdrop-blur-sm transition-colors cursor-pointer z-10 border border-slate-200/80"
                >
                  <Grid className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#062541]" />
                  <span>View all 24 photos</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Main Content + Sticky Booking Sidebar Layout */}
      <div className="w-full px-4 sm:px-6 lg:px-8 mt-8 sm:mt-12 site-container">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] xl:grid-cols-[1fr_495px] gap-8 lg:gap-[35px] items-start">
          {/* Left Column: Details (Scrollable) */}
          <div className="space-y-8 sm:space-y-10">
            {/* Title & Actions */}
            <div>
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div>
                  <h1 className="font-head text-2xl sm:text-3xl lg:text-[32px] font-medium text-[#0D1F3C] leading-tight">
                    Entire cabin in Tromsø, Northern Norway
                  </h1>
                  <p className="mt-[19px] text-xs sm:text-sm text-[#7B8FA6] font-body font-medium">
                    Tromsø, Northern Norway
                  </p>
                </div>

                <div className="flex items-center gap-[9px] shrink-0">
                  <button
                    type="button"
                    onClick={() => {
                      if (navigator.share) {
                        navigator.share({ title: 'Entire cabin in Tromsø', url: window.location.href });
                      } else {
                        navigator.clipboard.writeText(window.location.href);
                        alert('Link copied to clipboard!');
                      }
                    }}
                    className="inline-flex items-center gap-[11px] rounded-[8px] border border-[#E2E8F0] px-[15px] py-[10px] text-base font-medium text-[#0D1F3C] hover:bg-slate-50 transition cursor-pointer"
                  >
                    <Share2 className="w-4 h-4 text-[#0D1F3C]" />
                    <span>Share</span>
                  </button>
                </div>
              </div>

              <p className="mt-4 text-xs sm:text-sm md:text-base leading-relaxed text-[#7B8FA6] font-body">
                Nestled along the edge of a pristine Arctic fjord, this handcrafted log cabin is a sanctuary of warmth, silence, and breathtaking natural beauty. Surrounded by snow-dusted pine forest with panoramic mountain views — and one of the best northern lights viewing locations in all of Norway. Floor-to-ceiling panoramic windows frame panoramic vistas of snow-blanketed fjords and Arctic mountain peaks, while cozy interiors invite you to unwind by the crackling fireplace.
              </p>
            </div>

            {/* Guest Favourite Rating Badge Card */}
            <div className="w-full rounded-[17px] border border-[#DCDCDC] px-[38px] sm:px-8 py-5 sm:py-[35px">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
                {/* Left: Laurel Wreath + Headline */}
                <div className="flex flex-col sm:flex-row items-center gap-5 sm:gap-7 text-center sm:text-left">
                  {/* Golden Laurel Wreath with Guest favourite */}
                  <div className="flex items-center gap-2 sm:gap-2.5 shrink-0 select-none">
                     <img
                  src={img('fav.png')}
                  alt="Guest"
                  className="w-full h-full object-cover"
                />
                  </div>

                  {/* Headline */}
                  <div className="text-base sm:text-xl font-medium text-[#0D1F3C] leading-snug">
                    One of the most loved homes on
                    <br className="hidden sm:inline" /> Winterers, according to guests
                  </div>
                </div>

                {/* Right: Rating + Reviews */}
                <div className="flex items-center gap-6 sm:gap-7 shrink-0">
                  {/* 4.9 + 5 Stars */}
                  <div className="flex flex-col items-center justify-center min-w-[54px]">
                    <span className="font-medium text-2xl sm:text-[27px] !font-body text-[#0D1F3C] leading-none">
                      4.9
                    </span>
                    <div className="flex items-center gap-[2.5px] mt-[5px]">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-2.5 h-2.5 fill-[#0D1B2E] text-[#0D1B2E]"
                        />
                      ))}
                    </div>
                  </div>

                  {/* Vertical Divider */}
                  <div className="h-10 w-[1px] bg-[#DCDCDC] shrink-0" />

                  {/* 174 Reviews */}
                  <div className="flex flex-col items-center justify-center min-w-[54px]">
                    <span className="!font-body text-2xl sm:text-[27px] font-medium text-[#0D1F3C] leading-none tracking-tight">
                      174
                    </span>
                    <span className="text-xs sm:text-sm text-[#6B7F96] font-medium leading-tight mt-[5px] cursor-pointer hover:text-[#0D1F3C] transition-colors">
                      Reviews
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Hosted By Bar */}
            <div className="flex items-center gap-5 pb-[35px] border-b border-[#E2E8F0]">
              <div className="w-[58px] h-[58px] rounded-full overflow-hidden bg-slate-200 shrink-0">
                <img
                  src={img('hosted.png')}
                  alt="Host Thomas"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4 className="font-body text-base sm:text-lg font-medium text-[#0D1F3C]">
                  Hosted by Tito
                </h4>
                <p className="text-base text-[#7B8FA6]">Superhost · 10 months hosting</p>
              </div>
            </div>

            {/* Key Features Highlights */}
            <div className="space-y-6 sm:space-y-7 mt-8 sm:mt-10">
              {/* 1. Top 1% of homes */}
              <div className="flex items-start gap-4 sm:gap-5">
                <div className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center shrink-0 mt-0.5 text-[#0D1F3C]">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-6 h-6 sm:w-7 sm:h-7"
                  >
                    <path d="M6 3h12v7a6 6 0 0 1-12 0V3z" />
                    <path d="M6 5H4a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2h2" />
                    <path d="M18 5h2a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-2" />
                    <path d="M12 16v3" />
                    <path d="M9 19h6" />
                    <path d="M7 21h10" />
                  </svg>
                </div>
                <div>
                  <h5 className="font-body text-base sm:text-[17px] font-semibold text-[#0D1F3C] leading-snug">
                    Top 1% of homes
                  </h5>
                  <p className="text-sm sm:text-base text-[#7B8FA6] mt-0.5 sm:mt-1 font-normal leading-relaxed">
                    This home is one of the highest ranked based on ratings, reviews and reliability.
                  </p>
                </div>
              </div>

              {/* 2. Unwind in the hot tub */}
              <div className="flex items-start gap-4 sm:gap-5">
                <div className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center shrink-0 mt-0.5 text-[#0D1F3C]">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-6 h-6 sm:w-7 sm:h-7"
                  >
                    <path d="M4 12V6a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1" />
                    <path d="M2 12h20" />
                    <path d="M4 12v4a4 4 0 0 0 4 4h8a4 4 0 0 0 4-4v-4" />
                    <path d="M7 20v2" />
                    <path d="M17 20v2" />
                  </svg>
                </div>
                <div>
                  <h5 className="font-body text-base sm:text-[17px] font-semibold text-[#0D1F3C] leading-snug">
                    Unwind in the hot tub
                  </h5>
                  <p className="text-sm sm:text-base text-[#7B8FA6] mt-0.5 sm:mt-1 font-normal leading-relaxed">
                    This is one of the few places in the area with this amenity.
                  </p>
                </div>
              </div>

              {/* 3. Self check-in */}
              <div className="flex items-start gap-4 sm:gap-5">
                <div className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center shrink-0 mt-0.5 text-[#0D1F3C]">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-6 h-6 sm:w-7 sm:h-7"
                  >
                    <path d="M6 21V6a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3v15" />
                    <path d="M3 21h18" />
                    <circle cx="15" cy="13" r="1.25" fill="currentColor" stroke="none" />
                  </svg>
                </div>
                <div>
                  <h5 className="font-body text-base sm:text-[17px] font-semibold text-[#0D1F3C] leading-snug">
                    Self check-in
                  </h5>
                  <p className="text-sm sm:text-base text-[#7B8FA6] mt-0.5 sm:mt-1 font-normal leading-relaxed">
                    Check yourself in with the lockbox.
                  </p>
                </div>
              </div>
            </div>

            {/* Icon Feature Badges Row (Border Top & Bottom with Soft Blue Icon Box) */}
            <div className="border-y border-[#E2E8F0] py-6 sm:py-7 my-8 sm:my-10">
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 sm:gap-6">
                {[
                  { label: 'Sleeps 6', icon: Users },
                  { label: '3 Bedrooms', icon: BedDouble },
                  { label: '2 Bathrooms', icon: Bath },
                  { label: 'Private Sauna', icon: Flame },
                  { label: 'Fireplace', icon: FireExtinguisher },
                  { label: 'Northern Lights', icon: Telescope },
                ].map((badge) => {
                  const Icon = badge.icon;
                  return (
                    <div
                      key={badge.label}
                      className="flex flex-col items-center text-center group cursor-default"
                    >
                      <div className="w-12 h-12 rounded-[12px] bg-[#E8F3FB] flex items-center justify-center text-[#0D1F3C] transition-colors group-hover:bg-[#E0EFFF]">
                        <Icon className="w-5 h-5  text-[#000000]" strokeWidth={2} />
                      </div>
                      <span className="mt-[15px] text-xs sm:text-base text-[#0D1F3C] leading-tight">
                        {badge.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Where You'll Stay */}
            <div className="py-2">
              <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-8 xl:gap-12 items-center">
                {/* Left: Text & Milestones List */}
                <div>
                  <span className="text-xs sm:text-[13px] font-bold tracking-wider text-[#38BDF8] uppercase">
                    LOCATION
                  </span>
                  <h3 className="font-head text-2xl sm:text-3xl lg:text-[32px] font-bold text-[#0D1F3C] mt-1.5 leading-tight">
                    Where You’ll Stay
                  </h3>
                  <p className="mt-3 sm:mt-4 text-sm sm:text-base text-[#7B8FA6] leading-relaxed">
                    Situated on the shores of Malangen Fjord, approximately 20 km south of Tromsø city. Accessible by car on a quiet coastal road, with easy access to all major winter attractions.
                  </p>

                  {/* 4 Distance milestones list */}
                  <div className="mt-6 sm:mt-[25px] space-y-4">
                    {[
                      { place: 'Tromsø Ski Centre', distance: '8 km', icon: Mountain },
                      { place: 'Northern Lights Plateau', distance: '1.2 km', icon: Telescope },
                      { place: 'Arctic Restaurant Fossegrimen', distance: '4.5 km', icon: Utensils },
                      { place: 'Tromsø Airport', distance: '22 km', icon: Navigation },
                    ].map((item) => {
                      const Icon = item.icon;
                      return (
                        <div
                          key={item.place}
                          className="flex items-center justify-between py-0.5"
                        >
                          <div className="flex items-center gap-3 sm:gap-[10px]">
                            <div className="w-[32px] h-[32px] rounded-[8px] bg-[#E8F3FB] flex items-center justify-center text-[#0D1F3C] shrink-0">
                              <Icon className="w-4 h-4 text-[#0D1F3C]" strokeWidth={2} />
                            </div>
                            <span className="text-sm font-medium text-[#0D1F3C]">
                              {item.place}
                            </span>
                          </div>
                          <span className="text-sm text-[#7B8FA6]">
                            {item.distance}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Right: Interactive Iframe Map Card */}
                <div className="relative rounded-[20px] overflow-hidden border border-[#E2E8F0] h-full">
                  {/* Google Map iframe */}
                  <iframe
                    title="Tromsø Location Map"
                    src="https://maps.google.com/maps?q=Tromso+Norway&t=&z=9&ie=UTF8&iwloc=&output=embed"
                    className="w-full h-full border-0"
                    loading="lazy"
                    allowFullScreen
                  />

                  {/* Floating Top-Left Badge: Tromsø, Norway */}
                  <div className="absolute top-4 left-4 z-10 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-xl shadow-md border border-white/80 pointer-events-none">
                    <span className="text-xs sm:text-[13px] font-semibold text-[#0D1F3C]">
                      Tromsø, Norway
                    </span>
                  </div>

                  {/* Floating Marker Badge: Arktis Fjord */}
                  <div className="absolute bottom-1/3 right-1/4 z-10 pointer-events-none">
                    <div className="inline-flex items-center gap-1.5 bg-[#0F2847] text-white px-3.5 py-1.5 rounded-full text-xs font-semibold shadow-xl border border-white/20">
                      <MapPin className="w-3.5 h-3.5 text-[#38BDF8]" />
                      <span>Arktis Fjord</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* What This Place Offers (Amenities) */}
            <div className="pt-8 sm:pt-10 border-t border-slate-100">
              <h3 className="section-title">
                What This Place Offers
              </h3>

              <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10">
                {placeAmenities.map((cat) => {
                  const CatIcon = cat.icon;
                  return (
                    <div key={cat.category} className="space-y-5">
                      {/* Category Header */}
                      <div className="flex items-center gap-2.5 font-medium text-sm sm:text-base text-[#0D1F3C]">
                        <CatIcon className="w-5 h-5 text-[#0D1F3C] shrink-0" strokeWidth={2} />
                        <span>{cat.category}</span>
                      </div>

                      {/* Amenities List */}
                      <ul className="space-y-3.5 sm:space-y-4">
                        {cat.items.map((item) => {
                          const ItemIcon = item.icon;
                          return (
                            <li
                              key={item.name}
                              className="flex items-center gap-2.5 text-sm sm:text-base font-medium text-[#7B8FA6]"
                            >
                              <ItemIcon className="w-5 h-5 text-[#7B8FA6] shrink-0" strokeWidth={1.8} />
                              <span>{item.name}</span>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={() => setShowAllAmenities(true)}
                className="mt-8 sm:mt-10 inline-flex items-center justify-center rounded-[18px] border border-[#E2E8F0] px-6 sm:px-7 py-3 text-base font-medium text-[#0D1F3C] hover:bg-slate-50 transition shadow-xs cursor-pointer"
              >
                Show all 22 amenities
              </button>
            </div>

            {/* Stay Somewhere Extraordinary (About This Property) */}
            <div className="pb-8 sm:pb-10 border-b">
              {/* Top Row: Title & Top Paragraphs (Left) + Large Image (Right) */}
              <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-[25px] items-start">
                <div>
                  <span className="section-eyebrow">
                    ABOUT THIS PROPERTY
                  </span>
                  <h3 className="section-title">
                    Stay Somewhere Extraordinary
                  </h3>

                  <p className="mt-4 sm:mt-[25px] text-sm sm:text-base text-[#7B8FA6] leading-relaxed">
                   The Arktis Fjord Cabin was built by local craftsmen using traditional Norwegian timber techniques, blending seamlessly into the landscape while offering all the comforts of a luxury retreat. The interior is a study in contrasts — raw, natural materials paired with refined, contemporary furnishings.
                  </p>

                  <p className="mt-3.5 sm:mt-4 text-sm sm:text-base text-[#7B8FA6] leading-relaxed">
                   From the moment you arrive, the cabin wraps you in warmth. Light the stone fireplace, pour a glass of wine, and watch the light fade across the fjord. In the evening, the private sauna beckons — and if you're lucky, the northern lights will ignite the sky above you.
                  </p>
                </div>

                <div className="rounded-[23px] overflow-hidden">
                  <img
                    src={img('authenticate.png')}
                    alt="Cozy fireside cabin interior lounge with candles"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Bottom Paragraph (Full width) */}
              <p className="mt-5 sm:mt-6 text-sm sm:text-base text-[#7B8FA6] leading-relaxed max-w-3xl">
               Located just 20 minutes from Tromsø city centre, you're close to world-class winter experiences — dog sledding, snowmobile tours, and guided northern lights expeditions — yet completely secluded in your private corner of Arctic Norway.
              </p>

              {/* Read More Button */}
              <div className="mt-6 sm:mt-7">
                <button
                  type="button"
                  onClick={() => alert('Arktis Fjord Cabin features 240 m² of handcrafted living space with heated floors, private sauna, outdoor hot tub, panoramic fjord views, and eco-certified geothermal heating.')}
                  className="inline-flex items-center justify-center rounded-[18px] bg-[#02213B] hover:bg-[#0D1F3C] text-white px-7 py-3.5 text-sm font-medium transition-all cursor-pointer"
                >
                  Read more about this property
                </button>
              </div>
            </div>

            {/* Your Host */}
            <div className="">
              <h3 className="section-title">
                Your Host
              </h3>

              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 sm:gap-8 mt-5">
                {/* Left: Avatar + Host Info */}
                <div className="flex items-center gap-3 sm:gap-[15px]">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden shrink-0">
                    <img
                      src={img('ingrid.jpg')}
                      alt="Host Ingrid Larsen"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-body text-sm sm:text-base font-semibold text-[#0D1F3C] leading-snug">
                      Ingrid Larsen
                    </h4>
                    <p className="text-xs sm:text-sm text-[#7B8FA6] mt-[4px] font-normal">
                      Hosted by Ingrid · Since 2019
                    </p>
                    <div className="flex items-center gap-1 text-xs font-medium text-[#0D1F3C] mt-[10px]">
                      <Star className="w-3.5 h-3.5 text-[#F59E0B] fill-[#F59E0B]" />
                      <span>Superhost</span>
                    </div>
                  </div>
                </div>

                {/* Middle: 3 Stat Badges */}
                <div className="flex items-center gap-6 sm:gap-8 xl:gap-10">
                  {/* Stat 1: Response Rate */}
                  <div className="flex flex-col items-center text-center">
                    <div className="w-10 h-10 rounded-[14px] bg-[#E8F3FB] flex items-center justify-center text-[#0D1F3C]">
                      <MessageCircle className="w-4 h-4 text-[#0D1F3C]" strokeWidth={2} />
                    </div>
                    <span className="font-semibold text-sm text-[#0D1F3C] mt-3 leading-none">
                      98%
                    </span>
                    <span className="text-xs text-[#7B8FA6] font-normal mt-1 whitespace-nowrap">
                      Response Rate
                    </span>
                  </div>

                  {/* Stat 2: Response Time */}
                  <div className="flex flex-col items-center text-center">
                    <div className="w-10 h-10 rounded-[14px] bg-[#E8F3FB] flex items-center justify-center text-[#0D1F3C]">
                      <Clock className="w-4 h-4 text-[#0D1F3C]" strokeWidth={2} />
                    </div>
                    <span className="font-semibold text-sm text-[#0D1F3C] mt-3 leading-none">
                      Within 1 hour
                    </span>
                    <span className="text-xs text-[#7B8FA6] font-normal mt-1 whitespace-nowrap">
                      Response Time
                    </span>
                  </div>

                  {/* Stat 3: Years Hosting */}
                  <div className="flex flex-col items-center text-center">
                    <div className="w-10 h-10 rounded-[14px] bg-[#E8F3FB] flex items-center justify-center text-[#0D1F3C]">
                      <Calendar className="w-4 h-4 text-[#0D1F3C]" strokeWidth={2} />
                    </div>
                    <span className="font-semibold text-sm text-[#0D1F3C] mt-3 leading-none">
                      6 years
                    </span>
                    <span className="text-xs text-[#7B8FA6] font-normal mt-1 whitespace-nowrap">
                      Years Hosting
                    </span>
                  </div>
                </div>

                {/* Right: Contact Host Button */}
                <div className="flex flex-col items-center sm:items-start lg:items-center">
                  <button
                    type="button"
                    onClick={() => alert('Message dialog opened for host Ingrid Larsen!')}
                    className="inline-flex items-center justify-center rounded-[18px] bg-[#02213B] hover:bg-[#0D1F3C] text-white px-7 sm:px-8 py-3.5 text-sm font-semibold shadow-sm transition-all active:scale-95 cursor-pointer whitespace-nowrap"
                  >
                    Contact Host
                  </button>
                  <span className="text-xs text-[#7B8FA6] font-normal mt-2 text-center">
                    Usually responds quickly
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Sticky Booking Sidebar (Pinned on scroll!) */}
          <aside className="w-full lg:sticky lg:top-24 z-20">
            <div className="rounded-[20px] border border-[#E2E8F0] bg-white py-[35px] px-[30px] space-y-5">
              {/* Price Header */}
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="font-head text-2xl sm:text-3xl font-bold text-[#0D1F3C]">
                    €{pricePerNight}
                  </span>
                  <span className="text-base text-[#7B8FA6] font-medium ml-1">/ night</span>
                </div>
              </div>

              {/* Dates & Guests Input Box */}
              <div className="rounded-[12px] border border-[#E2E8F0] overflow-hidden divide-y divide-[#E2E8F0] text-xs">
                <div className="grid grid-cols-2 divide-x divide-[#E2E8F0]">
                  <div className="p-[17px]">
                    <label className="block text-sm font-bold uppercase tracking-wider text-[#0D1F3C]">
                      CHECK-IN
                    </label>
                    <input
                      type="date"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="w-full bg-transparent text-base text-[#7B8FA6] outline-none cursor-pointer mt-0.5"
                    />
                  </div>
                  <div className="p-[17px]">
                    <label className="block text-sm font-bold uppercase tracking-wider text-[#0D1F3C]">
                      CHECK-OUT
                    </label>
                    <input
                      type="date"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="w-full bg-transparent text-base text-[#7B8FA6] outline-none cursor-pointer mt-0.5"
                    />
                  </div>
                </div>

                <div className="p-3 relative">
                  <label className="block text-sm font-bold uppercase tracking-wider text-[#0D1F3C]">
                    GUESTS
                  </label>
                  <button
                    type="button"
                    onClick={() => setGuestDropdown(!guestDropdown)}
                    className="w-full flex items-center justify-between text-base text-[#7B8FA6] mt-0.5 cursor-pointer"
                  >
                    <span>{guestCount} {guestCount === 1 ? 'guest' : 'guests'}</span>
                    <span className="text-slate-400 text-[10px]">▼</span>
                  </button>

                  {guestDropdown && (
                    <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-slate-200 rounded-xl p-3 shadow-lg z-30 flex items-center justify-between">
                      <span className="text-xs font-medium text-slate-700">Total Guests:</span>
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => setGuestCount((c) => Math.max(1, c - 1))}
                          className="w-7 h-7 rounded-full border border-slate-200 flex items-center justify-center font-bold text-slate-600 hover:bg-slate-100"
                        >
                          -
                        </button>
                        <span className="text-xs font-bold text-[#0D1F35]">{guestCount}</span>
                        <button
                          type="button"
                          onClick={() => setGuestCount((c) => Math.min(8, c + 1))}
                          className="w-7 h-7 rounded-full border border-slate-200 flex items-center justify-center font-bold text-slate-600 hover:bg-slate-100"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-5 grid grid-cols-12 gap-[15px]">
                <button
                  type="button"
                  onClick={() => {
                    setBookingSuccess(true);
                    setTimeout(() => setBookingSuccess(false), 4000);
                  }}
                  className="w-full py-3 px-[29px] rounded-[18px] bg-[#02213B] hover:bg-[#0284C7] text-white font-medium text-sm transition-all duration-200 active:scale-95 cursor-pointer flex items-center justify-center gap-2 col-span-6"
                >
                  <span>{bookingSuccess ? 'Booking Confirmed!' : 'Reserve Your Stay'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => alert('Message sent to host!')}
                  className="w-full py-3 px-[29px] rounded-[18px] border border-[#E2E8F0] bg-white hover:bg-slate-50 text-[#02213B] font-medium text-sm transition cursor-pointer col-span-6"
                >
                  Contact Host
                </button>
              </div>
              {/* Price Breakdown */}
              <div className="pt-5 mt-[30px] border-t border-[#E2E8F0] space-y-2.5 text-sm text-[#7B8FA6] font-body">
                <div className="flex items-center justify-between">
                  <span className="">
                    €{pricePerNight} × {nights} nights
                  </span>
                  <span className="text-[#7B8FA6]">€{staySubtotal}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="">Cleaning fee</span>
                  <span className="text-[#7B8FA6]">€{cleaningFee}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="">Service fee</span>
                  <span className="text-[#7B8FA6]">€{serviceFee}</span>
                </div>
                <div className="flex items-center justify-between pt-[15px] mt-[15px] border-t border-[#E2E8F0] text-base font-medium text-[#0D1F3C]">
                  <span>Total</span>
                  <span className="font-body text-base">€{totalPrice}</span>
                </div>
              </div>
              <p className='text-[#7B8FA6] text-sm text-center'>Free cancellation before Dec 10 · No charge until booking</p>
            </div>

            {/* Trust Guarantees */}
            <div className="flex items-center justify-between gap-[15px] px-1 pt-4 text-sm text-[#7B8FA6]">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-4 h-4 text-[#000000] shrink-0" />
                <span>Verified property</span>
              </div>
              <div className="flex items-center gap-3">
                <Lock className="w-4 h-4 text-[#000000] shrink-0" />
                <span>Secure payment</span>
              </div>
              <div className="flex items-center gap-3">
                <BadgeCheck className="w-4 h-4 text-[#000000] shrink-0" />
                <span>Superhost guarantee</span>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* 4. Bottom Section: "Winter Experiences Around You" */}
      <section className="pt-12 md:pt-[110px] !pb-0 overflow-hidden">
        <div className="site-container">
          <div className="flex flex-col sm:flex-row sm:items-end justify-center gap-4 mb-6 text-center">
            <div>
              <p className="section-eyebrow mb-1.5 sm:mb-2">
                NEAR THIS PROPERTY
              </p>
              <h2 className="section-title">
                Winter Experiences Around You
              </h2>
            </div>
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
            slidesPerView={1.2}
            spaceBetween={16}
            freeMode={true}
            grabCursor={true}
            mousewheel={{ forceToAxis: true }}
            className="!overflow-visible"
            breakpoints={{
              640: {
                slidesPerView: 2.2,
                spaceBetween: 18,
              },
              1024: {
                slidesPerView: 3.5,
                spaceBetween: 20,
              },
            }}
          >
            {nearbyExperiences.map((item) => (
              <SwiperSlide key={item.id} className="h-auto">
                <div className="group rounded-[14px] border border-[#D1D7DD] bg-white p-5 hover:shadow-lg transition-all duration-300 flex flex-col justify-between h-full">
                  <div>
                    {/* Card Image */}
                    <div className="relative w-full overflow-hidden rounded-[10px]">
                      <img
                        src={img(item.img)}
                        alt={item.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>

                    {/* Location & Title */}
                    <div className="pt-5">
                      <div className="flex items-center gap-[5px] text-xs text-[#98A1AC]">
                        <MapPin className="w-3.5 h-3.5 text-[#98A1AC] shrink-0" />
                        <span>{item.country}</span>
                      </div>

                      <h3 className="font-head text-base sm:text-xl font-semibold text-[#02213B] mt-[5px] truncate">
                        {item.name}
                      </h3>

                      {/* Guests and Bedrooms */}
                      <div className="flex items-center gap-3 text-xs text-[#98A1AC] mt-[10px] font-body">
                        <span className="flex items-center gap-[5px]">
                          <Users className="w-3.5 h-3.5 text-[#98A1AC] shrink-0" />
                          {item.guests} guests
                        </span>
                        <span className="flex items-center gap-[5px]">
                          <Bed className="w-3.5 h-3.5 text-[#98A1AC] shrink-0" />
                          {item.beds} beds
                        </span>
                      </div>

                      {/* Tags */}
                      <p className="mt-[15px] text-sm text-[#98A1AC] truncate">
                        {item.tags}
                      </p>
                    </div>
                  </div>

                  {/* Bottom Row: Price & View Stay Button */}
                  <div className="mt-5 pt-5 border-t border-[#D1D7DD] flex items-center justify-between">
                    <div>
                      <div className="flex items-baseline gap-1">
                        <span className="font-head text-lg sm:text-xl font-bold text-[#02213B]">
                          €{item.price}
                        </span>
                        <span className="text-xs text-[#98A1AC]">/night</span>
                      </div>
                      <p className="text-sm text-[#98A1AC] mt-[5px]">
                        €{item.price * 7} total · 7 nights
                      </p>
                    </div>

                    <Link
                      to={`/stays/${item.id}`}
                      className="inline-flex items-center justify-center rounded-[12px] bg-[#071D36] hover:bg-sky px-4 py-2 text-sm font-semibold text-white transition-all active:scale-95 shadow-sm whitespace-nowrap"
                    >
                      View Stay
                    </Link>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* 5. Unique Animated Lightbox Modal */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-[#061826]/95 backdrop-blur-2xl flex flex-col text-white animate-in fade-in duration-300 select-none">
          {/* Top Control Bar */}
          <div className="flex items-center justify-between px-4 sm:px-8 py-3.5 sm:py-4 border-b border-white/10 z-20 bg-[#061826]/80 backdrop-blur-md">
            {/* Left: Property title & category */}
            <div className="flex items-center gap-3">
              <span className="font-head text-sm sm:text-base font-bold text-white tracking-wide">
                Arktis Fjord Cabin
              </span>
              <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#42BAE4]/20 text-[#7EC8E3] border border-[#42BAE4]/30">
                {galleryPhotos[photoIndex].category}
              </span>
            </div>

            {/* Center: Switch View Mode Tabs */}
            <div className="flex items-center bg-white/10 rounded-full p-1 border border-white/10 shadow-inner">
              <button
                type="button"
                onClick={() => setGalleryViewMode('slideshow')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  galleryViewMode === 'slideshow'
                    ? 'bg-[#42BAE4] text-white shadow-md'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Showcase</span>
              </button>
              <button
                type="button"
                onClick={() => setGalleryViewMode('grid')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  galleryViewMode === 'grid'
                    ? 'bg-[#42BAE4] text-white shadow-md'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>All Photos (24)</span>
              </button>
            </div>

            {/* Right: Counter & Actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              <span className="hidden sm:inline-block text-xs font-semibold tracking-wider text-white/80 bg-white/10 px-3 py-1.5 rounded-full">
                {photoIndex + 1} / {galleryPhotos.length}
              </span>
              <button
                type="button"
                onClick={toggleFullscreen}
                className="hidden sm:flex w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 items-center justify-center transition cursor-pointer"
                title="Toggle Fullscreen"
              >
                {isFullscreen ? <Minimize2 className="w-4 h-4 text-white" /> : <Maximize2 className="w-4 h-4 text-white" />}
              </button>
              <button
                type="button"
                onClick={() => setLightboxOpen(false)}
                className="w-9 h-9 rounded-full bg-white/15 hover:bg-white/30 flex items-center justify-center transition-all duration-300 hover:rotate-90 cursor-pointer"
                aria-label="Close gallery"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>

          {/* Body Content based on View Mode */}
          {galleryViewMode === 'slideshow' ? (
            <div className="relative flex-1 flex flex-col justify-between overflow-hidden p-3 sm:p-6">
              {/* Central Photo Display with Left/Right Arrows */}
              <div className="relative flex-1 flex items-center justify-center min-h-0">
                {/* Prev Button */}
                <button
                  type="button"
                  onClick={() => setPhotoIndex((i) => (i - 1 + galleryPhotos.length) % galleryPhotos.length)}
                  className="absolute left-2 sm:left-6 w-12 h-12 rounded-full bg-black/40 hover:bg-[#42BAE4] border border-white/20 hover:border-transparent backdrop-blur-md flex items-center justify-center text-white transition-all duration-300 active:scale-90 cursor-pointer z-20 shadow-xl group"
                  aria-label="Previous photo"
                >
                  <ChevronLeft className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform" />
                </button>

                {/* Hero Image */}
                <div className="relative max-w-5xl max-h-[68vh] w-full h-full flex items-center justify-center p-2">
                  <img
                    key={photoIndex}
                    src={img(galleryPhotos[photoIndex].url)}
                    alt={galleryPhotos[photoIndex].title}
                    className="max-h-[68vh] max-w-full object-contain rounded-2xl shadow-2xl transition-all duration-500 animate-in fade-in zoom-in-95"
                  />
                  {/* Photo Title Overlay */}
                  <div className="absolute bottom-4 inset-x-8 text-center pointer-events-none">
                    <span className="inline-block px-4 py-2 rounded-xl bg-black/60 backdrop-blur-md text-xs sm:text-sm font-medium text-white/95 shadow-lg border border-white/10">
                      {galleryPhotos[photoIndex].title}
                    </span>
                  </div>
                </div>

                {/* Next Button */}
                <button
                  type="button"
                  onClick={() => setPhotoIndex((i) => (i + 1) % galleryPhotos.length)}
                  className="absolute right-2 sm:right-6 w-12 h-12 rounded-full bg-black/40 hover:bg-[#42BAE4] border border-white/20 hover:border-transparent backdrop-blur-md flex items-center justify-center text-white transition-all duration-300 active:scale-90 cursor-pointer z-20 shadow-xl group"
                  aria-label="Next photo"
                >
                  <ChevronRight className="w-6 h-6 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>

              {/* Bottom Thumbnail Strip Carousel */}
              <div className="pt-3 pb-1 border-t border-white/10 mt-auto">
                <div className="flex items-center justify-center gap-2.5 overflow-x-auto py-1 px-4 scrollbar-none">
                  {galleryPhotos.map((photo, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setPhotoIndex(idx)}
                      className={`relative w-16 h-11 sm:w-20 sm:h-14 rounded-xl overflow-hidden shrink-0 transition-all duration-300 cursor-pointer ${
                        photoIndex === idx
                          ? 'ring-2 ring-[#42BAE4] scale-105 opacity-100 shadow-lg'
                          : 'opacity-40 hover:opacity-80 scale-95'
                      }`}
                    >
                      <img
                        src={img(photo.url)}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* Grid View Mode: All 24 photos organized */
            <div className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-6">
              {/* Category Filter Pills */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-white/10">
                {['All', 'The Cabin', 'Interior', 'Views', 'Northern Lights', 'Wellness & Spa'].map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                      activeCategory === cat
                        ? 'bg-[#42BAE4] text-white shadow-md'
                        : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Photo Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {galleryPhotos
                  .map((photo, idx) => ({ ...photo, originalIndex: idx }))
                  .filter((p) => activeCategory === 'All' || p.category === activeCategory)
                  .map((photo) => (
                    <div
                      key={photo.originalIndex}
                      onClick={() => {
                        setPhotoIndex(photo.originalIndex);
                        setGalleryViewMode('slideshow');
                      }}
                      className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-800 cursor-pointer hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                    >
                      <img
                        src={img(photo.url)}
                        alt={photo.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3.5">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#7EC8E3]">
                          {photo.category}
                        </span>
                        <p className="text-xs font-medium text-white line-clamp-2 mt-0.5">
                          {photo.title}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* 6. All Amenities Modal */}
      {showAllAmenities && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="font-head text-lg font-bold text-[#0D1F35]">
                What this place offers
              </h3>
              <button
                type="button"
                onClick={() => setShowAllAmenities(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-6">
              {placeAmenities.map((cat) => {
                const CatIcon = cat.icon;
                return (
                  <div key={cat.category} className="space-y-2.5">
                    <h4 className="flex items-center gap-2 font-head text-sm font-bold text-[#0D1F3C]">
                      <CatIcon className="w-4 h-4 text-[#0D1F3C]" strokeWidth={2} />
                      <span>{cat.category}</span>
                    </h4>
                    <ul className="space-y-2 pl-1">
                      {cat.items.map((item) => {
                        const ItemIcon = item.icon;
                        return (
                          <li key={item.name} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700">
                            <ItemIcon className="w-4 h-4 text-[#7B8FA6] shrink-0" strokeWidth={1.8} />
                            <span>{item.name}</span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                );
              })}
            </div>

            <button
              type="button"
              onClick={() => setShowAllAmenities(false)}
              className="w-full py-2.5 rounded-xl bg-[#062541] hover:bg-[#0284C7] text-white font-semibold text-xs transition cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
