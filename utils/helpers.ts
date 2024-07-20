interface Event {
 year: number;
 month: number;
 day: number;
 title: string;
}

export const formatDate = (dateString: string) => {
 const dateObj = new Date(dateString);
 const year = dateObj.getFullYear();
 const month = String(dateObj.getMonth() + 1).padStart(2, '0');
 const day = String(dateObj.getDate()).padStart(2, '0');
 return `${year}-${month}-${day}`;
};

export const convertSchedulesToEvents = (schedules: Record<string, string>): Event[] => {
 return Object.entries(schedules).map(([key, title]) => {
  const [year, month, day] = key.split("-").map(Number);
  return { year, month, day, title };
 });
};
