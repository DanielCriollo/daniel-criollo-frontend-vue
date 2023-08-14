import { createRouter, createWebHistory } from 'vue-router'
import PaisesList from '@/components/Paises/PaisesList.vue'
import PaisCreate from '@/components/Paises/PaisCreate.vue'
import PaisEdit from '@/components/Paises/PaisEdit.vue'
import DepartamentosList from '@/components/Departamentos/DepartamentosList.vue'
import DepartamentoCreate from '@/components/Departamentos/DepartamentoCreate.vue'
import DepartamentoEdit from '@/components/Departamentos/DepartamentoEdit.vue'
import CiudadesList from '@/components/Ciudades/CiudadesList.vue'
import CiudadCreate from '@/components/Ciudades/CiudadCreate.vue'
import CiudadEdit from '@/components/Ciudades/CuidadEdit.vue'
import SectoresList from '@/components/Sectores/SectoresList.vue'
import SectorCreate from '@/components/Sectores/SectorCreate.vue'
import SectorEdit from '@/components/Sectores/SectorEdit.vue'
import InmueblesList from '@/components/Inmuebles/InmueblesList.vue'
import InmuebleCreate from '@/components/Inmuebles/InmuebleCreate.vue'
import InmuebleEdit from '@/components/Inmuebles/InmuebleEdit.vue'

const routes = [
  { path: '/paises', name: 'listPais', component: PaisesList },
  { path: '/paises/create', name: 'createPais', component: PaisCreate },
  { path: '/paises/:id/edit', name: 'editPais', component: PaisEdit },
  { path: '/departamentos', name: 'listDepartamento', component: DepartamentosList },
  { path: '/departamentos/create', name: 'createDepartamento', component: DepartamentoCreate },
  { path: '/departamentos/:id/edit', name: 'editDepartamento', component: DepartamentoEdit },
  { path: '/ciudades', name: 'listCiudad', component: CiudadesList },
  { path: '/ciudades/create', name: 'createCiudad', component: CiudadCreate },
  { path: '/ciudades/:id/edit', name: 'editCiudad', component: CiudadEdit },
  { path: '/sectores', name: 'listSector', component: SectoresList },
  { path: '/sectores/create', name: 'createSector', component: SectorCreate },
  { path: '/sectores/:id/edit', name: 'editSector', component: SectorEdit },
  { path: '/inmuebles', name: 'listInmueble', component: InmueblesList },
  { path: '/inmuebles/create', name: 'createInmueble', component: InmuebleCreate },
  { path: '/inmuebles/:id/edit', name: 'editInmueble', component: InmuebleEdit }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
