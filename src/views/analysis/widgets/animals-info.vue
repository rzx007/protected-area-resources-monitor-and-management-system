<!--
 * @Author: 阮志雄
 * @Date: 2021-10-16 13:09:24
 * @LastEditTime: 2021-11-29 12:19:24
 * @LastEditors: 阮志雄
 * @Description: In User Settings Edit
 * @FilePath: \Protected-Area-Resources-Monitor-and-Management-System\src\views\analysis\widgets\animals-info.vue
-->
<template>
  <div class="animals-item">
    <div class="title">物种信息</div>
    <div class="analysis-content">
      <div class="left">
        <linBar height="284px" chartType="bar"  :itemStyle="itemStyle"></linBar>
      </div>
      <div class="right">
        <pieChart height="284px"></pieChart>
      </div>
    </div>
  </div>
</template>

<script>
import linBar from '@/components/echarts/lineBar'
import pieChart from '@/components/echarts/pieChart'
export default {
  components: { linBar, pieChart },
  data() {
    return {
      itemStyle: { barBorderRadius: [20, 20, 0, 0] }
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
