<!--
 * @Author: 阮志雄
 * @Date: 2021-11-12 17:28:06
 * @LastEditTime: 2021-11-29 13:56:53
 * @LastEditors: 阮志雄
 * @Description: In User Settings Edit
 * @FilePath: \Protected-Area-Resources-Monitor-and-Management-System\src\views\analysis-big-screen\bottomRight.vue
-->
<template>
  <div id="bottomRight">
    <div class="bg-color-black">
      <div class="d-flex pt-2 pl-2">
        <span>
          <icon name="chart-area" class="text-icon"></icon>
        </span>
        <div class="d-flex">
          <span class="fs-xl text mx-2">每日拍摄照片数量统计图</span>
          <div class="decoration2">
            <dv-decoration-2 :reverse="true" style="width: 5px; height: 6rem" />
          </div>
        </div>
      </div>
      <div>
        <BottomRightChart />
      </div>
    </div>
  </div>
</template>

<script>
import BottomRightChart from './echart/bottom/bottomRightChart'
export default {
  components: {
    BottomRightChart
  }
}
</script>

<style lang="scss" class>
$box-height: 380px;
$box-width: 100%;
#bottomRight {
  padding: 14px 16px;
  height: $box-height;
  width: $box-width;
  border-radius: 5px;
  box-sizing: border-box;
  .bg-color-black {
    height: $box-height - 30px;
    border-radius: 10px;
  }
  .text {
    color: #c3cbde;
  }
  //下滑线动态
  .decoration2 {
    position: absolute;
    right: 0.125rem;
  }
  .chart-box {
    margin-top: 16px;
    width: 170px;
    height: 170px;
    .active-ring-name {
      padding-top: 10px;
    }
  }
}
</style>
