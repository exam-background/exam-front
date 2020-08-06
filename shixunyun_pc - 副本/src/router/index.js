import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/fb',
    component: () => import('../components/ue.vue')
  },
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: login => require(['@/components/Login.vue'], login),
    meta: [{ parentName: '', name: '登录' }]
  },
  {
    // 学生基础信息
    path: '/Stu',
    meta: [{ parentName: '', name: '学生基础信息' }],
    component: () => import('../views/Stu.vue'),
    children: [
      {
        path: '',
        redirect: 'Class'
      },
      {
        path: 'Class',
        component: () => import('../components/Class')
      },
      {
        path: 'Stu',
        component: () => import('../components/Student')
      },
      {
        path: 'Zhuan',
        component: () => import('../components/Zhuan')
      },
      {
        path: 'MeiRi',
        component: () => import('../components/MeiRi')
      },
      {
        path: 'User',
        component: () => import('../components/User')
      },
      {
        path: 'ShiFan',
        component: () => import('../components/ShiFan')
      },
      {
        path: 'JiuYe',
        component: () => import('../components/JiuYe')
      },
      {
        path: 'KeMu',
        component: () => import('../components/KeMu')
      },
      {
        path: 'Teacher',
        component: () => import('../components/Teacher')
      },
      {
        path: 'TeacherGuan',
        component: () => import('../components/TeacherGuan')
      },
      {
        path: 'TeaQuan',
        component: () => import('../components/TeaQuan')
      },
      {
        path: 'MeiRiTwo',
        component: () => import('../components/MeiRiTwo')
      },
      {
        path: 'JiShu',
        component: () => import('../components/JiShu')
      },
      {
        path: 'Quan',
        component: () => import('../components/Quan')
      },
      {
        path: 'ZiDian',
        component: () => import('../components/ZiDian')
      },
      {
        path: 'CuoTi',
        component: () => import('../components/CuoTi')
      },
      {
        path: 'ZhongDianStu',
        component: () => import('../components/ZhongDianStu')
      },
      {
        path: 'ClassKaoHe',
        component: () => import('../components/ClassKaoHe')
      },
      {
        path: 'ClassXunLian',
        component: () => import('../components/ClassXunLian')
      },
      {
        path: 'voice',
        component: () => import('../components/voice')
      },
      {
        path: 'Role',
        component: () => import('../components/Role')
      },
      {
        path: 'Papers',
        component: () => import('../components/Papers')
      },
      {
        path: 'PapersTitle',
        component: () => import('../components/PapersTitle')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})
router.beforeEach(function (to, from, next) {
  console.log('--' + localStorage.getItem('loginName') + to.path)
  if (!localStorage.getItem('loginName')) {
    if (to.path !== '/login') {
      return next('/login')
    }
  }
  next()
})
export default router
