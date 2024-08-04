export const isToday = (date) => {
  const first = new Date(Number(date));
  const second = new Date();
  return (
    first.getFullYear() === second.getFullYear() &&
    first.getMonth() === second.getMonth() &&
    first.getDate() === second.getDate()
  );
};
