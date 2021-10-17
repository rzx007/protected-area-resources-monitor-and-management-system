<!--
 * @Author: 阮志雄
 * @Date: 2021-10-13 16:38:42
 * @LastEditTime: 2021-10-17 16:58:06
 * @LastEditors: 阮志雄
 * @Description: In User Settings Edit
 * @FilePath: \Protected-Area-Resources-Monitor-and-Management-System\src\views\area-management\widgets\area-config\index.vue
-->
<template>
  <div class="camera-sub-block">
    <back-bar @back="goBack"></back-bar>
    <div class="anas-block">
      <p class="sub-title">
        保护区：<span>{{ info.id }}</span>
      </p>
      <p class="sub-title">
        布设时间：<span>{{ info.inUseTime }}</span>
      </p>
    </div>
    <div class="config-block">
      <h4 class="title">保护区信息</h4>
      <p class="config-item"><span class="teil">相机型号：</span><span class="sub-teil">HW101</span></p>
      <p class="config-item"><span class="teil">计划回收时间：</span><span class="sub-teil">2021/09/12</span></p>
      <p class="config-item"><span class="teil">地理位置：</span><span class="sub-teil">114.22343°E,31.33113°N</span></p>
      <p class="config-item"><span class="teil">温度：</span><span class="sub-teil">35°C</span></p>
      <p class="config-item"><span class="teil">电量：</span><span class="sub-teil">45%</span></p>
    </div>
    <div class="config-block">
      <h4 class="title">保护区编辑</h4>
      <p class="config-item">
        <span class="teil">是否编辑：</span>
        <el-switch v-model="edit" active-text="是" inactive-text="否" @change="swithEdit"> </el-switch>
      </p>
    </div>
    <div class="config-btn">
      <el-button type="primary">保存</el-button>
      <el-button type="danger" @click="goBack">取消</el-button>
    </div>
  </div>
</template>

<script>
import hub from '@/utils/bus'
import backBar from '../../components/backBar.vue'
export default {
  components: { backBar },
  data() {
    return {
      edit: false
    }
  },
  props: {
    info: {
      type: Object,
      default: function() {
        return { id: '' }
      }
    }
  },
  methods: {
    goBack() {
      this.$emit('click-back')
    },
    swithEdit(bool) {
     this.$emit('update-edit', bool)
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
