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

  // Multi-petal flower shape matching the reference images
  const blobPath = "M50,5 C55,5 60,10 65,20 C75,15 85,20 90,30 C95,40 90,50 85,55 C90,65 85,75 75,80 C65,85 55,80 50,75 C45,80 35,85 25,80 C15,75 10,65 15,55 C10,50 5,40 10,30 C15,20 25,15 35,20 C40,10 45,5 50,5 Z";

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