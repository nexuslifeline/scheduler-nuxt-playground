import { ref, computed } from "vue";
import type { IActiveDate } from "~/interfaces/IActiveDate";

export function useCalendar() {
 const selectedDate = ref<IActiveDate | null>(null);
 const date = ref<Date>(new Date());

 const year = computed<number>(() => date.value.getFullYear());
 const month = computed<number>(() => date.value.getMonth());
 const firstDay = computed<Date>(() => new Date(year.value, month.value, 1));
 const lastDay = computed<Date>(() => new Date(year.value, month.value + 1, 0));
 const firstDayIndex = computed<number>(() => firstDay.value.getDay());
 const numberOfDays = computed<number>(() => lastDay.value.getDate());
 const nextMonthVisibleDays = computed<number>(() => 6 - lastDay.value.getDay());

 const daysInPreviousMonth = computed<number>(() => {
  const previousMonth = new Date(year.value, month.value, 0);
  return previousMonth.getDate();
 });

 const next = (): void => {
  const nextMonth = month.value + 1;
  if (nextMonth > 11) {
   date.value = new Date(year.value + 1, 0, 1); // Move to January of the next year
  } else {
   date.value = new Date(year.value, nextMonth, 1); // Move to the next month
  }
 };

 const previous = (): void => {
  const previousMonth = month.value - 1;
  if (previousMonth < 0) {
   date.value = new Date(year.value - 1, 11, 1); // Move to December of the previous year
  } else {
   date.value = new Date(year.value, previousMonth, 1); // Move to the previous month
  }
 };

 const goToToday = (): void => {
  date.value = new Date(); // Set the date to today
 };

 const isToday = (day: number): boolean => {
  const today = new Date();
  return (
   day === today.getDate() &&
   month.value === today.getMonth() &&
   year.value === today.getFullYear()
  );
 };

 const selectDate = (day: number): void => {
  const newDate: IActiveDate = {
   day,
   year: year.value,
   month: month.value + 1
  };
  selectedDate.value = newDate;
 };

 return {
  selectedDate,
  date,
  year,
  month,
  firstDay,
  lastDay,
  firstDayIndex,
  numberOfDays,
  nextMonthVisibleDays,
  daysInPreviousMonth,
  next,
  previous,
  goToToday,
  isToday,
  selectDate
 };
}
