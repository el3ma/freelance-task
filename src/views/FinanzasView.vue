<template>
  <div class="p-6 space-y-6">
    <h1 class="text-2xl font-bold">Panel de Finanzas</h1>
    <IngresosComp />
    <GastosComp />
    <ResumenFinanzas />
  </div>
</template>

<script setup>
import IngresosComp from '@/components/finanzas/IngresosComp.vue'
import GastosComp from '@/components/finanzas/GastosComp.vue'
import ResumenFinanzas from '@/components/finanzas/ResumenFinanzas.vue'
</script>
