<!--
 * @Author: 阮志雄
 * @Date: 2021-10-13 16:38:42
 * @LastEditTime: 2021-11-03 12:36:22
 * @LastEditors: 阮志雄
 * @Description: In User Settings Edit
 * @FilePath: \Protected-Area-Resources-Monitor-and-Management-System\src\views\area-management\widgets\area-list\index.vue
-->
<template>
  <div class="camera-block">
    <i class="el-icon-plus add-camera" @click="aaddArea" title="添加保护区"></i>
    <ul class="tabs">
      <li @click="activeIndex = 1" :class="{ active: activeIndex === 1 }">编辑保护区</li>
      <!-- <li @click="activeIndex = 2" :class="{ active: activeIndex === 2 }">任务下发</li> -->
    </ul>
    <div class="camera-content">
      <transition name="slide-fade">
        <status v-show="activeIndex === 1" @click-area="clickArea" ref="status"></status>
      </transition>
    </div>
  </div>
</template>

<script>
import status from './status.vue'
export default {
  data() {
    return {
      activeIndex: 1
    }
  },
  components: { status },
  methods: {
    clickArea(item) {
      this.$emit('click-area', item)
    },
    aaddArea() {
      this.$emit('click-add')
    },
    getAreaList() {
      this.$refs.status.getAreaList()
    }
  }
}
</script>
<style lang="scss">
$color: #4762b0;
.camera-block {
  @include font_color(null);
  padding: 30px;
  position: relative;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  .add-camera {
    font-size: 28px;
    position: absolute;
    right: 30px;
    top: 30px;
    cursor: pointer;
    &:hover {
      color: $color;
    }
  }
  .tabs {
    display: flex;
    justify-content: flex-start;
    margin-bottom: 18px;
    .active {
      font-size: 20px;
      @include font_color($color);
      position: relative;
      &::after {
        content: '';
        position: absolute;
        bottom: -6px;
        left: 0;
        right: 0;
        border-bottom: 4px solid $color;
      }
    }
    li {
      line-height: 35px;
      font-size: 16px;
      font-weight: 600;
      color: #bfbfbf;
      letter-spacing: 2px;
      cursor: pointer;
      transition: all 0.3s ease-in-out;
      &:last-child {
        margin-left: 18px;
      }
    }
  }
  .camera-content {
    flex: 1;
    padding: 0 10px;
    overflow: auto;
  }
}
</style>
