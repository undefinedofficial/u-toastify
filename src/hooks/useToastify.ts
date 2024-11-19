import { PROVIDE_KEY } from "../constants";
import type { ToastItem, ToastPosition, ToastType } from "../types";
import { inject, triggerRef, type ShallowRef } from "vue";

export interface ToastOptions {
  type?: ToastType;
  position?: ToastPosition;
  duration?: number | false;
}

export function useToastify() {
  const toasts = inject<ShallowRef<ToastItem[]>>(PROVIDE_KEY);

  let nextId = 0;
  function toast(
    message: string,
    { position = "bottom-right", duration = 3000, type = "success" }: ToastOptions = {}
  ) {
    if (!toasts)
      throw new Error(
        "u-toastify not installed yet. Example: import toastify from 'u-toastify'; app.use(toastify);"
      );

    const timer = !!duration && setTimeout(() => deleteToast(id), duration);

    const id = ++nextId;
    toasts.value.push({
      id,
      position,
      props: { message },
      close: () => {
        deleteToast(id);
        if (timer) clearTimeout(timer);
      },
      duration: duration || 0,
      type,
    });
    triggerRef(toasts);
    return nextId;
  }

  function deleteToast(id: number) {
    if (!toasts?.value.length) return -1;

    const index = toasts.value.findIndex((toast) => toast.id === id);
    if (index === -1) return index;

    toasts.value.splice(index, 1);
    triggerRef(toasts);
    return index;
  }

  function close(id: number) {
    const index = deleteToast(id);
    if (index === -1) return;
    toasts?.value[index].close();
  }

  /**
   * Cancels all toasts
   */
  function clear() {
    if (!toasts?.value.length) return;
    toasts.value.forEach((toast) => toast.close());
  }

  return { toast, close, clear };
}
