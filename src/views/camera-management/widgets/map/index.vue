<!--
 * @Author: 阮志雄
 * @Date: 2021-10-18 10:03:28
 * @LastEditTime: 2021-10-18 17:40:32
 * @LastEditors: 阮志雄
 * @Description: In User Settings Edit
 * @FilePath: \Protected-Area-Resources-Monitor-and-Management-System\src\views\camera-management\widgets\map\index.vue
-->
<template>
  <div id="carmera-map"></div>
</template>

<script>
import AMapLoader from '@/utils/map'
let AMap, Map, polygon
export default {
  data() {
    return {
      path: [
        [114.496577, 30.487779],
        [114.500242, 30.485103],
        [114.508865, 30.477446],
        [114.503332, 30.468233],
        [114.483569, 30.464996],
        [114.467112, 30.470786],
        [114.478323, 30.474708],
        [114.476095, 30.484854],
        [114.484575, 30.49307]
      ],
      center: [114.489377, 30.47579]
    }
  },
  async mounted() {
    const { AMaps } = await AMapLoader()
    AMap = AMaps
    this.initMap()
  },
  methods: {
    async initMap() {
      // 地图
      Map = new AMap.Map('carmera-map', {
        viewMode: '3D',
        zoom: 14,
        zooms: [7, 18],
        showBuildingBlock: true,
        center: this.center
      })
      Map.on('complete', () => {
        console.log('complete')
        const controlBar = new AMap.ControlBar({
          position: {
            bottom: '100px',
            right: '0px'
          }
        })
        Map.addControl(controlBar)
        this.addMarker(AMap) // 添加标记点
        this.setPloygon(this.path)
      })
    },
    setPloygon(path) {
      polygon = new AMap.Polygon({
        path,
        strokeColor: '#3f9dfd',
        strokeWeight: 2,
        strokeStyle: 'dashed',
        strokeOpacity: 0.8,
        fillOpacity: 0.1,
        fillColor: '#000',
        zIndex: 50,
        bubble: true
      })
      Map.add([polygon])
    },
    addMarker(AMaps) {
      const startIcon = new AMap.Icon({
        // 图标尺寸
        size: new AMap.Size(25, 20),
        // 图标的取图地址
        image: './static/camera1.png',
        // 图标所用图片大小
        imageSize: new AMap.Size(25, 20),
        // 图标取图偏移量
        // imageOffset: new AMap.Pixel(-9, -3)
      })
      Map.add(
        new AMaps.Marker({
          position: Map.getCenter(),
          icon: startIcon,
          anchor: 'bottom-center',
          extData: { id: 'qwe21e3qe1' }
        })
      )
    }
  }
}
</script>

<style lang="scss">
#carmera-map {
  width: 100%;
  height: 100%;
  border-radius: 10px;
}
</style>
