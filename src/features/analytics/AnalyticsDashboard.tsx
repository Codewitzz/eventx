import React from 'react';
import { TrendingUp, Users, Calendar, DollarSign, Award, ChevronUp, ChevronDown } from 'lucide-react';
import { AnalyticsData, Event } from '../../types';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';

interface AnalyticsDashboardProps {
  analyticsData: AnalyticsData;
  events: Event[];
  onEventClick: (id: string) => void;
}

export const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({
  analyticsData,
  events,
  onEventClick
}) => {
  // Calculate month-over-month growth
  const calculateGrowth = (current: number, previous: number) => {
    if (previous === 0) return 100;
    return ((current - previous) / previous) * 100;
  };

  const currentMonthRevenue = analyticsData.revenueByMonth[analyticsData.revenueByMonth.length - 1]?.revenue || 0;
  const previousMonthRevenue = analyticsData.revenueByMonth[analyticsData.revenueByMonth.length - 2]?.revenue || 0;
  const revenueGrowth = calculateGrowth(currentMonthRevenue, previousMonthRevenue);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h2>
        <p className="text-gray-600">Track your event performance and metrics</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Events</p>
                <h3 className="text-2xl font-bold mt-1">{analyticsData.totalEvents}</h3>
              </div>
              <div className="h-12 w-12 bg-indigo-100 rounded-full flex items-center justify-center">
                <Calendar className="h-6 w-6 text-indigo-600" />
              </div>
            </div>
            <div className="mt-4 text-sm text-green-600 flex items-center">
              <ChevronUp className="h-4 w-4 mr-1" />
              <span>12% increase</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Attendees</p>
                <h3 className="text-2xl font-bold mt-1">{analyticsData.totalAttendees.toLocaleString()}</h3>
              </div>
              <div className="h-12 w-12 bg-teal-100 rounded-full flex items-center justify-center">
                <Users className="h-6 w-6 text-teal-600" />
              </div>
            </div>
            <div className="mt-4 text-sm text-green-600 flex items-center">
              <ChevronUp className="h-4 w-4 mr-1" />
              <span>8% increase</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Revenue</p>
                <h3 className="text-2xl font-bold mt-1">${analyticsData.totalRevenue.toLocaleString()}</h3>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className={`mt-4 text-sm flex items-center ${revenueGrowth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {revenueGrowth >= 0 ? (
                <ChevronUp className="h-4 w-4 mr-1" />
              ) : (
                <ChevronDown className="h-4 w-4 mr-1" />
              )}
              <span>{Math.abs(revenueGrowth).toFixed(1)}% {revenueGrowth >= 0 ? 'increase' : 'decrease'}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Avg. Ticket Price</p>
                <h3 className="text-2xl font-bold mt-1">$87</h3>
              </div>
              <div className="h-12 w-12 bg-amber-100 rounded-full flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-amber-600" />
              </div>
            </div>
            <div className="mt-4 text-sm text-green-600 flex items-center">
              <ChevronUp className="h-4 w-4 mr-1" />
              <span>5% increase</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Revenue by Month</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              {/* Bar chart for revenue by month */}
              <div className="h-full flex items-end space-x-2">
                {analyticsData.revenueByMonth.map((item, index) => {
                  const height = (item.revenue / Math.max(...analyticsData.revenueByMonth.map(i => i.revenue))) * 100;
                  return (
                    <div key={index} className="flex-1 flex flex-col items-center">
                      <div className="w-full flex justify-center mb-2">
                        <div 
                          className="bg-indigo-500 hover:bg-indigo-600 rounded-t w-full transition-all duration-300"
                          style={{ height: `${height}%` }}
                          title={`$${item.revenue.toLocaleString()}`}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-600">{item.month}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Popular Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analyticsData.popularEvents.map((item, index) => {
                const event = events.find(e => e.id === item.eventId);
                if (!event) return null;
                
                return (
                  <div 
                    key={index} 
                    className="flex items-center p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() => onEventClick(item.eventId)}
                  >
                    <div className="flex-shrink-0 mr-4">
                      <div className="h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center">
                        <span className="font-bold text-indigo-600">{index + 1}</span>
                      </div>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-gray-900 truncate">{event.title}</p>
                      <p className="text-sm text-gray-500">
                        {event.category} • {item.attendees.toLocaleString()} attendees
                      </p>
                    </div>
                    <div className="flex-shrink-0">
                      {index === 0 && (
                        <Award className="h-5 w-5 text-amber-500" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Event Categories Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="h-64 flex items-center justify-center">
                {/* Placeholder for a pie chart - in a real app, use a charting library */}
                <div className="relative h-40 w-40 rounded-full overflow-hidden">
                  <div className="absolute inset-0 border-8 border-indigo-500" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 0)' }}></div>
                  <div className="absolute inset-0 border-8 border-teal-500" style={{ clipPath: 'polygon(0 0, 100% 100%, 0 100%, 0 0)' }}></div>
                  <div className="absolute inset-0 border-8 border-amber-500" style={{ clipPath: 'polygon(100% 0, 100% 100%, 0 100%, 100% 0)' }}></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <div className="h-4 w-4 bg-indigo-500 rounded-sm mr-2"></div>
                  <span className="text-sm">Technology (35%)</span>
                </div>
                <div className="flex items-center">
                  <div className="h-4 w-4 bg-teal-500 rounded-sm mr-2"></div>
                  <span className="text-sm">Music (25%)</span>
                </div>
                <div className="flex items-center">
                  <div className="h-4 w-4 bg-amber-500 rounded-sm mr-2"></div>
                  <span className="text-sm">Food & Drink (20%)</span>
                </div>
                <div className="flex items-center">
                  <div className="h-4 w-4 bg-red-500 rounded-sm mr-2"></div>
                  <span className="text-sm">Business (15%)</span>
                </div>
                <div className="flex items-center">
                  <div className="h-4 w-4 bg-gray-500 rounded-sm mr-2"></div>
                  <span className="text-sm">Other (5%)</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};