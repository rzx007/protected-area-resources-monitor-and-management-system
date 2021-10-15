<!--
 * @Author: 阮志雄
 * @Date: 2021-10-15 11:35:02
 * @LastEditTime: 2021-10-15 14:39:00
 * @LastEditors: 阮志雄
 * @Description: 相机部署
 * @FilePath: \Protected-Area-Resources-Monitor-and-Management-System\src\views\camera-management\widgets\camera-deploy.vue
-->
<template>
  <div class="camera-sub-block">
    <back-bar @back="goBack" title="相机部署"></back-bar>
    <div class="anas-block">
      <p class="sub-title">
        设备编号：<span>{{ info.id }}</span>
      </p>
      <p class="sub-title">
        布设时间：<span>{{ info.inUseTime }}</span>
      </p>
    </div>
     <div class="config-block">
      <h4 class="title">相机信息</h4>
      <p class="config-item">
        <span class="teil">相机编号：</span><span class="sub-teil">{{ info.id }}</span>
      </p>
      <p class="config-item"><span class="teil">相机型号：</span><span class="sub-teil">HW101</span></p>
      <p class="config-item">
        <span class="teil">指定部署人员:</span>
        <el-select v-model="name" placeholder="部署人员" filterable>
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
        </el-select>
      </p>
    </div>
    <div class="config-btn">
      <el-button type="primary" :disabled='!name'>确定</el-button>
      <el-button type="danger" @click="goBack">取消</el-button>
    </div>
  </div>
</template>

<script>
import backBar from '../components/backBar.vue'
export default {
  components: { backBar },
  data() {
    return {}
  },
  props: {
    info: {
      type: Object,
      default: function() {
        return { id: '' }
      }
    }
  },
  methods: {
    goBack() {
      this.$emit('click-back')
    }
  }
}
</script>
<style lang="scss"></style>
