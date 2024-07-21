interface Schedule {
 date: string;
 title: string;
}

// Simulate an API call with a delay// apis.ts
export const saveSchedule = (newEvent: { title: string; dateTime: string }): void => {
 const schedules = getSchedules() || {};
 const date = new Date(newEvent.dateTime);

 const d = {
  year: date.getFullYear(),
  month: date.getMonth() + 1,
  day: date.getDate()
 };
 const key = formatDate(`${d.year}-${d.month}-${d.day}`);
 schedules[key] = newEvent.title;

 localStorage.setItem("schedules", JSON.stringify(schedules));
};

export const removeSchedule = (dateTime: string): void => {
 const schedules = getSchedules();
 const date = new Date(dateTime);

 const year = date.getFullYear();
 const month = date.getMonth() + 1;
 const day = date.getDate();
 const formattedDate = formatDate(`${year}-${month}-${day}`);
 const altKey = `${year}-${month}-${day}`;

 if (schedules[formattedDate]) {
  delete schedules[formattedDate];
 } else if (schedules[altKey]) {
  delete schedules[altKey];
 }

 localStorage.setItem("schedules", JSON.stringify(schedules));
};


export const getSchedules = () => {
 const rawSchedule = localStorage.getItem("schedules");

 if (!rawSchedule) {
  return {};
 }

 const schedules = JSON.parse(rawSchedule);
 return schedules;
};


export const getSchedule = (key: string): Schedule => {
 const schedules = getSchedules();
 const value = schedules[key] || "";
 return { date: key, title: value };
};

