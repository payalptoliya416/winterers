import type { ReactNode } from 'react';
import { img } from '../data';
import Container from './Container';

interface HeroProps {
  name: string;
  eyebrow?: string;
  title: ReactNode;
  accent?: string;
  text?: string;
  tall?: boolean;
  overlay?: string;
  children?: ReactNode;
  search?: ReactNode;
  searchPosition?: 'overlap' | 'inner';
}

export default function Hero({
  name,
  eyebrow,
  title,
  accent,
  text,
  overlay = 'bg-gradient-to-b from-[#062541]/50 via-[#062541]/30 to-[#062541]/65',
  children,
  search,
  searchPosition = 'inner',
}: HeroProps) {
  const bgUrl = img(name);

  return (
    <div
      className="relative w-full h-[800px] min-h-[800px] bg-cover bg-center overflow-visible"
      style={{ backgroundImage: `url(${bgUrl})` }}
    >
      {/* Dark overlay for contrast */}
      <div className={`absolute inset-0 ${overlay}`} />

      {/* Center content container - takes full 800px height */}
      <div
        className={`relative z-10 flex h-full flex-col items-center gap-5 ${
          search && searchPosition === 'inner'
            ? 'justify-between pt-36 sm:pt-[236px] pb-7 sm:pb-9'
            : 'justify-center pt-24 pb-24'
        } text-center text-white px-4 sm:px-6`}
      >
        <Container className="!max-w-[1000px]">
          {eyebrow && (
            <p className="section-eyebrow">
              {eyebrow}
            </p>
          )}

          {typeof title === 'string' ? (
            <h1 className="font-head text-4xl sm:text-5xl md:text-6xl lg:text-[68px] font-semibold leading-[1.12] tracking-tight text-white">
              {title}
              {accent && (
                <>
                  <br className="hidden sm:block" />{' '}
                  <span className="text-[#7EC8E3]">{accent}</span>
                </>
              )}
            </h1>
          ) : (
            <h1 className="font-head text-4xl sm:text-5xl md:text-6xl lg:text-[68px] font-semibold leading-[1.12] tracking-tight text-white">
              {title}
            </h1>
          )}

          {text && (
            <p className="mx-auto mt-4 sm:mt-[25px] max-w-2xl font-body text-xs sm:text-sm md:text-base leading-relaxed text-[#F0F4F8]/80 font-normal">
              {text}
            </p>
          )}

          {children && (
            <div className="mt-6 sm:mt-7 flex flex-wrap items-center justify-center gap-3.5 sm:gap-4">
              {children}
            </div>
          )}
        </Container>

        {/* Inner Search Bar - Placed comfortably inside hero banner at bottom */}
        {search && searchPosition === 'inner' && (
          <div className="w-full max-w-[var(--container-max-w)]">
            {search}
          </div>
        )}
      </div>

      {/* Search Bar - Positioned at bottom edge overlapping */}
      {search && searchPosition === 'overlap' && (
        <div className="absolute inset-x-0 bottom-0 translate-y-1/2 z-20 px-4 sm:px-6">
          <div className="mx-auto max-w-[var(--container-max-w)]">{search}</div>
        </div>
      )}
    </div>
  );
}
