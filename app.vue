<template>
  <div class="w-full h-screen text-center flex flex-col items-start p-4">
    <h3 class="p-2 mb-5">My Calendar</h3>
    <div class="flex w-full">
      <ViewSelector
        :selectedIndex="selectedIndex"
        @viewSelected="handleViewSelected"
      />
      <div class="space-x-4 p-2 ml-auto">
        <button
          @click="openModal"
          class="space-x-4 p-2 rounded-md text-sm font-medium bg-blue-500 text-white hover:bg-blue-700"
        >
          + New Schedule
        </button>
      </div>
    </div>
    <div class="flex-grow w-full">
      <DefaultView v-show="selectedIndex === 0" />
      <WeekView
        v-show="selectedIndex === 1"
        :events="eventsList"
        @viewSelected="viewSelected"
      />
      <MonthView
        v-show="selectedIndex === 2"
        :events="eventsList"
        @viewSelected="viewSelected"
      />
    </div>
    <Modal
      v-if="showModal"
      title="Create New Schedule"
      :isShown="showModal"
      @update:isShown="showModal = $event"
      @save="handleSave"
    >
      <div>
        <label
          for="modal-title"
          class="block text-sm font-medium text-gray-700 text-left"
        >
          Name
        </label>
        <input
          id="modal-title"
          v-model="title"
          type="text"
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>
      <div>
        <label
          for="modal-date"
          class="block text-sm font-medium text-gray-700 text-left"
        >
          Date
        </label>
        <input
          id="modal-date"
          v-model="dateTime"
          type="date"
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { saveSchedule } from "@/utils/api";
import { convertSchedulesToEvents } from "@/utils/helpers";

type ActiveDate = {
  year: number;
  month: number;
  day: number;
};

interface Schedule {
  date: string;
  title: string;
}

const selectedIndex = ref<number>(0);
const showModal = ref<boolean>(false);
const title = ref<string>("");
const dateTime = ref<string>(new Date().toISOString().split("T")[0]);

const oldDateTime = ref<string>("");

const eventsList = ref<
  { year: number; month: number; day: number; title: string }[]
>([]);

// Load initial events from localStorage
const loadInitialEvents = () => {
  const existingSchedules = localStorage.getItem("schedules");
  if (existingSchedules) {
    const schedules = JSON.parse(existingSchedules);
    eventsList.value = convertSchedulesToEvents(schedules);
  }
};

onMounted(() => {
  loadInitialEvents();
});

const handleViewSelected = (index: number): void => {
  selectedIndex.value = index;
};

const openModal = (): void => {
  title.value = "";
  dateTime.value = new Date().toISOString().split("T")[0];
  showModal.value = true;
};

const handleSave = (): void => {
  if (dateTime.value && title.value) {
    // Save the new schedule and get the updated list of events
    try {
      saveSchedule({
        title: title.value,
        dateTime: dateTime.value
      });

      if (oldDateTime.value !== dateTime.value) {
        removeSchedule(oldDateTime.value);
      }
      loadInitialEvents();
    } catch (err) {
      console.error(err);
    } finally {
      oldDateTime.value;
      showModal.value = false;
    }
  }
};

const viewSelected = (date: ActiveDate): void => {
  const strDate = formatDate(`${date.month}-${date.day}-${date.year}`);
  const schedule: Schedule = getSchedule(strDate);

  if (Object.keys(schedule || {}).length) {
    title.value = schedule.title;
    dateTime.value = strDate;
    oldDateTime.value = strDate;
    showModal.value = true;
  }
};
</script>
