<template>
  <div class="flex p-3 w-full">
    <div class="flex-grow flex items-center justify-center text-md">
      <p v-if="eventTitle">
        {{ eventTitle }}
      </p>
      <p v-else>No events found</p>
    </div>
    <Calendar @changeDate="handleDateSelected" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

interface Date {
  year: number;
  month: number;
  day: number;
}

const today = new Date();
const defaultDate: Date = {
  year: today.getFullYear(),
  month: today.getMonth(),
  day: today.getDate()
};

const selectedDate = ref<Date>(defaultDate);
const eventTitle = ref<string | null>(null);

const loadEvent = (date: Date): void => {
  const existingSchedules = localStorage.getItem("schedules");
  if (existingSchedules) {
    const schedules: Record<string, string> = JSON.parse(existingSchedules);
    const key = `${date.year}-${date.month + 1}-${date.day}`;
    eventTitle.value = schedules[key] || null;
  }
};

const handleDateSelected = (date: Date): void => {
  selectedDate.value = date;
  loadEvent(date);
};

onMounted(() => {
  loadEvent(selectedDate.value);
});
</script>
