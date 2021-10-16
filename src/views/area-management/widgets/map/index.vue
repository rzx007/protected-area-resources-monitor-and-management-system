<!--
 * @Author: 阮志雄
 * @Date: 2021-10-15 16:08:30
 * @LastEditTime: 2021-10-17 01:38:35
 * @LastEditors: 阮志雄
 * @Description: In User Settings Edit
 * @FilePath: \Protected-Area-Resources-Monitor-and-Management-System\src\views\area-management\widgets\map\index.vue
-->
<template>
  <div class="map-container">
    <div class="tooldragbar"></div>
    <div id="area-container"></div>
  </div>
</template>

<script>
import hub from '@/utils/bus'
import AMapLoader from '@/utils/map'
let AMap, Map, polygon, polyEditor
export default {
  name: 'home-map',
  props: {
    isEdit: {
      type: Boolean,
      default: false
    },
    isCreate: {
      type: Boolean,
      default: false
    },
    mapId: String
  },
  data() {
    return {
      path: [
        [116.403322, 39.920255],
        [116.410703, 39.897555],
        [116.402292, 39.892353],
        [116.389846, 39.891365]
      ],
      center: [], // 中心点
      mapEdit: false,
      mapFixed: false
    }
  },
  watch: {
    isEdit: function(val) {
      val ? polyEditor.open() : polyEditor.close()
    },
    isCreate: function(val) {
      val && this.clickMapSetCneter()
      this.clearPlogon()
    },
    mapEdit: function(val) { // 新增时多边形是否可编辑
      console.log(val)
      val ? polyEditor.open() : polyEditor.close()
    },
    mapFixed: function(val) {// 新增时多边形是否固定中心点
      val ? Map.off('click', this.getCenterLnglat) : this.clickMapSetCneter()
    }
  },
  async mounted() {
    const { AMaps } = await AMapLoader()
    AMap = AMaps
    this.initMap()
    this.hubEvent()
  },
  methods: {
    async initMap() {
      Map = new AMap.Map('area-container', {
        mapStyle: 'amap://styles/b0de2f829295042fd24e20c6233cef55',
        viewMode: '3D',
        zoom: 14,
        zooms: [7, 18],
        showBuildingBlock: true,
        center: [116.419979, 39.905643]
      })
      Map.on('complete', () => {
        console.log('complete')
        Map.addControl(new AMap.Scale()) // 比例尺
        this.setPloygon(this.path)
        this.setPloygonEmphasis()
        this.polyEditor()
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
    setPloygonEmphasis() {
      polygon.on('mouseover', () => {
        polygon.setOptions({
          fillOpacity: 0.7,
          fillColor: '#7bccc4'
        })
      })
      polygon.on('mouseout', () => {
        polygon.setOptions({
          fillOpacity: 0.5,
          fillColor: '#ccebc5'
        })
      })
    },
    clearPlogon() {
      polygon.destroy()
    },
    polyEditor() {
      console.log(polygon.getBounds())
      console.log(polygon.getPath())
      polyEditor = new AMap.PolygonEditor(Map, polygon)
      polyEditor.addAdsorbPolygons(polygon)
      // polyEditor.open()
    },
    getPolygonPath() {
      const path = []
      const polyPath = polygon.getPath()
      polyPath.forEach(element => {
        const subPath = [element.lng, element.lat]
        path.push(subPath)
      })
      console.log(path)
    },
    setDefaultPloygon() {
      const center = this.center
      const x = [center[0] - 0.01, center[0] + 0.01]
      const y = [center[1] - 0.01, center[1] + 0.01]
      const defaultPath = [
        [x[0], y[0]],
        [x[0], y[1]],
        [x[1], y[1]],
        [x[1], y[0]]
      ]
      this.clearPlogon()
      this.setPloygon(defaultPath)
      polyEditor.setTarget(polygon)
      this.mapEdit && polyEditor.open()
    },
    getCenterLnglat(e) {
      this.center = [e.lnglat.getLng(), e.lnglat.getLat()]
      Map.setCenter(this.center)
      Map.setZoom(14)
      this.setDefaultPloygon()
    },
    clickMapSetCneter() {
      //  新增保护区，根据中心点初始化一个正方形区域用于编辑
      Map.on('click', this.getCenterLnglat)
    },
    hubEvent() {
      hub.$on('click-edit', bool => {
        this.mapEdit = bool
      })
      hub.$on('click-center', bool => {
        this.mapFixed = bool
      })
    }
  },
  destroyed() {
    Map.destroy()
  }
}
</script>
<style lang="scss">
.map-container {
  width: 100%;
  height: 100%;
  #area-container {
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
