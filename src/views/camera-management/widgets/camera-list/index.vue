<!--
 * @Author: 阮志雄
 * @Date: 2021-10-13 16:38:42
 * @LastEditTime: 2021-12-12 12:05:35
 * @LastEditors: 阮志雄
 * @Description: In User Settings Edit
 * @FilePath: \Protected-Area-Resources-Monitor-and-Management-System\src\views\camera-management\widgets\camera-list\index.vue
-->
<template>
  <div class="camera-block">
    <i class="el-icon-plus add-camera" @click="addCamera" title="添加相机"></i>
    <ul class="tabs">
      <li @click="activeIndex = 1" :class="{ active: activeIndex === 1 }">相机部署</li>
      <li @click="activeIndex = 2" :class="{ active: activeIndex === 2 }" title="未部署相机无法下发任务">任务下发 <i class="el-icon-question"></i></li>
    </ul>
    <div class="camera-content">
      <transition name="slide-fade">
        <status
          v-show="activeIndex === 1"
          @click-camera="clickCamera"
          @click-recycle="clickRecycle"
          @click-deploy="clickDeploy"
          ref="status"
        ></status>
      </transition>
      <transition name="slide-fade">
        <task v-show="activeIndex === 2" @click-camera="clickCamera" @click-task="clickTask" ref="task"></task>
      </transition>
    </div>
  </div>
</template>

<script>
import task from './task.vue'
import status from './status.vue'
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
    },
    clickTask(item) {
      // 下发任务
      this.$emit('click-task', item)
    },
    addCamera() {
      this.$emit('click-add')
    },
    getCarmeraList() {
      this.$refs.status.getCarmeraList()
      this.$refs.task.getCarmeraList()
    },
    getTaskList() {
      this.$refs.task.getCarmeraList()
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
   min-width: 390px;
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
        border-bottom: 2px solid $color;
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
   min-width: 350px;
  }
}
</style>
