<!--
 * @Author: 阮志雄
 * @Date: 2021-10-16 13:09:24
 * @LastEditTime: 2021-10-16 15:35:28
 * @LastEditors: 阮志雄
 * @Description: In User Settings Edit
 * @FilePath: \Protected-Area-Resources-Monitor-and-Management-System\src\views\analysis\widgets\introduce.vue
-->
<template>
  <div class="analysis-item">
    <div class="title">保护区介绍</div>
    <div class="analysis-content">
      神农架国家级自然保护区位于湖北省西北部，神农架林区的西南部，地理位置为东经110°03′05″～110°33′50″，北纬31°21′20″～31°36′20″，地处湖北省、重庆市交接的长江、汉水之间，全区土地总面积105.28万亩
      [1] 。主要保护对象为北亚热带山地森林生态系统及特有、珍稀物种，如栱桐、金丝猴等
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  }
}
</script>
<style lang="scss">
.analysis-item {
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
    text-indent: 12px;
    padding: 12px 0;
    line-height: 24px;
    box-sizing: border-box;
    width: 100%;
    max-height:200px;
    overflow: auto;
  }
}
</style>
