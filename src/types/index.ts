
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
  description: string;
  date: string;
  location: string;
  price: number;
  image_url: string;
}

export interface TicketWithEventType extends TicketType {
  event_name?: string;
  event_date?: string;
  event_location?: string;
  qr_code?: string;
}
