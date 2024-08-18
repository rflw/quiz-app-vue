import { RouteLocationNormalized, RouteLocationNormalizedLoaded, RouteRecordInfo, RouteRecordRaw } from 'vue-router';
import * as routeNames from '@/types/routes';
import { useTriviaStore } from '@/store/useTrivia';

// TODO: add 404 route
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
    // TODO: add redirect to QUESTIONS if quiz is currently in progress 
  },
  {
    path: '/questions/:id',
    component: () => import('@/layouts/DefaultLayout.vue'),
    children: [
      {
        path: '',
        name: routeNames.QUESTIONS,
        component: () => import('@/views/Questions.vue'), // TODO: change component name
        props: (route: RouteRecordInfo) => ({ questionIndex: parseInt(route.params.id as string) }), // TODO: add error handle if value is NaN
      }
    ],
    beforeEnter: async (to: RouteLocationNormalized, from: RouteLocationNormalizedLoaded) => {
      // TODO: remove `to`, `from` if unused
      // TODO: don't init if it's redirect or quiz is in progress
      console.log('route - beforeEnter - before initState');
      await useTriviaStore().initState();
      console.log('route - beforeEnter - after initState');
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
