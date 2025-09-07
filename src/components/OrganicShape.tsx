interface OrganicShapeProps {
  className?: string;
  variant?: 'primary' | 'secondary' | 'accent' | 'muted' | 'yellow' | 'beige' | 'flower';
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
    beige: '#f3f1e0',      // Light beige
    flower: '#3176b5'      // Blue for flower
  };

  const sizes = {
    sm: 'w-64 h-64',
    md: 'w-96 h-96', 
    lg: 'w-[32rem] h-[32rem]',
    xl: 'w-[40rem] h-[40rem]'
  };

  const positions = {
    'top-left': 'absolute top-0 left-0',
    'top-right': 'absolute top-0 right-0',
    'bottom-left': 'absolute bottom-0 left-0',
    'bottom-right': 'absolute bottom-0 right-0',
    'center': 'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
  };

  // Simplified organic shapes without complex transforms
  const shapeData = {
    primary: "M50 20 C 20 10, 10 40, 30 60 C 50 80, 80 70, 90 40 C 85 20, 70 10, 50 20 Z",
    secondary: "M40 30 C 15 20, 10 50, 35 70 C 60 85, 85 60, 80 30 C 70 15, 55 20, 40 30 Z", 
    yellow: "M45 25 C 20 15, 15 45, 40 65 C 65 80, 85 55, 75 25 C 65 10, 50 15, 45 25 Z",
    beige: "M35 35 C 10 25, 15 55, 35 75 C 55 90, 80 65, 70 35 C 60 20, 45 25, 35 35 Z",
    accent: "M55 15 C 25 5, 20 35, 45 55 C 70 70, 90 45, 85 15 C 75 0, 60 5, 55 15 Z",
    muted: "M50 30 C 25 20, 20 50, 45 70 C 70 85, 90 60, 80 30 C 70 15, 55 20, 50 30 Z",
    flower: "M50 50 m -20 0 a 20 20 0 1 0 40 0 a 20 20 0 1 0 -40 0 M50 50 m 0 -20 a 20 20 0 1 0 0 40 a 20 20 0 1 0 0 -40 M50 50 m -14 -14 a 20 20 0 1 0 28 28 a 20 20 0 1 0 -28 -28 M50 50 m 14 -14 a 20 20 0 1 0 -28 28 a 20 20 0 1 0 28 -28"
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