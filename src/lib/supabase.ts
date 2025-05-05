
import { supabase as supabaseClient } from '@/integrations/supabase/client';

// Re-export the supabase client from the integrations folder
export const supabase = supabaseClient;

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
  quantity: number;
};
