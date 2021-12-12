<template>
  <div class="content areaMap">
    <home-map
      :isEdit="editMap"
      :isCreate="isCreate"
      :mapId="areaObj.reserveId"
      :centerLnglat="centerLnglat"
      :pathStr="areaObj.lngLat"
      ref="map"
    ></home-map>
    <div :class="[toggle ? '' : 'carmera-list-hidden', 'carmera-list']">
      <div class="toggle-button" title="收起" @click="toggle = !toggle">
        <i :class="[toggle ? 'el-icon-arrow-right' : 'el-icon-arrow-left']"></i>
      </div>
      <transition name="slide-fade">
        <area-list v-show="level === 1" @click-area="clickArea" @click-add="aaddArea" ref="list"></area-list>
      </transition>
      <transition name="slide-fade">
        <area-config v-if="level === 2" @click-back="clickUpdate" @update-edit="swithEdit" :info="areaObj"></area-config>
      </transition>
      <transition name="slide-fade">
        <area-add v-if="level === 3" @click-back="cancelCreate" @cerate-area="cerateArea"></area-add>
      </transition>
    </div>
  </div>
</template>

<script>
import { addArea, updateArea, deleteArea } from '@/api'
import homeMap from './widgets/map/index.vue'
import areaList from './widgets/area-list/index.vue'
import areaConfig from './widgets/area-config/index.vue'
import areaAdd from './widgets/area-add/index.vue'
export default {
  components: { homeMap, areaList, areaConfig, areaAdd },
  data() {
    return {
      toggle: true,
      level: 1, // 1 显示相机列表, 2显示相机详情, 3新增相机
      editMap: false,
      isCreate: false, // 新增
      areaObj: { centerLnglat: '[114.496577, 30.487779]' }
    }
  },
  computed: {
    centerLnglat: function () {
      console.log(this.areaObj.centerLnglat)
      return JSON.parse(this.areaObj.centerLnglat)
    }
  },
  methods: {
    // 点击相机
    clickArea(item) {
      this.level = 2
      // this.editMap = true
      this.areaObj = item
      console.log(item)
    },
    swithEdit(bool) {
      this.editMap = bool
    },
    clickUpdate({ status, area }) {
      // 详情返回自动关闭编辑功能
      this.level = 1
      this.editMap = false
      if (status) {
        const path = this.$refs.map.getPolygonPath()
        console.log(path)
        this.updateArea({ lngLat: JSON.stringify(path), ...area })
      }
    },
    aaddArea() {
      this.level = 3
      this.isCreate = true
    },
    cancelCreate() {
      this.level = 1
      this.isCreate = false
    },
    cerateArea(params) {
      this.level = 1
      const path = this.$refs.map.getPolygonPath()
      // console.log(params, path)
      this.addArea({ lngLat: JSON.stringify(path), ...params })
    },
    addArea(params) {
      addArea(params).then((res) => {
        res.code === 0 ? this.$message.success('保护区新增成功') : this.$message.warning('保护区新增异常')
        this.$refs.list.getAreaList()
      })
    },
    updateArea(params) {
      updateArea(params).then((res) => {
        res.code === 0 ? this.$message.success('保护区更新成功') : this.$message.warning('保护区更新异常')
        this.$refs.list.getAreaList()
      })
    }
  }
}
</script>
<style lang="scss">
.areaMap {
  padding: 0;
  width: 100%;
  height: 100%;
  @include content-background();
  border-radius: 10px;
  position: relative;
  @include box-shadow();
  overflow: hidden;
  .carmera-list {
    min-width: 420px;
    height: 85vh;
    position: absolute;
    right: 30px;
    top: 50%;
    transform: translateY(-50%);
    background-color: rgba(255, 255, 255, 0.65);
    backdrop-filter: blur(20px);
    z-index: 10;
    border-radius: 14px;
    @include box-shadow();
    transition: all 0.6s ease-in-out;
    .toggle-button {
      position: absolute;
      top: 50%;
      left: -20px;
      transform: translateY(-50%);
      background-color: rgba(255, 255, 255, 0.9);
      backdrop-filter: blur(20px);
      width: 20px;
      height: 50px;
      border-top-left-radius: 8px;
      border-bottom-left-radius: 8px;
      z-index: -1;
      text-align: center;
      line-height: 50px;
      @include font_color(null);
      cursor: pointer;
      &:hover {
        background-color: #3385ff;
        color: #fff;
      }
    }
  }
  .carmera-list-hidden {
    transform: translate(100%, -50%);
  }
}
</style>
