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
    primary: '#3176b5',  // Blue
    secondary: '#eb4f26', // Red
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
    'top-left': 'absolute top-4 left-4',
    'top-right': 'absolute top-4 right-4',
    'bottom-left': 'absolute bottom-4 left-4',
    'bottom-right': 'absolute bottom-4 right-4',
    'center': 'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
  };

  // Flower-like organic shape based on the reference images
  const blobPath = "M50,10 C60,10 70,15 75,25 C80,35 85,40 90,50 C85,60 80,65 75,75 C70,85 60,90 50,90 C40,90 30,85 25,75 C20,65 15,60 10,50 C15,40 20,35 25,25 C30,15 40,10 50,10 Z";

  console.log('OrganicShape rendering:', { variant, size, position });

  return (
    <div 
      className={`${sizes[size]} ${positions[position]} ${className} pointer-events-none z-10`}
      style={{ 
        opacity: 0.6,
      }}
    >
      <svg 
        viewBox="0 0 100 100" 
        className="w-full h-full"
      >
        <path
          d={blobPath}
          fill={colors[variant]}
        />
      </svg>
    </div>
  );
};