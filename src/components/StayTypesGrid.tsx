import { Link } from 'react-router-dom';
import { img } from '../data';

const rightItems = [
  { label: 'Cabins', img: 'find02.png' },
  { label: 'Chalets', img: 'find03.png' },
  { label: 'Lake Houses', img: 'find04.png' },
  { label: 'Villas', img: 'find05.png' },
  { label: 'Glass Igloos & Domes', img: 'find06.png' },
  { label: 'Remote Hideaways', img: 'find07.png' },
];

export default function StayTypesGrid() {
  return (
    <div className="grid grid-cols-1 gap-3.5 sm:gap-4 lg:grid-cols-12">
      {/* Tall Left Card: Beach Houses */}
      <div className="lg:col-span-4">
        <Link
          to="/beach-houses"
          className="group relative block h-[280px] sm:h-[340px] lg:h-full min-h-[380px] w-full overflow-hidden rounded-2xl shadow-sm hover:shadow-md transition-shadow"
        >
          <img
            src={img('find01.png')}
            alt="Beach Houses"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-x-4 bottom-4 flex items-center justify-between">
            <span className="font-head text-base sm:text-lg font-semibold text-white drop-shadow-sm">
              Beach Houses
            </span>
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-navy shadow-md transition-transform duration-300 group-hover:translate-x-1 shrink-0">
              <svg
                className="h-3.5 w-3.5 text-navy stroke-[2.5]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </span>
          </div>
        </Link>
      </div>

      {/* Right 2x3 Grid: 6 Cards */}
      <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3 lg:col-span-8 sm:gap-4">
        {rightItems.map((item) => (
          <Link
            key={item.label}
            to="/stays"
            className="group relative block w-full overflow-hidden rounded-2xl shadow-sm hover:shadow-md transition-shadow"
          >
            <img
              src={img(item.img)}
              alt={item.label}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-x-4 bottom-4 flex items-center justify-between">
              <span className="font-head text-sm sm:text-[15px] font-semibold text-white drop-shadow-sm">
                {item.label}
              </span>
              <span className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-white text-navy shadow-md transition-transform duration-300 group-hover:translate-x-1 shrink-0">
                <svg
                  className="h-3.5 w-3.5 text-navy stroke-[2.5]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
