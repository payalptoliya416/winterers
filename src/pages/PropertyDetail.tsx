import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAppDispatch as useDispatch, useAppSelector as useSelector } from '../store/hooks';
import { toggleSave, selectSorted } from '../store/staysSlice';
import {
  Star,
  MapPin,
  Heart,
  Share2,
  Users,
  Bed,
  Bath,
  Flame,
  Sparkles,
  ShieldCheck,
  Check,
  ChevronLeft,
  ChevronRight,
  X,
  Grid,
  Calendar,
  Lock,
  MessageSquare,
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
    category: 'Scenic Views',
    items: ['Mountain view', 'Arctic Fjord view', 'Northern Lights view', 'Forest view'],
  },
  {
    category: 'Bathroom',
    items: ['Hot tub & Outdoor Jacuzzi', 'Private Finnish Sauna', 'Rain shower', 'Premium organic toiletries'],
  },
  {
    category: 'Bedroom & Laundry',
    items: ['Washer & dryer', 'Goose down duvets', 'Extra wool blankets', 'Dedicated drying room for ski gear'],
  },
  {
    category: 'Heating & Safety',
    items: ['Wood-burning stone fireplace', 'Radiant floor heating', 'Smoke & carbon monoxide alarm', 'First aid kit'],
  },
];

const nearbyExperiences = [
  {
    id: 1,
    name: 'The Snowy Pine Cabin',
    location: 'Lapland, Finland',
    price: 289,
    rating: 4.9,
    guests: 6,
    beds: 3,
    img: 'feature01.png',
  },
  {
    id: 2,
    name: 'Alpine Ridge Chalet',
    location: 'Chamonix, France',
    price: 749,
    rating: 4.8,
    guests: 6,
    beds: 3,
    img: 'feature02.png',
  },
  {
    id: 3,
    name: 'Aurora Glass Lodge',
    location: 'Tromsø, Norway',
    price: 450,
    rating: 4.95,
    guests: 4,
    beds: 2,
    img: 'feature03.png',
  },
  {
    id: 4,
    name: 'Glacier Edge Retreat',
    location: 'Zermatt, Switzerland',
    price: 610,
    rating: 4.92,
    guests: 8,
    beds: 4,
    img: 'feature04.png',
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
          <span className="text-slate-300 font-normal px-0.5">/</span>
          <Link to="/stays" className="hover:text-[#062541] transition-colors">Norway</Link>
          <span className="text-slate-300 font-normal px-0.5">/</span>
          <Link to="/stays" className="hover:text-[#062541] transition-colors">Northern Norway</Link>
          <span className="text-slate-300 font-normal px-0.5">/</span>
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

            {/* Guest Favorite / Rating Badge Box */}
            <div className="rounded-2xl border border-amber-200/80 bg-gradient-to-r from-amber-50/60 via-amber-50/30 to-amber-50/50 p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
              <div className="flex items-center gap-3 text-center sm:text-left">
                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-head text-sm sm:text-base font-bold text-[#0D1F35]">
                    Guest favorite
                  </h4>
                  <p className="text-xs text-slate-600">
                    One of the most loved homes on Winterers, according to guests
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 shrink-0 border-t sm:border-t-0 sm:border-l border-amber-200/60 pt-3 sm:pt-0 sm:pl-6 text-center sm:text-left">
                <div>
                  <div className="flex items-center gap-1 text-sm font-bold text-[#0D1F35]">
                    <span>4.96</span>
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  </div>
                  <p className="text-[11px] text-slate-500">148 Reviews</p>
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
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-full bg-[#EBF5FF] flex items-center justify-center text-[#0284C7] shrink-0 mt-0.5">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="font-head text-xs sm:text-sm font-bold text-[#0D1F35]">
                    Top 5% of homes
                  </h5>
                  <p className="text-xs text-slate-500 mt-0.5">
                    This home is highly ranked based on ratings, reviews, and reliability.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-full bg-[#EBF5FF] flex items-center justify-center text-[#0284C7] shrink-0 mt-0.5">
                  <Waves className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="font-head text-xs sm:text-sm font-bold text-[#0D1F35]">
                    Unwind in the outdoor hot tub
                  </h5>
                  <p className="text-xs text-slate-500 mt-0.5">
                    One of the few properties in Tromsø with a heated geothermal jacuzzi.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-full bg-[#EBF5FF] flex items-center justify-center text-[#0284C7] shrink-0 mt-0.5">
                  <Key className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="font-head text-xs sm:text-sm font-bold text-[#0D1F35]">
                    Self check-in
                  </h5>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Check yourself in with the secure digital keypad lockbox.
                  </p>
                </div>
              </div>
            </div>

            {/* Icon Feature Badges Row (Rounded Pills/Boxes) */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5">
              {[
                { label: 'Sleeps 8', icon: Users },
                { label: '4 Bedrooms', icon: Bed },
                { label: '3 Bathrooms', icon: Bath },
                { label: 'Private Sauna', icon: Flame },
                { label: 'Fireplace', icon: Flame },
                { label: 'Northern Lights', icon: Sparkles },
              ].map((badge) => {
                const Icon = badge.icon;
                return (
                  <div
                    key={badge.label}
                    className="rounded-2xl border border-slate-200 bg-[#F8FAFC] p-3 text-center flex flex-col items-center justify-center hover:border-slate-300 transition shadow-xs"
                  >
                    <Icon className="w-4 h-4 text-[#062541] mb-1.5" />
                    <span className="text-[11px] font-semibold text-[#0D1F35] font-head">
                      {badge.label}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Where You'll Stay */}
            <div className="pt-6 border-t border-slate-100">
              <span className="section-eyebrow !text-[#0284C7]">LOCATION</span>
              <h3 className="section-title !mt-1 !text-xl sm:!text-2xl text-[#0D1F35]">
                Where You'll Stay
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed max-w-xl">
                Located in the scenic district of Kvaløya, Tromsø, surrounded by pristine Arctic fjords and mountain trails with zero light pollution for prime aurora viewing.
              </p>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-[1fr_260px] gap-6 items-center">
                {/* Distance milestones list */}
                <div className="space-y-3.5">
                  {[
                    { place: 'Tromsø Airport (TOS)', time: '25 min drive' },
                    { place: 'Kvaløya Mountain Ski Slopes', time: '15 min drive' },
                    { place: 'Arctic Fjord Safari Excursions', time: '10 min drive' },
                    { place: 'Local Organic Grocery & Bakery', time: '12 min drive' },
                  ].map((item) => (
                    <div key={item.place} className="flex items-center justify-between text-xs sm:text-sm py-2 border-b border-slate-100">
                      <span className="flex items-center gap-2 text-slate-700 font-medium">
                        <MapPin className="w-3.5 h-3.5 text-[#0284C7] shrink-0" />
                        {item.place}
                      </span>
                      <span className="text-slate-400 font-medium">{item.time}</span>
                    </div>
                  ))}
                </div>

                {/* Map Card */}
                <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-sm aspect-[4/3] bg-slate-100">
                  <img
                    src={img('map.png')}
                    alt="Property Location Map"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-[#062541]/10 flex items-center justify-center">
                    <div className="bg-[#062541] text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#7EC8E3]" />
                      <span>Arktis Cabin</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* What This Place Offers (Amenities) */}
            <div className="pt-6 border-t border-slate-100">
              <h3 className="section-title !mt-0 !text-xl sm:!text-2xl text-[#0D1F35]">
                What This Place Offers
              </h3>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {placeAmenities.map((cat) => (
                  <div key={cat.category} className="space-y-2.5">
                    <h5 className="font-head text-xs font-bold uppercase tracking-wider text-[#062541]">
                      {cat.category}
                    </h5>
                    <ul className="space-y-2">
                      {cat.items.map((item) => (
                        <li key={item} className="flex items-center gap-2 text-xs sm:text-[13px] text-slate-600">
                          <Check className="w-3.5 h-3.5 text-[#0284C7] shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={() => setShowAllAmenities(true)}
                className="mt-6 inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-50 transition shadow-xs cursor-pointer"
              >
                Show all 32 amenities
              </button>
            </div>

            {/* Stay Somewhere Extraordinary Feature Box */}
            <div className="pt-6 border-t border-slate-100">
              <div className="grid grid-cols-1 md:grid-cols-[1fr_260px] gap-6 items-center">
                <div>
                  <span className="section-eyebrow !text-[#0284C7]">AUTHENTIC HYGGE</span>
                  <h3 className="section-title !mt-1 !text-xl sm:!text-2xl text-[#0D1F35]">
                    Stay Somewhere Extraordinary
                  </h3>
                  <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed font-body">
                    Immerse yourself in deep Arctic tranquility. During polar nights, witness emerald Northern Lights dancing directly above your heated terrace. In the daytime, explore snowshoeing trails right from your doorstep or embark on whale-watching safaris in the adjacent fjords.
                  </p>
                  <p className="mt-2.5 text-xs sm:text-sm text-slate-600 leading-relaxed font-body">
                    Every detail has been crafted with sustainability and Norwegian artisanal woodwork, offering you warmth and authentic hygge in the heart of winter.
                  </p>
                  <div className="mt-5">
                    <Link
                      to="/experiences"
                      className="inline-flex items-center gap-2 rounded-xl bg-[#062541] hover:bg-[#0284C7] px-4 py-2.5 text-xs font-semibold text-white transition active:scale-95 shadow-sm"
                    >
                      <span>Explore Local Experiences</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                <div className="rounded-2xl overflow-hidden aspect-[4/3] shadow-md border border-slate-100">
                  <img
                    src={img('p-inside.jpg')}
                    alt="Interior Lounge"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Your Host */}
            <div className="pt-6 border-t border-slate-100">
              <h3 className="section-title !mt-0 !text-xl sm:!text-2xl text-[#0D1F35] mb-5">
                Your Host
              </h3>

              <div className="rounded-2xl border border-slate-200 bg-[#F8FAFC] p-6 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4 text-center sm:text-left">
                  <div className="w-16 h-16 rounded-full overflow-hidden bg-slate-200 shrink-0 shadow-sm">
                    <img
                      src={img('host-anna.jpg')}
                      alt="Host Thomas"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-head text-base sm:text-lg font-bold text-[#0D1F35]">
                      Thomas Alexander
                    </h4>
                    <p className="text-xs text-slate-500">Superhost · Joined in 2019</p>
                    <div className="flex items-center gap-3 mt-1.5 text-xs text-slate-600">
                      <span>★ 4.96 Rating</span>
                      <span>•</span>
                      <span>148 Reviews</span>
                      <span>•</span>
                      <span className="text-[#0284C7] font-medium">100% Response Rate</span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => alert('Message sent to Thomas Alexander!')}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#062541] hover:bg-[#0284C7] px-5 py-2.5 text-xs sm:text-sm font-semibold text-white transition active:scale-95 shadow-sm cursor-pointer whitespace-nowrap"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Contact Host</span>
                </button>
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
          </aside>
        </div>
      </div>

      {/* 4. Bottom Section: "Winter Experiences Around You" */}
      <section className="site-container w-full px-4 sm:px-6 lg:px-8 mt-16 sm:mt-24 pt-12 border-t border-slate-100">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="section-eyebrow !text-[#0284C7]">NEAR THIS PROPERTY</span>
            <h2 className="section-title !mt-1 !text-2xl sm:!text-3xl text-[#0D1F35]">
              Winter Experiences Around You
            </h2>
          </div>
          <Link
            to="/experiences"
            className="text-xs sm:text-sm font-semibold text-[#0284C7] hover:underline flex items-center gap-1"
          >
            <span>View all experiences</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 4 Stay Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {nearbyExperiences.map((item) => (
            <div
              key={item.id}
              className="group rounded-[18px] border border-slate-200 bg-white p-4 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-100">
                  <img
                    src={img(item.img)}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute top-2.5 right-2.5 bg-white/90 backdrop-blur-sm text-slate-800 text-[11px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                    {item.rating}
                  </span>
                </div>
                <div className="pt-3">
                  <p className="text-xs text-slate-400 flex items-center gap-1 truncate">
                    <MapPin className="w-3 h-3 text-[#0284C7]" />
                    {item.location}
                  </p>
                  <h4 className="font-head text-sm font-bold text-[#0D1F35] mt-1 truncate group-hover:text-[#0284C7] transition-colors">
                    {item.name}
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-1 font-body">
                    {item.guests} guests · {item.beds} bedrooms
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="font-head text-base font-bold text-[#0D1F35]">
                    €{item.price}
                  </span>
                  <span className="text-[10px] text-slate-400"> /night</span>
                </div>
                <Link
                  to={`/stays/${item.id}`}
                  className="rounded-lg bg-[#062541] hover:bg-[#0284C7] px-3 py-1.5 text-xs font-semibold text-white transition active:scale-95"
                >
                  Book Now
                </Link>
              </div>
            </div>
          ))}
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
              {placeAmenities.map((cat) => (
                <div key={cat.category} className="space-y-2">
                  <h4 className="font-head text-xs font-bold uppercase tracking-wider text-[#062541]">
                    {cat.category}
                  </h4>
                  <ul className="space-y-2">
                    {cat.items.map((item) => (
                      <li key={item} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700">
                        <Check className="w-4 h-4 text-[#0284C7] shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
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
