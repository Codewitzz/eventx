import React, { useState } from 'react';
import { Search, QrCode, Download } from 'lucide-react';
import { Event, Ticket } from '../../types';
import { Card, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';

interface TicketsListProps {
  tickets: Ticket[];
  events: Event[];
  onTicketClick: (eventId: string, ticketId: string) => void;
}

export const TicketsList: React.FC<TicketsListProps> = ({
  tickets,
  events,
  onTicketClick
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Group tickets by event
  const ticketsByEvent = tickets.reduce((acc, ticket) => {
    if (!acc[ticket.eventId]) {
      acc[ticket.eventId] = [];
    }
    acc[ticket.eventId].push(ticket);
    return acc;
  }, {} as Record<string, Ticket[]>);

  // Filter events based on search term
  const filteredEventIds = Object.keys(ticketsByEvent).filter(eventId => {
    const event = events.find(e => e.id === eventId);
    if (!event) return false;
    
    return event.title.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Tickets Management</h2>
          <p className="text-gray-600">Manage tickets for all your events</p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search events..."
            className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 h-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {filteredEventIds.length === 0 ? (
        <div className="bg-white p-8 rounded-lg shadow-sm text-center">
          <p className="text-gray-500">No tickets found. Try adjusting your search.</p>
        </div>
      ) : (
        <div className="space-y-8">
          {filteredEventIds.map(eventId => {
            const event = events.find(e => e.id === eventId);
            if (!event) return null;
            
            return (
              <div key={eventId} className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-900">{event.title}</h3>
                <p className="text-gray-600 text-sm">
                  {new Date(event.date).toLocaleDateString('en-US', {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                  {' • '}
                  {event.location}
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {ticketsByEvent[eventId].map(ticket => (
                    <Card 
                      key={ticket.id} 
                      className="hover:shadow-md transition-shadow duration-200"
                    >
                      <CardContent className="p-0">
                        <div className="p-4 border-b border-gray-100">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold">{ticket.type} Ticket</h4>
                            <Badge variant="primary">${ticket.price}</Badge>
                          </div>
                          <div className="flex justify-between text-sm text-gray-600">
                            <span>Available: {ticket.available}</span>
                            <span>Sold: {ticket.sold}</span>
                          </div>
                        </div>
                        <div className="p-4 bg-gray-50 flex justify-between items-center">
                          <div className="text-sm text-gray-600">
                            {Math.round((ticket.sold / ticket.available) * 100)}% sold
                          </div>
                          <div className="flex space-x-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => onTicketClick(event.id, ticket.id)}
                            >
                              <QrCode className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                            >
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};