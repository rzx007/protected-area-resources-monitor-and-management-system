<template>
  <div class="content">
    <div class="curd_view">
      <div class="curd_table_view gallery-main">
        <from-dynamic class="mb" :searchDynamic="fromOptions"></from-dynamic>
        <div class="curd_table gallery-content" v-infinite-scroll="load">
          <gallery @click="getImg"></gallery>
        </div>
      </div>
      <overlay :close.sync="close" owidth="70vw" title="照片信息">
        <sub-gallery></sub-gallery>
      </overlay>
    </div>
  </div>
</template>

<script>
import FromDynamic from '@/components/CurdViews/FromDynamic'
import gallery from './widgets/gallery.vue'
import subGallery from './widgets/sub-gallery.vue'
export default {
  data() {
    return {
      count: 0,
      close: false,
      fromOptions: [
        { name: 'description', label: '相机', type: 'select', options: [] },
        { name: 'occurTime', label: '日期', type: 'daterange', format: 'YYYY-MM-DD' },
        { name: 'code', label: '动物类型', type: 'select', options: [], multiple: true },
        { name: 'code', label: '天气类型', type: 'select', options: [], multiple: true }
      ]
    }
  },
  components: { FromDynamic, gallery, subGallery },
  methods: {
    getImg(msg) {
      console.log(msg)
      this.close = true
    },
    load() {
      this.count += 2
      alert(this.count)
    }
  }
}
</script>
<style lang="scss">
.gallery-main {
  display: flex;
  flex-direction: column;
}
.gallery-content {
  // min-height: 64vh;
  flex: 1;
  overflow: auto;
  // display: grid;
  // justify-content: flex-start;
  // flex-wrap: wrap;
  // align-items: flex-start;
}
</style>
