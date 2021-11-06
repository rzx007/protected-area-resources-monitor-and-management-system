<template>
  <svg v-if="type === 'svg'" class="icon" aria-hidden="true" @click="clickEvent($event)">
    <use :xlink:href="'#'+iconName" />
  </svg>
  <i v-else class="iconfont" :class="iconName" @click="clickEvent($event)"></i>
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
  },
  methods: {
    clickEvent($event){
      this.$emit('click', $event)
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
