<template>
  <div class="w-full h-screen text-center flex flex-col items-start p-2">
    <ViewSelector
      :selectedIndex="selectedIndex"
      @viewSelected="handleViewSelected"
    />
    <div class="flex-grow w-full">
      <Calendar v-show="selectedIndex === 0" />
      <WeekView v-show="selectedIndex === 1" />
      <MonthView v-show="selectedIndex === 2" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const selectedIndex = ref(0);

const handleViewSelected = (index: number) => {
  selectedIndex.value = index;
};
</script>
