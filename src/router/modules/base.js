export default [
  {
    path: '/audio',
    name: 'audio',
    component: () => import('views/audio/audioPage.vue'),
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('views/search/search.vue'),
  },
]