import React, { useState } from 'react';
import { format, startOfWeek, addDays, isSameDay } from 'date-fns';
import { Button } from '../components/ui/button';
import { useCalendarStore } from '../store/calendar';

function Calendar() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { events, addEvent, removeEvent } = useCalendarStore();
  const [showAddForm, setShowAddForm] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    time: '',
    type: 'therapy' as const,
  });

  const weekStart = startOfWeek(new Date());
  const weekDays = [...Array(7)].map((_, i) => addDays(weekStart, i));

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    addEvent({
      ...newEvent,
      date: selectedDate,
    });
    setNewEvent({ title: '', time: '', type: 'therapy' });
    setShowAddForm(false);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Schedule Sessions</h1>
        <p className="text-lg text-gray-600">Plan your therapy and wellness activities</p>
      </header>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="grid grid-cols-7 gap-2 mb-4">
          {weekDays.map((day) => (
            <div
              key={day.toString()}
              className="text-center"
            >
              <div className="text-sm text-gray-500 mb-1">
                {format(day, 'EEE')}
              </div>
              <Button
                variant={isSameDay(day, selectedDate) ? 'default' : 'outline'}
                className="w-full"
                onClick={() => setSelectedDate(day)}
              >
                {format(day, 'd')}
              </Button>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">
              Events for {format(selectedDate, 'MMMM d, yyyy')}
            </h2>
            <Button onClick={() => setShowAddForm(true)}>Add Event</Button>
          </div>

          {showAddForm && (
            <form onSubmit={handleAddEvent} className="mb-4 p-4 bg-gray-50 rounded-lg">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Title</label>
                  <input
                    type="text"
                    value={newEvent.title}
                    onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Time</label>
                  <input
                    type="time"
                    value={newEvent.time}
                    onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Type</label>
                  <select
                    value={newEvent.type}
                    onChange={(e) => setNewEvent({ ...newEvent, type: e.target.value as 'therapy' | 'meditation' | 'exercise' })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="therapy">Therapy</option>
                    <option value="meditation">Meditation</option>
                    <option value="exercise">Exercise</option>
                  </select>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setShowAddForm(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Save Event</Button>
                </div>
              </div>
            </form>
          )}

          <div className="space-y-4">
            {events
              .filter((event) => isSameDay(event.date, selectedDate))
              .map((event) => (
                <div
                  key={event.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div>
                    <h3 className="font-medium">{event.title}</h3>
                    <p className="text-sm text-gray-500">{event.time}</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline">Join</Button>
                    <Button
                      variant="outline"
                      onClick={() => removeEvent(event.id)}
                      className="text-red-500 hover:bg-red-50"
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Calendar;