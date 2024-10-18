export const secondsToHMS = (duration) => {
    const seconds = parseFloat(duration).toFixed(0)
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = Math.floor(seconds % 60);
  
    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');
  
    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  }
  
  export const getUniqueId = () => {
    const timestamp = Date.now().toString(16); // Convert current timestamp to hexadecimal
    const randomString = Math.random().toString(16).substr(2, 8); // Generate a random hexadecimal string
  
    // Combine timestamp and random string, and ensure it is 16 characters long
    const uniqueId = (timestamp + randomString).substr(0, 16);
  
    return uniqueId;
  }
  

  const indianNumber = Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    currencyDisplay: 'symbol',
    minimumFractionDigits: 2,
});

export const showNumber = (value) => {
    // Check if value is a valid number
    if (value === null || value === undefined || isNaN(value)) {
        return 'Invalid Amount'; // or return an empty string or any placeholder
    }
    
    // Format the number
    return indianNumber.format(Number(value)); // Ensure the value is a number
};




export const formatTime24To12 = (time) => {
  if (!time || typeof time !== 'string') {
      return "Invalid time"; // Handle the case where time is undefined or not a string
  }

  const [hours, minutes] = time.split(':').map(Number);

  // Validate hour and minute ranges
  if (
      isNaN(hours) || isNaN(minutes) ||
      hours < 0 || hours > 23 ||
      minutes < 0 || minutes > 59
  ) {
      return "Invalid time"; // Handle invalid time values
  }

  const ampm = hours < 12 ? 'Morning' : 'Evening';
  const hours12 = hours % 12 || 12; // Convert hour to 12-hour format
  return `${hours12}:${minutes.toString().padStart(2, '0')} ${ampm}`;
};

export const formatTimeFromDateString = (timeString) => {
  if (!timeString || typeof timeString !== 'string') {
      return "Invalid time"; // Handle invalid input
  }

  // Create a Date object from the time string
  const date = new Date(timeString);
  const hours = date.getUTCHours(); // Get hours in UTC
  const minutes = date.getUTCMinutes(); // Get minutes in UTC

  // Format as HH:MM for 24-hour time
  const time24 = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;

  // Use the formatTime24To12 function to convert it to 12-hour format
  return formatTime24To12(time24);
};