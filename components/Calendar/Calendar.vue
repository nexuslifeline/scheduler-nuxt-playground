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
    <div class="mt-2 grid grid-cols-7 bg-gray-200 text-sm">
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
import { defineEmits } from "vue";

import { months } from "@/utils/constants";
import { useCalendar } from "@/composables/useCalendar";
import type { IActiveDate } from "@/interfaces/ActiveDate";

const emit = defineEmits<{
  (event: "changeDate", date: IActiveDate): void;
}>();

const {
  selectedDate,
  year,
  month,
  firstDayIndex,
  numberOfDays,
  nextMonthVisibleDays,
  daysInPreviousMonth,
  next,
  previous,
  goToToday,
  isToday,
  selectDate
} = useCalendar();

watch(selectedDate, newDate => {
  if (newDate) {
    emit("changeDate", newDate);
  }
});
</script>
