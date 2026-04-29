import React from 'react';
import { cn } from '@/lib/utils';

type AsProp<C extends React.ElementType> = {
  as?: C;
};

type ContainerProps<C extends React.ElementType = 'div'> = AsProp<C> &
  Omit<React.ComponentPropsWithoutRef<C>, keyof AsProp<C>> & {
    children?: React.ReactNode;
    className?: string;
  };

export function Container<C extends React.ElementType = 'div'>({
  children,
  className,
  as,
  ...props
}: ContainerProps<C>) {
  const Component = (as || 'div') as React.ElementType;
  
  return (
    <Component className={cn('std-grid', className)} {...(props as any)}>
      {children}
    </Component>
  );
}
