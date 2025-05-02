import React, { useState } from 'react';
import { Calendar, MapPin, Users, Clock, Tag, ArrowLeft, Share2 } from 'lucide-react';
import { Event, Ticket } from '../../types';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import toast from 'react-hot-toast';

interface EventDetailProps {
  event: Event;
  tickets: Ticket[];
  onBack: () => void;
  onBuyTicket: (eventId: string, ticketId: string) => void;
}

export const EventDetail: React.FC<EventDetailProps> = ({
  event,
  tickets,
  onBack,
  onBuyTicket
}) => {
  const [activeTab, setActiveTab] = useState<'details' | 'tickets'>('details');

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      month: 'long', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const handleBuyTicket = (eventId: string, ticketId: string) => {
    onBuyTicket(eventId, ticketId);
    toast.success('Ticket purchased successfully! Check your email for confirmation.');
  };

  const eventTickets = tickets.filter(ticket => ticket.eventId === event.id);

  return (
    <div className="space-y-6">
      <div className="flex items-center mb-4">
        <button 
          onClick={onBack}
          className="flex items-center text-gray-500 hover:text-gray-700"
        >
          <ArrowLeft className="h-5 w-5 mr-1" />
          Back to Events
        </button>
      </div>

      <div className="relative h-80 rounded-xl overflow-hidden">
        <img 
          src={event.image} 
          alt={event.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-6 text-white">
          <div className="flex space-x-2 mb-3">
            <Badge variant="secondary">{event.category}</Badge>
            <Badge 
              variant={event.status === 'cancelled' ? 'error' : 
                      event.status === 'ongoing' ? 'success' : 
                      event.status === 'completed' ? 'secondary' : 'primary'}
            >
              {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
            </Badge>
          </div>
          <h1 className="text-3xl font-bold mb-2">{event.title}</h1>
          <p className="text-sm text-gray-200">Organized by {event.organizer}</p>
        </div>
        <div className="absolute top-4 right-4">
          <Button
            variant="ghost" 
            className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30"
            size="sm"
          >
            <Share2 className="h-4 w-4 mr-1" />
            Share
          </Button>
        </div>
      </div>

      <div className="flex border-b border-gray-200">
        <button
          className={`py-4 px-6 border-b-2 font-medium ${
            activeTab === 'details'
              ? 'border-indigo-500 text-indigo-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
          onClick={() => setActiveTab('details')}
        >
          Event Details
        </button>
        <button
          className={`py-4 px-6 border-b-2 font-medium ${
            activeTab === 'tickets'
              ? 'border-indigo-500 text-indigo-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
          onClick={() => setActiveTab('tickets')}
        >
          Buy Tickets
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {activeTab === 'details' ? (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">About this event</h2>
              <p className="text-gray-600 mb-6">{event.description}</p>
              
              <h3 className="text-lg font-medium mb-3">Event Information</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <Calendar className="h-5 w-5 text-indigo-500 mr-3 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Date and Time</h4>
                    <p className="text-gray-600 text-sm">{formatDate(event.date)}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-indigo-500 mr-3 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Location</h4>
                    <p className="text-gray-600 text-sm">{event.location}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Users className="h-5 w-5 text-indigo-500 mr-3 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Capacity</h4>
                    <p className="text-gray-600 text-sm">{event.attendees} attending out of {event.capacity} spots</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Tag className="h-5 w-5 text-indigo-500 mr-3 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Category</h4>
                    <p className="text-gray-600 text-sm">{event.category}</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Available Tickets</h2>
              {eventTickets.length === 0 ? (
                <p className="text-gray-500">No tickets available for this event.</p>
              ) : (
                <div className="space-y-4">
                  {eventTickets.map((ticket) => (
                    <Card key={ticket.id} className="overflow-hidden">
                      <CardContent className="p-0">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 border-b border-gray-100">
                          <div>
                            <h3 className="text-lg font-semibold">{ticket.type}</h3>
                            <p className="text-sm text-gray-600">
                              {ticket.available - ticket.sold} remaining out of {ticket.available}
                            </p>
                          </div>
                          <div className="mt-3 sm:mt-0">
                            <span className="text-2xl font-bold text-indigo-600">${ticket.price}</span>
                          </div>
                        </div>
                        <div className="p-4 bg-gray-50 flex items-center justify-between">
                          <div className="flex items-center text-sm text-gray-500">
                            <Clock className="h-4 w-4 mr-1" />
                            Limited availability
                          </div>
                          <Button 
                            variant="primary" 
                            onClick={() => handleBuyTicket(event.id, ticket.id)}
                            disabled={ticket.sold >= ticket.available}
                          >
                            {ticket.sold >= ticket.available ? 'Sold Out' : 'Buy Now'}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Quick Purchase</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-gray-500">Event Date</h4>
                <p className="font-semibold">{formatDate(event.date)}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">Location</h4>
                <p className="font-semibold">{event.location}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">Organizer</h4>
                <p className="font-semibold">{event.organizer}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">Availability</h4>
                <div className="mt-1">
                  <div className="relative pt-1">
                    <div className="flex mb-2 items-center justify-between">
                      <div>
                        <span className="text-xs font-semibold inline-block text-indigo-600">
                          {Math.round((event.attendees / event.capacity) * 100)}% Filled
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-semibold inline-block text-indigo-600">
                          {event.attendees}/{event.capacity}
                        </span>
                      </div>
                    </div>
                    <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-indigo-200">
                      <div 
                        style={{ width: `${(event.attendees / event.capacity) * 100}%` }} 
                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-500"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
              <Button 
                variant="primary" 
                fullWidth 
                onClick={() => setActiveTab('tickets')}
              >
                View Ticket Options
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};