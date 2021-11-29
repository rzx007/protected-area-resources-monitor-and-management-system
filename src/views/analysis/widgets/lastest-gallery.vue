<template>
  <div class="analysis-gallery-main">
    <div class="title">最新发现</div>
    <div class="analysis-content" v-loading='loading'>
      <el-row :gutter="10">
        <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="8" v-for="(item, index) in img_url" :key="index">
          <div class="grid-gallery">
            <div class="gallery-item">
              <img :src="item.url" alt="" />
              <!-- <div class="mask" title="查看照片" @click="clickImg($event, item)">
                <svg-icon type="css" icon="ditu1" style=" font-size: 36px;"></svg-icon>
              </div> -->
            </div>
            <p>{{ item.createTime }}</p>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { galleryList } from '@/api'
import { getToken } from '@/utils/auth'
export default {
  data() {
    return {
      loading: false,
      img_url: [
        
      ]
    }
  },
  created() {
    this.galleryList()
  },
  methods: {
    galleryList() {
      this.loading = true
      galleryList({ start: 0, limit: 20, reserveId: getToken('reserveId') })
        .then((res) => {
          this.loading = false

          this.img_url = res.data.list
        })
        .catch((err) => {})
    }
  }
}
</script>
<style lang="scss">
.analysis-gallery-main {
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  @include font_color(null);
  @include content-background();
  border-radius: 10px;
  @include box-shadow();
  height: 50vh;
  min-height: 400px;
  .title {
    font-weight: bold;
    font-size: 19px;
  }
  .analysis-content {
    padding: 12px 0;
    box-sizing: border-box;
    width: 100%;
    height: calc(100% - 40px);
    overflow-y: auto;
    overflow-x: hidden;
    .grid-gallery {
      margin-bottom: 14px;
      .gallery-item {
        height: 180px;
        background-color: #eee;
        overflow: hidden;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        img {
          width: 100%;
          height: 100%;
          object-fit: fill;
          transition: all 0.3s ease-in-out;
        }
      }
      p {
        @include font_color(null);
        font-size: 16px;
        line-height: 30px;
      }
    }
  }
}
</style>
