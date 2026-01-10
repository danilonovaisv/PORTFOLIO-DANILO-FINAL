import React from 'react';
import { cn } from '@/lib/utils';

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  as?: React.ElementType;
}

export function Container({
  children,
  className,
  as: Component = 'div',
  ...props
}: ContainerProps) {
  return (
    <Component
      className={cn(
        'w-full max-w-[1680px] mx-auto bg-background text-text',
        className
      )}
      style={{
        paddingLeft: 'clamp(24px, 5vw, 96px)',
        paddingRight: 'clamp(24px, 5vw, 96px)',
      }}
      {...props}
    >
      {children}
    </Component>
  );
}
