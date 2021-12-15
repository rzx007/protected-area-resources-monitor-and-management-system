<template>
  <div class="analysis-item">
    <div class="title">设备状态</div>
    <div class="device-content">
      <div class="device-total">
        <span
          >总数: <strong>{{ cameraList.length }}</strong></span
        >
        <div class="sub-title">
          <span style="margin-right: 12px"
            >在线: <strong>{{ cameraList.length }}</strong></span
          >
          <span>离线: <strong>0</strong></span>
        </div>
      </div>
      <el-progress :text-inside="true" :stroke-width="18" :percentage="100"></el-progress>
      <div class="device-status">
        <ul class="status-list">
          <li v-for="(item, index) in cameraList" :key="index">
            <span class="time">{{ item.setTime }}</span>
            <span class="num ellipsis" :title="item.id">{{ item.id }}</span>
            <span class="name ellipsis">{{ item.imeival }}</span>
            <span :class="['status', { recly: item.state === 3 }]">{{ getStatus(item.state) }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { findCarmeraList } from '@/api'
export default {
  data() {
    return {
      cameraList: [
        { time: '10/21 09:12:34', id: 'ADA8AD786AC', name: '张思', status: 2 },
        { time: '10/21 09:12:34', id: 'ADA8AD786AC', name: '张思', status: 3 },
        { time: '10/21 09:12:34', id: 'ADA8AD786AC', name: '张思', status: 2 },
        { time: '10/21 09:12:34', id: 'ADA8AD786AC', name: '张思', status: 3 },
        { time: '10/21 09:12:34', id: 'ADA8AD786AC', name: '张思', status: 2 },
        { time: '10/21 09:12:34', id: 'ADA8AD786AC', name: '张思', status: 3 }
      ],
      statusEnum: [
        // 1 未部署， 2 部署中 3已部署 4 回收中
        { state: 3, color: '#4762b0', title: '已部署' },
        { state: 2, color: '#1890FF', title: '部署中' },
        { state: 4, color: '#E6A23C', title: '回收中' },
        { state: 1, color: '#67C23A', title: '未部署' }
      ]
    }
  },
  created() {
    this.getCarmeraList()
  },
  methods: {
    getStatus(state, type = 1) {
      for (let index = 0; index < this.statusEnum.length; index++) {
        const element = this.statusEnum[index]
        if (element.state === state) {
          if (type == 1) {
            return element.title
          } else {
            return element.color
          }
        }
      }
    },
    getCarmeraList() {
      this.loading = true
      findCarmeraList().then((res) => {
        this.cameraList = res.code === 0 ? res.data : []
        this.loading = false
      })
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
            flex: 1;
          }
          .num {
            display: inline-block;
            width: 60px;
            text-align: center;
            vertical-align: middle;
            font-weight: bolder;
          }
          .name {
            width: 100px;
            text-align: center;
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
