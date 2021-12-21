<template>
  <div class="x-upload-mian" :class="collspe ? 'x-upload-mian-collspe' : 'x-upload-mian-nocollspe'">
    <el-progress v-show="fileList.length" :percentage="percentage" class="progress" :stroke-width="3" :show-text="false"></el-progress>
    <div class="x-upload-title" @click="collspe = !collspe">
      <p class="left">
        <span>{{ subTitle }}上传</span>
        <i v-show="loading" class="el-icon-loading"></i>
      </p>
      <i :class="collspe ? 'el-icon-arrow-up' : 'el-icon-arrow-down'"></i>
    </div>
    <el-select v-model="cameraId" placeholder="选择相机" style="width: 100%; margin-bottom: 12px">
      <el-option v-for="item in cameraList" :key="item.id" :label="item.imeival" :value="item.imeival"> </el-option>
    </el-select>
    <p v-if="isGallery">
      <el-input v-model="lng" style="width: 180px" placeholder="经度"></el-input>
      <el-input v-model="lat" style="width: 180px" placeholder="纬度"></el-input>
    </p>
    <div class="x-upload-content" v-loading="loading">
      <el-upload
        :disabled="!cameraId"
        :limit="limit"
        action="customize"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :http-request="uploadFile"
        :on-change="handleChange"
        :on-exceed="handleExceed"
        :file-list="fileList"
        :before-upload="beforeAvatarUpload"
        list-type="text"
        drag
        multiple
      >
        <div>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">
            <strong style="color: red">选择相机后</strong>
            ,将文件拖到此处，或<em>点击上传</em>
          </div>
        </div>
        <div slot="tip" class="el-upload__tip">只能上传{{ subTitle }}文件，且不超过5M, 最多一次性上传{{ limit }}</div>
      </el-upload>
    </div>
  </div>
</template>

<script>
import { findCarmeraList, uploadImage } from '@/api'
export default {
  data() {
    return {
      cameraId: '',
      cameraList: [],
      collspe: false,
      fileList: [],
      percentage: 0,
      activeIndex: 0,
      loading: false,
      lng: '',
      lat: ''
    }
  },
  props: {
    imageType: {
      type: Array,
      default: function () {
        return ['image/gif', 'image/jpeg', 'image/jpg', 'image/png', 'image/svg', 'video/quicktime']
      }
    },
    maxSize: {
      type: Number,
      default: 5
    },
    limit: {
      type: Number,
      default: 10
    },
    subTitle: {
      type: String,
      default: '图片'
    },
    isGallery: {
      type: Boolean,
      default: true
    }
  },
  created() {
    this.getCarmeraList()
  },
  methods: {
    getCarmeraList() {
      findCarmeraList().then((res) => {
        this.cameraList = res.code === 0 ? res.data : []
      })
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    beforeAvatarUpload(file) {
      const isJPG = this.imageType.includes(file.type)
      const isLt5M = file.size / 1024 / 1024 < this.maxSize

      if (!isJPG) {
        this.$message.error('文件上传类型不对!')
      }
      if (!isLt5M) {
        this.$message.error(`文件上传大小不能超过 ${this.maxSize}MB!`)
      }
      return isJPG && isLt5M
    },
    handleExceed() {
      this.$message.warning('超出单次上传文件数量!')
    },
    handleChange(file, fileList) {
      console.log(file, fileList)
      this.fileList = fileList
    },
    uploadFile(params) {
      this.loading = true
      const { file, data } = params
      // 通过 FormData 对象上传文件
      var formData = new FormData()
      formData.append('Image', file)
      formData.append('ImeiVal', this.cameraId)
      if (this.isGallery) {
        formData.append('LongitudeVal', this.lng)
        formData.append('LatitudeVal', this.lat)
      }
      // formData.append('name', file.name)
      formData.append('lastModifiedDate', this.$day(file.lastModified).format('YYYY-MM-DD HH:mm:ss'))
      // this.$day(params.lastModifiedDate).format('YYYY-MM-DD HH:mm:ss')
      // /admin/carousel/addFile
      uploadImage(formData).then((res) => {
        res.code === 0 ? this.$message.success('已上传!') : this.$message.warning('上传失败!')
        this.activeIndex++
        if (this.activeIndex === this.fileList.length) {
          this.loading = false
          this.activeIndex = 0
          this.fileList = []
          this.$emit('on-success')
        }
        this.percentage = (this.activeIndex / this.fileList.length) * 100
      })
    }
  }
}
</script>
<style lang="scss">
.x-upload-mian-collspe {
  transition: all 0.5s ease-in-out;
  top: 95% !important;
}
.x-upload-mian-nocollspe {
  transition: all 0.5s ease-in-out;
  bottom: 12px !important;
}
.x-upload-mian {
  @include box-shadow();
  @include content-background();
  padding: 16px;
  border-radius: 12px;
  position: fixed;
  right: 12px;
  // top: 95%;
  transition: all 0.5s ease-in-out;
  z-index: 1000;
  .progress {
    position: absolute;
    width: 90%;
    top: 5px;
    left: 5%;
  }
  .x-upload-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 18px;
    cursor: pointer;
    @include font_color(null);
    margin-bottom: 10px;
    .left {
      flex: 1;
      display: flex;
      align-items: center;
    }
  }
  .x-upload-content {
    max-height: 76vh;
    overflow: auto;
  }
}
</style>
