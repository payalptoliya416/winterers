import type { Stay } from "./types";
// Put your images in /public/images and update names here. Fallback colour shows if missing.
export const img = (n: string) => n.includes('.') ? `/images/${n}` : `/images/${n}.jpg`;
export const nav: string[][] = [
  ["Destinations", "/destinations"],
  ["Winter Stays", "/stays"],
  ["Experiences", "/experiences"],
  ["Offers", "/offers"],
];
export const stays: Stay[] = [
  {
    id: 1,
    name: "The Snowy Pine Cabin",
    country: "Finland",
    img: "cabin1",
    price: 289,
    rating: 4.9,
    guests: 6,
    beds: 3,
    tags: "Hot tub · Mountain views · Fireplace",
  },
  {
    id: 2,
    name: "Alpine Ridge Chalet",
    country: "Switzerland",
    img: "chalet",
    price: 289,
    rating: 4.9,
    guests: 6,
    beds: 3,
    tags: "Ski-in/ski-out · Private chef",
  },
  {
    id: 3,
    name: "Aurora Glass Lodge",
    country: "Norway",
    img: "aurora",
    price: 459,
    rating: 4.9,
    guests: 2,
    beds: 1,
    tags: "Northern Lights view · Sauna",
  },
  {
    id: 4,
    name: "The Mountain Hideaway",
    country: "Austria",
    img: "hideaway",
    price: 289,
    rating: 4.9,
    guests: 6,
    beds: 3,
    tags: "Panoramic views · Heated pool",
  },
  {
    id: 5,
    name: "Frost Valley Cabin",
    country: "Iceland",
    img: "frost",
    price: 289,
    rating: 4.9,
    guests: 6,
    beds: 3,
    tags: "Hot tub · Mountain views",
  },
  {
    id: 6,
    name: "Nordic Forest Retreat",
    country: "Sweden",
    img: "forest",
    price: 319,
    rating: 4.9,
    guests: 4,
    beds: 2,
    tags: "Lakeside · Outdoor sauna",
  },
];
export const destinations: string[][] = [
  ["Finland", "142 winter stays", "finland", "md:row-span-2"],
  ["Norway", "98 winter stays", "norway", ""],
  ["Austria", "156 winter stays", "austria", ""],
  ["Switzerland", "203 winter stays", "swiss", "md:col-span-2"],
  ["Iceland", "87 winter stays", "iceland", "md:col-span-2"],
  ["Sweden", "88 winter stays", "sweden", "md:col-span-2"],
];
export const experiences: string[][] = [
  ["Ski & Snowboarding", "ski"],
  ["Cozy Cabin Escapes", "cozy"],
  ["Northern Lights", "northern"],
  ["Mountain Adventures", "mountain"],
  ["Hot Tub Retreats", "hottub"],
  ["Snowy Getaways", "snowy"],
  ["Winter Family Trips", "family"],
  ["Remote Wilderness", "remote"],
];
export const deals: string[][] = [
  ["Alpine Mountain Chalet", "deal1.png"],
  ["Northern Lights Cabin", "deal2.png"],
  ["Luxury Ski Lodge", "deal3.png"],
];
export const footer: [string, string[]][] = [
  ["Explore", ["Winter Stays", "Destinations", "Experiences", "Offers"]],
  [
    "Popular Destinations",
    ["Finland", "Norway", "Switzerland", "Iceland", "Austria"],
  ],
  [
    "Property Owners",
    ["List Your Property", "How It Works", "Owner Benefits", "Help Centre"],
  ],
  ["Support", ["Contact Us", "FAQs", "Privacy Policy", "Terms & Conditions"]],
];
