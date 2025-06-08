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
    <NavbarComp class="" />
    <RouterView class="" />
  </div>
</template>

<style scoped>
</style>
