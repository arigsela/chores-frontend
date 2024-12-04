// Date utility functions
export const getWeekOptions = () => {
    const weeks = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time part
    
    // Get 4 weeks back and 4 weeks forward
    for (let i = -4; i <= 4; i++) {
      const date = new Date(today);
      // Get Monday of each week
      const day = date.getDay() || 7; // Get day of week (0-6), convert Sunday from 0 to 7
      date.setDate(date.getDate() - day + 1); // Adjust to Monday
      date.setDate(date.getDate() + (i * 7)); // Move weeks
      weeks.push({
        value: date.toISOString().split('T')[0],
        label: `Week of ${date.toLocaleDateString()}`
      });
    }
    return weeks;
  };
  
  export const getCurrentWeekStart = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time part
    const day = today.getDay() || 7; // Get day of week (0-6), convert Sunday from 0 to 7
    const monday = new Date(today);
    monday.setDate(today.getDate() - day + 1); // Adjust to Monday
    return monday.toISOString().split('T')[0];
  };