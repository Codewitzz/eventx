import React, { useState } from 'react';
import { Search, Plus, Info } from 'lucide-react';
import { Vendor } from '../../types';
import { Card, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Avatar } from '../../components/ui/Avatar';

interface VendorsListProps {
  vendors: Vendor[];
  onVendorClick: (id: string) => void;
  onAddVendor: () => void;
}

export const VendorsList: React.FC<VendorsListProps> = ({
  vendors,
  onVendorClick,
  onAddVendor
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');

  const categories = [...new Set(vendors.map(vendor => vendor.category))];
  
  const filteredVendors = vendors.filter(vendor => {
    const matchesSearch = vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          vendor.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === '' || vendor.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Vendors</h2>
          <p className="text-gray-600">Manage vendors and partners for your events</p>
        </div>
        <Button variant="primary" onClick={onAddVendor}>
          <Plus className="h-4 w-4 mr-1" />
          Add Vendor
        </Button>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search vendors..."
              className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 h-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="relative md:w-1/4">
            <select
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 h-10"
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
        </div>
      </div>

      {filteredVendors.length === 0 ? (
        <div className="bg-white p-8 rounded-lg shadow-sm text-center">
          <p className="text-gray-500">No vendors found. Try adjusting your filters or add a new vendor.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVendors.map((vendor) => (
            <Card 
              key={vendor.id} 
              className="hover:shadow-md transition-all duration-200 transform hover:-translate-y-1"
            >
              <CardContent className="p-0">
                <div className="p-4 flex items-start space-x-4">
                  <Avatar 
                    src={vendor.logo} 
                    alt={vendor.name} 
                    size="lg" 
                    className="rounded-md"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold mb-1">{vendor.name}</h3>
                    <Badge variant="secondary" className="mb-2">{vendor.category}</Badge>
                    <p className="text-sm text-gray-600 line-clamp-2">{vendor.description}</p>
                  </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 flex justify-between items-center">
                  <span className="text-sm text-gray-500">{vendor.contactEmail}</span>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => onVendorClick(vendor.id)}
                  >
                    <Info className="h-4 w-4 mr-1" />
                    Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};