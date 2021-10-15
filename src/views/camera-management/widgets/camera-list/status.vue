<!--
 * @Author: 阮志雄
 * @Date: 2021-10-13 17:31:18
 * @LastEditTime: 2021-10-15 15:45:39
 * @LastEditors: 阮志雄
 * @Description: In User Settings Edit
 * @FilePath: \Protected-Area-Resources-Monitor-and-Management-System\src\views\camera-management\widgets\camera-list\status.vue
-->
<template>
  <div class="status-list">
    <el-input v-model="code" placeholder="相机编号查询" clearable></el-input>
    <ul class="ul-list">
      <li v-for="(item, index) in cameraList" :key="index">
        <div class="info" title="查看信息" @click="clickCamera(item)">
          <span class="status" :style="{ backgroundColor: getStatus(item.status, 2) }">{{ getStatus(item.status) }}</span>
          <div class="sub-info">
            <p><span>编号：</span> {{ item.id }}</p>
            <p style="margin-top:6px" v-show="[1, 3].includes(item.status)">
              <span>布控时间：</span><span>{{ item.inUseTime }}</span>
            </p>
          </div>
          <div class="mask"></div>
        </div>
        <div class="setting">
          <el-button type="warning" v-if="item.status == 1" @click="clickRecycle(item)">回收</el-button>
          <el-button type="primary" v-if="item.status == 4" @click="clickDeploy(item)">部署</el-button>
          <span v-if="[2, 3].includes(item.status)">{{ item.user }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'task',
  emits: ['click-camera', 'click-recycle', 'click-deploy'],
  data() {
    return {
      code: '',
      cameraList: [
        // 1已部署， 2 待部署， 3 待回收 4 未部署
        { id: 'KJGRA679SHJO', status: 1, inUseTime: '2012-10-12', user: '' },
        { id: 'KJGRA679SHJO', status: 2, inUseTime: '', user: '张三' },
        { id: 'KJGRA679SHJO', status: 3, inUseTime: '2012-10-12', user: '李四' },
        { id: 'KJGRA679SHJO', status: 4, inUseTime: '', user: '' },
        { id: 'KJGRA679SHJO', status: 1, inUseTime: '2012-10-12', user: '' },
        { id: 'KJGRA679SHJO', status: 2, inUseTime: '', user: '张三' },
        { id: 'KJGRA679SHJO', status: 3, inUseTime: '2012-10-12', user: '李四' },
      ],
      statusEnum: [
        { status: 1, color: '#4762b0', title: '已部署' },
        { status: 2, color: '#1890FF', title: '待部署' },
        { status: 3, color: '#E6A23C', title: '待回收' },
        { status: 4, color: '#67C23A', title: '未部署' }
      ]
    }
  },
  methods: {
    getStatus(status, type = 1) {
      for (let index = 0; index < this.statusEnum.length; index++) {
        const element = this.statusEnum[index]
        if (element.status === status) {
          if (type == 1) {
            return element.title
          } else {
            return element.color
          }
        }
      }
    },
    clickCamera(item) {
      // 点击相机
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
.status-list {
  width: 100%;
  .ul-list {
    width: 100%;
    li {
      display: flex;
      justify-content: space-between;
      padding: 14px 0;
      align-items: center;
      .info {
        cursor: pointer;
        display: flex;
        justify-content: flex-start;
        flex: 1;
        margin-right: 18px;
        position: relative;
        .mask {
          position: absolute;
          top: -15%;
          left: -5%;
          height: 0%;
          width: 100%;
          z-index: -1;
          border-radius: 8px;
          transition: all 0.3s ease-in-out;
        }
        .sub-info {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          font-weight: 600;
          margin-left: 12px;
          justify-content: center;
          span {
            font-size: 14px;
            font-weight: 200;
          }
        }
        &:hover {
          .mask {
            height: 130%;
            background-color: #eee;
          }
        }
      }
      .status {
        color: #fff;
        background-color: #4762b0;
        display: inline-block;
        font-size: 12px;
        width: 50px;
        letter-spacing: 2px;
        height: 50px;
        line-height: 50px;
        text-align: center;
        border-radius: 8px;
      }
    }
  }
}
</style>
