import { createClient } from '@supabase/supabase-js';
import type { Database } from '../../supabase';

const supabaseUrl = 'https://ebooupxcufzdhaccnyfq.supabase.co';
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVib291cHhjdWZ6ZGhhY2NueWZxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU2NzI4NzQsImV4cCI6MjA1MTI0ODg3NH0.VYlBXGhJGJqGJJqGJJqGJJqGJJqGJJqGJJqGJJqGJJqG';

if (!supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);