<!--
 * @Author: 阮志雄
 * @Date: 2021-10-15 13:59:44
 * @LastEditTime: 2021-10-15 14:26:17
 * @LastEditors: 阮志雄
 * @Description: In User Settings Edit
 * @FilePath: \Protected-Area-Resources-Monitor-and-Management-System\src\views\camera-management\components\backBar.vue
-->
<template>
  <div class="back-block">
    <i class="back-btn el-icon-back" @click="goBack" title="返回"></i>
    <span class="title">{{ title }}</span>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  props: ['title'],
  methods: {
    goBack() {
      this.$emit('back')
    }
  }
}
</script>
<style lang="scss">
.back-block {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  margin-bottom: 28px;
  .title {
    font-size: 20px;
    margin-left: 12px;
    letter-spacing: 2px;
  }
  .back-btn {
    font-size: 26px;
    font-weight: 600;
    cursor: pointer;
  }
}
</style>
