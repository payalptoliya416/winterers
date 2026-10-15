// Sections shared by multiple pages
import {
  useAppDispatch as useDispatch,
  useAppSelector as useSelector,
} from "../store/hooks";
import { selectSorted } from "../store/staysSlice";
import { destinations, experiences, deals } from "../data";
import Section from "./Section";
import SectionHead from "./SectionHead";
import StayGrid from "./StayGrid";
import ImgTile from "./ImgTile";
import ImgBg from "./ImgBg";
import Button from "./Button";
export const FeaturedStays = ({
  tone = "light",
}: {
  tone?: "light" | "dark" | "mist";
}) => {
  const s = useSelector(selectSorted);
  return (
    <Section tone={tone}>
      <SectionHead
        eyebrow="Handpicked for winter"
        title="Featured Winter Stays"
        sub="Discover unique cabins, chalets and unforgettable places made for your next winter escape."
        action="View All Stays"
        to="/stays"
      />
      <StayGrid items={s} />
    </Section>
  );
};
export const Destinations = () => (
  <Section tone="dark">
    <SectionHead
      dark
      eyebrow="Explore the world"
      title="Popular Winter Destinations"
      action="Explore All Destinations"
      to="/destinations"
    />
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:grid-rows-[repeat(3,110px)]">
      {destinations.map(([l, s, n, c]) => (
        <ImgTile
          key={l}
          label={l}
          sub={s}
          name={n}
          className={`h-36 md:h-auto ${c.replace("md:col-span-2", "col-span-2 md:col-span-2")}`}
        />
      ))}
    </div>
  </Section>
);
export const Experiences = () => (
  <Section>
    <SectionHead
      center
      eyebrow="Choose your adventure"
      title="Choose Your Winter Experience"
      sub="Find the perfect winter stay for the experience you came for."
    />
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
      {experiences.map(([l, n]) => (
        <ImgTile key={l} label={l} name={n} to="/experiences" />
      ))}
    </div>
  </Section>
);
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
          className="h-72 rounded-2xl"
          overlay="bg-gradient-to-t from-black/75 via-black/20 to-transparent"
        >
          <span className="absolute left-3 top-3 rounded-full bg-sky px-3 py-1 text-[11px] font-semibold text-navy tracking-wide">
            SAVE UP TO 20%
          </span>
          <div className="absolute inset-x-4 bottom-4 flex items-end justify-between text-white">
            <div>
              <p className="text-xl font-semibold leading-tight">{l}</p>
              <p className="mt-1 flex items-baseline gap-1">
                <b className="text-lg font-bold">€289</b>
                <span className="text-[12px] text-white/70">/night</span>
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
