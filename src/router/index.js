import { createRouter, createWebHistory } from 'vue-router'

// Importa tus componentes de vista
import DashboardView from '@/views/DashboardView.vue'
/* import TasksPage from '../views/TasksPage.vue' */
import FinanzasView from '../views/FinanzasView.vue'
import ReportesView from '../views/ReportesView.vue'
import ProyectosView from '@/views/ProyectosView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL), // Usa createWebHistory para URLs limpias
  routes: [
    {
      path: '/', // La ruta raíz
      name: 'dashboard',
      component: DashboardView // El componente que se muestra en la ruta raíz
    },
    {
      path: '/proyectos', // Tu ruta para tareas
      name: 'proyectos',
      component: ProyectosView // El componente de la página de tareas
    },
     {
      path: '/finanzas', // Tu ruta para finanzas
      name: 'finanzas',
      component: FinanzasView
    },

    {
      path: '/reportes', // Tu ruta para reportes
      name: 'reportes',
      component: ReportesView
    }
    // Puedes añadir más rutas aquí
  ]
})

export default router
