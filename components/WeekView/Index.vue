<template>
  <div class="w-full h-full text-center flex flex-col p-2">
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
        :class="[
          'text-center ring-1 ring-gray-200 gap-px',
          hasEvents(day.date) ? 'bg-blue-200 cursor-pointer' : 'bg-white'
        ]"
        @click="() => viewDate(day.date.getDate())"
      >
        <div class="flex flex-col">
          <div
            class="text-sm text-gray-600 ring-1 ring-gray-200 h-10 flex items-center justify-center"
          >
            {{ day.name }} &nbsp;
            <span class="text-sm font-semibold">{{ day.date.getDate() }}</span>
          </div>
          <div class="p-4 flex-grow">
            <div v-if="eventsForDay(day.date).length" class="p-2">
              <div
                v-for="(event, i) in eventsForDay(day.date)"
                :key="i"
                class="text-xs text-blue-500"
              >
                {{ event.title }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

import { months } from "@/utils/constants";
import type { IActiveDate } from "@/interfaces/ActiveDate";
import type { IWeekDay } from "@/interfaces/WeekDay";
import type { IEvent } from "@/interfaces/Event";

const props = defineProps<{
  events: IEvent[];
}>();

const emit = defineEmits<{
  (event: "viewSelected", date: IActiveDate): void;
}>();

const date = ref(new Date());

const year = computed<number>(() => date.value.getFullYear());
const month = computed<number>(() => date.value.getMonth());

const weekDays = computed<IWeekDay[]>(() => {
  const startOfWeek = new Date(date.value);
  startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
  const days: IWeekDay[] = [];

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

const eventsForDay = (date: Date) => {
  return props.events.filter(event => {
    return (
      event.year === date.getFullYear() &&
      event.month === date.getMonth() + 1 &&
      event.day === date.getDate()
    );
  });
};

const hasEvents = (date: Date) => {
  return eventsForDay(date).length > 0;
};

const viewDate = (day: number) => {
  const date = { day, month: month.value + 1, year: year.value };
  emit("viewSelected", date);
};
</script>
