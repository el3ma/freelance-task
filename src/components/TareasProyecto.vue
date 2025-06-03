<template>
  <div class="mt-4 space-y-2">
    <!-- Formulario -->
    <form @submit.prevent="agregarTarea" class="flex gap-2">
      <input
        v-model="nuevaTarea"
        type="text"
        placeholder="Escribe una tarea"
        class="flex-1 border p-2 rounded-md"
      />
      <button class="bg-green-600 text-white px-3 py-1 rounded-md">+</button>
    </form>

    <!-- Lista de tareas -->
    <ul class="space-y-1">
      <li
        v-for="tarea in proyecto.tareas"
        :key="tarea.id"
        class="flex justify-between items-center p-2 rounded-md border"
        :class="
          tarea.completada
            ? 'bg-green-100 line-through text-gray-500'
            : 'bg-gray-100'
        "
      >
        <!-- Mostrar input si está en edición, si no el texto -->
        <template v-if="tareaEnEdicion === tarea.id">
          <input
            v-model="descripcionEditada"
            class="border rounded px-2 py-1 text-sm flex-1 mr-2"
            @keyup.enter="guardarTareaEditada(tarea.id)"
          />
          <div class="flex gap-3">
            <button
              @click="guardarTareaEditada(tarea.id)"
              class="text-green-600 text-xs"
            >
              ✔️ Guardar
            </button>
            <button @click="cancelarEdicion" class="text-gray-500 text-xs">
              ✖️ Cancelar
            </button>
          </div>
        </template>
        <template v-else>
          <span @click="toggleTarea(tarea.id)" class="cursor-pointer flex-1">
            {{ tarea.descripcion }}
          </span>
          <div class="flex gap-1">
            <button
              @click="iniciarEdicion(tarea)"
              class="text-blue-500 text-xs"
            >
              Editar
            </button>
            <button @click="eliminar(tarea.id)" class="text-red-500 text-xs">
              Eliminar
            </button>
          </div>
        </template>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useProjectStore } from "@/stores/useProjectStore";

const { proyecto } = defineProps({
  proyecto: Object,
});

const store = useProjectStore();
const nuevaTarea = ref("");

function agregarTarea() {
  if (!nuevaTarea.value.trim()) return;
  store.agregarTareaAProyecto(proyecto.id, nuevaTarea.value);
  nuevaTarea.value = "";
}

function toggleTarea(idTarea) {
  store.completarTarea(proyecto.id, idTarea);
}

function eliminar(idTarea) {
  store.eliminarTarea(proyecto.id, idTarea);
}
const tareaEnEdicion = ref(null);
const descripcionEditada = ref("");

function iniciarEdicion(tarea) {
  tareaEnEdicion.value = tarea.id;
  descripcionEditada.value = tarea.descripcion;
}

function guardarTareaEditada(idTarea) {
  store.editarTarea(proyecto.id, idTarea, descripcionEditada.value);
  tareaEnEdicion.value = null;
  descripcionEditada.value = "";
}
function cancelarEdicion() {
  tareaEnEdicion.value = null
  descripcionEditada.value = ''
}

</script>

