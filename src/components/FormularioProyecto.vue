<template>
  <div class="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
  <form @submit.prevent="handleSubmit" class="space-y-4">
    <input v-model="nombre" type="text" placeholder="Nombre del proyecto" class="w-full border p-2 rounded-md" />
    <input v-model="fecha" type="date" class="w-full border p-2 rounded-md" />
    <input v-model="presupuesto" type="number" placeholder="Presupuesto" class="w-full border p-2 rounded-md" />
    <select v-model="prioridad" class="w-full border p-2 rounded-md">
      <option disabled value="">Prioridad</option>
      <option value="alta">Alta</option>
      <option value="media">Media</option>
      <option value="baja">Baja</option>
    </select>
    <button type="submit" class="bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-950">Agregar Proyecto</button>
  </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useProjectStore } from '@/stores/useProjectStore'

const nombre = ref('')
const fecha = ref('')
const presupuesto = ref(0)
const prioridad = ref('')

const store = useProjectStore()

function handleSubmit() {
  if (!nombre.value || !fecha.value || !prioridad.value) return
  store.agregarProyecto({ nombre: nombre.value, fecha: fecha.value, presupuesto: presupuesto.value, prioridad: prioridad.value })
  nombre.value = ''
  fecha.value = ''
  presupuesto.value = 0
  prioridad.value = ''
}
</script>

<style scoped>
/* .input {
  @apply w-full border p-2 rounded-md;
}
.btn {
  @apply bg-blue-600 text-white px-4 py-2 rounded-md;
} */
</style>
