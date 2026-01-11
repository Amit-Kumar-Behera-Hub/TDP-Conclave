
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ndndcxyenkkkarnrnayo.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5kbmRjeHllbmtra2FybnJuYXlvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgwODA0ODQsImV4cCI6MjA4MzY1NjQ4NH0.fqPEJIH894FrNxvHW8Ic_D2vYybHHJ-LylJQpfKE2MQ';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
