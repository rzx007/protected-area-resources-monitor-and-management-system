<!--
 * @Author: 阮志雄
 * @Date: 2021-10-13 16:38:42
 * @LastEditTime: 2021-12-19 16:01:19
 * @LastEditors: 阮志雄
 * @Description: In User Settings Edit
 * @FilePath: \Protected-Area-Resources-Monitor-and-Management-System\src\views\Home\widgets\camera-list\index.vue
-->
<template>
  <div class="camera-block">

    <ul class="tabs">
      <li @click="activeIndex = 1" :class="{ active: activeIndex === 1 }">工作相机列表</li>
      <!-- <li @click="activeIndex = 2" :class="{ active: activeIndex === 2 }">任务下发</li> -->
    </ul>
    <div class="camera-content">
      <transition name="slide-fade">
        <status v-show="activeIndex === 1" @click-camera="clickCamera"></status>
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
    clickCamera(item) {
      console.log(item)
      this.$emit('click-camera', item)
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
      color: #8d8b8b;
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
