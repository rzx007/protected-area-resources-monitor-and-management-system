<template>
  <div id="carmera-map">
    <map-tool @on-select="selectTool" @on-select-grid="selectGrid"></map-tool>
  </div>
</template>

<script>
import { findCarmeraList, findAreaByDoMain } from '@/api'
import { getToken, setToken } from '@/utils/auth'
import hub from '@/utils/bus'
import AMapLoader from '@/utils/map'
let AMap, Map, polygon, satelliteLayer, infoWindow
import PolygonGrid from '@/utils/ScanFill'
export default {
  data() {
    return {
      path: [],
      center: JSON.parse(getToken('center')) || [114.489377, 30.47579],
      cameraList: [], // 1 未部署， 2 部署中 3已部署 4 回收中
      carmera: {}
    }
  },
  async mounted() {
    const { AMaps } = await AMapLoader()
    AMap = AMaps
    satelliteLayer = new AMap.TileLayer.Satellite()
    this.initMap()
  },
  methods: {
    getMapData() {
      return findAreaByDoMain({ domainName: getToken('domainName') }).then((res) => {
        setToken('center', res.data.centerLnglat)
        return {
          path: res.data.lngLat ? JSON.parse(res.data.lngLat) : [],
          center: JSON.parse(res.data.centerLnglat)
        }
      })
    },
    getMarkersData() {
      return findCarmeraList().then((res) => {
        const cameraList = res.code === 0 ? res.data : []
        return cameraList.filter((item) => item.state !== 1)
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
        console.log('complete')
        Map.add(satelliteLayer)
        const controlBar = new AMap.ControlBar({
          position: {
            bottom: '60px',
            left: '6px'
          }
        })
        Map.addControl(controlBar)
        const { path, center } = await this.getMapData()
        this.path = path
        this.center = center
        Map.setCenter(center)
        Map.addControl(new AMap.Scale()) // 比例尺
        this.cameraList = await this.getMarkersData()
        this.setPloygon(this.path)
        this.createPolylineGrid()
        this.addMarkers() // 添加标记点
        this.markerEvent()
        this.mapEvent()
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
    addMarkers() {
      var markers = Map.getAllOverlays('marker')
      Map.remove(markers)
      for (let index = 0; index < this.cameraList.length; index++) {
        const element = this.cameraList[index]
        const item = element
        // const lnglat = this.path[index]
        const lnglat = [Number(element['fixupLongitudeVal']), Number(element['fixupLatitudeVal'])]

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
    createIcon(iconPath = 'camera1', size = { x: 30, y: 32 }) {
      const startIcon = new AMap.Icon({
        // 图标尺寸
        size: new AMap.Size(size.x, size.y),
        // 图标的取图地址
        image: `./static/${iconPath}.png`,
        // 图标所用图片大小
        imageSize: new AMap.Size(size.x, size.y)
        // 图标取图偏移量
        // imageOffset: new AMap.Pixel(-9, -3)
      })
      return startIcon
    },
    setIconImg(state) {
      let iconPath = 'camera3'
      let stutusName = '部署中'
      switch (state) {
        case 2:
          iconPath = 'camera3'
          stutusName = '部署中'
          break
        case 4:
          iconPath = 'camera2'
          stutusName = '回收中'
          break
        case 3:
          iconPath = 'camera4'
          stutusName = '已部署'
          break
        default:
          break
      }
      return { iconPath, stutusName }
    },
    setInfoWindow(lnglat, extData) {
      const { stutusName } = this.setIconImg(extData.state)
      infoWindow = new AMap.InfoWindow({
        anchor: 'top-left',
        content: `
            相机IMEI号：${extData.imeival ? extData.imeival : ''}<br/>
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
        marker.on('click', function (e) {
          let carmeraInfo = marker.getExtData()
          _this.markerHandler(carmeraInfo)
          _this.$emit('click-map-carmera', carmeraInfo)
        })
      }
    },
    markerHandler(carmera) {
      const _this = this
      var overlays = Map.getAllOverlays('marker')
      overlays.forEach((markerItem) => {
        const extData = markerItem.getExtData()
        const { iconPath } = _this.setIconImg(extData.state)
        markerItem.setIcon(_this.createIcon(iconPath))
        if (carmera.id === extData.id) {
          const { lng, lat } = markerItem.getPosition()
          const extData = markerItem.getExtData()
          const { iconPath } = _this.setIconImg(extData.state)
          markerItem.setIcon(_this.createIcon(iconPath, { x: 50, y: 52 }))
          _this.setInfoWindow([lng, lat], extData)
        }
      })
    },
    mapEvent() {
      Map.on('click', (e) => {
        const _this = this
         infoWindow && infoWindow.close()
        var overlays = Map.getAllOverlays('marker')
        overlays.forEach((markerItem) => {
          const extData = markerItem.getExtData()
          const { iconPath } = _this.setIconImg(extData.state)
          markerItem.setIcon(_this.createIcon(iconPath))
        })
      })
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
    },
    selectTool({ type, activeIndex }) {
      if (type === 1) {
        activeIndex === 1 ? Map.add(satelliteLayer) : Map.remove(satelliteLayer)
      } else if (type === 2) {
        Map.setCenter(this.center)
        Map.setZoom(15)
      }
    },
    selectGrid(parma) {
      this.createPolylineGrid(parma.y)
    },
    createPolylineGrid(interval = 273) {
      const _this = this
      var polylines = Map.getAllOverlays('polyline')
      if (polylines.length) {
        polylines.forEach((polyline) => {
          polyline.hide()
          polyline.destroy()
        })
      }
      if (interval) {
        new PolygonGrid({ mapInstance: Map, interval, allPoints: _this.path })
        new PolygonGrid({ mapInstance: Map, angel: 90, interval, allPoints: _this.path })
      }
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
