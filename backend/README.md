# Backend / Non-UI Functionality

This folder contains all non-UI functionality separated from the frontend:

## Structure

- `integrations/` - External service integrations (Supabase, APIs)
- `types/` - TypeScript type definitions and database schemas  
- `services/` - API service functions and business logic

## Usage

Import backend functionality using the path alias:

```typescript
// Import Supabase client
import { supabase } from '@/backend/integrations/supabase/client';

// Import types
import type { Database } from '@/backend/types/supabase';
```

## Frontend vs Backend

- **Frontend (`src/`)**: React components, pages, hooks, UI utilities
- **Backend (`backend/`)**: Database clients, API services, type definitions, business logic