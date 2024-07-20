<template>
  <button
    type="button"
    class="bg-white py-1.5 hover:bg-gray-100 focus:z-10"
    :disabled="isGrayed"
  >
    <time
      class="mx-auto flex h-7 w-7 items-center justify-center"
      :class="{
        'text-gray-400': isGrayed,
        'bg-blue-500 rounded-full text-white': isToday,
        'border-2 border-blue-500 bg-white rounded-full !text-blue-500':
          isActive
      }"
    >
      {{ time }}
    </time>
  </button>
</template>

<script setup lang="ts">
import { withDefaults, defineProps } from "vue";

const props = withDefaults(
  defineProps<{
    time?: string | number;
    isGrayed?: boolean;
    isToday?: boolean;
    isActive?: boolean;
  }>(),
  {
    time: "",
    isGrayed: false,
    isToday: false,
    isActive: false
  }
);
</script>
