<script setup lang="ts">
import { computed, ref } from "vue";
import {
  Dialog,
  DialogPanel,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import {
  Bars3Icon,
  ChatBubbleLeftRightIcon,
  HomeIcon,
  PlayIcon,
  UserIcon,
  XMarkIcon,
  ArrowRightStartOnRectangleIcon,
} from "@heroicons/vue/24/outline";
import { useRouter } from "vue-router";

const router = useRouter();
const user = JSON.parse(localStorage.getItem("user") || "{}");
const navigation = [
  {
    name: "Accueil",
    href: "/",
    icon: HomeIcon,
    current: router.currentRoute.value.path === "/",
  },
  {
    name: "Morpion",
    href: "/tic-tac-toe",
    icon: PlayIcon,
    current: router.currentRoute.value.path === "/tic-tac-toe",
  },
  {
    name: "Chat",
    href: "/chat",
    icon: ChatBubbleLeftRightIcon,
    current: router.currentRoute.value.path === "/chat",
  },
];

const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "/login";
};

const sidebarOpen = ref(false);
</script>

<template>
  <div>
    <!-- Mobile menu, show/hide based on menu open state. -->
    <TransitionRoot as="template" :show="sidebarOpen">
      <Dialog
        as="div"
        class="relative z-50 lg:hidden"
        @close="sidebarOpen = false"
      >
        <TransitionChild
          as="template"
          enter="transition-opacity ease-linear duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-primary/80" />
        </TransitionChild>

        <div class="fixed inset-0 flex">
          <TransitionChild
            as="template"
            enter="transition ease-in-out duration-300 transform"
            enter-from="-translate-x-full"
            enter-to="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leave-from="translate-x-0"
            leave-to="-translate-x-full"
          >
            <DialogPanel class="relative mr-16 flex w-full max-w-xs flex-1">
              <TransitionChild
                as="template"
                enter="ease-in-out duration-300"
                enter-from="opacity-0"
                enter-to="opacity-100"
                leave="ease-in-out duration-300"
                leave-from="opacity-100"
                leave-to="opacity-0"
              >
                <div
                  class="absolute left-full top-0 flex w-16 justify-center pt-5"
                >
                  <button
                    type="button"
                    class="-m-2.5 p-2.5"
                    @click="sidebarOpen = false"
                  >
                    <span class="sr-only">Close sidebar</span>
                    <XMarkIcon class="h-6 w-6 text-white" aria-hidden="true" />
                  </button>
                </div>
              </TransitionChild>

              <!-- Sidebar component, swap this element with another sidebar if you like -->
              <div
                class="flex grow flex-col gap-y-5 overflow-y-auto bg-primary px-6 pb-2 ring-1 ring-white/10"
              >
                <RouterLink to="/" class="flex h-16 shrink-0 items-center mt-4">
                  <!-- <img
                    class="h-8 w-auto"
                    src="/images/sneakpeak_logo_white.png"
                    alt="Sneak Peak"
                  /> -->
                </RouterLink>
                <nav class="flex flex-1 flex-col">
                  <ul role="list" class="flex flex-1 flex-col gap-y-7">
                    <li>
                      <ul role="list" class="-mx-2 space-y-1">
                        <li v-for="item in navigation" :key="item.name">
                          <a
                            :href="item.href"
                            :class="[
                              item.current
                                ? 'bg-primary-light text-white'
                                : 'text-secondary-light hover:text-white hover:bg-primary-light',
                              'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold',
                            ]"
                          >
                            <component
                              :is="item.icon"
                              class="h-6 w-6 shrink-0"
                              aria-hidden="true"
                            />
                            {{ item.name }}
                          </a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </nav>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </TransitionRoot>

    <!-- Static sidebar for desktop -->
    <div
      class="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col bg-indigo-50/30"
    >
      <div class="flex grow flex-col gap-y-5 overflow-y-auto px-6">
        <RouterLink to="/" class="flex h-16 shrink-0 items-center mt-5">
          <img
            class="h-8 w-auto ml-3"
            src="/tic-tac-toe.png"
            alt="Tic Tac Toe"
          />
        </RouterLink>
        <nav class="flex flex-1 flex-col">
          <ul role="list" class="flex flex-1 flex-col gap-y-7">
            <li>
              <ul role="list" class="-mx-2 space-y-1">
                <li v-for="item in navigation" :key="item.name">
                  <a
                    :href="item.href"
                    :class="[
                      item.current ? 'text-indigo-500' : 'hover:bg-indigo-100',
                      'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold',
                    ]"
                  >
                    <component
                      :is="item.icon"
                      class="h-6 w-6 shrink-0"
                      aria-hidden="true"
                    />
                    {{ item.name }}
                  </a>
                </li>
              </ul>
            </li>
            <li class="mt-auto -mx-2">
              <a
                href="/profile"
                :class="[
                  router.currentRoute.value.path === '/profile'
                    ? 'text-indigo-500'
                    : 'hover:bg-indigo-100',
                  'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold',
                ]"
              >
                <UserIcon class="h-6 w-6 shrink-0" aria-hidden="true" />
                {{ user.username }}
              </a>
              <a
                type="button"
                @click="logout"
                class="mb-5 cursor-pointer hover:bg-indigo-100 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
              >
                <ArrowRightStartOnRectangleIcon
                  class="h-6 w-6 shrink-0"
                  aria-hidden="true"
                />
                Déconnexion
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>

    <div
      class="sticky top-0 z-40 flex items-center gap-x-6 px-4 py-4 shadow-sm sm:px-6 lg:hidden"
    >
      <button
        type="button"
        class="-m-2.5 p-2.5 lg:hidden"
        @click="sidebarOpen = true"
      >
        <span class="sr-only">Ouvrir la barre</span>
        <Bars3Icon class="h-6 w-6" aria-hidden="true" />
      </button>
      <!-- <div class="flex-1 text-sm font-semibold leading-6 text-white">
        {{
          navigation.find(
            (item) => item.href === router.currentRoute.value.path
          )?.name
        }}
      </div> -->
      <a href="/profile">
        <span class="sr-only">Votre profil</span>
        <UserIcon class="h-6 w-6 shrink-0 text-white" aria-hidden="true" />
      </a>
    </div>

    <main class="py-10 lg:pl-72">
      <div class="px-4 sm:px-6 lg:px-8">
        <slot />
      </div>
    </main>
  </div>
</template>
