import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Si no hay variables configuradas, la galería muestra los espacios de muestra.
export const supabase = url && key ? createClient(url, key) : null;
