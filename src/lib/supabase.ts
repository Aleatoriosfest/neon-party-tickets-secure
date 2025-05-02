
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Supabase URL and Anon Key must be provided');
}

export const supabase = createClient(supabaseUrl, supabaseKey);

// Types for our database schema
export type User = {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
  created_at?: string;
};

export type Event = {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  image_url?: string;
  price: number;
  created_at?: string;
};

export type Ticket = {
  id: string;
  event_id: string;
  user_id: string;
  ticket_number: string;
  status: 'valid' | 'used' | 'expired';
  purchase_date: string;
  price: number;
};
