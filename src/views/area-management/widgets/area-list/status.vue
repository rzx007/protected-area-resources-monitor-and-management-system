<template>
  <div class="area-cameral-list">
    <ul class="ul-list">
      <li v-for="(item, index) in areaList" :key="index">
        <div class="info" title="查看信息" @click="clickArea(item)">
          <div class="sub-info-block">
            <svg-icon type="css" icon="ditu1" class="marks"></svg-icon>
            <div class="sub-info">
              <p><span>名称:</span> {{ item.title }}</p>
              <p style="margin-top: 6px">
                <span>相机数量：</span><span>{{ item.cameraNum }}</span>
              </p>
            </div>
          </div>
          <i class="next el-icon-arrow-right"></i>
          <div class="mask"></div>
        </div>
        <div class="setting" title="编辑保护区" v-if="isAdmin">
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
import { getToken, isAdmin } from '@/utils/auth'
import { areaList, deleteArea, findAreaByDoMain } from '@/api'
export default {
  name: 'task',
  emits: ['click-area'],
  data() {
    return {
      isAdmin: isAdmin(),
      code: '',
      areaList: []
    }
  },
  created() {
    this.isAdmin ? this.getAreaList() : this.findAreaByDoMain()
  },
  methods: {
    getAreaList() {
      areaList({ start: 0, limit: 1000, title: '' }).then((res) => {
        this.areaList = res.data.list
      })
    },
    findAreaByDoMain() {
      findAreaByDoMain({ domainName: getToken('domainName') }).then((res) => {
       this.areaList = [res.data]
      })
    },
    deleteArea(reserveId) {
      deleteArea({ reserveId }).then((result) => {
        this.$message.success('此保护区域已删除!')
        this.getAreaList()
      })
    },
    clickArea(item) {
      // 点击相机
      this.$emit('click-area', item)
    },
    handleCommand(command) {
      this.$confirm('操作将删除此保护区', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteArea(command.reserveId)
      })
    }
  }
}
</script>
<style lang="scss">
$color: #4762b0;
.area-cameral-list {
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
          width: 110%;
          z-index: -1;
          border-radius: 8px;
          transition: all 0.3s ease-in-out;
        }
        .sub-info-block {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          .marks {
            font-size: 28px;
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
        }
        .next {
          font-size: 20px;
        }
        &:hover {
          .marks {
            color: $color !important;
          }
          .mask {
            height: 130%;
            background-color: #eee;
          }
        }
      }
      .setting {
        i {
          font-size: 24px;
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
