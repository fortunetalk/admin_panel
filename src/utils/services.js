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