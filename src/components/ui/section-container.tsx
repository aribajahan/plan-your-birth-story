import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionContainerProps {
  children: ReactNode;
  className?: string;
  backgroundColor?: string;
  fullBleed?: boolean;
  condesa?: boolean;
  innerPadding?: 'sm' | 'md' | 'lg' | 'xl';
}

const paddingClasses = {
  sm: 'py-16 lg:py-20',
  md: 'py-20 lg:py-28', 
  lg: 'py-24 lg:py-32',
  xl: 'py-32 lg:py-40'
};

export const SectionContainer = ({ 
  children, 
  className,
  backgroundColor = 'hsl(var(--cream-base))',
  fullBleed = false,
  condesa = false,
  innerPadding = 'lg'
}: SectionContainerProps) => {
  if (condesa) {
    return (
      <section className={cn('py-4 lg:py-6', className)}>
        <div 
          className={cn('w-[90vw] lg:w-[95vw] max-w-[1400px] mx-auto rounded-2xl lg:rounded-3xl', paddingClasses[innerPadding], 'px-6 lg:px-16')}
          style={{ backgroundColor }}
        >
          <div className="max-w-[1200px] mx-auto">
            {children}
          </div>
        </div>
      </section>
    );
  }

  if (fullBleed) {
    return (
      <section 
        className={cn('w-full', paddingClasses[innerPadding], 'px-6 lg:px-16', className)}
        style={{ backgroundColor }}
      >
        <div className="max-w-[1200px] mx-auto">
          {children}
        </div>
      </section>
    );
  }

  return (
    <section 
      className={cn('py-8 lg:py-12', className)} 
      style={{ backgroundColor }}
    >
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div 
          className={cn('rounded-3xl', paddingClasses[innerPadding])}
          style={{ backgroundColor }}
        >
          {children}
        </div>
      </div>
    </section>
  );
};