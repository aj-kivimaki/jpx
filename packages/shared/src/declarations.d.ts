declare module '*.json' {
  const value: any;
  export default value;
}

/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_SUPABASE_ANON_KEY: string;
  // add more vars here
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

type SupabaseClient = import('@supabase/supabase-js').SupabaseClient;

declare global {
  // adapt the generic params to your SupabaseClient usage if needed
  var supabase: SupabaseClient | undefined;
}

export {};
