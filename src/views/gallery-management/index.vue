<template>
  <div
    class="content"
    style="overflow: auto; overflow-x: hidden"
    v-infinite-scroll="load"
    :infinite-scroll-immediate="true"
    infinite-scroll-delay="200"
  >
    <div class="gallery-main">
      <!-- <ul><li v-for="i in count" :key="i">{{i}}</li></ul> -->
      <from-dynamic class="mb" :searchDynamic="fromOptions" @params-change="handleChange" @query="handleChange">
        <template v-slot:tool>
          <el-button type="success" icon="el-icon-upload" v-if="roleCode != 'PT'" @click="isupload = !isupload">上传</el-button>
        </template>
      </from-dynamic>
      <gallery @click="getImg" @getTotalPage="getTotalPage" v-model="count" ref="gallery"></gallery>
    </div>
    <overlay :close.sync="close" owidth="70vw" title="照片信息">
      <sub-gallery v-if="close" :photoObj="photoObj"></sub-gallery>
    </overlay>
    <transition name="fade">
      <upload v-show="isupload" @on-success="$refs.gallery.refreshList()"></upload>
    </transition>
  </div>
</template>

<script>
import { getToken } from '@/utils/auth'
import FromDynamic from '@/components/CurdViews/FromDynamic'
import gallery from './widgets/gallery.vue'
import subGallery from './widgets/sub-gallery.vue'
import upload from '@/widgets/upload'
import { findCarmeraList, speciesList } from '@/api'
export default {
  data() {
    return {
      count: 1,
      close: false,
      isupload: false,
      fromOptions: [
        { name: 'cameraId', label: '相机', type: 'select', options: [], remoteMethod: this.getCarmeraList() },
        // { name: 'type', label: '多媒体类型', type: 'select', options: [{label:'照片', value:1},{label:'视频', value:2}], default:null },
        { name: 'speciesId', label: '动物类型', type: 'select', options: [], remoteMethod: this.speciesList(), multiple: true },
        // { name: 'code', label: '天气类型', type: 'select', options: [], multiple: true }
        {
          name: 'occurTime',
          label: '日期',
          type: 'daterange',
          format: 'yyyy-MM-dd'
          // default: [this.$day().add(-1, 'day').format('YYYY-MM-DD'), this.$day().format('YYYY-MM-DD')]
        }
      ],
      totalPage: 1,
      photoObj: {},
      roleCode: getToken('roleCode')
    }
  },
  components: { FromDynamic, gallery, subGallery, upload },
  methods: {
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
    handleChange(params) {
      const times = params.occurTime ? params.occurTime.split(',') : []
      if (times.length > 1) {
        params.startTime = times[0] + ' 00:00:00'
        params.endTime = times[1] + ' 23:59:59'
      }
      const param = Object.assign({}, params)
      delete param.occurTime
      this.$refs.gallery.exrData = Object.assign({}, param)
      // console.log(this.$refs.gallery.exrData)
    },
    getTotalPage(page) {
      this.totalPage = page
    },
    getImg({ obj }) {
      console.log(obj)
      this.photoObj = obj
      this.close = true
    },
    load() {
      if (this.count >= this.totalPage) return
      this.count += 1
      console.log(this.count)
      // alert(this.count)
    }
  }
}
</script>
<style lang="scss">
.gallery-main {
  // display: flex;
  // flex-direction: column;
}
</style>
