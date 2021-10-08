import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import './plugins/day.js'
import './plugins/particles.js'
import '@/assets/scss/base.scss'
import plugin from '@/utils/install' // 全局组件
// 防抖节流全局指令
import Directives from './directive/index.js'
Vue.use(Directives)
Vue.use(plugin)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
