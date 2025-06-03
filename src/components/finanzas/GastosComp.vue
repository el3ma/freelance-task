<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">Gastos</h2>

    <!-- Formulario para agregar gasto -->
    <form @submit.prevent="agregarNuevoGasto" class="space-y-4 mb-6">
      <div>
        <label class="block text-sm font-medium mb-1">Descripción</label>
        <input
          v-model="descripcion"
          type="text"
          placeholder="Ej: Hosting mensual"
          class="w-full border rounded px-3 py-2"
          required
        />
      </div>
      <div>
        <label class="block text-sm font-medium mb-1">Monto</label>
        <input
          v-model="monto"
          type="number"
          step="0.01"
          min="0"
          placeholder="Ej: 15.00"
          class="w-full border rounded px-3 py-2"
          required
        />
      </div>
      <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Agregar Gasto
      </button>
    </form>

    <!-- Lista de gastos -->
    <ul class="space-y-2">
      <li
        v-for="gasto in store.gastos"
        :key="gasto.id"
        class="flex justify-between items-center bg-gray-100 p-3 rounded"
      >
        <span>{{ gasto.descripcion }}</span>
        <span class="font-medium text-red-600">-${{ gasto.monto.toFixed(2) }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useProjectStore } from '@/stores/useProjectStore'

const store = useProjectStore()
const descripcion = ref('')
const monto = ref('')

function agregarNuevoGasto() {
  store.agregarGasto(descripcion.value, monto.value)
  descripcion.value = ''
  monto.value = ''
}
</script>

