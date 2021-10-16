<!--
 * @Author: 阮志雄
 * @Date: 2021-10-13 17:31:18
 * @LastEditTime: 2021-10-16 20:19:17
 * @LastEditors: 阮志雄
 * @Description: In User Settings Edit
 * @FilePath: \Protected-Area-Resources-Monitor-and-Management-System\src\views\area-management\widgets\camera-list\status.vue
-->
<template>
  <div class="area-cameral-list">
    <ul class="ul-list">
      <li v-for="(item, index) in cameraList" :key="index">
        <div class="info" title="查看信息" @click="clickArea(item)">
          <!-- <span class="status" :style="{ backgroundColor: getStatus(item.status, 2) }">{{ getStatus(item.status) }}</span> -->
          <div class="sub-info-block">
            <svg-icon type='css' icon='ditu1' class="marks"></svg-icon>
            <div class="sub-info">
              <p><span>名称:</span> {{ item.id }}</p>
              <p style="margin-top:6px" v-show="[1, 3].includes(item.status)">
                <span>布控时间：</span><span>{{ item.inUseTime }}</span>
              </p>
            </div>
          </div>
          <i class="next el-icon-arrow-right"></i>
          <div class="mask"></div>
        </div>
        <!-- <div class="setting" title="编辑保护区" >
          <i class="el-icon-setting"></i>
        </div> -->
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'task',
  emits: ['click-area', 'click-recycle', 'click-deploy'],
  data() {
    return {
      code: '',
      cameraList: [
        // 1已部署， 2 待部署， 3 待回收 4 未部署
        { id: '神农架保护区', status: 1, inUseTime: '2012-10-12', user: '' },
        { id: '张家界保护区', status: 1, inUseTime: '2012-10-12', user: '张三' },
        { id: 'KJGRA679SHJO', status: 1, inUseTime: '2012-10-12', user: '李四' }
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
    clickArea(item) {
      // 点击相机
      this.$emit('click-area', item)
    },
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
