<!--
 * @Author: 阮志雄
 * @Date: 2021-10-13 16:38:42
 * @LastEditTime: 2021-10-13 23:49:40
 * @LastEditors: 阮志雄
 * @Description: In User Settings Edit
 * @FilePath: \Protected-Area-Resources-Monitor-and-Management-System\src\views\camera-management\widgets\camera-list.vue
-->
<template>
  <div class="camera-block">
    <ul class="tabs">
      <li @click="activeIndex = 1" :class="{ active: activeIndex === 1 }">相机部署</li>
      <li @click="activeIndex = 2" :class="{ active: activeIndex === 2 }">任务下发</li>
    </ul>
    <status v-show="activeIndex === 1" @click-camera="clickCamera" @click-recycle="clickRecycle" @click-deploy="clickDeploy"></status>
    <task v-show="activeIndex === 2"></task>
  </div>
</template>

<script>
import task from './camera-list/task.vue'
import status from './camera-list/status.vue'
export default {
  data() {
    return {
      activeIndex: 1
    }
  },
  components: { task, status },
  methods: {
    clickCamera(item) {
      console.log(item)
      this.$emit('click-camera', item)
    },
    clickRecycle(item) {
      // 点击回收
      this.$emit('click-recycle', item)
    },
    clickDeploy(item) {
      // 点击部署
      this.$emit('click-deploy', item)
    }
  }
}
</script>
<style lang="scss">
.camera-block {
  @include font_color(null);
  padding: 30px;
  .tabs {
    display: flex;
    justify-content: flex-start;
    margin-bottom: 18px;
    .active {
      font-size: 26px;
      @include font_color(#4762b0);
      position: relative;
      &::after {
        content: '';
        position: absolute;
        bottom: -6px;
        left: 0;
        right: 0;
        border-bottom: 4px solid #4762b0;
      }
    }
    li {
      line-height: 35px;
      font-size: 18px;
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
}
</style>
