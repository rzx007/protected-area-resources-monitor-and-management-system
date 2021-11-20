<template>
  <div class="map-container">
    <map-tool @on-select="selectTool" :tools="['weixin']" ></map-tool>
    <div id="area-container"></div>
  </div>
</template>

<script>
import hub from '@/utils/bus'
import AMapLoader from '@/utils/map'
let AMap, Map, polygon, polyEditor, satelliteLayer
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
    mapId: Number,
    pathStr: {
      type: String,
      default: '[]'
    },
    centerLnglat: {
      type: Array,
      default: () => {
        return [114.496577, 30.487779]
      }
    }
  },
  data() {
    return {
      path: [],
      center: this.centerLnglat, // 中心点
      mapCreate: false,
      mapFixed: false
    }
  },
  watch: {
    pathStr: {
      handler: function (newPath) {
        this.path = JSON.parse(newPath)
        this.getPathByAjax()
      },
      deep: true
    },
    centerLnglat: function (val) {
      this.center = val
      this.getPathByAjax()
    },
    // mapId: function() {
    //   this.getPathByAjax()
    // },
    isEdit: function (bool) {
      const path = this.getPolygonPath()
      if (path.length > 0) {
        bool ? polyEditor.open() : polyEditor.close()
      }
    },
    isCreate: function (bool) {
      this.clearPlogon()
      if (bool) {
        Map.on('click', this.getCenterLnglat)
      } else {
        Map.off('click', this.getCenterLnglat)
        polyEditor.close()
      }
    },
    mapCreate: function (val) {
      // 新增时多边形是否可编辑
      val ? polyEditor.open() : polyEditor.close()
    },
    mapFixed: function (val) {
      // 新增时多边形是否固定中心点
      val ? Map.off('click', this.getCenterLnglat) : Map.on('click', this.getCenterLnglat)
    }
  },
  async mounted() {
    const { AMaps } = await AMapLoader()
    AMap = AMaps
    satelliteLayer = new AMap.TileLayer.Satellite()
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
        center: this.center
      })
      Map.on('complete', () => {
        console.log('complete')
        Map.add(satelliteLayer)
        Map.addControl(new AMap.Scale()) // 比例尺
        const controlBar = new AMap.ControlBar({
          position: {
            bottom: '60px',
            left: '6px'
          }
        })
        Map.addControl(controlBar)
        this.setPloygon(this.path)
        this.setPloygonEmphasis()
        this.polyEditor()
      })
    },
    setPloygon(path) {
      polygon = new AMap.Polygon({
        path,
        strokeColor: '#3f9dfd',
        strokeWeight: 4,
        strokeStyle: 'dashed',
        strokeOpacity: 0.8,
        fillOpacity: 0.4,
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
      polygon.hide()
      polygon.setPath([])
      polygon.destroy()
      // Map.clearMap()
    },
    polyEditor() {
      polyEditor = new AMap.PolygonEditor(Map, polygon)
      polyEditor.addAdsorbPolygons(polygon)
      // polyEditor.open()
    },
    getPolygonPath() {
      const path = []
      const polyPath = polygon.getPath()
      polyPath.forEach((element) => {
        const subPath = [element.lng, element.lat]
        path.push(subPath)
      })
      return path
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
      this.setPloygon(defaultPath)
      polyEditor.setTarget(polygon)
      this.mapCreate && polyEditor.open()
    },
    setCenterZoom(center, zoom = 14) {
      this.center = center
      this.clearPlogon()
      Map.setCenter(this.center)
      Map.setZoom(zoom)
    },
    getCenterLnglat(e) {
      //  新增保护区，根据中心点初始化一个正方形区域用于编辑
      const center = [e.lnglat.getLng(), e.lnglat.getLat()]
      hub.$emit('on-setCenter', center)
      this.setCenterZoom(center)
      this.setDefaultPloygon()
    },
    hubEvent() {
      // 外部组件事件
      hub.$on('create-edit', (bool) => {
        this.mapCreate = bool
      })
      hub.$on('create-center', (bool) => {
        this.mapFixed = bool
      })
      hub.$on('handraulic-center', (lnglat) => {
        this.setCenterZoom(lnglat)
        this.setDefaultPloygon()
      })
    },
    getPathByAjax() {
      const center = this.center
      // console.log(this.path);
      // this.mapId 根据Id查询区域
      this.setCenterZoom(center)
      this.setPloygon(this.path)
      polyEditor.setTarget(polygon)
    },
    selectTool({ type, activeIndex }) {
      if (type === 1) {
        activeIndex === 1 ? Map.add(satelliteLayer) : Map.remove(satelliteLayer)
      }
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
