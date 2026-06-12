import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Documents from '../views/Documents.vue'
import Upload from '../views/Upload.vue'
import Versions from '../views/Versions.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/documents', component: Documents },
  { path: '/upload', component: Upload },
  { path: '/versions', component: Versions }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router