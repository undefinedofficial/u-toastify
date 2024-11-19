<template>
  <div
    v-for="(items, position) in toastsContainers"
    :key="position"
    class="u-toast-wrapper"
    :class="`u-toast-wrapper--${position}`"
  >
    <transition-group :name="`slide-${position}`">
      <component
        v-for="toast in items"
        :key="toast.id"
        :is="toast.component ?? uToast"
        v-bind="toast.props"
        :type="toast.type"
        :duration="toast.duration"
        :position="toast.position"
        @close="toast.close"
      />
    </transition-group>
  </div>
</template>

<script lang="ts" setup>
import { computed, inject, type ShallowRef, TransitionGroup } from "vue";
import type { ToastItem, ToastPosition } from "../types";
import { PROVIDE_KEY } from "../constants";
import uToast from "./uToast.vue";

const toasts = inject<ShallowRef<ToastItem[]>>(PROVIDE_KEY);

const toastsContainers = computed(() =>
  toasts?.value.reduce(
    (acc, toast) => ({
      ...acc,
      [toast.position]: [...(acc[toast.position] ?? []), toast],
    }),
    {
      "top-left": [] as ToastItem[],
      "top-center": [] as ToastItem[],
      "top-right": [] as ToastItem[],
      "bottom-left": [] as ToastItem[],
      "bottom-center": [] as ToastItem[],
      "bottom-right": [] as ToastItem[],
    } as Record<ToastPosition, ToastItem[]>
  )
);
</script>

<script lang="ts">
export default {
  devtools: {
    // hide: true,
  },
  inheritAttrs: false,
};
</script>

<style lang="scss">
$u-toastify-transition: all 0.5s cubic-bezier(1, -0.6, 0.045, 1.65);
$u-toastify-offset-x: 10px;
$u-toastify-offset-y: 10px;

.u-toast-wrapper {
  display: flex;
  gap: 16px;

  position: fixed;
  max-width: calc(100% - 20px);

  &--top-left {
    left: $u-toastify-offset-x;
    top: $u-toastify-offset-y;
    flex-direction: column;
  }
  &--top-center {
    left: 50%;
    top: 0;
    transform: translateX(-50%);
    flex-direction: column;
  }
  &--top-right {
    right: $u-toastify-offset-x;
    top: $u-toastify-offset-y;
    flex-direction: column;
  }
  &--bottom-left {
    left: $u-toastify-offset-x;
    bottom: $u-toastify-offset-y;
    flex-direction: column-reverse;
  }
  &--bottom-center {
    left: 50%;
    bottom: $u-toastify-offset-y;
    transform: translateX(-50%);
    flex-direction: column-reverse;
  }
  &--bottom-right {
    right: $u-toastify-offset-x;
    bottom: $u-toastify-offset-y;
    flex-direction: column-reverse;
  }
}

.slide-top-left-enter-active,
.slide-top-left-leave-active,
.slide-top-right-enter-active,
.slide-top-right-leave-active,
.slide-top-center-enter-active,
.slide-top-center-leave-active,
.slide-bottom-left-enter-active,
.slide-bottom-left-leave-active,
.slide-bottom-right-enter-active,
.slide-bottom-right-leave-active,
.slide-bottom-center-enter-active,
.slide-bottom-center-leave-active {
  transition: $u-toastify-transition;
}

.slide-top-left-enter-from,
.slide-top-left-leave-to,
.slide-bottom-left-enter-from,
.slide-bottom-left-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}
.slide-top-right-enter-from,
.slide-top-right-leave-to,
.slide-bottom-right-enter-from,
.slide-bottom-right-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

.slide-top-center-enter-from,
.slide-top-center-leave-to {
  transform: translateY(-100%);
}
.slide-bottom-center-enter-from,
.slide-bottom-center-leave-to {
  transform: translateY(100%);
}
</style>
