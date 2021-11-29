<!--
 * @Author: 阮志雄
 * @Date: 2021-11-12 17:30:18
 * @LastEditTime: 2021-11-29 13:59:40
 * @LastEditors: 阮志雄
 * @Description: In User Settings Edit
 * @FilePath: \Protected-Area-Resources-Monitor-and-Management-System\src\views\analysis-big-screen\echart\centerLeft\centerLeft1Chart\index.vue
-->
<template>
  <div>
    <Chart :cdata="cdata" />
  </div>
</template>

<script>
import Chart from './chart.vue';
export default {
  data () {
    return {
      cdata: {
        xData: ["test1", "data2", "data3", "data4", "data5", "data6"],
        seriesData: [
          { value: 10, name: "data1" },
          { value: 5, name: "data2" },
          { value: 15, name: "data3" },
          { value: 25, name: "data4" },
          { value: 20, name: "data5" },
          { value: 35, name: "data6" }
        ]
      }
    }
  },
  components: {
    Chart,
  },
  mounted () {
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
</style>