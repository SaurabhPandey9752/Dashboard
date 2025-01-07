import React from 'react';
import ReactDatePicker from 'react-datepicker';
import { format, parse } from 'date-fns';
import { Calendar } from 'lucide-react';
import "react-datepicker/dist/react-datepicker.css";

interface DatePickerProps {
  selectedDate: string;
  onDateChange: (date: string) => void;
  availableDates: string[];
}

export const DatePicker: React.FC<DatePickerProps> = ({
  selectedDate,
  onDateChange,
  availableDates,
}) => {
  const parsedDate = parse(selectedDate, 'dd-MM-yyyy', new Date());
  const parsedAvailableDates = availableDates.map(date => 
    parse(date, 'dd-MM-yyyy', new Date())
  );

  const handleDateChange = (date: Date) => {
    onDateChange(format(date, 'dd-MM-yyyy'));
  };

  return (
    <div className="relative">
      <ReactDatePicker
        selected={parsedDate}
        onChange={handleDateChange}
        dateFormat="dd/MM/yyyy"
        includeDates={parsedAvailableDates}
        customInput={
          <button className="flex items-center space-x-2 px-3 py-2 border rounded-lg hover:bg-gray-50">
            <Calendar className="h-5 w-5 text-gray-500" />
            <span className="text-sm text-gray-700">{format(parsedDate, 'dd MMM yyyy')}</span>
          </button>
        }
        className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      />
    </div>
  );
};