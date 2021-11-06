<!--
 * @Author: 阮志雄
 * @Date: 2021-10-15 15:27:07
 * @LastEditTime: 2021-11-03 22:48:02
 * @LastEditors: 阮志雄
 * @Description: 新增相机
 * @FilePath: \Protected-Area-Resources-Monitor-and-Management-System\src\views\camera-management\widgets\camera-add\index.vue
-->
<template>
  <div class="camera-sub-block">
    <back-bar @back="goBack" title="新增相机"></back-bar>
    <div class="config-block add-config-block">
      <h4 class="title">相机信息</h4>
      <p class="config-item">
        <span class="teil">相机IMEI码:</span>
        <el-input v-model="imeiVal" placeholder="相机IMEI码" style="width:220px"></el-input>
      </p>
      <p class="config-item">
        <span class="teil">保护区编号:</span>
        <el-input v-model="reserveId" placeholder="保护区编号" style="width:220px"></el-input>
      </p>
    </div>
    <div class="config-btn">
      <el-button type="primary" :disabled="!imeiVal" @click="addCarmera">新增</el-button>
      <el-button type="danger" @click="goBack">取消</el-button>
    </div>
  </div>
</template>

<script>
import { addCarmera } from '@/api'
import backBar from '../../components/backBar.vue'
export default {
  components: { backBar },
  data() {
    return {
      imeiVal: '',
      reserveId: ''
    }
  },
  methods: {
    addCarmera() {
      addCarmera({ imeiVal: this.imeiVal, reserveId: this.reserveId }).then(res => {
        res.code === 0 ? this.$message.success('新增相机成功') : this.$message.warning('新增异常')
        this.$emit('click-back', { status: true })
      })
    },
    goBack() {
      this.$emit('click-back', { status: false })
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
