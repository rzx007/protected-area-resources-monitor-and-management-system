<!--
 * @Author: 阮志雄
 * @Date: 2021-10-08 16:24:43
 * @LastEditTime: 2021-10-11 11:36:58
 * @LastEditors: 阮志雄
 * @Description: In User Settings Edit
 * @FilePath: \Protected-Area-Resources-Monitor-and-Management-System\src\components\Svg-icon.vue
-->
<template>
  <svg v-if="type === 'svg'" class="icon" aria-hidden="true">
    <use :xlink:href="'#'+iconName" />
  </svg>
  <i v-else class="iconfont" :class="iconName"></i>
</template>

<script>
export default {
  name: 'svg-icon',
  data() {
    return {
      iconName: 'icon-' + this.icon
    }
  },
  props: {
    icon: String,
    type: {
      type: String,
      default: 'svg'
    }
  }
}
</script>
<style lang="scss">
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
