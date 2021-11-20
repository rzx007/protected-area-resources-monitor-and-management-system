<!--
 * @Author: 阮志雄
 * @Date: 2021-07-18 23:17:58
 * @LastEditTime: 2021-11-20 15:01:56
 * @LastEditors: 阮志雄
 * @Description: In User Settings Edit
 * @FilePath: \Protected-Area-Resources-Monitor-and-Management-System\src\widgets\map-tool\index.vue
-->
<template>
  <div class="map_tool_block">
    <div class="show_list">
      <template v-for="(item, index) in toolList">
        <p
          :class="['layer_item', activeIndex === index + 1 ? 'active' : '']"
          @click="
            activeIndex = activeIndex === null ? index + 1 : null
            eventHandle(item.type, activeIndex)
          "
          :key="index"
          v-if="tools.includes(item.nickName)"
        >
          <svg-icon type="css" :icon="item.icon" style="vertical-align: middle; margin-left: 2px"></svg-icon>
          <span>{{ item.name }}</span>
        </p>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: 1,
      toolList: [
        { type: 1, name: '卫星', icon: 'tuceng', nickName: 'weixin' },
        { type: 2, name: '定位', icon: 'dingwei', nickName: 'dingwei' }
        // { type: 3, name: '隐藏网格', icon: '', nickName: 'Satellite' },
        // { type: 4, name: '热力图', icon: '', nickName: 'Satellite' }
      ]
    }
  },
  props: {
    tools: {
      type: Array,
      default: function () {
        return ['weixin', 'dingwei']
      }
    }
  },
  methods: {
    eventHandle(type, activeIndex) {
      this.$emit('on-select', { type, activeIndex })
    }
  }
}
</script>
<style lang="scss">
.map_tool_block {
  position: absolute;
  top: 18px;
  left: 20px;
  padding: 14px 0 13px;
  background: #fff;
  border-radius: 3px;
  height: 18px;
  z-index: 100;
  @include box-shadow();
  .show_list {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .layer_item {
      height: 18px;
      padding: 0 12px;
      font-size: 12px;
      border-left: 1px #dbdee2 dashed;
      vertical-align: middle;
      cursor: pointer;
      overflow: visible;
      zoom: 1;
      color: #5f6477;
    }
    .active {
      color: #009cf9;
    }
  }
}
</style>
