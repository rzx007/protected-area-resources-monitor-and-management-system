<template>
  <div>
    <Chart :cdata="cdata" />
  </div>
</template>

<script>
import { getToken } from '@/utils/auth'
import { findSpeciesNum } from '@/api'
import Chart from './chart.vue'
export default {
  data() {
    return {
      cdata: {
        category: [
          '狮子',
          '猫',
          '狗',
          '鸟',
          '虎',
          '鼠',
          '狮子',
          '猫',
          '狗',
          '鸟',
          '虎',
          '鼠',
          '狮子',
          '猫',
          '狗',
          '鸟',
          '虎',
          '鼠',
          '狮子',
          '猫',
          '狗',
          '鸟',
          '虎',
          '鼠',
          '狮子',
          '猫',
          '狗',
          '鸟',
          '虎',
          '鼠'
        ],
        lineData: [
          18092, 20728, 24045, 28348, 32808, 36097, 39867, 44715, 48444, 50415, 56061, 62677, 59521, 67560, 18092, 20728, 24045, 28348,
          32808, 36097, 39867, 44715, 48444, 50415, 36097, 39867, 44715, 48444, 50415, 50061, 32677, 49521, 32808
        ],
        barData: [
          4600, 5000, 5500, 6500, 7500, 8500, 9900, 12500, 14000, 21500, 23200, 24450, 25250, 33300, 4600, 5000, 5500, 6500, 7500, 8500,
          9900, 22500, 14000, 21500, 8500, 9900, 12500, 14000, 21500, 23200, 24450, 25250, 7500
        ],
        rateData: []
      }
    }
  },
  components: {
    Chart
  },
  created() {
    this.findSpeciesNum()
  },
  mounted() {
    this.setData()
  },
  methods: {
    // 根据自己的业务情况修改
    findSpeciesNum() {
      findSpeciesNum({ reserveId: getToken('reserveId') }).then((res) => {
        const data = res.data.list
        this.cdata.category = []
        this.cdata.lineData = []
        this.cdata.barData = []
        data.forEach((element) => {
          this.cdata.barData.push(element.num)
          this.cdata.lineData.push(element.num)
          this.cdata.category.push(element.title)
        })
        
      })
    },
    setData() {
      for (let i = 0; i < this.cdata.barData.length - 1; i++) {
        let rate = this.cdata.barData[i] / this.cdata.lineData[i]
        this.cdata.rateData.push(rate.toFixed(2))
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
