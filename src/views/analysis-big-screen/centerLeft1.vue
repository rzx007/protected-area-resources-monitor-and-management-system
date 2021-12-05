<template>
  <div id="centerLeft1">
    <div class="bg-color-black">
      <div class="d-flex pt-2 pl-2">
        <span>
          <icon name="chart-bar" class="text-icon"></icon>
        </span>
        <div class="d-flex">
          <span class="fs-xl text mx-2">相机照片比率</span>
          <dv-decoration-3 class="dv-dec-3" />
        </div>
      </div>
      <div class="d-flex jc-center">
        <CenterLeft1Chart @getTotal="getData" />
      </div>
      <!-- 4个主要的数据 -->
      <div class="bottom-data">
        <div class="item-box mt-2" v-for="(item, index) in numberDatas" :key="index">
          <div class="d-flex">
            <span class="coin">^</span>
            <dv-digital-flop class="dv-digital-flop" :config="item.number" />
          </div>
          <p class="text" style="text-align: center">
            {{ item.text }}
            <span class="colorYellow">(张)</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CenterLeft1Chart from './echart/centerLeft/centerLeft1Chart'
export default {
  data() {
    return {
      numberData: [
        {
          number: {
            number: [0],
            toFixed: 0,
            textAlign: 'left',
            content: '{nt}',
            style: {
              fontSize: 24
            }
          },
          text: '今日拍摄照片'
        },
        {
          number: {
            number: [0],
            toFixed: 0,
            textAlign: 'left',
            content: '{nt}',
            style: {
              fontSize: 24
            }
          },
          text: '总拍摄照片'
        }
      ],
      numberDatas: this.numberDatas
    }
  },
  components: {
    CenterLeft1Chart
  },
  methods: {
    getData(data) {
      console.log(data)
      this.numberData[0]['number']['number'][0] = data['todayNum']
      this.numberData[1]['number']['number'] = [data['total']]
      console.log(this.numberData)
    }
  },
  watch: {
    numberData: {
      handler: function (val) {
        this.numberDatas = Object.assign({}, val)
      },
      deep: true
    }
  }
}
</script>

<style lang="scss" scoped>
$box-width: 300px;
$box-height: 100%;

#centerLeft1 {
  padding: 0 16px;
  height: $box-height;

  border-radius: 10px;
  box-sizing: border-box;
  border: 1px solid transparent;
  .bg-color-black {
    margin-top: 3%;
    height: 94%;
    border-radius: 10px;
  }
  .text {
    color: #c3cbde;
  }
  .dv-dec-3 {
    position: relative;
    width: 100px;
    height: 20px;
    top: -3px;
  }

  .bottom-data {
    margin-top: 40px;
    .item-box {
      & > div {
        padding-right: 5px;
      }
      font-size: 14px;
      float: right;
      position: relative;
      width: 50%;
      color: #d3d6dd;
      .dv-digital-flop {
        width: 120px;
        height: 30px;
      }
      // 金币
      .coin {
        position: relative;
        top: 6px;
        font-size: 20px;
        color: #ffc107;
      }
      .colorYellow {
        color: yellowgreen;
      }
      p {
        text-align: center;
      }
    }
  }
}
</style>
