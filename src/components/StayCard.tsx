import type { Stay } from '../types';
import { Link } from 'react-router-dom';
import { img } from '../data';

export default function StayCard({
  s,
  detailed,
}: {
  s: Stay;
  detailed?: boolean;
}) {
  return (
    <div className="group rounded-2xl border border-slate-200/80 bg-white p-3 hover:shadow-md transition-all duration-300 flex flex-col justify-between">
      <div>
        {/* Card Image with Rating Badge */}
        <div className="relative h-48 sm:h-52 w-full overflow-hidden rounded-xl bg-slate-100">
          <img
            src={img(s.img)}
            alt={s.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <span className="absolute right-2.5 top-2.5 rounded-full bg-white/95 px-2.5 py-0.5 text-[11px] font-semibold text-navy flex items-center gap-1 shadow-sm backdrop-blur-sm">
            <svg
              className="w-3 h-3 text-navy/70"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
            {s.rating}
          </span>
        </div>

        {/* Location & Title */}
        <div className="pt-3 px-1">
          <div className="flex items-center gap-1 text-[11px] text-navy/50">
            <svg
              className="w-3 h-3 text-navy/40 shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span>{s.country}</span>
          </div>

          <h3 className="font-head text-sm sm:text-base font-semibold text-navy mt-1 truncate">
            {s.name}
          </h3>

          {/* Guests and Bedrooms */}
          <div className="flex items-center gap-3 text-[11px] text-navy/50 mt-1.5 font-body">
            <span className="flex items-center gap-1">
              <svg
                className="w-3.5 h-3.5 text-navy/40 shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
              {s.guests} guests
            </span>
            <span className="flex items-center gap-1">
              <svg
                className="w-3.5 h-3.5 text-navy/40 shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M2 4v16M2 8h18a2 2 0 0 1 2 2v10M2 17h20M6 8v9" />
              </svg>
              {s.beds} bedrooms
            </span>
          </div>

          {detailed && (
            <p className="mt-2 text-[11px] text-navy/50">{s.tags}</p>
          )}
        </div>
      </div>

      {/* Bottom Row: Price & View Stay Button */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between px-1">
        <div>
          <span className="font-head text-base sm:text-lg font-bold text-navy">
            €{s.price}
          </span>{' '}
          <span className="text-[11px] text-navy/50">/night</span>
          {detailed && (
            <p className="text-[10px] text-navy/50">
              €{s.price * 7} total · 7 nights
            </p>
          )}
        </div>

        <Link
          to={`/stays/${s.id}`}
          className="inline-flex items-center justify-center rounded-full bg-navy px-4 py-1.5 text-xs font-medium text-white transition-all hover:bg-navy/90 active:scale-95 shadow-sm"
        >
          View Stay
        </Link>
      </div>
    </div>
  );
}
