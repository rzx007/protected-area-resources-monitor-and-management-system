<template>
  <div class="gallery-viewer">
    <div class="gallery-tool" v-show="checkedArr.length > 0">
      <i class="el-icon-delete" @click="deleteImg"></i>
      <span class="cancel" title="取消选择" @click="cancelAllCheck()">取消</span>
    </div>
    <el-row :gutter="20" style="min-height: 80vh;">
      <el-col :xs="8" :sm="6" :md="6" :lg="4" :xl="4" v-for="(item, index) in img_url" :key="index">
        <div class="grid-gallery animation-gallery" :style="animationDelay(index)">
          <div :class="[checkedArr.indexOf(item.photoId) > -1 ? 'gallery-item-checked' : '', 'gallery-item']">
            <img :src="item.url" alt="" />
            <div class="mask" title="查看照片" @click="showViewer(item)">
              <span
                :class="[
                  checkedArr.indexOf(item.photoId) > -1 ? 'checked-span' : '',
                  checkedArr.length > 0 ? 'checked-mode-span' : '',
                  'check-span'
                ]"
                @click.stop="checkImg(item.photoId)"
              ></span>
            </div>
          </div>
          <div class="img-info">
            <div>
              <p class="time">{{ item.createTime }}</p>
              <p class="camera-name">{{ item.speciesInfo }}</p>
            </div>
            <i class="el-icon-s-tools" @click="clickImg($event, item)"></i>
          </div>
        </div>
      </el-col>
    </el-row>
    <p v-if="loading" class="loading-tips">加载中...</p>
    <p v-if="noMore" class="loading-tips">没有更多了</p>
  </div>
</template>

<script>
import 'viewerjs/dist/viewer.css'
import { api as viewerApi } from 'v-viewer'
import { galleryList, galleryUpdate, galleryDelete } from '@/api'
import { getToken } from '@/utils/auth'
export default {
  data() {
    return {
      img_url: [],
      load_ing: [],
      loading: false,
      pageSize: 20,
      totalPage: 1,
      dellyCount: 0,
      checkedArr: []
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
    },
    sourceImageURLs() {
      return this.img_url.map(item => item.url)
    }
  },
  created() {
    this.galleryList()
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
    showViewer(obj) {
      if (this.checkedArr.length > 0) {
        this.checkImg(obj.photoId)
      } else {
        const $viewer = viewerApi({
          images: this.sourceImageURLs
        })
      }
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
    },
    checkImg(id) {
      const index = this.checkedArr.indexOf(id)
      index > -1 ? this.checkedArr.splice(index, 1) : this.checkedArr.push(id)
    },
    cancelAllCheck() {
      this.checkedArr = []
    },
    deleteImg() {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        galleryDelete({ photoId: this.checkedArr.join(',') }).then(res => {
          this.galleryList()
          this.checkedArr = []
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
      })
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
      // this.galleryList()
      // this.loading = true
      setTimeout(() => {
        for (let index = 0; index < 11; index++) {
          this.img_url.push({
            url: 'https://t7.baidu.com/it/u=2006997523,200382512&fm=193&f=GIF',
            photoId: Math.random().toString(),
            createTime: this.$day().format('YYYY-MM-DD HH:mm:ss'),
            speciesInfo: '碳基生物'
          })
        }
        this.loading = false
      }, 1000)
    }
  }
}
</script>
<style lang="scss">
$radius: 12px;
$image-height: 190px;
$colors: #3385ff;
.gallery-viewer {
  padding-bottom: 24px;
  box-sizing: border-box;
  .gallery-tool {
    background-color: #3a3838;
    text-align: end;
    line-height: 40px;
    box-sizing: border-box;
    border-radius: 4px;
    margin-bottom: 12px;
    padding: 4px 0;
    i {
      margin-right: 20px;
      font-size: 18px;
      cursor: pointer;
    }
    .cancel {
      display: inline-block;
      text-align: center;
      padding: 0 20px;
      background-color: #4e4b4b;
      margin-right: 10px;
      cursor: pointer;
    }
  }
  .grid-gallery {
    margin-bottom: 18px;
    .gallery-item {
      border: 4px solid transparent;
      height: $image-height;
      background-color: #eee;
      overflow: hidden;
      border-radius: $radius;
      cursor: pointer;
      position: relative;
      .mask {
        position: absolute;
        border-radius: $radius;
        top: 0;
        left: 0%;
        width: 100%;
        height: 100%;
        // background-color: rgba(255, 255, 255, 0);
        transition: background-color 0.4s ease-in-out;
        // transition: bottom 0.6s ease-in-out;
        // display: flex;
        // justify-content: center;
        // align-items: center;
        color: $colors;
        .check-span {
          position: absolute;
          top: 10px;
          right: 10px;
          display: inline-block;
          border: 2px solid rgb(39, 38, 38);
          height: 16px;
          width: 16px;
          border-radius: 4px;
          transform: scale(0);
          transition: transform 0.3s ease-in-out;
        }
        .checked-mode-span {
          transform: scale(1);
        }
        .checked-span {
          background-color: $colors;
          border: 2px solid $colors;
        }
        &:hover {
          background-color: rgba(0, 0, 0, 0.3);
          // backdrop-filter: blur(10px);
          .check-span {
            transform: scale(1);
          }
        }
      }
      img {
        width: 100%;
        height: 100%;
        object-fit: fill;
        transition: all 0.3s ease-in-out;
      }
    }
    .gallery-item-checked {
      border: 4px solid $colors;
    }
    .img-info {
      display: flex;
      align-items: center;
      justify-content: space-between;
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
      i {
        @include font_color(null);
        font-size: 20px;
        cursor: pointer;
      }
    }
  }
  .animation-gallery {
    transition: all ease-in-out;
    animation-name: toTop; // toBottom
    animation-duration: 0.9s; // 注释掉 会没有动画 就是帕帕一帧一帧的出来
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
