<!--
 * @Author: rzx007
 * @Date: 2021-05-20 15:03:45
 * @LastEditors: 阮志雄
 * @LastEditTime: 2021-11-06 16:58:43
 * @FilePath: \Protected-Area-Resources-Monitor-and-Management-System\src\views\menu-management\widgets\iocns.vue
 * @Description: element-ui 图标列表
-->
<template>
  <div class="icon_content">
    <div class="icon_list">
      <p v-for="(item, index) in iconsArr" :key="index">
        <!-- <i @click="clickHandler(item)" :class="[item, link===item?'active':'']"></i> -->
        <svg-icon type="css" @click="clickHandler(item)" :icon="item" :class="[link === item ? 'active' : '']" class="icon"></svg-icon>
      </p>
      <p @click="clickHandler('')">
        <i :class="[link === '' ? 'active' : '']">无</i>
      </p>
    </div>
  </div>
</template>

<script>
import iconsArr from './icons'
export default {
  data() {
    return {
      iconsArr,
      link: this.iconStr
    }
  },
  model: {
    prop: 'iconStr',
    event: 'input'
  },
  props: ['iconStr'],
  methods: {
    clickHandler(icon) {
      this.link = icon
      this.$emit('input', icon)
    }
  },
  watch: {
    iconStr: function(val) {
      this.link = val
      this.$emit('input', val)
    }
  }
}
</script>

<style lang="scss">
.icon_content {
  width: 100%;
  height: 300px;
  box-sizing: border-box;
  overflow: auto;
  .icon_list {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fill, 50px);
    p {
      text-align: center;
      font-size: 20px;
      line-height: 50px;
      font-weight: bolder;
      i {
        display: inline-block;
        width: 90%;
        height: 90%;
        line-height: 45px;
        border: 1px solid transparent;
        @include border-color();
        cursor: pointer;
        &:hover {
          @include tool-bar-color();
          color: #fff;
        }
      }
      .active {
        @include tool-bar-color();
        color: #fff;
      }
    }
  }
}
</style>
