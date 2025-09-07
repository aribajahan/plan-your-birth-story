import { useState, useEffect } from 'react';
import { useImageGenerator } from '@/hooks/useImageGenerator';
import { Skeleton } from '@/components/ui/skeleton';

interface GeneratedImageProps {
  prompt: string;
  alt: string;
  className?: string;
  size?: string;
  outputFormat?: string;
  fallbackSrc?: string;
}

export const GeneratedImage = ({ 
  prompt, 
  alt, 
  className = "", 
  size = "1024x1024",
  outputFormat = "webp",
  fallbackSrc 
}: GeneratedImageProps) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [showFallback, setShowFallback] = useState(false);
  const { generateImage, isGenerating, error } = useImageGenerator();

  useEffect(() => {
    const loadImage = async () => {
      // Check if we have a cached version in localStorage
      const cacheKey = `generated_image_${btoa(prompt).slice(0, 20)}`;
      const cached = localStorage.getItem(cacheKey);
      
      if (cached) {
        setImageSrc(cached);
        return;
      }

      const result = await generateImage({ prompt, size, outputFormat });
      if (result) {
        setImageSrc(result);
        // Cache the result
        localStorage.setItem(cacheKey, result);
      } else {
        setShowFallback(true);
      }
    };

    loadImage();
  }, [prompt, size, outputFormat, generateImage]);

  if (isGenerating) {
    return <Skeleton className={`${className} animate-pulse`} />;
  }

  if (error || showFallback) {
    if (fallbackSrc) {
      return (
        <img 
          src={fallbackSrc} 
          alt={alt} 
          className={className}
          onError={() => setShowFallback(true)}
        />
      );
    }
    return <div className={`${className} bg-muted flex items-center justify-center text-muted-foreground text-sm`}>Image unavailable</div>;
  }

  if (!imageSrc) {
    return <Skeleton className={`${className} animate-pulse`} />;
  }

  return (
    <img 
      src={imageSrc} 
      alt={alt} 
      className={className}
      onError={() => setShowFallback(true)}
    />
  );
};