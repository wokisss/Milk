import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Layout from '../components/Layout.vue'

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', name: 'Login', component: Login },
  {
    path: '/',
    component: Layout,
    meta: { requiresAuth: true },
    children: [
      { path: 'farmers', name: 'Farmers', component: () => import('../views/Farmers.vue') },
      { path: 'farmer-form', name: 'FarmerForm', component: () => import('../views/FarmerForm.vue') },
      { path: 'purchases', name: 'Purchases', component: () => import('../views/Purchases.vue') },
      { path: 'purchase-form', name: 'PurchaseForm', component: () => import('../views/PurchaseForm.vue') },
      { path: 'statistics', name: 'Statistics', component: () => import('../views/Statistics.vue') },
      { path: 'profile', name: 'Profile', component: () => import('../views/Profile.vue') },
      { path: 'record-detail', name: 'RecordDetail', component: () => import('../views/RecordDetail.vue') }
    ]
  }
]

const router = createRouter({ history: createWebHistory(), routes })

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  if (to.path !== '/login' && to.matched.some(r => r.meta.requiresAuth) && !token) {
    next('/login')
  } else if (token && to.path === '/login') {
    next('/farmers')
  } else {
    next()
  }
})

export default router

