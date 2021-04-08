import { BasicLayout, UserLayout } from '@/layouts'

const RouteView = {
  name: 'RouteView',
  render: (h) => h('router-view'),
}

export const constantRouterMap = [
  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: '文本处理' },
    redirect: '/list/poem',
    children: [
      // dashboard
      {
        path: '/list',
        name: 'list',
        redirect: '/list/poem',
        component: RouteView,
        meta: { title: '句子', keepAlive: true, icon: 'dashboard' },
        children: [
          {
            path: '/list/poem',
            name: 'Poem',
            component: () => import('@/views/poem/poem'),
            meta: { title: '诗词', keepAlive: false },
          },
          {
            path: '/list/dynasty',
            name: 'Dynasty',
            component: () => import('@/views/dynasty/dynasty'),
            meta: { title: '朝代', keepAlive: false },
          },
        ],
      },
    ],
  },
  {
    path: '*', redirect: '/404', hidden: true,
  },
]

export const asyncRouterMap = [
]
