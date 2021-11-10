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
      <from-dynamic class="mb" :searchDynamic="fromOptions"></from-dynamic>
      <gallery @click="getImg" @getTotalPage="getTotalPage" :pageIndex="count"></gallery>
    </div>
    <overlay :close.sync="close" owidth="70vw" title="照片信息">
      <sub-gallery v-if="close" :photoObj="photoObj"></sub-gallery>
    </overlay>
  </div>
</template>

<script>
import { galleryList, galleryUpdate, galleryDelete } from '@/api'
import FromDynamic from '@/components/CurdViews/FromDynamic'
import gallery from './widgets/gallery.vue'
import subGallery from './widgets/sub-gallery.vue'
export default {
  data() {
    return {
      count: 1,
      close: false,
      fromOptions: [
        { name: 'description', label: '相机', type: 'select', options: [] },
        { name: 'occurTime', label: '日期', type: 'daterange', format: 'YYYY-MM-DD' },
        { name: 'code', label: '动物类型', type: 'select', options: [], multiple: true },
        { name: 'code', label: '天气类型', type: 'select', options: [], multiple: true }
      ],
      totalPage: 1,
      photoObj: {}
    }
  },
  components: { FromDynamic, gallery, subGallery },
  methods: {
    getTotalPage(page) {
      this.totalPage = page
    },
    getImg({obj}) {
      console.log(obj)
      this.photoObj = obj
      this.close = true
    },
    load() {
      if (this.count >= 12) return
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
