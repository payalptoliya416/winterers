import { useParams, Link } from 'react-router-dom';
import { useAppDispatch as useDispatch, useAppSelector as useSelector } from '../store/hooks';
import { toggleSave, selectSorted } from '../store/staysSlice';
import Container from '../components/Container';
import ImgBg from '../components/ImgBg';
import Button from '../components/Button';
import Section from '../components/Section';
import SectionHead from '../components/SectionHead';
import StayGrid from '../components/StayGrid';

const amenities: [string, string[]][] = [
  ['Comfort',  ['Fireplace', 'Heating', 'Wi-Fi', 'Smart TV']],
  ['Outdoor',  ['Private Terrace', 'Mountain View', 'Fire Pit', 'Private Parking']],
  ['Wellness', ['Sauna', 'Hot Tub', 'Spa Amenities']],
  ['Kitchen',  ['Full Kitchen', 'Coffee Machine', 'Dining Area', 'Refrigerator']],
];

const reviews = [
  ['Sophie M.', 'Absolutely breathtaking. The cabin exceeded every expectation.'],
  ['James T.',  "The most beautiful property we've ever stayed in."],
  ['Lena H.',   'A truly magical winter escape. The host was incredible.'],
];

const pricingRows = [
  ['€389 × 5 nights', '€1,945'],
  ['Cleaning fee',     '€65'],
  ['Service fee',      '€48'],
];

export default function PropertyDetail() {
  const { id = '' } = useParams();
  const d = useDispatch();
  const all = useSelector(selectSorted);
  const saved = useSelector((s) => s.stays.saved).includes(+id);

  return (
    <>
      {/* Image Gallery */}
      <Container className="pt-24 md:pt-28">
        <p className="mb-3 text-[10px] text-navy/50">
          <Link to="/stays">Winter Stays</Link> / Norway / Arktis Fjord Cabin
        </p>
        <div className="grid gap-2 md:grid-cols-4 md:grid-rows-2">
          <ImgBg name="p-main" className="h-64 rounded-lg md:col-span-3 md:row-span-2 md:h-[420px]" />
          <ImgBg name="p-inside" className="h-32 rounded-lg md:h-auto" />
          <div className="grid grid-cols-2 gap-2">
            <ImgBg name="p-view" className="h-32 rounded-lg md:h-auto" />
            <ImgBg name="p-after" className="h-32 rounded-lg md:h-auto" />
          </div>
        </div>
      </Container>

      {/* Main Content + Sidebar */}
      <Container className="mt-8 grid gap-8 lg:grid-cols-[1fr_320px]">
        {/* Left — Details */}
        <div>
          <div className="flex items-start justify-between gap-3">
            <div>
              <h1 className="text-2xl font-medium">Arktis Fjord Cabin</h1>
              <p className="text-[10px] text-navy/50">
                Tromsø, Northern Norway · ★ 4.9 · 127 verified reviews
              </p>
            </div>
            <Button variant="line" size="sm" onClick={() => d(toggleSave(+id))}>
              {saved ? '♥ Saved' : '♡ Save'}
            </Button>
          </div>

          <p className="mt-4 text-xs leading-relaxed text-navy/60">
            Nestled along the edge of a pristine Arctic fjord, this handcrafted log cabin is a
            sanctuary of warmth, silence and breathtaking natural beauty.
          </p>

          {/* Quick facts */}
          <div className="my-6 grid grid-cols-3 gap-3 border-y border-navy/10 py-5 text-center text-[10px] sm:grid-cols-6">
            {['Sleeps 6', '3 Bedrooms', '2 Bathrooms', 'Private Sauna', 'Fireplace', 'Northern Lights'].map((x) => (
              <span key={x}>{x}</span>
            ))}
          </div>

          {/* Amenities */}
          <h2 className="text-xl">What This Place Offers</h2>
          <div className="mt-4 grid grid-cols-2 gap-4 text-[10px] text-navy/60 sm:grid-cols-4">
            {amenities.map(([t, l]) => (
              <div key={t}>
                <b className="text-navy">{t}</b>
                {l.map((item) => (
                  <p key={item} className="mt-2">{item}</p>
                ))}
              </div>
            ))}
          </div>

          {/* Reviews */}
          <h2 className="mb-4 mt-10 text-xl">What Guests Say</h2>
          <div className="grid gap-3 sm:grid-cols-3">
            {reviews.map(([n, t]) => (
              <div key={n} className="rounded-xl border border-navy/10 p-3 text-[10px]">
                <b>{n}</b> <span className="text-amber-500">★★★★★</span>
                <p className="mt-2 text-navy/60">{t}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right — Booking Sidebar */}
        <aside className="h-fit rounded-xl border border-navy/10 p-5 shadow-sm lg:sticky lg:top-6">
          <p>
            <b className="text-2xl">€389</b>{' '}
            <span className="text-[10px] text-navy/50">/ night</span>
          </p>

          <div className="my-4 grid grid-cols-2 rounded-lg border border-navy/15 text-[10px] [&>*]:p-2">
            <span>CHECK-IN<br />Add date</span>
            <span className="border-l border-navy/15">CHECK-OUT<br />Add date</span>
            <span className="col-span-2 border-t border-navy/15">GUESTS<br />2 guests</span>
          </div>

          <div className="flex gap-2">
            <Button className="flex-1">Reserve Your Stay</Button>
            <Button variant="line">Wishlist</Button>
          </div>

          <div className="mt-4 space-y-2 text-[10px] text-navy/60">
            {pricingRows.map(([a, b]) => (
              <p key={a} className="flex justify-between">
                <span>{a}</span>
                <span>{b}</span>
              </p>
            ))}
            <p className="flex justify-between border-t border-navy/10 pt-2 font-medium text-navy">
              <span>Total</span>
              <span>€2,058</span>
            </p>
          </div>
        </aside>
      </Container>

      {/* Nearby Experiences */}
      <Section>
        <SectionHead
          eyebrow="Near this property"
          title="Winter Experiences Around You"
          action="View all experiences"
          to="/experiences"
        />
        <StayGrid items={all.slice(0, 3)} detailed />
      </Section>
    </>
  );
}
