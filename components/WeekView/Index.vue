<template>
  <div class="w-full h-screen text-center flex flex-col p-2">
    <CalendarNavigation
      :months="months"
      :month="month"
      :year="year"
      @previous="previous"
      @next="next"
      @goToToday="goToToday"
    />
    <div class="grid grid-cols-7 mt-2 h-100 flex-grow">
      <div
        v-for="(day, i) in weekDays"
        :key="i"
        class="text-center ring-1 ring-gray-200 bg-white gap-px"
      >
        <div class="flex flex-col">
          <div
            class="text-sm text-gray-600 ring-1 ring-gray-200 h-10 flex items-center justify-center"
          >
            {{ day.name }} &nbsp;
            <span class="text-sm font-semibold">{{ day.date.getDate() }}</span>
          </div>
          <div class="p-4 flex-grow"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { months } from "@/utils/constants";

interface Day {
  date: Date;
  name: string;
}

const date = ref(new Date());

const year = computed<number>(() => date.value.getFullYear());
const month = computed<number>(() => date.value.getMonth());

const weekDays = computed<Day[]>(() => {
  const startOfWeek = new Date(date.value);
  startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
  const days: Day[] = [];

  for (let i = 0; i < 7; i++) {
    const currentDay = new Date(startOfWeek);
    currentDay.setDate(startOfWeek.getDate() + i);
    days.push({
      date: currentDay,
      name: currentDay.toLocaleDateString("en-US", { weekday: "short" })
    });
  }

  return days;
});

const previous = (): void => {
  const futureDate = new Date(date.value);
  futureDate.setDate(date.value.getDate() - 7);
  date.value = futureDate;
};

const next = (): void => {
  const futureDate = new Date(date.value);
  futureDate.setDate(date.value.getDate() + 7);
  date.value = futureDate;
};

const goToToday = (): void => {
  date.value = new Date();
};
</script>
