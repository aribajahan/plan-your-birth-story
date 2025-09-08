// Design System Tokens
export const colors = {
  primary: 'hsl(var(--primary))',
  primaryForeground: 'hsl(var(--primary-foreground))',
  creamBase: 'hsl(var(--cream-base))',
  boldYellow: 'hsl(var(--bold-yellow))',
  vibrantCoral: 'hsl(var(--vibrant-coral))',
  richBlue: 'hsl(var(--rich-blue))',
  deepBlack: 'hsl(var(--deep-black))',
  faqBlack: '#1d1d1d',
  white: '#ffffff',
  testimonialsBackground: '#e9e9e2',
  testimonialsCard: '#f6f5ee',
} as const;

export const typography = {
  heading: {
    // Backward compatibility - keep original structure
    fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
    sizes: {
      xl: 'text-6xl lg:text-8xl',
      lg: 'text-4xl lg:text-6xl',
      md: 'text-3xl lg:text-4xl',
      sm: 'text-2xl lg:text-3xl'
    },
    // New enhanced structure
    serif: {
      fontFamily: 'Crimson Text, serif',
      sizes: {
        xl: 'text-6xl lg:text-8xl',
        lg: 'text-4xl lg:text-6xl',
        md: 'text-3xl lg:text-4xl',
        sm: 'text-2xl lg:text-3xl'
      },
      weights: {
        normal: 'font-normal',
        semibold: 'font-semibold'
      }
    },
    sans: {
      fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
      sizes: {
        xl: 'text-6xl lg:text-8xl',
        lg: 'text-4xl lg:text-6xl',
        md: 'text-3xl lg:text-4xl',
        sm: 'text-2xl lg:text-3xl'
      },
      weights: {
        light: 'font-light',
        normal: 'font-normal',
        medium: 'font-medium',
        semibold: 'font-semibold',
        bold: 'font-bold'
      }
    }
  },
  body: {
    fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
    sizes: {
      lg: 'text-xl lg:text-2xl',
      md: 'text-lg lg:text-xl',
      sm: 'text-base lg:text-lg'
    },
    weights: {
      light: 'font-light',
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold'
    }
  },
  stepNumber: {
    size: 'text-lg lg:text-xl',
    fontWeight: 'font-bold'
  }
} as const;

export const spacing = {
  section: {
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
  }
} as const;