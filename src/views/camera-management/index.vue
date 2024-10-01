<template>
  <div class="content">
    <div class="carmera-main">
      <camera-map @click-map-carmera="getMapCarmera" ref="map"></camera-map>
      <div :class="[toggle ? '' : 'carmera-list-hidden', 'carmera-list']">
        <div class="toggle-button" title="收起" @click="toggle = !toggle">
          <i :class="[toggle ? 'el-icon-arrow-right' : 'el-icon-arrow-left']"></i>
        </div>
        <transition name="slide-fade">
          <camera-list
            ref="cameralists"
            v-show="level === 1"
            @click-camera="clickCamera"
            @click-recycle="clickRecycle"
            @click-deploy="clickDeploy"
            @click-task="clickTask"
            @click-add="addCamera"
          ></camera-list>
        </transition>
        <transition name="slide-fade">
          <camera-config v-if="level === 2" @click-back="level = 1" :camera="cameraObj"></camera-config>
        </transition>
        <transition name="slide-fade">
          <camera-deploy v-if="level === 3" @click-back="cancelDeploy" :camera="cameraObj"></camera-deploy>
        </transition>
        <transition name="slide-fade">
          <camera-recycle v-if="level === 4" @click-back="cancelRecycle" :camera="cameraObj"></camera-recycle>
        </transition>
        <transition name="slide-fade">
          <camera-setting v-if="level === 5" @click-back="cancelRecycle" :camera="cameraObj"></camera-setting>
        </transition>
        <transition name="slide-fade">
          <camera-add v-if="level === 6" @click-back="cancelAdd"></camera-add>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import cameraMap from './widgets/map/index.vue'
import cameraList from './widgets/camera-list/index.vue'
import cameraConfig from './widgets/camera-config/index.vue'
import cameraDeploy from './widgets/camera-deploy/index.vue'
import cameraRecycle from './widgets/camera-recycle/index.vue'
import CameraSetting from './widgets/camera-setting/index.vue'
import CameraAdd from './widgets/camera-add/index.vue'
import hub from '@/utils/bus'
export default {
  data() {
    return {
      toggle: true,
      cameraObj: {}, // 点击得相机队形集合
      level: 1 // 1 显示相机列表, 2显示相机详情 3显示相机部署 4显示相机回收 5相机任务下发 6添加相机
    }
  },
  components: { cameraMap, cameraList, cameraConfig, cameraDeploy, cameraRecycle, CameraSetting, CameraAdd },
  methods: {
    // 点击相机
    clickCamera(item) {
      this.level = 2
      this.cameraObj = item
       this.$refs.map.markerHandler(item)
    },
    // 点击回收
    clickRecycle(item) {
      this.level = 4
      this.cameraObj = item
    },
    cancelRecycle({ status }) {
      this.level = 1
      this.$nextTick(() => {
        if (status) {
          // 刷新相机列表，刷新地图
          this.$refs.cameralists.getCarmeraList()
          this.$refs.map.ajaxRefreshMarkers()
        }
      })
    },
    // 点击部署
    clickDeploy(item) {
      this.level = 3
      this.cameraObj = item
      this.$refs.map.addDeployCamera(item)
    },
    cancelDeploy({ status }) {
      this.level = 1
      this.$nextTick(() => {
        if (status) {
          // 刷新相机列表，刷新地图
          this.$refs.cameralists.getCarmeraList()
          this.$refs.map.ajaxRefreshMarkers()
        }
        this.$refs.map.cancelDeployCamera(this.cameraObj)
      })
    },
    // 新增相机
    cancelAdd({ status }) {
      this.level = 1
      this.$nextTick(() => {
        status && this.$refs.cameralists.getCarmeraList()
      })
    },
    clickTask(item) {
      this.cameraObj = item
      this.level = 5
    },
    addCamera() {
      this.level = 6
    },
    getMapCarmera(item) {
      this.level = 2
      this.cameraObj = item
    }
  }
}
</script>
<style lang="scss">
.carmera-main {
  width: 100%;
  height: 100%;
  @include content-background();
  border-radius: 10px;
  position: relative;
  @include box-shadow();
  overflow: hidden;
  #carmera-map {
    width: 100%;
    height: 100%;
    border-radius: 10px;
  }
  .carmera-list {
    width: auto;
    height: 85vh;
    position: absolute;
    right: 30px;
    top: 50%;
    transform: translateY(-50%);
    background-color: rgba(255, 255, 255, 0.65);
    backdrop-filter: blur(20px);
    z-index: 10;
    border-radius: 14px;
    @include box-shadow();
    transition: all 0.6s ease-in-out;
    .toggle-button {
      position: absolute;
      top: 50%;
      left: -20px;
      transform: translateY(-50%);
      background-color: rgba(255, 255, 255, 0.9);
      backdrop-filter: blur(20px);
      width: 20px;
      height: 50px;
      border-top-left-radius: 8px;
      border-bottom-left-radius: 8px;
      z-index: -1;
      text-align: center;
      line-height: 50px;
      @include font_color(null);
      cursor: pointer;
      &:hover {
        background-color: #3385ff;
        color: #fff;
      }
    }
  }
  .carmera-list-hidden {
    transform: translate(100%, -50%);
  }
}
</style>
