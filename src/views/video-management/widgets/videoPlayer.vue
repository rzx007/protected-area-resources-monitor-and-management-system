<!--
 * @Author: 阮志雄
 * @Date: 2021-11-24 23:21:00
 * @LastEditTime: 2021-11-24 23:31:26
 * @LastEditors: 阮志雄
 * @Description: In User Settings Edit
 * @FilePath: \Protected-Area-Resources-Monitor-and-Management-System\src\views\video-management\widgets\videoPlayer.vue
-->
<template>
  <div class="video-content">
    <div class="video-tool">
      <h1>视频标题</h1>
    </div>
    <div class="video-block">
      <div id="mse"></div>
    </div>
  </div>
</template>

<script>
import Player from 'xgplayer'
let player = null
export default {
  name: 'xgplayer',
  data() {
    return {
      imgurl: ''
    }
  },
  mounted() {
    this.initVideo()
    setTimeout(()=>{}, 4000)
  },
  methods: {
    initVideo() {
      player = new Player({
        id: 'mse',
        url: '//sf1-cdn-tos.huoshanstatic.com/obj/media-fe/xgplayer_doc_video/mp4/xgplayer-demo-360p.mp4',
        poster: '//abc.com/**/*.png',
        videoInit: true, // 显示首帧
        lang: 'zh-cn',
        download: true,
        // width: '100%',
        // height: "100%",
        fluid: true,
        autoplay: false,
        screenShot: true,
        isLive: true,
        preloadTime: 30,
        minCachedTime: 5,
        cors: true
      })

      // 监听播放器截图事件
      player.on('screenShot', (screenShotImg) => {
        // 替换type类型
        let base64Data = screenShotImg.replace('data:application/octet-stream;base64', 'data:image/png;base64')

        // 转文件
        // this.imgurl = this.getBaseImage(base64Data, '1.png')

        // base64直接赋值img标签展示
        this.imgurl = base64Data
        console.log(screenShotImg, this.imgurl)
      })
    },

    // base64转文件
    getBaseImage(dataUrl, fileName) {
      let arr = dataUrl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n)
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      return new File([u8arr], fileName, { type: mime })
    }
  }
}
</script>
<style lang='scss'>
</style>