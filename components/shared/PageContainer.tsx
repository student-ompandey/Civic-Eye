import React from 'react';
import { cn } from '@/lib/utils';

interface PageContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  as?: React.ElementType;
}

export function PageContainer({
  children,
  className,
  as: Component = 'div',
  ...props
}: PageContainerProps) {
  return (
    <Component
      className={cn(
        'mx-auto w-full max-w-[1600px] px-6 sm:px-12 md:px-16 lg:px-20',
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
