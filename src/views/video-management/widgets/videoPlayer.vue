<!--
 * @Author: 阮志雄
 * @Date: 2021-11-24 23:21:00
 * @LastEditTime: 2021-12-16 23:08:44
 * @LastEditors: 阮志雄
 * @Description: In User Settings Edit
 * @FilePath: \Protected-Area-Resources-Monitor-and-Management-System\src\views\video-management\widgets\videoPlayer.vue
-->
<template>
  <div class="video-content">
    <div class="video-tool">
      <h4>正在播放:{{ videoObj.speciesTitle }}{{ videoObj.createTime }}</h4>
    </div>
    <div class="video-block">
      <video width="100%" height="100%" preload="auto" id="xt-video" src="" controls="controls">
        your browser does not support the video tag
      </video>
    </div>
  </div>
</template>

<script>
export default {
  name: 'xgplayer',
  data() {
    return {
      videoObj: { createTime: '', speciesTitle: '' }
    }
  },
  mounted() {
    // this.initVideo()
  },
  methods: {

    setPlayerUrl(item) {
      const video = document.getElementById('xt-video')
      this.videoObj = item
      video.src = item.url
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
  },
}
</script>
<style lang="scss">
.video-content {
  h4 {
    @include font_color(#222);
    margin-bottom: 10px;
  }
  .video-block {
    width: 100%;
  }
}
</style>
