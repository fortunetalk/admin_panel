
import { TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { useState } from 'react';

const DateFilter = ({ column, onFilterChange }) => {
    const [selectedDate, setSelectedDate] = useState(null);
  
    const handleDateChange = (date) => {
      setSelectedDate(date);
      onFilterChange(date ? date.toISOString() : null);
    };
  
    return (
      <DatePicker
        label="Select Date"
        value={selectedDate}
        onChange={handleDateChange}
        renderInput={(params) => <TextField {...params} />}
      />
    );
  };
  export default DateFilter;