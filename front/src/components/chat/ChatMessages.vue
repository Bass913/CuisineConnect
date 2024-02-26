<template>
  <div
    v-if="!editingMessage"
    class="chat-message"
    @mouseover="showDropdown = true"
    @mouseleave="showDropdown = false"
  >
    <!-- <div
      class="avatar chat-message-sender-picture rounded-full block bg-gray-100 dark:bg-slate-800"
      :style="{
        backgroundImage: `url(${
          message.fromUser?.picture
            ? message.fromUser?.picture
            : 'https://avatars.githubusercontent.com/u/33639752?v=4'
        })`,
      }"
    ></div> -->
    <div>
      <span
        class="chat-message-sender"
        :style="{
          color: message.fromUser ? message.fromUser.color : '#3f51b5',
        }"
        >{{
          message.fromUser ? message.fromUser.username : "Utilisateur supprimé"
        }}
        {{ message.fromUser?.lastname }}
        <small class="chat-message-date">{{
          formatDate(message.createdAt)
        }}</small></span
      >
      <div class="chat-message-content">{{ message.text }}</div>
    </div>

    <div
      v-if="showDropdown && (isCurrentUserMessage() || isCurrentUserAdmin())"
      class="dropdown shadow"
    >
      <button
        @click="editMessage"
        class="dropdown-item mr-1"
        title="Modifier le message"
      >
        <PencilIcon class="w-5 h-5" />
      </button>
      <button
        @click="deleteMessage(message._id)"
        class="dropdown-item text-red-400 mr-1"
        title="Supprimer le message"
      >
        <TrashIcon class="w-5 h-5" />
      </button>
    </div>
  </div>
  <div v-else>
    <input
      class="block w-full p-4 pl-4 focus:outline-none text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      @keydown.enter="saveEditedMessage"
      v-model="editedMessageText"
      type="text"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useMainStore } from "@/stores/main";
import { showToast } from "@/utils/toast";
import { PencilIcon, TrashIcon } from "@heroicons/vue/24/outline";

const mainStore = useMainStore();

// props
const props = defineProps({
  message: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["delete-message", "edit-message"]);

const editingMessage = ref(false);
const editedMessageText = ref("");
const showDropdown = ref(false);

const formatDate = (date) => {
  const dateObj = new Date(date);
  const today = new Date();
  if (
    dateObj.getDate() === today.getDate() &&
    dateObj.getMonth() === today.getMonth() &&
    dateObj.getFullYear() === today.getFullYear()
  ) {
    return `Aujourd'hui à ${dateObj.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })}`;
  } else {
    return dateObj.toLocaleString();
  }
};
const isCurrentUserMessage = () => {
  return props.message.fromUser?._id === mainStore.currentUser?._id;
};
const isCurrentUserAdmin = () => {
  return (
    mainStore.currentUser.role === "admin" ||
    mainStore.currentUser.role === "rh"
  );
};
const deleteMessage = () => {
  emit("delete-message", props.message._id);
};
const editMessage = () => {
  editingMessage.value = true;
  editedMessageText.value = props.message.text;
};
const saveEditedMessage = () => {
  emit("edit-message", props.message._id, editedMessageText.value);
  props.message.text = editedMessageText.value;
  editingMessage.value = false;
};
</script>

<style>
.chat-message-sender-picture {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 8px;
}
.chat-message {
  /* background-color: #999; */
  display: flex;
  padding: 8px;
  border-radius: 5px;
  position: relative;
}

.chat-message:hover {
  background-color: #ddd;
}

.chat-message-date {
  color: #aaa;
  font-size: 11px;
  margin-left: 10px;
  font-weight: 400;
}

.dropdown {
  color: #333;
  font-size: 14px;
  position: absolute;
  top: 1px;
  right: 1px;
  background-color: #eee;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 1px 6px;
  display: flex;
  flex-direction: row;
  z-index: 999;
}

.dropdown-item {
  padding: 5px;
  cursor: pointer;
  border: none;
  background: transparent;
}
</style>
