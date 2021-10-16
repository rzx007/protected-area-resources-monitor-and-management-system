/*
 * @Author: 阮志雄
 * @Date: 2021-07-17 14:03:41
 * @LastEditTime: 2021-10-16 19:38:01
 * @LastEditors: 阮志雄
 * @Description: In User Settings Edit
 * @FilePath: \Protected-Area-Resources-Monitor-and-Management-System\src\utils\map.js
 */
import AMapLoader from '@amap/amap-jsapi-loader'
function initMap() {
  return new Promise((resolve, reject) => {
    AMapLoader.load({

      key: 'fcea4de8dedcbfb07456bb2bd92614bd', // 申请好的Web端开发者Key，首次调用 load 时必填
      version: '2.0', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15，最新2.0
      plugins: ['AMap.Scale', 'AMap.ToolBar', 'AMap.GeoJSON', 'AMap.Polygon', 'AMap.Marker', 'AMap.TileLayer.Satellite', 'AMap.ControlBar', 'AMap.PolygonEditor'], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
      AMapUI: { // 是否加载 AMapUI，缺省不加载
        version: '1.1', // AMapUI 缺省 1.1
        plugins: [] // 需要加载的 AMapUI ui插件
      },
      Loca: { // 是否加载 Loca， 缺省不加载
        version: '2.0' // Loca 版本，缺省 1.3.2，最新2.0，须jsapi对应版本
      }
    }).then((AMap) => {
      resolve({ AMaps: AMap, AMapLoader })
    }).catch(e => {
      console.log(e)
      reject(new Error(e))
    })
  })
}
export default initMap

//  未完成
class Createmap {
  map = {} // 地图实例
  key = 'fcea4de8dedcbfb07456bb2bd92614bd'
  version = '2.0'
  plugins = ['AMap.Scale', 'AMap.ToolBar', 'AMap.GeoJSON', 'AMap.Polygon']
  UIversion = '1.1'
  UIplugins = []
  Locaversion = '2.0'
  Locaplugins = []
  constructor(viewMode = '2D', showBuildingBlock = true) {
    this.viewMode = viewMode
    this.showBuildingBlock = showBuildingBlock
    this.init()
  }

  init() {
    const _this = this
    AMapLoader.load({
      key: _this.key, // 申请好的Web端开发者Key，首次调用 load 时必填
      version: _this.version, // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15，最新2.0
      plugins: ['AMap.Scale', 'AMap.ToolBar'], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
      AMapUI: { // 是否加载 AMapUI，缺省不加载
        version: _this.UIversion, // AMapUI 缺省 1.1
        plugins: _this.UIplugins // 需要加载的 AMapUI ui插件
      },
      Loca: { // 是否加载 Loca， 缺省不加载
        version: _this.Locaversion // Loca 版本，缺省 1.3.2，最新2.0，须jsapi对应版本
      }
    }).then((AMap) => {
      this.map = new AMap.Map('container', {
        viewMode: this.viewMode,
        showBuildingBlock: this.showBuildingBlock
      })
    }).catch(e => {
      console.log(e)
    })
  }
}
export { Createmap }
