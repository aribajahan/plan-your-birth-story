interface OrganicShapeProps {
  className?: string;
  variant?: 'primary' | 'secondary' | 'accent' | 'muted' | 'yellow' | 'beige' | 'flower';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center' | 'top-right-offset' | 'bottom-left-offset' | 'center-right' | 'center-left' | 'top-quarter-right' | 'bottom-third-left';
}

export const OrganicShape = ({ 
  className = "", 
  variant = 'primary',
  size = 'md',
  position = 'top-right'
}: OrganicShapeProps) => {
  const colors = {
    primary: '#1e40af',    // Vibrant blue
    secondary: '#eb4f26',  // Red
    accent: 'hsl(32 25% 88%)',
    muted: 'hsl(32 25% 92%)',
    yellow: '#f5cd45',     // Yellow
    beige: '#f3f1e0',      // Light beige
    flower: '#1e40af'      // Vibrant blue for flower
  };

  const sizes = {
    sm: 'w-64 h-64',
    md: 'w-96 h-96', 
    lg: 'w-[48rem] h-[48rem]',
    xl: 'w-[64rem] h-[64rem]'
  };

  const positions = {
    'top-left': 'absolute top-0 left-0',
    'top-right': 'absolute top-0 right-0',
    'bottom-left': 'absolute bottom-0 left-0',
    'bottom-right': 'absolute bottom-0 right-0',
    'center': 'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
    'top-right-offset': 'absolute top-8 right-8',
    'bottom-left-offset': 'absolute bottom-8 left-8',
    'center-right': 'absolute top-1/2 right-8 -translate-y-1/2',
    'center-left': 'absolute top-1/2 left-8 -translate-y-1/2',
    'top-quarter-right': 'absolute top-1/4 right-4',
    'bottom-third-left': 'absolute bottom-1/3 left-4'
  };

  // Clean quatrefoil/four-petal flower shape matching the uploaded image
  const shapeData = {
    primary: "M50,10 A25,25 0 0,0 10,50 A25,25 0 0,0 50,90 A25,25 0 0,0 90,50 A25,25 0 0,0 50,10 Z",
    secondary: "M50,10 A25,25 0 0,0 10,50 A25,25 0 0,0 50,90 A25,25 0 0,0 90,50 A25,25 0 0,0 50,10 Z",
    yellow: "M50,10 A25,25 0 0,0 10,50 A25,25 0 0,0 50,90 A25,25 0 0,0 90,50 A25,25 0 0,0 50,10 Z",
    beige: "M50,10 A25,25 0 0,0 10,50 A25,25 0 0,0 50,90 A25,25 0 0,0 90,50 A25,25 0 0,0 50,10 Z",
    accent: "M50,10 A25,25 0 0,0 10,50 A25,25 0 0,0 50,90 A25,25 0 0,0 90,50 A25,25 0 0,0 50,10 Z",
    muted: "M50,10 A25,25 0 0,0 10,50 A25,25 0 0,0 50,90 A25,25 0 0,0 90,50 A25,25 0 0,0 50,10 Z",
    flower: "M50,10 A25,25 0 0,0 10,50 A25,25 0 0,0 50,90 A25,25 0 0,0 90,50 A25,25 0 0,0 50,10 Z"
  };
  
  const selectedShape = shapeData[variant] || shapeData.primary;

  console.log('OrganicShape rendering:', { variant, size, position });

  return (
    <div 
      className={`${sizes[size]} ${positions[position]} ${className} pointer-events-none z-10`}
      style={{ 
        opacity: 1,
      }}
    >
      <svg 
        viewBox="0 0 100 100" 
        className="w-full h-full"
      >
        <path
          d={selectedShape}
          fill={colors[variant]}
        />
      </svg>
    </div>
  );
};