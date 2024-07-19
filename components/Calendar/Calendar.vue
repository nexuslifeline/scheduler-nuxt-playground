<template>
  <div
    class="max-w-60 mt-10 text-center lg:col-start-8 lg:col-end-13 lg:row-start-1 lg:mt-9 xl:col-start-9"
  >
    <div class="flex items-center text-gray-900">
      <div class="flex-grow flex justify-start text-sm pl-2">
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
    <div class="grid grid-cols-7 text-xs leading-6 mt-2">
      <div>S</div>
      <div>M</div>
      <div>T</div>
      <div>W</div>
      <div>T</div>
      <div>F</div>
      <div>S</div>
    </div>
    <div
      class="mt-2 grid grid-cols-7 gap-px bg-gray-200 text-sm ring-1 ring-gray-200"
    >
      <CalendarDayItem
        v-for="(n, i) in firstDayIndex"
        :key="String(i)"
        :time="daysInPreviousMonth - firstDayIndex + n"
        isGrayed
      />
      <CalendarDayItem v-for="n in numberOfDays" :key="String(n)" :time="n" />
      <CalendarDayItem
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

defineProps<{ time?: string | number }>();

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

const date = ref(new Date());
const year = computed(() => date.value.getFullYear());
const month = computed(() => date.value.getMonth());
const firstDay = computed(() => new Date(year.value, month.value, 1));
const lastDay = computed(() => new Date(year.value, month.value + 1, 0));
const firstDayIndex = computed(() => firstDay.value.getDay());
const numberOfDays = computed(() => lastDay.value.getDate());

const nextMonthVisibleDays = computed(() => {
  const totalOccupied = numberOfDays.value + firstDayIndex.value;
  const requiredDays = totalOccupied > 35 ? 42 : 35;
  return requiredDays - totalOccupied;
});

const daysInPreviousMonth = computed(() => {
  const previousMonth = new Date(year.value, month.value, 0);
  return previousMonth.getDate();
});

const next = () => {
  const nextMonth = month.value + 1;
  if (nextMonth > 11) {
    date.value = new Date(year.value + 1, 0, 1); // Move to January of the next year
  } else {
    date.value = new Date(year.value, nextMonth, 1); // Move to the next month
  }
};

const previous = () => {
  const previousMonth = month.value - 1;
  if (previousMonth < 0) {
    date.value = new Date(year.value - 1, 11, 1); // Move to December of the previous year
  } else {
    date.value = new Date(year.value, previousMonth, 1); // Move to the previous month
  }
};

const goToToday = () => {
  date.value = new Date(); // Set the date to today
};
</script>
