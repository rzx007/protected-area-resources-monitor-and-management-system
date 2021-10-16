<!--
 * @Author: 阮志雄
 * @Date: 2021-07-17 13:54:29
 * @LastEditTime: 2021-10-17 00:41:50
 * @LastEditors: 阮志雄
 * @Description: In User Settings Edit
 * @FilePath: \Protected-Area-Resources-Monitor-and-Management-System\src\views\area-management\index.vue
-->
<template>
  <div class="content areaMap">
    <home-map :isEdit="editMap" :isCreate='isCreate' :mapId="mapId" ref="map"></home-map>
    <div :class="[toggle ? '' : 'carmera-list-hidden', 'carmera-list']">
      <div class="toggle-button" title="收起" @click="toggle = !toggle">
        <i :class="[toggle ? 'el-icon-arrow-right' : 'el-icon-arrow-left']"></i>
      </div>
      <transition name="slide-fade">
        <camera-list v-show="level === 1" @click-area="clickArea" @click-add='aaddArea'></camera-list>
      </transition>
      <transition name="slide-fade">
        <camera-config v-if="level === 2" @click-back="goBack" :info="cameraObj" @click-edit="swithEdit"></camera-config>
      </transition>
      <transition name="slide-fade">
        <area-add v-if="level === 3" @click-back="cancelCreate"></area-add>
      </transition>
    </div>
  </div>
</template>

<script>
import homeMap from './widgets/map/index.vue'
import cameraList from './widgets/area-list/index.vue'
import cameraConfig from './widgets/area-config/index.vue'
import areaAdd from './widgets/area-add/index.vue'
export default {
  components: { homeMap, cameraList, cameraConfig, areaAdd },
  data() {
    return {
      toggle: true,
      level: 1, // 1 显示相机列表, 2显示相机详情, 3新增相机
      editMap: false,
      isCreate: false, // 新增
      mapId: ''
    }
  },
  methods: {
    // 点击相机
    clickArea(item) {
      this.level = 2
      this.cameraObj = item
    },
    swithEdit(bool) {
      this.editMap = bool
    },
    aaddArea() {
      this.level = 3
      this.isCreate = true
    },
    goBack() {
      // 详情返回自动关闭编辑功能
      this.level = 1
      this.editMap = false
      this.$refs.map.getPolygonPath()
    },
    cancelCreate() {
      this.level = 1
      this.isCreate = false
    }
  }
}
</script>
<style lang="scss">
.areaMap {
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
