import { defineStore } from 'pinia'
import { ref, watch, onMounted } from 'vue'


export const useProjectStore = defineStore('project', () => {
  const proyectos = ref([])
  const gastos = ref([])

  onMounted(() => {
    const proyectosGuardados = localStorage.getItem('proyectos')
    const gastosGuardados = localStorage.getItem('gastos')

    if (proyectosGuardados) {
      proyectos.value = JSON.parse(proyectosGuardados)
    }
    if (gastosGuardados) {
      gastos.value = JSON.parse(gastosGuardados)
    }
  })

  watch(proyectos, (nuevosProyectos) => {
    localStorage.setItem('proyectos', JSON.stringify(nuevosProyectos))
  }, { deep: true })

  watch(gastos, (nuevosGastos) => {
    localStorage.setItem('gastos', JSON.stringify(nuevosGastos))
  }, { deep: true })

  // Funciones para manejar proyectos
  function agregarProyecto(proyecto) {
    proyectos.value.push({
      id: Date.now(),
      nombre: proyecto.nombre,
      fecha: proyecto.fecha,
      presupuesto: parseFloat(proyecto.presupuesto),
      prioridad: proyecto.prioridad,
      tareas: [],
      ingresoRecibido: false
    })
  }

  function agregarTareaAProyecto(idProyecto, descripcionTarea) {
    const proyecto = proyectos.value.find(p => p.id === idProyecto)
    if (proyecto) {
      proyecto.tareas.push({
        id: Date.now(),
        descripcion: descripcionTarea,
        completada: false
      })
    } else {
      console.error('Proyecto no encontrado para ID:', idProyecto)
    }
  }

  function completarTarea(idProyecto, idTarea) {
    const proyecto = proyectos.value.find(p => p.id === idProyecto)
    if (proyecto) {
      const tarea = proyecto.tareas.find(t => t.id === idTarea)
      if (tarea) {
        tarea.completada = !tarea.completada
      }
    }
  }

  function eliminarTarea(idProyecto, idTarea) {
    const proyecto = proyectos.value.find(p => p.id === idProyecto)
    if (proyecto) {
      proyecto.tareas = proyecto.tareas.filter(t => t.id !== idTarea)
    }
  }

  // Funciones para manejar gastos
  function agregarGasto(descripcion, monto) {
    gastos.value.push({
      id: Date.now(),
      descripcion,
      monto: parseFloat(monto)
    })
  }

  function marcarIngresoRecibido(idProyecto, estado) {
    const proyecto = proyectos.value.find(p => p.id === idProyecto)
    if (proyecto) {
      proyecto.ingresoRecibido = estado
    }
  }

  function calcularIngresosTotales() {
    return proyectos.value.reduce((total, p) => total + p.presupuesto, 0)
  }

  function calcularIngresosReales() {
    return proyectos.value
      .filter(p => p.ingresoRecibido)
      .reduce((total, p) => total + p.presupuesto, 0)
  }

  function calcularGastosTotales() {
    return gastos.value.reduce((total, g) => total + g.monto, 0)
  }

  function calcularBalance() {
    return calcularIngresosReales() - calcularGastosTotales()
  }

  function editarProyecto(id, nuevosDatos) {
  const proyecto = proyectos.value.find(p => p.id === id)
  if (proyecto) {
    proyecto.nombre = nuevosDatos.nombre
    proyecto.fecha = nuevosDatos.fecha
    proyecto.presupuesto = parseFloat(nuevosDatos.presupuesto)
    proyecto.prioridad = nuevosDatos.prioridad
  }
}

function editarTarea(idProyecto, idTarea, nuevaDescripcion) {
  const proyecto = proyectos.value.find(p => p.id === idProyecto)
  if (proyecto) {
    const tarea = proyecto.tareas.find(t => t.id === idTarea)
    if (tarea) {
      tarea.descripcion = nuevaDescripcion
    }
  }
}



  function eliminarProyecto(idProyecto) {
    proyectos.value = proyectos.value.filter(p => p.id !== idProyecto)
  }








  return {
    proyectos,
    agregarProyecto,
    agregarTareaAProyecto,
    completarTarea,
    eliminarTarea,
    editarTarea,
    gastos,
    agregarGasto,
    marcarIngresoRecibido,
    calcularIngresosTotales,
    calcularIngresosReales,
    calcularGastosTotales,
    calcularBalance,
    editarProyecto,
    eliminarProyecto
  }
})
