import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/database';

const supabaseUrl = 'https://ebooupxcufzdhaccnyfq.supabase.co';
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;


export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);