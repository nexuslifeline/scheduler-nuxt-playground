<template>
  <div class="flex justify-center space-x-4 p-2">
    <button
      @click="selectView(0)"
      :class="buttonClass(0)"
      class="p-2 border rounded-md text-sm font-medium transition-colors duration-200"
    >
      Default View
    </button>
    <button
      @click="selectView(1)"
      :class="buttonClass(1)"
      class="p-2 border rounded-md text-sm font-medium transition-colors duration-200"
    >
      Week View
    </button>
    <button
      @click="selectView(2)"
      :class="buttonClass(2)"
      class="p-2 border rounded-md text-sm font-medium transition-colors duration-200"
    >
      Month View
    </button>
  </div>
</template>

<script setup lang="ts">
import { defineEmits, defineProps } from "vue";

const props = defineProps<{
  selectedIndex: number;
}>();

const emit = defineEmits<{
  (e: "viewSelected", index: number): void;
}>();

const buttonClass = (index: number) => {
  return props.selectedIndex === index
    ? "bg-blue-500 text-white border-blue-500"
    : "bg-white text-blue-500 border-blue-500 hover:bg-blue-700 hover:text-white";
};

const selectView = (index: number) => {
  emit("viewSelected", index);
};
</script>
