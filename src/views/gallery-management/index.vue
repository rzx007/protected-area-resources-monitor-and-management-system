<!--
 * @Author: 阮志雄
 * @Date: 2021-10-11 11:31:45
 * @LastEditTime: 2021-11-04 16:40:20
 * @LastEditors: 阮志雄
 * @Description: In User Settings Edit
 * @FilePath: \Protected-Area-Resources-Monitor-and-Management-System\src\views\gallery-management\index.vue
-->
<template>
  <div
    class="content"
    style="overflow:auto;overflow-x:hidden"
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
      <sub-gallery></sub-gallery>
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
      totalPage: 1
    }
  },
  components: { FromDynamic, gallery, subGallery },
  methods: {
    getTotalPage(page) {
      this.totalPage = page
    },
    getImg(msg) {
      console.log(msg)
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
