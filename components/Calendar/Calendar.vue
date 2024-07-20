<template>
  <div class="w-80 mt-10 text-center">
    <CalendarNavigation
      :months="months"
      :month="month"
      :year="year"
      @previous="previous"
      @next="next"
      @goToToday="goToToday"
    />
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
      <CalendarDayItem
        v-for="n in numberOfDays"
        :key="String(n)"
        :time="n"
        :isToday="isToday(n)"
        :isActive="
          n === selectedDate?.day &&
          month === selectedDate.month &&
          year === selectedDate.year
        "
        @click="selectDate(n)"
      />
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
import { ref, computed, defineEmits } from "vue";
import { months } from "@/utils/constants";

type ActiveDate = {
  year: number;
  month: number;
  day: number;
};

const emit = defineEmits<{
  (event: "changeDate", date: ActiveDate): void;
}>();

const selectedDate = ref<ActiveDate | null>(null);
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
  const newDate: ActiveDate = {
    day,
    year: year.value,
    month: month.value
  };
  selectedDate.value = newDate;
  emit("changeDate", newDate); // Emit the event with the selected date
};
</script>
