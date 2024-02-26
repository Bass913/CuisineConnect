import { defineStore } from "pinia";

export const useMainStore = defineStore("main", {
  state: () => {
    const user = JSON.parse(localStorage.getItem("user"));
    return {
      currentUser: {...user, response: null},
    };
  },
  actions: {      
    async setUser(payload) {
      for (const key of Object.keys(payload)){
        this.currentUser[key] = payload[key];
      };
    },
  },
});