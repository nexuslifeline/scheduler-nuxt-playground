<template>
  <button
    type="button"
    class="bg-white p-5 hover:bg-gray-100 focus:z-10"
    :class="{ 'bg-blue-100': eventTitles.length }"
  >
    <div class="flex flex-col h-10 w-7">
      <time
        class="flex flex-grow h-7 w-7 items-center justify-center"
        :class="{
          'text-gray-400': isGrayed,
          'bg-blue-500 rounded-full text-white': isToday
        }"
      >
        {{ time }}
      </time>
      <div
        v-if="eventTitles.length"
        class="w-full text-xs text-blue-500 flex-grow"
      >
        <div v-for="(event, index) in eventTitles" :key="index">
          {{ event.title }}
        </div>
      </div>
    </div>
  </button>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = withDefaults(
  defineProps<{
    time?: string | number;
    isGrayed?: boolean;
    isToday?: boolean;
    events?: { year: number; month: number; day: number; title?: string }[];
  }>(),
  {
    time: "",
    isGrayed: false,
    isToday: false
  }
);

const eventTitles = computed(() => {
  return (
    props.events?.filter(event => {
      const today = new Date();

      today.setDate(Number(props.time));

      return (
        event.year === today.getFullYear() &&
        event.month === today.getMonth() + 1 &&
        event.day === today.getDate()
      );
    }) || []
  );
});
</script>
