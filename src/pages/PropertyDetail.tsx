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
} from 'lucide-react';
import { img } from '../data';

const galleryPhotos = [
  { url: 'p-main.jpg', title: 'Exterior & Snowy Mountain Panorama' },
  { url: 'p-inside.jpg', title: 'Cozy Fireside Living Room' },
  { url: 'p-view.jpg', title: 'Night Atmosphere by the Fire' },
  { url: 'aurora.jpg', title: 'Northern Lights Over the Deck' },
  { url: 'p-after.jpg', title: 'Panoramic Dining & Kitchen' },
  { url: 'feature01.png', title: 'Twilight Exterior View' },
  { url: 'feature02.png', title: 'Snowy Forest Chalet Surroundings' },
  { url: 'deal1.png', title: 'Deck Jacuzzi with Fjord Views' },
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

  return (
    <div className="w-full bg-white pt-24 sm:pt-28 pb-16">
      {/* 1. Breadcrumbs */}
      <div className="site-container pb-4">
        <nav className="flex items-center gap-2 text-xs text-slate-500 font-body">
          <Link to="/" className="hover:text-[#062541] transition">Home</Link>
          <span>/</span>
          <Link to="/stays" className="hover:text-[#062541] transition">Winter Stays</Link>
          <span>/</span>
          <Link to="/destinations" className="hover:text-[#062541] transition">Northern Norway</Link>
          <span>/</span>
          <span className="text-[#0D1F35] font-semibold truncate">Entire cabin in Tromsø</span>
        </nav>
      </div>

      {/* 2. Hero Gallery Section */}
      <div className="site-container">
        <div className="relative rounded-[24px] overflow-hidden bg-slate-900 shadow-sm">
          {/* Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-2 h-[340px] sm:h-[440px] md:h-[500px] lg:h-[540px]">
            {/* Big Main Image (Left, spans 8 cols) */}
            <div
              onClick={() => openLightboxAt(0)}
              className="md:col-span-8 relative h-full cursor-pointer overflow-hidden group"
            >
              <img
                src={img(galleryPhotos[0].url)}
                alt={galleryPhotos[0].title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
            </div>

            {/* Right 3 Images (Right, spans 4 cols) */}
            <div className="hidden md:grid md:col-span-4 grid-rows-2 gap-2 h-full">
              {/* Top Right Image */}
              <div
                onClick={() => openLightboxAt(1)}
                className="relative h-full cursor-pointer overflow-hidden group"
              >
                <img
                  src={img(galleryPhotos[1].url)}
                  alt={galleryPhotos[1].title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
              </div>

              {/* Bottom 2 Images split 50/50 */}
              <div className="grid grid-cols-2 gap-2 h-full">
                <div
                  onClick={() => openLightboxAt(2)}
                  className="relative h-full cursor-pointer overflow-hidden group"
                >
                  <img
                    src={img(galleryPhotos[2].url)}
                    alt={galleryPhotos[2].title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                </div>
                <div
                  onClick={() => openLightboxAt(3)}
                  className="relative h-full cursor-pointer overflow-hidden group"
                >
                  <img
                    src={img(galleryPhotos[3].url)}
                    alt={galleryPhotos[3].title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                </div>
              </div>
            </div>
          </div>

          {/* "View All Photos" Button at bottom right */}
          <button
            type="button"
            onClick={() => openLightboxAt(0)}
            className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 inline-flex items-center gap-2 rounded-xl bg-white/95 hover:bg-white text-[#0D1F35] px-4 py-2 text-xs sm:text-sm font-semibold shadow-lg backdrop-blur-sm transition-all duration-200 active:scale-95 cursor-pointer z-10"
          >
            <Grid className="w-4 h-4 text-[#062541]" />
            <span>View All Photos ({galleryPhotos.length})</span>
          </button>
        </div>
      </div>

      {/* 3. Main Content + Sticky Booking Sidebar Layout */}
      <div className="site-container mt-8 sm:mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] xl:grid-cols-[1fr_400px] gap-8 lg:gap-12 items-start">
          {/* Left Column: Details (Scrollable) */}
          <div className="space-y-8 sm:space-y-10">
            {/* Title & Actions */}
            <div>
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div>
                  <h1 className="font-head text-2xl sm:text-3xl lg:text-[34px] font-bold text-[#0D1F35] leading-tight">
                    Entire cabin in Tromsø, Northern Norway
                  </h1>
                  <p className="mt-1.5 text-xs sm:text-sm text-slate-500 font-body">
                    By Thomas Alexander · Norway
                  </p>
                </div>

                <div className="flex items-center gap-2.5 shrink-0">
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
                    className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition shadow-sm cursor-pointer"
                  >
                    <Share2 className="w-3.5 h-3.5 text-slate-500" />
                    <span>Share</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => d(toggleSave(+id))}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition shadow-sm cursor-pointer"
                  >
                    <Heart
                      className={`w-3.5 h-3.5 transition ${
                        saved ? 'fill-red-500 text-red-500' : 'text-slate-500'
                      }`}
                    />
                    <span>{saved ? 'Saved' : 'Save'}</span>
                  </button>
                </div>
              </div>

              <p className="mt-4 text-xs sm:text-sm md:text-[15px] leading-relaxed text-slate-600 font-body">
                Perched high on the snowy ridges above Tromsø, this luxury timber cabin offers an unparalleled winter escape. Floor-to-ceiling panoramic windows frame panoramic vistas of snow-blanketed fjords and Arctic mountain peaks, while cozy interiors invite you to unwind by the crackling fireplace.
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
            <div className="flex items-center gap-4 py-4 border-y border-slate-100">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-200 shrink-0">
                <img
                  src={img('host-anna.jpg')}
                  alt="Host Thomas"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4 className="font-head text-sm sm:text-base font-bold text-[#0D1F35]">
                  Hosted by Thomas Alexander
                </h4>
                <p className="text-xs text-slate-500">Superhost · 7 years hosting on Winterers</p>
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
            <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-xl space-y-5">
              {/* Price Header */}
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="font-head text-2xl sm:text-3xl font-bold text-[#0D1F35]">
                    €{pricePerNight}
                  </span>
                  <span className="text-xs text-slate-500 font-medium ml-1">/ night</span>
                </div>
                <div className="flex items-center gap-1 text-xs font-semibold text-[#0D1F35]">
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  <span>4.96</span>
                  <span className="text-slate-400">(148)</span>
                </div>
              </div>

              {/* Dates & Guests Input Box */}
              <div className="rounded-2xl border border-slate-200 overflow-hidden divide-y divide-slate-200 text-xs bg-[#F8FAFC]">
                <div className="grid grid-cols-2 divide-x divide-slate-200">
                  <div className="p-3">
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      CHECK-IN
                    </label>
                    <input
                      type="date"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="w-full bg-transparent text-xs font-semibold text-[#0D1F35] outline-none cursor-pointer mt-0.5"
                    />
                  </div>
                  <div className="p-3">
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      CHECK-OUT
                    </label>
                    <input
                      type="date"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="w-full bg-transparent text-xs font-semibold text-[#0D1F35] outline-none cursor-pointer mt-0.5"
                    />
                  </div>
                </div>

                <div className="p-3 relative">
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    GUESTS
                  </label>
                  <button
                    type="button"
                    onClick={() => setGuestDropdown(!guestDropdown)}
                    className="w-full flex items-center justify-between text-xs font-semibold text-[#0D1F35] mt-0.5 cursor-pointer"
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
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => {
                    setBookingSuccess(true);
                    setTimeout(() => setBookingSuccess(false), 4000);
                  }}
                  className="w-full py-3.5 px-4 rounded-xl bg-[#062541] hover:bg-[#0284C7] text-white font-semibold text-sm transition-all duration-200 active:scale-95 shadow-md cursor-pointer flex items-center justify-center gap-2"
                >
                  <Lock className="w-4 h-4 text-[#7EC8E3]" />
                  <span>{bookingSuccess ? 'Booking Confirmed!' : 'Reserve Your Stay'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => alert('Message sent to host!')}
                  className="w-full py-2.5 px-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs transition cursor-pointer"
                >
                  Contact Host
                </button>
              </div>

              <p className="text-center text-[11px] text-slate-400 font-body">
                You won't be charged yet · Free cancellation 14 days before
              </p>

              {/* Price Breakdown */}
              <div className="pt-4 border-t border-slate-100 space-y-2.5 text-xs text-slate-600 font-body">
                <div className="flex items-center justify-between">
                  <span className="underline decoration-slate-300">
                    €{pricePerNight} × {nights} nights
                  </span>
                  <span className="font-medium text-slate-800">€{staySubtotal}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="underline decoration-slate-300">Cleaning fee</span>
                  <span className="font-medium text-slate-800">€{cleaningFee}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="underline decoration-slate-300">Service fee</span>
                  <span className="font-medium text-slate-800">€{serviceFee}</span>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-slate-200 text-sm font-bold text-[#0D1F35]">
                  <span>Total before taxes</span>
                  <span className="font-head text-base">€{totalPrice}</span>
                </div>
              </div>

              {/* Safety Badges */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-center gap-4 text-[11px] text-slate-400 font-medium">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  Verified stay
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Lock className="w-3.5 h-3.5 text-slate-400" />
                  Secure payment
                </span>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* 4. Bottom Section: "Winter Experiences Around You" */}
      <section className="site-container mt-16 sm:mt-24 pt-12 border-t border-slate-100">
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

      {/* 5. Lightbox Slider Modal (Opens when hero gallery images are clicked) */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6 text-white animate-fade-in">
          {/* Top Bar: Counter & Close */}
          <div className="flex items-center justify-between z-10">
            <span className="text-xs sm:text-sm font-semibold tracking-wider text-white/80">
              {photoIndex + 1} / {galleryPhotos.length} — {galleryPhotos[photoIndex].title}
            </span>
            <button
              type="button"
              onClick={() => setLightboxOpen(false)}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition cursor-pointer"
              aria-label="Close gallery"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Main Slider Display */}
          <div className="relative flex-1 flex items-center justify-center my-4">
            {/* Prev Button */}
            <button
              type="button"
              onClick={() => setPhotoIndex((i) => (i - 1 + galleryPhotos.length) % galleryPhotos.length)}
              className="absolute left-2 sm:left-6 w-11 h-11 rounded-full bg-white/15 hover:bg-white/30 backdrop-blur-sm flex items-center justify-center transition cursor-pointer z-10"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>

            {/* Current Image */}
            <div className="max-w-5xl max-h-[75vh] w-full h-full flex items-center justify-center p-2">
              <img
                src={img(galleryPhotos[photoIndex].url)}
                alt={galleryPhotos[photoIndex].title}
                className="max-h-[75vh] max-w-full object-contain rounded-xl shadow-2xl transition-all duration-300"
              />
            </div>

            {/* Next Button */}
            <button
              type="button"
              onClick={() => setPhotoIndex((i) => (i + 1) % galleryPhotos.length)}
              className="absolute right-2 sm:right-6 w-11 h-11 rounded-full bg-white/15 hover:bg-white/30 backdrop-blur-sm flex items-center justify-center transition cursor-pointer z-10"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>
          </div>

          {/* Bottom Thumbnail Strip */}
          <div className="flex items-center justify-center gap-2 overflow-x-auto py-2">
            {galleryPhotos.map((photo, idx) => (
              <button
                key={photo.url}
                type="button"
                onClick={() => setPhotoIndex(idx)}
                className={`w-14 h-10 sm:w-16 sm:h-12 rounded-lg overflow-hidden shrink-0 border-2 transition cursor-pointer ${
                  photoIndex === idx ? 'border-[#7EC8E3] scale-105' : 'border-transparent opacity-50 hover:opacity-100'
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
