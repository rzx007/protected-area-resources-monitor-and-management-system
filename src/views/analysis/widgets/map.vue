<!--
 * @Author: 阮志雄
 * @Date: 2021-10-15 16:08:30
 * @LastEditTime: 2021-10-18 17:43:34
 * @LastEditors: 阮志雄
 * @Description: In User Settings Edit
 * @FilePath: \Protected-Area-Resources-Monitor-and-Management-System\src\views\analysis\widgets\map.vue
-->
<template>
  <div class="analysis-container">
    <div id="container"></div>
  </div>
</template>

<script>
import AMapLoader from '@/utils/map'

export default {
  name: 'home-map',
  data() {
    return {
      activeName: 'first',
      AMaps: {},
      map: {}
    }
  },
  mounted() {
    this.initMap()
  },
  methods: {
    async initMap() {
      // 地图
      const { AMaps } = await AMapLoader()
      this.AMaps = AMaps
      this.map = new this.AMaps.Map('container', {
        viewMode: '3D',
        zoom: 10,
        zooms: [7, 14],
        showBuildingBlock: true,
        center: [108.8196, 28.8666]
      })
      this.map.on('complete', () => {
        console.log('complete')
        const controlBar = new AMaps.ControlBar({
          position: {
            bottom: '100px',
            right: '0px'
          }
        })
        this.map.addControl(new AMaps.Scale()) // 比例尺
        this.map.addControl(new AMaps.ToolBar()) // 放大缩小按钮
        this.map.addControl(controlBar)
        this.addMarker(AMaps) // 添加标记点
      })
    },
    addMarker(AMaps) {
      this.map.add(
        new AMaps.Marker({
          position: this.map.getCenter(),
          anchor: 'bottom-center'
        })
      )
    }
  },
  destroyed() {
    this.map.destroy()
  }
}
</script>
<style lang="scss">
.analysis-container {
  width: 100%;
  height: 50vh;
  min-height: 400px;
  border-radius: 10px;
  overflow: hidden;
  @include box-shadow();
  #container {
    width: 100%;
    height: 100%;
  }
  .tooldragbar {
    position: absolute;
    left: 80px;
    top: 15px;
    z-index: 100;
  }
}
</style>
