// Ambient module declaration to satisfy missing Supabase types during development.
// This avoids build failures when src/integrations/supabase/types.ts is not present.
declare module "./types" {
  export type Database = any;
}
