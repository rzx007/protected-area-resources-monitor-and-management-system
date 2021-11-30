<template>
  <div class="content mapBox">
    <home-map @click-map-carmera="getMapCarmera" ref="map"></home-map>
    <div :class="[toggle ? '' : 'carmera-list-hidden', 'carmera-list']">
      <div class="toggle-button" title="收起" @click="toggle = !toggle">
        <i :class="[toggle ? 'el-icon-arrow-right' : 'el-icon-arrow-left']"></i>
      </div>
      <transition name="slide-fade">
        <camera-list v-show="level === 1" @click-camera="clickCamera"></camera-list>
      </transition>
      <transition name="slide-fade">
        <camera-config v-if="level === 2" @click-back="level = 1" :camera="cameraObj"></camera-config>
      </transition>
    </div>
  </div>
</template>

<script>
import homeMap from './widgets/map/index.vue'
import cameraList from './widgets/camera-list/index.vue'
import cameraConfig from './widgets/camera-config.vue'
export default {
  components: { homeMap, cameraList, cameraConfig },
  data() {
    return {
      toggle: true,
      level: 1 // 1 显示相机列表, 2显示相机详情
    }
  },
  methods: {
    // 点击相机
    clickCamera(item) {
      this.level = 2
      this.cameraObj = item
    },
    getMapCarmera(item) {
      this.level = 2
      this.cameraObj = item
    }
  }
}
</script>
<style lang="scss">
.mapBox {
  padding: 0;
  width: 100%;
  height: 100%;
  @include content-background();
  border-radius: 10px;
  position: relative;
  @include box-shadow();
  overflow: hidden;
  .carmera-list {
    min-width: 420px;
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
