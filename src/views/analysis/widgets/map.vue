<template>
  <div class="analysis-container">
    <div id="container"></div>
  </div>
</template>

<script>
import AMapLoader from '@/utils/map'
let AMap, Map, polygon, satelliteLayer
export default {
  name: 'home-map',
  data() {
    return {
      activeName: 'first',
      AMaps: {},
      map: {}
    }
  },
  props: {
    path: {
      type: Array,
      default: function () {
        return []
      }
    },
    center: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  async mounted() {
    const { AMaps } = await AMapLoader()
    AMap = AMaps
    this.initMap()
  },
  watch: {
    path: {
      handler: function (val) {
        setTimeout(() => {
          this.setPloygon(val)
           Map.setCenter(this.center)
        }, 2000)
      },
      deep: true
    }
    // center: {
    //   handler: function (val) {
    //     this.center = val
    //     setTimeout(() => {
    //       Map.setCenter(val)
    //     }, 1000)
    //   },
    //   deep: true
    // }
  },
  methods: {
    async initMap() {
      Map = new AMap.Map('container', {
        viewMode: '3D',
        zoom: 14,
        zooms: [7, 17],
        showBuildingBlock: true,
        center: [108.8196, 28.8666]
      })
      Map.on('complete', () => {
        console.log('complete')
        satelliteLayer = new AMap.TileLayer.Satellite()
        Map.add(satelliteLayer)
        const controlBar = new AMap.ControlBar({
          position: {
            bottom: '100px',
            right: '0px'
          }
        })
        Map.addControl(new AMap.Scale()) // 比例尺
        Map.addControl(new AMap.ToolBar()) // 放大缩小按钮
        Map.addControl(controlBar)
        // this.setPloygon(this.path)
        Map.setCenter(this.center)
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
    }
  },
  beforeDestroy() {
    // Map.destroy()
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
