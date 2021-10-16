<!--
 * @Author: 阮志雄
 * @Date: 2021-10-16 13:09:24
 * @LastEditTime: 2021-10-16 15:33:06
 * @LastEditors: 阮志雄
 * @Description: In User Settings Edit
 * @FilePath: \Protected-Area-Resources-Monitor-and-Management-System\src\views\analysis\widgets\device.vue
-->
<template>
  <div class="analysis-item">
    <div class="title">设备状态</div>
    <div class="device-content">
      <div class="device-total">
        <span>总数: <strong>30</strong></span>
        <div class="sub-title">
          <span style="margin-right:12px">在线: <strong>27</strong></span>
          <span>离线: <strong>3</strong></span>
        </div>
      </div>
      <el-progress :text-inside="true" :stroke-width="18" :percentage="70"></el-progress>
      <div class="device-status">
        <ul class="status-list">
          <li v-for="(item, index) in list" :key="index">
            <span class="time">{{ item.time }}</span>
            <span class="num ellipsis" :title="item.id">{{ item.id }}</span>
            <span class="name">{{ item.name }}</span>
            <span :class="['status', { recly: item.status === 3 }]">待回收</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [
        { time: '10/21 09:12:34', id: 'ADA8AD786AC', name: '张思', status: 2 },
        { time: '10/21 09:12:34', id: 'ADA8AD786AC', name: '张思', status: 3 },
        { time: '10/21 09:12:34', id: 'ADA8AD786AC', name: '张思', status: 2 },
        { time: '10/21 09:12:34', id: 'ADA8AD786AC', name: '张思', status: 3 },
        { time: '10/21 09:12:34', id: 'ADA8AD786AC', name: '张思', status: 2 },
        { time: '10/21 09:12:34', id: 'ADA8AD786AC', name: '张思', status: 3 }
      ]
    }
  }
}
</script>
<style lang="scss">
.analysis-item {
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  @include font_color(null);
  @include content-background();
  border-radius: 10px;
  @include box-shadow();
  .title {
    font-weight: bold;
    font-size: 19px;
  }
  .device-content {
    padding-top: 12px;
    .device-total {
      display: flex;
      justify-content: space-between;
      margin-bottom: 12px;
      span {
        font-size: 12px;
        display: inline-block;
        strong {
          font-size: 16px;
        }
      }
    }
    .device-status {
      margin-top: 18px;
      height: 140px;
      overflow: auto;
      width: 100%;
      .status-list {
        li {
          border-bottom: 1px solid transparent;
          @include border-color();
          display: flex;
          justify-content: space-between;
          flex-wrap: nowrap;
          line-height: 24px;
          font-size: 14px;
          padding-bottom: 6px;
          .time {
            font-size: 12px;
          }
          .num {
            display: inline-block;
            max-width: 80px;
            vertical-align: middle;
            font-weight: bolder;
          }
          .status {
            display: inline-block;
            font-size: 12px;
            background-color: #4762b0;
            color: #fff;
            padding: 0 2px;
            border-radius: 4px;
          }
          .recly {
            background-color: #ce0b25;
          }
        }
      }
    }
  }
}
</style>
