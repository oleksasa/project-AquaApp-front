//Функція переведення дати в формат "YYYY-MM-DD"
export const dateToday = () => {
  const day = new Date();

  const year = day.getFullYear();
  const month = String(day.getMonth() + 1).padStart(2, '0');
  const dateOfMonth = String(day.getDate()).padStart(2, '0');

  return `${year}-${month}-${dateOfMonth}`;
};
//Функція витягування часу з дати '2024-08-10T10:12:22Z' в форматі '10:12'
export const getTimeFromDate = date => {
  const time = date.slice(11, 16); // Витягує '10:12'
  return time;
};
