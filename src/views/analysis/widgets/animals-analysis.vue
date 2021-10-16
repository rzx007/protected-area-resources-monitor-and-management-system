<!--
 * @Author: 阮志雄
 * @Date: 2021-10-16 13:09:24
 * @LastEditTime: 2021-10-16 16:37:21
 * @LastEditors: 阮志雄
 * @Description: In User Settings Edit
 * @FilePath: \Protected-Area-Resources-Monitor-and-Management-System\src\views\analysis\widgets\animals-analysis.vue
-->
<template>
  <div class="animals-item">
    <div class="title">动物统计</div>
    <div class="analysis-content">
      <div class="left">
        
      </div>
      <div class="right">
        <pieChart height="284px"></pieChart>
      </div>
    </div>
  </div>
</template>

<script>
import pieChart from '@/components/echarts/pieChart'
export default {
  components: { pieChart },
  data() {
    return {}
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
    .left {
      width: 65%;
    }
    .right {
      flex: 1;
    }
  }
}
</style>
