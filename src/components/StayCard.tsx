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
        </div>
      </div>

      {/* Bottom Row: Price & View Stay Button */}
      <div className="pt-5 flex items-center justify-between">
        <div>
          <div className="flex items-baseline gap-1">
            <span className="font-head text-lg sm:text-xl font-bold text-[#02213B]">
              €{s.price}
            </span>
            <span className="text-xs text-[#98A1AC]">/night</span>
          </div>
        </div>

        <Link
          to={`/stays/${s.id}`}
          className="inline-flex items-center justify-center rounded-[12px] bg-[#071D36] hover:bg-sky px-4 py-2 text-sm font-medium text-white transition-all active:scale-95 shadow-sm whitespace-nowrap"
        >
          View Stay
        </Link>
      </div>
    </div>
  );
}
