import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

const variants: Record<string, string> = {
  primary: 'bg-navy text-white hover:bg-navy/90 shadow-sm',
  light: 'bg-white text-navy hover:bg-slate-100 shadow-md',
  sky: 'bg-sky text-navy hover:bg-sky/90 shadow-sm',
  outline: 'border border-sky/60 text-sky hover:bg-sky/10',
  ghost: 'border border-white/60 bg-white/15 text-white hover:bg-white/30 backdrop-blur-sm',
  line: 'border border-slate-200/90 bg-white text-navy hover:border-slate-300 hover:bg-slate-50',
};

const sizes: Record<string, string> = {
  sm: 'px-3.5 py-1.5 text-xs',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-7 py-3 text-sm font-semibold',
};

export default function Button({
  to,
  variant = 'primary',
  size = 'md',
  pill = false,
  className = '',
  children,
  onClick,
}: {
  to?: string;
  variant?: string;
  size?: 'sm' | 'md' | 'lg';
  pill?: boolean;
  className?: string;
  children: ReactNode;
  onClick?: () => void;
}) {
  const isPill = pill || className.includes('rounded-full');
  const roundedClass = isPill ? 'rounded-full' : 'rounded-xl';

  const classes = `inline-flex items-center justify-center font-medium transition whitespace-nowrap ${roundedClass} ${
    sizes[size] || sizes.md
  } ${variants[variant] || variants.primary} ${className}`;

  if (to) {
    return (
      <Link to={to} className={classes} onClick={onClick}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" className={classes} onClick={onClick}>
      {children}
    </button>
  );
}
