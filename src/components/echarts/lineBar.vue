<!--
 * @Author: 阮志雄
 * @Date: 2021-08-26 13:41:03
 * @LastEditTime: 2021-11-29 12:19:14
 * @LastEditors: 阮志雄
 * @Description: In User Settings Edit
 * @FilePath: \Protected-Area-Resources-Monitor-and-Management-System\src\components\echarts\lineBar.vue
-->
<template>
  <div class="line-main">
    <div :id="randomId" :style="{ height }" class="bar-content"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts/core'
import { DatasetComponent, TitleComponent,ToolboxComponent, TooltipComponent, GridComponent, LegendComponent } from 'echarts/components'
import { BarChart, LineChart } from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'

echarts.use([
  DatasetComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  BarChart,
  LineChart,
  TitleComponent,
  CanvasRenderer,
  ToolboxComponent
])

export default {
  data() {
    return {
      randomId: 'bar' + Math.random(),
      barChart: null
    }
  },
  props: {
    chartType: {
      // 折线图还是曲线图
      type: String,
      default: 'line',
      validator: function(value) {
        return ['bar', 'line'].indexOf(value) !== -1
      }
    },
    xAxis: {
      type: Array,
      default: function() {
        return ['狮子', '猫', '狗', '鸟', '虎', '鼠']
      }
    },
    yAxis: {
      type: Array,
      default: () => {
        return [
          [182, 234, 290, 100, 131, 230],
          [180, 204, 268, 97, 130, 200]
        ]
      }
    },
    legend: {
      type: Array,
      default: () => {
        return ['总数', '投运']
      }
    },
    title: {
      type: String,
      default: '折线图'
    },
    height: {
      type: String,
      default: '210px'
    },
    itemStyle: {
      type:Object,
      default: function(){
        return {}
      }
    }
  },
  methods: {
    barChartRender() {
      var _this = this
      var chartDom = document.getElementById(this.randomId)
      this.barChart = echarts.init(chartDom)
      let series = []
      // const areaStyle = { areaStyle: {}, emphasis: { focus: 'series' } }
      const areaStyle = {}
      for (let index = 0; index < _this.yAxis.length; index++) {
        const item = _this.yAxis[index]
        if (Array.isArray(item)) {
          series.push({ name: _this.legend[index], type: _this.chartType, data: item, itemStyle: _this.itemStyle, ...areaStyle, })
        } else {
          series = [{ type: _this.chartType, data: _this.yAxis, itemStyle: _this.itemStyle, ...areaStyle }]
          break
        }
      }
      const option = {
        // title: {
        //   text: '世界人口总量',
        //   subtext: '数据来自网络'
        // },
        color: ['#5470c6','#91cc75', '#ffb980',  '#5ab1ef','#d87a80', '#8d98b3', '#e5cf0d', '#97b552', '#95706d'],
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: _this.legend
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '6%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: _this.xAxis
        },
        yAxis: {
          type: 'value'
        },
        series
      }
      option && this.barChart.setOption(option)
    }
  },
  updated() {
    var chartDom = document.getElementById(this.randomId)
    this.barChart = echarts.init(chartDom).dispose()
    this.barChartRender()
  },
  mounted() {
    this.barChartRender()
    window.addEventListener('resize', this.barChart.resize)
  }
}
</script>
<style lang="scss">
.line-main {
  // border: 1px solid transparent;
  @include content-background();
  // margin-bottom: 12px;
  // @include box-shadow();
  // @include border-color();
  .bar-content {
    width: 100%;
  }
}
</style>
