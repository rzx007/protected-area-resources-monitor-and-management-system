<template>
  <div class="area-sub-add-block">
    <back-bar @back="goBack"></back-bar>
    <div class="config-block">
      <h4 class="title">保护区信息</h4>
      <p class="config-item">
        <span class="teil">保护区名称：</span>
        <el-input v-model="areaName" placeholder="" clearable style="width:250px" @blur="initRemark"></el-input>
      </p>
      <p class="config-item">
        <span class="teil" title="在地图左键点击选取中心点">地理位置：<i class="el-icon-question"></i></span>
        <el-input v-model="lng" placeholder="经度" style="width:120px" type="number" @change="handraulicSetCenter"></el-input>
        -
        <el-input v-model="lat" placeholder="纬度" style="width:120px" type="number" @change="handraulicSetCenter"></el-input>
      </p>
      <p class="config-item">
        <span class="teil">保护区绑定域名：</span>
        <el-input v-model="domainName" placeholder="" clearable style="width:250px"></el-input>
      </p>
    </div>
    <div class="config-block">
      <h4 class="title">区域编辑辅助</h4>
      <p class="config-item">
        <span class="teil">是否编辑：</span>
        <el-switch v-model="edit" active-text="是" inactive-text="否" @change="swithEdit"> </el-switch>
      </p>
      <p class="config-item">
        <span class="teil">固定中心点：</span>
        <el-switch v-model="fixedCnter" active-text="是" inactive-text="否" @change="swithCenter"> </el-switch>
      </p>
    </div>
    <div class="config-block">
      <h4 class="title">保护区介绍</h4>
      <el-input type="textarea" :autosize="{ minRows: 7, maxRows: 20 }" placeholder="请输入内容" v-model="remark"> </el-input>
    </div>
    <div class="config-btn">
      <el-button type="primary" @click="saveArea">保存</el-button>
      <el-button type="danger" @click="goBack">取消</el-button>
    </div>
  </div>
</template>

<script>
import backBar from '../../components/backBar.vue'
import hub from '@/utils/bus'
export default {
  components: { backBar },
  data() {
    return {
      areaName: '',
      remark: '',
      lng: null,
      lat: null,
      domainName: '',
      edit: false,
      fixedCnter: false
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
    initRemark() {
      if (!this.remark) this.remark = this.areaName
    },
    goBack() {
      this.$emit('click-back', false)
    },
    swithEdit(bool) {
      hub.$emit('create-edit', bool)
    },
    swithCenter(bool) {
      hub.$emit('create-center', bool)
    },
    saveArea() {
      this.$emit('cerate-area', {
        title: this.areaName,
        centerLnglat: JSON.stringify([this.lng, this.lat]),
        remark: this.remark,
        domainName: this.domainName
      })
    },
    handraulicSetCenter() {
      // 手动填入经纬度坐标
      if (this.lng && this.lat) {
        hub.$emit('handraulic-center', [Number(this.lng), Number(this.lat)])
      }
    }
  },
  mounted() {
    hub.$on('on-setCenter', lnglat => {
      this.lng = Number(lnglat[0])
      this.lat = Number(lnglat[1])
    })
  }
}
</script>
<style lang="scss">
.area-sub-add-block {
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
