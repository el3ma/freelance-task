<template>
  <div class="bg-white p-6 rounded-md shadow">
    <h2 class="text-lg font-semibold mb-4">Tareas Completadas por Proyecto</h2>
    <Bar :data="chartData" :options="chartOptions" />
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

const nombres = computed(() =>
  store.proyectos.map(p => p.nombre)
)

const tareasCompletas = computed(() =>
  store.proyectos.map(p =>
    p.tareas ? p.tareas.filter(t => t.completada).length : 0
  )
)

const chartData = computed(() => ({
  labels: nombres.value,
  datasets: [
    {
      label: 'Tareas completadas',
      data: tareasCompletas.value,
      backgroundColor: '#6366f1'
    }
  ]
}))

const chartOptions = {
  responsive: true,
  indexAxis: 'y',
  plugins: {
    legend: { display: false }
  },
  scales: {
    x: {
      beginAtZero: true,
      ticks: {
        stepSize: 1
      }
    }
  }
}
</script>
