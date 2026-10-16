import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Mousewheel } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import { Star, MapPin, Users, Bed } from 'lucide-react';
import { img } from '../data';
import type { Stay } from '../types';

export default function CuratedExperiencesSlider({ stays }: { stays: Stay[] }) {
  return (
    <section className="py-12 md:py-[110px] bg-white overflow-hidden">
      <div className="site-container">
        <div className="flex flex-col sm:flex-row sm:items-end justify-center gap-4 mb-6 text-center">
          <div>
            <p className="section-eyebrow mb-1.5 sm:mb-2">
              CURATED PICKS
            </p>
            <h2 className="section-title">
              Experiences Worth Travelling For
            </h2>
          </div>
        </div>
      </div>

      {/* Swiper Slider: starts at left container edge and bleeds off to the right edge */}
      <div
        className="mt-6 sm:mt-8"
        style={{
          paddingLeft: 'max(1rem, calc((100vw - var(--container-max-w)) / 2 + 1.5rem))',
        }}
      >
        <Swiper
          modules={[FreeMode, Mousewheel]}
          slidesPerView={1.2}
          spaceBetween={16}
          freeMode={true}
          grabCursor={true}
          mousewheel={{ forceToAxis: true }}
          className="!overflow-visible"
          breakpoints={{
            640: {
              slidesPerView: 2.2,
              spaceBetween: 18,
            },
            1024: {
              slidesPerView: 3.5,
              spaceBetween: 20,
            },
          }}
        >
          {stays.map((item) => (
            <SwiperSlide key={item.id} className="h-auto">
              <div className="group rounded-[14px] border border-[#D1D7DD] bg-white p-5 hover:shadow-lg transition-all duration-300 flex flex-col justify-between h-full">
                  <div>
                    {/* Card Image with Rating Badge */}
                    <div className="relative w-full overflow-hidden rounded-[10px]">
                      <img
                        src={img(item.img)}
                        alt={item.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>

                    {/* Location & Title */}
                    <div className="pt-5">
                      <div className="flex items-center gap-[5px] text-xs text-[#98A1AC]">
                        <MapPin className="w-3.5 h-3.5 text-[#98A1AC] shrink-0" />
                        <span>{item.country}</span>
                      </div>

                      <h3 className="font-head text-base sm:text-xl font-semibold text-[#02213B] mt-[5px] truncate">
                        {item.name}
                      </h3>

                      {/* Guests and Bedrooms */}
                      <div className="flex items-center gap-3 text-xs text-[#98A1AC] mt-[10px] font-body">
                        <span className="flex items-center gap-[5px]">
                          <Users className="w-3.5 h-3.5 text-[#98A1AC] shrink-0" />
                          {item.guests} guests
                        </span>
                        <span className="flex items-center gap-[5px]">
                          <Bed className="w-3.5 h-3.5 text-[#98A1AC] shrink-0" />
                          {item.beds} beds
                        </span>
                      </div>

                      {/* Tags */}
                      <p className="mt-[15px] text-sm text-[#98A1AC] truncate">
                        {item.tags}
                      </p>
                    </div>
                  </div>

                  {/* Bottom Row: Price & View Stay Button */}
                  <div className="mt-5 pt-5 border-t border-[#D1D7DD] flex items-center justify-between">
                    <div>
                      <div className="flex items-baseline gap-1">
                        <span className="font-head text-lg sm:text-xl font-bold text-[#02213B]">
                          €{item.price}
                        </span>
                        <span className="text-xs text-[#98A1AC]">/night</span>
                      </div>
                      <p className="text-sm text-[#98A1AC] mt-[5px]">
                        €{item.price * 7} total · 7 nights
                      </p>
                    </div>

                    <Link
                      to={`/stays/${item.id}`}
                      className="inline-flex items-center justify-center rounded-[12px] bg-[#071D36] hover:bg-sky px-4 py-2 text-sm font-semibold text-white transition-all active:scale-95 shadow-sm whitespace-nowrap"
                    >
                      View Stay
                    </Link>
                  </div>
                </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
