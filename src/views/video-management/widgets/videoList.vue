<template>
  <div class="video-list">
    <div class="head-con">
      <div class="head-left">
        <h3>视频选集</h3>
        <span class="cur-page">({{ pageIndex }}/{{ totalPage }})</span>
      </div>
      <div class="head-right">
        <span :class="{ disable: pageIndex <= 1 }" @click="previousHandler"><i class="el-icon-arrow-left"></i></span>
        <span :class="{ disable: pageIndex >= totalPage }"><i class="el-icon-arrow-right" @click="nextHandler"></i></span>
      </div>
    </div>
    <ul v-loading="loading">
      <li v-for="(item, index) in video_url" :key="index" :class="{ on: activeIndex === index }">
        <div
          class="clickitem"
          @click="
            activeIndex = index
            clickVideo(item)
          "
        >
          <div class="link-content">
            <i class="el-icon-video-play"></i>
            <span class="page-num">P{{ index + 1 < 10 ? '0' + (index + 1) : index + 1 }}</span>
            <span class="part">{{ item.speciesTitle }}-{{ item.createTime }}</span>
          </div>
          <div class="duration">
            00:30
            <i v-if="roleCode != 'PT'" @click="deleteImg(item)" class="el-icon-delete delete-icon" title="删除视频"></i>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { galleryList, galleryDelete } from '@/api'
import { getToken } from '@/utils/auth'
export default {
  name: 'vodeoList',
  data() {
    return {
      activeIndex: null,
      loading: false,
      pageIndex: 1,
      pageSize: 30,
      totalPage: 1,
      video_url: [],
      exrData: {},
      roleCode: getToken('roleCode')
    }
  },
  created() {
    this.galleryList()
  },
  methods: {
    previousHandler() {
      if (this.pageIndex <= 1) return
      this.galleryList()
    },
    nextHandler() {
      if (this.pageIndex >= this.totalPage) return
      this.pageIndex++
      this.galleryList()
    },
    clickVideo(item) {
      this.$emit('click-video', item)
    },
    galleryList() {
      this.loading = true
      galleryList({
        type: 2,
        start: (this.pageIndex - 1) * this.pageSize,
        limit: this.pageSize,
        reserveId: getToken('reserveId'),
        ...this.exrData
      })
        .then((res) => {
          this.loading = false
          this.totalPage = Math.ceil(res.data.totalNum / this.pageSize)
          this.video_url = [...this.video_url, ...res.data.list]
        })
        .catch((err) => {})
    },
    deleteImg(item) {
      console.log(item);
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        galleryDelete({ photoId: item.photoId }).then((res) => {
          this.video_url = []
          this.galleryList()
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
      })
    }
  },
  watch: {
    exrData: {
      handler: function () {
        this.pageCount = 1
        this.video_url = []
        this.galleryList()
      },
      deep: true
    }
  }
}
</script>
<style lang="scss">
$active-color: #03a0d6;
.video-list {
  width: 100%;
  height: 100%;
  @include font_color(#222);
  font-size: 12px;
  .head-con {
    display: flex;
    align-items: center;
    color: #222;
    padding: 10px 16px 6px;
    justify-content: space-between;
    .head-left {
      display: flex;
      align-items: center;
      h3 {
        font-size: 16px;
        font-weight: 400;
        margin-right: 8px;
      }
      .cur-page {
        font-size: 12px;
        color: #999;
        line-height: 16px;
      }
    }

    .head-right {
      span {
        display: inline-block;
        background-color: #fff;
        border-radius: 4px;
        font-size: 16px;
        cursor: pointer;
        padding: 2px;
        &:last-child {
          margin-left: 10px;
        }
        &:hover {
          color: $active-color;
        }
      }
      span.disable {
        cursor: not-allowed;
        background-color: rgb(233, 232, 232);
      }
    }
  }
  ul {
    box-sizing: border-box;
    padding: 0 6px;
    overflow: auto;
    height: calc(100% - 32px);
    li.on {
      background: #fff;
      padding: 0 10px 0 6px;
      @include font_color($active-color);
    }
    li {
      display: block;
      height: 30px;
      line-height: 30px;
      padding: 0 10px;
      color: #6d757a;
      margin: 5px 0;
      transition: all 0.3s;
      border-radius: 3px;
      cursor: pointer;
      white-space: nowrap;
      overflow: hidden;
      .clickitem {
        display: flex;
        justify-content: space-between;
        overflow: hidden;
        width: 100%;
        .link-content {
          display: flex;
          align-items: center;
          flex-shrink: 1;
          overflow: hidden;
          i {
            font-size: 16px;
            margin-right: 10px;
          }
          .page-num {
            margin-right: 10px;
          }
          .part {
            display: block;
            overflow: hidden;
            text-overflow: ellipsis;

            flex-shrink: 1;
          }
        }
        .duration {
          font-size: 12px;
          color: #757575;
          justify-self: flex-end;
        }
      }
      &:hover {
        color: $active-color !important;
      }
    }
  }
}
</style>
