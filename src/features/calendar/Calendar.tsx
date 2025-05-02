import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Event } from '../../types';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';

interface CalendarProps {
  events: Event[];
  onEventClick: (id: string) => void;
}

export const Calendar: React.FC<CalendarProps> = ({ events, onEventClick }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<'month' | 'week'>('month');

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  const getMonthData = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    
    // First day of the month
    const firstDay = new Date(year, month, 1);
    // Last day of the month
    const lastDay = new Date(year, month + 1, 0);
    
    // Day of the week for the first day (0-6, where 0 is Sunday)
    const firstDayOfWeek = firstDay.getDay();
    
    // Total days in the month
    const daysInMonth = lastDay.getDate();
    
    // Calculate the number of rows needed
    const rows = Math.ceil((firstDayOfWeek + daysInMonth) / 7);
    
    // Initialize the calendar array
    const calendar: (number | null)[][] = Array(rows).fill(null).map(() => Array(7).fill(null));
    
    // Fill in the calendar array
    let dayCounter = 1;
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < 7; j++) {
        // Skip days before the 1st of the month
        if (i === 0 && j < firstDayOfWeek) {
          continue;
        }
        // Stop if we've gone past the last day of the month
        if (dayCounter > daysInMonth) {
          break;
        }
        calendar[i][j] = dayCounter++;
      }
    }
    
    return calendar;
  };

  const getEventsForDate = (date: Date) => {
    return events.filter(event => {
      const eventDate = new Date(event.date);
      return (
        eventDate.getDate() === date.getDate() &&
        eventDate.getMonth() === date.getMonth() &&
        eventDate.getFullYear() === date.getFullYear()
      );
    });
  };

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const calendar = getMonthData(currentDate);

  const getStatusColor = (status: Event['status']) => {
    const colors = {
      upcoming: 'border-l-indigo-500',
      ongoing: 'border-l-green-500',
      completed: 'border-l-teal-500',
      cancelled: 'border-l-red-500',
    };
    return colors[status];
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-900">Event Calendar</h2>
        <div className="flex space-x-2">
          <Button
            variant={view === 'month' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setView('month')}
          >
            Month
          </Button>
          <Button
            variant={view === 'week' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setView('week')}
          >
            Week
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h3 className="text-lg font-semibold">
            {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </h3>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={prevMonth}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentDate(new Date())}
            >
              Today
            </Button>
            <Button variant="outline" size="sm" onClick={nextMonth}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {/* Days of the week header */}
          <div className="grid grid-cols-7 bg-gray-50">
            {daysOfWeek.map((day) => (
              <div key={day} className="py-2 text-center text-sm font-medium text-gray-700">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7 divide-x divide-y divide-gray-200">
            {calendar.map((week, weekIndex) =>
              week.map((day, dayIndex) => {
                if (day === null) {
                  return <div key={`empty-${weekIndex}-${dayIndex}`} className="h-28 sm:h-36 bg-gray-50" />;
                }

                const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
                const isToday = date.toDateString() === new Date().toDateString();
                const dayEvents = getEventsForDate(date);
                
                return (
                  <div
                    key={`day-${weekIndex}-${dayIndex}`}
                    className={`h-28 sm:h-36 p-1 overflow-y-auto ${isToday ? 'bg-indigo-50' : ''}`}
                  >
                    <div className="flex items-center justify-end">
                      <span
                        className={`text-sm inline-flex items-center justify-center h-6 w-6 rounded-full ${
                          isToday ? 'bg-indigo-600 text-white' : 'text-gray-700'
                        }`}
                      >
                        {day}
                      </span>
                    </div>
                    <div className="mt-1 space-y-1">
                      {dayEvents.slice(0, 3).map((event) => (
                        <div
                          key={event.id}
                          className={`text-xs p-1 rounded truncate cursor-pointer border-l-2 ${getStatusColor(event.status)}`}
                          onClick={() => onEventClick(event.id)}
                        >
                          <div className="font-medium">{event.title}</div>
                        </div>
                      ))}
                      {dayEvents.length > 3 && (
                        <div className="text-xs text-gray-500 pl-1">
                          +{dayEvents.length - 3} more
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-4">Upcoming Events</h3>
        {events
          .filter((event) => new Date(event.date) >= new Date())
          .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
          .slice(0, 5)
          .map((event) => (
            <div
              key={event.id}
              className={`p-3 mb-3 rounded-lg border-l-4 ${getStatusColor(event.status)} hover:bg-gray-50 cursor-pointer`}
              onClick={() => onEventClick(event.id)}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium">{event.title}</h4>
                  <div className="text-sm text-gray-500">
                    {new Date(event.date).toLocaleDateString('en-US', {
                      weekday: 'short',
                      month: 'short',
                      day: 'numeric',
                    })}
                    {' • '}
                    {event.location}
                  </div>
                </div>
                <Badge variant="secondary">{event.category}</Badge>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};