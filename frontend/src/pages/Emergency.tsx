import { Phone, MapPin } from 'lucide-react';
import { Button } from '../components/ui/button';

const emergencyContacts = [
  {
    name: 'National Crisis Hotline',
    phone: '1-800-273-8255',
    available: '24/7',
    description: 'Free and confidential support for people in distress',
  },
  {
    name: 'Local Emergency Services',
    phone: '911',
    available: '24/7',
    description: 'For immediate emergency assistance',
  },
  {
    name: 'Crisis Text Line',
    phone: 'Text HOME to 741741',
    available: '24/7',
    description: 'Text with a crisis counselor',
  },
];

const nearbyFacilities = [
  {
    name: 'City Mental Health Center',
    address: '123 Health Street, City, State',
    distance: '0.8 miles',
    phone: '(555) 123-4567',
  },
  {
    name: 'Community Wellness Clinic',
    address: '456 Care Avenue, City, State',
    distance: '1.2 miles',
    phone: '(555) 987-6543',
  },
];

function Emergency() {
  return (
    <div className="max-w-4xl mx-auto">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Emergency Resources</h1>
        <p className="text-lg text-gray-600">Get immediate help when you need it most</p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Emergency Contacts</h2>
          <div className="space-y-4">
            {emergencyContacts.map((contact) => (
              <div key={contact.name} className="bg-red-50 rounded-lg p-4">
                <h3 className="font-medium text-red-900">{contact.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{contact.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-red-700">
                    <Phone className="h-4 w-4 mr-2" />
                    {contact.phone}
                  </div>
                  <span className="text-sm text-red-600">{contact.available}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Nearby Facilities</h2>
          <div className="space-y-4">
            {nearbyFacilities.map((facility) => (
              <div key={facility.name} className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-medium">{facility.name}</h3>
                <div className="flex items-center text-sm text-gray-600 mb-2">
                  <MapPin className="h-4 w-4 mr-1" />
                  {facility.address}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-gray-700">
                    <Phone className="h-4 w-4 mr-2" />
                    {facility.phone}
                  </div>
                  <span className="text-sm text-blue-600">{facility.distance}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 text-center">
        <Button size="lg" className="bg-red-500 hover:bg-red-600">
          <Phone className="h-5 w-5 mr-2" />
          Call Emergency Services
        </Button>
      </div>
    </div>
  );
}

export default Emergency;