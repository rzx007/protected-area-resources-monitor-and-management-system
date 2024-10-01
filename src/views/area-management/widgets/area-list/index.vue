<!--
 * @Author: 阮志雄
 * @Date: 2021-10-16 21:33:27
 * @LastEditTime: 2021-12-16 22:17:20
 * @LastEditors: 阮志雄
 * @Description: In User Settings Edit
 * @FilePath: \Protected-Area-Resources-Monitor-and-Management-System\src\views\area-management\widgets\area-list\index.vue
-->
<template>
  <div class="camera-block">
    <i class="el-icon-refresh add-camera" @click="getArea" title="刷新"></i>
    <i v-if="isAdmin" class="el-icon-plus add-area" @click="aaddArea" title="添加保护区"></i>
    <ul class="tabs">
      <li @click="activeIndex = 1" :class="{ active: activeIndex === 1 }">编辑保护区</li>
      <!-- <li @click="activeIndex = 2" :class="{ active: activeIndex === 2 }">任务下发</li> -->
    </ul>
    <div class="camera-content">
      <transition name="slide-fade">
        <status v-show="activeIndex === 1" @click-area="clickArea" @deleted-area="$emit('deleted-area')" ref="status"></status>
      </transition>
    </div>
  </div>
</template>

<script>
import { getToken, isAdmin } from '@/utils/auth'
import status from './status.vue'
export default {
  data() {
    return {
      isAdmin: isAdmin(),
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
    getArea() {
      this.$refs.status.getArea()
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
  width: 440px;
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
  .add-area {
      font-size: 28px;
      position: absolute;
      right: 70px;
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
