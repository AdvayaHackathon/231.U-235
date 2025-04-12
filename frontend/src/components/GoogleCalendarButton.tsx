import { Calendar as CalendarIcon } from 'lucide-react';
import { Button } from './ui/button';

interface GoogleCalendarButtonProps {
  event: {
    title: string;
    description?: string;
    startDate: string; // Format: YYYY-MM-DD
    startTime: string; // Format: HH:mm
    endDate: string;   // Format: YYYY-MM-DD
    endTime: string;   // Format: HH:mm
  };
}

function GoogleCalendarButton({ event }: GoogleCalendarButtonProps) {
  const handleAddToCalendar = () => {
    const { title, description = '', startDate, startTime, endDate, endTime } = event;

    // Format dates for Google Calendar URL
    function formatDateForCalendar(date: string, time: string) {
      const [year, month, day] = date.split('-');
      const [hour, minute] = time.split(':');
      return `${year}${month}${day}T${hour}${minute}00`;
    }

    // Extend endTime by 60 minutes and format like start dateTime
    function extendEndTime(date: string, time: string) {
      const dateTime = new Date(`${date}T${time}`);
      dateTime.setMinutes(dateTime.getMinutes() + 60); // Add 60 minutes
      const year = dateTime.getFullYear();
      const month = String(dateTime.getMonth() + 1).padStart(2, '0'); // Month is 0-based
      const day = String(dateTime.getDate()).padStart(2, '0');
      const hour = String(dateTime.getHours()).padStart(2, '0');
      const minute = String(dateTime.getMinutes()).padStart(2, '0');
      return `${year}${month}${day}T${hour}${minute}00`;
    }

    const start = formatDateForCalendar(startDate, startTime);
    const end = extendEndTime(endDate, endTime);

    // Create Google Calendar URL
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&details=${encodeURIComponent(description)}&dates=${start}/${end}`;

    // Open Google Calendar in a new tab
    window.open(url, '_blank');
  };

  return (
    <Button
      variant="outline"
      onClick={handleAddToCalendar}
      className="flex items-center space-x-2"
    >
      <CalendarIcon className="h-4 w-4" />
      <span>Add to Google Calendar</span>
    </Button>
  );
}

export default GoogleCalendarButton;