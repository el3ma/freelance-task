<template>
  <div v-for="proyecto in store.proyectos" :key="proyecto.id" class="p-4 bg-white rounded-md shadow">
    <h3 class="text-lg font-bold">{{ proyecto.nombre }}</h3>
    <p class="text-sm text-gray-600">Fecha: {{ proyecto.fecha }}</p>
    <p class="text-sm text-gray-600">Presupuesto: ${{ proyecto.presupuesto }}</p>
    <p class="text-sm text-gray-600">Prioridad: {{ proyecto.prioridad }}</p>
    <TareasProyecto :proyecto="proyecto"/>

    <button @click="abrirEdicion(proyecto)" class="text-blue-600 text-sm">Editar</button>
    <button @click="store.eliminarProyecto(proyecto.id)" class="text-red-600 ml-4 text-sm">Eliminar</button>
  </div>

  <!-- Modal de edición -->
  <div v-if="modoEdicion" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white p-4 rounded shadow max-w-md w-full">
      <h2 class="text-lg font-bold mb-2">Editar Proyecto</h2>
      <input v-model="form.nombre" placeholder="Nombre" class="input mb-2 w-full" />
      <input v-model="form.fecha" type="date" class="input mb-2 w-full" />
      <input v-model="form.presupuesto" type="number" placeholder="Presupuesto" class="input mb-2 w-full" />
      <select v-model="form.prioridad" class="input mb-4 w-full">
        <option>Alta</option>
        <option>Media</option>
        <option>Baja</option>
      </select>

      <div class="flex justify-end gap-2">
        <button @click="guardarEdicion" class="bg-blue-600 text-white px-3 py-1 rounded hover:bg-amber-600">Guardar</button>
        <button @click="modoEdicion = false" class="bg-gray-300 px-3 py-1 rounded">Cancelar</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useProjectStore } from '@/stores/useProjectStore'
import TareasProyecto from './TareasProyecto.vue'

const store = useProjectStore()

const modoEdicion = ref(false)
const proyectoEditandoId = ref(null)
const form = ref({
  nombre: '',
  fecha: '',
  presupuesto: '',
  prioridad: 'Media'
})

function abrirEdicion(proyecto) {
  proyectoEditandoId.value = proyecto.id
  form.value = {
    nombre: proyecto.nombre,
    fecha: proyecto.fecha,
    presupuesto: proyecto.presupuesto,
    prioridad: proyecto.prioridad
  }
  modoEdicion.value = true
}

function guardarEdicion() {
  store.editarProyecto(proyectoEditandoId.value, form.value)
  modoEdicion.value = true
  proyectoEditandoId.value = null
  form.value = {
    nombre: '',
    fecha: '',
    presupuesto: '',
    prioridad: 'Media'
  }
  modoEdicion.value = false
  store.cargarProyectos() // Recargar proyectos para reflejar cambios
  store.cargarTareas() // Recargar tareas para reflejar cambios
}
</script>

