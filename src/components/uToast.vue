<template>
  <div class="u-toast" :class="`u-toast--${type}`">
    <button class="u-toast__close" @click="emit('close')">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
        <path
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M6 18L17.94 6M18 18L6.06 6"
        />
      </svg>
    </button>
    {{ message }}
    <div
      v-if="duration"
      class="u-toast__progress"
      :style="`--u-toastify-duration: ${duration}ms;`"
    ></div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  message: string;
  duration: number;
  position: string;
  type: string;
}>();

const emit = defineEmits<{
  close: [];
}>();
</script>

<style lang="scss">
$u-toastify-max-width: 400px;
$u-toastify-border-radius: 0.5rem;
$u-toastify-box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
$u-toastify-z-index: 9999;
$u-toastify-padding: 2rem 3.5rem;

.u-toast {
  position: relative;
  padding: 2rem 3.5rem;
  border-radius: $u-toastify-border-radius;
  box-shadow: $u-toastify-box-shadow;
  max-width: min(100%, 320px);
  z-index: $u-toastify-z-index;
  text-wrap: pretty;

  &--success {
    background-color: #f0fdf4f2;
    border: 1px solid #28a745;
    color: #28a745;
  }
  &--info {
    background-color: #eff6fff2;
    border: 1px solid #17a2b8;
    color: #17a2b8;
  }
  &--warning {
    background-color: #fefce8f2;
    border: 1px solid #ffc107;
    color: #ffc107;
  }
  &--error {
    background-color: #fef2f2f2;
    border: 1px solid #dc3545;
    color: #dc3545;
  }

  &__close {
    position: absolute;
    right: 10px;
    top: 10px;

    background: transparent;
    border: none;

    cursor: pointer;

    transition: all 0.3s ease;

    height: 24px;
    width: 24px;

    &:hover {
      color: red;
    }

    &:active {
      color: red;
    }
  }

  &__progress {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    border-radius: 0 0 $u-toastify-border-radius $u-toastify-border-radius;
    overflow: hidden;
    height: 5px;

    &::before {
      content: "";

      display: block;
      height: 5px;
      width: 100%;
      border-top: 5px solid #28a745;

      animation-name: progress;
      animation-duration: var(--u-toastify-duration);
      animation-timing-function: linear;
      animation-fill-mode: forwards;
    }
  }
}

@keyframes progress {
  0% {
    width: 100%;
  }
  100% {
    width: 0;
  }
}
</style>
