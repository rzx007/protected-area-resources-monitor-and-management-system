<template>
  <div class="state-list" v-loading="loading">
    <el-input v-model="code" placeholder="相机编号查询" clearable></el-input>
    <ul class="ul-list">
      <li v-for="(item, index) in cameraList" :key="index">
        <div class="info" title="查看信息" @click="clickCamera(item)">
          <div class="sub-info-block">
            <span class="state" :style="{ backgroundColor: getStatus(item.state, 0) }">{{ getStatus(item.state) }}</span>
            <div class="sub-info">
              <p><span>编号：</span> {{ item.imeival }}</p>
              <p style="margin-top:6px">
                <span>布控时间：</span><span v-show="[3, 4].includes(item.state)">{{ item.setTime }}</span>
              </p>
            </div>
          </div>
          <!-- <i class="next el-icon-arrow-right"></i> -->
          <div class="mask"></div>
        </div>
        <div class="setting" title="编辑">
          <el-button type="warning" v-if="item.state == 3" @click="clickRecycle(item)">回收</el-button>
          <el-button type="primary" v-if="item.state == 1" @click="clickDeploy(item)">部署</el-button>
          <!-- <span v-if="[4, 2].includes(item.state)">{{ item.user }}</span> -->
          <el-button type="primary" v-if="[4, 2].includes(item.state)" style=" visibility: hidden;">占位</el-button>
          <el-dropdown trigger="click" @command="handleCommand">
            <i class="el-icon-more-outline"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item :command="item" icon="el-icon-delete-solid">删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { findAllCarmeraList } from '@/api'
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
    },
    handleCommand(command) {
      this.$confirm('操作将删除此相机', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // this.deleteArea(command.reserveId)
      })
    }
  }
}
</script>
<style lang="scss">
$color: #4762b0;
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
        justify-content: space-between;
        flex: 1;
        margin-right: 18px;
        position: relative;
        align-items: center;
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
        .sub-info-block {
          display: flex;
          justify-content: flex-start;
          align-items: center;
        }
        .sub-info {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          font-weight: 600;
          margin-left: 12px;
          justify-content: center;
          span {
            font-size: 12px;
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
        background-color: $color;
        display: inline-block;
        font-size: 12px;
        width: 50px;
        letter-spacing: 2px;
        height: 50px;
        line-height: 50px;
        text-align: center;
        border-radius: 8px;
      }
      .setting {
        i {
          font-size: 20px;
          cursor: pointer;
          transform: rotate(90deg);
        }
        &:hover {
          color: $color;
        }
      }
    }
  }
}
</style>
