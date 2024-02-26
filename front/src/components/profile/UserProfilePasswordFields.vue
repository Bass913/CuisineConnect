<script setup lang="ts">
import { ref } from "vue";
import axiosInstance from "@/utils/axiosInstance";

const props = defineProps({
  userId: {
    type: String,
    required: true,
  },
});

const isEditing = ref(false);
const oldPassword = ref("");
const newPassword = ref("");
const confirmPassword = ref("");
const passwordError = ref("");
const confirmation = ref(false);

const toggleEditing = async () => {
  if (isEditing.value) {
    if (newPassword.value !== confirmPassword.value) {
      passwordError.value = "Les mots de passe ne correspondent pas.";
      return;
    }
    if (
      !newPassword.value.length ||
      !newPassword.value.length ||
      !confirmPassword.value.length
    ) {
      passwordError.value = "Veuillez remplir tous les champs.";
      return;
    }
    try {
      await axiosInstance.patch("/users/" + props.userId, {
        oldPassword: oldPassword.value,
        newPassword: newPassword.value,
      });
      isEditing.value = false;
      confirmation.value = true;
    } catch (error: any) {
      if (error.response.status === 401) {
        passwordError.value = "Le mot de passe actuel est incorrect.";
      }
    }
  } else {
    isEditing.value = true;
  }
};
</script>

<template>
  <div v-if="!isEditing" class="py-4 sm:py-5">
    <div v-if="confirmation" class="text-green-600 my-5">
      Le mot de passe a bien été modifié.
    </div>
    <span class="flex-shrink-0">
      <button
        type="button"
        class="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-600/60 focus:outline-none focus:ring-2 focus:ring-indigo-600/60 focus:ring-offset-2"
        @click="toggleEditing"
      >
        Modifier le mot de passe
      </button>
    </span>
  </div>
  <div v-if="isEditing">
    <small v-if="passwordError" class="text-red-500">{{ passwordError }}</small>
    <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-3 sm:pt-5">
      <dt class="text-sm font-medium text-gray-500">Ancien mot de passe</dt>
      <dd class="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
        <input
          type="password"
          class="flex-grow px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          v-model="oldPassword"
        />
      </dd>
    </div>

    <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-3">
      <dt class="text-sm font-medium text-gray-500">Nouveau mot de passe</dt>
      <dd class="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
        <input
          type="password"
          class="flex-grow px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          v-model="newPassword"
        />
      </dd>
    </div>

    <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-3">
      <dt class="text-sm font-medium text-gray-500">
        Confirmer nouveau mot de passe
      </dt>
      <dd class="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
        <input
          type="password"
          class="flex-grow px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          v-model="confirmPassword"
        />
      </dd>
    </div>

    <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-4">
      <span class="flex-shrink-0">
        <button
          type="button"
          class="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-600/60 focus:outline-none focus:ring-2 focus:ring-indigo-600/60 focus:ring-offset-2"
          @click="toggleEditing"
        >
          Enregistrer
        </button>
      </span>
    </div>
  </div>
</template>
