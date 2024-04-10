/*
Maybe you want to add another options to vue router
*/

const routes = [
  {
    path: '/',
    name: 'PageIndex',
    component: () => import('@/pages/PageIndex/PageIndex.vue'),
  },
]

export {
  routes,
}
