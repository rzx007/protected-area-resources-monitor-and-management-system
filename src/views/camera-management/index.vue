<!--
 * @Author: 阮志雄
 * @Date: 2021-10-11 11:39:09
 * @LastEditTime: 2021-10-14 00:01:53
 * @LastEditors: 阮志雄
 * @Description: In User Settings Edit
 * @FilePath: \Protected-Area-Resources-Monitor-and-Management-System\src\views\camera-management\index.vue
-->
<template>
  <div class="content">
    <div class="carmera-main">
      <div id="carmera-map"></div>
      <div :class="[toggle ? '' : 'carmera-list-hidden', 'carmera-list']">
        <div class="toggle-button" title="收起" @click="toggle = !toggle">
          <i :class="[toggle ? 'el-icon-arrow-right' : 'el-icon-arrow-left']"></i>
        </div>
        <camera-list
          v-show="level === 1"
          @click-camera="clickCamera"
          @click-recycle="clickRecycle"
          @click-deploy="clickDeploy"
        ></camera-list>
        <camera-config v-if="level === 2" @click-back="level = 1" :info='cameraObj'></camera-config>
      </div>
    </div>
  </div>
</template>

<script>
import AMapLoader from '@/utils/map'
import cameraList from './widgets/camera-list.vue'
import cameraConfig from './widgets/camera-config.vue'
export default {
  data() {
    return {
      toggle: true,
      map: {},
      AMap: {},
      cameraObj:{}, // 点击得相机队形集合
      level: 1 // 1 显示相机列表, 2显示相机详情
    }
  },
  components: { cameraList, cameraConfig },
  mounted() {
    this.initMap()
  },
  methods: {
    clickCamera(item) {
      this.level = 2
      this.cameraObj = item
      console.log(item)
    },
    clickRecycle(item) {
      // 点击回收
      this.$emit('click-recycle', item)
    },
    clickDeploy(item) {
      // 点击部署
      this.$emit('click-deploy', item)
    },
    async initMap() {
      // 地图
      const { AMap } = await AMapLoader()
      this.AMap = AMap
      this.map = new this.AMap.Map('carmera-map', {
        viewMode: '3D',
        zoom: 10,
        zooms: [7, 14],
        showBuildingBlock: true,
        center: [108.8196, 28.8666]
      })
      this.map.on('complete', () => {
        console.log('complete')
        const controlBar = new AMap.ControlBar({
          position: {
            bottom: '100px',
            right: '0px'
          }
        })
        this.map.addControl(controlBar)
        this.addMarker(AMap) // 添加标记点
      })
    },
    addMarker(AMap) {
      this.map.add(
        new AMap.Marker({
          position: this.map.getCenter(),
          anchor: 'bottom-center'
        })
      )
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
