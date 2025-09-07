import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface ImageGenerationRequest {
  prompt: string;
  size?: string;
  outputFormat?: string;
}

interface ImageGenerationResponse {
  imageUrl?: string;
  imageData?: string;
  error?: string;
}

export const useImageGenerator = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateImage = async ({ 
    prompt, 
    size = "1024x1024", 
    outputFormat = "webp" 
  }: ImageGenerationRequest): Promise<string | null> => {
    setIsGenerating(true);
    setError(null);

    try {
      const { data, error: functionError } = await supabase.functions.invoke('generate-image', {
        body: { prompt, size, outputFormat }
      });

      if (functionError) {
        throw new Error(functionError.message);
      }

      if (data?.error) {
        throw new Error(data.error);
      }

      if (data?.imageData) {
        return `data:image/${outputFormat};base64,${data.imageData}`;
      } else if (data?.imageUrl) {
        return data.imageUrl;
      } else {
        throw new Error('No image data received');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to generate image';
      setError(errorMessage);
      console.error('Image generation error:', errorMessage);
      return null;
    } finally {
      setIsGenerating(false);
    }
  };

  return { generateImage, isGenerating, error };
};