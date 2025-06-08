<template>
  <div class="p-6 space-y-10">
    <h1 class="text-gray-900 text-3xl font-bold">Lista de Proyectos</h1>
    <p class="text-gray-600 mb-6">
      Aquí puedes ver y gestionar todos tus proyectos.
    </p>
    <FormularioProyecto />
    <ListaProyectos />
  </div>
</template>

<script setup>
import ListaProyectos from "@/components/ListaProyectos.vue";
import FormularioProyecto from "@/components/FormularioProyecto.vue";
</script>
