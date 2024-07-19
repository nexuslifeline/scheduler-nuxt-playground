<template>
  <button type="button" class="bg-white p-5 hover:bg-gray-100 focus:z-10">
    <time
      class="mx-auto flex h-7 w-7 items-center justify-center"
      :class="{
        'text-gray-400': isGrayed,
        'bg-blue-500 rounded-full text-white': isToday
      }"
    >
      {{ time }}
    </time>
  </button>
</template>
<script setup lang="ts">
withDefaults(
  defineProps<{
    time?: string | number;
    isGrayed?: boolean;
    isToday?: boolean;
  }>(),
  {
    time: "",
    isGrayed: false,
    isToday: false
  }
);
</script>
