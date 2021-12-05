<template>
  <div id="center">
    <div class="up">
      <div class="bg-color-black item" v-for="item in titleItem" :key="item.title">
        <p class="ml-3 colorBlue fw-b fs-xl">{{ item.title }}</p>
        <div>
          <dv-digital-flop class="dv-dig-flop ml-1 mt-2 pl-3" :config="item.number" />
        </div>
      </div>
    </div>
    <div class="down">
      <div class="ranking bg-color-black">
        <span>
          <icon name="chart-pie" class="text-icon"></icon>
        </span>
        <span class="fs-xl text mx-2 mb-1 pl-3">相机拍摄排行榜</span>
        <dv-scroll-ranking-board class="dv-scr-rank-board mt-1" :config="ranking" />
      </div>
      <div class="percent">
        <div class="item bg-color-black">
          <span>今日拍摄率</span>
          <CenterChart :id="rate[0].id" :tips="tips[0]" :colorObj="rate[0].colorData" />
        </div>
        <div class="item bg-color-black">
          <span>昨日拍摄率</span>
          <CenterChart :id="rate[1].id" :tips="tips[1]" :colorObj="rate[1].colorData" />
        </div>
        <div class="water">
          <dv-water-level-pond class="dv-wa-le-po" :config="water" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { findCameraNum } from '@/api'
import { getToken } from '@/utils/auth'
import CenterChart from './echart/center/centerChartRate'

export default {
  data() {
    return {
      titleItem: [
        {
          title: '相机总数',
          number: {
            number: [3],

            textAlign: 'left',
            content: '{nt}',
            style: {
              fontSize: 26
            }
          }
        },
        {
          title: '已部署相机',
          number: {
            number: [1],

            textAlign: 'left',
            content: '{nt}',
            style: {
              fontSize: 26
            }
          }
        },
        {
          title: '待回收相机',
          number: {
            number: [1],

            textAlign: 'left',
            content: '{nt}',
            style: {
              fontSize: 26
            }
          }
        },
        {
          title: '待部署相机',
          number: {
            number: [1],

            textAlign: 'left',
            content: '{nt}',
            style: {
              fontSize: 26
            }
          }
        },
        {
          title: '已经拍摄照片总数',
          number: {
            number: [106],

            textAlign: 'left',
            content: '{nt}',
            style: {
              fontSize: 26
            }
          }
        },
        {
          title: '昨日拍摄照片总数',
          number: {
            number: [100],

            textAlign: 'left',
            content: '{nt}',
            style: {
              fontSize: 26
            }
          }
        }
      ],
      ranking: {
        data: [
          {
            name: '周口',
            value: 55
          },
          {
            name: '南阳',
            value: 120
          },
          {
            name: '西峡',
            value: 78
          },
          {
            name: '驻马店',
            value: 66
          },
          {
            name: '新乡',
            value: 80
          },
          {
            name: '新乡2',
            value: 80
          },
          {
            name: '新乡3',
            value: 80
          },
          {
            name: '新乡4',
            value: 80
          },
          {
            name: '新乡5',
            value: 80
          },
          {
            name: '新乡6',
            value: 80
          }
        ],
        carousel: 'single',
        unit: '张'
      },
      water: {
        data: [24, 45],
        shape: 'roundRect',
        formatter: '{value}%',
        waveNum: 3
      },
      tips: [60, 40],
      // 通过率和达标率的组件复用数据
      rate: [
        {
          id: 'centerRate1',
          tips: 60,
          colorData: {
            textStyle: '#3fc0fb',
            series: {
              color: ['#00bcd44a', 'transparent'],
              dataColor: {
                normal: '#03a9f4',
                shadowColor: '#97e2f5'
              }
            }
          }
        },
        {
          id: 'centerRate2',
          tips: 40,
          colorData: {
            textStyle: '#67e0e3',
            series: {
              color: ['#faf3a378', 'transparent'],
              dataColor: {
                normal: '#ff9800',
                shadowColor: '#fcebad'
              }
            }
          }
        }
      ]
    }
  },
  components: {
    CenterChart
  },
  mounted() {
    this.findCameraNum()
  },
  methods: {
    findCameraNum() {
      findCameraNum({ reserveId: getToken('reserveId') }).then((res) => {
        let rank = { data: [] }
        let water = {
          data: []
        }
        let total = 0
        const data = res.data.list
        data.forEach((element) => {
          total += element.num
          rank.data.push({ value: element.num, name: element.imeiVal })
        })
        water.data = [res.data.todayNum, total]
        this.ranking = Object.assign({}, this.ranking, rank)
        this.water = Object.assign({}, this.water, water)
        res.data.todayNum / total
      })
    }
  }
}
</script>

<style lang="scss" scoped>
#center {
  display: flex;
  flex-direction: column;
  .up {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    .item {
      border-radius: 6px;
      padding-top: 8px;
      margin-top: 8px;
      width: 32%;
      height: 70px;
      .dv-dig-flop {
        width: 150px;
        height: 30px;
      }
    }
  }
  .down {
    padding: 6px 4px;
    padding-bottom: 0;
    width: 100%;
    display: flex;
    height: 255px;
    justify-content: space-between;
    .bg-color-black {
      border-radius: 5px;
    }
    .ranking {
      padding: 10px;
      width: 59%;
      .dv-scr-rank-board {
        height: 225px;
      }
    }
    .percent {
      width: 40%;
      display: flex;
      flex-wrap: wrap;
      .item {
        width: 50%;
        height: 120px;
        span {
          margin-top: 8px;
          font-size: 14px;
          display: flex;
          justify-content: center;
        }
      }
      .water {
        width: 100%;
        .dv-wa-le-po {
          height: 120px;
        }
      }
    }
  }
}
</style>
