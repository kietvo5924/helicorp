import { HTMLAttributes } from 'react';

interface GlassPanelProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function GlassPanel({ children, className = '', ...props }: GlassPanelProps) {
  return (
    <div
      className={`bg-white/10 dark:bg-black/40 backdrop-blur-md border border-white/20 dark:border-white/10 shadow-xl rounded-2xl ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
