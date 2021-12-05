<template>
  <div>
    <Chart :cdata="cdata" />
  </div>
</template>

<script>
import { findCameraNum } from '@/api'
import { getToken } from '@/utils/auth'
import Chart from './chart.vue'
export default {
  data() {
    return {
      cdata: {
        xData: ['test1', 'data2', 'data3', 'data4', 'data5', 'data6'],
        seriesData: [
          { value: 10, name: 'data1' },
          { value: 5, name: 'data2' },
          { value: 15, name: 'data3' },
          { value: 25, name: 'data4' },
          { value: 20, name: 'data5' },
          { value: 35, name: 'data6' }
        ]
      }
    }
  },
  components: {
    Chart
  },
  mounted() {
    this.findCameraNum()
  },
  methods: {
    findCameraNum() {
      findCameraNum({ reserveId: getToken('reserveId') }).then((res) => {
        this.cdata.xData = []
        this.cdata.seriesData = []
        let total = 0
        const data = res.data.list
        data.forEach((element) => {
          total += element.num
          this.cdata.xData.push(element.imeiVal)
          this.cdata.seriesData.push({ value: element.num, name: element.imeiVal })
        })
        this.$emit('getTotal', { todayNum: res.data.todayNum, total })
      })
    }
  }
}
</script>

<style lang="scss" scoped></style>
