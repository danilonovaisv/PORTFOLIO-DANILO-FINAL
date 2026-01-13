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
        'w-full max-w-[1680px] mx-auto px-6 md:px-12 lg:px-16 xl:px-24',
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
