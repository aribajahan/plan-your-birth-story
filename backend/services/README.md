# Services

This folder contains API service functions and business logic.

## Structure

- `api/` - External API service functions (OpenAI, third-party APIs)
- `auth/` - Authentication related services
- `database/` - Database query functions and operations

## Example Service

```typescript
// backend/services/api/openai.ts
import { supabase } from '@/backend/integrations/supabase/client';

export const generateAIResponse = async (prompt: string) => {
  const { data, error } = await supabase.functions.invoke('openai-generate', {
    body: { prompt }
  });
  
  if (error) throw error;
  return data;
};
```