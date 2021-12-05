<template>
  <div class="animals-item">
    <div class="title">物种信息</div>
    <div class="analysis-content">
      <div class="left">
        <linBar :xAxis="xAxis" :yAxis="yAxis" height="284px" chartType="bar" :itemStyle="itemStyle"></linBar>
      </div>
      <div class="right">
        <pieChart height="284px" :data="data"></pieChart>
      </div>
    </div>
  </div>
</template>

<script>
import { findSpeciesNum, findCameraNum } from '@/api'
import { getToken } from '@/utils/auth'
import linBar from '@/components/echarts/lineBar'
import pieChart from '@/components/echarts/pieChart'
export default {
  components: { linBar, pieChart },
  data() {
    return {
      itemStyle: { barBorderRadius: [20, 20, 0, 0] },
      yAxis: [],
      xAxis: [],
      data: []
    }
  },
  mounted() {
    this.findSpeciesNum()
    this.findCameraNum()
  },
  methods: {
    findSpeciesNum() {
      findSpeciesNum({ reserveId: getToken('reserveId') }).then((res) => {
        const data = res.data.list
        data.forEach((element) => {
          this.yAxis.push(element.num)
          this.xAxis.push(element.title)
        })
      })
    },
    findCameraNum() {
      findCameraNum({ reserveId: getToken('reserveId') }).then((res) => {
        console.log(res)
        const data = res.data.list
        data.forEach((element) => {
          this.data.push({ value: element.num, name: element.imeiVal })
        })
      })
    }
  }
}
</script>
<style lang="scss">
.animals-item {
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  @include font_color(null);
  @include content-background();
  border-radius: 10px;
  @include box-shadow();
  .title {
    font-weight: bold;
    font-size: 19px;
  }
  .analysis-content {
    box-sizing: border-box;
    width: 100%;
    height: auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>
