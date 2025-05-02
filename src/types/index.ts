export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  image: string;
  organizer: string;
  category: string;
  capacity: number;
  attendees: number;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
}

export interface Ticket {
  id: string;
  eventId: string;
  type: string;
  price: number;
  available: number;
  sold: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'organizer' | 'attendee';
  avatar: string;
}

export interface Vendor {
  id: string;
  name: string;
  description: string;
  logo: string;
  category: string;
  contactEmail: string;
}

export interface Speaker {
  id: string;
  name: string;
  bio: string;
  photo: string;
  expertise: string[];
  social: {
    twitter?: string;
    linkedin?: string;
    website?: string;
  };
}

export interface AnalyticsData {
  totalEvents: number;
  totalAttendees: number;
  totalRevenue: number;
  popularEvents: {
    eventId: string;
    title: string;
    attendees: number;
  }[];
  revenueByMonth: {
    month: string;
    revenue: number;
  }[];
}