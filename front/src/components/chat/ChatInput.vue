<template>
  <div class="relative chat-input mt-3">
    <div
      class="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none"
    >
      <PaperAirplaneIcon class="w-5 h-5 text-gray-400" aria-hidden="true" />
    </div>
    <input
      v-model="message"
      @keydown.enter="sendMessage"
      type="search"
      id="search"
      class="block w-full p-4 pl-12 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
      placeholder="Ecrivez ici votre message..."
      required
    />
    <button
      @click="sendMessage"
      class="text-white absolute right-2.5 bottom-2.5 bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
    >
      <!-- Texte du bouton "Envoyer" -->
      Envoyer
    </button>
  </div>
</template>

<script>
import { PaperAirplaneIcon } from '@heroicons/vue/24/outline';

export default {
    data() {
        return {
            message: "",
        };
    },
    methods: {
        sendMessage() {
            if (this.message.trim() !== "") {
                this.$emit("send-message", this.message);
                this.message = "";
            }
        },
    },
    components: { PaperAirplaneIcon }
};
</script>

<style>
</style>
