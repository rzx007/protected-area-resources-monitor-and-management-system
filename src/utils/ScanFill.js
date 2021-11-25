class PolygonGrid {
  strokeStyle = 'solid' // dashed 折线的样式
  strokeColor = "#fff" // 折线的颜色
  constructor(config) {
    let defaultConfig = {
      mapInstance: null,
      angel: 180,
      interval: 273, // 平行折线之间间隔px
      allPoints: []
    }
    defaultConfig = Object.assign({}, defaultConfig, config)
    this.allPoints = defaultConfig.allPoints // 存多边形的经纬度数据
    this.mapInstance = defaultConfig.mapInstance // 地图实例
    this.angel = defaultConfig.angel // 线的度数 180 45 90
    this.interval = defaultConfig.interval
    this.lnglatToPixel(this.allPoints)
  }
  watch(obj) {
    Object.defineProperty(this, 'allPoints', {
      get: () => {
        return []
      },
      set: value => {
        this.lnglatToPixel(value)
      }
    })
  }
  /** 地图经纬度转成坐标 */
  lnglatToPixel(points) {
    const pixel = points.map(it => {
      const lnglat = new AMap.LngLat(it[0], it[1])
      const pixel = this.mapInstance.lngLatToContainer(lnglat)
      const x = pixel.x
      const y = pixel.y
      return { x, y }
    })
    this.findPoints(pixel, points)
  }
  calc_side_Function(pointsPixel) {
    const length = pointsPixel.length
    const coefficient = []
    for (let i = 0; i < length; i++) {
      const x2 = pointsPixel[(i + 1) % length].x
      const y2 = pointsPixel[(i + 1) % length].y
      const x1 = pointsPixel[i].x
      const y1 = pointsPixel[i].y
      const a = (x2 - x1) ? (y2 - y1) / (x2 - x1) : 0 //tanA
      const b = (x1 - x2) ? (y2 * x1 - y1 * x2) / (x1 - x2) : 0  // 常量
      coefficient.push({ a, b, x: x1 })
    }
    return coefficient // 每条边都是一元一次方程，存放一元一次方程的的a,b, y = a * x + b
  }
  /**
   *  以45度角度的线为填充线，则它的公式是 y = x + b, 所以他的范围取决于 b = y - x, 
   *  将多边形的路径以b排序分别获得填充的最大的值和最小的值
   */
  scanLine(pointsPixel) {
    const angel = this.angel
    if (angel === 45) {
      return pointsPixel.map(it => it.y - it.x).sort((a, b) => a - b)
    }
    if (angel === 90) {
      return pointsPixel.map(it => it.x).sort((a, b) => a - b)
    }
    if (angel === 180) {
      return pointsPixel.map(it => it.y).sort((a, b) => a - b)
    }
    if (angel === -45) {
      return pointsPixel.map(it => it.y + it.x).sort((a, b) => a - b)
    }
  }
  /** 根据两条线的系数算出所有相交的点 */
  equation(a, b, i, xs) {
    let x = 0
    let y = 0
    const angel = this.angel
    if (angel === 45) {
      x = (b - i) / (1 - a)
      y = x + i
    }
    if (angel === 90) {
      x = i
      y = a * i + b
    }
    if (angel === 180) {
      x = a ? (i - b) / a : 0
      y = i
    }
    if (angel === -45) {
      x = (1 + a) ? (i - b) / (1 + a) : 0
      if (a === 0 && b === 0) {
        x = xs
      }
      y = i - x
    }
    return { x, y }
  }
  /** 找出相交的点 */
  findPoints(pointsPixel, points) {
    const interval = this.interval
    const sortPixel = this.scanLine(pointsPixel)
    const min = Math.floor(sortPixel[0])
    const max = Math.ceil(sortPixel[sortPixel.length - 1])
    const coefficient = this.calc_side_Function(pointsPixel)
    const intersection_point = []
    const ring = points.map(it => {
      return new AMap.LngLat(it[0], it[1])
    })
    for (let i = min; i <= max; i += interval) {
      let arr = coefficient.map(it => {
        const coordinate = this.equation(it.a, it.b, i, it.x)
        const pixel = new AMap.Pixel(coordinate.x, coordinate.y)
        return this.mapInstance.containerToLngLat(pixel)
      })

      arr = arr.filter(it => {
        return AMap.GeometryUtil.isPointOnRing(it, ring) // 这里在去除一下不在边上的点
      })
      let filterArr = []

      for (let i = 0; i < arr.length - 1; i++) {
        filterArr.push(arr.slice(i, i + 2)) // 这里把所有点分成多个线段
      }
      if (filterArr.length !== 0) {
        filterArr.forEach((it) => {
          const lnglat0 = new AMap.LngLat(it[0].lng, it[0].lat)
          const pixel0 = this.mapInstance.lngLatToContainer(lnglat0)
          const x0 = pixel0.x
          const y0 = pixel0.y
          const lnglat1 = new AMap.LngLat(it[1].lng, it[1].lat)
          const pixel1 = this.mapInstance.lngLatToContainer(lnglat1)
          const x1 = pixel1.x
          const y1 = pixel1.y
          const centerX1 = (x1 + x0) / 2
          const centerY1 = (y1 + y0) / 2

          const centerX2 = (x1 + centerX1) / 2
          const centerY2 = (y1 + centerY1) / 2

          const pixelc1 = new AMap.Pixel(centerX1, centerY1)
          const lnglatc1 = this.mapInstance.containerToLngLat(pixelc1)

          const pixelc2 = new AMap.Pixel(centerX2, centerY2)
          const lnglatc2 = this.mapInstance.containerToLngLat(pixelc2)

          // 判断线段的中心点和线段中心的中心点是否在地块中，不在就去掉
          // intersection_point.push(it)
          if (AMap.GeometryUtil.isPointInRing(lnglatc1, ring) && AMap.GeometryUtil.isPointInRing(lnglatc2, ring)) {
            intersection_point.push(it)
          }
        })
      }
      filterArr = []
      arr = []
    }
    this.draw(intersection_point)
  }
  /** 构建折线 */
  draw(polylinePoints) {
    polylinePoints.forEach((it, index) => {
      const polyLineOption = {
        strokeColor: this.strokeColor,
        strokeWeight: 2,
        borderWeight: 0,
        strokeStyle: this.strokeStyle,
        path: it,
        bubble: false,
        extData: this.polylineName
      }
      const polyLine = new AMap.Polyline(polyLineOption)
      this.mapInstance.add(polyLine)
    })
  }
}
export default PolygonGrid
/** 计算向内扩展点坐标 */
// this.scanFill.map = this.map // 你创建的高德地图实例
// this.scanFill.allPoints = path // 多边形的路径经纬度
// https://blog.csdn.net/a18202398614/article/details/111832113
/*
设过A、B两点的直线L：y=kx+b,
由已知k=(y2-y1)/(x2-x1),
则直线方程为y=[(y2-y1)/(x2-x1)]x+b,
将A点坐标带入直线方程：y1=[(y2-y1)/(x2-x1)]x1+b
即,b=(x2*y1-y2*x1)/(x2-x1) ,就是你写的式子
*/
// 116.368904,39.923423
// 116.380619,39.923439
//  0.011715 1KM间隔经度

/*
116.368904,39.923423
116.369021,39.914437
0.008986 1KM间隔度
*/