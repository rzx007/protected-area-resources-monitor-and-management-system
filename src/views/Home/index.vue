<!--
 * @Author: 阮志雄
 * @Date: 2021-07-17 13:54:29
 * @LastEditTime: 2021-10-13 10:12:10
 * @LastEditors: 阮志雄
 * @Description: In User Settings Edit
 * @FilePath: \Protected-Area-Resources-Monitor-and-Management-System\src\views\Home\index.vue
-->
<template>
  <div class="content mapBox">
    <div class="tooldragbar">
      <mapToolbar @on-select='toolSelcet'></mapToolbar>
    </div>
    <div id="container"></div>
  </div>
</template>

<script>
import AMapLoader from '@/utils/map'
import { apiGet } from '@/api'
import mapToolbar from './widgets/mapToolBar.vue'
export default {
  data () {
    return {
      activeName: 'first',
      AMap: {},
      map: {}
    }
  },
  components: { mapToolbar },
  mounted () {
    this.initMap()
  },
  methods: {
    async initMap () { // 地图
      const { AMap } = await AMapLoader()
      this.AMap = AMap
      this.map = new this.AMap.Map('container', {
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
        this.getGeoJson(AMap)
        this.map.addControl(new AMap.Scale()) // 比例尺
        this.map.addControl(new AMap.ToolBar()) // 放大缩小按钮
        this.map.addControl(controlBar)
        this.addMarker(AMap) // 添加标记点
      })
    },
    addMarker (AMap) {
      this.map.add(new AMap.Marker({
        position: this.map.getCenter(),
        anchor: 'bottom-center'
      }))
    },
    getGeoJson (AMap) { // 加载geojson地理数据， kml文件可通过插件方式转换为geojson
      apiGet('https://a.amap.com/jsapi_demos/static/geojson/chongqing.json').then((result) => {
        var geojson = new AMap.GeoJSON({
          geoJSON: result,
          // 还可以自定义getMarker和getPolyline
          getPolygon: function (geojson, lnglats) {
            // 计算面积
            var area = AMap.GeometryUtil.ringArea(lnglats[0])
            return new AMap.Polygon({
              path: lnglats,
              fillOpacity: 1 - Math.sqrt(area / 8000000000), // 面积越大透明度越高/
              strokeColor: 'white',
              fillColor: 'red'
            })
          }
        })
        this.map.add(geojson)
      }).catch((err) => {
        console.log(err)
      })
    },
    addSatellite () { // 添加卫星图层
      var satelliteLayer = new this.AMap.TileLayer.Satellite()
      this.map.add([satelliteLayer])
    },
    toolSelcet (item) {
      console.log(item.type)
      if (item.type === 1) {
        this.addSatellite() // 卫星图层
      }
    }
  },
  destroyed () {
    this.map.destroy()
  }
}
</script>
<style lang='scss'>
.mapBox{
  padding: 0;
  #container{
    width: 100%;
    height: 100%;
  }
  .tooldragbar{
    position: absolute;
    right: 80px;
    top: 15px;
    z-index: 100;
  }
}

</style>
