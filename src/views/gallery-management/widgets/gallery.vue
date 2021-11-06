<template>
  <div class="gallery-viewer">
    <el-row :gutter="20" style="min-height: 80vh;">
      <el-col :xs="8" :sm="6" :md="6" :lg="4" :xl="4" v-for="(item, index) in img_url" :key="index">
        <div class="grid-gallery animation-gallery" :style="animationDelay(index)">
          <div class="gallery-item">
            <img :src="item.url" alt="" />
            <div class="mask" title="查看照片" @click="clickImg($event, item)">
              <svg-icon type="css" icon="ditu1" style=" font-size: 36px;"></svg-icon>
            </div>
          </div>
          <p class="time">{{ item.createTime }}</p>
          <p class="camera-name">{{ item.speciesInfo }}</p>
        </div>
      </el-col>
    </el-row>
    <p v-if="loading" class="loading-tips">加载中...</p>
    <p v-if="noMore" class="loading-tips">没有更多了</p>
  </div>
</template>

<script>
import { galleryList, galleryUpdate, galleryDelete } from '@/api'
import { getToken } from '@/utils/auth'
export default {
  data() {
    return {
      img_url: [],
      load_ing: [
        'https://t7.baidu.com/it/u=3039972918,1763345442&fm=193&f=GIF',
        'https://t7.baidu.com/it/u=2178362500,3992351697&fm=193&f=GIF',
        'https://t7.baidu.com/it/u=1306161837,1467065791&fm=193&f=GIF',
        'https://t7.baidu.com/it/u=2006997523,200382512&fm=193&f=GIF',
        'https://t7.baidu.com/it/u=3039972918,1763345442&fm=193&f=GIF',
        'https://t7.baidu.com/it/u=2178362500,3992351697&fm=193&f=GIF',
        'https://t7.baidu.com/it/u=1306161837,1467065791&fm=193&f=GIF'
      ],
      loading: false,
      pageSize: 20,
      totalPage: 1,
      dellyCount: 0
    }
  },
  props: {
    pageIndex: {
      type: Number,
      default: 1
    }
  },
  computed: {
    noMore() {
      return this.pageIndex >= this.totalPage
    }
  },
  created() {
    // this.galleryList()
  },
  methods: {
    galleryList() {
      this.loading = true
      galleryList({ start: (this.pageIndex - 1) * this.pageSize, limit: this.pageSize, reserveId: getToken('reserveId') })
        .then(res => {
          this.loading = false
          this.totalPage = Math.ceil(res.data.totalNum / this.pageSize)
          this.$emit('getTotalPage', this.totalPage)
          this.img_url = [...this.img_url, ...res.data.list]
        })
        .catch(err => {})
    },
    clickImg(event, obj) {
      this.$emit('click', { event, obj })
    },
    animationDelay(index) {
      let time = index
      let len = this.img_url.length - this.dellyCount
      if (index > len - 1) {
        time = index - len
        return { animationDelay: time * 50 + 100 + 'ms' }
      } else {
        return this.pageIndex < 2 && { animationDelay: time * 100 + 200 + 'ms' }
      }
    }
  },
  // mounted() {
  //   setTimeout(() => {
  //     this.img_url = [
  //       'https://t7.baidu.com/it/u=2596442915,284398145&fm=193&f=GIF',
  //       'https://t7.baidu.com/it/u=2006997523,200382512&fm=193&f=GIF',
  //       'https://t7.baidu.com/it/u=3039972918,1763345442&fm=193&f=GIF',
  //       'https://t7.baidu.com/it/u=2178362500,3992351697&fm=193&f=GIF',
  //       'https://t7.baidu.com/it/u=1306161837,1467065791&fm=193&f=GIF',
  //       'https://t7.baidu.com/it/u=2596442915,284398145&fm=193&f=GIF',
  //       'https://t7.baidu.com/it/u=2006997523,200382512&fm=193&f=GIF',
  //       'https://t7.baidu.com/it/u=3039972918,1763345442&fm=193&f=GIF',
  //       'https://t7.baidu.com/it/u=2178362500,3992351697&fm=193&f=GIF',
  //       'https://t7.baidu.com/it/u=1306161837,1467065791&fm=193&f=GIF',
  //       'https://t7.baidu.com/it/u=2596442915,284398145&fm=193&f=GIF',
  //       'https://t7.baidu.com/it/u=3039972918,1763345442&fm=193&f=GIF',
  //       'https://t7.baidu.com/it/u=2178362500,3992351697&fm=193&f=GIF',
  //       'https://t7.baidu.com/it/u=1306161837,1467065791&fm=193&f=GIF',
  //       'https://t7.baidu.com/it/u=2006997523,200382512&fm=193&f=GIF',
  //       'https://t7.baidu.com/it/u=3039972918,1763345442&fm=193&f=GIF',
  //       'https://t7.baidu.com/it/u=2178362500,3992351697&fm=193&f=GIF',
  //       'https://t7.baidu.com/it/u=1306161837,1467065791&fm=193&f=GIF',
  //       'https://t7.baidu.com/it/u=2006997523,200382512&fm=193&f=GIF'
  //     ]
  //   }, 0)
  // },
  watch: {
    img_url: function(newVal, oldVal) {
      this.dellyCount = newVal.length - oldVal.length
    },
    pageIndex: function(val) {
      this.galleryList()
      // this.loading = true
      // setTimeout(() => {
      //   this.img_url = [...this.img_url, ...this.load_ing]
      //   this.loading = false
      // }, 1000)
    }
  }
}
</script>
<style lang="scss">
$radius: 12px;
$image-height: 190px;
.gallery-viewer {
  padding-bottom: 24px;
  box-sizing: border-box;
  .grid-gallery {
    margin-bottom: 18px;
    .gallery-item {
      height: $image-height;
      background-color: #eee;
      overflow: hidden;
      border-radius: $radius;
      cursor: pointer;
      position: relative;
      .mask {
        position: absolute;
        border-radius: $radius;
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
    .time {
      @include font_color(null);
      font-size: 14px;
      margin-top: 14px;
    }
    .camera-name {
      font-weight: bolder;
      @include font_color(null);
      line-height: 30px;
    }
  }
  .animation-gallery {
    transition: all linear;
    animation-name: toTop; // toBottom
    animation-duration: 0.2s; // 注释掉 会没有动画 就是帕帕一帧一帧的出来
    animation-fill-mode: both;
    transform-style: preserve-3d;
  }
  // 方向 下-->上
  @keyframes toTop {
    0% {
      opacity: 0;
      perspective: 160;
      perspective-origin: 10% 10%;
      transform: translate3d(0, 0%, 100px);
    }

    100% {
      opacity: 1;
      perspective: 0;
      perspective-origin: 50%;
      transform: translate3d(0, 0, 0);
    }
  }
  .loading-tips {
    text-align: center;
    @include font_color(null);
  }
}
</style>
