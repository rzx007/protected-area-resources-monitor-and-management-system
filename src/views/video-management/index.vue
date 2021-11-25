<template>
  <div class="content" style="background-color: #fff">
    <div class="video-main">
      <div class="vl-con"></div>
      <div class="vr-con">
        <videoPlayer> </videoPlayer>
      </div>
    </div>
  </div>
</template>

<script>
import videoPlayer from './widgets/videoPlayer.vue'
export default {
  components:{videoPlayer},
  data() {
    return {
      imgurl: ''
    }
  },

  methods: {}
}
</script>

<style lang="scss">
.video-main {
  width: 100%;
  min-width: 988px;
  height: 100%;
  margin: 0 auto;
  padding: 0 68px;
  display: flex;
  box-sizing: border-box;
  justify-content: center;
  .vl-con {
    width: 320px;
    flex: none;
    margin-right: 30px;
    background-color: #f4f4f4;
  }
  .vr-con {
    flex: 1;
  }
}
</style>
