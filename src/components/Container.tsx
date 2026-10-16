import type { ReactNode } from 'react';

export default function Container({
  className = '',
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return <div className={`site-container ${className}`}>{children}</div>;
}
