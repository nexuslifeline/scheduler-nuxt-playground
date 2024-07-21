<template>
  <div
    v-if="isShown"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
  >
    <div class="bg-white rounded-lg shadow-lg w-full max-w-md p-4">
      <!-- Modal Header -->
      <div
        class="flex items-center justify-between border-b border-gray-200 pb-2 mb-4"
      >
        <h3 class="text-lg font-semibold">{{ title }}</h3>
        <button @click="close" class="text-gray-500 hover:text-gray-700">
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
      </div>
      <!-- Modal Body -->
      <div class="space-y-4">
        <slot></slot>
      </div>
      <!-- Modal Footer -->
      <div class="flex justify-end mt-4">
        <button
          @click="save"
          class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 mr-2"
        >
          Save
        </button>
        <button
          @click="close"
          class="bg-white border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-500 hover:text-white hover:border-gray-500"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineEmits, defineProps } from "vue";

const props = defineProps<{
  title: string;
  isShown: boolean;
}>();

const emit = defineEmits<{
  (e: "update:isShown", value: boolean): void;
  (e: "save"): void;
}>();

const close = () => {
  emit("update:isShown", false);
};

const save = () => {
  emit("save");
  close();
};
</script>
