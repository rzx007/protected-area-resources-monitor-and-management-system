<template>
  <div class="camera-sub-block">
    <back-bar @back="goBack" title="相机回收"></back-bar>
    <div class="anas-block">
      <p class="sub-title">
        设备编号：<span>{{ camera.imeival }}</span>
      </p>
      <p class="sub-title">
        布设时间：<span>{{ camera.inUseTime }}</span>
      </p>
    </div>
    <div class="config-block">
      <h4 class="title">相机信息</h4>
      <p class="config-item">
        <span class="teil">相机编号：</span><span class="sub-teil">{{ camera.imeival }}</span>
      </p>
      <p class="config-item"><span class="teil">地理位置：:</span><span class="sub-teil">{{camera.longitudeVal}}~{{camera.latitudeVal}}</span></p>
      <p class="config-item"><span class="teil">相机电量：</span><span class="sub-teil">{{camera.batteryVal}}</span></p>
      <p class="config-item"><span class="teil">存储余量:</span><span class="sub-teil">{{camera.sdTotalSpaceVal - camera.sdUsedpaceVal}}</span></p>
      <p class="config-item"><span class="teil">布控时间：</span><span class="sub-teil">{{camera.setTime}}</span></p>
      <p class="config-item"><span class="teil">计划回收时间:</span><span class="sub-teil">{{camera.backTime}}</span></p>
      <p class="config-item">
        <span class="teil">指定回收人员:</span>
        <el-select v-model="name" placeholder="回收人员" filterable>
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
        </el-select>
      </p>
    </div>
    <div class="config-btn">
      <el-button type="primary" :disabled="!name" @click="psotRecycle()">确定</el-button>
      <el-button type="danger" @click="goBack">取消</el-button>
    </div>
  </div>
</template>
<script>
import { FixDown } from '@/api'
import backBar from '../../components/backBar.vue'
export default {
  components: { backBar },
  data() {
    return {
      name: '',
      options: [{ label: 'ben', value: '1' }]
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
  methods: {
    goBack() {
      this.$emit('click-back', { status: false, camera: this.camera })
    },
    psotRecycle() {
      FixDown({ cameraId: this.camera.id, userId: this.name }).then(res => {
        res.code === 0 ? this.$message.success('回收任务已下发') : this.$message.warning('回收任务异常')
        this.$emit('click-back', { status: true, camera: this.camera })
      })
    }
  }
}
</script>
<style lang="scss">
.config-item {
  line-height: 30px;
  font-size: 13px;
  span {
    display: inline-block;
  }
  .teil {
    width: 120px;
    letter-spacing: 2px;
    text-align: start;
  }
  .sub-teil {
    font-size: 17px;
    font-weight: 600;
  }
}
</style>
