<script setup lang="ts">
import { ref } from "vue";
import axiosInstance from "@/utils/axiosInstance";

const props = defineProps({
  model: {
    type: Object,
    required: true,
  },
  modelValue: {
    type: String || null,
    required: false,
  },
  userId: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["update:modelValue"]);

const isEditing = ref(false);
const newValue = ref(props.modelValue);

const toggleEditing = () => {
  if (isEditing.value) {
    axiosInstance
      .patch("/users/" + props.userId, {
        [props.model.name]: newValue.value,
      })
      .then(() => {
        isEditing.value = false;
        localStorage.setItem(
          "user",
          JSON.stringify({
            ...JSON.parse(localStorage.getItem("user") || "{}"),
            [props.model.name]: newValue.value,
          })
        );
      });
  } else {
    isEditing.value = true;
  }
};

const updateValue = (event: any) => {
  newValue.value = event.target.value;
  emit("update:modelValue", newValue.value);
};

const formatDate = (date: string | undefined) => {
  if (!date) return "";
  const dateObject = new Date(date);
  return dateObject.toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const formatDateForInput = (dateString: string | undefined) => {
  if (isBirthdate && dateString) {
    const date = new Date(dateString);
    if (!isNaN(date.getTime())) {
      const year = date.getUTCFullYear();
      const month = String(date.getUTCMonth() + 1).padStart(2, "0");
      const day = String(date.getUTCDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    }
  }
  return dateString;
};

const isBirthdate = props.model.name === "birthdate";
</script>

<template>
  <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
    <dt class="text-sm font-medium text-gray-500">{{ props.model.label }}</dt>
    <dd class="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
      <span v-if="!isEditing" class="flex-grow">{{
        isBirthdate ? formatDate(props.modelValue) : props.modelValue
      }}</span>
      <input
        v-else
        :type="isBirthdate ? 'date' : 'text'"
        class="flex-grow px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        :value="formatDateForInput(props.modelValue)"
        @input="updateValue($event)"
      />
      <span class="ml-4 flex-shrink-0">
        <button
          type="button"
          class="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-600/60 focus:outline-none focus:ring-2 focus:ring-indigo-600/60 focus:ring-offset-2"
          @click="toggleEditing"
        >
          {{
            isEditing
              ? "Enregistrer"
              : props.modelValue
              ? "Modifier"
              : "Ajouter"
          }}
        </button>
      </span>
    </dd>
  </div>
</template>
