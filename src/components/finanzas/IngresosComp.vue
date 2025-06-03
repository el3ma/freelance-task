<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">Ingresos por Proyectos</h2>
    <ul class="space-y-3">
      <li
        v-for="proyecto in store.proyectos"
        :key="proyecto.id"
        class="flex justify-between items-center bg-white p-4 rounded-md shadow"
      >
        <div>
          <p class="font-medium">{{ proyecto.nombre }}</p>
          <p class="text-sm text-gray-600">Presupuesto: ${{ proyecto.presupuesto }}</p>
        </div>
        <div class="flex items-center gap-2">
          <label class="text-sm text-gray-700">Recibido</label>
          <input
            type="checkbox"
            v-model="proyecto.ingresoRecibido"
            @change="marcarIngreso(proyecto.id, proyecto.ingresoRecibido)"
            class="w-4 h-4"
          />
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useProjectStore } from '@/stores/useProjectStore'

const store = useProjectStore()

function marcarIngreso(idProyecto, estado) {
  store.marcarIngresoRecibido(idProyecto, estado)
}
</script>
