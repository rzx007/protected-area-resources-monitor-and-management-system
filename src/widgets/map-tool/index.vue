<!--
 * @Author: 阮志雄
 * @Date: 2021-07-18 23:17:58
 * @LastEditTime: 2021-11-25 17:16:07
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
    <div class="show_list" v-if="grid">
      <p class="layer_item">
        <el-dropdown @command="handleCommand" trigger="click">
          <p>
            <svg-icon type="css" icon="tuceng" style="vertical-align: middle; margin-left: 2px"></svg-icon>
            <span>网格</span>
          </p>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item :command="item.value" v-for="(item, index) in duatanceArr" :key="index">{{ item.label }}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </p>
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
        { type: 2, name: '定位', icon: 'dingwei', nickName: 'dingwei' },
        { type: 3, name: '网格', icon: 'dingwei', nickName: 'Satellite' }
        // { type: 4, name: '热力图', icon: '', nickName: 'Satellite' }
      ],
      duatanceArr: [
        { label: '无', value: { x: 0, y: 0 } },
        { label: '1KM', value: { x: 0, y: 273 } },
        { label: '2KM', value: { x: 273 * 2, y: 273 * 2 } },
        { label: '3KM', value: { x: 273 * 3, y: 273 * 3 } },
        { label: '4KM', value: { x: 273 * 4, y: 273 * 4 } },
        { label: '5KM', value: { x: 273 * 5, y: 273 * 5 } },
        { label: '6KM', value: { x: 273 * 6, y: 273 * 6 } },
        { label: '7KM', value: { x: 273 * 7, y: 273 * 7 } },
        { label: '8KM', value: { x: 273 * 8, y: 273 * 8 } },
        { label: '9KM', value: { x: 273 * 9, y: 273 * 9 } },
        { label: '10KM', value: { x: 273 * 10, y: 273 * 10 } }
      ]
    }
  },
  props: {
    tools: {
      type: Array,
      default: function () {
        return ['weixin', 'dingwei']
      }
    },
    grid: {
      type:Boolean,
      default: true
    }
  },
  methods: {
    eventHandle(type, activeIndex) {
      this.$emit('on-select', { type, activeIndex })
    },
    handleCommand(command) {
      this.$emit('on-select-grid', command)
      console.log(command)
    }
  }
}
</script>
<style lang="scss">
.map_tool_block {
  position: absolute;
  top: 18px;
  left: 20px;
  z-index: 100;
  display: flex;
  @include box-shadow();
  .show_list {
    height: 18px;
    padding: 14px 0 13px;
    background: #fff;
    border-radius: 3px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    &:last-child {
      margin-left: 6px;
    }
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
