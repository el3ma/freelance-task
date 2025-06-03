<template>
  <div class="bg-white p-6 rounded-md shadow">
    <h2 class="text-lg font-semibold mb-4">Ingresos vs Gastos</h2>
    <Bar :data="chartData" :options="chartOptions" />
    <p class="mt-4 text-sm text-gray-600">Balance actual: ${{ balance }}</p>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useProjectStore } from '@/stores/useProjectStore'
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const store = useProjectStore()

const ingresos = computed(() => store.calcularIngresosReales())
const gastos = computed(() => store.calcularGastosTotales())
const balance = computed(() => store.calcularBalance())

const chartData = computed(() => ({
  labels: ['Ingresos Confirmados', 'Gastos'],
  datasets: [
    {
      label: 'Monto ($)',
      data: [ingresos.value, gastos.value],
      backgroundColor: ['#10b981', '#ef4444']
    }
  ]
}))

const chartOptions = {
  responsive: true,
  scales: {
    y: {
      beginAtZero: true
    }
  },
  plugins: {
    legend: {
      display: false
    }
  }
}
</script>

