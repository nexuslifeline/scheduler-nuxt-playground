// Simulate an API call with a delay// apis.ts
export const saveSchedule = async (newEvent: { title: string; dateTime: string }): Promise<void> => {
 const existingSchedules = localStorage.getItem("schedules");
 const schedules = existingSchedules ? JSON.parse(existingSchedules) : {};
 const date = new Date(newEvent.dateTime);
 const formattedDate = {
  year: date.getFullYear(),
  month: date.getMonth() + 1,
  day: date.getDate()
 };
 schedules[`${formattedDate.year}-${formattedDate.month}-${formattedDate.day}`] = newEvent.title;
 localStorage.setItem("schedules", JSON.stringify(schedules));
};
