<!--
 * @Author: 阮志雄
 * @Date: 2021-07-18 23:17:58
 * @LastEditTime: 2021-11-16 10:21:43
 * @LastEditors: 阮志雄
 * @Description: In User Settings Edit
 * @FilePath: \Protected-Area-Resources-Monitor-and-Management-System\src\widgets\map-tool\index.vue
-->
<template>
  <div class="map_tool_block">
    <div class="show_list">
      <p :class="['layer_item', activeIndex===index?'active': '']"
       @click=" activeIndex = activeIndex ===null ? index: null; eventHandle (item.type, activeIndex)"
       v-for="(item ,index) in toolList" :key="index">
        <svg-icon type='css' :icon='item.icon' style="vertical-align: middle; margin-left:2px"></svg-icon>
        <span>{{item.name}}</span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeIndex: null,
      toolList: [
        { type: 1, name: '卫星', icon: 'tuceng', nickName: 'Satellite' },
        { type: 2, name: '定位', icon: 'dingwei', nickName: 'Satellite' },
        // { type: 3, name: '隐藏网格', icon: '', nickName: 'Satellite' },
        // { type: 4, name: '热力图', icon: '', nickName: 'Satellite' }
      ]
    }
  },
  methods: {
    eventHandle (type, activeIndex) {
      this.$emit('on-select', {type, activeIndex})
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
  height: 18px;;
  z-index: 100;
  @include box-shadow();
  .show_list {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .layer_item{
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
