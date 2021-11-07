<!--
 * @Author: 阮志雄
 * @Date: 2021-10-18 10:03:28
 * @LastEditTime: 2021-11-07 14:49:25
 * @LastEditors: 阮志雄
 * @Description: In User Settings Edit
 * @FilePath: \Protected-Area-Resources-Monitor-and-Management-System\src\views\Home\widgets\map\index.vue
-->
<template>
  <div id="carmera-map"></div>
</template>

<script>
import { getToken } from '@/utils/auth'
import hub from '@/utils/bus'
import AMapLoader from '@/utils/map'
import { findAllCarmeraList, findAreaByDoMain } from '@/api'
let AMap, Map, polygon
export default {
  data() {
    return {
      path: [],
      center: [114.489377, 30.47579],
      cameraList: [], // 1已部署， 0 待部署， 2 待回收 3 未部署
      carmera: {}
    }
  },
  async mounted() {
    const { AMaps } = await AMapLoader()
    AMap = AMaps
    this.initMap()
  },
  methods: {
    getMapData() {
      return findAreaByDoMain({ domainName: getToken('domainName') }).then(res => {
        return {
          path: res.data.lngLat ? JSON.parse(res.data.lngLat) : [],
          center: JSON.parse(res.data.centerLnglat)
        }
      })
    },
    getMarkersData() {
      return findAllCarmeraList().then(res => {
        const cameraList = res.code === 0 ? res.data.list : []
        return cameraList.filter(item => item.state !== 1)
      })
    },
    async initMap() {
      // 地图
      Map = new AMap.Map('carmera-map', {
        mapStyle: 'amap://styles/b0de2f829295042fd24e20c6233cef55',
        viewMode: '3D',
        zoom: 14,
        zooms: [7, 18],
        showBuildingBlock: true,
        center: this.center
      })
      Map.on('complete', async () => {
        console.log('complete')
        const controlBar = new AMap.ControlBar({
          position: {
            bottom: '100px',
            right: '0px'
          }
        })
        Map.addControl(controlBar)
        const { path, center } = await this.getMapData()
        this.path = path
        Map.setCenter(center)
        this.cameraList = await this.getMarkersData()
        this.setPloygon(this.path)
        this.addMarkers() // 添加标记点
        this.markerEvent()
        setTimeout(() => {
          Map.add(this.createMarker(Map.getCenter(), { state: 0 }))
          this.markerEvent()
        }, 3000)
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
    addMarkers() {
      var markers = Map.getAllOverlays('marker')
      Map.remove(markers)
      for (let index = 0; index < this.cameraList.length; index++) {
        const element = this.cameraList[index]
        const item = element
        // const lnglat = this.path[index]
        const lnglat = [Number(element['longitudeVal']), Number(element['latitudeVal'])]

        const marker = this.createMarker(lnglat, item)
        Map.add(marker)
      }
    },
    createMarker(lnglat, extData) {
      const { iconPath } = this.setIconImg(extData.state)
      const marker = new AMap.Marker({
        position: lnglat,
        icon: this.createIcon(iconPath),
        anchor: 'bottom-center',
        extData
      })
      return marker
    },
    createIcon(iconPath = 'camera1') {
      const startIcon = new AMap.Icon({
        // 图标尺寸
        size: new AMap.Size(25, 20),
        // 图标的取图地址
        image: `./static/${iconPath}.png`,
        // 图标所用图片大小
        imageSize: new AMap.Size(25, 20)
        // 图标取图偏移量
        // imageOffset: new AMap.Pixel(-9, -3)
      })
      return startIcon
    },
    setIconImg(state) {
      let iconPath = 'camera1'
      let stutusName = '已部署'
      switch (state) {
        case 1:
          iconPath = 'camera1'
          stutusName = '已部署'
          break
        case 2:
          iconPath = 'camera2'
          stutusName = '待回收'
          break
        case 0:
          iconPath = 'camera3'
          stutusName = '待部署'
          break
        default:
          break
      }
      return { iconPath, stutusName }
    },
    setInfoWindow(lnglat, extData) {
      const { stutusName } = this.setIconImg(extData.state)
      const infoWindow = new AMap.InfoWindow({
        anchor: 'top-left',
        content: `
            相机编号：${extData.id ? extData.id : ''}<br/>
            状态：${stutusName}
        `
      })
      infoWindow.open(Map, lnglat)
    },
    markerEvent() {
      const _this = this
      var overlays = Map.getAllOverlays('marker')
      for (let index = 0; index < overlays.length; index++) {
        const marker = overlays[index]
        marker.on('click', function(e) {
          let carmeraInfo = marker.getExtData()
          const { lng, lat } = marker.getPosition()
          overlays.forEach(marker => {
            const extData = marker.getExtData()
            const { iconPath } = _this.setIconImg(extData.state)
            marker.setIcon(_this.createIcon(iconPath))
          })
          marker.setIcon(_this.createIcon('camera3'))
          _this.setInfoWindow([lng, lat], carmeraInfo)
          _this.$emit('click-map-carmera', carmeraInfo)
        })
      }
    },
    addCarmeraHabdle(event) {
      // 部署操作时,点击地图添加相机
      const _this = this
      const { lng, lat } = event.lnglat
      // 避免重复添加
      var isPointInRing = AMap.GeometryUtil.isPointInRing([lng, lat], _this.path)
      if (isPointInRing) {
        this.moverRepeatCarmera()
        hub.$emit('deploy-lnglat', [lng, lat])
        Map.add(this.createMarker([lng, lat], this.carmera))
      }
    },
    moverRepeatCarmera() {
      // 移除同一个Id相机，避免重复添加
      var markers = Map.getAllOverlays('marker')
      for (let index = 0; index < markers.length; index++) {
        const marker = markers[index]
        if (marker.getExtData().id === this.carmera.id) {
          Map.remove(marker)
        }
      }
    },
    addDeployCamera(carmera) {
      const _this = this
      this.carmera = carmera
      Map.on('click', _this.addCarmeraHabdle)
    },
    cancelDeployCamera() {
      // 取消部署操作
      const _this = this
      Map.off('click', _this.addCarmeraHabdle)
      this.moverRepeatCarmera()
      this.carmera = {}
    },
    async ajaxRefreshMarkers() {
      this.cameraList = await this.getMarkersData()
      this.addMarkers()
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
