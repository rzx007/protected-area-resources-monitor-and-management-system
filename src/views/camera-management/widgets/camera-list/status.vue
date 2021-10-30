<!--
 * @Author: 阮志雄
 * @Date: 2021-10-13 17:31:18
 * @LastEditTime: 2021-10-30 17:01:12
 * @LastEditors: 阮志雄
 * @Description: In User Settings Edit
 * @FilePath: \Protected-Area-Resources-Monitor-and-Management-System\src\views\camera-management\widgets\camera-list\status.vue
-->
<template>
  <div class="state-list" v-loading="loading">
    <el-input v-model="code" placeholder="相机编号查询" clearable></el-input>
    <ul class="ul-list">
      <li v-for="(item, index) in cameraList" :key="index">
        <div class="info" title="查看信息" @click="clickCamera(item)">
          <span class="state" :style="{ backgroundColor: getStatus(item.state, 0) }">{{ getStatus(item.state) }}</span>
          <div class="sub-info">
            <p><span>编号：</span> {{ item.imeival }}</p>
            <p style="margin-top:6px" v-show="[3, 4].includes(item.state)">
              <span>布控时间：</span><span>{{ item.setTime }}</span>
            </p>
          </div>
          <div class="mask"></div>
        </div>
        <div class="setting">
          <el-button type="warning" v-if="item.state == 3" @click="clickRecycle(item)">回收</el-button>
          <el-button type="primary" v-if="item.state == 1" @click="clickDeploy(item)">部署</el-button>
          <span v-if="[4, 2].includes(item.state)">{{ item.user }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { findCarmeraList, findAllCarmeraList } from '@/api'
export default {
  name: 'task',
  emits: ['click-camera', 'click-recycle', 'click-deploy'],
  data() {
    return {
      loading: false,
      code: '',
      cameraList: [],
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
    getCarmeraList() {
      this.loading = true
      findAllCarmeraList().then(res => {
        this.cameraList = res.code === 0 ? res.data.list : []
        this.loading = false
      })
      // setTimeout(() => {
      //   this.loading = false
      //   this.cameraList = [
      //     // 1已部署， 0 待部署， 2 待回收 3 未部署
      //     { id: '23', state: 1, setTime: '2012-10-12', user: '' },
      //     { id: '2', state: 0, setTime: '', user: '张三' },
      //     { id: '3', state: 2, setTime: '2012-10-12', user: '李四' },
      //     { id: '4', state: 3, setTime: '', user: '' },
      //     { id: '5', state: 1, setTime: '2012-10-12', user: '' },
      //     { id: '6', state: 0, setTime: '', user: '张三' },
      //     { id: '7', state: 2, setTime: '2012-10-12', user: '李四' }
      //   ]
      // }, 500)
    },
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
.state-list {
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
      .state {
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
