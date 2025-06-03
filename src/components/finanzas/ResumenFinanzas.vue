<template>
  <div class="mt-8 p-6 bg-white rounded-md shadow-md">
    <h2 class="text-xl font-semibold mb-4">Resumen Financiero</h2>

    <div class="space-y-2 text-gray-700">
      <p>
        <span class="font-medium">Ingresos Reales:</span>
        <span class="text-green-600 font-semibold">${{ totalIngresos }}</span>
      </p>
      <p>
        <span class="font-medium">Gastos Totales:</span>
        <span class="text-red-600 font-semibold">-${{ totalGastos }}</span>
      </p>
      <hr />
      <p class="mt-2">
        <span class="font-medium">Balance:</span>
        <span :class="balance >= 0 ? 'text-green-700' : 'text-red-700'" class="font-bold">
          ${{ balance }}
        </span>
      </p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useProjectStore } from '@/stores/useProjectStore'

const store = useProjectStore()

const totalIngresos = computed(() =>
  store.proyectos
    .filter(p => p.ingresoRecibido)
    .reduce((acc, p) => acc + parseFloat(p.presupuesto), 0)
)

const totalGastos = computed(() =>
  store.gastos.reduce((acc, g) => acc + parseFloat(g.monto), 0)
)

const balance = computed(() => totalIngresos.value - totalGastos.value)
</script>

