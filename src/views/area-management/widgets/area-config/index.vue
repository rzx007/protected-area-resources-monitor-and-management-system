<!--
 * @Author: 阮志雄
 * @Date: 2021-10-13 16:38:42
 * @LastEditTime: 2021-10-31 00:27:27
 * @LastEditors: 阮志雄
 * @Description: In User Settings Edit
 * @FilePath: \Protected-Area-Resources-Monitor-and-Management-System\src\views\area-management\widgets\area-config\index.vue
-->
<template>
  <div class="area-sub-update-block">
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
      <p class="config-item">
        <span class="teil">保护区名称：</span>
        <el-input v-model="form.areaName" placeholder="" clearable style="width:250px"></el-input>
      </p>
      <p class="config-item"><span class="teil">地理位置：</span><span class="sub-teil">114.22343°E,31.33113°N</span></p>
    </div>
    <div class="config-block">
      <h4 class="title">保护区介绍</h4>
      <el-input type="textarea" :autosize="{ minRows: 7, maxRows: 20 }" placeholder="请输入内容" v-model="form.remark"> </el-input>
    </div>
    <div class="config-block">
      <h4 class="title">保护区编辑</h4>
      <p class="config-item">
        <span class="teil">是否编辑：</span>
        <el-switch v-model="edit" active-text="是" inactive-text="否" @change="swithEdit"> </el-switch>
      </p>
    </div>
    <div class="config-btn">
      <el-button type="primary" @click="updataArea()">保存</el-button>
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
      edit: false,
      form: this.info
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
      this.$emit('click-back', { status: false, area: this.form })
    },
    updataArea() {
      this.$emit('click-back', { status: true, area: this.form })
    },
    swithEdit(bool) {
      this.$emit('update-edit', bool)
    }
  }
}
</script>
<style lang="scss">
.area-sub-update-block {
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
      line-height: 42px;
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
