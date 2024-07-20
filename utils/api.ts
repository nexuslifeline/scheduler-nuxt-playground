import { formatDate } from '@/utils/helpers'

// Simulate an API call with a delay
export const saveSchedule = async (newSchedule: { title: string; dateTime: string }) => {
 const existingSchedules = localStorage.getItem("schedules");
 const schedules = existingSchedules ? JSON.parse(existingSchedules) : {};

 const formattedDate = formatDate(newSchedule.dateTime);
 schedules[formattedDate] = newSchedule.title;

 await new Promise((resolve) => setTimeout(resolve, 1000));

 localStorage.setItem('schedules', JSON.stringify(schedules));

 console.log("Schedule saved:", { [formattedDate]: newSchedule.title });
};