import type { ReactNode } from 'react';
import ImgBg from './ImgBg';
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
}

export default function Hero({
  name,
  eyebrow,
  title,
  accent,
  text,
  tall = false,
  overlay = 'bg-gradient-to-b from-[#062541]/45 via-[#062541]/35 to-[#062541]/65',
  children,
  search,
}: HeroProps) {
  return (
    <ImgBg name={name} overlay={overlay} className="relative overflow-visible">
      <div
        className={`flex flex-col items-center text-center text-white ${
          tall ? 'pb-32 sm:pb-36 md:pb-44' : 'pb-16 sm:pb-20 md:pb-28'
        } pt-36 sm:pt-40 md:pt-44`}
      >
        <Container className="!max-w-[1000px]">
          {eyebrow && (
            <p className="mb-3.5 text-sm sm:text-lg font-semibold uppercase text-[#7EC8E3]">
              {eyebrow}
            </p>
          )}

          {typeof title === 'string' ? (
            <h1 className="text-4xl font-semibold leading-[1.12] sm:text-5xl md:text-6xl lg:text-[80px] text-white">
              {title}
              {accent && (
                <>
                  <br className="hidden sm:block" />{' '}
                  <span className="text-sky">{accent}</span>
                </>
              )}
            </h1>
          ) : (
            <h1 className="text-4xl font-semibold leading-[1.12] sm:text-5xl md:text-6xl lg:text-[80px] text-white">
              {title}
            </h1>
          )}

          {text && (
            <p className="mx-auto mt-4 sm:mt-5 max-w-2xl text-xs sm:text-sm md:text-lg leading-relaxed text-white/80">
              {text}
            </p>
          )}

          {children && (
            <div className="mt-7 sm:mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              {children}
            </div>
          )}
        </Container>
      </div>

      {search && (
        <div className="absolute inset-x-0 bottom-0 translate-y-1/2 z-20 px-4 sm:px-6">
          <div className="mx-auto max-w-[1140px]">{search}</div>
        </div>
      )}
    </ImgBg>
  );
}
