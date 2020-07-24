import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// charts
import VCharts from 'v-charts'
import location from '@/locations/location'
import commons from '@/locations/commons'
// element ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 公用样式
import '../public/css/index.css'
// 阿里图标库
import './assets/fonts/iconfont.css'
// 录音组件recorderx
import recorder from '@/recorderxs/recorder'

import qs from 'qs'
import axios from 'axios'
Vue.prototype.$qs = qs
Vue.prototype.$location = location
Vue.prototype.$commons = commons
Vue.prototype.$Recorderx = recorder

Vue.prototype.$axios = axios
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VCharts)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
