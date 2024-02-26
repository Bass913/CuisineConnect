<script setup lang="ts">
import { reactive } from "vue";
import UserProfileField from "@/components/profile/UserProfileField.vue";
import UserProfilePasswordFields from "@/components/profile/UserProfilePasswordFields.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";

const state: {
  user: any;
  tabs: any[];
  currentModifications: any;
} = reactive({
  user: null,
  tabs: [
    { name: "Compte", href: "#", current: true },
    { name: "Mot de passe", href: "#", current: false },
    { name: "Historique", href: "#", current: false },
  ],
  currentModifications: {
    username: false,
    email: false,
  },
});

const fields = {
  username: { name: "username", label: "Pseudo" },
  email: { name: "email", label: "Email" },
};

const changeTab = (tab: any) => {
  state.tabs.forEach((tab) => (tab.current = false));
  tab.current = true;
};

state.user = JSON.parse(localStorage.getItem("user") || "{}");
</script>

<template>
  <LayoutAuthenticated>
    <div v-if="state.user" class="flex-1 max-w-7xl mx-auto my-8">
      <div class="relative px-0 sm:px-6">
        <div class="pb-16 pt-4">
          <div class="px-4 sm:px-6 lg:px-0">
            <h1 class="text-3xl font-bold tracking-tight text-gray-900">
              Paramètres
            </h1>
          </div>
          <div class="px-4 sm:px-6 lg:px-0">
            <div class="py-6">
              <!-- Account / Password / Notifications menu -->
              <div class="lg:hidden">
                <label for="selected-tab" class="sr-only">Select a tab</label>
                <select
                  id="selected-tab"
                  name="selected-tab"
                  class="mt-1 block w-full rounded-md border-0 py-2 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                  @change="
                    changeTab(
                      state.tabs.find(
                        (tab) =>
                          tab.name ===
                          ($event.target as HTMLSelectElement).value
                      )
                    )
                  "
                >
                  <option
                    v-for="tab in state.tabs"
                    :key="tab.name"
                    :value="tab.name"
                    :selected="tab.current"
                  >
                    {{ tab.name }}
                  </option>
                </select>
              </div>
              <div class="hidden lg:block">
                <div class="border-b border-gray-200">
                  <nav class="-mb-px flex space-x-8">
                    <a
                      v-for="tab in state.tabs"
                      :key="tab.name"
                      :href="tab.href"
                      @click="changeTab(tab)"
                      :class="[
                        tab.current
                          ? 'border-indigo-600 text-indigo-600'
                          : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                        'whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium',
                      ]"
                      >{{ tab.name }}</a
                    >
                  </nav>
                </div>
              </div>

              <!-- Account page -->
              <div v-if="state.tabs[0].current">
                <!-- Profile -->
                <div class="mt-10 divide-y divide-gray-200">
                  <div class="space-y-1">
                    <h3 class="text-lg font-medium leading-6 text-gray-900">
                      Profil
                    </h3>
                    <p class="max-w-2xl text-sm text-gray-500">
                      Vous pouvez modifier votre profil à tout moment depuis cette page.
                    </p>
                  </div>
                  <div class="mt-6">
                    <dl class="divide-y divide-gray-200">
                      <UserProfileField
                        :userId="state.user._id"
                        :model="fields.username"
                        v-model="state.user.username"
                      />
                    </dl>
                  </div>
                  <div>
                    <dl class="divide-y divide-gray-200">
                      <UserProfileField
                        :userId="state.user._id"
                        :model="fields.email"
                        v-model="state.user.email"
                      />
                    </dl>
                  </div>
                </div>
              </div>

              <!-- Password page -->
              <div v-if="state.tabs[1].current">
                <!-- Profile -->
                <div class="mt-10 divide-y divide-gray-200">
                  <div class="space-y-1">
                    <h3 class="text-lg font-medium leading-6 text-gray-900">
                      Mot de passe
                    </h3>
                    <p class="max-w-2xl text-sm text-gray-500">
                      <!-- Votre mot de passe doit contenir au moins 12 caractères dont une majuscule, une
                      minuscule, un chiffre et un caractère spécial. -->
                      Vous pouvez modifier votre mot de passe à tout moment
                      depuis cette page.
                    </p>
                  </div>
                  <div class="mt-6">
                    <dl class="divide-y divide-gray-200">
                      <UserProfilePasswordFields :userId="state.user._id" />
                    </dl>
                  </div>
                </div>
              </div>

              <!-- History page -->
              <div v-if="state.tabs[2].current">
                <div class="mt-10">
                  <div class="space-y-1">
                    <h3 class="text-lg font-medium leading-6 text-gray-900">
                      Historique
                    </h3>
                    <p class="max-w-2xl text-sm text-gray-500">
                      Retrouvez ici l'historique de vos commandes.
                    </p>
                  </div>
                  <!-- <div class="mt-6">
                  <HistorySection />
                </div> -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </LayoutAuthenticated>
</template>
