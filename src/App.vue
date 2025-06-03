<script setup>
import { RouterView } from "vue-router";
import { onMounted } from "vue";
import { initFlowbite } from "flowbite";
import NavbarComp from "./components/NavbarComp.vue";

// initialize components based on data attribute selectors
onMounted(() => {
  initFlowbite();
});
</script>

<template>
  <div class="h-screen w-screen">
    <NavbarComp class="w-dvw h-16 bg-white shadow-md" />
    <RouterView class="w-dvw h-dvh bg-white" />
  </div>
</template>

<style scoped>
</style>
