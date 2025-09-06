import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://veryyrrcamgwhcwwflup.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZlcnl5cnJjYW1nd2hjd3dmbHVwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcxMTUwMDMsImV4cCI6MjA3MjY5MTAwM30.KKqbyDgeTpqmqPHJYDYi0xNOGvvnJ4kSh8b8JDc76fY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);