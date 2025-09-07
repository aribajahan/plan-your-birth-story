interface OrganicShapeProps {
  className?: string;
  variant?: 'primary' | 'secondary' | 'accent' | 'muted';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center';
}

export const OrganicShape = ({ 
  className = "", 
  variant = 'primary',
  size = 'md',
  position = 'top-right'
}: OrganicShapeProps) => {
  const colors = {
    primary: 'hsl(14 100% 57%)',
    secondary: 'hsl(25 90% 65%)', 
    accent: 'hsl(32 25% 88%)',
    muted: 'hsl(32 25% 92%)'
  };

  const sizes = {
    sm: 'w-24 h-24',
    md: 'w-32 h-32',
    lg: 'w-48 h-48',
    xl: 'w-64 h-64'
  };

  const positions = {
    'top-left': 'absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2',
    'top-right': 'absolute top-0 right-0 translate-x-1/2 -translate-y-1/2',
    'bottom-left': 'absolute bottom-0 left-0 -translate-x-1/2 translate-y-1/2',
    'bottom-right': 'absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2',
    'center': 'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
  };

  // Different organic path shapes
  const shapes = [
    "M20,50 C20,20 40,0 70,10 C90,20 100,40 90,60 C80,80 60,90 40,80 C20,70 20,50 20,50",
    "M30,20 C50,10 70,20 80,40 C90,60 80,80 60,90 C40,100 20,90 10,70 C0,50 10,30 30,20",
    "M40,10 C60,5 80,15 90,35 C100,55 95,75 75,85 C55,95 35,90 25,70 C15,50 20,30 40,10",
    "M50,15 C70,10 85,25 90,45 C95,65 85,80 65,90 C45,100 25,95 15,75 C5,55 15,35 35,25 C40,20 45,17 50,15"
  ];

  const randomShape = shapes[Math.floor(Math.random() * shapes.length)];

  return (
    <div 
      className={`${sizes[size]} ${positions[position]} ${className} pointer-events-none opacity-20 z-0`}
      style={{ 
        filter: 'blur(0.5px)',
      }}
    >
      <svg 
        viewBox="0 0 100 100" 
        className="w-full h-full"
        style={{ 
          filter: 'url(#glow)',
        }}
      >
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        <path
          d={randomShape}
          fill={colors[variant]}
          className="animate-pulse"
          style={{
            animationDuration: '4s',
            animationDelay: Math.random() * 2 + 's'
          }}
        />
      </svg>
    </div>
  );
};