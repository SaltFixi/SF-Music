import { createRouter, createWebHistory } from 'vue-router';

// 自动导入modules下的路由
let modulesRoutes = []
const modules = import.meta.globEager('./modules/*.js')
Object.keys(modules).forEach((fileName) => {
  modulesRoutes.push(...modules[fileName].default)
})

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/home/home.vue'),
    meta: {
      title: '首页'
    }
  },
  {
    path: '/video',
    name: 'video',
    component: () => import('../views/video/video.vue'),
    meta: {
      title: '视频彩铃'
    }
  },
  {
    path: '/piazza',
    name: 'piazza',
    component: () => import('../views/piazza/piazza.vue'),
    meta: {
      title: 'DIY广场'
    }
  },
  {
    path: '/mine',
    name: 'mine',
    component: () => import('../views/mine/mine.vue'),
    meta: {
      title: '我的'
    }
  },
  ...modulesRoutes
]

export default createRouter({
  history: createWebHistory(),
  routes
})

