import { Event, Ticket, User, Vendor, Speaker, AnalyticsData } from '../types';

export const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Tech Conference 2025',
    description: 'Join us for the biggest tech conference of the year featuring top speakers from around the world.',
    date: '2025-06-15',
    location: 'San Francisco Convention Center',
    image: 'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    organizer: 'TechEvents Inc.',
    category: 'Technology',
    capacity: 1000,
    attendees: 750,
    status: 'upcoming'
  },
  {
    id: '2',
    title: 'Music Festival',
    description: 'Three days of amazing music from top artists across multiple genres.',
    date: '2025-07-22',
    location: 'Golden Gate Park',
    image: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    organizer: 'SoundWave Productions',
    category: 'Music',
    capacity: 5000,
    attendees: 3200,
    status: 'upcoming'
  },
  {
    id: '3',
    title: 'Food & Wine Expo',
    description: 'Taste the finest cuisines and wines from renowned chefs and vineyards.',
    date: '2025-05-10',
    location: 'Marina Bay Convention',
    image: 'https://images.pexels.com/photos/1579739/pexels-photo-1579739.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    organizer: 'Culinary Arts Association',
    category: 'Food & Drink',
    capacity: 800,
    attendees: 650,
    status: 'upcoming'
  },
  {
    id: '4',
    title: 'Business Leadership Summit',
    description: 'Connect with industry leaders and learn the latest business strategies.',
    date: '2025-08-05',
    location: 'Grand Hyatt Conference Center',
    image: 'https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    organizer: 'Business Growth Network',
    category: 'Business',
    capacity: 300,
    attendees: 275,
    status: 'upcoming'
  }
];

export const mockTickets: Ticket[] = [
  { id: '1', eventId: '1', type: 'VIP', price: 299, available: 100, sold: 75 },
  { id: '2', eventId: '1', type: 'Regular', price: 99, available: 900, sold: 675 },
  { id: '3', eventId: '2', type: 'Weekend Pass', price: 199, available: 3000, sold: 2100 },
  { id: '4', eventId: '2', type: 'Single Day', price: 79, available: 2000, sold: 1100 },
  { id: '5', eventId: '3', type: 'Premium', price: 150, available: 200, sold: 175 },
  { id: '6', eventId: '3', type: 'Standard', price: 75, available: 600, sold: 475 },
  { id: '7', eventId: '4', type: 'Executive', price: 499, available: 50, sold: 45 },
  { id: '8', eventId: '4', type: 'Professional', price: 299, available: 250, sold: 230 }
];

export const mockUsers: User[] = [
  { id: '1', name: 'John Doe', email: 'john@example.com', role: 'admin', avatar: 'https://i.pravatar.cc/150?img=1' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'organizer', avatar: 'https://i.pravatar.cc/150?img=5' },
  { id: '3', name: 'Alex Johnson', email: 'alex@example.com', role: 'attendee', avatar: 'https://i.pravatar.cc/150?img=3' }
];

export const mockVendors: Vendor[] = [
  { id: '1', name: 'TechGadgets Pro', description: 'Latest tech gadgets and accessories', logo: 'https://i.pravatar.cc/150?img=11', category: 'Technology', contactEmail: 'contact@techgadgets.com' },
  { id: '2', name: 'Gourmet Delights', description: 'Premium food and beverage products', logo: 'https://i.pravatar.cc/150?img=12', category: 'Food', contactEmail: 'info@gourmetdelights.com' },
  { id: '3', name: 'EcoFriendly Solutions', description: 'Sustainable products for everyday life', logo: 'https://i.pravatar.cc/150?img=13', category: 'Sustainability', contactEmail: 'support@ecofriendly.com' }
];

export const mockSpeakers: Speaker[] = [
  { 
    id: '1', 
    name: 'Dr. Sarah Chen', 
    bio: 'AI researcher and author with over 15 years of experience in machine learning',
    photo: 'https://i.pravatar.cc/150?img=20',
    expertise: ['Artificial Intelligence', 'Machine Learning', 'Data Science'],
    social: {
      twitter: 'https://twitter.com/sarahchen',
      linkedin: 'https://linkedin.com/in/sarahchen',
      website: 'https://sarahchen.com'
    }
  },
  { 
    id: '2', 
    name: 'Michael Rodriguez', 
    bio: 'Serial entrepreneur who has founded three successful tech startups',
    photo: 'https://i.pravatar.cc/150?img=21',
    expertise: ['Entrepreneurship', 'Venture Capital', 'Product Strategy'],
    social: {
      twitter: 'https://twitter.com/mrodriguez',
      linkedin: 'https://linkedin.com/in/mrodriguez'
    }
  },
  { 
    id: '3', 
    name: 'Emma Thompson', 
    bio: 'Creative director and design thinking expert working with Fortune 500 companies',
    photo: 'https://i.pravatar.cc/150?img=22',
    expertise: ['Design Thinking', 'UX/UI', 'Brand Strategy'],
    social: {
      linkedin: 'https://linkedin.com/in/emmathompson',
      website: 'https://emmathompson.design'
    }
  }
];

export const mockAnalytics: AnalyticsData = {
  totalEvents: 24,
  totalAttendees: 12500,
  totalRevenue: 875000,
  popularEvents: [
    { eventId: '2', title: 'Music Festival', attendees: 3200 },
    { eventId: '1', title: 'Tech Conference 2025', attendees: 750 },
    { eventId: '3', title: 'Food & Wine Expo', attendees: 650 }
  ],
  revenueByMonth: [
    { month: 'Jan', revenue: 85000 },
    { month: 'Feb', revenue: 72000 },
    { month: 'Mar', revenue: 92500 },
    { month: 'Apr', revenue: 105000 },
    { month: 'May', revenue: 120000 },
    { month: 'Jun', revenue: 135000 },
    { month: 'Jul', revenue: 115000 },
    { month: 'Aug', revenue: 98000 },
    { month: 'Sep', revenue: 52500 }
  ]
};