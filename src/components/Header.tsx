import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, ChevronRight } from 'lucide-react';
import WinterersLogo from './WinterersLogo';
import { nav } from '../data';

export default function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  // Close drawer on route change
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <header className="absolute inset-x-0 top-0 z-30 px-3 sm:px-6 py-5">
        <div className="">
          <div className="rounded-[18px] bg-white border border-[#D0DCE8] transition-all">
            <div className="flex items-center justify-between lg:grid lg:grid-cols-[auto_1fr_auto] xl:grid-cols-[1fr_auto_1fr] px-4 sm:px-5 lg:px-6 py-3 sm:py-3.5">
              {/* Logo (Left) */}
              <div className="flex items-center justify-start shrink-0">
                <Link
                  to="/"
                  className="shrink-0 transition-opacity hover:opacity-95"
                  onClick={() => setOpen(false)}
                >
                  <WinterersLogo />
                </Link>
              </div>

              {/* Navigation Links (Exact Center) */}
              <nav className="hidden items-center justify-center gap-4 lg:gap-6 xl:gap-9 text-xs sm:text-sm xl:text-base font-medium lg:flex min-w-0">
                {nav.map(([label, path]) => (
                  <NavLink
                    key={path}
                    to={path}
                    end={path === '/'}
                    className={({ isActive }) =>
                      `group relative flex flex-col items-center py-1 transition-colors duration-200 whitespace-nowrap ${
                        isActive
                          ? 'text-[#7EC8E3] font-semibold'
                          : 'text-navy/80 hover:text-[#7EC8E3]'
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <span>{label}</span>
                        <span
                          className={`absolute -bottom-1 left-1/2 -translate-x-1/2 h-[2.5px] rounded-full bg-[#7EC8E3] transition-all duration-300 ease-out ${
                            isActive
                              ? 'w-5 group-hover:w-6 opacity-100'
                              : 'w-0 opacity-0 group-hover:w-5 group-hover:opacity-100'
                          }`}
                        />
                      </>
                    )}
                  </NavLink>
                ))}
              </nav>

              {/* Action Buttons (Right) */}
              <div className="hidden items-center justify-end gap-2.5 xl:gap-[15px] lg:flex shrink-0">
                <Link
                  to="#"
                  className="header-btn-signin inline-flex items-center justify-center rounded-xl xl:rounded-[18px] border border-[#BDCDDE] bg-white px-3.5 sm:px-4 xl:px-6 py-2 sm:py-2.5 text-xs sm:text-sm xl:text-base font-medium text-[#02213B] whitespace-nowrap shadow-xs"
                >
                  <span className="relative z-10">Sign In</span>
                </Link>
                <Link
                  to="/list-property"
                  className="header-btn-list inline-flex items-center justify-center rounded-xl xl:rounded-[18px] bg-[#02213B] px-3.5 sm:px-4 xl:px-6 py-2 sm:py-2.5 text-xs sm:text-sm xl:text-base font-medium text-white whitespace-nowrap shadow-xs"
                >
                  <span className="relative z-10">List Your Property</span>
                </Link>
              </div>

              {/* Mobile Menu Toggle Button */}
              <button
                type="button"
                aria-label="Open menu"
                onClick={() => setOpen(true)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-navy hover:bg-slate-100 lg:hidden transition"
              >
                <Menu className="h-6 w-6 text-[#02213B]" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Off-Canvas Left Sidebar Drawer */}
      {/* Backdrop Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setOpen(false)}
      />

      {/* Drawer Container (Slides from left) */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-[285px] sm:w-[320px] bg-white h-full shadow-2xl flex flex-col justify-between transform transition-transform duration-300 ease-in-out lg:hidden ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          {/* Drawer Header */}
          <div className="flex items-center justify-between p-5 sm:p-6 border-b border-slate-100">
            <Link to="/" onClick={() => setOpen(false)}>
              <WinterersLogo />
            </Link>
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-xl text-slate-500 hover:bg-slate-100 hover:text-navy transition"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Drawer Nav Links */}
          <nav className="p-4 sm:p-5 space-y-1.5">
            {nav.map(([label, path]) => (
              <NavLink
                key={path}
                to={path}
                end={path === '/'}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `flex items-center justify-between px-4 py-3 rounded-2xl text-sm sm:text-base font-medium transition ${
                    isActive
                      ? 'bg-[#EEF6FC] text-[#0284C7] font-semibold'
                      : 'text-[#1E293B] hover:bg-slate-50'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span>{label}</span>
                    {isActive ? (
                      <span className="h-2 w-2 rounded-full bg-[#7EC8E3]" />
                    ) : (
                      <ChevronRight className="h-4 w-4 text-slate-400" />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Drawer Footer Buttons */}
        <div className="p-5 sm:p-6 border-t border-slate-100 bg-[#F8FAFC] flex flex-col gap-2.5">
          <Link
            to="#"
            onClick={() => setOpen(false)}
            className="header-btn-signin inline-flex w-full items-center justify-center rounded-[18px] border border-slate-200 bg-white py-2.5 text-sm font-semibold text-navy shadow-sm"
          >
            <span className="relative z-10">Sign In</span>
          </Link>
          <Link
            to="/list-property"
            onClick={() => setOpen(false)}
            className="header-btn-list inline-flex w-full items-center justify-center rounded-[18px] bg-[#02213B] py-2.5 text-sm font-semibold text-white shadow-sm"
          >
            <span className="relative z-10">List Your Property</span>
          </Link>
        </div>
      </aside>
    </>
  );
}
