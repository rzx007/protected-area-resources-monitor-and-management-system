<template>
  <div id="index" ref="appRef" :class="{ fullIndex: isFull }">
    <svg-icon type="css" @click="isFull = !isFull" icon="quanping" class="full-iocn" title="全屏展示"></svg-icon>
    <div class="bg">
      <dv-loading v-if="loading">Loading...</dv-loading>
      <div v-else class="host-body">
        <header class="header-block">
          <div class="d-flex jc-center">
            <dv-decoration-10 class="dv-dec-10" />
            <div class="d-flex jc-center">
              <dv-decoration-8 class="dv-dec-8" :color="['#568aea', '#000000']" />
              <div class="title">
                <span class="title-text">保护区可视化分析平台</span>
                <dv-decoration-6 class="dv-dec-6" :reverse="true" :color="['#50e3c2', '#67a1e5']" />
              </div>
              <dv-decoration-8 class="dv-dec-8" :reverse="true" :color="['#568aea', '#000000']" />
            </div>
            <dv-decoration-10 class="dv-dec-10-s" />
          </div>
          <!-- 第二行 -->
          <div class="d-flex jc-between px-2">
            <div class="d-flex aside-width">
              <div class="react-left ml-4 react-l-s">
                <span class="react-before"></span>
                <span class="text">数据分析</span>
              </div>
            </div>
            <div class="d-flex aside-width">
              <div class="react-right mr-3">
                <span class="text fw-b"></span>
              </div>
              <div class="react-right mr-4 react-l-s">
                <span class="react-after"></span>
                <span class="text">{{ dateYear }} {{ dateWeek }} {{ dateDay }}</span>
              </div>
            </div>
          </div>
        </header>

        <div class="body-box">
          <!-- 第三行数据 -->
          <div class="content-box">
            <div>
              <dv-border-box-12>
                <centerLeft1 />
              </dv-border-box-12>
            </div>
            <!-- <div>
              <dv-border-box-12>
                <centerLeft2 />
              </dv-border-box-12>
            </div> -->
            <!-- 中间 -->
            <div>
              <center />
            </div>
            <!-- 中间 -->
            <div>
              <centerRight2 />
            </div>
            <div>
              <dv-border-box-13>
                <centerRight1 />
              </dv-border-box-13>
            </div>
          </div>

          <!-- 第四行数据 -->
          <div class="bototm-box">
            <dv-border-box-13>
              <bottomLeft />
            </dv-border-box-13>
            <dv-border-box-12>
              <bottomRight />
            </dv-border-box-12>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import drawMixin from './mixin/drawMixin'
import { formatTime } from '@/utils/filters.js'
import centerLeft1 from './centerLeft1'
import centerLeft2 from './centerLeft2'
import centerRight1 from './centerRight1'
import centerRight2 from './centerRight2'
import center from './center'
import bottomLeft from './bottomLeft'
import bottomRight from './bottomRight'

export default {
  // mixins: [ drawMixin ],
  data() {
    return {
      isFull: false,
      timing: null,
      loading: true,
      dateDay: null,
      dateYear: null,
      dateWeek: null,
      weekday: ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
    }
  },
  components: {
    centerLeft1,
    centerLeft2,
    centerRight1,
    centerRight2,
    center,
    bottomLeft,
    bottomRight
  },
  mounted() {
    this.timeFn()
    this.cancelLoading()
  },
  unMounted() {
    clearInterval(this.timing)
  },
  methods: {
    timeFn() {
      this.timing = setInterval(() => {
        this.dateDay = formatTime(new Date(), 'HH: mm: ss')
        this.dateYear = formatTime(new Date(), 'yyyy-MM-dd')
        this.dateWeek = this.weekday[new Date().getDay()]
      }, 1000)
    },
    cancelLoading() {
      setTimeout(() => {
        this.loading = false
      }, 500)
    }
  }
}
</script>

<style lang="scss">
@import './scss/index.scss';
.full-iocn {
  position: absolute;
  right: 28px;
  top: 28px;
  z-index: 10;
  font-size: 20px;
  cursor: pointer;
}
</style>
