import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index.js'
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
    meta: [{
      parentName: '',
      name: '登录',
      keepAlive: false, //此组件不需要被缓存
      isBack: false, //用于判断上一个页面是哪个
    }]
  },
  {
    // 学生基础信息
    path: '/Stu',
    meta: [{
      parentName: '',
      name: '学生基础信息',
      keepAlive: false, //此组件不需要被缓存
    }],
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
      },
      {
        path: 'PapersUserResult',
        component: () => import('../components/PapersUserResult')
      }
    ]
  }
]
if (localStorage.getItem('userToken')) {
   //this.store.commit('set_token', localStorage.getItem('userToken'))
    store.commit("set_token",localStorage.getItem('userToken'));
    console.log("-------------localStorage="+localStorage.getItem('userToken'));
}
const router = new VueRouter({
  routes
})
router.beforeEach(function(to, from, next) {
  //alert("from"+from.path+"to"+to.path)
  if (from.path.indexOf('/Stu') != -1) {
  if (to.path == '/login') {
   // alert("shanima");
  //from. //修改为false
  from.meta.keepAlive = false;
  next()

  } else {

  next()

  }

  } else {

  next()

  }
  console.log('--' + localStorage.getItem('userToken') + to.path)
  if (!localStorage.getItem('userToken')) {
    if (to.path !== '/login') {
      return next('/login')
    }
  }
  next()
})
export default router
