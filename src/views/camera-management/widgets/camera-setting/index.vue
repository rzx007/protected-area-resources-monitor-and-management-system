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
        <el-form-item label="电信IMEI码">
          <el-input v-model="form.imeival" clearable></el-input>
        </el-form-item>
        <el-form-item label="信号">
          <el-input v-model="form.signalVal" clearable></el-input>
        </el-form-item>
        <el-form-item label="电量">
          <el-input v-model="form.batteryVal" clearable></el-input>
        </el-form-item>
        <el-form-item label="温度">
          <el-input v-model="form.temperatureVal" clearable></el-input>
        </el-form-item>
        <el-form-item label="sd卡总容量">
          <el-input v-model="form.sdTotalSpaceVal" clearable></el-input>
        </el-form-item>
        <el-form-item label="sd卡使用空间">
          <el-input v-model="form.sdUsedpaceVal" clearable></el-input>
        </el-form-item>
        <el-form-item label="经度">
          <el-input v-model="form.longitudeVal" clearable></el-input>
        </el-form-item>
        <el-form-item label="纬度">
          <el-input v-model="form.latitudeVal" clearable></el-input>
        </el-form-item>
        <el-form-item label="相机软件版本">
          <el-input v-model="form.FWVersion" clearable></el-input>
        </el-form-item>
        <el-form-item label="拍照间隔">
          <el-select v-model="form.pirInterval" placeholder="拍照间隔">
            <el-option label="10" value="10"></el-option>
            <el-option label="20" value="20"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="	照片大小">
          <el-select v-model="form.vSize" placeholder="照片大小">
            <el-option label="5M" value="1"></el-option>
            <el-option label="10M" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="视频清晰度">
          <el-select v-model="form.vSize" placeholder="视频清晰度">
            <el-option label="720p" value="1"></el-option>
            <el-option label="1089p" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="视频长度">
          <el-select v-model="form.vLength" placeholder="视频长度">
            <el-option label="20S" value="1"></el-option>
            <el-option label="30S" value="2"></el-option>
          </el-select>
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
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { uploadStatus, findCarmeraInfo } from '@/api'
import backBar from '../../components/backBar.vue'
export default {
  components: { backBar },
  data() {
    return {
      form: {
        imeiVal: '',
        signalVal: '',
        pSize: '',
        vLength: '',
        vSize:'',
        batteryVal: '',
        longitudeVal: '',
        latitudeVal:'',
        sdTotalSpaceVal: '',
        sdUsedpaceVal:'',
        temperatureVal: '',
        fwVersion:'',
        pirInterval:'',
      }
    }
  },
  props: {
    camera: {
      type: Object,
      default: function () {
        return { id: '' }
      }
    }
  },
  created(){
    this.getData()
  },
  methods: {
    goBack() {
      this.$emit('click-back')
    },
    getData() {
      findCarmeraInfo({ cameraId: this.camera.id }).then((res) => {
        this.form = res.data ? res.data : {}
      })
    },
    uploadStatus() {
      uploadStatus({
        ImeiVal: this.camera.imeival,
        SDTotalSpaceVal: '128GB',
        FWVersion: '1.0.1',
        PirInterval: '100000',
        PSize: '10M',
        VSize: '720P',
        VLength: 1000 * 60 * 60,
        SignalVal: '',
        BatteryVal: '',
        TemperatureVal: '',
        SDUsedpaceVal: '',
        LongitudeVal: '',
        LatitudeVal: ''
      }).then((res) => {
        this.$emit('click-back')
      })
    },
    onSubmit() {
      this.uploadStatus()
      console.log('submit!')
    }
  }
}
</script>
<style lang="scss"></style>
