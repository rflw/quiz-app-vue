import { createWebHistory, createRouter, Router } from 'vue-router'
import { routes } from '@/router/routes';

export const router: Router = createRouter({
  history: createWebHistory(),
  routes
});
