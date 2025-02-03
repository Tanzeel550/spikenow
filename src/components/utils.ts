// IT GIVES TIME LIKE THIS "January 2002,7:59 AM"
// THEREFORE, we can break up the time however we want
export const formatTime = (date: Date | string):string => {
  const date2 = new Date(date);
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];

  const month = monthNames[date2.getMonth()];
  const year = date2.getFullYear();
  const hours = date2.getHours();
  const minutes = date2.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = hours % 12 || 12;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  return `${month} ${year},${formattedHours}:${formattedMinutes} ${ampm}`;
};
