<template>
  <div class="home-cameral-list">
    <el-input v-model="code" placeholder="相机编号查询" clearable></el-input>
    <ul class="ul-list">
      <li v-for="(item, index) in cameraList" :key="index">
        <div class="info" title="查看信息" @click="clickCamera(item)">
          <!-- <span class="state" :style="{ backgroundColor: getStatus(item.state, 2) }">{{ getStatus(item.state) }}</span> -->
          <div class="sub-info-block">
            <svg-icon type="css" icon="zhaoxiangji" class="marks"></svg-icon>
            <div class="sub-info">
              <p><span>编号：</span> {{ item.imeival }}</p>
              <p style="margin-top: 6px" v-show="[3, 4].includes(item.state)">
                <span>布控时间：</span><span>{{ item.setTime }}</span>
              </p>
            </div>
          </div>
          <i class="next el-icon-arrow-right"></i>
          <div class="mask"></div>
        </div>
        <div class="setting" title="地图定位">
          <i class="el-icon-location-information"></i>
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
      findAllCarmeraList().then((res) => {
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
    }
  }
}
</script>
<style lang="scss">
$color: #4762b0;
.home-cameral-list {
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
        font-size: 24px;
        cursor: pointer;
        &:hover {
          color: $color;
        }
      }
    }
  }
}
</style>
