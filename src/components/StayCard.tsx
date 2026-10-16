import type { Stay } from '../types';
import { Link } from 'react-router-dom';
import { Star, MapPin, Users, Bed } from 'lucide-react';
import { img } from '../data';

export default function StayCard({
  s,
  detailed = true,
}: {
  s: Stay;
  detailed?: boolean;
}) {
  return (
    <div className="group rounded-[14px] border border-[#D1D7DD] bg-white p-5 hover:shadow-lg transition-all duration-300 flex flex-col justify-between h-full">
      <div>
        {/* Card Image with Rating Badge */}
        <div className="relative w-full overflow-hidden rounded-[10px]">
          <img
            src={img(s.img)}
            alt={s.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <span className="absolute right-[10px] top-[10px] rounded-full bg-white/95 px-[10px] py-[7px] text-xs font-semibold text-[#02213B] flex items-center gap-[5px] shadow-sm backdrop-blur-sm">
            <Star className="w-3 h-3 text-[#02213B] fill-[#02213B]" />
            {s.rating}
          </span>
        </div>

        {/* Location & Title */}
        <div className="pt-5">
          <div className="flex items-center gap-[5px] text-xs text-[#98A1AC]">
            <MapPin className="w-3.5 h-3.5 text-[#98A1AC] shrink-0" />
            <span>{s.country}</span>
          </div>

          <h3 className="font-head text-base sm:text-xl font-semibold text-[#02213B] mt-[5px] truncate">
            {s.name}
          </h3>

          {/* Guests and Bedrooms */}
          <div className="flex items-center gap-3 text-xs text-[#98A1AC] mt-[10px] font-body">
            <span className="flex items-center gap-[5px]">
              <Users className="w-3.5 h-3.5 text-[#98A1AC] shrink-0" />
              {s.guests} guests
            </span>
            <span className="flex items-center gap-[5px]">
              <Bed className="w-3.5 h-3.5 text-[#98A1AC] shrink-0" />
              {s.beds} bedrooms
            </span>
          </div>

          {/* Tags */}
          <p className="mt-[15px] text-sm text-[#98A1AC] truncate">
            {s.tags}
          </p>
        </div>
      </div>

      {/* Bottom Row: Price & View Stay Button */}
      <div className="mt-5 pt-5 border-t border-[#D1D7DD] flex items-center justify-between">
        <div>
          <div className="flex items-baseline gap-1">
            <span className="font-head text-lg sm:text-xl font-bold text-[#02213B]">
              €{s.price}
            </span>
            <span className="text-xs text-[#98A1AC]">/night</span>
          </div>
          <p className="text-sm text-[#98A1AC] mt-[5px]">
            €{s.price * 7} total · 7 nights
          </p>
        </div>

        <Link
          to={`/stays/${s.id}`}
          className="inline-flex items-center justify-center rounded-[12px] bg-[#071D36] hover:bg-sky px-4 py-2 text-sm font-semibold text-white transition-all active:scale-95 shadow-sm whitespace-nowrap"
        >
          View Stay
        </Link>
      </div>
    </div>
  );
}
