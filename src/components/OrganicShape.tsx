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

  // Large organic shapes optimized for full viewport
  const shapeData = {
    primary: {
      path: "M1200 150 C 1100 100, 1100 250, 1200 350 C 1300 450, 1400 300, 1300 150 C 1250 100, 1150 100, 1200 150 Z",
      transform: "scale(3.5) translate(250,30)"
    },
    secondary: {
      path: "M100 200 C 50 150, 50 300, 100 400 C 150 480, 250 350, 150 200 C 120 150, 60 150, 100 200 Z", 
      transform: "scale(3) translate(50,50)"
    },
    yellow: {
      path: "M700 300 C 650 200, 600 350, 700 500 C 800 600, 900 400, 800 200 C 750 150, 650 250, 700 300 Z",
      transform: "scale(2.5) translate(150,80)"
    },
    beige: {
      path: "M300 800 C 200 700, 200 900, 300 1000 C 400 1100, 500 950, 400 800 C 350 750, 250 750, 300 800 Z",
      transform: "scale(3) translate(80,250)"
    },
    accent: {
      path: "M1600 500 C 1500 400, 1400 550, 1600 700 C 1700 850, 1800 600, 1700 400 C 1650 300, 1550 450, 1600 500 Z",
      transform: "scale(2) translate(400,200)"
    },
    muted: {
      path: "M700 300 C 650 200, 600 350, 700 500 C 800 600, 900 400, 800 200 C 750 150, 650 250, 700 300 Z",
      transform: "scale(2.5) translate(150,80)"
    }
  };
  
  const selectedShape = shapeData[variant] || shapeData.primary;

  console.log('OrganicShape rendering:', { variant, size, position });

  return (
    <div 
      className={`${sizes[size]} ${positions[position]} ${className} pointer-events-none z-10 overflow-hidden`}
      style={{ 
        opacity: 0.8,
      }}
    >
      <svg 
        viewBox="0 0 1920 1080" 
        className="w-full h-full"
      >
        <path
          d={selectedShape.path}
          fill={colors[variant]}
          transform={selectedShape.transform}
          opacity="0.8"
        />
      </svg>
    </div>
  );
};