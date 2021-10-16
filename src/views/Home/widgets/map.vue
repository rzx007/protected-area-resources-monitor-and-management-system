<!--
 * @Author: 阮志雄
 * @Date: 2021-10-15 16:08:30
 * @LastEditTime: 2021-10-16 19:38:43
 * @LastEditors: 阮志雄
 * @Description: In User Settings Edit
 * @FilePath: \Protected-Area-Resources-Monitor-and-Management-System\src\views\Home\widgets\map.vue
-->
<template>
  <div class="map-container">
    <div class="tooldragbar">
      <mapToolbar @on-select="toolSelcet"></mapToolbar>
    </div>
    <div id="container"></div>
  </div>
</template>

<script>
import AMapLoader from '@/utils/map'
import { apiGet } from '@/api'
import mapToolbar from './mapToolBar.vue'
export default {
  name: 'home-map',
  data() {
    return {
      activeName: 'first',
      AMaps: {},
      map: {}
    }
  },
  components: { mapToolbar },
  mounted() {
    this.initMap()
  },
  methods: {
    async initMap() {
      // 地图
      const { AMaps } = await AMapLoader()
      this.AMaps = AMaps
      this.map = new this.AMaps.Map('container', {
        mapStyle: 'amap://styles/b0de2f829295042fd24e20c6233cef55',
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
        this.getGeoJson(AMaps)
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
    },
    getGeoJson(AMaps) {
      // 加载geojson地理数据， kml文件可通过插件方式转换为geojson
      apiGet('https://a.amap.com/jsapi_demos/static/geojson/chongqing.json')
        .then(result => {
          var geojson = new AMaps.GeoJSON({
            geoJSON: result,
            // 还可以自定义getMarker和getPolyline
            getPolygon: function(geojson, lnglats) {
              // 计算面积
              var area = AMaps.GeometryUtil.ringArea(lnglats[0])
              return new AMaps.Polygon({
                path: lnglats,
                fillOpacity: 1 - Math.sqrt(area / 8000000000), // 面积越大透明度越高/
                strokeColor: 'white',
                fillColor: 'red'
              })
            }
          })
          this.map.add(geojson)
        })
        .catch(err => {
          console.log(err)
        })
    },
    addSatellite() {
      // 添加卫星图层
      var satelliteLayer = new this.AMaps.TileLayer.Satellite()
      this.map.add([satelliteLayer])
    },
    toolSelcet(item) {
      console.log(item.type)
      if (item.type === 1) {
        this.addSatellite() // 卫星图层
      }
    }
  },
  destroyed() {
    this.map.destroy()
  }
}
</script>
<style lang="scss">
.map-container {
  width: 100%;
  height: 100%;
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
