<!--
 * @Author: 阮志雄
 * @Date: 2021-10-16 13:09:24
 * @LastEditTime: 2021-10-18 17:45:15
 * @LastEditors: 阮志雄
 * @Description: In User Settings Edit
 * @FilePath: \Protected-Area-Resources-Monitor-and-Management-System\src\views\analysis\widgets\lastest-gallery.vue
-->
<template>
  <div class="analysis-gallery-main">
    <div class="title">最新发现</div>
    <div class="analysis-content">
      <el-row :gutter="10">
        <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="8" v-for="(item, index) in img_url" :key="index">
          <div class="grid-gallery">
            <div class="gallery-item">
              <img :src="item" alt="" />
              <!-- <div class="mask" title="查看照片" @click="clickImg($event, item)">
                <svg-icon type="css" icon="ditu1" style=" font-size: 36px;"></svg-icon>
              </div> -->
            </div>
            <p>2021/10/13 22:12:18</p>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      img_url: [
        'https://t7.baidu.com/it/u=2596442915,284398145&fm=193&f=GIF',
        'https://t7.baidu.com/it/u=2006997523,200382512&fm=193&f=GIF',
        'https://t7.baidu.com/it/u=3039972918,1763345442&fm=193&f=GIF',
        'https://t7.baidu.com/it/u=2178362500,3992351697&fm=193&f=GIF',
        'https://t7.baidu.com/it/u=1306161837,1467065791&fm=193&f=GIF',
        'https://t7.baidu.com/it/u=2596442915,284398145&fm=193&f=GIF',
        'https://t7.baidu.com/it/u=2006997523,200382512&fm=193&f=GIF',
        'https://t7.baidu.com/it/u=3039972918,1763345442&fm=193&f=GIF',
        'https://t7.baidu.com/it/u=2178362500,3992351697&fm=193&f=GIF',
        'https://t7.baidu.com/it/u=1306161837,1467065791&fm=193&f=GIF',
        'https://t7.baidu.com/it/u=2596442915,284398145&fm=193&f=GIF',
        'https://t7.baidu.com/it/u=2006997523,200382512&fm=193&f=GIF',
        'https://t7.baidu.com/it/u=3039972918,1763345442&fm=193&f=GIF',
        'https://t7.baidu.com/it/u=2178362500,3992351697&fm=193&f=GIF',
        'https://t7.baidu.com/it/u=1306161837,1467065791&fm=193&f=GIF'
      ]
    }
  }
}
</script>
<style lang="scss">
.analysis-gallery-main {
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  @include font_color(null);
  @include content-background();
  border-radius: 10px;
  @include box-shadow();
  height: 50vh;
  min-height: 400px;
  .title {
    font-weight: bold;
    font-size: 19px;
  }
  .analysis-content {
    padding: 12px 0;
    box-sizing: border-box;
    width: 100%;
    height: calc(100% - 40px);
    overflow-y: auto;
    overflow-x: hidden;
    .grid-gallery {
      margin-bottom: 14px;
      .gallery-item {
        height: 180px;
        background-color: #eee;
        overflow: hidden;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        img {
          width: 100%;
          height: 100%;
          object-fit: fill;
          transition: all 0.3s ease-in-out;
        }
      }
      p {
        @include font_color(null);
        font-size: 16px;
        line-height: 30px;
      }
    }
  }
}
</style>
