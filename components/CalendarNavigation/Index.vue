<template>
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
      <button @click="goToToday" class="flex-auto text-sm hover:text-gray-500">
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
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
import { months } from "@/utils/constants";

const props = defineProps<{
  month: number;
  year: number;
}>();

const emit = defineEmits<{
  (e: "previous"): void;
  (e: "next"): void;
  (e: "goToToday"): void;
}>();

const previous = () => emit("previous");
const next = () => emit("next");
const goToToday = () => emit("goToToday");
</script>
