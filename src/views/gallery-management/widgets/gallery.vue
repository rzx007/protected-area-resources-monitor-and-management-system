<template>
  <div class="gallery-viewer">
    <div class="gallery-tool" v-show="checkedArr.length > 0">
      <i class="el-icon-delete" @click="deleteImg" title="删除"></i>
      <i class="el-icon-finished" @click="checkAllImgs" title="全选"></i>
      <span class="cancel" title="取消选择" @click="cancelAllCheck()">取消</span>
    </div>
    <el-row :gutter="20" style="min-height: 80vh">
      <el-col :xs="8" :sm="6" :md="6" :lg="4" :xl="4" v-for="(item, index) in img_url" :key="index">
        <div class="grid-gallery animation-gallery" :style="animationDelay(index)">
          <div :class="[checkedArr.indexOf(item.photoId) > -1 ? 'gallery-item-checked' : '', 'gallery-item']">
            <img :src="item.url" alt="" />
            <div class="mask" title="查看照片" @click="showViewer(item, index)">
              <span
                v-if="['JGD','JFZ','JZ','CG'].includes(getToken('roleCode'))"
                :class="[
                  checkedArr.indexOf(item.photoId) > -1 ? 'checked-span' : '',
                  checkedArr.length > 0 ? 'checked-mode-span' : '',
                  'check-span'
                ]"
                @click.stop="checkImg(item.photoId)"
              >
                <i :class="{ 'el-icon-check': checkedArr.indexOf(item.photoId) > -1 }"></i
              ></span>
            </div>
          </div>
          <div class="img-info">
            <div>
              <!-- <p class="time">{{ item.photoId }}</p> -->
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
import { getToken } from '@/utils/auth'
import 'viewerjs/dist/viewer.css'
import { api as viewerApi } from 'v-viewer'
import { galleryList, galleryDelete } from '@/api'
export default {
  data() {
    return {
      img_url: [],
      load_ing: [],
      loading: false,
      pageSize: 20,
      pageCount: 1,
      totalPage: 1,
      dellyCount: 0,
      checkedArr: [],
      exrData: {},
      roleCode: getToken('roleCode')
    }
  },
  props: {
    pageIndex: {
      type: Number,
      default: 1
    }
  },
  model: {
    prop: 'pageIndex',
    event: 'change'
  },
  computed: {
    noMore() {
      return this.pageIndex >= this.totalPage
    },
    sourceImageURLs() {
      return this.img_url.map((item) => item.url)
    }
  },
  created() {
    // this.galleryList()
  },
  methods: {
    galleryList() {
      this.loading = true
      galleryList({
        type: 1,
        start: (this.pageCount - 1) * this.pageSize,
        limit: this.pageSize,
        reserveId: getToken('reserveId'),
        ...this.exrData
      })
        .then((res) => {
          this.loading = false
          this.totalPage = Math.ceil(res.data.totalNum / this.pageSize)
          this.$emit('getTotalPage', this.totalPage)
          this.img_url = [...this.img_url, ...res.data.list]
        })
        .catch((err) => {})
    },
    showViewer(obj, index) {
      if (this.checkedArr.length > 0) {
        this.checkImg(obj.photoId)
      } else {
        const $viewer = viewerApi({
          images: this.sourceImageURLs,
          options: {
            initialViewIndex: index
          }
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
        return this.pageCount < 2 && { animationDelay: time * 100 + 200 + 'ms' }
      }
    },
    checkImg(id) {
      const index = this.checkedArr.indexOf(id)
      index > -1 ? this.checkedArr.splice(index, 1) : this.checkedArr.push(id)
    },
    checkAllImgs() {
      this.img_url.forEach((item) => {
        const index = this.checkedArr.indexOf(item.photoId)
        if (index < 0) {
          this.checkedArr.push(item.photoId)
        }
      })
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
        galleryDelete({ photoId: this.checkedArr.join(',') }).then((res) => {
          this.pageCount = 1
          this.$emit('change', this.pageCount)
          this.img_url = []
          this.galleryList()
          this.checkedArr = []
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
      })
    },
    refreshList() {
      this.pageCount = 1
      this.img_url = []
      this.galleryList()
    }
  },
  mounted() {
    // for (let index = 0; index < 21; index++) {
    //   this.img_url.push({
    //     url: 'http://picture.ik123.com/uploads/allimg/161203/3-1612030ZG5.jpg',
    //     photoId: Math.random().toString(),
    //     createTime: this.$day().format('YYYY-MM-DD HH:mm:ss'),
    //     speciesInfo: '碳基生物',
    //     userId: 1
    //   })
    // }
  },
  watch: {
    img_url: function (newVal, oldVal) {
      this.dellyCount = newVal.length - oldVal.length
    },
    pageIndex: function (val) {
      this.pageCount = val
      this.galleryList()
      // this.loading = true
      // setTimeout(() => {
      //   for (let index = 0; index < 11; index++) {
      //     this.img_url.push({
      //       url: 'https://t7.baidu.com/it/u=2596442915,284398145&fm=193&f=GIF',
      //       photoId: Math.random().toString(),
      //       createTime: this.$day().format('YYYY-MM-DD HH:mm:ss'),
      //       speciesInfo: '碳基生物',
      //       userId: 1
      //     })
      //   }
      //   this.loading = false
      // }, 1000)
    },
    exrData: {
      handler: function () {
        this.refreshList()
      },
      deep: true
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
        transition: background-color 0.4s ease-in-out;
        .video-iocns {
          font-size: 56px;
          position: absolute;
          top: 50%;
          left: 50%;
          // transform: translateX(-50%);
          transform: translate(-50%, -50%);
        }
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
          // backdrop-filter: blur(1px);
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
        opacity: 0;
        transition: all 0.3s ease-in-out;
      }
      &:hover {
        i {
          opacity: 1;
          color: $colors;
        }
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
