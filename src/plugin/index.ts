import { uToastContainer } from "@/components";
import { PROVIDE_KEY } from "@/constants";
import type { ToastItem } from "@/types";
import { createApp, onMounted, shallowRef, type Plugin } from "vue";

export interface CreateToastifyOptions {}

export const toastify: Plugin = {
  install(app, ...options) {
    if (document.getElementById("u-toastify")) throw new Error("u-toastify already exists");

    const toasts = shallowRef<ToastItem[]>([]);

    app.provide(PROVIDE_KEY, toasts);

    const toastApp = createApp(uToastContainer, {
      toasts,
    });

    toastApp._context.components = app._context.components;
    toastApp._context.directives = app._context.directives;
    toastApp._context.mixins = app._context.mixins;
    toastApp._context.provides = app._context.provides;
    toastApp.config.globalProperties = app.config.globalProperties;

    const toastContainer = document.createElement("div");
    toastContainer.id = "u-toastify";
    toastContainer.style.display = "contents";
    const component = toastApp.mount(document.body.appendChild(toastContainer));

    onMounted(component, toastApp._instance);

    // app.config.globalProperties.$toast = toast;
  },
};
