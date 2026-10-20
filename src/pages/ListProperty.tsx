import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Globe, Camera, SlidersHorizontal, Headphones, Check, MapPin, LayoutGrid, CircleCheck, Users, TrendingUp, Calendar, ChartColumnIncreasing, ShieldCheck, Lock, Image, Target, Settings, Plus, Minus } from 'lucide-react';
import Hero from '../components/Hero';
import Button from '../components/Button';
import Section from '../components/Section';
import SectionHead from '../components/SectionHead';
import Feature from '../components/Feature';
import ImgBg from '../components/ImgBg';

const countryCodes = [
  { code: '+1', name: 'United States', flag: '🇺🇸' },
  { code: '+1', name: 'Canada', flag: '🇨🇦' },
  { code: '+44', name: 'United Kingdom', flag: '🇬🇧' },
  { code: '+358', name: 'Finland', flag: '🇫🇮' },
  { code: '+47', name: 'Norway', flag: '🇳🇴' },
  { code: '+46', name: 'Sweden', flag: '🇸🇪' },
  { code: '+41', name: 'Switzerland', flag: '🇨🇭' },
  { code: '+33', name: 'France', flag: '🇫🇷' },
  { code: '+43', name: 'Austria', flag: '🇦🇹' },
  { code: '+49', name: 'Germany', flag: '🇩🇪' },
  { code: '+39', name: 'Italy', flag: '🇮🇹' },
  { code: '+34', name: 'Spain', flag: '🇪🇸' },
  { code: '+354', name: 'Iceland', flag: '🇮🇸' },
  { code: '+31', name: 'Netherlands', flag: '🇳🇱' },
  { code: '+32', name: 'Belgium', flag: '🇧🇪' },
  { code: '+45', name: 'Denmark', flag: '🇩🇰' },
  { code: '+351', name: 'Portugal', flag: '🇵🇹' },
  { code: '+30', name: 'Greece', flag: '🇬🇷' },
  { code: '+48', name: 'Poland', flag: '🇵🇱' },
  { code: '+420', name: 'Czech Republic', flag: '🇨🇿' },
  { code: '+91', name: 'India', flag: '🇮🇳' },
  { code: '+61', name: 'Australia', flag: '🇦🇺' },
  { code: '+64', name: 'New Zealand', flag: '🇳🇿' },
  { code: '+81', name: 'Japan', flag: '🇯🇵' },
  { code: '+971', name: 'UAE', flag: '🇦🇪' },
  { code: '+65', name: 'Singapore', flag: '🇸🇬' },
  { code: '+82', name: 'South Korea', flag: '🇰🇷' },
  { code: '+55', name: 'Brazil', flag: '🇧🇷' },
  { code: '+52', name: 'Mexico', flag: '🇲🇽' },
  { code: '+27', name: 'South Africa', flag: '🇿🇦' },
];

const steps = [
  {
    num: '01',
    icon: MapPin,
    title: 'Tell Us About Your Property',
    text: 'Share your location, property type and essential details.',
  },
  {
    num: '02',
    icon: LayoutGrid,
    title: 'Build Your Listing',
    text: 'Add photographs, amenities, pricing and availability.',
  },
  {
    num: '03',
    icon: CircleCheck,
    title: 'Go Live',
    text: 'Our team reviews your listing and helps prepare it for travellers.',
  },
  {
    num: '04',
    icon: Users,
    title: 'Welcome Your Guests',
    text: 'Start receiving bookings from winter travellers.',
  },
];

const why = [
  {
    num: '01',
    icon: Globe,
    title: 'Reach More Winter Travellers',
    text: 'Get discovered by guests actively searching for winter escapes.',
  },
  {
    num: '02',
    icon: Camera,
    title: 'Showcase Your Property',
    text: 'Present your home through premium photography, rich details and experiences.',
  },
  {
    num: '03',
    icon: SlidersHorizontal,
    title: 'Stay In Control',
    text: 'Manage availability, pricing and bookings from one simple place.',
  },
  {
    num: '04',
    icon: Headphones,
    title: 'Get Dedicated Support',
    text: 'Our team helps you create and manage a successful listing.',
  },
];

const faq = [
  [
    'How much does it cost to list my property?',
    'Listing your property on Winterers is free. We take a small commission only when a booking is made.',
  ],
  [
    'What properties can I list?',
    'We welcome mountain cabins, luxury chalets, forest retreats, lakeside lodges, ski-in/ski-out properties and remote winter homes.',
  ],
  [
    'How does the approval process work?',
    'After you submit your listing, our team reviews it within 2–3 business days to ensure it meets our quality standards.',
  ],
  [
    'How do bookings and payments work?',
    'Payments are processed securely via our platform with automatic payouts after each stay.',
  ],
  [
    'Can I manage my own availability?',
    'Yes, you have full control over your calendar, pricing, and availability through your host dashboard.',
  ],
  [
    'Can I update my property after publishing?',
    'Yes, you can edit photographs, amenities, pricing, and house rules at any time.',
  ],
  [
    'How does Winterers help promote my property?',
    'We feature curated listings across targeted winter travel marketing campaigns, social media, and seasonal collections.',
  ],
];

export default function ListProperty() {
  const [openFaqs, setOpenFaqs] = useState<number[]>([0, 1, 2]);

  const toggleFaq = (idx: number) => {
    setOpenFaqs((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };
  const [country, setCountry] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [selectedCountryCode, setSelectedCountryCode] = useState('+00');
  const [codeDropdownOpen, setCodeDropdownOpen] = useState(false);
  const [searchCode, setSearchCode] = useState('');
  const codeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (codeRef.current && !codeRef.current.contains(e.target as Node)) {
        setCodeDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredCountryCodes = countryCodes.filter(
    (c) =>
      c.name.toLowerCase().includes(searchCode.toLowerCase()) ||
      c.code.includes(searchCode)
  );

  return (
    <>
      <Hero
        name="list-hero.png"
        eyebrow="For property owners"
        title="Turn Your Property Into a"
        accent="Winter Escape"
        text="Share your property with travellers looking for unforgettable winter stays and reach guests who value exceptional places."
      >
      </Hero>

      <Section tone="light" className="!pt-12 sm:!pt-[110px]">
        <div className="overflow-hidden rounded-[20px] bg-[#EFF5FB] grid grid-cols-1 lg:grid-cols-12 shadow-sm">
          {/* Left Column: Image */}
          <div className="lg:col-span-5 relative w-full h-[300px] sm:h-[400px] lg:h-auto min-h-full">
            <img
              src="/images/property-sec.png"
              alt="Submit Your Property - Glass Igloo Aurora"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right Column: Form */}
          <div className="lg:col-span-7 p-6 sm:p-8 md:p-10 lg:p-12 xl:p-10 flex flex-col justify-center">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert('Property submitted successfully! Our team will review your property.');
              }}
              className="flex flex-col gap-5"
            >
              <div>
                <h2 className="section-title !mt-0">
                  Submit Your Property
                </h2>
                <p className="mt-[10px] text-xs sm:text-sm text-[#6B7280]">
                  Complete the form below and our team will review your property.
                </p>
              </div>

              {/* Row 1: Full Name & Email Address */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs sm:text-base text-[#1A1A1A] mb-[10px]">
                    Full Name<span className="text-[#DB0505] ml-0.5">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your full name"
                    className="w-full rounded-full bg-white border border-[#EBEBEB] px-6 py-3 text-sm sm:text-base text-[#0F172A] placeholder:text-[#888888] transition focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-base text-[#1A1A1A] mb-[10px]">
                    Email Address<span className="text-[#DB0505] ml-0.5">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="you@example.com"
                    className="w-full rounded-full bg-white border border-[#EBEBEB] px-6 py-3 text-sm sm:text-base text-[#0F172A] placeholder:text-[#888888] transition focus:outline-none"
                  />
                </div>
              </div>

              {/* Row 2: Phone Number & Property Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="relative" ref={codeRef}>
                  <label className="block text-xs sm:text-base text-[#1A1A1A] mb-[10px]">
                    Phone Number<span className="text-[#DB0505] ml-0.5">*</span>
                  </label>
                  <div className="flex items-center w-full rounded-full bg-white border border-[#EBEBEB] px-6 py-3 text-sm sm:text-base text-[#0F172A] transition focus-within:border-[#7EC8E3]">
                    <button
                      type="button"
                      onClick={() => setCodeDropdownOpen((prev) => !prev)}
                      className="flex items-center gap-1.5 text-[#0F172A] font-medium shrink-0 cursor-pointer select-none hover:text-[#7EC8E3] transition"
                      aria-label="Select Country Code"
                    >
                      <span>{selectedCountryCode}</span>
                      <ChevronDown className={`w-3.5 h-3.5 text-[#888888] transition-transform duration-200 ${codeDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>
                    <span className="h-4 w-px bg-[#EBEBEB] mx-3 shrink-0" />
                    <input
                      type="tel"
                      required
                      placeholder="123 456 7890"
                      className="w-full bg-transparent border-0 p-0 text-sm sm:text-base text-[#0F172A] placeholder:text-[#888888] focus:outline-none focus:ring-0"
                    />
                  </div>

                  {/* Dropdown Menu */}
                  {codeDropdownOpen && (
                    <div className="absolute left-0 top-full mt-2 w-72 max-h-64 overflow-hidden rounded-2xl bg-white border border-[#EBEBEB] shadow-2xl z-50 flex flex-col animate-in fade-in zoom-in-95 duration-150">
                      <div className="p-2.5 border-b border-[#EBEBEB] bg-[#F8FAFC]">
                        <input
                          type="text"
                          value={searchCode}
                          onChange={(e) => setSearchCode(e.target.value)}
                          placeholder="Search country or code..."
                          className="w-full rounded-xl bg-white border border-[#E2E8F0] px-3 py-1.5 text-xs text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#7EC8E3]"
                          autoFocus
                        />
                      </div>
                      <div className="overflow-y-auto max-h-52 p-1 divide-y divide-slate-50">
                        {filteredCountryCodes.map((c) => (
                          <button
                            key={`${c.name}-${c.code}`}
                            type="button"
                            onClick={() => {
                              setSelectedCountryCode(c.code);
                              setCodeDropdownOpen(false);
                              setSearchCode('');
                            }}
                            className={`w-full flex items-center justify-between px-3 py-2 text-xs rounded-lg transition text-left cursor-pointer ${
                              selectedCountryCode === c.code
                                ? 'bg-[#EEF4FA] text-[#071D36] font-semibold'
                                : 'hover:bg-slate-50 text-[#334155]'
                            }`}
                          >
                            <div className="flex items-center gap-2 truncate pr-2">
                              <span className="text-base">{c.flag}</span>
                              <span className="truncate">{c.name}</span>
                            </div>
                            <span className="font-mono font-medium text-slate-500 shrink-0">{c.code}</span>
                          </button>
                        ))}
                        {filteredCountryCodes.length === 0 && (
                          <p className="p-3 text-center text-xs text-slate-400">No countries found</p>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-xs sm:text-base text-[#1A1A1A] mb-[10px]">
                    Property Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Villa del Mar"
                    className="w-full rounded-full bg-white border border-[#EBEBEB] px-6 py-3 text-sm sm:text-base text-[#0F172A] placeholder:text-[#888888] transition focus:outline-none"
                  />
                </div>
              </div>

              {/* Row 3: City & Country (left col) | Listing URL (right col) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-xs sm:text-base text-[#1A1A1A] mb-[10px]">
                      City<span className="text-[#DB0505] ml-0.5">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Santorini"
                      className="w-full rounded-full bg-white border border-[#EBEBEB] px-5 sm:px-6 py-3 text-sm sm:text-base text-[#0F172A] placeholder:text-[#888888] transition focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-base text-[#1A1A1A] mb-[10px]">
                      Country<span className="text-[#DB0505] ml-0.5">*</span>
                    </label>
                    <div className="relative">
                      <select
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        required
                        className={`w-full appearance-none rounded-full bg-white border border-[#EBEBEB] px-5 sm:px-6 pr-9 py-3 text-sm sm:text-base transition focus:outline-none cursor-pointer ${
                          country ? 'text-[#0F172A]' : 'text-[#888888]'
                        }`}
                      >
                        <option value="" disabled className="text-[#888888]">
                          Select country
                        </option>
                        <option value="Finland">Finland</option>
                        <option value="Norway">Norway</option>
                        <option value="Sweden">Sweden</option>
                        <option value="Switzerland">Switzerland</option>
                        <option value="France">France</option>
                        <option value="Austria">Austria</option>
                        <option value="Iceland">Iceland</option>
                        <option value="Canada">Canada</option>
                        <option value="Other">Other</option>
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#888888]" />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs sm:text-base text-[#1A1A1A] mb-[10px] truncate">
                    Website or Airbnb/Booking.com Listing URL
                  </label>
                  <input
                    type="url"
                    placeholder="https://..."
                    className="w-full rounded-full bg-white border border-[#EBEBEB] px-6 py-3 text-sm sm:text-base text-[#0F172A] placeholder:text-[#888888] transition focus:outline-none"
                  />
                </div>
              </div>

              {/* Row 4: Property Description */}
              <div>
                <label className="block text-xs sm:text-base text-[#1A1A1A] mb-[10px]">
                  Property Description<span className="text-[#DB0505] ml-0.5">*</span>
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Tell us about your property: location, amenities, unique features, number of bedrooms/bathrooms..."
                  className="w-full h-[120px] sm:h-[130px] max-h-[140px] resize-none overflow-y-auto rounded-[18px] bg-white border border-[#EBEBEB] px-5 sm:px-6 py-3 text-sm sm:text-base text-[#0F172A] placeholder:text-[#888888] transition focus:outline-none focus:border-[#42BAE4] leading-relaxed"
                />
              </div>

              {/* Row 5: Agreement Checkbox */}
              <label className="flex items-center gap-3 cursor-pointer select-none pt-1">
                <div
                  onClick={() => setAgreed(!agreed)}
                  className={`w-5 h-5 rounded-[6px] border flex items-center justify-center transition-all shrink-0 cursor-pointer ${
                    agreed
                      ? 'bg-[#071D36] border-[#071D36] text-white shadow-sm'
                      : 'bg-white border-[#CBD5E1] hover:border-slate-400'
                  }`}
                >
                  {agreed && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  required
                  className="sr-only"
                />
                <span className="text-xs sm:text-sm text-[#475569]">
                  I agree to be contacted regarding my property listing.
                </span>
              </label>

              {/* Row 6: Submit Button */}
              <div className="pt-1">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-[14px] bg-[#071D36] hover:bg-[#051527] px-7 py-3 text-xs sm:text-sm font-semibold text-white transition-all active:scale-95 shadow-sm"
                >
                  Submit Property
                </button>
              </div>
            </form>
          </div>
        </div>
      </Section>

      <Section tone="light" className="!py-16 md:!py-[110px] !bg-[#F9F9F9]">
        <div className="text-center mb-12 sm:mb-16">
          <p className="section-eyebrow">
            WHY LIST WITH US
          </p>
          <h2 className="section-title">
            Everything You Need to Host With Confidence
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0">
          {why.map(({ num, icon: Icon, title, text }, i) => (
            <div
              key={title}
              className={`flex flex-col lg:px-8 first:lg:pl-0 last:lg:pr-0 ${
                i < why.length - 1 ? 'lg:border-r lg:border-[#E2E8F0]' : ''
              }`}
            >
              {/* Top row: Number & Icon */}
              <div className="flex items-center justify-between">
                <span className="font-body text-4xl sm:text-[80px] font-bold text-[#06243A1A] tracking-tight leading-none select-none" style={{ fontFamily: '"DM Sans", sans-serif' }}>
                  {num}
                </span>
                <div className="w-[52px] h-[52px] rounded-[12px] bg-white border border-[#D4DDE6] flex items-center justify-center text-[#06243A] shrink-0">
                  <Icon className="w-5 h-5 text-[#06243A]" strokeWidth={1.75} />
                </div>
              </div>

              {/* Title */}
              <h3 className="font-head text-base sm:text-lg font-bold text-[#06243A] mt-5 sm:mt-5">
                {title}
              </h3>

              {/* Description */}
              <p className="mt-4 text-xs sm:text-base text-[#6B8090] leading-relaxed">
                {text}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="dark" className=" !bg-[#03192E]">
        <div className="text-center mb-12 sm:mb-10">
          <p className="section-eyebrow">
            THE PROCESS
          </p>
          <h2 className="section-title !text-white">
            From Your Property to Your First Booking
          </h2>
        </div>

        <div className="relative">
          {/* Subtle horizontal connecting line behind circles on desktop */}
          <div className="hidden lg:block absolute top-7 sm:top-8 left-[12.5%] right-[12.5%] h-px bg-white/20 z-0" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-10 sm:gap-y-12 lg:gap-y-0 gap-x-6 relative z-10">
            {steps.map(({ num, icon: Icon, title, text }) => (
              <div key={num} className="flex flex-col items-center text-center px-2">
                {/* White Circular Icon Badge */}
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white flex items-center justify-center text-[#062541] shadow-lg shrink-0">
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-[#062541]" strokeWidth={1.8} />
                </div>

                {/* Step Number */}
                <span className="font-body text-xs sm:text-sm font-semibold text-[#5CBDE5] mt-4 sm:mt-[15px] tracking-wide">
                  {num}
                </span>

                {/* Step Title */}
                <h3 className="font-head text-sm sm:text-base font-semibold text-white mt-1.5 sm:mt-[15px]">
                  {title}
                </h3>

                {/* Step Description */}
                <p className="mt-1.5 sm:mt-[15px] text-xs sm:text-sm text-white leading-relaxed max-w-[270px]">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Built For Winter Hosts: Your Property Deserves More Than a Listing */}
      <Section tone="light" className="!py-12 md:!py-[110px] !bg-white">
        <div className="overflow-hidden rounded-[24px] bg-[#EEF5FB] grid grid-cols-1 lg:grid-cols-12 shadow-sm border border-[#E2ECF5]">
          {/* Left: Fireplace Image */}
          <div className="lg:col-span-5 relative">
            <img
              src="/images/deserve.png"
              alt="Cozy Winter Cabin Fireplace"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right: Content */}
          <div className="lg:col-span-7 p-6 sm:p-10 md:p-12 lg:p-[50px] flex flex-col justify-center">
            <p className="section-eyebrow">
              BUILT FOR WINTER HOSTS
            </p>
            <h2 className="section-title">
              Your Property Deserves More Than a Listing
            </h2>
            <p className="mt-3.5 sm:mt-5 text-xs sm:text-base text-[#6B7FA3] leading-relaxed max-w-xl">
              Winterers is designed to help exceptional properties stand out. From the way your home is presented to the way guests discover and book it, every detail is designed around the winter travel experience.
            </p>

            {/* 3 Features / Points */}
            <div className="mt-5 flex flex-col gap-[15px]">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="flex items-center gap-3 sm:gap-[10px]">
                  <div className="w-[30px] h-[30px] rounded-[8px] bg-white flex items-center justify-center shrink-0 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
                    <Image className="w-[18px] h-[18px] text-[#0A1628]" strokeWidth={1.75} />
                  </div>
                  <span className="text-xs sm:text-sm text-[#0A1628]">
                    Premium property presentation
                  </span>
                </div>
                <div className="flex items-center gap-3 sm:gap-[10px]">
                  <div className="w-[30px] h-[30px] rounded-[8px] bg-white flex items-center justify-center shrink-0 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
                    <Target className="w-[18px] h-[18px] text-[#0A1628]" strokeWidth={1.75} />
                  </div>
                  <span className="text-xs sm:text-sm text-[#0A1628]">
                    Targeted winter travellers
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-3 sm:gap-[10px]">
                <div className="w-[30px] h-[30px] rounded-[8px] bg-white flex items-center justify-center shrink-0 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
                  <Settings className="w-[14px] h-[14px] text-[#0A1628]" strokeWidth={1.75} />
                </div>
                <span className="text-xs sm:text-sm text-[#0A1628]">
                  Simple host management
                </span>
              </div>
            </div>

            {/* Action Button */}
            <div className="mt-5">
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-[12px] sm:rounded-[18px] bg-[#02213B] hover:bg-[#051527] px-7 py-3.5 text-xs sm:text-sm font-medium text-white transition-all active:scale-95 shadow-sm"
              >
                Start Your Listing
              </button>
            </div>
          </div>
        </div>
      </Section>

      {/* Platform Features: More Than Visibility */}
      <Section tone="light" className="!pb-16 md:!pb-[110px] !bg-white !pt-0">
        <div className="text-center mb-10">
          <p className="section-eyebrow">
            PLATFORM FEATURES
          </p>
          <h2 className="section-title">
            More Than Visibility
          </h2>
          <p className="mt-[25px] text-sm sm:text-base text-[#98A1AC]">
            Tools designed to make hosting simpler.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Card 1: Premium Exposure (Left column, full height) */}
          <div className="relative overflow-hidden rounded-[14px] lg:col-span-5 flex flex-col justify-end p-6 sm:p-[30px] group">
            <img
              src="/images/visibility.png"
              alt="Premium Exposure - Winter Cabin"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[14px] bg-[#5AB4D433] w-fit mb-3">
                <TrendingUp className="w-3.5 h-3.5 text-[#5CBDE5]" />
                <span className="text-[11px] font-semibold text-[#5AB4D4] uppercase tracking-wider">
                  FEATURE 01
                </span>
              </div>
              <h3 className="text-2xl sm:text-[24px] font-bold text-white leading-tight">
                Premium Exposure
              </h3>
              <p className="mt-[5px] text-xs sm:text-sm text-[#FFFFFFB2] leading-relaxed">
                Get featured in curated winter collections and targeted search results.
              </p>
            </div>
          </div>

          {/* Right Bento Grid: 2 Rows of 2 Cards */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-12 gap-5 sm:gap-6">
            {/* Card 2: Booking Management */}
            <div className="rounded-[14px] bg-[#06243A] p-6 sm:p-[30px] flex flex-col justify-between sm:col-span-7 shadow-sm">
              <div>
                <div className="inline-flex items-center gap-[11px] px-[11px] py-[10px] rounded-[10px] bg-[#FFFFFF1A] w-fit mb-[22px]">
                  <Calendar className="w-3.5 h-3.5 text-[#FFFFFF]" />
                  <span className="text-xs font-semibold text-[#FFFFFF99] uppercase tracking-wider">
                    FEATURE 02
                  </span>
                </div>
                <h3 className="text-sm sm:text-base font-bold text-white mb-[22px] font-body">
                  Booking Management
                </h3>
              </div>

              <div className="flex flex-col gap-2">
                {/* Booking Item 1 */}
                <div className="flex items-center justify-between py-2 px-5 rounded-[10px] bg-[#FFFFFF0D]">
                  <div>
                    <p className="text-xs font-semibold text-white">Erik & Anna</p>
                    <p className="text-[11px] text-[#FFFFFF66] mt-0.5">Jan 12 – Jan 17</p>
                  </div>
                  <span className="px-3 py-[2px] rounded-full text-[11px] font-medium bg-[#5AB4D433] text-[#5AB4D4]">
                    Confirmed
                  </span>
                </div>

                {/* Booking Item 2 */}
                <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#0B2540] border border-white/5">
                  <div>
                    <p className="text-xs sm:text-sm font-semibold text-white">James L.</p>
                    <p className="text-[11px] text-[#7A8FA6] mt-0.5">Jan 20 – Jan 26</p>
                  </div>
                  <span className="px-3 py-1 rounded-full text-[11px] font-medium bg-[#142C44] text-[#8EA3BA] border border-white/10">
                    Pending
                  </span>
                </div>
              </div>
            </div>

            {/* Card 3: Availability Control */}
            <div className="rounded-[14px] bg-[#E8F3F9] border border-[#D4DDE6] p-6 sm:p-[30px] flex flex-col justify-between sm:col-span-5">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-[10px] rounded-[10px] bg-[#06243A14] w-fit mb-4">
                  <Calendar className="w-3.5 h-3.5 text-[#637C95]" />
                  <span className="text-xs font-semibold text-[#6B809099] uppercase tracking-wider">
                    FEATURE 02
                  </span>
                </div>
                <h3 className="text-sm sm:text-base font-bold text-[#06243A] mb-[22px] font-body">
                  Availability Control
                </h3>
              </div>

              {/* Mini Calendar UI */}
              <div className="w-full">
                <div className="grid grid-cols-7 text-center text-[11px] font-medium text-[#7A8FA6] mb-2.5">
                  <span>M</span>
                  <span>T</span>
                  <span>W</span>
                  <span>T</span>
                  <span>F</span>
                  <span>S</span>
                  <span>S</span>
                </div>
                <div className="grid grid-cols-7 text-center text-xs gap-y-2 items-center">
                  <span className="text-[#64748B]">1</span>
                  <span className="text-[#64748B]">2</span>
                  <span className="w-[40px] h-[23px] mx-auto flex items-center justify-center rounded-[4px] bg-[#5AB4D4] text-white font-semibold text-xs shadow-sm">
                    3
                  </span>
                  <span className="text-[#64748B]">4</span>
                  <span className="text-[#64748B]">5</span>
                  <span className="text-[#64748B]">6</span>
                  <span className="text-[#64748B]">7</span>

                  <span className="w-[40px] h-[23px] mx-auto flex items-center justify-center rounded-[6px] bg-[#D4E4F0] text-[#06243A] font-semibold text-xs">
                    8
                  </span>
                  <span className="text-[#64748B]">9</span>
                  <span className="text-[#64748B]">10</span>
                  <span className="text-[#64748B]">11</span>
                  <span className="w-[40px] h-[23px] mx-auto flex items-center justify-center rounded-[4px] bg-[#5AB4D4] text-white font-semibold text-xs shadow-sm">
                    12
                  </span>
                  <span className="text-[#64748B]">13</span>
                  <span className="text-[#64748B]">14</span>

                  <span className="text-[#7A8FA6]">15</span>
                  <span className="text-[#7A8FA6]">16</span>
                  <span className="text-[#7A8FA6]">17</span>
                  <span className="text-[#7A8FA6]">18</span>
                  <span className="text-[#7A8FA6]">19</span>
                  <span className="text-[#7A8FA6]">20</span>
                  <span className="text-[#7A8FA6]">21</span>
                </div>
              </div>
            </div>

            {/* Card 4: Host Insights */}
            <div className="rounded-[14px] bg-[#E8F3F9] border border-[#D4DDE6] p-6 sm:p-[30px] flex flex-col justify-between sm:col-span-7">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-[10px] rounded-[10px] bg-[#06243A14] w-fit mb-[14px]">
                  <ChartColumnIncreasing className="w-3.5 h-3.5 text-[#637C95]" />
                  <span className="text-[10px] font-semibold text-[#637C95] uppercase tracking-wider">
                    FEATURE 04
                  </span>
                </div>
                <h3 className="text-sm sm:text-base font-medium text-[#06243A] mb-[14px]">
                  Host Insights
                </h3>
              </div>

              {/* 3 Stats Side-by-Side */}
              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                <div className="bg-white rounded-[14px] p-[13px] text-center border border-[#D4DDE6]">
                  <p className="font-body text-base font-bold text-[#06243A]">1,248</p>
                  <p className="text-[11px] text-[#6B8090] mt-1">Views</p>
                  <p className="text-[11px] font-semibold text-[#5AB4D4] mt-1">+12%</p>
                </div>
                <div className="bg-white rounded-[14px] p-[13px] text-center border border-[#D4DDE6]">
                  <p className="font-body text-base font-bold text-[#06243A]">34</p>
                  <p className="text-[11px] text-[#6B8090] mt-1">Bookings</p>
                  <p className="text-[11px] font-semibold text-[#5AB4D4] mt-1">+8%</p>
                </div>
                <div className="bg-white rounded-[14px] p-[13px] text-center border border-[#D4DDE6]">
                  <p className="font-body text-base font-bold text-[#06243A]">€6.2k</p>
                  <p className="text-[11px] text-[#6B8090] mt-1">Revenue</p>
                  <p className="text-[11px] font-semibold text-[#5AB4D4] mt-1">+19%</p>
                </div>
              </div>
            </div>

            {/* Card 5: Secure Payments */}
            <div className="rounded-[14px] bg-[#08283F] p-6 sm:p-[30px] flex flex-col justify-between sm:col-span-5 shadow-sm">
              <div>
                <div className="w-10 h-10 rounded-full bg-[#5AB4D41A] border border-[#5AB4D41A] flex items-center justify-center text-[#5CBDE5] mb-[13px]">
                  <ShieldCheck className="w-5 h-5 text-[#5AB4D4]" />
                </div>
                <h3 className="text-sm sm:text-base font-medium text-white mb-2">
                  Secure Payments
                </h3>
                <p className="text-xs text-[#FFFFFF80] leading-relaxed">
                  Protected transactions and automatic payouts after each stay.
                </p>
              </div>

              <div className="mt-[13px] flex items-center gap-2 px-3 py-2 rounded-[14px] bg-[#FFFFFF0D]">
                <Lock className="w-3.5 h-3.5 text-[#5AB4D4] shrink-0" />
                <span className="text-[11px] text-[#5AB4D4] font-medium truncate">
                  Bank-level encryption
                </span>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Host Success Story */}
      <Section tone="dark" className=" !bg-[#031B30]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-[21px] items-start pt-2">
          {/* Left Column: Glowing Cabin Image */}
          <div className="lg:col-span-6 w-full">
            <div className="overflow-hidden rounded-[21px] relative w-full">
              <img
                src="/images/deal-img.png"
                alt="From Hidden Cabin to Winter Favourite"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right Column: Story & Stats */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <p className="section-eyebrow">
              HOST SUCCESS STORY
            </p>

            <h2 className="section-title !text-white !mt-[30px]">
              ”FROM HIDDEN CABIN TO WINTER FAVOURITE”
            </h2>

            {/* Quote with sky blue vertical accent border */}
            <div className="border-l-2 border-[#5CBDE5] pl-4 sm:pl-[22px] my-6 sm:my-[32px]">
              <p className="text-sm sm:text-base text-[#FFFFFFBF] leading-relaxed">
                “Winterers helped us present our cabin in a completely different way. Within weeks, we started attracting guests who were specifically looking for the kind of experience we offer.”
              </p>
            </div>

            {/* Host Avatar & Info */}
            <div className="flex items-center gap-[10px] mb-6 sm:mb-8">
              <img
                src="/images/host-anna.jpg"
                alt="Anna & Erik"
                className="w-[75px] h-[75px] rounded-full object-cover shrink-0"
              />
              <div>
                <h4 className="text-sm sm:text-base font-bold text-white leading-tight">
                  Anna &amp; Erik
                </h4>
                <p className="text-xs text-[#FFFFFF80] mt-2">
                  Cabin Host · Northern Norway
                </p>
              </div>
            </div>

            {/* Horizontal separator line */}
            <div className="border-t border-white/10 pt-6">
              <div className="flex items-center gap-6 sm:gap-[1px]">
                <div className="relative pr-[15px] after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2 after:h-[60px] after:w-px after:bg-white/10">
                  <span className="font-head text-xl sm:text-2xl font-bold text-[#5AB4D4] block leading-none">
                    +42%
                  </span>
                  <span className="text-xs sm:text-[13px] text-white/50 mt-3 block">
                    Booking enquiries
                  </span>
                </div>
                
                <div className='pl-[15px]'>
                  <span className="font-head text-xl sm:text-2xl font-bold text-white block leading-none">
                    4.9/5
                  </span>
                  <span className="text-xs sm:text-[13px] text-white/50 mt-3 block">
                    Guest rating
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* FAQ Section */}
      <Section tone="light" className="!pb-0 !bg-white">
        <div className="text-center mb-10">
          <p className="section-eyebrow">
            WHY LIST WITH US
          </p>
          <h2 className="section-title">
            Everything You Need to Host With Confidence
          </h2>
        </div>

        <div className="mx-auto max-w-[954px] border-t border-[#D4DDE6] divide-y divide-[#D4DDE6]">
          {faq.map(([q, a], i) => {
            const isOpen = openFaqs.includes(i);
            return (
              <div key={q} className="transition-colors">
                <button
                  type="button"
                  onClick={() => toggleFaq(i)}
                  className="flex w-full items-start justify-between text-left py-5 sm:py-[28px] cursor-pointer group select-none"
                  aria-expanded={isOpen}
                >
                  <div className="pr-4">
                    <span className="text-base sm:text-lg font-semibold text-[#06243A] group-hover:text-[#5CBDE5] transition-colors leading-snug block">
                      {q}
                    </span>
                    {isOpen && (
                      <p className="mt-3 text-sm sm:text-base text-[#6B8090] font-normal leading-relaxed pr-4 sm:pr-10 animate-in fade-in duration-200">
                        {a}
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
    </>
  );
}
