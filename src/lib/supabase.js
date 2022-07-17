import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
	String(import.meta.env.VITE_SUPABASE_URL),
	String(import.meta.env.VITE_SUPABASE_ANON_KEY)
);

export default supabase;
