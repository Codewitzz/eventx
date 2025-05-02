import React from 'react';
import { Calendar, MapPin, Users, Clock } from 'lucide-react';
import { Event } from '../../types';
import { Card, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';

interface EventCardProps {
  event: Event;
  onClick: (id: string) => void;
}

export const EventCard: React.FC<EventCardProps> = ({ event, onClick }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const getStatusBadge = (status: Event['status']) => {
    const variants = {
      upcoming: 'primary',
      ongoing: 'success',
      completed: 'secondary',
      cancelled: 'error',
    } as const;

    return <Badge variant={variants[status]}>{status.charAt(0).toUpperCase() + status.slice(1)}</Badge>;
  };

  const isUpcoming = new Date(event.date) >= new Date();
  const availableSpots = event.capacity - event.attendees;

  return (
    <Card className="h-full transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1">
      <div className="relative h-48 overflow-hidden rounded-t-lg">
        <img 
          src={event.image} 
          alt={event.title} 
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
        />
        <div className="absolute top-4 right-4 flex space-x-2">
          {getStatusBadge(event.status)}
          {isUpcoming && availableSpots <= event.capacity * 0.2 && (
            <Badge variant="error">Only {availableSpots} spots left</Badge>
          )}
        </div>
      </div>
      <CardContent className="p-5">
        <div className="mb-3">
          <Badge variant="secondary">{event.category}</Badge>
        </div>

        <h3 className="text-xl font-semibold mb-2 text-gray-900 line-clamp-2">{event.title}</h3>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{event.description}</p>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-gray-500 text-sm">
            <Calendar className="h-4 w-4 mr-2" />
            {formatDate(event.date)}
          </div>
          <div className="flex items-center text-gray-500 text-sm">
            <MapPin className="h-4 w-4 mr-2" />
            {event.location}
          </div>
          <div className="flex items-center text-gray-500 text-sm">
            <Users className="h-4 w-4 mr-2" />
            {event.attendees} / {event.capacity} attendees
          </div>
          {isUpcoming && (
            <div className="flex items-center text-gray-500 text-sm">
              <Clock className="h-4 w-4 mr-2" />
              {availableSpots} spots remaining
            </div>
          )}
        </div>
        
        <Button 
          variant={isUpcoming ? "primary" : "outline"}
          fullWidth
          onClick={() => onClick(event.id)}
        >
          {isUpcoming ? 'Get Tickets' : 'View Details'}
        </Button>
      </CardContent>
    </Card>
  );
};