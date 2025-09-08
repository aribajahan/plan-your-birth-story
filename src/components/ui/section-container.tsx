import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionContainerProps {
  children: ReactNode;
  className?: string;
  backgroundColor?: string;
  fullBleed?: boolean;
  innerPadding?: 'sm' | 'md' | 'lg' | 'xl';
}

const paddingClasses = {
  inner: {
    sm: 'py-8 lg:py-12',
    md: 'py-12 lg:py-20',
    lg: 'py-16 lg:py-32',
    xl: 'py-20 lg:py-40'
  }
};

export const SectionContainer = ({ 
  children, 
  className,
  backgroundColor = 'hsl(var(--cream-base))',
  fullBleed = false,
  innerPadding = 'lg'
}: SectionContainerProps) => {
  if (fullBleed) {
    return (
      <section 
        className={cn('w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]', className)}
        style={{ backgroundColor }}
      >
        <div className="max-w-[1200px] mx-auto px-4 lg:px-8">
          <div className={cn(paddingClasses.inner[innerPadding])}>
            {children}
          </div>
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
          className={cn('rounded-3xl', paddingClasses.inner[innerPadding])}
          style={{ backgroundColor }}
        >
          {children}
        </div>
      </div>
    </section>
  );
};