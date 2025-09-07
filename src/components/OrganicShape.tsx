interface OrganicShapeProps {
  className?: string;
  variant?: 'primary' | 'secondary' | 'accent' | 'muted' | 'yellow' | 'beige';
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
    primary: '#3176b5',    // Blue
    secondary: '#eb4f26',  // Red
    accent: 'hsl(32 25% 88%)',
    muted: 'hsl(32 25% 92%)',
    yellow: '#f5cd45',     // Yellow
    beige: '#f3f1e0'       // Light beige
  };

  const sizes = {
    sm: 'w-64 h-64',
    md: 'w-96 h-96', 
    lg: 'w-[32rem] h-[32rem]',
    xl: 'w-[40rem] h-[40rem]'
  };

  const positions = {
    'top-left': 'absolute -top-10 -left-10',
    'top-right': 'absolute -top-16 -right-16',
    'bottom-left': 'absolute -bottom-20 -left-20',
    'bottom-right': 'absolute -bottom-16 -right-16',
    'center': 'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
  };

  // Use different shapes based on variant for more variety
  const blobPaths = {
    primary: "M50 70 C 20 50, 20 100, 50 130 C 80 160, 110 110, 80 70 C 70 50, 30 50, 50 70 Z", // Organic blob
    secondary: "M170 80 C 150 60, 130 90, 170 120 C 200 150, 220 100, 180 60 C 160 40, 140 70, 170 80 Z", // Flowing shape
    yellow: "M290 70 C 260 50, 260 100, 290 130 C 320 160, 350 110, 320 70 C 310 50, 270 50, 290 70 Z", // Rounded organic
    beige: "M410 80 C 390 60, 370 90, 410 120 C 440 150, 460 100, 420 60 C 400 40, 380 70, 410 80 Z", // Soft curves
    accent: "M530 70 C 500 50, 500 100, 530 130 C 560 160, 590 110, 560 70 C 550 50, 510 50, 530 70 Z", // Gentle blob
    muted: "M50 70 C 20 50, 20 100, 50 130 C 80 160, 110 110, 80 70 C 70 50, 30 50, 50 70 Z" // Same as primary
  };
  
  const selectedBlob = blobPaths[variant] || blobPaths.primary;

  console.log('OrganicShape rendering:', { variant, size, position });

  return (
    <div 
      className={`${sizes[size]} ${positions[position]} ${className} pointer-events-none z-10 overflow-hidden`}
      style={{ 
        opacity: 0.8,
      }}
    >
      <svg 
        viewBox="0 0 600 200" 
        className="w-full h-full"
      >
        <path
          d={selectedBlob}
          fill={colors[variant]}
        />
      </svg>
    </div>
  );
};