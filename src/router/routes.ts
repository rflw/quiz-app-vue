import { RouteRecordInfo, RouteRecordRaw } from 'vue-router';
import * as routeNames from '@/types/routes';
import { useAppStore } from '@/store/useApp';

export const routes: RouteRecordRaw[] = [
  {
    path: '/', 
    component: () => import('@/layouts/DefaultLayout.vue'),
    children: [
      {
        path: '',
        name: routeNames.HOME,
        component: () => import('@/views/Home.vue')
      }
    ]
  },
  {
    path: '/questions',
    component: () => import('@/layouts/DefaultLayout.vue'),
    children: [
      {
        path: ':id',
        name: routeNames.QUESTIONS,
        component: () => import('@/views/Questions.vue'),
        props: (route: RouteRecordInfo) => ({ questionIndex: parseInt(route.params.id as string) }),
      }
    ],
    beforeEnter: async () => {
      await useAppStore().initState();
    }
  },
  {
    path: '/results',
    component: () => import('@/layouts/DefaultLayout.vue'),
    children: [
      {
        path: '',
        name: routeNames.RESULTS,
        component: () => import('@/views/Results.vue'),
      }
    ]
  }
];
