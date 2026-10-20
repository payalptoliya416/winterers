import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Home, Mountain, Users } from 'lucide-react';

const quickLinks = [
  { label: 'Home', path: '/' },
  { label: 'Destinations', path: '/destinations' },
  { label: 'Winter Stays', path: '/stays' },
  { label: 'Experiences', path: '/experiences' },
  { label: 'Offers', path: '/offers' },
  { label: 'List Your Property', path: '/list-property' },
];

const propertyCategories = [
  'Beach Houses',
  'Cabins',
  'Chalets',
  'Lake Houses',
  'Villas',
  'Glass Igloos & Domes',
  'Remote Hideaways',
];

const features = [
  {
    icon: MapPin,
    title: 'Handpicked Destinations',
    desc: 'Unique winter locations around the world.',
    path: '/destinations',
  },
  {
    icon: Home,
    title: 'Premium Winter Stays',
    desc: 'Cabins, chalets, villas & more.',
    path: '/stays',
  },
  {
    icon: Mountain,
    title: 'Unforgettable Experiences',
    desc: 'Activities for every winter lover.',
    path: '/experiences',
  },
  {
    icon: Users,
    title: 'List Your Property',
    desc: 'Reach travelers worldwide.',
    path: '/list-property',
  },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
      setEmail('');
    }
  };

  return (
    <footer className="relative bg-[#07192C] text-white">
      {/* Top Split Section with Newsletter Card */}
      <div className="relative">

        {/* Upper 50% split background in white to match page content above */}
        <div className="absolute inset-x-0 top-0 h-1/2 bg-white pointer-events-none" />

        {/* Newsletter Floating / Overlapping Card */}
        <div className="relative z-10 site-container pt-8 sm:pt-14 md:pt-16">
          <div className="relative overflow-hidden rounded-[26px] sm:rounded-[32px] bg-[#07192C]">
            {/* Background Image of Cozy Winter Cabin */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
              style={{ backgroundImage: `url('/images/footer-bg.png')` }}
            />
            {/* Newsletter Card Content */}
            <div className="relative z-10 px-6 py-12 sm:px-10 sm:py-16 md:py-20 text-center text-white">
              <p className="section-eyebrow">
                STAY INSPIRED
              </p>
              <h2 className="section-title !text-white">
                Stay Inspired This Winter
              </h2>
              <p className="mx-auto mt-2.5 sm:mt-[20px] max-w-xl text-xs sm:text-sm md:text-base text-white/80 leading-relaxed font-body px-2">
                Get winter travel inspiration, exclusive stays and special offers delivered straight to your inbox.
              </p>

              <form
                onSubmit={handleSubscribe}
                className="mx-auto mt-[25px] flex max-w-[523px] flex-col gap-2.5 sm:flex-row sm:gap-[15px]"
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="h-12 sm:h-13 flex-1 rounded-[18px] bg-[#FFFFFF26] px-6 py-4 text-xs sm:text-base text-white placeholder-white outline-none focus:border-[#7EC8E3] transition-all"
                />
                <button
                  type="submit"
                  className="h-12 sm:h-13 rounded-[18px] bg-[#7EC8E3] hover:bg-[#6bc7ea] px-7 sm:px-9 text-xs sm:text-base font-medium text-[#0D1F35] transition-all duration-200 active:scale-95 whitespace-nowrap cursor-pointer"
                >
                  {subscribed ? 'Subscribed!' : 'Subscribe'}
                </button>
              </form>

              <p className="mt-[15px] text-sm text-white font-body">
                No spam. Just winter inspiration.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="site-container pt-4 sm:pt-8 md:pt-[60px] pb-5 sm:pb-[25px]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1.2fr_1.5fr] gap-10 lg:gap-12">
          {/* Column 1: Brand Info & Socials */}
          <div>
            <Link to="/" className="inline-block">
              <img
                src="/images/footer-logo.png"
                alt="Winterers"
                className="w-full max-w-[108px]"
              />
            </Link>
            <p className="mt-5 text-xs sm:text-sm !leading-[24px] text-[#8AA8C8] font-body">
              A platform for people who prefer winter. Discover unique stays, unforgettable destinations and experiences made for the coldest season.
            </p>

            {/* Social Icons */}
            <div className="mt-5 flex items-center gap-3">
              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 rounded-full bg-[#1A3554] hover:bg-white/15 flex items-center justify-center text-white/70 hover:text-white transition-all duration-200 hover:scale-105"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>

              {/* Facebook */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-10 h-10 rounded-full bg-[#1A3554] hover:bg-white/15 flex items-center justify-center text-white/70 hover:text-white transition-all duration-200 hover:scale-105"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>

              {/* Twitter / X */}
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="w-10 h-10 rounded-full bg-[#1A3554] hover:bg-white/15 flex items-center justify-center text-white/70 hover:text-white transition-all duration-200 hover:scale-105"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
                </svg>
              </a>

              {/* YouTube */}
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-10 h-10 rounded-full bg-[#1A3554] hover:bg-white/15 flex items-center justify-center text-white/70 hover:text-white transition-all duration-200 hover:scale-105"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="mb-4 sm:mb-[18px] font-head text-xs font-bold uppercase tracking-[0.16em] text-[#8AA8C8]">
              QUICK LINKS
            </h4>
            <ul className="space-y-5 font-body">
              {quickLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.path}
                    className="text-xs sm:text-sm text-[#F0F4F8]/70 hover:text-[#7EC8E3] transition inline-block"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Property Category */}
          <div>
            <h4 className="mb-4 sm:mb-[18px] font-head text-xs font-bold uppercase tracking-[0.16em] text-[#8AA8C8]">
              PROPERTY CATEGORY
            </h4>
            <ul className="space-y-5 font-body">
              {propertyCategories.map((cat) => (
                <li key={cat}>
                  <Link
                    to={cat === 'Beach Houses' ? '/beach-houses' : '/stays'}
                    className="text-xs sm:text-sm text-[#F0F4F8]/70 hover:text-[#7EC8E3] transition inline-block"
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Highlights / Features with Icon Badges */}
          <div>
            <div className="space-y-[27px]">
              {features.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.title}
                    to={item.path}
                    className="flex items-center gap-[10px] group text-left"
                  >
                    <div className="w-[36px] h-[36px] rounded-full bg-white/[0.08] flex items-center justify-center text-[#8AA8C8] shrink-0 group-hover:bg-[#7EC8E3] group-hover:text-[#07192C] transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="block text-xs sm:text-sm font-medium text-[#F0F4F8] group-hover:text-[#7EC8E3] transition-colors">
                        {item.title}
                      </span>
                      <span className="block text-[11px] sm:text-xs text-[#F0F4F8]/70 mt-[5px] font-body">
                        {item.desc}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Divider and Copyright Bar */}
        <div className="mt-12 sm:mt-16 md:mt-10 border-t border-[#1A3554] pt-6 sm:pt-[26px]">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#8AA8C8] font-body">
            <span>© 2025 Winterers. All rights reserved.</span>
            <span>Made for people who prefer winter.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
