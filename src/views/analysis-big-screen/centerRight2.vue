<template>
  <div id="centerRight2">
    <div class="bg-color-black">
      <div class="d-flex pt-2 pl-2">
        <span>
          <icon name="align-left" class="text-icon"></icon>
        </span>
        <span class="fs-xl text mx-2">近几日拍摄数量分析</span>
      </div>
      <div class="d-flex ai-center flex-column body-box">
        <dv-capsule-chart class="dv-cap-chart" :config="config" />
        <!-- <centerRight2Chart1 /> -->
      </div>
    </div>
  </div>
</template>

<script>
import centerRight2Chart1 from './echart/centerRight/centerRightChart'
import { getToken } from '@/utils/auth'
import { findByDay } from '@/api'
export default {
  data() {
    return {
      config: {
        data: [
          {
            name: '南阳',
            value: 167
          },
          {
            name: '周口',
            value: 67
          },
          {
            name: '漯河',
            value: 123
          },
          {
            name: '郑州',
            value: 55
          },
          {
            name: '西峡',
            value: 98
          }
        ]
      }
    }
  },
  created() {
    this.findByDay()
  },
  components: { centerRight2Chart1 },
  methods: {
    // 根据自己的业务情况修改
    findByDay() {
      findByDay({ reserveId: getToken('reserveId') }).then((res) => {
        const data = res.data
        let config = { data: [] }
        data.forEach((element) => {
          config.data.push({name:element.createTime, value:element.num})
        })
        this.config = Object.assign({}, this.config, config)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
#centerRight2 {
  $box-height: 100%;
  $box-width: 100%;
  padding: 0 5px;
  height: $box-height;
  width: $box-width;
  border-radius: 5px;
  box-sizing: border-box;
  .bg-color-black {
    padding: 5px;
    height: 93%;
    margin-top: 3%;
    width: $box-width;
    border-radius: 10px;
  }
  .text {
    color: #c3cbde;
  }
  .body-box {
    border-radius: 10px;
    overflow: hidden;
    .dv-cap-chart {
      width: 100%;
      height: 160px;
    }
  }
}
</style>
