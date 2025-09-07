import { useState, useEffect } from 'react';
import { removeBackground, loadImageFromUrl } from '@/utils/backgroundRemoval';

interface BackgroundRemovedImageProps {
  src: string;
  alt: string;
  className?: string;
}

export const BackgroundRemovedImage = ({ src, alt, className }: BackgroundRemovedImageProps) => {
  const [processedImageUrl, setProcessedImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const processImage = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Load the original image
        const img = await loadImageFromUrl(src);
        
        // Remove background
        const blob = await removeBackground(img);
        
        // Create URL for the processed image
        const url = URL.createObjectURL(blob);
        setProcessedImageUrl(url);
      } catch (err) {
        console.error('Failed to process image:', err);
        setError('Failed to remove background');
      } finally {
        setIsLoading(false);
      }
    };

    processImage();

    // Cleanup URL when component unmounts
    return () => {
      if (processedImageUrl) {
        URL.revokeObjectURL(processedImageUrl);
      }
    };
  }, [src]);

  if (isLoading) {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-deep-black"></div>
      </div>
    );
  }

  if (error || !processedImageUrl) {
    // Fallback to original image if processing fails
    return <img src={src} alt={alt} className={className} />;
  }

  return <img src={processedImageUrl} alt={alt} className={className} />;
};