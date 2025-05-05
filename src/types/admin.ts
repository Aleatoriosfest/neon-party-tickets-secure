
export interface AdminDashboardStats {
  ticketsSold: number;
  activeEvents: number;
  registeredUsers: number;
  revenue: string;
}

export interface AdminEvent {
  id: string;
  title: string;
  date: string;
  status: 'Ativo' | 'Programado' | 'Finalizado';
}

export interface AdminTicketSale {
  id: string;
  user: {
    initials: string;
    name: string;
    time: string;
  };
  amount: string;
}

export interface VerificationResult {
  isValid: boolean;
  message: string;
  ticket?: {
    event_name: string;
    user_name: string;
    purchase_date: string;
  }
}
