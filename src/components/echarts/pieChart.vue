<!--
 * @Author: 阮志雄
 * @Date: 2021-08-26 13:41:18
 * @LastEditTime: 2021-12-04 23:12:16
 * @LastEditors: 阮志雄
 * @Description: In User Settings Edit
 * @FilePath: \Protected-Area-Resources-Monitor-and-Management-System\src\components\echarts\pieChart.vue
-->
<template>
  <div class="pie-main" :class="{ bordershadow: header }">
    <!-- <header class="title" v-if="header">{{ header }}</header> -->
    <div :id="randomId" :style="{ height }" class="pie-content"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts/core'
import { TitleComponent, TooltipComponent, LegendComponent } from 'echarts/components'
import { PieChart } from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'
echarts.use([TitleComponent, TooltipComponent, LegendComponent, PieChart, CanvasRenderer])

export default {
  data() {
    return {
      randomId: 'pie' + Math.random(),
      pieChart: null
    }
  },
  props: {
    chartType: {
      // 环形还是普通饼图
      type: String,
      default: 'circle',
      validator: function (value) {
        return ['', 'circle'].indexOf(value) !== -1
      }
    },
    data: {
      type: Array,
      default: function () {
        return [
          { value: 48, name: '狮子' },
          { value: 35, name: '狗' },
          { value: 80, name: '猫' },
          { value: 84, name: '鼠' },
          { value: 13, name: '虎' }
        ]
      }
    },
    legend: {
      type: Object,
      default: function () {
        return {
          bottom: 0,
          left: 'center',
          show: false
        }
      }
    },
    label: {
      type: Object,
      default: function () {
        return {
          position: 'outside',
          show: true
        }
      }
    },
    emphasis: {
      type: Object,
      default: function () {
        return {
          label: {
            show: true,
            formatter: '{b} \n {d}%'
          }
        }
      }
    },
    radius: {
      type: [String, Array]
    },
    title: {
      type: String,
      default: ''
    },
    header: {
      type: String,
      default: ''
    },
    height: {
      type: String,
      default: '217px'
    }
  },
  methods: {
    pieChartRender() {
      var _this = this
      var chartDom = document.getElementById(this.randomId)
      this.pieChart = echarts.init(chartDom)
      const option = {
        title: {
          text: _this.title,
          left: 'center',
          textStyle: {
            fontWeight: 'normal',
            fontSize: 14
          }
        },
        tooltip: {
          trigger: 'item'
        },
        legend: _this.legend,
        series: [
          {
            name: '',
            type: 'pie',
            radius: _this.radius ? _this.radius : _this.chartType === 'circle' ? ['40%', '70%'] : '70%',
            data: _this.data,
            avoidLabelOverlap: _this.chartType === 'circle' ? false : true,
            label: _this.label,
            emphasis: _this.emphasis,
            itemStyle: {
              borderRadius: 6,
              borderColor: '#fff',
              borderWidth: 2
            }
          }
        ]
      }
      option && this.pieChart.setOption(option)
    }
  },
  watch: {
    data: {
      handler: function (val) {
        this.pieChart.setOption({
         series:[{
           name: '',
           data: val
         }]
        })
      },
      deep: true
    }
  },
  mounted() {
    this.pieChartRender()
    window.addEventListener('resize', this.pieChart.resize)
  }
}
</script>
<style lang="scss" scoped>
.pie-main {
  width: 100%;
  margin-bottom: 12px;
  @include content-background();
  .pie-content {
    padding: 10px;
    width: 100%;
    box-sizing: border-box;
  }
}
.bordershadow {
  //  @include box-shadow();
}
</style>
