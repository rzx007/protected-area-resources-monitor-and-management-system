<template>
  <div class="x-upload-mian" :class="collspe ? 'x-upload-mian-collspe' : 'x-upload-mian-nocollspe'">
    <p class="x-upload-title" @click="collspe = !collspe">
      <span>图片上传</span>
      <i :class="collspe ? 'el-icon-arrow-up' : 'el-icon-arrow-down'"></i>
    </p>
    <el-select v-model="cameraId" placeholder="选择相机" style="width: 100%; margin-bottom: 12px">
      <el-option v-for="item in cameraList" :key="item.id" :label="item.imeival" :value="item.imeival"> </el-option>
    </el-select>
    <div class="x-upload-content">
      <el-upload
        :disabled="!cameraId"
        :limit="10"
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
          <div class="el-upload__text">选择相机后,将文件拖到此处，或<em>点击上传</em></div>
        </div>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png/jpeg/gif文件，且不超过5M</div>
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
      imageType: ['image/gif', 'image/jpeg', 'image/jpg', 'image/png', 'image/svg']
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
      const isLt5M = file.size / 1024 / 1024 < 5

      if (!isJPG) {
        this.$message.error('文件上传类型不对!')
      }
      if (!isLt5M) {
        this.$message.error('文件上传大小不能超过 5MB!')
      }
      return isJPG && isLt5M
    },
    handleExceed() {
      this.$message.warning('超出单次上传文件数量!')
    },
    handleChange(file, fileList) {
      console.log(file, fileList)
    },
    uploadFile(params) {
      const { file, data } = params
      // 通过 FormData 对象上传文件
      var formData = new FormData()
      formData.append('Image', file)
      formData.append('ImeiVal', this.cameraId)
      // formData.append('name', file.name)
      formData.append('lastModifiedDate', this.$day(file.lastModified).format('YYYY-MM-DD HH:mm:ss'))
      // this.$day(params.lastModifiedDate).format('YYYY-MM-DD HH:mm:ss')
      // /admin/carousel/addFile
      uploadImage(formData).then((res) => {
        res.code === 0 ? this.$message.success('已上传!') : this.$message.warning('上传失败!')
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
  z-index: 10;
  .x-upload-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 18px;
    cursor: pointer;
    @include font_color(null);
    margin-bottom: 10px;
  }
  .x-upload-content {
    max-height: 76vh;
    overflow: auto;
  }
}
</style>
