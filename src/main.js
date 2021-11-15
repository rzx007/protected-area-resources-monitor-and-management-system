import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import dataV from '@jiaminghi/data-view';
import './plugins/element.js'
import './plugins/day.js'
import '@/assets/scss/base.scss'
import plugin from '@/utils/install' // 全局组件
import '@/assets/fonts/iconfont.css'

// 按需引入vue-awesome图标
import Icon from 'vue-awesome/components/Icon';
import 'vue-awesome/icons/chart-bar.js';
import 'vue-awesome/icons/chart-area.js';
import 'vue-awesome/icons/chart-pie.js';
import 'vue-awesome/icons/chart-line.js';
import 'vue-awesome/icons/align-left.js';
// 防抖节流全局指令
import Directives from './directive/index.js'
Vue.use(Directives)
Vue.use(plugin)
Vue.use(dataV);
Vue.component('icon', Icon);

import * as echarts from 'echarts'
Vue.prototype.$echarts = echarts
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
