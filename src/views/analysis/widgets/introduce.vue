<template>
  <div class="analysis-item">
    <div class="title">保护区介绍</div>
    <div class="analysis-content">
      {{ remark }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  props: {
    remark: {
      type: String,
      default: ''
    }
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
    height: 200px;
    overflow: auto;
  }
}
</style>
