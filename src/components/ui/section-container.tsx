import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionContainerProps {
  children: ReactNode;
  className?: string;
  backgroundColor?: string;
  outerPadding?: 'sm' | 'md' | 'lg';
  innerPadding?: 'sm' | 'md' | 'lg' | 'xl';
}

const paddingClasses = {
  outer: {
    sm: 'py-4 lg:py-6',
    md: 'py-8 lg:py-12',
    lg: 'py-12 lg:py-16'
  },
  inner: {
    sm: 'p-8 lg:p-12',
    md: 'p-12 lg:p-20',
    lg: 'p-16 lg:p-32',
    xl: 'p-20 lg:p-40'
  }
};

export const SectionContainer = ({ 
  children, 
  className,
  backgroundColor = 'hsl(var(--cream-base))',
  outerPadding = 'md',
  innerPadding = 'lg'
}: SectionContainerProps) => {
  return (
    <section 
      className={cn(paddingClasses.outer[outerPadding], className)} 
      style={{ backgroundColor }}
    >
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div 
          className={cn('rounded-3xl', paddingClasses.inner[innerPadding])}
          style={{ backgroundColor }}
        >
          {children}
        </div>
      </div>
    </section>
  );
};