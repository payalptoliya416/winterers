import { useState } from 'react';
import { ChevronDown, Globe, Camera, SlidersHorizontal, Headphones, Check } from 'lucide-react';
import Hero from '../components/Hero';
import Button from '../components/Button';
import Section from '../components/Section';
import SectionHead from '../components/SectionHead';
import Feature from '../components/Feature';
import ImgBg from '../components/ImgBg';

const steps = [
  ['Tell Us About Your Property', 'Share your location, property type and essential details.'],
  ['Build Your Listing', 'Add photographs, amenities, pricing and availability.'],
  ['Go Live', 'Our team reviews and helps prepare it for travellers.'],
  ['Welcome Your Guests', 'Start receiving bookings from winter travellers.'],
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
  ['How much does it cost to list my property?', 'Listing is free. We take a small commission only when a booking is made.'],
  ['What properties can I list?', 'Mountain cabins, luxury chalets, forest retreats, lakeside lodges and remote winter homes.'],
  ['How does the approval process work?', 'Our team reviews within 2–3 business days.'],
  ['How do bookings and payments work?', 'Secure payouts after each stay.'],
  ['Can I manage my own availability?', 'Yes, from your dashboard.'],
];

export default function ListProperty() {
  const [open, setOpen] = useState(0);
  const [country, setCountry] = useState('');
  const [agreed, setAgreed] = useState(false);

  return (
    <>
      <Hero
        name="l-host.png"
        eyebrow="For property owners"
        title="Turn Your Property Into a"
        accent="Winter Escape"
        text="Share your property with travellers looking for unforgettable winter stays."
      >
      </Hero>

      <Section tone="light" className="!pt-8 sm:!pt-12">
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
                <h2 className="section-title">
                  Submit Your Property
                </h2>
                <p className="mt-1.5 text-xs sm:text-sm text-[#7A8FA6]">
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
                <div>
                  <label className="block text-xs sm:text-base text-[#1A1A1A] mb-[10px]">
                    Phone Number<span className="text-[#DB0505] ml-0.5">*</span>
                  </label>
                  <div className="flex items-center w-full rounded-full bg-white border border-[#EBEBEB] px-6 py-3 text-sm sm:text-base text-[#0F172A] transition focus-within:border-[#7EC8E3]">
                    <div className="flex items-center gap-1.5 text-[#0F172A] font-medium shrink-0 cursor-pointer select-none">
                      <span>+00</span>
                      <ChevronDown className="w-3.5 h-3.5 text-[#888888]" />
                    </div>
                    <span className="h-4 w-px bg-[#EBEBEB] mx-3 shrink-0" />
                    <input
                      type="tel"
                      required
                      placeholder="123 456 7890"
                      className="w-full bg-transparent border-0 p-0 text-sm sm:text-base text-[#0F172A] placeholder:text-[#888888] focus:outline-none focus:ring-0"
                    />
                  </div>
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
                  rows={3}
                  required
                  placeholder="Tell us about your property: location, amenities, unique features, number of bedrooms/bathrooms..."
                  className="w-full rounded-[18px] bg-white border border-[#EBEBEB] px-6 py-3 text-sm sm:text-base text-[#0F172A] placeholder:text-[#888888] transition focus:outline-none"
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

      <Section tone="light" className="!py-16 md:!py-24">
        <div className="text-center mb-12 sm:mb-16">
          <p className="section-eyebrow mb-2">
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
                <span className="font-head text-4xl sm:text-5xl font-bold text-[#E2EAF2] tracking-tight">
                  {num}
                </span>
                <div className="w-11 h-11 rounded-[12px] bg-white border border-slate-200/90 shadow-sm flex items-center justify-center text-[#071D36] shrink-0">
                  <Icon className="w-5 h-5 text-[#071D36]" strokeWidth={1.75} />
                </div>
              </div>

              {/* Title */}
              <h3 className="font-head text-base sm:text-lg font-bold text-[#071D36] mt-5 sm:mt-6">
                {title}
              </h3>

              {/* Description */}
              <p className="mt-2 text-xs sm:text-sm text-[#7A8FA6] leading-relaxed">
                {text}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="dark">
        <SectionHead center title="From Your Property to Your First Booking" eyebrow="The process" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map(([t, x], i) => (
            <div key={t} className="text-center">
              <span className="mx-auto mb-3 flex h-9 w-9 items-center justify-center rounded-full bg-white text-xs text-navy">
                {i + 1}
              </span>
              <h3 className="text-xs font-medium">{t}</h3>
              <p className="mt-1 text-[10px] text-white/60">{x}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Button variant="light">Start Your Listing</Button>
        </div>
      </Section>

      <Section>
        <Feature
          reverse={false}
          name="l-cozy"
          eyebrow="Built for winter hosts"
          title="Your Property Deserves More Than a Listing"
          text="Winterers is designed to help exceptional properties stand out."
        >
          <Button>Start Your Listing</Button>
        </Feature>
      </Section>

      <Section tone="dark">
        <Feature
          tone="dark"
          name="l-host"
          eyebrow="Host success story"
          title='"FROM HIDDEN CABIN TO WINTER FAVOURITE"'
          text="Winterers helped us present our cabin in a completely different way."
        >
          <b className="mr-8 text-sky">
            +42%{' '}
            <span className="text-[10px] text-white/50">Booking enquiries</span>
          </b>
          <b>4.9/5</b>
        </Feature>
      </Section>

      <Section>
        <SectionHead center title="Everything You Need to Host With Confidence" eyebrow="Why list with us" />
        <div className="mx-auto max-w-2xl divide-y divide-navy/10">
          {faq.map(([q, a], i) => (
            <div key={q} className="py-4">
              <button
                onClick={() => setOpen(open === i ? -1 : i)}
                className="flex w-full justify-between text-left text-xs font-medium"
              >
                <span>{q}</span>
                <span>{open === i ? '−' : '+'}</span>
              </button>
              {open === i && <p className="mt-2 text-[10px] text-navy/50">{a}</p>}
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
