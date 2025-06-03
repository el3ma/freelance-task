<template>
  <div class="bg-white p-6 rounded-md shadow">
    <h2 class="text-lg font-semibold mb-4">Estado de los Proyectos</h2>
    <Doughnut :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useProjectStore } from '@/stores/useProjectStore'
import { Doughnut } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, ArcElement)

const store = useProjectStore()

const totalActivos = computed(() =>
  store.proyectos.filter(p => !p.ingresoRecibido).length
)
const totalFinalizados = computed(() =>
  store.proyectos.filter(p => p.ingresoRecibido).length
)

const chartData = computed(() => ({
  labels: ['Activos', 'Finalizados'],
  datasets: [
    {
      label: 'Proyectos',
      data: [totalActivos.value, totalFinalizados.value],
      backgroundColor: ['#3b82f6', '#10b981'],
      hoverOffset: 8
    }
  ]
}))

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom'
    }
  }
}
</script>
