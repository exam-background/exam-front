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
// import recorder from '@/recorderxs/recorder'

import qs from 'qs'
import axios from 'axios'
Vue.prototype.$qs = qs
Vue.prototype.$location = location
Vue.prototype.$commons = commons
// Vue.prototype.$Recorderx = recorder

Vue.prototype.$axios = axios
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VCharts)
axios.defaults.headers.common['Authentication-Token'] = localStorage.getItem("userToken");

new Vue({
  router,
  store,
  render: h => h(App)
  , mounted() {
    if (this.timer) {
      clearInterval(this.timer)
    } else {
      this.timer = setInterval(() => {
        if ("/login" != this.$route.path) {
          //alert(localStorage.getItem('userToken'))
          const tokenData = this.$qs.stringify({
            'userToken': localStorage.getItem('userToken')
          })
          axios.post(this.$location.getUsersState, tokenData).then(response => {
            if (response.data.errorCode == '4002') {
              localStorage.removeItem("userToken");
              this.$notify.info({
                title: '提示',
                message: '登录验证已过期,请重新登录',
                duration: 0
              });
              this.$router.push("/")

            } else if (response.data.errorCode == '0') {

            }
          }).catch(error => {
            localStorage.removeItem("userToken");
            this.$notify.info({
              title: '提示',
              message: '登录验证已过期,请重新登录',
              duration: 0
            });
            this.$router.push("/")
          })
        }
      }, 10000);
    }
  },
  destroyed() {
    clearInterval(this.timer)
  }
}).$mount('#app')
