<template>
  <div class="camera-sub-block">
    <back-bar @back="goBack"></back-bar>
    <div class="anas-block">
      <p class="sub-title">
        设备编号：<span>{{ camera.id }}</span>
      </p>
      <p class="sub-title">
        布设时间：<span>{{ getVal('setTime') }}</span>
      </p>
    </div>
    <div class="config-block">
      <h4 class="title">相机信息</h4>
      <p class="config-item">
        <span class="teil">相机IMEI号：</span><span class="sub-teil">{{ getVal('imeival') }}</span>
      </p>
      <p class="config-item">
        <span class="teil" :title="getVal('planBackTime')">计划回收时间：</span
        ><span class="sub-teil">{{ getVal('planBackTime') ? $day(getVal('planBackTime')).format('YYYY-MM-DD') : '' }}</span>
      </p>
      <p class="config-item">
        <span class="teil">所属保护区</span><span class="sub-teil">{{ getVal('reserveTitle') }}</span>
      </p>
      <p class="config-item">
        <span class="teil">地理位置：</span><span class="sub-teil">{{ getVal('fixupLongitudeVal') }}~{{ getVal('fixupLatitudeVal') }}</span>
      </p>
      <p class="config-item">
        <span class="teil">温度(℃)：</span><span class="sub-teil">{{ getVal('temperatureVal') }}</span>
      </p>
      <p class="config-item">
        <span class="teil">电量：</span><span class="sub-teil">{{ getVal('batteryVal') }}</span>
      </p>
      <p class="config-item">
        <span class="teil">相机软件版本：</span><span class="sub-teil">{{ getVal('fwVersion') }}</span>
      </p>
    </div>
    <div class="config-block">
      <h4 class="title">相机配置</h4>
      <p class="config-item"><span class="teil">工作方式:</span><span class="sub-teil">照片</span></p>
      <p class="config-item">
        <span class="teil">图片大小(M):</span><span class="sub-teil">{{ getVal('pSize') }}</span>
      </p>
      <p class="config-item">
        <span class="teil">视频清晰度(P):</span><span class="sub-teil">{{ getVal('vSize') }}</span>
      </p>
      <!-- <p class="config-item"><span class="teil">连拍张数:</span><span class="sub-teil">10</span></p> -->
      <p class="config-item">
        <span class="teil">录像时长(s):</span><span class="sub-teil">{{ getVal('vLength') }}</span>
      </p>
      <p class="config-item">
        <span class="teil">拍照间隔时间(s):</span><span class="sub-teil">{{ getVal('pirInterval') }}</span>
      </p>
      <p class="config-item">
        <span class="teil">SD卡容量(M):</span><span class="sub-teil">{{ getVal('sdUsedpaceVal') }}/{{ getVal('sdTotalSpaceVal') }}</span>
      </p>
    </div>
    <div class="config-block">
      <h4 class="title">相机图像</h4>
      <img :src="getVal('fixupImg')" :alt="getVal('reserveTitle')" width="350" />
    </div>
  </div>
</template>

<script>
import { findCarmeraInfo } from '@/api'
import backBar from '../../components/backBar.vue'
export default {
  components: { backBar },
  data() {
    return {
      cameraObj: {}
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
  watch: {
    "camera.id": function() {
      this.getData()
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      findCarmeraInfo({ cameraId: this.camera.id }).then((res) => {
        this.cameraObj = res.data ? res.data : {}
      })
    },
    getVal(key) {
      return this.cameraObj[key] ? this.cameraObj[key] : ''
    },
    goBack() {
      this.$emit('click-back')
    }
  }
}
</script>
<style lang="scss">
.camera-sub-block {
  @include font_color(null);
  padding: 30px;
  box-sizing: border-box;
  height: 100%;
  overflow: auto;
  min-width: 400px;
  .anas-block {
    color: #d5d5d8;
    padding: 12px 18px;
    border-radius: 12px;
    background-color: #4e62ff;
    .sub-title {
      letter-spacing: 2px;
      font-size: 12px;
      line-height: 24px;
      .teil {
        width: 100px;
        text-align: start;
      }
      span {
        display: inline-block;
        font-size: 16px;
        color: #fff;
      }
    }
  }
  .config-block {
    margin-top: 24px;
    .config-item {
      line-height: 34px;
      font-size: 13px;
      span {
        display: inline-block;
      }
      .teil {
        width: 120px;
        letter-spacing: 2px;
        text-align: start;
      }
      .sub-teil {
        font-size: 17px;
        font-weight: 600;
        display: inline-block;
        max-width: 240px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: middle;
      }
    }
    .title {
      letter-spacing: 3px;
      text-indent: 4px;
      position: relative;
      margin-bottom: 10px;
      font-size: 20px;
      &::after {
        content: '';
        position: absolute;
        left: -6px;
        top: 0;
        height: 100%;
        width: 4px;
        @include tool-bar-color();
      }
    }
  }
  .config-btn {
    margin-top: 28px;
    text-align: center;
  }
}
</style>
