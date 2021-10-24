<!--
 * @Author: 阮志雄
 * @Date: 2021-10-18 10:03:28
 * @LastEditTime: 2021-10-24 16:45:36
 * @LastEditors: 阮志雄
 * @Description: In User Settings Edit
 * @FilePath: \Protected-Area-Resources-Monitor-and-Management-System\src\views\camera-management\widgets\map\index.vue
-->
<template>
  <div id="carmera-map"></div>
</template>

<script>
import hub from '@/utils/bus'
import AMapLoader from '@/utils/map'
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
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([
            [114.496577, 30.487779],
            [114.500242, 30.485103],
            [114.508865, 30.477446],
            [114.503332, 30.468233],
            [114.483569, 30.464996],
            [114.467112, 30.470786],
            [114.478323, 30.474708],
            [114.476095, 30.484854],
            [114.484575, 30.49307]
          ])
        }, 1000)
      })
    },
    getMarkersData() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([
            { id: 'KJGRA679SHJ6', state: 1, inUseTime: '2012-10-12', user: '', lnglat: [] },
            { id: 'KJGRA679SHJ1', state: 0, inUseTime: '', user: '张三', lnglat: [] },
            { id: 'KJGRA679SHJ2', state: 2, inUseTime: '2012-10-12', user: '李四', lnglat: [] },
            { id: 'KJGRA679SHJ7', state: 3, inUseTime: '', user: '', lnglat: [] },
            { id: 'KJGRA679SHJ3', state: 1, inUseTime: '2012-10-12', user: '', lnglat: [] },
            { id: 'KJGRA679SHJ4', state: 0, inUseTime: '', user: '张三', lnglat: [] },
            { id: 'KJGRA679SHJ5', state: 2, inUseTime: '2012-10-12', user: '李四', lnglat: [] }
          ])
        }, 1000)
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
        this.path = await this.getMapData()
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
        const item = this.cameraList[index]
        const lnglat = this.path[index]
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