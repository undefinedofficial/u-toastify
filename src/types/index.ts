import type { Component } from "vue";

export type ToastPosition = `${"top" | "bottom"}-${"left" | "center" | "right"}`;

export type ToastType = "info" | "success" | "warning" | "error";

export type ToastProps = Record<string, unknown>;

export interface ToastItem {
  id: number;
  type: ToastType;
  position: ToastPosition;
  duration: number;
  close: () => void;

  component?: Component;
  props?: ToastProps;
}
