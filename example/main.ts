import { createApp } from "vue";
import App from "./App.vue";
import { toastify } from "../src";

createApp(App).use(toastify).mount("#app");
