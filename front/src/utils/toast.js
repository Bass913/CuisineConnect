import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

export const showToast = (message) => {
  toast(message, {
    autoClose: 2000,
  });
};
