import { set } from "@vueuse/core";
import { defineStore } from "pinia";

export const useStore = defineStore("main", {
  state: () => ({
    user: {},
    token: "",
  }),
  actions: {
    setUser(payload: any) {
      this.user = payload;
      this.setToken(payload.token);
    },
    setToken(token: string) {
      this.token = token;
    },
  },

  persist: {
    storage: localStorage,
  },
});
