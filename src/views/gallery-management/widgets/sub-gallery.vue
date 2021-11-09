<template>
  <div class="sub-gallery-viewer">
    <header>
      <h4>拍摄日期：</h4>
      <strong>2021/10/15 22:22:10</strong>
    </header>
    <div class="sub-gallery-content">
      <div class="images-wrap">
        <div class="images">
          <img src="https://t7.baidu.com/it/u=3039972918,1763345442&fm=193&f=GIF" alt="" />
        </div>
      </div>
      <div class="info">
        <h4>相机信息</h4>
        <div class="block">
          <p class="config-item"><span class="teil">相机编号：</span><span class="sub-teil">AS8A9868C68</span></p>
          <p class="config-item"><span class="teil">位置：</span><span class="sub-teil">经度123 维度34</span></p>
          <p class="config-item"><span class="teil">布控时间：</span><span class="sub-teil">2021年08月20日</span></p>
          <p class="config-item"><span class="teil">计划回收时间：</span><span class="sub-teil">2021年08月20日</span></p>
        </div>
        <h4>照片信息</h4>
        <div class="block">
          <p class="config-item"><span  class="teil">鉴定人:</span></p>
          <p class="config-item"><span  class="teil">物种信息:</span></p>
          <p class="config-item"><span  class="teil">物种性别:</span></p>
          <p class="config-item"><span  class="teil">天气:</span></p>
        </div>
        <div class="btn">
          <el-button type="primary">保存信息</el-button>
          <el-button type="danger">删除</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  }
}
</script>
<style lang="scss">
.sub-gallery-viewer {
  @include font_color(null);
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  box-sizing: border-box;
  padding: 12px;
  header {
    margin-bottom: 20px;
    font-size: 20px;
    h4 {
      display: inline-block;
    }
    strong {
      vertical-align: middle;
    }
  }
  .sub-gallery-content {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    width: 100%;
    .images-wrap {
      flex: 1;
      height: 70vh;
      .images {
        width: 100%;
        margin: 0 auto;
        height: 100%;
        // background-color: #eee;
        // display: flex;
        // align-items: center;
      }
      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }
    .info {
      width: 340px;
      margin-left: 28px;
      .block {
        padding: 20px 0;
        .config-item {
          line-height: 30px;
          font-size: 13px;
          span {
            display: inline-block;
          }
          .teil {
            width: 120px;
            letter-spacing: 2px;
            text-align: start;
          }
          .sub-teil {
            font-size: 17px;
            font-weight: 600;
          }
        }
      }
      h4 {
        letter-spacing: 3px;
        text-indent: 4px;
        position: relative;
        margin-bottom: 4px;
        font-size: 20px;
        &::after {
          content: '';
          position: absolute;
          left: -6px;
          top: 0;
          height: 100%;
          width: 4px;
          @include tool-bar-color();
        }
      }
      .btn {
        margin-top: 30px;
      }
    }
  }
}
</style>
