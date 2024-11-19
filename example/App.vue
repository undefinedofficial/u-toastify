<template></template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useToastify } from "../src";

const { toast } = useToastify();

onMounted(() => {
  // setInterval(() => {
  toast("worldververio[gn39-gn34ng-3n4gn3409gn9034g9n34gn943ng 9n34gn40gn034ng9n34gn34g]", {
    duration: 40500,
    position: "top-left",
  });
  // }, 5500);

  // setInterval(() => {
  //   toast("hello", { duration: 2500 });
  // }, 3500);

  // setInterval(() => {
  //   toast("hellod2-hf9u3gfb34ugf834bg-fb34ugb8934bg89b3489gb8934g8948gb3498-gb8934bg8943b", {
  //     duration: 1000,
  //   });
  // }, 1500);
});
</script>

<style scoped></style>
