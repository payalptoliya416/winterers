import { useState } from 'react';
import Hero from '../components/Hero';
import Button from '../components/Button';
import Section from '../components/Section';
import SectionHead from '../components/SectionHead';
import Feature from '../components/Feature';
import ImgBg from '../components/ImgBg';

const steps = [
  ['Tell Us About Your Property', 'Share your location, property type and essential details.'],
  ['Build Your Listing', 'Add photographs, amenities, pricing and availability.'],
  ['Go Live', 'Our team reviews and helps prepare it for travellers.'],
  ['Welcome Your Guests', 'Start receiving bookings from winter travellers.'],
];

const why = [
  ['Reach More Winter Travellers', 'Get discovered by guests actively searching for winter escapes.'],
  ['Showcase Your Property', 'Present your home through premium photography.'],
  ['Stay In Control', 'Manage availability, pricing and bookings.'],
  ['Get Dedicated Support', 'Our team helps you create and manage a successful listing.'],
];

const faq = [
  ['How much does it cost to list my property?', 'Listing is free. We take a small commission only when a booking is made.'],
  ['What properties can I list?', 'Mountain cabins, luxury chalets, forest retreats, lakeside lodges and remote winter homes.'],
  ['How does the approval process work?', 'Our team reviews within 2–3 business days.'],
  ['How do bookings and payments work?', 'Secure payouts after each stay.'],
  ['Can I manage my own availability?', 'Yes, from your dashboard.'],
];

function Field({
  l,
  full,
  area,
  placeholder,
  type,
  required,
}: {
  l: string;
  full?: boolean;
  area?: boolean;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className={`block text-[10px] font-medium ${full ? 'sm:col-span-2' : ''}`}>
      {l}
      {area ? (
        <textarea
          rows={4}
          className="mt-1 w-full rounded-lg bg-white px-3 py-2.5 text-xs outline-none"
          placeholder={placeholder}
          required={required}
        />
      ) : (
        <input
          type={type}
          className="mt-1 w-full rounded-lg bg-white px-3 py-2.5 text-xs outline-none"
          placeholder={placeholder}
          required={required}
        />
      )}
    </label>
  );
}

export default function ListProperty() {
  const [open, setOpen] = useState(0);

  return (
    <>
      <Hero
        name="l-host.png"
        eyebrow="For property owners"
        title="Turn Your Property Into a"
        accent="Winter Escape"
        text="Share your property with travellers looking for unforgettable winter stays."
      >
      </Hero>

      <Section>
        <div className="grid overflow-hidden rounded-2xl bg-mist md:grid-cols-[1fr_1.5fr]">
          <ImgBg name="aurora" className="min-h-[240px]" />
          <form
            onSubmit={(e) => e.preventDefault()}
            className="grid gap-3 p-5 sm:grid-cols-2 md:p-8"
          >
            <div className="sm:col-span-2">
              <h2 className="text-xl">Submit Your Property</h2>
              <p className="text-[10px] text-navy/50">
                Complete the form below and our team will review your property.
              </p>
            </div>

            <Field l="Full Name*" placeholder="Enter your full name" required />
            <Field l="Email Address*" type="email" placeholder="you@example.com" required />
            <Field l="Phone Number*" placeholder="+00 123 456 7890" />
            <Field l="Property Name" placeholder="e.g. Villa del Mar" />
            <Field l="City*" placeholder="e.g. Santorini" />
            <Field l="Country*" placeholder="Select country" />
            <Field full l="Website or Airbnb/Booking.com Listing URL" placeholder="https://..." />
            <Field full area l="Property Description*" placeholder="Tell us about your property…" />

            <label className="flex gap-2 text-[10px] sm:col-span-2">
              <input type="checkbox" />
              I agree to be contacted regarding my property listing.
            </label>
            <div className="sm:col-span-2">
              <Button>Submit Property</Button>
            </div>
          </form>
        </div>
      </Section>

      <Section tone="mist">
        <SectionHead center title="Everything You Need to Host With Confidence" eyebrow="Why list with us" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {why.map(([t, x], i) => (
            <div key={t}>
              <span className="text-4xl text-navy/10">0{i + 1}</span>
              <h3 className="mt-2 text-xs font-medium">{t}</h3>
              <p className="mt-1 text-[10px] text-navy/50">{x}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="dark">
        <SectionHead center title="From Your Property to Your First Booking" eyebrow="The process" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map(([t, x], i) => (
            <div key={t} className="text-center">
              <span className="mx-auto mb-3 flex h-9 w-9 items-center justify-center rounded-full bg-white text-xs text-navy">
                {i + 1}
              </span>
              <h3 className="text-xs font-medium">{t}</h3>
              <p className="mt-1 text-[10px] text-white/60">{x}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Button variant="light">Start Your Listing</Button>
        </div>
      </Section>

      <Section>
        <Feature
          reverse={false}
          name="l-cozy"
          eyebrow="Built for winter hosts"
          title="Your Property Deserves More Than a Listing"
          text="Winterers is designed to help exceptional properties stand out."
        >
          <Button>Start Your Listing</Button>
        </Feature>
      </Section>

      <Section tone="dark">
        <Feature
          tone="dark"
          name="l-host"
          eyebrow="Host success story"
          title='"FROM HIDDEN CABIN TO WINTER FAVOURITE"'
          text="Winterers helped us present our cabin in a completely different way."
        >
          <b className="mr-8 text-sky">
            +42%{' '}
            <span className="text-[10px] text-white/50">Booking enquiries</span>
          </b>
          <b>4.9/5</b>
        </Feature>
      </Section>

      <Section>
        <SectionHead center title="Everything You Need to Host With Confidence" eyebrow="Why list with us" />
        <div className="mx-auto max-w-2xl divide-y divide-navy/10">
          {faq.map(([q, a], i) => (
            <div key={q} className="py-4">
              <button
                onClick={() => setOpen(open === i ? -1 : i)}
                className="flex w-full justify-between text-left text-xs font-medium"
              >
                <span>{q}</span>
                <span>{open === i ? '−' : '+'}</span>
              </button>
              {open === i && <p className="mt-2 text-[10px] text-navy/50">{a}</p>}
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
