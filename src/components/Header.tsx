import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import WinterersLogo from './WinterersLogo';
import { nav } from '../data';

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="absolute inset-x-0 top-0 z-30 pt-3 sm:pt-5 md:pt-6 px-3 sm:px-6 lg:px-8">
      <div className="rounded-2xl md:rounded-[18px] bg-white transition-all">
        <div className="flex items-center justify-between px-4 sm:px-8 md:px-[25px] py-3 sm:py-[17px]">
          {/* Logo */}
          <Link
            to="/"
            className="shrink-0 transition-opacity hover:opacity-95"
            onClick={() => setOpen(false)}
          >
            <WinterersLogo />
          </Link>

          {/* Navigation Links (Desktop) */}
          <nav className="hidden items-center gap-7 lg:gap-10 text-[13px] sm:text-sm font-medium lg:flex">
            {nav.map(([label, path]) => (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) =>
                  `relative flex flex-col items-center py-1 transition-colors ${
                    isActive
                      ? 'text-sky font-semibold'
                      : 'text-navy/85 hover:text-sky'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span>{label}</span>
                    {isActive && (
                      <span className="absolute -bottom-1 h-0.5 w-3.5 rounded-full bg-sky" />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Action Buttons (Desktop) */}
          <div className="hidden items-center gap-3 lg:flex">
            <Link
              to="#"
              className="inline-flex items-center justify-center rounded-[18px] border border-slate-200/90 bg-white px-5 sm:px-6 py-2 sm:py-2.5 text-sm sm:text-base font-medium text-navy hover:border-slate-300 hover:bg-slate-50 transition"
            >
              Sign In
            </Link>
            <Link
              to="/list-property"
              className="inline-flex items-center justify-center rounded-[18px] bg-[#02213B] px-5 sm:px-6 py-2 sm:py-2.5 text-sm sm:text-base font-medium text-white hover:bg-navy/90 transition"
            >
              List Your Property
            </Link>
          </div>

          {/* Mobile Menu Hamburger Toggle */}
          <button
            type="button"
            aria-label="Toggle navigation menu"
            onClick={() => setOpen(!open)}
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-lg text-navy hover:bg-mist lg:hidden transition"
          >
            <span
              className={`h-0.5 w-5 bg-navy transition-transform duration-200 ${
                open ? 'translate-y-2 rotate-45' : ''
              }`}
            />
            <span
              className={`h-0.5 w-5 bg-navy transition-opacity duration-200 ${
                open ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`h-0.5 w-5 bg-navy transition-transform duration-200 ${
                open ? '-translate-y-2 -rotate-45' : ''
              }`}
            />
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {open && (
          <div className="border-t border-navy/10 px-5 py-4 lg:hidden animate-in fade-in slide-in-from-top-2 duration-200">
            <nav className="flex flex-col space-y-1">
              {nav.map(([label, path]) => (
                <NavLink
                  key={path}
                  to={path}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `block rounded-xl px-4 py-2.5 text-sm font-medium transition ${
                      isActive
                        ? 'bg-mist text-sky font-semibold'
                        : 'text-navy hover:bg-mist/70'
                    }`
                  }
                >
                  {label}
                </NavLink>
              ))}
            </nav>
            <div className="mt-4 flex flex-col gap-2 pt-3 border-t border-navy/10">
              <Link
                to="#"
                onClick={() => setOpen(false)}
                className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white py-2.5 text-sm font-medium text-navy hover:bg-slate-50 transition"
              >
                Sign In
              </Link>
              <Link
                to="/list-property"
                onClick={() => setOpen(false)}
                className="inline-flex items-center justify-center rounded-full bg-navy py-2.5 text-sm font-medium text-white hover:bg-navy/90 transition shadow-sm"
              >
                List Your Property
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
