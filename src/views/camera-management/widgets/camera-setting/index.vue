<template>
  <div class="camera-sub-block">
    <back-bar @back="goBack" title="配置下发"></back-bar>
    <div class="anas-block">
      <p class="sub-title">
        设备编号：<span>{{ camera.imeival }}</span>
      </p>
      <p class="sub-title">
        布设时间：<span>{{ camera.inUseTime }}</span>
      </p>
    </div>
    <div class="config-block">
      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="拍照间隔">
          <el-select v-model="form.pirInterval" placeholder="拍照间隔">
            <el-option v-for="(item, index) in PirInterval" :key="index" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="	照片大小">
          <el-select v-model="form.pSize" placeholder="照片大小">
            <el-option v-for="(item, index) in PhotoSize" :key="index" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="视频清晰度">
          <el-select v-model="form.vSize" placeholder="视频清晰度">
            <el-option v-for="(item, index) in VideoSize" :key="index" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="视频长度">
          <el-select v-model="form.vLength" placeholder="视频长度">
            <el-option v-for="(item, index) in VideoLength" :key="index" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="定时拍摄间隔">
          <el-select v-model="form.timeLapse" placeholder="间隔">
            <el-option v-for="(item, index) in TimeLapse" :key="index" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="工作模式">
          <el-select v-model="form.cameraMode" placeholder="模式">
            <el-option v-for="(item, index) in CameraMode" :key="index" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="配置下发">
          <el-switch v-model="form.isSet" active-text="是" inactive-text="否" active-value="Y" inactive-value="N"> </el-switch>
        </el-form-item>
        <!-- <el-form-item label="工作时间">
          <el-date-picker
            v-model="value1"
            style="width: 280px"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </el-form-item> -->

        <el-form-item>
          <el-button type="primary" @click="onSubmit">下发配置</el-button>
          <el-button @click="cancelSet">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { VideoLength, PirInterval, VideoSize, PhotoSize, TimeLapse, CameraMode } from '@/mock/cameraConfigMap'
import { setDown, findCarmeraInfo } from '@/api'
import backBar from '../../components/backBar.vue'
export default {
  components: { backBar },
  data() {
    return {
      VideoLength,
      PirInterval,
      PhotoSize,
      VideoSize,
      TimeLapse,
      CameraMode,
      form: {
        pirInterval: 'i25m',
        pSize: 's14',
        vSize: 'fh',
        vLength: '30',
        timeLapse: 'I0',
        cameraMode: 'ct',
        isSet: 'Y'
      }
    }
  },
  props: {
    camera: {
      type: Object,
      default: function() {
        return { id: '' }
      }
    }
  },
  created() {
    this.getData()
  },
  methods: {
    goBack() {
      this.$emit('click-back')
    },
    getData() {
      findCarmeraInfo({ cameraId: this.camera.id }).then(res => {
        const data = res.data ? res.data : {}
        const confingArr = data.setConfig.split('#')
        const keys = Object.keys(this.form)
        keys.forEach((item, index) => {
          this.form[item] = confingArr[index + 1]
        })
        this.form.isSet = data.isSet
      })
    },
    uploadStatus() {
      let echoCode = '#'
      for (const key in this.form) {
        if (key === 'isSet') {
          continue
        }
        const element = this.form[key]
        echoCode += `${element}#`
      }
      setDown({
        cameraId: this.camera.id,
        setConfig: echoCode,
        isSet: this.form.isSet
      }).then(res => {
        this.$message.success('配置已下发')
        this.$emit('click-back')
      })
    },
    cancelSet() {
      this.$emit('click-back')
    },
    onSubmit() {
      this.uploadStatus()
      console.log('submit!')
    }
  }
}
</script>
<style lang="scss"></style>
