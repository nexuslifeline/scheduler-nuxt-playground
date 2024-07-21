<template>
  <div class="w-100 text-center p-2">
    <CalendarNavigation
      :months="months"
      :month="month"
      :year="year"
      @previous="previous"
      @next="next"
      @goToToday="goToToday"
    />
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
        :events="props.events"
      />
      <MonthViewDayItem
        v-for="n in numberOfDays"
        :key="String(n)"
        :time="n"
        :isToday="isToday(n)"
        :events="props.events"
        @viewSelected="() => selectDate(n)"
      />
      <MonthViewDayItem
        v-for="n in nextMonthVisibleDays"
        :key="String(n)"
        :time="n"
        isGrayed
        :events="props.events"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

import { months } from "@/utils/constants";
import { useCalendar } from "@/composables/useCalendar";
import type { IActiveDate } from "@/interfaces/ActiveDate";
import type { IEvent } from "@/interfaces/Event";

const props = defineProps<{
  events: IEvent[];
}>();

const emit = defineEmits<{
  (event: "viewSelected", date: IActiveDate): void;
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
    emit("viewSelected", newDate);
  }
});
</script>
