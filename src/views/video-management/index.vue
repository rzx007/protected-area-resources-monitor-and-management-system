<template>
  <div class="content" style="background-color: #fff; display: flex; flex-direction: column">
    <from-dynamic class="mb" :searchDynamic="fromOptions" @query="handleChange"> </from-dynamic>
    <div class="video-main">
      <div class="vl-con">
        <video-list ref="gallery" @click-video="clickVideo"></video-list>
      </div>
      <div class="vr-con">
        <videoPlayer ref="video"> </videoPlayer>
      </div>
    </div>
  </div>
</template>

<script>
import FromDynamic from '@/components/CurdViews/FromDynamic'
import videoPlayer from './widgets/videoPlayer.vue'
import videoList from './widgets/videoList.vue'
import { findCarmeraList, speciesList } from '@/api'
export default {
  components: { videoPlayer, videoList, FromDynamic },
  data() {
    return {
      imgurl: '',
      fromOptions: [
        { name: 'cameraId', label: '相机', type: 'select', options: [], remoteMethod: this.getCarmeraList() },
        { name: 'speciesId', label: '动物类型', type: 'select', options: [], remoteMethod: this.speciesList(), multiple: true },
        // { name: 'code', label: '天气类型', type: 'select', options: [], multiple: true }
        {
          name: 'occurTime',
          label: '日期',
          type: 'daterange',
          format: 'yyyy-MM-dd'
          // default: [this.$day().add(-1, 'day').format('YYYY-MM-DD'), this.$day().format('YYYY-MM-DD')]
        }
      ]
    }
  },
  methods: {
    handleChange(params) {
      const times = params.occurTime ? params.occurTime.split(',') : []
      if (times.length > 1) {
        params.startTime = times[0]
        params.endTime = times[1]
      }
      const param = Object.assign({}, params)
      delete param.occurTime
      this.$refs.gallery.exrData = Object.assign({}, param)
      // console.log(this.$refs.gallery.exrData)
    },
    getCarmeraList() {
      return findCarmeraList().then((res) => {
        const cameraList = []
        res.data.forEach((item) => {
          cameraList.push({
            label: item.imeival,
            value: item.id
          })
        })
        return cameraList
      })
    },
    speciesList() {
      return speciesList({ limit: 100, start: 0 }).then((res) => {
        if (res.code === 0) {
          const options = []
          res.data.list.forEach((item) => {
            options.push({
              label: item.title,
              value: item.id
            })
          })
          return options
        }
      })
    },
    clickVideo(item) {
      // 切换播放
      this.$refs.video.setPlayerUrl(item)
    }
  }
}
</script>

<style lang="scss">
.video-main {
  width: 100%;
  height: calc(100% - 48px);
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
