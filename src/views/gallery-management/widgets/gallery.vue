<!--
 * @Author: 阮志雄
 * @Date: 2021-10-12 10:55:26
 * @LastEditTime: 2021-10-12 17:56:22
 * @LastEditors: 阮志雄
 * @Description: In User Settings Edit
 * @FilePath: \Protected-Area-Resources-Monitor-and-Management-System\src\views\gallery-management\widgets\gallery.vue
-->
<template>
  <div class="gallery-viewer">
    <el-row :gutter="20">
      <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="3" v-for="(item, index) in img_url" :key="index">
        <div class="grid-gallery">
          <div class="gallery-item">
            <img :src="item" alt="" />
            <div class="mask" title="查看照片" @click="clickImg($event, item)">
              <svg-icon type="css" icon="ditu1" style=" font-size: 36px;"></svg-icon>
            </div>
          </div>
          <p>2021/10/13 22:12:18</p>
        </div>
      </el-col>
    </el-row>
    <p v-if="loading">加载中...</p>
    <p v-if="noMore">没有更多了</p>
  </div>
</template>

<script>
import SvgIcon from '../../../components/Svg-icon.vue'
export default {
  components: { SvgIcon },
  data() {
    return {
      img_url: [
        'https://t7.baidu.com/it/u=2596442915,284398145&fm=193&f=GIF',
        'https://t7.baidu.com/it/u=2006997523,200382512&fm=193&f=GIF',
        'https://t7.baidu.com/it/u=3039972918,1763345442&fm=193&f=GIF',
        'https://t7.baidu.com/it/u=2178362500,3992351697&fm=193&f=GIF',
        'https://t7.baidu.com/it/u=1306161837,1467065791&fm=193&f=GIF',
        'https://t7.baidu.com/it/u=2596442915,284398145&fm=193&f=GIF',
        'https://t7.baidu.com/it/u=2006997523,200382512&fm=193&f=GIF',
        'https://t7.baidu.com/it/u=3039972918,1763345442&fm=193&f=GIF',
        'https://t7.baidu.com/it/u=2178362500,3992351697&fm=193&f=GIF',
        'https://t7.baidu.com/it/u=1306161837,1467065791&fm=193&f=GIF',
        'https://t7.baidu.com/it/u=2596442915,284398145&fm=193&f=GIF',
        'https://t7.baidu.com/it/u=2006997523,200382512&fm=193&f=GIF',
        'https://t7.baidu.com/it/u=3039972918,1763345442&fm=193&f=GIF',
        'https://t7.baidu.com/it/u=2178362500,3992351697&fm=193&f=GIF',
        'https://t7.baidu.com/it/u=1306161837,1467065791&fm=193&f=GIF'
      ],
      loading: false
    }
  },
  computed: {
    noMore() {
      return this.count >= 20
    }
  },
  methods: {
    clickImg(event, obj) {
      this.$emit('click', {event, obj})
    }
  }
}
</script>
<style lang="scss">
.gallery-viewer {
  .grid-gallery {
    margin-bottom: 14px;
    .gallery-item {
      height: 180px;
      background-color: #eee;
      overflow: hidden;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      .mask {
        position: absolute;
        border-radius: 6px;
        bottom: -100%;
        left: 0%;
        width: 100%;
        height: 100%;
        background-color: rgba(255, 255, 255, 0);
        transition: background-color 0.4s ease-in-out;
        transition: bottom 0.2s ease-in-out;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #3385ff;
      }
      &:hover {
        img {
          // transform: scale(1.2);
        }
        .mask {
          background-color: rgba(255, 255, 255, 0.7);
          bottom: 0%;
          backdrop-filter: blur(18px);
        }
      }
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
</style>
