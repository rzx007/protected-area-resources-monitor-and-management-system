<template>
  <div class="camera-sub-block">
    <back-bar @back="goBack" title="相机部署"></back-bar>
    <div class="anas-block">
      <p class="sub-title">
        设备编号：<span>{{ camera.imeival }}</span>
      </p>
      <p class="sub-title">
        布设时间：<span>{{ camera.inUseTime }}</span>
      </p>
    </div>
    <el-alert style="margin-top:12px" title="在保护区地图左键选中部署位置" type="warning"> </el-alert>
    <div class="config-block">
      <h4 class="title">相机信息</h4>
      <p class="config-item">
        <span class="teil">相机编号：</span><span class="sub-teil">{{ camera.imeival }}</span>
      </p>
      <p class="config-item">
        <span class="teil">相机电量：</span><span class="sub-teil">{{ camera.batteryVal }}</span>
      </p>
      <p class="config-item">
        <span class="teil">存储容量:</span><span class="sub-teil">{{ camera.sdTotalSpaceVal }}</span>
      </p>
      <p class="config-item">
        <span class="teil">相机位置：</span><span class="sub-teil">{{ lnglat.join(',') }}</span>
      </p>
      <p class="config-item">
        <span class="teil">指定部署人员:</span>
        <el-select v-model="name" placeholder="部署人员" filterable>
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
        </el-select>
      </p>
    </div>
    <div class="config-btn">
      <el-button type="primary" :disabled="!name || lnglat.length < 1" @click="postDeploy">确定</el-button>
      <el-button type="danger" @click="goBack">取消</el-button>
    </div>
  </div>
</template>

<script>
import { FixUp } from '@/api'
import hub from '@/utils/bus'
import backBar from '../../components/backBar.vue'
export default {
  components: { backBar },
  data() {
    return {
      name: 1,
      lnglat: [],
      options: []
    }
  },
  props: {
    camera: {
      type: Object,
      default: function() {
        return { id: '' }
      }
    }
  },
  mounted() {
    hub.$on('deploy-lnglat', lnglat => {
      this.lnglat = lnglat
    })
  },
  methods: {
    goBack() {
      this.$emit('click-back', { status: false, camera: this.camera })
    },
    postDeploy() {
      FixUp({
        cameraId: this.camera.id,
        userId: this.name,
        lng: this.lnglat[0].toString(),
        lat: this.lnglat[1].toString()
      }).then(res => {
        this.$emit('click-back', { status: true, camera: this.camera })
        res.code === 0 ? this.$message.success('部署任务已下发') : this.$message.warning('部署任务异常')
      })
    }
  }
}
</script>
<style lang="scss"></style>
