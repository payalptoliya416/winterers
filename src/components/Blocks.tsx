import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Mousewheel } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import {
  useAppDispatch as useDispatch,
  useAppSelector as useSelector,
} from "../store/hooks";
import { selectSorted } from "../store/staysSlice";
import { destinations, experiences, deals, img } from "../data";
import Section from "./Section";
import SectionHead from "./SectionHead";
import Container from "./Container";
import StayGrid from "./StayGrid";
import ImgTile from "./ImgTile";
import ImgBg from "./ImgBg";
import Button from "./Button";
export const FeaturedStays = ({
  tone = "light",
  eyebrow = "Handpicked for winter",
  title = "Featured Winter Stays",
  sub = "Discover unique cabins, chalets and unforgettable places made for your next winter escape.",
  action = "View All Stays",
  to = "/stays",
  center = false,
  showAction = true,
}: {
  tone?: "light" | "dark" | "mist";
  eyebrow?: string;
  title?: string;
  sub?: string;
  action?: string;
  to?: string;
  center?: boolean;
  showAction?: boolean;
} = {}) => {
  const s = useSelector(selectSorted);
  return (
    <Section tone={tone} className="">
      <SectionHead
        center={center}
        eyebrow={eyebrow}
        title={title}
        sub={sub || undefined}
        action={showAction ? action : undefined}
        to={to}
      />
      <StayGrid items={s} />
    </Section>
  );
};
export const Destinations = ({
  tone = "dark",
  center = false,
  showAction = true,
}: {
  tone?: "light" | "dark" | "mist";
  center?: boolean;
  showAction?: boolean;
} = {}) => (
  <Section tone={tone}>
    <SectionHead
      dark={tone === "dark"}
      center={center}
      eyebrow="Explore the world"
      title="Popular Winter Destinations"
      action={showAction ? "Explore All Destinations" : undefined}
      to="/destinations"
    />
    <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5 sm:gap-6">
      {/* Finland: Left tall card */}
      <div className="md:col-span-4 lg:col-span-4">
        <Link
          to="/destinations"
          className="group relative h-[300px] md:h-full min-h-[380px] w-full rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow block"
        >
          <img
            src={img("finland.png")}
            alt="Finland"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute bottom-6 left-6">
            <h3 className="text-sm sm:text-lg font-semibold text-white">Finland</h3>
            <p className="text-sm sm:text-sm text-[#B8DFF0] mt-2">142 winter stays</p>
          </div>
        </Link>
      </div>

      {/* Right 2x2 grid: Norway, Austria, Switzerland */}
      <div className="md:col-span-8 lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-6">
        {/* Norway */}
        <Link
          to="/destinations"
          className="group relative h-[180px] sm:h-[197px] w-full rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow block"
        >
          <img
            src={img("finland01.png")}
            alt="Norway"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute bottom-4 left-4">
            <h3 className="text-sm sm:text-base font-semibold text-white">Norway</h3>
            <p className="text-sm sm:text-sm text-[#B8DFF0] mt-2">118 winter stays</p>
          </div>
        </Link>

        {/* Austria */}
        <Link
          to="/destinations"
          className="group relative h-[180px] sm:h-[197px] w-full rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow block"
        >
          <img
            src={img("finland02.png")}
            alt="Austria"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute bottom-4 left-4">
            <h3 className="text-sm sm:text-base font-semibold text-white">Austria</h3>
            <p className="text-sm sm:text-sm text-[#B8DFF0] mt-2">156 winter stays</p>
          </div>
        </Link>

        {/* Switzerland */}
        <div className="sm:col-span-2">
          <Link
            to="/destinations"
            className="group relative h-[180px] sm:h-[197px] w-full rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow block"
          >
            <img
              src={img("finland03.png")}
              alt="Switzerland"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute bottom-4 left-4">
              <h3 className="text-sm sm:text-base font-semibold text-white">Switzerland</h3>
              <p className="text-sm sm:text-sm text-[#B8DFF0] mt-2">203 winter stays</p>
            </div>
          </Link>
        </div>
      </div>

      {/* Bottom Row: Iceland & Sweden */}
      <div className="md:col-span-6">
        <Link
          to="/destinations"
          className="group relative h-[170px] sm:h-[197px] w-full rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow block"
        >
          <img
            src={img("finland04.png")}
            alt="Iceland"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute bottom-4 left-4">
            <h3 className="text-sm sm:text-base font-semibold text-white">Iceland</h3>
            <p className="text-sm sm:text-sm text-[#B8DFF0] mt-2">97 winter stays</p>
          </div>
        </Link>
      </div>

      <div className="md:col-span-6">
        <Link
          to="/destinations"
          className="group relative h-[170px] sm:h-[197px] w-full rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow block"
        >
          <img
            src={img("finland05.png")}
            alt="Sweden"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute bottom-4 left-4">
            <h3 className="text-sm sm:text-base font-semibold text-white">Sweden</h3>
            <p className="text-sm sm:text-sm text-[#B8DFF0] mt-2">88 winter stays</p>
          </div>
        </Link>
      </div>
    </div>
  </Section>
);
const baseColumns = [
  [
    { label: "Ski & Snowboard",    img: "ex01.png" },
    { label: "Family Trips",       img: "ex04.png" },
  ],
  [
    { label: "Northern Lights",    img: "ex05.png" },
    { label: "Romantic Escapes",   img: "ex06.png" },
  ],
  [
    { label: "Winter Sun",         img: "ex02.png" },
    { label: "Pet-Friendly",       img: "ex07.png" },
  ],
  [
    { label: "Hot Tub Retreats",   img: "ex03.png" },
    { label: "Long Stays",         img: "ex08.png" },
  ],
  [
    { label: "Christmas & Festive", img: "ex04.png" },
    { label: "Golf",               img: "ex01.png" },
  ],
];

const experienceColumns = [
  ...baseColumns,
  ...baseColumns,
  ...baseColumns,
];

export const Experiences = ({
  eyebrow = "Choose your adventure",
  title = "Choose Your Winter Experience",
  sub = "Find the perfect winter stay for the experience you came for.",
  bg = "bg-white",
  className = "",
  linkTo = "/experiences",
}: {
  eyebrow?: string;
  title?: string;
  sub?: string;
  bg?: string;
  className?: string;
  linkTo?: string;
} = {}) => {
  return (
    <section className={`${bg} py-12 md:py-[110px] overflow-hidden ${className}`}>
      <Container>
        <SectionHead
          center
          eyebrow={eyebrow}
          title={title}
          sub={sub || undefined}
        />  
      </Container>

      {/* Swiper Slider: starts at left container edge and bleeds out the right edge */}
      <div
        className={sub ? "mt-8" : "mt-2 sm:mt-4"}
        style={{
          paddingLeft: "max(1rem, calc((100vw - var(--container-max-w)) / 2 + 1.5rem))",
        }}
      >
        <Swiper
          modules={[FreeMode, Mousewheel]}
          slidesPerView="auto"
          spaceBetween={20}
          freeMode={true}
          grabCursor={true}
          mousewheel={{ forceToAxis: true }}
          className="!overflow-visible"
        >
          {experienceColumns.map((col, idx) => (
            <SwiperSlide key={idx} className="!w-auto">
              <div className="flex flex-col gap-5 shrink-0">
                {col.map((item, i) => (
                  <Link
                    key={i}
                    to={linkTo}
                    className="group relative w-[240px] sm:w-[270px] md:w-[346px] h-[145px] sm:h-[175px] rounded-2xl overflow-hidden hover:shadow-md transition-shadow shrink-0 block"
                  >
                    <img
                      src={img(item.img)}
                      alt={item.label}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 pointer-events-none"
                    />
                    <span className="absolute bottom-5 left-5 text-xs sm:text-lg font-medium text-white drop-shadow-sm pointer-events-none">
                      {item.label}
                    </span>
                  </Link>
                ))}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};
export const Deals = ({
  action = "View All Winter Offers",
}: {
  action?: string;
}) => (
  <Section tone="dark">
    <SectionHead
      dark
      eyebrow="Limited winter offers"
      title="Winter Deals You Don't Want to Miss"
      sub="Discover limited-time offers on unforgettable winter stays."
      action={action}
      to="/offers"
    />
    <div className="grid gap-5 md:grid-cols-3">
      {deals.map(([l, n]) => (
        <ImgBg
          key={l}
          name={n}
          className="h-[354px] rounded-2xl"
          overlay="bg-gradient-to-t from-black/75 via-black/20 to-transparent"
        >
          <span className="absolute left-5 top-5 rounded-full bg-[#7EC8E3] px-[15px] py-2 text-xs font-medium text-[#0D1F35] tracking-wide">
            SAVE UP TO 20%
          </span>
          <div className="absolute inset-x-4 bottom-4 flex items-end justify-between text-white">
            <div>
              <p className="text-2xl font-semibold leading-tight">{l}</p>
              <p className="mt-5 flex items-baseline gap-1">
                <b className="text-2xl font-bold">€289</b>
                <span className="text-sm text-[#98A1AC]">/night</span>
              </p>
            </div>
            <Button variant="light" size="sm">
              Book Now
            </Button>
          </div>
        </ImgBg>
      ))}
    </div>
  </Section>
);
