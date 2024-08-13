
export const dateToday = () => {
  const day = new Date();

  const year = day.getFullYear();
  const month = String(day.getMonth() + 1).padStart(2, '0');
  const dateOfMonth = String(day.getDate()).padStart(2, '0');

  return `${year}-${month}-${dateOfMonth}`;
};

export const getTimeFromDate = date => {
  const time = date.slice(11, 16); 
  return time;
};

export const getShowDate = date => {
  const dateChoosing = new Date(date);

  const day = dateChoosing.getDate();
  const month = dateChoosing.toLocaleDateString('en-US', { month: 'long' });

  const formattedDate = `${day}, ${month}`;

  return formattedDate;
};
