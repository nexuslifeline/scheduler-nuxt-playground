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

interface IActiveDate {
  year: number;
  month: number;
  day: number;
}

const today = new Date();
const defaultDate: IActiveDate = {
  year: today.getFullYear(),
  month: today.getMonth(),
  day: today.getDate()
};

const selectedDate = ref<IActiveDate>(defaultDate);
const eventTitle = ref<string | null>(null);

const loadEvent = (date: IActiveDate): void => {
  const key: string = formatDate(`${date.year}-${date.month}-${date.day}`);
  const schedule = getSchedule(key);
  eventTitle.value = schedule.title;
};

const handleDateSelected = (date: IActiveDate): void => {
  selectedDate.value = date;
  loadEvent(date);
};

onMounted(() => {
  loadEvent(selectedDate.value);
});
</script>
