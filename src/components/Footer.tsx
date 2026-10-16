import { useState } from 'react';
import { Link } from 'react-router-dom';
import { footer } from '../data';

const getHref = (item: string) => {
  switch (item) {
    case 'Winter Stays':
      return '/stays';
    case 'Destinations':
      return '/destinations';
    case 'Experiences':
      return '/experiences';
    case 'Offers':
      return '/offers';
    case 'Finland':
    case 'Norway':
    case 'Switzerland':
    case 'Iceland':
    case 'Austria':
      return '/destinations';
    case 'List Your Property':
      return '/list-property';
    default:
      return '#';
  }
};

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
    <footer className="relative bg-[#0D1F35] text-white">
      {/* Newsletter Section with Top Background Split */}
      <div className="relative">
        {/* Upper 50% split background in white to match page above */}
        <div className="absolute inset-x-0 top-0 h-1/2 bg-white pointer-events-none" />

        <div className="relative z-10 mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 py-8 sm:py-[110px]">
          <div className="relative overflow-hidden rounded-[24px] sm:rounded-[32px] bg-slate-900 shadow-2xl">
            {/* Background Image of Cozy Winter Cabin */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
              style={{ backgroundImage: `url('/images/footer-bg.png')` }}
            />

            {/* Newsletter Card Content */}
            <div className="relative z-10 px-6 py-12 sm:px-10 sm:py-16 md:py-20 text-center text-white">
              <p className="font-head text-[11px] sm:text-xs font-semibold uppercase tracking-[0.22em] text-sky">
                Stay Inspired
              </p>
              <h2 className="mt-2.5 sm:mt-3 font-head text-2xl sm:text-3xl md:text-4xl font-semibold text-white tracking-tight leading-tight">
                Stay Inspired This Winter
              </h2>
              <p className="mx-auto mt-2.5 sm:mt-3 max-w-lg text-xs sm:text-sm md:text-[15px] text-white/80 leading-relaxed font-body px-2">
                Get winter travel inspiration, exclusive stays and special offers delivered straight to your inbox.
              </p>

              <form
                onSubmit={handleSubscribe}
                className="mx-auto mt-6 sm:mt-7 flex max-w-[460px] flex-col gap-2.5 sm:flex-row sm:gap-3"
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="h-11 sm:h-12 flex-1 rounded-xl bg-white/10 px-4 text-xs sm:text-sm text-white placeholder-white/50 backdrop-blur-md border border-white/20 outline-none focus:border-sky focus:ring-1 focus:ring-sky transition-all"
                />
                <button
                  type="submit"
                  className="h-11 sm:h-12 rounded-xl bg-sky px-6 sm:px-7 text-xs sm:text-sm font-semibold text-navy transition-all duration-200 hover:brightness-105 active:scale-95 shadow-sm whitespace-nowrap"
                >
                  {subscribed ? 'Subscribed!' : 'Subscribe'}
                </button>
              </form>

              <p className="mt-4 text-xs sm:text-sm text-white/50 font-body">
                No spam. Just winter inspiration.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Info */}
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 md:pt-14 pb-10 sm:pb-12">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-[1.5fr_repeat(4,1fr)] lg:gap-8">
          {/* Brand Column */}
          <div className="sm:col-span-2 md:col-span-3 lg:col-span-1">
            <Link to="/" className="inline-block">
              <img
                src="/images/Logo.png"
                alt="Winterers"
                className="h-10 sm:h-11 w-auto object-contain brightness-0 invert opacity-95 hover:opacity-100 transition-opacity"
              />
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-white/60 font-body">
              A platform for people who prefer winter. Discover unique stays, unforgettable destinations and experiences made for the coldest season.
            </p>

            {/* Social Icons */}
            <div className="mt-6 flex items-center gap-4">
              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-white/[0.08] hover:bg-white/20 border border-white/10 flex items-center justify-center text-white/70 hover:text-white transition-all duration-200 hover:scale-105"
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
                className="w-9 h-9 rounded-full bg-white/[0.08] hover:bg-white/20 border border-white/10 flex items-center justify-center text-white/70 hover:text-white transition-all duration-200 hover:scale-105"
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
                className="w-9 h-9 rounded-full bg-white/[0.08] hover:bg-white/20 border border-white/10 flex items-center justify-center text-white/70 hover:text-white transition-all duration-200 hover:scale-105"
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
                className="w-9 h-9 rounded-full bg-white/[0.08] hover:bg-white/20 border border-white/10 flex items-center justify-center text-white/70 hover:text-white transition-all duration-200 hover:scale-105"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>

          {/* 4 Navigation Columns */}
          {footer.map(([title, links]) => (
            <div key={title}>
              <h4 className="mb-3.5 sm:mb-4 font-head text-[11px] sm:text-sm font-semibold uppercase tracking-[0.14em] text-white/50">
                {title}
              </h4>
              <ul className="space-y-2.5 sm:space-y-3 font-body">
                {links.map((link) => {
                  const to = getHref(link);
                  const isInternal = to.startsWith('/');
                  return (
                    <li key={link}>
                      {isInternal ? (
                        <Link
                          to={to}
                          className="text-xs sm:text-sm text-white/70 hover:text-sky transition-colors duration-150 inline-block"
                        >
                          {link}
                        </Link>
                      ) : (
                        <a
                          href={to}
                          className="text-xs sm:text-sm text-white/70 hover:text-sky transition-colors duration-150 inline-block"
                        >
                          {link}
                        </a>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Divider and Copyright Bar */}
        <div className="mt-12 sm:mt-16 md:mt-20 border-t border-white/10 pt-6 sm:pt-7">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] sm:text-xs text-white/40 font-body">
            <span>© 2025 Winterers. All rights reserved.</span>
            <span>Made for people who prefer winter.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
