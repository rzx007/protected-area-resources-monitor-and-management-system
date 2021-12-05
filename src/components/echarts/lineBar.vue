<!--
 * @Author: 阮志雄
 * @Date: 2021-08-26 13:41:03
 * @LastEditTime: 2021-12-04 23:06:44
 * @LastEditors: 阮志雄
 * @Description: In User Settings Edit
 * @FilePath: \Protected-Area-Resources-Monitor-and-Management-System\src\components\echarts\lineBar.vue
-->
<template>
  <div class="line-main">
    <!-- <header class="title">{{ title }}</header> -->
    <div :id="randomId" :style="{ height }" class="bar-content"></div>
    <iframe class="chart-resize" :id="iframeId"></iframe>
  </div>
</template>

<script>
import * as echarts from 'echarts/core'
import {
  DatasetComponent,
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  MarkAreaComponent,
  LegendComponent,
  DataZoomComponent,
  MarkLineComponent,
  MarkPointComponent
} from 'echarts/components'
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
  ToolboxComponent,
  DataZoomComponent,
  MarkLineComponent,
  MarkAreaComponent,
  MarkPointComponent
])
export default {
  data() {
    return {
      iframeId: 'iframe' + Math.random(),
      randomId: 'bar' + Math.random(),
      barChart: null,
      markPoint: {
        data: [
          { type: 'max', name: 'Max' },
          { type: 'min', name: 'Min' }
        ]
      },
      markLine: {
        data: [{ type: 'average', name: 'Avg' }]
      },
      lineStyle: {
        width: 1
      }
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
        return []
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
        return []
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
    dataZoom: {
      type: Boolean,
      default: false
    },
    unit: {
      type: String,
      default: '张'
    },
    showPoint: {
      type: Boolean,
      default: false
    },
    markArea: {
      type: Object,
      default: function() {
        return { data: [] }
      }
    },
    colors: {
      type: Array,
      default: function() {
        return ['#0098d9', '#e6b600', '#c12e34', '#72ccff', '#d87a80', '#8d98b3', '#e5cf0d', '#97b552', '#95706d']
      }
    },
    formatter: {
      type: Function,
      default: function(params) {
       
        if (Array.isArray(params)) {
          let str = ''
          for (let index = 0; index < params.length; index++) {
            const element = params[index]
             console.log(element);
            const data = element.data
             str += `<div>${element.name} :${element.value}</div>`
          }
          return str
        }
      }
    }
  },
  methods: {
    barChartRender() {
      var _this = this
      var chartDom = document.getElementById(this.randomId)
      this.barChart = echarts.init(chartDom)
      let series = this.setSeries()
      const option = {
        // color: _this.colors,
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          },
          formatter: _this.formatter
        },
        legend: {
          data: _this.legend,
          textStyle: {
            color: 'rgba(190,176,176,1)'
          }
        },
        dataZoom: _this.getDataZoom(),
        grid: {
          left: '3%',
          right: '4%',
          bottom: '16%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: _this.xAxis
        },
        yAxis: {
          type: 'value',
          name: _this.unit,
          splitLine: {
            show: false
          },
          min: function(value) {
            return value.min - 1
          },
          max: function(value) {
            return value.max
          }
        },
        series
      }
      option && this.barChart.setOption(option)
    },
    getDataZoom() {
      let option = []
      if (this.dataZoom) {
        option = [
          { type: 'inside', start: 0, end: 100 },
          { start: 0, end: 100 }
        ]
      }
      return option
    },
    setSeries() {
      let series = [],
        _this = this
      const markPoint = _this.showPoint ? _this.markPoint : {}
      const markLine = _this.showPoint ? _this.markLine : {}
      // const areaStyle = { areaStyle: {}, emphasis: { focus: 'series' } }
      const restSeries = {
        lineStyle: _this.lineStyle,
        markArea: _this.markArea,
        showSymbol: false,
        type: _this.chartType,
        markPoint,
        markLine
      }
      for (let index = 0; index < _this.yAxis.length; index++) {
        const item = _this.yAxis[index]
        if (Array.isArray(item)) {
          series.push({
            name: _this.legend[index],
            data: item,
            ...restSeries
          })
        } else {
          series = [{ name: _this.legend[0], data: _this.yAxis, ...restSeries }]
          break
        }
      }
      return series
    }
  },
  watch: {
    colors: {
      handler: function() {
        this.barChart.setOption({ color: this.colors })
      },
      deep: true
    },
    yAxis: {
      handler: function() {
        let series = this.setSeries()
        this.barChart.setOption({
          xAxis: {
            type: 'category',
            data: this.xAxis
          },
          series
        })
      },
      deep: true
    }
  },
  // destroyed() {
  //   var chartDom = document.getElementById(this.randomId)
  //   this.barChart = echarts.init(chartDom).dispose()
  // },
  mounted() {
    this.barChartRender()
    const iframeWindow = document.getElementById(this.iframeId).contentWindow
    iframeWindow.addEventListener('resize', this.barChart.resize)
  }
}
</script>
<style lang="scss">
.line-main {
  border: 1px solid transparent;
  @include content-background();
  margin-bottom: 12px;
  // @include box-shadow();
  @include border-color();
  position: relative;
  padding: 10px;
  .bar-content {
    width: 100%;
  }
  .chart-resize {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    left: 0;
    visibility: hidden;
  }
}
</style>
