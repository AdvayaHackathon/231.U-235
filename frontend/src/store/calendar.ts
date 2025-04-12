import { create } from 'zustand';
import { addDays, format } from 'date-fns';

interface Event {
  id: number;
  title: string;
  time: string;
  date: string;
  type: 'therapy' | 'meditation' | 'exercise';
}

interface CalendarState {
  events: Event[];
  addEvent: (event: Omit<Event, 'id'>) => void;
  removeEvent: (id: number) => void;
}

export const useCalendarStore = create<CalendarState>((set) => ({
  events: [
    {
      id: 1,
      title: 'Therapy Session',
      time: '10:00',
      date: format(new Date(), 'yyyy-MM-dd'),
      type: 'therapy',
    },
    {
      id: 2,
      title: 'Meditation Group',
      time: '2:00',
      date: format(addDays(new Date(), 2), 'yyyy-MM-dd'),
      type: 'meditation',
    },
  ],
  addEvent: (event) =>
    set((state) => ({
      events: [
        ...state.events,
        {
          ...event,
          id: Math.max(...state.events.map((e) => e.id), 0) + 1,
        },
      ],
    })),
  removeEvent: (id) =>
    set((state) => ({
      events: state.events.filter((event) => event.id !== id),
    })),
}));