<template>
  <div class="w-100 text-center text-center p-2">
    <div class="flex items-center text-gray-900">
      <div class="flex-grow flex justify-start text-sm pl-2 font-bold">
        {{ months[month] }} {{ year }}
      </div>
      <div class="flex border border-gray-300 rounded-md">
        <button
          @click="previous"
          type="button"
          class="flex flex-none items-center justify-center p-1.5 hover:text-gray-500"
        >
          <CalendarPrevIcon />
        </button>
        <button
          @click="goToToday"
          class="flex-auto text-sm hover:text-gray-500"
        >
          Today
        </button>
        <button
          @click="next"
          type="button"
          class="flex flex-none items-center justify-center p-1.5 hover:text-gray-500"
        >
          <CalendarNextIcon />
        </button>
      </div>
    </div>
    <div
      class="grid grid-cols-7 text-xs leading-6 mt-2 font-bold ring-1 ring-gray-200 gap-px"
    >
      <div class="p-3 ring-1 ring-gray-200">Sun</div>
      <div class="p-3 ring-1 ring-gray-200">Mon</div>
      <div class="p-3 ring-1 ring-gray-200">Tue</div>
      <div class="p-3 ring-1 ring-gray-200">Wed</div>
      <div class="p-3 ring-1 ring-gray-200">Thu</div>
      <div class="p-3 ring-1 ring-gray-200">Fri</div>
      <div class="p-3 ring-1 ring-gray-200">Sat</div>
    </div>
    <div
      class="grid grid-cols-7 gap-px bg-gray-200 text-sm ring-1 ring-gray-200"
    >
      <MonthViewDayItem
        v-for="(n, i) in firstDayIndex"
        :key="String(i)"
        :time="daysInPreviousMonth - firstDayIndex + n"
        isGrayed
      />
      <MonthViewDayItem
        v-for="n in numberOfDays"
        :key="String(n)"
        :time="n"
        :isToday="isToday(n)"
      />
      <MonthViewDayItem
        v-for="n in nextMonthVisibleDays"
        :key="String(n)"
        :time="n"
        isGrayed
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, computed } from "vue";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

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
</script>
