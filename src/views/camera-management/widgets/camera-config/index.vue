<!--
 * @Author: 阮志雄
 * @Date: 2021-10-13 16:38:42
 * @LastEditTime: 2021-11-09 16:04:10
 * @LastEditors: 阮志雄
 * @Description: In User Settings Edit
 * @FilePath: \Protected-Area-Resources-Monitor-and-Management-System\src\views\camera-management\widgets\camera-config\index.vue
-->
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
        <span class="teil">相机型号：</span><span class="sub-teil">{{ getVal('imeival') }}</span>
      </p>
      <p class="config-item">
        <span class="teil">计划回收时间：</span><span class="sub-teil">{{ getVal('backTime') }}</span>
      </p>
      <p class="config-item">
        <span class="teil">地理位置：</span><span class="sub-teil">{{ getVal('longitudeVal') }}~{{ getVal('latitudeVal') }}</span>
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
        <span class="teil">SD卡容量(M):</span><span class="sub-teil">{{ getVal('sdUsedpaceVal') }}/{{ getVal('sdUsedpaceVal') }}</span>
      </p>

      <!-- <p class="config-item"><span class="teil">循环存储:</span><span class="sub-teil">开启</span></p>
      <p class="config-item"><span class="teil">PIR灵敏度:</span><span class="sub-teil">低</span></p>
      <p class="config-item"><span class="teil">PIR触发间隔:</span><span class="sub-teil">0S</span></p>
      <p class="config-item"><span class="teil">发送方式:</span><span class="sub-teil">云</span></p>
      <p class="config-item"><span class="teil">发送模式:</span><span class="sub-teil">立即</span></p> -->
    </div>
  </div>
</template>

<script>
import { findCarmeraList } from '@/api'
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
      default: function() {
        return { id: '' }
      }
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      findCarmeraList({ reserveId: this.camera.id }).then(res => {
        this.cameraObj = res.data.length > 0 ? res.data[0] : {}
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
  min-width: 390px;
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
      line-height: 30px;
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
