<template>
  <div class="p-6 space-y-10">
    <h1 class="text-2xl font-bold">Reportes</h1>
    <ReporteProyectos />
    <ReporteTareas />
    <ReporteFinanzas />
  </div>
</template>

<script setup>
import ReporteProyectos from '@/components/reportes/ReporteProyectos.vue'
import ReporteTareas from '@/components/reportes/ReporteTareas.vue'
import ReporteFinanzas from '@/components/reportes/ReporteFinanzas.vue'
</script>
