import React, { useState } from 'react';
import { Search, Filter, Calendar as CalendarIcon } from 'lucide-react';
import { Event } from '../../types';
import { EventCard } from './EventCard';
import { Button } from '../../components/ui/Button';
import { format } from 'date-fns';

interface EventsListProps {
  events: Event[];
  onEventClick: (id: string) => void;
  onCreateEvent: () => void;
}

export const EventsList: React.FC<EventsListProps> = ({
  events,
  onEventClick,
  onCreateEvent
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterDate, setFilterDate] = useState('');

  const categories = [...new Set(events.map(event => event.category))];

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === '' || event.category === filterCategory;
    const matchesDate = filterDate === '' || event.date === filterDate;
    return matchesSearch && matchesCategory && matchesDate;
  });

  const upcomingEvents = filteredEvents.filter(event => new Date(event.date) >= new Date());
  const pastEvents = filteredEvents.filter(event => new Date(event.date) < new Date());

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="w-full md:w-auto">
          <h2 className="text-2xl font-bold text-gray-900">Discover Events</h2>
          <p className="text-gray-600">Find and book amazing events near you</p>
        </div>
        <Button variant="primary" onClick={onCreateEvent}>
          Create New Event
        </Button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search events by name, description, or location..."
              className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 h-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex gap-4">
            <div className="relative w-48">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Filter className="h-5 w-5 text-gray-400" />
              </div>
              <select
                className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 h-10"
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div className="relative w-48">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <CalendarIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="date"
                className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 h-10"
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-500">
          <div>
            {filteredEvents.length} events found
          </div>
          <div>
            {upcomingEvents.length} upcoming • {pastEvents.length} past
          </div>
        </div>
      </div>

      {filteredEvents.length === 0 ? (
        <div className="bg-white p-8 rounded-lg shadow-sm text-center">
          <div className="max-w-md mx-auto">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No events found</h3>
            <p className="text-gray-500 mb-4">
              Try adjusting your filters or search terms to find more events.
            </p>
            <Button variant="outline" onClick={() => {
              setSearchTerm('');
              setFilterCategory('');
              setFilterDate('');
            }}>
              Clear all filters
            </Button>
          </div>
        </div>
      ) : (
        <>
          {upcomingEvents.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900">Upcoming Events</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {upcomingEvents.map((event) => (
                  <EventCard 
                    key={event.id} 
                    event={event} 
                    onClick={onEventClick} 
                  />
                ))}
              </div>
            </div>
          )}

          {pastEvents.length > 0 && (
            <div className="space-y-4 mt-8">
              <h3 className="text-xl font-semibold text-gray-900">Past Events</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pastEvents.map((event) => (
                  <EventCard 
                    key={event.id} 
                    event={event} 
                    onClick={onEventClick} 
                  />
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};