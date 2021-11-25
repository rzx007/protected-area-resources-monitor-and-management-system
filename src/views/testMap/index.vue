<template>
  <div class="content">
    <div id="carmera-map"></div>
  </div>
</template>

<script>
import { findAreaByDoMain } from '@/api'
import AMapLoader from '@/utils/map'
import PolygonGrid from '@/utils/ScanFill'
import { getToken } from '@/utils/auth'
let AMap, Map, polygon, satelliteLayer
export default {
  data() {
    return {
      path: [],
      center: [114.489377, 30.47579]
    }
  },
  async mounted() {
    const { AMaps } = await AMapLoader()
    AMap = AMaps
    this.initMap()
  },
  methods: {
    getMapData() {
      return findAreaByDoMain({ domainName: getToken('domainName') }).then((res) => {
        return {
          path: res.data.lngLat ? JSON.parse(res.data.lngLat) : [],
          center: JSON.parse(res.data.centerLnglat)
        }
      })
    },
    async initMap() {
      // 地图
      Map = new AMap.Map('carmera-map', {
        mapStyle: 'amap://styles/b0de2f829295042fd24e20c6233cef55',
        viewMode: '3D',
        zoom: 15,
        zooms: [7, 18],
        showBuildingBlock: true,
        center: this.center
      })
      Map.on('complete', async () => {
        var _this = this
        console.log('complete')
        const p1 = new AMap.LngLat(116.368904, 39.923423)
        const p2 = new AMap.LngLat(116.380619, 39.923439)
        const pixel1 = Map.lngLatToContainer([116.368904, 39.923423])
        const pixel2 = Map.lngLatToContainer([116.380619, 39.923439])
        console.log(p1.distance(p2))
        console.log(Math.abs(pixel1.x) - Math.abs(pixel2.x))
        const { path, center } = await this.getMapData()
        this.path = path
        this.center = center
        Map.setCenter(center)
        this.setPloygon(this.path)
        new PolygonGrid({
          mapInstance: Map,
          angel: 180,
          interval: 273, // 平行折线之间间隔px
          allPoints: _this.path
        })
        new PolygonGrid({
          mapInstance: Map,
          angel: 90,
          interval: 273, // 平行折线之间间隔px
          allPoints: _this.path
        })
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
  }
}
</script>
<style lang="scss">
#carmera-map {
  @include font_color(null);
  width: 100%;
  height: 100%;
  border-radius: 10px;
}
</style>
