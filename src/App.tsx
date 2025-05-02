import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { Navbar } from './components/layout/Navbar';
import { EventsList } from './features/events/EventsList';
import { EventDetail } from './features/events/EventDetail';
import { Calendar } from './features/calendar/Calendar';
import { TicketsList } from './features/tickets/TicketsList';
import { VendorsList } from './features/vendors/VendorsList';
import { AnalyticsDashboard } from './features/analytics/AnalyticsDashboard';
import { CreateEventModal } from './features/events/CreateEventModal';
import { mockEvents, mockTickets, mockVendors, mockAnalytics } from './data/mockData';
import { Event } from './types';

const App: React.FC = () => {
  const [currentPath, setCurrentPath] = useState<string>('/events');
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [isCreateEventModalOpen, setIsCreateEventModalOpen] = useState(false);
  const [events, setEvents] = useState<Event[]>(mockEvents);

  const handleNavigate = (path: string) => {
    setCurrentPath(path);
    setSelectedEventId(null);
  };

  const handleEventClick = (id: string) => {
    setSelectedEventId(id);
    setCurrentPath('/event-detail');
  };

  const handleBackToEvents = () => {
    setSelectedEventId(null);
    setCurrentPath('/events');
  };

  const handleCreateEvent = (newEvent: Event) => {
    setEvents(prevEvents => [...prevEvents, newEvent]);
    setIsCreateEventModalOpen(false);
  };

  const handleBuyTicket = (eventId: string, ticketId: string) => {
    console.log(`Buy ticket ${ticketId} for event ${eventId}`);
    // In a real app, this would open a modal or navigate to checkout
  };

  const handleVendorClick = (id: string) => {
    console.log(`View vendor ${id}`);
    // In a real app, this would show vendor details
  };

  const handleAddVendor = () => {
    console.log('Add vendor');
    // In a real app, this would open a form to add a vendor
  };

  const handleTicketClick = (eventId: string, ticketId: string) => {
    console.log(`View ticket ${ticketId} for event ${eventId}`);
    // In a real app, this would show the QR code or details
  };

  const renderContent = () => {
    if (currentPath === '/event-detail' && selectedEventId) {
      const event = events.find(e => e.id === selectedEventId);
      if (!event) return <div>Event not found</div>;
      
      return (
        <EventDetail 
          event={event} 
          tickets={mockTickets}
          onBack={handleBackToEvents}
          onBuyTicket={handleBuyTicket}
        />
      );
    }

    switch (currentPath) {
      case '/events':
        return <EventsList 
          events={events} 
          onEventClick={handleEventClick}
          onCreateEvent={() => setIsCreateEventModalOpen(true)}
        />;
      case '/calendar':
        return <Calendar 
          events={events}
          onEventClick={handleEventClick}
        />;
      case '/tickets':
        return <TicketsList 
          tickets={mockTickets}
          events={events}
          onTicketClick={handleTicketClick}
        />;
      case '/vendors':
        return <VendorsList 
          vendors={mockVendors}
          onVendorClick={handleVendorClick}
          onAddVendor={handleAddVendor}
        />;
      case '/analytics':
        return <AnalyticsDashboard 
          analyticsData={mockAnalytics} 
          events={events}
          onEventClick={handleEventClick}
        />;
      default:
        return <div>Page not found</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar onNavigate={handleNavigate} currentPath={currentPath} />
      
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {renderContent()}
      </main>

      <CreateEventModal 
        isOpen={isCreateEventModalOpen}
        onClose={() => setIsCreateEventModalOpen(false)}
        onSubmit={handleCreateEvent}
      />

      <Toaster position="top-right" />
    </div>
  );
};

export default App;