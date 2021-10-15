<!--
 * @Author: 阮志雄
 * @Date: 2021-10-15 15:27:07
 * @LastEditTime: 2021-10-15 15:39:20
 * @LastEditors: 阮志雄
 * @Description: 新增相机
 * @FilePath: \Protected-Area-Resources-Monitor-and-Management-System\src\views\camera-management\widgets\camera-add.vue
-->
<template>
  <div class="camera-sub-block">
    <back-bar @back="goBack" title="新增相机"></back-bar>
    <div class="config-block add-config-block">
      <h4 class="title">相机信息</h4>
      <p class="config-item">
        <span class="teil">相机编号:</span>
        <el-input v-model="name" placeholder="相机编号" style="width:220px"></el-input>
      </p>
      <p class="config-item">
        <span class="teil">相机型号:</span>
        <el-input v-model="name" placeholder="相机型号" style="width:220px"></el-input>
      </p>
    </div>
    <div class="config-btn">
      <el-button type="primary" :disabled="!name">新增</el-button>
      <el-button type="danger" @click="goBack">取消</el-button>
    </div>
  </div>
</template>

<script>
import backBar from '../components/backBar.vue'
export default {
  components: { backBar },
  data() {
    return {
      name: ''
    }
  },
  methods: {
    goBack() {
      this.$emit('click-back')
    }
  }
}
</script>
<style lang="scss">
.add-config-block {
  .config-item {
    line-height: 40px !important;
  }
}
</style>
