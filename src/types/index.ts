
export interface TicketType {
  id: string;
  user_id: string;
  event_id: string;
  ticket_number: string;
  status: string;
  purchase_date: string;
  price: number;
  quantity: number;
}

export interface EventType {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  date: string;
  time?: string;
  location: string;
  price: number;
  image_url: string;
  images?: string[];
  attractions?: string[];
  ticketsAvailable?: number;
}

export interface TicketWithEventType extends TicketType {
  event_name?: string;
  event_date?: string;
  event_location?: string;
  qr_code?: string;
}

export interface UserType {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  created_at?: string;
}

export interface PurchaseTicketData {
  event_id: string;
  quantity: number;
  price_per_unit: number;
}

export interface AdminEventStat {
  id: string;
  title: string;
  date: string;
  tickets_sold: number;
  tickets_available: number;
  revenue: number;
}
